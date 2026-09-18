// ============================================================================
// GymPilot — Workout Engine Main Pipeline
// Orchestrates recovery map, exercise selection, volume allocation, & validation
// ============================================================================

import {
  WorkoutGenerationInput,
  GeneratedWorkout,
  GeneratedExercise,
  WorkoutPlanDay,
} from '@/types/database';

import { computeMuscleRecovery } from './recovery-engine';
import { calculateVolumeBudget } from './volume-manager';
import { scoreAndSelectExercises } from './exercise-selector';
import { calculateProgression } from './progression-engine';
import { validateWorkout } from './validation-engine';

export function generateWorkout(input: WorkoutGenerationInput): {
  workout: GeneratedWorkout;
  validation: ReturnType<typeof validateWorkout>;
} {
  const {
    profile,
    goals,
    injuries,
    preferences,
    recentSessions,
    recentSets,
    planDay,
    availableExercises,
  } = input;

  // 1. Build Exercise-to-Muscles Map
  const exerciseMusclesMap = availableExercises.reduce((acc, ex) => {
    acc[ex.id] = ex.exercise_muscles || [];
    return acc;
  }, {} as Record<string, typeof availableExercises[0]['exercise_muscles']>);

  // Extract muscles list from available exercises
  const muscleMap = new Map<string, any>();
  availableExercises.forEach((ex) => {
    (ex.exercise_muscles || []).forEach((em) => {
      if (em.muscle) muscleMap.set(em.muscle.id, em.muscle);
    });
  });
  const allMuscles = Array.from(muscleMap.values());

  // 2. Compute Recovery Map
  const recoveryMap = computeMuscleRecovery({
    muscles: allMuscles,
    recentSessions,
    exerciseMusclesMap,
    historyWindowDays: profile.history_window_days || 7,
  });

  // 3. Determine Target Muscles for today's plan day
  const targetMuscles = planDay.target_muscles || ['Chest', 'Triceps', 'Shoulders'];

  // 4. Calculate Volume Budget
  const volumeBudget = calculateVolumeBudget({
    goals: goals.map((g) => g.goal || { id: g.goal_id, sort_order: g.is_primary ? 1 : 2, name: '', slug: '', description: '', default_parameters: {}, is_active: true }),
    trainingLevel: profile.training_level || 'beginner',
    trainingDaysPerWeek: profile.training_days_per_week || 3,
    workoutDurationMinutes: profile.workout_duration_minutes || 60,
    targetMuscles,
  });

  // 5. Score Eligible Exercises
  const recentExerciseIds = recentSets.map((s) => s.exercise_id);

  const rankedScores = scoreAndSelectExercises({
    availableExercises,
    targetMuscles,
    profile,
    goals,
    injuries,
    preferences,
    recoveryMap,
    recentExerciseIds,
  });

  // Pick top N exercises based on volume budget exerciseCount
  const selectedCandidates = rankedScores.slice(0, volumeBudget.exerciseCount);

  // Extract primary goal slug for scientific parameter allocation
  const primaryGoalObj = goals.find((g: any) => g.is_primary || g.isPrimary) as any;
  const primaryGoalSlug = primaryGoalObj?.goal_id || primaryGoalObj?.goalSlug || (goals[0] as any)?.goal_id || 'build-muscle';

  // 6. Build Generated Exercises with Sets, Reps, RPE, Suggested Loads
  const generatedExercises: GeneratedExercise[] = selectedCandidates.map((scored, idx) => {
    const ex = scored.exercise;
    const isCompound = ex.exercise_type === 'compound';

    // Find previous performance for load progression
    const prevSet = recentSets.find((s) => s.exercise_id === ex.id && s.completed);
    const prevPerf = prevSet
      ? {
          weight_kg: prevSet.weight_kg || 0,
          reps: prevSet.reps || 10,
          rpe: prevSet.rpe,
          date: new Date().toISOString(),
        }
      : null;

    // Scientific parameter allocation based on Primary Goal
    let setsCount = isCompound ? 4 : 3;
    let repRange = isCompound ? '8-10' : '10-12';
    let restSeconds = isCompound ? 120 : 75;
    let targetRpe = isCompound ? 8.0 : 7.5;

    if (primaryGoalSlug === 'increase-strength' || primaryGoalSlug === 'improve-strength') {
      setsCount = isCompound ? 4 : 3;
      repRange = isCompound ? '3-5' : '6-8';
      restSeconds = isCompound ? 180 : 120;
      targetRpe = isCompound ? 8.5 : 8.0;
    } else if (primaryGoalSlug === 'lose-fat' || primaryGoalSlug === 'reduce-body-fat' || primaryGoalSlug === 'body-recomposition') {
      setsCount = isCompound ? 4 : 3;
      repRange = isCompound ? '10-12' : '12-15';
      restSeconds = isCompound ? 60 : 45;
      targetRpe = isCompound ? 8.0 : 7.5;
    } else if (primaryGoalSlug === 'improve-endurance' || primaryGoalSlug === 'improve-endurance-sec' || primaryGoalSlug === 'improve-cardio') {
      setsCount = 3;
      repRange = isCompound ? '15-20' : '15-25';
      restSeconds = isCompound ? 45 : 30;
      targetRpe = isCompound ? 7.5 : 7.0;
    } else if (primaryGoalSlug === 'improve-athletic-performance' || primaryGoalSlug === 'improve-athleticism') {
      setsCount = isCompound ? 4 : 3;
      repRange = isCompound ? '5-8' : '8-10';
      restSeconds = isCompound ? 120 : 90;
      targetRpe = isCompound ? 8.0 : 7.5;
    }

    const progression = calculateProgression({
      exerciseType: ex.exercise_type,
      movementPattern: ex.movement_pattern,
      previousPerformance: prevPerf,
      targetRpe,
    });

    return {
      exercise: ex,
      muscles: ex.exercise_muscles || [],
      equipment: ex.exercise_equipment || [],
      sets: setsCount,
      rep_range: repRange,
      rest_seconds: restSeconds,
      target_rpe: targetRpe,
      suggested_weight_kg: progression.suggestedWeightKg,
      previous_performance: prevPerf,
      order_index: idx + 1,
    };
  });

  // 7. Calculate Muscle Coverage & Duration
  const totalSets = generatedExercises.reduce((sum, e) => sum + e.sets, 0);
  const estimatedDurationMinutes = Math.round(totalSets * 3.2 + 10); // 3.2 min per set + 10 min warm up

  const muscleCoverage: Record<string, number> = {};
  generatedExercises.forEach((ge) => {
    (ge.muscles || []).forEach((m) => {
      const name = m.muscle?.name || 'Muscle';
      muscleCoverage[name] = (muscleCoverage[name] || 0) + ge.sets * m.activation_weight;
    });
  });

  const workout: GeneratedWorkout = {
    plan_day: planDay,
    exercises: generatedExercises,
    estimated_duration_minutes: estimatedDurationMinutes,
    muscle_coverage: muscleCoverage,
  };

  // 8. Validate Generated Workout
  const validation = validateWorkout({
    workout,
    profile,
    injuries,
    recoveryMap,
  });

  return { workout, validation };
}
