// ============================================================================
// GymPilot — Validation Engine
// Safety, volume balance, and injury validation for generated workouts
// ============================================================================

import {
  GeneratedWorkout,
  UserProfile,
  UserInjury,
  WorkoutValidationResult,
  ValidationWarning,
  ValidationError,
  MuscleRecoveryStatus,
} from '@/types/database';

export interface ValidationInput {
  workout: GeneratedWorkout;
  profile: Partial<UserProfile>;
  injuries: UserInjury[];
  recoveryMap: Record<string, MuscleRecoveryStatus>;
}

export function validateWorkout(input: ValidationInput): WorkoutValidationResult {
  const { workout, profile, injuries, recoveryMap } = input;
  const warnings: ValidationWarning[] = [];
  const errors: ValidationError[] = [];

  const activeInjuries = (injuries || []).filter((i) => i.is_active);

  // Check 1: Duplicate exercises
  const exerciseIds = new Set<string>();
  for (const item of workout.exercises) {
    if (exerciseIds.has(item.exercise.id)) {
      errors.push({
        type: 'duplicate_exercise',
        message: `Duplicate exercise detected: ${item.exercise.name}`,
        details: { exercise_id: item.exercise.id, name: item.exercise.name },
      });
    }
    exerciseIds.add(item.exercise.id);
  }

  // Check 2: Injury conflicts
  for (const item of workout.exercises) {
    for (const injury of activeInjuries) {
      if (injury.excluded_exercises?.includes(item.exercise.id)) {
        errors.push({
          type: 'injury_conflict',
          message: `Exercise "${item.exercise.name}" conflicts with injury: ${injury.description}`,
          details: {
            exercise_id: item.exercise.id,
            injury_id: injury.id,
            description: injury.description,
          },
        });
      }
    }
  }

  // Check 3: Insufficient Muscle Recovery
  for (const item of workout.exercises) {
    const muscles = item.muscles || [];
    for (const em of muscles) {
      if (em.muscle_id && recoveryMap[em.muscle_id]) {
        const recovery = recoveryMap[em.muscle_id];
        if (recovery.status === 'highly_fatigued' && em.involvement_type === 'primary') {
          warnings.push({
            type: 'insufficient_recovery',
            message: `Primary target muscle "${recovery.muscle_name}" is under-recovered (Recovery score: ${Math.round(recovery.recovery_score * 100)}%)`,
            details: {
              muscle_id: em.muscle_id,
              muscle_name: recovery.muscle_name,
              score: recovery.recovery_score,
            },
          });
        }
      }
    }
  }

  // Check 4: Excessive Session Volume
  const totalSets = workout.exercises.reduce((sum, e) => sum + e.sets, 0);
  const maxAllowedSets = profile.training_level === 'beginner' ? 20 : 26;
  if (totalSets > maxAllowedSets) {
    warnings.push({
      type: 'excessive_volume',
      message: `Total workout volume of ${totalSets} sets exceeds recommended maximum of ${maxAllowedSets} sets for ${profile.training_level || 'beginner'} level.`,
      details: { totalSets, maxAllowedSets },
    });
  }

  // Check 5: Duration check
  if (workout.estimated_duration_minutes > (profile.workout_duration_minutes || 60) + 20) {
    warnings.push({
      type: 'long_duration',
      message: `Estimated duration of ${workout.estimated_duration_minutes}m exceeds preferred session length of ${profile.workout_duration_minutes || 60}m.`,
      details: {
        estimated: workout.estimated_duration_minutes,
        preferred: profile.workout_duration_minutes || 60,
      },
    });
  }

  return {
    valid: errors.length === 0,
    warnings,
    errors,
  };
}
