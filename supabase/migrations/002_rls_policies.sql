-- ============================================================================
-- GymPilot — Row Level Security Policies
-- ============================================================================

-- Enable RLS on all user-data tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_plan_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE planned_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_exercise_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_injuries ENABLE ROW LEVEL SECURITY;
ALTER TABLE body_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE planner_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Public read-only tables (exercises, muscles, equipment, goals, planning_parameters)
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_muscles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE muscles ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE planning_parameters ENABLE ROW LEVEL SECURITY;

-- ─── Public read-only policies ──────────────────────────────────────────────

CREATE POLICY "Exercises are viewable by everyone"
  ON exercises FOR SELECT USING (is_active = true);

CREATE POLICY "Exercise muscles are viewable by everyone"
  ON exercise_muscles FOR SELECT USING (true);

CREATE POLICY "Exercise equipment is viewable by everyone"
  ON exercise_equipment FOR SELECT USING (true);

CREATE POLICY "Muscles are viewable by everyone"
  ON muscles FOR SELECT USING (is_active = true);

CREATE POLICY "Equipment is viewable by everyone"
  ON equipment FOR SELECT USING (is_active = true);

CREATE POLICY "Goals are viewable by everyone"
  ON goals FOR SELECT USING (is_active = true);

CREATE POLICY "Planning parameters are viewable by everyone"
  ON planning_parameters FOR SELECT USING (true);

-- ─── Admin write policies for public tables ─────────────────────────────────

-- Helper function to check admin role
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_id = auth.uid()
    AND user_id IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'role' = 'admin'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Admins can manage exercises"
  ON exercises FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins can manage exercise muscles"
  ON exercise_muscles FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins can manage exercise equipment"
  ON exercise_equipment FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins can manage muscles"
  ON muscles FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins can manage equipment"
  ON equipment FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins can manage goals"
  ON goals FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins can manage planning parameters"
  ON planning_parameters FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ─── User data policies (scoped to auth.uid()) ─────────────────────────────

-- User Profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own profile"
  ON user_profiles FOR DELETE USING (auth.uid() = user_id);

-- User Goals
CREATE POLICY "Users can view own goals"
  ON user_goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own goals"
  ON user_goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own goals"
  ON user_goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own goals"
  ON user_goals FOR DELETE USING (auth.uid() = user_id);

-- Workout Plans
CREATE POLICY "Users can view own plans"
  ON workout_plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own plans"
  ON workout_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own plans"
  ON workout_plans FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own plans"
  ON workout_plans FOR DELETE USING (auth.uid() = user_id);

-- Workout Plan Days (via plan ownership)
CREATE POLICY "Users can view own plan days"
  ON workout_plan_days FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM workout_plans WHERE id = workout_plan_days.plan_id AND user_id = auth.uid()
  ));
CREATE POLICY "Users can insert own plan days"
  ON workout_plan_days FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM workout_plans WHERE id = workout_plan_days.plan_id AND user_id = auth.uid()
  ));
CREATE POLICY "Users can update own plan days"
  ON workout_plan_days FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM workout_plans WHERE id = workout_plan_days.plan_id AND user_id = auth.uid()
  ));
CREATE POLICY "Users can delete own plan days"
  ON workout_plan_days FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM workout_plans WHERE id = workout_plan_days.plan_id AND user_id = auth.uid()
  ));

-- Planned Exercises (via plan day → plan ownership)
CREATE POLICY "Users can view own planned exercises"
  ON planned_exercises FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM workout_plan_days wpd
    JOIN workout_plans wp ON wp.id = wpd.plan_id
    WHERE wpd.id = planned_exercises.plan_day_id AND wp.user_id = auth.uid()
  ));
CREATE POLICY "Users can insert own planned exercises"
  ON planned_exercises FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM workout_plan_days wpd
    JOIN workout_plans wp ON wp.id = wpd.plan_id
    WHERE wpd.id = planned_exercises.plan_day_id AND wp.user_id = auth.uid()
  ));
CREATE POLICY "Users can update own planned exercises"
  ON planned_exercises FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM workout_plan_days wpd
    JOIN workout_plans wp ON wp.id = wpd.plan_id
    WHERE wpd.id = planned_exercises.plan_day_id AND wp.user_id = auth.uid()
  ));
CREATE POLICY "Users can delete own planned exercises"
  ON planned_exercises FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM workout_plan_days wpd
    JOIN workout_plans wp ON wp.id = wpd.plan_id
    WHERE wpd.id = planned_exercises.plan_day_id AND wp.user_id = auth.uid()
  ));

-- Workout Sessions
CREATE POLICY "Users can view own sessions"
  ON workout_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sessions"
  ON workout_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sessions"
  ON workout_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sessions"
  ON workout_sessions FOR DELETE USING (auth.uid() = user_id);

-- Workout Exercises (via session ownership)
CREATE POLICY "Users can view own workout exercises"
  ON workout_exercises FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM workout_sessions WHERE id = workout_exercises.session_id AND user_id = auth.uid()
  ));
CREATE POLICY "Users can insert own workout exercises"
  ON workout_exercises FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM workout_sessions WHERE id = workout_exercises.session_id AND user_id = auth.uid()
  ));
CREATE POLICY "Users can update own workout exercises"
  ON workout_exercises FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM workout_sessions WHERE id = workout_exercises.session_id AND user_id = auth.uid()
  ));
CREATE POLICY "Users can delete own workout exercises"
  ON workout_exercises FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM workout_sessions WHERE id = workout_exercises.session_id AND user_id = auth.uid()
  ));

-- Workout Sets (via workout exercise → session ownership)
CREATE POLICY "Users can view own workout sets"
  ON workout_sets FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM workout_exercises we
    JOIN workout_sessions ws ON ws.id = we.session_id
    WHERE we.id = workout_sets.workout_exercise_id AND ws.user_id = auth.uid()
  ));
CREATE POLICY "Users can insert own workout sets"
  ON workout_sets FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM workout_exercises we
    JOIN workout_sessions ws ON ws.id = we.session_id
    WHERE we.id = workout_sets.workout_exercise_id AND ws.user_id = auth.uid()
  ));
CREATE POLICY "Users can update own workout sets"
  ON workout_sets FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM workout_exercises we
    JOIN workout_sessions ws ON ws.id = we.session_id
    WHERE we.id = workout_sets.workout_exercise_id AND ws.user_id = auth.uid()
  ));
CREATE POLICY "Users can delete own workout sets"
  ON workout_sets FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM workout_exercises we
    JOIN workout_sessions ws ON ws.id = we.session_id
    WHERE we.id = workout_sets.workout_exercise_id AND ws.user_id = auth.uid()
  ));

-- User Exercise Preferences
CREATE POLICY "Users can view own preferences"
  ON user_exercise_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own preferences"
  ON user_exercise_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences"
  ON user_exercise_preferences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own preferences"
  ON user_exercise_preferences FOR DELETE USING (auth.uid() = user_id);

-- User Injuries
CREATE POLICY "Users can view own injuries"
  ON user_injuries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own injuries"
  ON user_injuries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own injuries"
  ON user_injuries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own injuries"
  ON user_injuries FOR DELETE USING (auth.uid() = user_id);

-- Body Measurements
CREATE POLICY "Users can view own measurements"
  ON body_measurements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own measurements"
  ON body_measurements FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own measurements"
  ON body_measurements FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own measurements"
  ON body_measurements FOR DELETE USING (auth.uid() = user_id);

-- Nutrition Targets
CREATE POLICY "Users can view own nutrition"
  ON nutrition_targets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own nutrition"
  ON nutrition_targets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own nutrition"
  ON nutrition_targets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own nutrition"
  ON nutrition_targets FOR DELETE USING (auth.uid() = user_id);

-- Planner Settings
CREATE POLICY "Users can view own settings"
  ON planner_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own settings"
  ON planner_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own settings"
  ON planner_settings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own settings"
  ON planner_settings FOR DELETE USING (auth.uid() = user_id);

-- Audit Logs (admin-only)
CREATE POLICY "Admins can view audit logs"
  ON audit_logs FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert audit logs"
  ON audit_logs FOR INSERT WITH CHECK (is_admin());
