// ============================================================================
// GymPilot — Exercise Selector & Scorer
// Ranks and selects candidate exercises for workout generation & substitution
// ============================================================================

import {
  Exercise,
  ExerciseMuscle,
  ExerciseEquipment,
  ExerciseScore,
  UserProfile,
  UserGoal,
  UserInjury,
  UserExercisePreference,
  MuscleRecoveryStatus,
} from '@/types/database';

export interface ExerciseSelectionInput {
  availableExercises: (Exercise & {
    exercise_muscles: ExerciseMuscle[];
    exercise_equipment: ExerciseEquipment[];
  })[];
  targetMuscles: string[]; // muscle slugs or names
  profile: Partial<UserProfile>;
  goals: UserGoal[];
  injuries: UserInjury[];
  preferences: UserExercisePreference[];
  recoveryMap: Record<string, MuscleRecoveryStatus>;
  recentExerciseIds?: string[];
}

export function scoreAndSelectExercises(
  input: ExerciseSelectionInput
): ExerciseScore[] {
  const {
    availableExercises,
    targetMuscles,
    profile,
    injuries,
    preferences,
    recoveryMap,
    recentExerciseIds = [],
  } = input;

  const userEquipment = new Set(
    (profile.available_equipment || []).map((e) => e.toLowerCase())
  );

  const activeInjuries = (injuries || []).filter((i) => i.is_active);
  const excludedExerciseIds = new Set(
    activeInjuries.flatMap((i) => i.excluded_exercises || [])
  );
  const excludedMovements = new Set(
    activeInjuries.flatMap((i) => i.excluded_movements || [])
  );

  const prefMap = new Map(preferences.map((p) => [p.exercise_id, p]));
  const recentSet = new Set(recentExerciseIds);

  const scoredExercises: ExerciseScore[] = [];

  for (const ex of availableExercises) {
    if (!ex.is_active) continue;

    // Hard Exclusion Checks
    if (excludedExerciseIds.has(ex.id)) continue;
    if (excludedMovements.has(ex.movement_pattern)) continue;

    // Equipment Match Check
    const requiredEquipment = ex.exercise_equipment || [];
    const matchesEquipment =
      requiredEquipment.length === 0 ||
      userEquipment.has('full_gym') ||
      userEquipment.has('commercial_gym') ||
      requiredEquipment.some((eq) =>
        eq.equipment ? userEquipment.has(eq.equipment.slug) : true
      );

    if (!matchesEquipment && userEquipment.size > 0) continue;

    // 1. Muscle Match Score (0.0 to 1.0)
    let muscleMatch = 0;
    const exMuscles = ex.exercise_muscles || [];
    for (const em of exMuscles) {
      const muscleSlug = em.muscle?.slug || em.muscle?.name || '';
      if (targetMuscles.includes(muscleSlug)) {
        muscleMatch += em.involvement_type === 'primary' ? 0.7 : 0.3;
      }
    }
    muscleMatch = Math.min(1.0, muscleMatch);

    // 2. Goal Match Score (0.0 to 1.0)
    let goalMatch = 0.8; // Default
    if (ex.exercise_type === 'compound') goalMatch += 0.2;
    if (profile.training_level === 'beginner' && ex.difficulty === 'advanced') {
      goalMatch -= 0.3;
    }

    // 3. Equipment Match Score (0.0 to 1.0)
    const equipmentMatch = matchesEquipment ? 1.0 : 0.0;

    // 4. Preference Score (0.0 to 1.0)
    const userPref = prefMap.get(ex.id);
    let preferenceScore = 0.5;
    if (userPref?.preference === 'liked') preferenceScore = 1.0;
    if (userPref?.preference === 'disliked') preferenceScore = 0.1;

    // 5. Variety Score (0.0 to 1.0)
    const varietyScore = recentSet.has(ex.id) ? 0.2 : 1.0;

    // 6. Pattern Balance (0.0 to 1.0)
    const patternBalance = 0.8;

    // Penalties
    let penalties = 0;
    if (recentSet.has(ex.id)) penalties += 0.3;

    // Fatigue Penalty
    for (const em of exMuscles) {
      if (em.muscle_id && recoveryMap[em.muscle_id]) {
        const status = recoveryMap[em.muscle_id];
        if (status.status === 'highly_fatigued') {
          penalties += em.involvement_type === 'primary' ? 0.4 : 0.15;
        } else if (status.status === 'moderately_fatigued') {
          penalties += em.involvement_type === 'primary' ? 0.2 : 0.05;
        }
      }
    }

    // Compute Total Weighted Score
    const totalScore = Math.max(
      0,
      goalMatch * 0.25 +
        muscleMatch * 0.35 +
        equipmentMatch * 0.15 +
        preferenceScore * 0.15 +
        varietyScore * 0.1 +
        patternBalance * 0.05 -
        penalties
    );

    scoredExercises.push({
      exercise: ex,
      total_score: Math.round(totalScore * 100) / 100,
      goal_match: Math.round(goalMatch * 100) / 100,
      muscle_match: Math.round(muscleMatch * 100) / 100,
      equipment_match: Math.round(equipmentMatch * 100) / 100,
      preference_score: Math.round(preferenceScore * 100) / 100,
      variety_score: Math.round(varietyScore * 100) / 100,
      pattern_balance: Math.round(patternBalance * 100) / 100,
      penalties: Math.round(penalties * 100) / 100,
    });
  }

  // Sort descending by score
  return scoredExercises.sort((a, b) => b.total_score - a.total_score);
}
