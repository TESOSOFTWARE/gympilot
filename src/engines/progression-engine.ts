// ============================================================================
// GymPilot — Progression Engine
// Calculates weight load & rep progression recommendations based on previous performance
// ============================================================================

import { PreviousPerformance } from '@/types/database';

export interface ProgressionInput {
  exerciseType: 'compound' | 'isolation' | string;
  movementPattern: string;
  previousPerformance: PreviousPerformance | null;
  targetRpe?: number;
  targetRepRange?: string;
}

export interface ProgressionRecommendation {
  suggestedWeightKg: number | null;
  suggestedReps: number;
  progressionType: 'increase_weight' | 'increase_reps' | 'maintain' | 'deload';
  reasoning: string;
}

export function calculateProgression(input: ProgressionInput): ProgressionRecommendation {
  const { exerciseType, movementPattern, previousPerformance, targetRpe = 8 } = input;

  if (!previousPerformance || !previousPerformance.weight_kg) {
    return {
      suggestedWeightKg: null,
      suggestedReps: 10,
      progressionType: 'maintain',
      reasoning: 'First time performing this exercise. Start with a light test weight.',
    };
  }

  const { weight_kg, reps, rpe } = previousPerformance;
  const lastRpe = rpe || targetRpe;

  // Determine weight step size (5kg for heavy lower body compounds, 2.5kg for upper/isolation)
  const isLowerCompound =
    ['squat', 'hip_hinge', 'lunge'].includes(movementPattern) && exerciseType === 'compound';
  const weightIncrement = isLowerCompound ? 5.0 : 2.5;

  if (lastRpe <= 7.0 && reps >= 8) {
    // Easy session -> increase load
    const newWeight = Math.round((weight_kg + weightIncrement) * 10) / 10;
    return {
      suggestedWeightKg: newWeight,
      suggestedReps: reps,
      progressionType: 'increase_weight',
      reasoning: `Previous RPE was ${lastRpe}. Progressing weight by +${weightIncrement}kg.`,
    };
  }

  if (lastRpe >= 9.5) {
    // High effort / near failure -> maintain weight, target clean execution
    return {
      suggestedWeightKg: weight_kg,
      suggestedReps: Math.max(5, reps - 1),
      progressionType: 'maintain',
      reasoning: `Previous RPE was high (${lastRpe}). Holding weight at ${weight_kg}kg to consolidate form.`,
    };
  }

  // Moderate effort (RPE 7.5 - 9.0) -> Progress reps or maintain
  return {
    suggestedWeightKg: weight_kg,
    suggestedReps: reps + 1 <= 12 ? reps + 1 : reps,
    progressionType: reps < 12 ? 'increase_reps' : 'maintain',
    reasoning: `Targeting +1 rep at ${weight_kg}kg.`,
  };
}
