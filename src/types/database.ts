// ============================================================================
// GymPilot — Complete TypeScript Type Definitions
// ============================================================================

// ─── Enums ──────────────────────────────────────────────────────────────────

export type MeasurementSystem = 'metric' | 'imperial';

export type TrainingLevel = 'beginner' | 'intermediate' | 'advanced';

export type TrainingLocation =
  | 'commercial_gym'
  | 'home_gym'
  | 'home_minimal'
  | 'outdoor'
  | 'mixed';

export type BiologicalSex = 'male' | 'female' | 'prefer_not_to_say';

export type InvolvementType = 'primary' | 'secondary' | 'stabilizer';

export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type ExerciseType = 'compound' | 'isolation' | 'cardio' | 'flexibility';

export type MovementPattern =
  | 'horizontal_push'
  | 'vertical_push'
  | 'horizontal_pull'
  | 'vertical_pull'
  | 'squat'
  | 'hip_hinge'
  | 'lunge'
  | 'knee_flexion'
  | 'knee_extension'
  | 'elbow_flexion'
  | 'elbow_extension'
  | 'shoulder_abduction'
  | 'calf_raise'
  | 'core_flexion'
  | 'anti_extension'
  | 'anti_rotation';

export type PreferenceType = 'liked' | 'disliked' | 'neutral';

export type InjurySeverity = 'mild' | 'moderate' | 'severe';

export type WorkoutStatus = 'planned' | 'in_progress' | 'completed' | 'skipped';

export type SplitType =
  | 'full_body'
  | 'upper_lower'
  | 'push_pull_legs'
  | 'upper_lower_full'
  | 'custom';

export type UserRole = 'user' | 'admin';

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

// ─── Database Entities ──────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  age: number;
  biological_sex: BiologicalSex | null;
  height_cm: number;
  weight_kg: number;
  measurement_system: MeasurementSystem;
  training_level: TrainingLevel;
  training_days_per_week: number;
  preferred_days: DayOfWeek[];
  workout_duration_minutes: number;
  training_location: TrainingLocation;
  available_equipment: string[];
  history_window_days: number;
  created_at: string;
  updated_at: string;
}

export interface Goal {
  id: string;
  name: string;
  slug: string;
  description: string;
  default_parameters: Record<string, unknown>;
  is_active: boolean;
  sort_order: number;
}

export interface UserGoal {
  id: string;
  user_id: string;
  goal_id: string;
  is_primary: boolean;
  goal?: Goal;
}

export interface Muscle {
  id: string;
  name: string;
  slug: string;
  muscle_group: string;
  body_region: string;
  default_recovery_hours: number;
  is_active: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  slug: string;
  description: string;
  instructions: string;
  common_mistakes: string[];
  safety_notes: string;
  difficulty: ExerciseDifficulty;
  movement_pattern: MovementPattern;
  exercise_type: ExerciseType;
  youtube_url: string | null;
  thumbnail_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ExerciseMuscle {
  id: string;
  exercise_id: string;
  muscle_id: string;
  involvement_type: InvolvementType;
  activation_weight: number;
  muscle?: Muscle;
}

export interface Equipment {
  id: string;
  name: string;
  slug: string;
  category: string;
  is_active: boolean;
}

export interface ExerciseEquipment {
  id: string;
  exercise_id: string;
  equipment_id: string;
  is_primary: boolean;
  equipment?: Equipment;
}

export interface WorkoutPlan {
  id: string;
  user_id: string;
  name: string;
  split_type: SplitType;
  days_per_week: number;
  is_active: boolean;
  created_at: string;
}

export interface WorkoutPlanDay {
  id: string;
  plan_id: string;
  day_number: number;
  name: string;
  focus: string;
  target_muscles: string[];
}

export interface PlannedExercise {
  id: string;
  plan_day_id: string;
  exercise_id: string;
  order_index: number;
  sets: number;
  rep_range: string;
  rest_seconds: number;
  target_rpe: number;
  tempo: string | null;
  notes: string | null;
  exercise?: Exercise;
  exercise_muscles?: ExerciseMuscle[];
}

export interface WorkoutSession {
  id: string;
  user_id: string;
  plan_day_id: string | null;
  started_at: string;
  completed_at: string | null;
  duration_minutes: number | null;
  perceived_difficulty: number | null;
  energy_level: number | null;
  muscle_soreness: number | null;
  enjoyment: number | null;
  notes: string | null;
  status: WorkoutStatus;
}

export interface WorkoutExercise {
  id: string;
  session_id: string;
  exercise_id: string;
  order_index: number;
  skipped: boolean;
  notes: string | null;
  exercise?: Exercise;
}

export interface WorkoutSet {
  id: string;
  workout_exercise_id: string;
  set_number: number;
  weight_kg: number | null;
  reps: number | null;
  rpe: number | null;
  rir: number | null;
  completed: boolean;
  notes: string | null;
}

export interface UserExercisePreference {
  id: string;
  user_id: string;
  exercise_id: string;
  preference: PreferenceType;
  skip_count: number;
  replace_count: number;
  last_performed: string | null;
}

export interface UserInjury {
  id: string;
  user_id: string;
  description: string;
  body_area: string;
  severity: InjurySeverity;
  excluded_exercises: string[];
  excluded_movements: MovementPattern[];
  is_active: boolean;
  created_at: string;
}

export interface BodyMeasurement {
  id: string;
  user_id: string;
  weight_kg: number;
  body_fat_pct: number | null;
  measurements: Record<string, number>;
  recorded_at: string;
}

export interface NutritionTarget {
  id: string;
  user_id: string;
  bmr: number;
  tdee: number;
  calories_min: number;
  calories_max: number;
  protein_min_g: number;
  protein_max_g: number;
  fat_min_g: number;
  fat_max_g: number;
  carbs_min_g: number;
  carbs_max_g: number;
  water_liters: number;
  calculated_at: string;
}

export interface PlannerSettings {
  id: string;
  user_id: string;
  history_window_days: number;
  difficulty_preference: string;
  show_advanced_terminology: boolean;
  custom_parameters: Record<string, unknown>;
}

export interface PlanningParameter {
  id: string;
  parameter_key: string;
  category: string;
  value: unknown;
  description: string;
  updated_at: string;
  updated_by: string | null;
}

export interface AuditLog {
  id: string;
  admin_id: string;
  action: string;
  entity: string;
  entity_id: string;
  previous_value: unknown;
  new_value: unknown;
  created_at: string;
}

// ─── Engine Types ───────────────────────────────────────────────────────────

export interface MuscleRecoveryStatus {
  muscle_id: string;
  muscle_name: string;
  muscle_group: string;
  recovery_score: number; // 0.0 (fatigued) → 1.0 (recovered)
  hours_since_training: number | null;
  last_trained_at: string | null;
  status: 'recovered' | 'partially_recovered' | 'moderately_fatigued' | 'highly_fatigued';
}

export interface ExerciseScore {
  exercise: Exercise & {
    exercise_muscles?: ExerciseMuscle[];
    exercise_equipment?: ExerciseEquipment[];
  };
  total_score: number;
  goal_match: number;
  muscle_match: number;
  equipment_match: number;
  preference_score: number;
  variety_score: number;
  pattern_balance: number;
  penalties: number;
}

export interface GeneratedWorkout {
  plan_day: WorkoutPlanDay;
  exercises: GeneratedExercise[];
  estimated_duration_minutes: number;
  muscle_coverage: Record<string, number>;
}

export interface GeneratedExercise {
  exercise: Exercise;
  muscles: ExerciseMuscle[];
  equipment: ExerciseEquipment[];
  sets: number;
  rep_range: string;
  rest_seconds: number;
  target_rpe: number;
  suggested_weight_kg: number | null;
  previous_performance: PreviousPerformance | null;
  order_index: number;
}

export interface PreviousPerformance {
  weight_kg: number;
  reps: number;
  rpe: number | null;
  date: string;
}

export interface WorkoutGenerationInput {
  profile: UserProfile;
  goals: UserGoal[];
  injuries: UserInjury[];
  preferences: UserExercisePreference[];
  recentSessions: WorkoutSession[];
  recentSets: (WorkoutSet & { exercise_id: string })[];
  planDay: WorkoutPlanDay;
  availableExercises: (Exercise & {
    exercise_muscles: ExerciseMuscle[];
    exercise_equipment: ExerciseEquipment[];
  })[];
  parameters: Record<string, PlanningParameter>;
}

export interface WorkoutValidationResult {
  valid: boolean;
  warnings: ValidationWarning[];
  errors: ValidationError[];
}

export interface ValidationWarning {
  type: 'excessive_volume' | 'insufficient_recovery' | 'missing_pattern' | 'long_duration' | 'muscle_imbalance';
  message: string;
  details: Record<string, unknown>;
}

export interface ValidationError {
  type: 'injury_conflict' | 'equipment_unavailable' | 'duplicate_exercise';
  message: string;
  details: Record<string, unknown>;
}

// ─── Food & Nutrition Logging Types ─────────────────────────────────────────

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  serving_size?: string;
  meal_type: MealType;
  logged_at?: string;
}

export interface DailyFoodLog {
  date: string; // YYYY-MM-DD
  entries: FoodEntry[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

// ─── Guest Store Types ──────────────────────────────────────────────────────

export interface GuestData {
  profile: Partial<UserProfile>;
  goals: { goalSlug: string; isPrimary: boolean }[];
  injuries: Omit<UserInjury, 'id' | 'user_id' | 'created_at'>[];
  currentPlan: {
    splitType: SplitType;
    days: WorkoutPlanDay[];
    exercises: Record<string, GeneratedExercise[]>; // keyed by day ID
  } | null;
  sessions: Omit<WorkoutSession, 'id' | 'user_id'>[];
  foodLogs?: Record<string, DailyFoodLog>;
  createdAt: string;
}

// ─── Nutrition Engine Types ─────────────────────────────────────────────────

export interface NutritionInput {
  age: number;
  height_cm: number;
  weight_kg: number;
  biological_sex: BiologicalSex | null;
  training_days_per_week: number;
  goals: string[];
}

export interface NutritionRecommendation {
  bmr: number;
  tdee: number;
  calories: { min: number; max: number };
  protein: { min: number; max: number };
  fat: { min: number; max: number };
  carbs: { min: number; max: number };
  water_liters: number;
}

// ─── API Response Types ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
