// ============================================================================
// GymPilot — Volume Manager
// Calculates volume budget (sets per session/week) for target muscle groups
// ============================================================================

import { Goal, TrainingLevel } from '@/types/database';

export interface VolumeBudgetInput {
  goals: Goal[];
  trainingLevel: TrainingLevel;
  trainingDaysPerWeek: number;
  workoutDurationMinutes: number;
  targetMuscles: string[];
}

export interface VolumeBudgetResult {
  totalTargetSets: number;
  exerciseCount: number;
  setsPerExercise: number;
  muscleSetAllocations: Record<string, number>;
}

export function calculateVolumeBudget(input: VolumeBudgetInput): VolumeBudgetResult {
  const {
    goals,
    trainingLevel,
    trainingDaysPerWeek,
    workoutDurationMinutes,
    targetMuscles,
  } = input;

  // Base set capacity by duration (approx 3-4 mins per set including rest)
  const availableMinutes = Math.max(20, workoutDurationMinutes - 10); // 10 mins warmup/cooldown
  const maxSetsByTime = Math.floor(availableMinutes / 3.5);

  // Weekly sets baseline per muscle group
  let baseWeeklySets = 12; // Hypertrophy default
  const primaryGoal = goals.find((g) => g.sort_order === 1)?.slug || goals[0]?.slug || 'build-muscle';

  switch (primaryGoal) {
    case 'strength':
      baseWeeklySets = 9;
      break;
    case 'fat-loss':
      baseWeeklySets = 10;
      break;
    case 'general-fitness':
    case 'maintain-fitness':
      baseWeeklySets = 8;
      break;
    case 'bodybuilding':
      baseWeeklySets = 16;
      break;
    case 'improve-endurance':
      baseWeeklySets = 10;
      break;
    default:
      baseWeeklySets = 12;
  }

  // Adjust for training level
  let levelMultiplier = 1.0;
  if (trainingLevel === 'beginner') levelMultiplier = 0.8;
  if (trainingLevel === 'advanced') levelMultiplier = 1.25;

  const adjustedWeeklySets = baseWeeklySets * levelMultiplier;
  const sessionsPerWeek = Math.max(1, trainingDaysPerWeek);
  const targetSetsPerSession = Math.round(adjustedWeeklySets / sessionsPerWeek * (targetMuscles.length || 1));

  // Cap sets by time constraint
  const totalTargetSets = Math.min(maxSetsByTime, Math.max(12, targetSetsPerSession));

  // Determine exercise count and sets per exercise
  const setsPerExercise = primaryGoal === 'strength' ? 4 : 3;
  const exerciseCount = Math.max(3, Math.min(7, Math.round(totalTargetSets / setsPerExercise)));

  // Distribute sets across target muscles
  const muscleSetAllocations: Record<string, number> = {};
  const setsPerMuscle = Math.floor(totalTargetSets / (targetMuscles.length || 1));

  targetMuscles.forEach((muscle, idx) => {
    // Primary muscles get remaining remainder sets
    const remainder = idx === 0 ? totalTargetSets % (targetMuscles.length || 1) : 0;
    muscleSetAllocations[muscle] = setsPerMuscle + remainder;
  });

  return {
    totalTargetSets,
    exerciseCount,
    setsPerExercise,
    muscleSetAllocations,
  };
}
