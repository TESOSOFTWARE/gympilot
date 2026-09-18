-- ============================================================================
-- GymPilot Database Schema — Initial Migration
-- ============================================================================
-- Run against a PostgreSQL / Supabase database.
-- Supabase's auth.users table provides the base user identity.
-- ============================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Goals ──────────────────────────────────────────────────────────────────

CREATE TABLE goals (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  default_parameters JSONB NOT NULL DEFAULT '{}',
  is_active   BOOLEAN NOT NULL DEFAULT true,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- ─── Muscles ────────────────────────────────────────────────────────────────

CREATE TABLE muscles (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                  TEXT NOT NULL,
  slug                  TEXT NOT NULL UNIQUE,
  muscle_group          TEXT NOT NULL,
  body_region           TEXT NOT NULL,
  default_recovery_hours NUMERIC(5,1) NOT NULL DEFAULT 48,
  is_active             BOOLEAN NOT NULL DEFAULT true
);

-- ─── Equipment ──────────────────────────────────────────────────────────────

CREATE TABLE equipment (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name      TEXT NOT NULL,
  slug      TEXT NOT NULL UNIQUE,
  category  TEXT NOT NULL DEFAULT 'general',
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- ─── Exercises ──────────────────────────────────────────────────────────────

CREATE TABLE exercises (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  description      TEXT NOT NULL DEFAULT '',
  instructions     TEXT NOT NULL DEFAULT '',
  common_mistakes  TEXT[] NOT NULL DEFAULT '{}',
  safety_notes     TEXT NOT NULL DEFAULT '',
  difficulty       TEXT NOT NULL DEFAULT 'intermediate'
                   CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  movement_pattern TEXT NOT NULL
                   CHECK (movement_pattern IN (
                     'horizontal_push','vertical_push','horizontal_pull','vertical_pull',
                     'squat','hip_hinge','lunge','knee_flexion','knee_extension',
                     'elbow_flexion','elbow_extension','shoulder_abduction',
                     'calf_raise','core_flexion','anti_extension','anti_rotation'
                   )),
  exercise_type    TEXT NOT NULL DEFAULT 'compound'
                   CHECK (exercise_type IN ('compound', 'isolation', 'cardio', 'flexibility')),
  youtube_url      TEXT,
  thumbnail_url    TEXT,
  is_active        BOOLEAN NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_exercises_movement ON exercises(movement_pattern);
CREATE INDEX idx_exercises_active ON exercises(is_active);
CREATE INDEX idx_exercises_slug ON exercises(slug);

-- ─── Exercise ↔ Muscle ─────────────────────────────────────────────────────

CREATE TABLE exercise_muscles (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exercise_id      UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  muscle_id        UUID NOT NULL REFERENCES muscles(id) ON DELETE CASCADE,
  involvement_type TEXT NOT NULL
                   CHECK (involvement_type IN ('primary', 'secondary', 'stabilizer')),
  activation_weight NUMERIC(3,2) NOT NULL DEFAULT 0.5
                   CHECK (activation_weight >= 0 AND activation_weight <= 1),
  UNIQUE (exercise_id, muscle_id)
);

CREATE INDEX idx_exercise_muscles_exercise ON exercise_muscles(exercise_id);
CREATE INDEX idx_exercise_muscles_muscle ON exercise_muscles(muscle_id);

-- ─── Exercise ↔ Equipment ──────────────────────────────────────────────────

CREATE TABLE exercise_equipment (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exercise_id  UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  equipment_id UUID NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
  is_primary   BOOLEAN NOT NULL DEFAULT true,
  UNIQUE (exercise_id, equipment_id)
);

CREATE INDEX idx_exercise_equipment_exercise ON exercise_equipment(exercise_id);

-- ─── User Profiles ─────────────────────────────────────────────────────────

CREATE TABLE user_profiles (
  id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                 UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name                    TEXT NOT NULL DEFAULT '',
  age                     INTEGER,
  biological_sex          TEXT CHECK (biological_sex IN ('male', 'female', 'prefer_not_to_say')),
  height_cm               NUMERIC(5,1),
  weight_kg               NUMERIC(5,1),
  measurement_system      TEXT NOT NULL DEFAULT 'metric'
                          CHECK (measurement_system IN ('metric', 'imperial')),
  training_level          TEXT NOT NULL DEFAULT 'beginner'
                          CHECK (training_level IN ('beginner', 'intermediate', 'advanced')),
  training_days_per_week  INTEGER NOT NULL DEFAULT 3
                          CHECK (training_days_per_week >= 1 AND training_days_per_week <= 7),
  preferred_days          TEXT[] NOT NULL DEFAULT '{}',
  workout_duration_minutes INTEGER NOT NULL DEFAULT 60
                          CHECK (workout_duration_minutes >= 15 AND workout_duration_minutes <= 180),
  training_location       TEXT NOT NULL DEFAULT 'commercial_gym'
                          CHECK (training_location IN (
                            'commercial_gym','home_gym','home_minimal','outdoor','mixed'
                          )),
  available_equipment     TEXT[] NOT NULL DEFAULT '{}',
  history_window_days     INTEGER NOT NULL DEFAULT 7
                          CHECK (history_window_days >= 1 AND history_window_days <= 90),
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_user_profiles_user ON user_profiles(user_id);

-- ─── User Goals ─────────────────────────────────────────────────────────────

CREATE TABLE user_goals (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  goal_id    UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  UNIQUE (user_id, goal_id)
);

CREATE INDEX idx_user_goals_user ON user_goals(user_id);

-- ─── Workout Plans ──────────────────────────────────────────────────────────

CREATE TABLE workout_plans (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  split_type    TEXT NOT NULL
                CHECK (split_type IN ('full_body','upper_lower','push_pull_legs','upper_lower_full','custom')),
  days_per_week INTEGER NOT NULL CHECK (days_per_week >= 1 AND days_per_week <= 7),
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_workout_plans_user ON workout_plans(user_id);
CREATE INDEX idx_workout_plans_active ON workout_plans(user_id, is_active);

-- ─── Workout Plan Days ──────────────────────────────────────────────────────

CREATE TABLE workout_plan_days (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id        UUID NOT NULL REFERENCES workout_plans(id) ON DELETE CASCADE,
  day_number     INTEGER NOT NULL CHECK (day_number >= 1 AND day_number <= 7),
  name           TEXT NOT NULL,
  focus          TEXT NOT NULL DEFAULT '',
  target_muscles TEXT[] NOT NULL DEFAULT '{}'
);

CREATE INDEX idx_workout_plan_days_plan ON workout_plan_days(plan_id);

-- ─── Planned Exercises ──────────────────────────────────────────────────────

CREATE TABLE planned_exercises (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_day_id  UUID NOT NULL REFERENCES workout_plan_days(id) ON DELETE CASCADE,
  exercise_id  UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  order_index  INTEGER NOT NULL DEFAULT 0,
  sets         INTEGER NOT NULL DEFAULT 3 CHECK (sets >= 1 AND sets <= 20),
  rep_range    TEXT NOT NULL DEFAULT '8-12',
  rest_seconds INTEGER NOT NULL DEFAULT 90 CHECK (rest_seconds >= 0 AND rest_seconds <= 600),
  target_rpe   NUMERIC(3,1) NOT NULL DEFAULT 7.0 CHECK (target_rpe >= 1 AND target_rpe <= 10),
  tempo        TEXT,
  notes        TEXT
);

CREATE INDEX idx_planned_exercises_day ON planned_exercises(plan_day_id);

-- ─── Workout Sessions ───────────────────────────────────────────────────────

CREATE TABLE workout_sessions (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id              UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_day_id          UUID REFERENCES workout_plan_days(id) ON DELETE SET NULL,
  started_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at         TIMESTAMPTZ,
  duration_minutes     INTEGER,
  perceived_difficulty INTEGER CHECK (perceived_difficulty >= 1 AND perceived_difficulty <= 5),
  energy_level         INTEGER CHECK (energy_level >= 1 AND energy_level <= 5),
  muscle_soreness      INTEGER CHECK (muscle_soreness >= 1 AND muscle_soreness <= 5),
  enjoyment            INTEGER CHECK (enjoyment >= 1 AND enjoyment <= 5),
  notes                TEXT,
  status               TEXT NOT NULL DEFAULT 'planned'
                       CHECK (status IN ('planned','in_progress','completed','skipped'))
);

CREATE INDEX idx_workout_sessions_user ON workout_sessions(user_id);
CREATE INDEX idx_workout_sessions_user_date ON workout_sessions(user_id, started_at DESC);

-- ─── Workout Exercises ──────────────────────────────────────────────────────

CREATE TABLE workout_exercises (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id  UUID NOT NULL REFERENCES workout_sessions(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL DEFAULT 0,
  skipped     BOOLEAN NOT NULL DEFAULT false,
  notes       TEXT
);

CREATE INDEX idx_workout_exercises_session ON workout_exercises(session_id);

-- ─── Workout Sets ───────────────────────────────────────────────────────────

CREATE TABLE workout_sets (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workout_exercise_id UUID NOT NULL REFERENCES workout_exercises(id) ON DELETE CASCADE,
  set_number          INTEGER NOT NULL CHECK (set_number >= 1),
  weight_kg           NUMERIC(6,2),
  reps                INTEGER CHECK (reps >= 0),
  rpe                 NUMERIC(3,1) CHECK (rpe >= 1 AND rpe <= 10),
  rir                 INTEGER CHECK (rir >= 0 AND rir <= 10),
  completed           BOOLEAN NOT NULL DEFAULT false,
  notes               TEXT
);

CREATE INDEX idx_workout_sets_exercise ON workout_sets(workout_exercise_id);

-- ─── User Exercise Preferences ──────────────────────────────────────────────

CREATE TABLE user_exercise_preferences (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id    UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  preference     TEXT NOT NULL DEFAULT 'neutral'
                 CHECK (preference IN ('liked', 'disliked', 'neutral')),
  skip_count     INTEGER NOT NULL DEFAULT 0,
  replace_count  INTEGER NOT NULL DEFAULT 0,
  last_performed TIMESTAMPTZ,
  UNIQUE (user_id, exercise_id)
);

CREATE INDEX idx_user_exercise_prefs_user ON user_exercise_preferences(user_id);

-- ─── User Injuries ─────────────────────────────────────────────────────────

CREATE TABLE user_injuries (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  description       TEXT NOT NULL,
  body_area         TEXT NOT NULL,
  severity          TEXT NOT NULL DEFAULT 'mild'
                    CHECK (severity IN ('mild', 'moderate', 'severe')),
  excluded_exercises UUID[] NOT NULL DEFAULT '{}',
  excluded_movements TEXT[] NOT NULL DEFAULT '{}',
  is_active         BOOLEAN NOT NULL DEFAULT true,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_user_injuries_user ON user_injuries(user_id);

-- ─── Body Measurements ─────────────────────────────────────────────────────

CREATE TABLE body_measurements (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  weight_kg    NUMERIC(5,1) NOT NULL,
  body_fat_pct NUMERIC(4,1),
  measurements JSONB NOT NULL DEFAULT '{}',
  recorded_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_body_measurements_user ON body_measurements(user_id);
CREATE INDEX idx_body_measurements_date ON body_measurements(user_id, recorded_at DESC);

-- ─── Nutrition Targets ──────────────────────────────────────────────────────

CREATE TABLE nutrition_targets (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  bmr           NUMERIC(7,1) NOT NULL,
  tdee          NUMERIC(7,1) NOT NULL,
  calories_min  NUMERIC(7,1) NOT NULL,
  calories_max  NUMERIC(7,1) NOT NULL,
  protein_min_g NUMERIC(5,1) NOT NULL,
  protein_max_g NUMERIC(5,1) NOT NULL,
  fat_min_g     NUMERIC(5,1) NOT NULL,
  fat_max_g     NUMERIC(5,1) NOT NULL,
  carbs_min_g   NUMERIC(5,1) NOT NULL,
  carbs_max_g   NUMERIC(5,1) NOT NULL,
  water_liters  NUMERIC(3,1) NOT NULL DEFAULT 2.5,
  calculated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Planner Settings ───────────────────────────────────────────────────────

CREATE TABLE planner_settings (
  id                       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                  UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  history_window_days      INTEGER NOT NULL DEFAULT 7,
  difficulty_preference    TEXT NOT NULL DEFAULT 'moderate',
  show_advanced_terminology BOOLEAN NOT NULL DEFAULT false,
  custom_parameters        JSONB NOT NULL DEFAULT '{}'
);

-- ─── Planning Parameters (Admin-configurable) ──────────────────────────────

CREATE TABLE planning_parameters (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parameter_key  TEXT NOT NULL UNIQUE,
  category       TEXT NOT NULL,
  value          JSONB NOT NULL,
  description    TEXT NOT NULL DEFAULT '',
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by     UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX idx_planning_params_category ON planning_parameters(category);
CREATE INDEX idx_planning_params_key ON planning_parameters(parameter_key);

-- ─── Audit Logs ─────────────────────────────────────────────────────────────

CREATE TABLE audit_logs (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  action         TEXT NOT NULL,
  entity         TEXT NOT NULL,
  entity_id      UUID,
  previous_value JSONB,
  new_value      JSONB,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_logs_admin ON audit_logs(admin_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity, entity_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- ─── Updated-at trigger ─────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_exercises_updated_at
  BEFORE UPDATE ON exercises
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_planning_parameters_updated_at
  BEFORE UPDATE ON planning_parameters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
