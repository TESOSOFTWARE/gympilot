// ============================================================================
// GymPilot — Recovery Engine
// Calculates muscle-by-muscle recovery scores (0.0 to 1.0) and status
// ============================================================================

import {
  Muscle,
  MuscleRecoveryStatus,
  WorkoutSession,
  WorkoutSet,
  ExerciseMuscle,
} from '@/types/database';

export interface RecoveryEngineInput {
  muscles: Muscle[];
  recentSessions: (WorkoutSession & {
    workout_exercises?: {
      exercise_id: string;
      workout_sets?: WorkoutSet[];
    }[];
  })[];
  exerciseMusclesMap: Record<string, ExerciseMuscle[]>;
  historyWindowDays?: number;
}

export function computeMuscleRecovery(
  input: RecoveryEngineInput
): Record<string, MuscleRecoveryStatus> {
  const { muscles, recentSessions, exerciseMusclesMap, historyWindowDays = 7 } = input;
  const now = new Date();
  const windowMs = historyWindowDays * 24 * 60 * 60 * 1000;
  const result: Record<string, MuscleRecoveryStatus> = {};

  for (const muscle of muscles) {
    let lastTrainedTimestamp: number | null = null;
    let accumulatedFatigue = 0;

    for (const session of recentSessions) {
      if (!session.completed_at && session.status !== 'completed') continue;
      const sessionDate = new Date(session.completed_at || session.started_at);
      const timeDiffMs = now.getTime() - sessionDate.getTime();

      if (timeDiffMs > windowMs) continue;

      const exercises = session.workout_exercises || [];
      let muscleTrainedInSession = false;

      for (const ex of exercises) {
        const muscleMappings = exerciseMusclesMap[ex.exercise_id] || [];
        const mapping = muscleMappings.find((m) => m.muscle_id === muscle.id);

        if (mapping && mapping.activation_weight > 0) {
          muscleTrainedInSession = true;
          const sets = (ex.workout_sets || []).filter((s) => s.completed);
          const totalSets = sets.length || 3;

          const avgRpe =
            sets.reduce((sum, s) => sum + (s.rpe || 7.5), 0) / (sets.length || 1);
          const intensityFactor = getIntensityFactor(avgRpe);

          const fatigueContrib =
            totalSets * mapping.activation_weight * intensityFactor;
          accumulatedFatigue += fatigueContrib;
        }
      }

      if (muscleTrainedInSession) {
        if (!lastTrainedTimestamp || sessionDate.getTime() > lastTrainedTimestamp) {
          lastTrainedTimestamp = sessionDate.getTime();
        }
      }
    }

    let recoveryScore = 1.0;
    let hoursSince: number | null = null;

    if (lastTrainedTimestamp !== null) {
      hoursSince = (now.getTime() - lastTrainedTimestamp) / (1000 * 60 * 60);
      const baseHours = muscle.default_recovery_hours || 48;
      
      const fatigueModifier = 1.0 + Math.min(accumulatedFatigue * 0.03, 0.5);
      const effectiveRecoveryHours = baseHours * fatigueModifier;

      rawRecoveryScore: {
        const raw = hoursSince / effectiveRecoveryHours;
        recoveryScore = Math.min(1.0, Math.max(0.0, raw));
      }
    }

    let status: MuscleRecoveryStatus['status'] = 'recovered';
    if (recoveryScore <= 0.3) {
      status = 'highly_fatigued';
    } else if (recoveryScore <= 0.6) {
      status = 'moderately_fatigued';
    } else if (recoveryScore <= 0.8) {
      status = 'partially_recovered';
    }

    result[muscle.id] = {
      muscle_id: muscle.id,
      muscle_name: muscle.name,
      muscle_group: muscle.muscle_group,
      recovery_score: Math.round(recoveryScore * 100) / 100,
      hours_since_training: hoursSince !== null ? Math.round(hoursSince) : null,
      last_trained_at:
        lastTrainedTimestamp !== null
          ? new Date(lastTrainedTimestamp).toISOString()
          : null,
      status,
    };
  }

  return result;
}

function getIntensityFactor(rpe: number): number {
  if (rpe <= 6) return 0.7;
  if (rpe <= 7) return 0.85;
  if (rpe <= 8) return 1.0;
  if (rpe <= 9) return 1.15;
  return 1.35;
}
