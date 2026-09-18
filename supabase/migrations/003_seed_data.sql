-- ============================================================================
-- GymPilot — Seed Data
-- 80+ exercises with full muscle mappings, equipment, goals, parameters
-- ============================================================================

-- ─── Equipment ──────────────────────────────────────────────────────────────

INSERT INTO equipment (id, name, slug, category) VALUES
  ('e0000001-0000-0000-0000-000000000001', 'Barbell', 'barbell', 'free_weights'),
  ('e0000001-0000-0000-0000-000000000002', 'Dumbbells', 'dumbbells', 'free_weights'),
  ('e0000001-0000-0000-0000-000000000003', 'Cable Machine', 'cable-machine', 'machines'),
  ('e0000001-0000-0000-0000-000000000004', 'Smith Machine', 'smith-machine', 'machines'),
  ('e0000001-0000-0000-0000-000000000005', 'Resistance Bands', 'resistance-bands', 'accessories'),
  ('e0000001-0000-0000-0000-000000000006', 'Pull-up Bar', 'pull-up-bar', 'bodyweight'),
  ('e0000001-0000-0000-0000-000000000007', 'Machines', 'machines', 'machines'),
  ('e0000001-0000-0000-0000-000000000008', 'Kettlebell', 'kettlebell', 'free_weights'),
  ('e0000001-0000-0000-0000-000000000009', 'Bodyweight', 'bodyweight', 'bodyweight'),
  ('e0000001-0000-0000-0000-000000000010', 'EZ Curl Bar', 'ez-curl-bar', 'free_weights'),
  ('e0000001-0000-0000-0000-000000000011', 'Bench', 'bench', 'accessories'),
  ('e0000001-0000-0000-0000-000000000012', 'Dip Station', 'dip-station', 'bodyweight');

-- ─── Muscles ────────────────────────────────────────────────────────────────

INSERT INTO muscles (id, name, slug, muscle_group, body_region, default_recovery_hours) VALUES
  -- Chest
  ('m0000001-0000-0000-0000-000000000001', 'Upper Chest', 'upper-chest', 'Chest', 'upper_body', 48),
  ('m0000001-0000-0000-0000-000000000002', 'Mid Chest', 'mid-chest', 'Chest', 'upper_body', 48),
  ('m0000001-0000-0000-0000-000000000003', 'Lower Chest', 'lower-chest', 'Chest', 'upper_body', 48),
  -- Back
  ('m0000001-0000-0000-0000-000000000004', 'Latissimus Dorsi', 'lats', 'Back', 'upper_body', 48),
  ('m0000001-0000-0000-0000-000000000005', 'Upper Trapezius', 'upper-traps', 'Back', 'upper_body', 36),
  ('m0000001-0000-0000-0000-000000000006', 'Rhomboids', 'rhomboids', 'Back', 'upper_body', 36),
  ('m0000001-0000-0000-0000-000000000007', 'Erector Spinae', 'erector-spinae', 'Back', 'upper_body', 48),
  ('m0000001-0000-0000-0000-000000000008', 'Lower Trapezius', 'lower-traps', 'Back', 'upper_body', 36),
  -- Shoulders
  ('m0000001-0000-0000-0000-000000000009', 'Anterior Deltoid', 'anterior-deltoid', 'Shoulders', 'upper_body', 36),
  ('m0000001-0000-0000-0000-000000000010', 'Lateral Deltoid', 'lateral-deltoid', 'Shoulders', 'upper_body', 36),
  ('m0000001-0000-0000-0000-000000000011', 'Posterior Deltoid', 'posterior-deltoid', 'Shoulders', 'upper_body', 36),
  -- Arms
  ('m0000001-0000-0000-0000-000000000012', 'Biceps', 'biceps', 'Arms', 'upper_body', 36),
  ('m0000001-0000-0000-0000-000000000013', 'Triceps', 'triceps', 'Arms', 'upper_body', 36),
  ('m0000001-0000-0000-0000-000000000014', 'Brachialis', 'brachialis', 'Arms', 'upper_body', 36),
  ('m0000001-0000-0000-0000-000000000015', 'Forearms', 'forearms', 'Arms', 'upper_body', 24),
  -- Legs
  ('m0000001-0000-0000-0000-000000000016', 'Quadriceps', 'quadriceps', 'Legs', 'lower_body', 48),
  ('m0000001-0000-0000-0000-000000000017', 'Hamstrings', 'hamstrings', 'Legs', 'lower_body', 48),
  ('m0000001-0000-0000-0000-000000000018', 'Glutes', 'glutes', 'Legs', 'lower_body', 48),
  ('m0000001-0000-0000-0000-000000000019', 'Adductors', 'adductors', 'Legs', 'lower_body', 36),
  ('m0000001-0000-0000-0000-000000000020', 'Abductors', 'abductors', 'Legs', 'lower_body', 36),
  ('m0000001-0000-0000-0000-000000000021', 'Calves', 'calves', 'Legs', 'lower_body', 24),
  -- Core
  ('m0000001-0000-0000-0000-000000000022', 'Rectus Abdominis', 'rectus-abdominis', 'Core', 'core', 24),
  ('m0000001-0000-0000-0000-000000000023', 'Obliques', 'obliques', 'Core', 'core', 24),
  ('m0000001-0000-0000-0000-000000000024', 'Transverse Abdominis', 'transverse-abdominis', 'Core', 'core', 24),
  ('m0000001-0000-0000-0000-000000000025', 'Lower Back', 'lower-back', 'Core', 'core', 48);

-- ─── Goals ──────────────────────────────────────────────────────────────────

INSERT INTO goals (id, name, slug, description, default_parameters, sort_order) VALUES
  ('g0000001-0000-0000-0000-000000000001', 'Build Muscle', 'build-muscle',
   'Focus on muscle hypertrophy through progressive resistance training',
   '{"rep_range": "8-12", "rest_seconds": 90, "target_rpe": 7.5, "weekly_sets_per_muscle": 12}', 1),
  ('g0000001-0000-0000-0000-000000000002', 'Strength', 'strength',
   'Maximize strength gains through heavy compound lifts',
   '{"rep_range": "3-6", "rest_seconds": 180, "target_rpe": 8.5, "weekly_sets_per_muscle": 8}', 2),
  ('g0000001-0000-0000-0000-000000000003', 'Fat Loss', 'fat-loss',
   'Reduce body fat while preserving lean muscle mass',
   '{"rep_range": "10-15", "rest_seconds": 60, "target_rpe": 7.0, "weekly_sets_per_muscle": 10}', 3),
  ('g0000001-0000-0000-0000-000000000004', 'General Fitness', 'general-fitness',
   'Improve overall fitness, health, and well-being',
   '{"rep_range": "8-15", "rest_seconds": 90, "target_rpe": 7.0, "weekly_sets_per_muscle": 10}', 4),
  ('g0000001-0000-0000-0000-000000000005', 'Body Recomposition', 'body-recomposition',
   'Simultaneously build muscle and reduce body fat',
   '{"rep_range": "8-12", "rest_seconds": 90, "target_rpe": 7.5, "weekly_sets_per_muscle": 12}', 5),
  ('g0000001-0000-0000-0000-000000000006', 'Improve Endurance', 'improve-endurance',
   'Build muscular and cardiovascular endurance',
   '{"rep_range": "12-20", "rest_seconds": 45, "target_rpe": 6.5, "weekly_sets_per_muscle": 8}', 6),
  ('g0000001-0000-0000-0000-000000000007', 'Athletic Performance', 'athletic-performance',
   'Enhance speed, power, agility and athletic ability',
   '{"rep_range": "5-8", "rest_seconds": 120, "target_rpe": 8.0, "weekly_sets_per_muscle": 10}', 7),
  ('g0000001-0000-0000-0000-000000000008', 'Improve Mobility', 'improve-mobility',
   'Increase flexibility, range of motion and joint health',
   '{"rep_range": "12-15", "rest_seconds": 60, "target_rpe": 6.0, "weekly_sets_per_muscle": 6}', 8),
  ('g0000001-0000-0000-0000-000000000009', 'Maintain Fitness', 'maintain-fitness',
   'Maintain current fitness levels with moderate training',
   '{"rep_range": "8-12", "rest_seconds": 90, "target_rpe": 6.5, "weekly_sets_per_muscle": 8}', 9),
  ('g0000001-0000-0000-0000-000000000010', 'Bodybuilding', 'bodybuilding',
   'Sculpt physique with emphasis on symmetry and muscle development',
   '{"rep_range": "8-15", "rest_seconds": 75, "target_rpe": 8.0, "weekly_sets_per_muscle": 16}', 10);

-- ─── Exercises ──────────────────────────────────────────────────────────────
-- 80+ exercises covering all major muscle groups and movement patterns

-- ── CHEST EXERCISES ─────────────────────────────────────────────────────────

INSERT INTO exercises (id, name, slug, description, instructions, common_mistakes, safety_notes, difficulty, movement_pattern, exercise_type) VALUES
-- 1. Barbell Bench Press
('ex000001-0000-0000-0000-000000000001', 'Barbell Bench Press', 'barbell-bench-press',
 'The king of chest exercises. A compound push movement targeting the chest, triceps, and shoulders.',
 'Lie flat on a bench with feet firmly on the floor. Grip the bar slightly wider than shoulder-width. Unrack the bar with arms extended. Lower the bar to your mid-chest in a controlled manner. Press the bar back up to lockout.',
 ARRAY['Bouncing the bar off the chest', 'Flaring elbows excessively', 'Lifting hips off the bench', 'Not using a full range of motion'],
 'Always use a spotter when lifting heavy. Ensure the bar path is controlled throughout the movement.',
 'intermediate', 'horizontal_push', 'compound'),

-- 2. Incline Dumbbell Press
('ex000001-0000-0000-0000-000000000002', 'Incline Dumbbell Press', 'incline-dumbbell-press',
 'Targets the upper chest with secondary emphasis on shoulders and triceps.',
 'Set bench to 30-45 degrees. Hold dumbbells at shoulder level with palms facing forward. Press dumbbells up and slightly together. Lower under control to the starting position.',
 ARRAY['Setting the incline too steep', 'Using momentum to lift', 'Not bringing dumbbells low enough'],
 'Control the dumbbells at all times. Start with a weight you can manage safely.',
 'intermediate', 'horizontal_push', 'compound'),

-- 3. Dumbbell Bench Press
('ex000001-0000-0000-0000-000000000003', 'Dumbbell Bench Press', 'dumbbell-bench-press',
 'Flat bench press variation using dumbbells for greater range of motion and unilateral balance.',
 'Lie flat on a bench holding dumbbells at chest level. Press the dumbbells up until arms are extended. Lower back to the starting position under control.',
 ARRAY['Flaring elbows too wide', 'Using momentum', 'Not going through full range of motion'],
 'Have a spotter help you get into position with heavy dumbbells.',
 'beginner', 'horizontal_push', 'compound'),

-- 4. Machine Chest Press
('ex000001-0000-0000-0000-000000000004', 'Machine Chest Press', 'machine-chest-press',
 'A machine-guided pressing movement ideal for isolating the chest safely.',
 'Adjust the seat so handles are at chest height. Grip the handles and press forward until arms are nearly extended. Return slowly to the starting position.',
 ARRAY['Setting the seat too high or low', 'Not controlling the eccentric phase', 'Locking out elbows forcefully'],
 'Safe for beginners. Adjust the seat height for proper alignment.',
 'beginner', 'horizontal_push', 'compound'),

-- 5. Incline Barbell Bench Press
('ex000001-0000-0000-0000-000000000005', 'Incline Barbell Bench Press', 'incline-barbell-bench-press',
 'Barbell pressing on an incline to emphasize the upper chest and shoulders.',
 'Set bench to 30-45 degrees. Grip the bar slightly wider than shoulder-width. Unrack and lower the bar to your upper chest. Press back up to lockout.',
 ARRAY['Incline too steep (becomes shoulder press)', 'Bouncing bar off chest', 'Excessive back arch'],
 'Use a spotter for heavy sets. Ensure the bench is securely locked at the desired angle.',
 'intermediate', 'horizontal_push', 'compound'),

-- 6. Cable Crossover
('ex000001-0000-0000-0000-000000000006', 'Cable Crossover', 'cable-crossover',
 'An isolation exercise providing constant tension on the chest through the full range of motion.',
 'Set cable pulleys to the highest position. Step forward and lean slightly. With a slight bend in the elbows, bring your hands together in front of your chest. Slowly return to the starting position.',
 ARRAY['Using too much weight', 'Bending elbows excessively', 'Leaning too far forward'],
 'Keep movements controlled. Focus on the squeeze at the bottom of the movement.',
 'intermediate', 'horizontal_push', 'isolation'),

-- 7. Dips (Chest)
('ex000001-0000-0000-0000-000000000007', 'Dips (Chest)', 'dips-chest',
 'A bodyweight compound exercise that heavily targets the lower chest and triceps.',
 'Grip parallel bars and support your body weight. Lean your torso forward slightly. Lower your body until your upper arms are parallel to the floor. Push back up to the starting position.',
 ARRAY['Not leaning forward enough (shifts to triceps)', 'Going too deep causing shoulder pain', 'Swinging the body'],
 'If you have shoulder issues, limit the depth of the dip. Add weight only when bodyweight becomes easy.',
 'intermediate', 'horizontal_push', 'compound'),

-- 8. Push-ups
('ex000001-0000-0000-0000-000000000008', 'Push-ups', 'push-ups',
 'A fundamental bodyweight exercise for chest, shoulders, and triceps.',
 'Place hands slightly wider than shoulder-width on the floor. Maintain a straight line from head to heels. Lower your body until your chest nearly touches the floor. Push back up to the starting position.',
 ARRAY['Sagging hips', 'Flaring elbows out too wide', 'Not going through full range of motion', 'Looking up instead of keeping a neutral neck'],
 'A safe exercise for all levels. Modify on knees if needed.',
 'beginner', 'horizontal_push', 'compound'),

-- ── BACK EXERCISES ──────────────────────────────────────────────────────────

-- 9. Barbell Row
('ex000001-0000-0000-0000-000000000009', 'Barbell Row', 'barbell-row',
 'A foundational back exercise targeting the lats, rhomboids, and rear delts.',
 'Stand with feet shoulder-width apart, hinge at the hips holding a barbell. Pull the bar towards your lower chest/upper abdomen. Lower under control.',
 ARRAY['Rounding the lower back', 'Using excessive momentum', 'Not pulling to the correct height'],
 'Maintain a neutral spine throughout. Start with lighter weight to master form.',
 'intermediate', 'horizontal_pull', 'compound'),

-- 10. Lat Pulldown
('ex000001-0000-0000-0000-000000000010', 'Lat Pulldown', 'lat-pulldown',
 'A cable machine exercise primarily targeting the latissimus dorsi.',
 'Sit at the lat pulldown machine with thighs secured. Grip the bar wider than shoulder-width. Pull the bar down to your upper chest. Slowly return to the starting position.',
 ARRAY['Pulling the bar behind the neck', 'Leaning back excessively', 'Using too much momentum'],
 'Keep a controlled tempo and focus on engaging the lats.',
 'beginner', 'vertical_pull', 'compound'),

-- 11. Pull-ups
('ex000001-0000-0000-0000-000000000011', 'Pull-ups', 'pull-ups',
 'A challenging bodyweight exercise for back width and overall upper body strength.',
 'Hang from a pull-up bar with an overhand grip wider than shoulder-width. Pull yourself up until your chin clears the bar. Lower yourself back down with control.',
 ARRAY['Using excessive kipping', 'Not going through full range of motion', 'Crossing legs excessively'],
 'If unable to perform full pull-ups, use assisted variations or resistance bands.',
 'advanced', 'vertical_pull', 'compound'),

-- 12. Seated Cable Row
('ex000001-0000-0000-0000-000000000012', 'Seated Cable Row', 'seated-cable-row',
 'A cable exercise for back thickness targeting the rhomboids and mid-back.',
 'Sit at the cable row station with feet on the platform. Grip the handle with arms extended. Pull the handle to your abdomen, squeezing your shoulder blades together. Return slowly.',
 ARRAY['Rounding the back', 'Leaning too far forward or backward', 'Using arms instead of back'],
 'Maintain an upright torso and focus on squeezing the shoulder blades.',
 'beginner', 'horizontal_pull', 'compound'),

-- 13. Dumbbell Row
('ex000001-0000-0000-0000-000000000013', 'Dumbbell Row', 'dumbbell-row',
 'A unilateral back exercise allowing for a full range of motion and isolating each side.',
 'Place one knee and hand on a bench for support. Hold a dumbbell in the opposite hand. Pull the dumbbell towards your hip. Lower under control.',
 ARRAY['Rounding the back', 'Rotating the torso excessively', 'Using momentum to swing the weight'],
 'Keep your back flat and parallel to the floor. Focus on pulling with the elbow.',
 'beginner', 'horizontal_pull', 'compound'),

-- 14. T-Bar Row
('ex000001-0000-0000-0000-000000000014', 'T-Bar Row', 't-bar-row',
 'A compound back exercise for building thickness in the mid-back.',
 'Straddle the T-bar machine. Grip the handles and hinge at the hips. Pull the weight towards your chest. Lower under control.',
 ARRAY['Rounding the lower back', 'Standing too upright', 'Using too much body momentum'],
 'Keep the back straight and core braced throughout the movement.',
 'intermediate', 'horizontal_pull', 'compound'),

-- 15. Face Pull
('ex000001-0000-0000-0000-000000000015', 'Face Pull', 'face-pull',
 'A cable exercise targeting the rear delts and upper back for shoulder health.',
 'Set a cable machine to face height with a rope attachment. Pull the rope towards your face, separating the ends. Squeeze the rear delts at the peak. Return slowly.',
 ARRAY['Using too much weight', 'Not pulling far enough back', 'Leaning back excessively'],
 'Use light to moderate weight. This is a corrective exercise, not a heavy lift.',
 'beginner', 'horizontal_pull', 'isolation'),

-- 16. Chin-ups
('ex000001-0000-0000-0000-000000000016', 'Chin-ups', 'chin-ups',
 'An underhand grip pull-up variation emphasizing biceps and lower lats.',
 'Hang from a bar with palms facing you, shoulder-width apart. Pull yourself up until your chin clears the bar. Lower with control.',
 ARRAY['Kipping or swinging', 'Not lowering fully', 'Grip too narrow or wide'],
 'A great alternative if pull-ups are too difficult. Use assistance if needed.',
 'intermediate', 'vertical_pull', 'compound'),

-- 17. Cable Lat Pullover
('ex000001-0000-0000-0000-000000000017', 'Cable Lat Pullover', 'cable-lat-pullover',
 'An isolation exercise for the lats using a cable machine.',
 'Stand facing a high cable with a straight bar attachment. With slightly bent arms, pull the bar down in an arc to your thighs. Return slowly to the starting position.',
 ARRAY['Bending the elbows too much', 'Using too much weight', 'Engaging arms more than lats'],
 'Focus on the lat contraction throughout the movement.',
 'intermediate', 'vertical_pull', 'isolation'),

-- ── SHOULDER EXERCISES ──────────────────────────────────────────────────────

-- 18. Overhead Press (Barbell)
('ex000001-0000-0000-0000-000000000018', 'Overhead Press', 'overhead-press',
 'The primary compound shoulder exercise for overall deltoid development.',
 'Stand with feet shoulder-width apart. Hold barbell at shoulder level. Press the bar overhead until arms are fully extended. Lower back to shoulders under control.',
 ARRAY['Excessive back arch', 'Pressing the bar forward instead of straight up', 'Not locking out overhead'],
 'Brace your core tightly. Avoid excessive back arching which can cause lower back strain.',
 'intermediate', 'vertical_push', 'compound'),

-- 19. Dumbbell Shoulder Press
('ex000001-0000-0000-0000-000000000019', 'Dumbbell Shoulder Press', 'dumbbell-shoulder-press',
 'Seated or standing dumbbell press for shoulder development with independent arm movement.',
 'Hold dumbbells at shoulder height, palms facing forward. Press both dumbbells overhead until arms are extended. Lower back to shoulder height.',
 ARRAY['Using momentum', 'Not going through full range of motion', 'Flaring elbows too wide'],
 'Seated version provides more stability. Use a bench with back support for heavier weights.',
 'beginner', 'vertical_push', 'compound'),

-- 20. Lateral Raise
('ex000001-0000-0000-0000-000000000020', 'Lateral Raise', 'lateral-raise',
 'An isolation exercise targeting the lateral deltoid for wider shoulders.',
 'Stand holding dumbbells at your sides. Raise arms out to the sides until parallel with the floor. Keep a slight bend in the elbows. Lower slowly.',
 ARRAY['Using too much weight and swinging', 'Raising above shoulder height', 'Shrugging the shoulders'],
 'Use lighter weight with strict form. This is an isolation movement.',
 'beginner', 'shoulder_abduction', 'isolation'),

-- 21. Front Raise
('ex000001-0000-0000-0000-000000000021', 'Front Raise', 'front-raise',
 'Isolation exercise for the anterior deltoid.',
 'Stand holding dumbbells in front of your thighs. Raise one or both arms forward to shoulder height. Lower under control.',
 ARRAY['Using momentum', 'Raising too high', 'Leaning back'],
 'Keep the movement controlled and avoid swinging.',
 'beginner', 'shoulder_abduction', 'isolation'),

-- 22. Reverse Fly
('ex000001-0000-0000-0000-000000000022', 'Reverse Fly', 'reverse-fly',
 'An isolation exercise for the posterior deltoid and upper back.',
 'Bend forward at the hips holding dumbbells. Raise arms out to the sides, squeezing the shoulder blades together. Lower slowly.',
 ARRAY['Using too much weight', 'Not bending forward enough', 'Using momentum'],
 'Light to moderate weight works best. Focus on the rear delt squeeze.',
 'beginner', 'horizontal_pull', 'isolation'),

-- 23. Arnold Press
('ex000001-0000-0000-0000-000000000023', 'Arnold Press', 'arnold-press',
 'A rotational pressing movement that targets all three heads of the deltoid.',
 'Start with dumbbells in front of your chest, palms facing you. As you press up, rotate your palms to face forward. Reverse the motion on the way down.',
 ARRAY['Rotating too quickly', 'Not going through full range', 'Using too much weight'],
 'Use lighter weight than a standard press due to the rotation component.',
 'intermediate', 'vertical_push', 'compound'),

-- 24. Cable Lateral Raise
('ex000001-0000-0000-0000-000000000024', 'Cable Lateral Raise', 'cable-lateral-raise',
 'Lateral raise using a cable for constant tension throughout the range of motion.',
 'Stand sideways to a low cable pulley. Grip the handle with the far hand. Raise your arm out to the side to shoulder height. Lower under control.',
 ARRAY['Using too much weight', 'Bending the arm excessively', 'Leaning away too much'],
 'Great for constant tension on the lateral delt.',
 'beginner', 'shoulder_abduction', 'isolation'),

-- ── ARM EXERCISES ───────────────────────────────────────────────────────────

-- 25. Barbell Curl
('ex000001-0000-0000-0000-000000000025', 'Barbell Curl', 'barbell-curl',
 'A fundamental biceps exercise for building arm size.',
 'Stand holding a barbell with underhand grip at shoulder-width. Curl the bar up towards your shoulders, keeping elbows at your sides. Lower under control.',
 ARRAY['Swinging the body', 'Moving elbows forward', 'Not lowering fully'],
 'Keep elbows pinned to your sides. Avoid using momentum.',
 'beginner', 'elbow_flexion', 'isolation'),

-- 26. Dumbbell Curl
('ex000001-0000-0000-0000-000000000026', 'Dumbbell Curl', 'dumbbell-curl',
 'Biceps curl with dumbbells allowing independent arm training.',
 'Stand holding dumbbells at your sides, palms facing forward. Curl both or alternating dumbbells up. Lower under control.',
 ARRAY['Using momentum', 'Not controlling the eccentric', 'Elbows drifting forward'],
 'Can be performed seated for stricter form.',
 'beginner', 'elbow_flexion', 'isolation'),

-- 27. Hammer Curl
('ex000001-0000-0000-0000-000000000027', 'Hammer Curl', 'hammer-curl',
 'A curl variation with a neutral grip emphasizing the brachialis and forearms.',
 'Hold dumbbells at your sides with palms facing each other (neutral grip). Curl the dumbbells up without rotating the wrists. Lower under control.',
 ARRAY['Using too much weight', 'Swinging the body', 'Rotating wrists during the curl'],
 'Excellent for overall arm thickness and forearm development.',
 'beginner', 'elbow_flexion', 'isolation'),

-- 28. Preacher Curl
('ex000001-0000-0000-0000-000000000028', 'Preacher Curl', 'preacher-curl',
 'An isolation curl performed on a preacher bench to eliminate momentum.',
 'Sit at a preacher bench with your upper arms resting on the pad. Curl the bar or dumbbells up. Lower under control to a near-full extension.',
 ARRAY['Hyperextending the elbows at the bottom', 'Using too much weight', 'Lifting the elbows off the pad'],
 'Do not fully lock out the elbows to prevent hyperextension.',
 'intermediate', 'elbow_flexion', 'isolation'),

-- 29. Tricep Pushdown
('ex000001-0000-0000-0000-000000000029', 'Tricep Pushdown', 'tricep-pushdown',
 'A cable exercise isolating the triceps.',
 'Stand at a cable machine with a straight bar or rope attachment at the top. Push the bar down until your arms are fully extended. Return to the starting position, keeping elbows at your sides.',
 ARRAY['Moving elbows away from the body', 'Leaning too far forward', 'Using momentum'],
 'Keep elbows stationary at your sides throughout the movement.',
 'beginner', 'elbow_extension', 'isolation'),

-- 30. Skull Crushers
('ex000001-0000-0000-0000-000000000030', 'Skull Crushers', 'skull-crushers',
 'A lying tricep extension that stretches and contracts the triceps effectively.',
 'Lie on a flat bench holding a barbell or EZ bar with arms extended over your chest. Lower the bar towards your forehead by bending at the elbows. Press back to the starting position.',
 ARRAY['Flaring elbows out', 'Lowering the bar too quickly', 'Using too much weight'],
 'Use an EZ curl bar to reduce wrist strain. Be careful with the bar near your face.',
 'intermediate', 'elbow_extension', 'isolation'),

-- 31. Overhead Tricep Extension
('ex000001-0000-0000-0000-000000000031', 'Overhead Tricep Extension', 'overhead-tricep-extension',
 'A tricep exercise performed overhead, emphasizing the long head.',
 'Hold a dumbbell or cable overhead with both hands. Lower the weight behind your head by bending at the elbows. Press back up to the starting position.',
 ARRAY['Flaring elbows excessively', 'Using momentum', 'Not going through full range of motion'],
 'Keep elbows close to your head. Start with lighter weight.',
 'beginner', 'elbow_extension', 'isolation'),

-- 32. Close-Grip Bench Press
('ex000001-0000-0000-0000-000000000032', 'Close-Grip Bench Press', 'close-grip-bench-press',
 'A bench press variation with narrower grip to emphasize the triceps.',
 'Lie on a flat bench, grip the bar at shoulder-width or slightly narrower. Lower the bar to your chest. Press back up to lockout.',
 ARRAY['Grip too narrow causing wrist pain', 'Flaring elbows', 'Bouncing off chest'],
 'Do not use an extremely narrow grip. Shoulder-width is usually sufficient.',
 'intermediate', 'horizontal_push', 'compound'),

-- 33. Cable Curl
('ex000001-0000-0000-0000-000000000033', 'Cable Curl', 'cable-curl',
 'Biceps curl using a cable machine for constant tension.',
 'Stand facing a low cable pulley with a straight bar attachment. Curl the bar upward, keeping elbows stationary. Lower under control.',
 ARRAY['Using momentum', 'Leaning back', 'Moving elbows forward'],
 'Constant cable tension makes this great for muscle engagement.',
 'beginner', 'elbow_flexion', 'isolation'),

-- 34. Dips (Tricep)
('ex000001-0000-0000-0000-000000000034', 'Dips (Tricep)', 'dips-tricep',
 'Bodyweight tricep dips performed with an upright torso.',
 'Grip parallel bars and support your body. Keep torso upright. Lower your body until upper arms are parallel. Press back up.',
 ARRAY['Leaning too far forward (shifts to chest)', 'Going too deep', 'Not locking out'],
 'Keep torso upright to emphasize triceps. Limit depth if you have shoulder issues.',
 'intermediate', 'elbow_extension', 'compound'),

-- ── LEG EXERCISES ───────────────────────────────────────────────────────────

-- 35. Barbell Back Squat
('ex000001-0000-0000-0000-000000000035', 'Barbell Back Squat', 'barbell-back-squat',
 'The primary compound leg exercise for overall lower body development.',
 'Place the barbell across your upper back. Stand with feet shoulder-width apart. Squat down by bending at hips and knees until thighs are at least parallel. Stand back up.',
 ARRAY['Knees caving inward', 'Rounding the lower back', 'Not reaching parallel depth', 'Rising on toes'],
 'Use a squat rack with safety bars. Master bodyweight squats first.',
 'intermediate', 'squat', 'compound'),

-- 36. Leg Press
('ex000001-0000-0000-0000-000000000036', 'Leg Press', 'leg-press',
 'A machine-based compound leg exercise for quads, hamstrings, and glutes.',
 'Sit in the leg press machine with feet shoulder-width apart on the platform. Lower the platform by bending your knees. Press back up without locking out.',
 ARRAY['Placing feet too high or low', 'Locking out knees at the top', 'Rounding the lower back at the bottom'],
 'Do not lock your knees at the top. Keep lower back pressed against the pad.',
 'beginner', 'squat', 'compound'),

-- 37. Romanian Deadlift
('ex000001-0000-0000-0000-000000000037', 'Romanian Deadlift', 'romanian-deadlift',
 'A hip hinge movement targeting the hamstrings and glutes.',
 'Stand holding a barbell with an overhand grip. Hinge at the hips, pushing them back while keeping a slight knee bend. Lower the bar along your legs. Return to standing by squeezing your glutes.',
 ARRAY['Rounding the lower back', 'Bending knees too much', 'Lowering the bar too far'],
 'Maintain a flat back throughout. Stop when you feel a hamstring stretch.',
 'intermediate', 'hip_hinge', 'compound'),

-- 38. Leg Curl
('ex000001-0000-0000-0000-000000000038', 'Leg Curl', 'leg-curl',
 'An isolation exercise for the hamstrings performed on a machine.',
 'Lie face down on the leg curl machine. Hook your ankles under the pad. Curl the pad toward your glutes. Lower under control.',
 ARRAY['Using too much momentum', 'Lifting hips off the pad', 'Not going through full range of motion'],
 'Control the eccentric portion for maximum hamstring engagement.',
 'beginner', 'knee_flexion', 'isolation'),

-- 39. Leg Extension
('ex000001-0000-0000-0000-000000000039', 'Leg Extension', 'leg-extension',
 'An isolation exercise for the quadriceps using a machine.',
 'Sit in the leg extension machine with your ankles behind the pad. Extend your legs until they are straight. Lower under control.',
 ARRAY['Using too much weight', 'Locking out knees forcefully', 'Using momentum'],
 'Avoid explosive lockouts. Use controlled movements.',
 'beginner', 'knee_extension', 'isolation'),

-- 40. Bulgarian Split Squat
('ex000001-0000-0000-0000-000000000040', 'Bulgarian Split Squat', 'bulgarian-split-squat',
 'A unilateral squat variation for quads, glutes, and balance.',
 'Stand with one foot elevated behind you on a bench. Hold dumbbells at your sides. Lower your body until your front thigh is parallel to the floor. Press back up.',
 ARRAY['Leaning too far forward', 'Placing the back foot too close or far', 'Knee going past toes excessively'],
 'Start with bodyweight to master balance before adding weight.',
 'intermediate', 'lunge', 'compound'),

-- 41. Goblet Squat
('ex000001-0000-0000-0000-000000000041', 'Goblet Squat', 'goblet-squat',
 'A beginner-friendly squat variation holding a dumbbell or kettlebell at the chest.',
 'Hold a dumbbell or kettlebell at your chest with both hands. Squat down, keeping your chest up and elbows inside your knees. Stand back up.',
 ARRAY['Leaning forward', 'Knees caving in', 'Not going deep enough'],
 'Great for learning proper squat mechanics.',
 'beginner', 'squat', 'compound'),

-- 42. Walking Lunges
('ex000001-0000-0000-0000-000000000042', 'Walking Lunges', 'walking-lunges',
 'A dynamic lunge variation for quads, glutes, and balance.',
 'Step forward into a lunge position. Lower your back knee toward the floor. Push off the front foot and step forward into the next lunge.',
 ARRAY['Taking too short a step', 'Knee going past toes', 'Leaning forward'],
 'Start with bodyweight before adding dumbbells.',
 'beginner', 'lunge', 'compound'),

-- 43. Hip Thrust
('ex000001-0000-0000-0000-000000000043', 'Hip Thrust', 'hip-thrust',
 'The primary glute-building exercise using a bench and barbell.',
 'Sit on the floor with your upper back against a bench. Place a barbell across your hips. Drive through your heels to lift your hips until your body forms a straight line. Squeeze glutes at the top. Lower under control.',
 ARRAY['Hyperextending the lower back', 'Not squeezing at the top', 'Poor pad placement'],
 'Use a bar pad for comfort. Maintain a neutral spine throughout.',
 'intermediate', 'hip_hinge', 'compound'),

-- 44. Calf Raises (Standing)
('ex000001-0000-0000-0000-000000000044', 'Standing Calf Raise', 'standing-calf-raise',
 'An isolation exercise for the calves performed standing.',
 'Stand on a calf raise machine or step with the balls of your feet on the edge. Raise your heels as high as possible. Lower under control for a full stretch.',
 ARRAY['Bouncing at the bottom', 'Not going through full range', 'Using too much weight'],
 'Full range of motion is key for calf development.',
 'beginner', 'calf_raise', 'isolation'),

-- 45. Seated Calf Raise
('ex000001-0000-0000-0000-000000000045', 'Seated Calf Raise', 'seated-calf-raise',
 'A seated calf exercise targeting the soleus muscle.',
 'Sit on a seated calf raise machine with the pad on your knees. Raise your heels as high as possible. Lower for a full stretch.',
 ARRAY['Not going through full range', 'Bouncing the weight', 'Using momentum'],
 'The seated position targets the soleus specifically.',
 'beginner', 'calf_raise', 'isolation'),

-- 46. Sumo Deadlift
('ex000001-0000-0000-0000-000000000046', 'Sumo Deadlift', 'sumo-deadlift',
 'A wide-stance deadlift variation emphasizing the inner thighs and glutes.',
 'Stand with a wide stance, toes pointed out. Grip the bar between your legs. Drive through your heels to stand up. Keep your chest up throughout.',
 ARRAY['Knees caving in', 'Rounding the back', 'Hips rising faster than the bar'],
 'Requires good hip mobility. Start with lighter weights to learn the movement.',
 'advanced', 'hip_hinge', 'compound'),

-- 47. Hack Squat
('ex000001-0000-0000-0000-000000000047', 'Hack Squat', 'hack-squat',
 'A machine squat variation for safe, heavy quadriceps loading.',
 'Position yourself in the hack squat machine with shoulders under the pads. Place feet shoulder-width apart on the platform. Squat down until thighs are parallel. Press back up.',
 ARRAY['Placing feet too high or low', 'Locking knees at the top', 'Not reaching parallel'],
 'Adjust foot position to emphasize different muscle groups.',
 'intermediate', 'squat', 'compound'),

-- 48. Stiff-Leg Deadlift
('ex000001-0000-0000-0000-000000000048', 'Stiff-Leg Deadlift', 'stiff-leg-deadlift',
 'A deadlift variation with straighter legs to maximize hamstring stretch.',
 'Stand holding a barbell with an overhand grip. With nearly straight legs, hinge at the hips and lower the bar. Stop when you feel a strong hamstring stretch. Return to standing.',
 ARRAY['Rounding the back', 'Bending knees too much', 'Going too low'],
 'Maintain a flat back. This exercise requires good hamstring flexibility.',
 'intermediate', 'hip_hinge', 'compound'),

-- 49. Leg Press Calf Raise
('ex000001-0000-0000-0000-000000000049', 'Leg Press Calf Raise', 'leg-press-calf-raise',
 'Calf raises performed on the leg press machine.',
 'Sit in the leg press with just the balls of your feet on the bottom edge of the platform. Press through your toes to extend your ankles. Lower for a stretch.',
 ARRAY['Using too much weight', 'Not going through full range', 'Locking knees'],
 'Use light to moderate weight. Keep knees slightly bent.',
 'beginner', 'calf_raise', 'isolation'),

-- ── CORE EXERCISES ──────────────────────────────────────────────────────────

-- 50. Plank
('ex000001-0000-0000-0000-000000000050', 'Plank', 'plank',
 'A fundamental isometric core exercise.',
 'Get into a push-up position on your forearms. Maintain a straight line from head to heels. Hold the position while keeping your core engaged.',
 ARRAY['Sagging hips', 'Raising hips too high', 'Holding breath'],
 'Focus on breathing normally while bracing your core.',
 'beginner', 'anti_extension', 'isolation'),

-- 51. Cable Crunch
('ex000001-0000-0000-0000-000000000051', 'Cable Crunch', 'cable-crunch',
 'A weighted crunch using a cable machine for progressive overload on the abs.',
 'Kneel in front of a high cable with a rope attachment. Hold the rope behind your head. Crunch downward, flexing your spine. Return to the starting position.',
 ARRAY['Using hip flexors instead of abs', 'Not rounding the spine', 'Sitting back instead of crunching down'],
 'Focus on spinal flexion, not hip flexion.',
 'intermediate', 'core_flexion', 'isolation'),

-- 52. Hanging Leg Raise
('ex000001-0000-0000-0000-000000000052', 'Hanging Leg Raise', 'hanging-leg-raise',
 'An advanced core exercise performed hanging from a bar.',
 'Hang from a pull-up bar with an overhand grip. Raise your legs until they are parallel to the floor or higher. Lower with control.',
 ARRAY['Using momentum to swing', 'Not raising legs high enough', 'Bending arms'],
 'Start with knee raises if straight-leg raises are too difficult.',
 'advanced', 'core_flexion', 'isolation'),

-- 53. Russian Twist
('ex000001-0000-0000-0000-000000000053', 'Russian Twist', 'russian-twist',
 'A rotational core exercise targeting the obliques.',
 'Sit on the floor with knees bent, lean back slightly. Hold a weight or medicine ball. Rotate your torso side to side, touching the weight to the floor on each side.',
 ARRAY['Rounding the back', 'Moving arms instead of torso', 'Going too fast'],
 'Keep your back straight and move from the torso, not the arms.',
 'beginner', 'anti_rotation', 'isolation'),

-- 54. Ab Wheel Rollout
('ex000001-0000-0000-0000-000000000054', 'Ab Wheel Rollout', 'ab-wheel-rollout',
 'An advanced anti-extension core exercise.',
 'Kneel on the floor holding an ab wheel. Roll the wheel forward, extending your body. Maintain core tension and pull back to the starting position.',
 ARRAY['Sagging hips at full extension', 'Not engaging core throughout', 'Going too far too soon'],
 'Start with small rollouts and gradually increase range of motion.',
 'advanced', 'anti_extension', 'isolation'),

-- 55. Dead Bug
('ex000001-0000-0000-0000-000000000055', 'Dead Bug', 'dead-bug',
 'A core stability exercise great for beginners and injury prevention.',
 'Lie on your back with arms extended towards the ceiling and knees at 90 degrees. Slowly extend one arm overhead and the opposite leg outward. Return and repeat on the other side.',
 ARRAY['Lower back lifting off the floor', 'Moving too quickly', 'Not keeping core braced'],
 'Press your lower back into the floor throughout the movement.',
 'beginner', 'anti_extension', 'isolation'),

-- 56. Pallof Press
('ex000001-0000-0000-0000-000000000056', 'Pallof Press', 'pallof-press',
 'An anti-rotation exercise using a cable or band for core stability.',
 'Stand sideways to a cable machine with a handle at chest height. Hold the handle at your chest with both hands. Press the handle straight out from your chest, resisting rotation. Return to chest.',
 ARRAY['Rotating the torso', 'Using too much weight', 'Not bracing the core'],
 'A great exercise for functional core stability and injury prevention.',
 'beginner', 'anti_rotation', 'isolation'),

-- ── ADDITIONAL COMPOUND EXERCISES ───────────────────────────────────────────

-- 57. Deadlift
('ex000001-0000-0000-0000-000000000057', 'Deadlift', 'deadlift',
 'A fundamental compound exercise that works the entire posterior chain.',
 'Stand with feet hip-width apart, bar over mid-foot. Hinge at the hips, grip the bar just outside your legs. Brace your core, flatten your back, and stand up by driving through your heels.',
 ARRAY['Rounding the lower back', 'Bar drifting away from the body', 'Jerking the bar off the floor', 'Hyperextending at the top'],
 'Master the hip hinge pattern first. Use light weight until form is solid. Use a belt for heavy sets.',
 'advanced', 'hip_hinge', 'compound'),

-- 58. Front Squat
('ex000001-0000-0000-0000-000000000058', 'Front Squat', 'front-squat',
 'A squat variation with the bar held in front, emphasizing quads and core.',
 'Hold the barbell across the front of your shoulders (clean grip or crossed arms). Squat down keeping your torso very upright. Stand back up driving through the midfoot.',
 ARRAY['Dropping elbows', 'Leaning forward', 'Not reaching depth', 'Losing upper back tightness'],
 'Requires good wrist and ankle mobility. Use a clean grip or crossed-arm grip.',
 'advanced', 'squat', 'compound'),

-- 59. Smith Machine Squat
('ex000001-0000-0000-0000-000000000059', 'Smith Machine Squat', 'smith-machine-squat',
 'A squat performed on the Smith machine for guided stability.',
 'Position yourself under the Smith machine bar. Place feet slightly forward. Squat down until thighs are parallel. Press back up.',
 ARRAY['Placing feet directly under the bar', 'Not going deep enough', 'Locking knees'],
 'Safer for those training alone as the bar can be locked at any point.',
 'beginner', 'squat', 'compound'),

-- 60. Smith Machine Bench Press
('ex000001-0000-0000-0000-000000000060', 'Smith Machine Bench Press', 'smith-machine-bench-press',
 'Bench press on the Smith machine for a guided bar path.',
 'Lie on a bench positioned under the Smith machine. Grip the bar and unrack. Lower to your chest and press back up.',
 ARRAY['Not positioning the bench correctly', 'Bouncing off chest', 'Not controlling the descent'],
 'Good alternative when no spotter is available.',
 'beginner', 'horizontal_push', 'compound'),

-- ── MORE VARIATIONS ─────────────────────────────────────────────────────────

-- 61. Incline Cable Fly
('ex000001-0000-0000-0000-000000000061', 'Incline Cable Fly', 'incline-cable-fly',
 'An isolation chest exercise on an incline bench using cables.',
 'Set an incline bench between two low cable pulleys. Lie on the bench and bring the handles together above your chest in a hugging motion. Return slowly.',
 ARRAY['Bending elbows too much', 'Using too much weight', 'Not controlling the negative'],
 'Focus on the chest squeeze at the top of the movement.',
 'intermediate', 'horizontal_push', 'isolation'),

-- 62. Dumbbell Fly
('ex000001-0000-0000-0000-000000000062', 'Dumbbell Fly', 'dumbbell-fly',
 'A chest isolation exercise performed lying on a flat bench.',
 'Lie on a flat bench holding dumbbells above your chest with a slight elbow bend. Open your arms wide, lowering the dumbbells in an arc. Bring them back together.',
 ARRAY['Going too heavy', 'Bending elbows excessively', 'Lowering too far'],
 'Use moderate weight. Excessive depth can strain the shoulders.',
 'intermediate', 'horizontal_push', 'isolation'),

-- 63. Cable Row (Standing)
('ex000001-0000-0000-0000-000000000063', 'Standing Cable Row', 'standing-cable-row',
 'A cable row performed standing for added core engagement.',
 'Stand facing a cable machine with a handle at mid-height. Pull the handle to your abdomen, squeezing the back. Return slowly.',
 ARRAY['Using momentum', 'Rounding the back', 'Not engaging core'],
 'Maintain a braced core throughout the movement.',
 'beginner', 'horizontal_pull', 'compound'),

-- 64. Pendlay Row
('ex000001-0000-0000-0000-000000000064', 'Pendlay Row', 'pendlay-row',
 'A strict barbell row where the bar returns to the floor each rep.',
 'Set up like a barbell row with torso parallel to the floor. Pull the bar explosively to your lower chest. Lower the bar to the floor between each rep.',
 ARRAY['Not keeping torso parallel', 'Using momentum from standing up', 'Rounding back'],
 'Requires strict form. The bar should return to the floor after each rep.',
 'advanced', 'horizontal_pull', 'compound'),

-- 65. Machine Row
('ex000001-0000-0000-0000-000000000065', 'Machine Row', 'machine-row',
 'A seated row performed on a machine for back thickness.',
 'Sit at the rowing machine with your chest against the pad. Pull the handles back, squeezing your shoulder blades. Return slowly.',
 ARRAY['Not squeezing at the back', 'Pulling with arms only', 'Moving too fast'],
 'A safe alternative for those who struggle with free-weight row form.',
 'beginner', 'horizontal_pull', 'compound'),

-- 66. EZ Bar Curl
('ex000001-0000-0000-0000-000000000066', 'EZ Bar Curl', 'ez-bar-curl',
 'A bicep curl using an EZ curl bar for reduced wrist strain.',
 'Stand holding an EZ curl bar with an underhand grip on the angled portions. Curl the bar up. Lower under control.',
 ARRAY['Using momentum', 'Elbows moving forward', 'Not going through full range'],
 'The angled grip reduces wrist strain compared to a straight bar.',
 'beginner', 'elbow_flexion', 'isolation'),

-- 67. Concentration Curl
('ex000001-0000-0000-0000-000000000067', 'Concentration Curl', 'concentration-curl',
 'An isolation curl performed seated for strict bicep work.',
 'Sit on a bench with your elbow braced against your inner thigh. Curl the dumbbell up. Lower under control.',
 ARRAY['Swinging the weight', 'Not bracing the elbow properly', 'Using too much weight'],
 'Excellent for peak bicep contraction and strict form.',
 'beginner', 'elbow_flexion', 'isolation'),

-- 68. Tricep Kickback
('ex000001-0000-0000-0000-000000000068', 'Tricep Kickback', 'tricep-kickback',
 'An isolation tricep exercise using dumbbells.',
 'Bend forward with one hand on a bench for support. Hold a dumbbell with the upper arm parallel to the floor. Extend the forearm back until the arm is straight. Return slowly.',
 ARRAY['Using too much weight', 'Swinging the arm', 'Upper arm moving'],
 'Use light weight and focus on the squeeze at full extension.',
 'beginner', 'elbow_extension', 'isolation'),

-- 69. Cable Overhead Tricep Extension
('ex000001-0000-0000-0000-000000000069', 'Cable Overhead Tricep Extension', 'cable-overhead-tricep-extension',
 'A cable variation of the overhead tricep extension.',
 'Face away from a low cable with a rope attachment. Hold the rope overhead. Extend your arms upward. Return behind your head.',
 ARRAY['Flaring elbows', 'Using too much weight', 'Leaning forward'],
 'Cables provide constant tension throughout the movement.',
 'intermediate', 'elbow_extension', 'isolation'),

-- 70. Upright Row
('ex000001-0000-0000-0000-000000000070', 'Upright Row', 'upright-row',
 'A compound shoulder exercise targeting the traps and lateral delts.',
 'Hold a barbell or dumbbells in front of your thighs. Pull the weight up along your body to chin height, leading with your elbows. Lower under control.',
 ARRAY['Pulling too high', 'Using too much weight', 'Internal rotation at the top'],
 'Some people find this aggravates shoulder impingement. Use dumbbells if the barbell version causes discomfort.',
 'intermediate', 'shoulder_abduction', 'compound'),

-- 71. Shrugs
('ex000001-0000-0000-0000-000000000071', 'Barbell Shrug', 'barbell-shrug',
 'An isolation exercise for the upper trapezius.',
 'Hold a barbell in front of your thighs with arms extended. Shrug your shoulders straight up towards your ears. Hold briefly at the top. Lower under control.',
 ARRAY['Rolling the shoulders', 'Using too much momentum', 'Not holding at the top'],
 'Avoid rolling the shoulders — shrug straight up and down.',
 'beginner', 'shoulder_abduction', 'isolation'),

-- 72. Cable Face Pull with External Rotation
('ex000001-0000-0000-0000-000000000072', 'Face Pull with External Rotation', 'face-pull-external-rotation',
 'An advanced face pull variation adding external rotation for rotator cuff health.',
 'Perform a face pull, then externally rotate your arms so your fists point to the ceiling. Return to start.',
 ARRAY['Using too much weight', 'Not rotating fully', 'Shrugging shoulders'],
 'Excellent for shoulder health and posture. Use light weight.',
 'intermediate', 'horizontal_pull', 'isolation'),

-- 73. Dumbbell Pullover
('ex000001-0000-0000-0000-000000000073', 'Dumbbell Pullover', 'dumbbell-pullover',
 'A lat and chest exercise performed lying on a bench.',
 'Lie on a bench holding a dumbbell above your chest with both hands. Lower the weight behind your head in an arc. Pull it back to the starting position.',
 ARRAY['Going too heavy', 'Bending elbows too much', 'Excessive lower back arch'],
 'Stretch only to a comfortable range. Do not force the stretch.',
 'intermediate', 'vertical_pull', 'compound'),

-- 74. Reverse Grip Lat Pulldown
('ex000001-0000-0000-0000-000000000074', 'Reverse Grip Lat Pulldown', 'reverse-grip-lat-pulldown',
 'An underhand pulldown variation for lower lat emphasis.',
 'Sit at a lat pulldown with an underhand (supinated) grip. Pull the bar to your upper chest. Squeeze the lats. Return slowly.',
 ARRAY['Leaning back too much', 'Using momentum', 'Pulling with biceps only'],
 'Keep a controlled tempo and focus on lat engagement.',
 'intermediate', 'vertical_pull', 'compound'),

-- 75. Machine Lateral Raise
('ex000001-0000-0000-0000-000000000075', 'Machine Lateral Raise', 'machine-lateral-raise',
 'A machine-guided lateral raise for isolating the lateral delts.',
 'Sit at the machine with your arms against the pads. Raise the pads outward until parallel. Lower under control.',
 ARRAY['Using too much weight', 'Shrugging', 'Not going through full range'],
 'Great for isolating the lateral delts without coordination demands.',
 'beginner', 'shoulder_abduction', 'isolation'),

-- 76. Incline Dumbbell Curl
('ex000001-0000-0000-0000-000000000076', 'Incline Dumbbell Curl', 'incline-dumbbell-curl',
 'A dumbbell curl on an incline bench for a greater bicep stretch.',
 'Set a bench to 45 degrees. Sit back with dumbbells hanging at your sides. Curl upward without moving your upper arms. Lower under control.',
 ARRAY['Bench set too steep', 'Upper arms moving forward', 'Using momentum'],
 'The incline position provides a deep bicep stretch at the bottom.',
 'intermediate', 'elbow_flexion', 'isolation'),

-- 77. Dumbbell Lateral Raise (Seated)
('ex000001-0000-0000-0000-000000000077', 'Seated Lateral Raise', 'seated-lateral-raise',
 'A stricter lateral raise variation performed seated.',
 'Sit on a bench holding dumbbells at your sides. Raise arms out to shoulder height. Lower slowly.',
 ARRAY['Using momentum from standing', 'Shrugging', 'Going above shoulder height'],
 'Seated position eliminates momentum for stricter form.',
 'beginner', 'shoulder_abduction', 'isolation'),

-- 78. Reverse Pec Deck
('ex000001-0000-0000-0000-000000000078', 'Reverse Pec Deck', 'reverse-pec-deck',
 'A machine exercise for the posterior deltoid.',
 'Sit facing the pec deck machine. Grip the handles with arms extended in front. Open arms to the sides, squeezing rear delts. Return slowly.',
 ARRAY['Using too much weight', 'Not squeezing at the back', 'Moving too fast'],
 'Focus on the squeeze in the rear delts at full contraction.',
 'beginner', 'horizontal_pull', 'isolation'),

-- 79. Landmine Press
('ex000001-0000-0000-0000-000000000079', 'Landmine Press', 'landmine-press',
 'A pressing variation using a landmine attachment for shoulder-friendly pressing.',
 'Stand holding the end of a barbell in a landmine setup. Press the bar upward and forward. Lower under control.',
 ARRAY['Leaning too far back', 'Using too much weight', 'Not stabilizing the core'],
 'A good alternative for those with shoulder pain during overhead pressing.',
 'intermediate', 'vertical_push', 'compound'),

-- 80. Cable Woodchop
('ex000001-0000-0000-0000-000000000080', 'Cable Woodchop', 'cable-woodchop',
 'A rotational core exercise using a cable machine.',
 'Set a cable at the highest position. Grip the handle with both hands. Pull the cable diagonally across your body in a chopping motion. Return under control.',
 ARRAY['Using too much weight', 'Moving from the arms instead of torso', 'Going too fast'],
 'Focus on rotating from the core, not pulling with the arms.',
 'intermediate', 'anti_rotation', 'isolation'),

-- 81. Glute Bridge
('ex000001-0000-0000-0000-000000000081', 'Glute Bridge', 'glute-bridge',
 'A beginner-friendly glute exercise performed on the floor.',
 'Lie on your back with knees bent and feet flat on the floor. Drive through your heels to lift your hips. Squeeze glutes at the top. Lower under control.',
 ARRAY['Hyperextending the lower back', 'Not squeezing at the top', 'Feet too far from hips'],
 'A great starting exercise before progressing to hip thrusts.',
 'beginner', 'hip_hinge', 'isolation'),

-- 82. Good Morning
('ex000001-0000-0000-0000-000000000082', 'Good Morning', 'good-morning',
 'A barbell hip hinge exercise targeting the hamstrings and lower back.',
 'Place a barbell across your upper back. With a slight knee bend, hinge forward at the hips until your torso is nearly parallel. Return to standing.',
 ARRAY['Rounding the back', 'Going too heavy', 'Using too much knee bend'],
 'Start very light. This exercise loads the spine significantly.',
 'advanced', 'hip_hinge', 'compound'),

-- 83. Step-ups
('ex000001-0000-0000-0000-000000000083', 'Dumbbell Step-up', 'dumbbell-step-up',
 'A unilateral leg exercise stepping onto an elevated surface.',
 'Hold dumbbells at your sides. Step one foot onto a bench or box. Drive through the front heel to stand up. Step down and repeat.',
 ARRAY['Pushing off the back foot', 'Box too high', 'Leaning forward excessively'],
 'Choose a box height where your thigh is roughly parallel when stepping up.',
 'beginner', 'lunge', 'compound'),

-- 84. Machine Shoulder Press
('ex000001-0000-0000-0000-000000000084', 'Machine Shoulder Press', 'machine-shoulder-press',
 'A machine-guided shoulder press for safe overhead training.',
 'Sit at the shoulder press machine. Grip handles at shoulder level. Press upward until arms are extended. Return slowly.',
 ARRAY['Not adjusting seat height', 'Locking out elbows aggressively', 'Arching the back'],
 'Great for beginners or those uncomfortable with free-weight overhead pressing.',
 'beginner', 'vertical_push', 'compound'),

-- 85. Pec Deck Fly
('ex000001-0000-0000-0000-000000000085', 'Pec Deck Fly', 'pec-deck-fly',
 'A machine chest isolation exercise.',
 'Sit at the pec deck with arms on the pads. Bring the pads together in front of your chest. Squeeze and return slowly.',
 ARRAY['Using too much weight', 'Not controlling the negative', 'Arms too high or low'],
 'Adjust the seat for proper arm alignment.',
 'beginner', 'horizontal_push', 'isolation');


-- ─── Exercise ↔ Muscle Mappings ─────────────────────────────────────────────
-- Each exercise maps to primary, secondary, and stabilizer muscles with activation weights.

INSERT INTO exercise_muscles (exercise_id, muscle_id, involvement_type, activation_weight) VALUES
-- Barbell Bench Press
('ex000001-0000-0000-0000-000000000001', 'm0000001-0000-0000-0000-000000000002', 'primary', 1.00),    -- Mid Chest
('ex000001-0000-0000-0000-000000000001', 'm0000001-0000-0000-0000-000000000013', 'secondary', 0.45),   -- Triceps
('ex000001-0000-0000-0000-000000000001', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.35),   -- Anterior Deltoid

-- Incline Dumbbell Press
('ex000001-0000-0000-0000-000000000002', 'm0000001-0000-0000-0000-000000000001', 'primary', 1.00),     -- Upper Chest
('ex000001-0000-0000-0000-000000000002', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.45),   -- Anterior Deltoid
('ex000001-0000-0000-0000-000000000002', 'm0000001-0000-0000-0000-000000000013', 'secondary', 0.40),   -- Triceps

-- Dumbbell Bench Press
('ex000001-0000-0000-0000-000000000003', 'm0000001-0000-0000-0000-000000000002', 'primary', 1.00),     -- Mid Chest
('ex000001-0000-0000-0000-000000000003', 'm0000001-0000-0000-0000-000000000013', 'secondary', 0.45),   -- Triceps
('ex000001-0000-0000-0000-000000000003', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.35),   -- Anterior Deltoid

-- Machine Chest Press
('ex000001-0000-0000-0000-000000000004', 'm0000001-0000-0000-0000-000000000002', 'primary', 1.00),     -- Mid Chest
('ex000001-0000-0000-0000-000000000004', 'm0000001-0000-0000-0000-000000000013', 'secondary', 0.40),   -- Triceps
('ex000001-0000-0000-0000-000000000004', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.30),   -- Anterior Deltoid

-- Incline Barbell Bench Press
('ex000001-0000-0000-0000-000000000005', 'm0000001-0000-0000-0000-000000000001', 'primary', 1.00),     -- Upper Chest
('ex000001-0000-0000-0000-000000000005', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.50),   -- Anterior Deltoid
('ex000001-0000-0000-0000-000000000005', 'm0000001-0000-0000-0000-000000000013', 'secondary', 0.40),   -- Triceps

-- Cable Crossover
('ex000001-0000-0000-0000-000000000006', 'm0000001-0000-0000-0000-000000000002', 'primary', 1.00),     -- Mid Chest
('ex000001-0000-0000-0000-000000000006', 'm0000001-0000-0000-0000-000000000003', 'secondary', 0.50),   -- Lower Chest
('ex000001-0000-0000-0000-000000000006', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.25),   -- Anterior Deltoid

-- Dips (Chest)
('ex000001-0000-0000-0000-000000000007', 'm0000001-0000-0000-0000-000000000003', 'primary', 1.00),     -- Lower Chest
('ex000001-0000-0000-0000-000000000007', 'm0000001-0000-0000-0000-000000000013', 'secondary', 0.55),   -- Triceps
('ex000001-0000-0000-0000-000000000007', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.35),   -- Anterior Deltoid

-- Push-ups
('ex000001-0000-0000-0000-000000000008', 'm0000001-0000-0000-0000-000000000002', 'primary', 1.00),     -- Mid Chest
('ex000001-0000-0000-0000-000000000008', 'm0000001-0000-0000-0000-000000000013', 'secondary', 0.40),   -- Triceps
('ex000001-0000-0000-0000-000000000008', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.30),   -- Anterior Deltoid
('ex000001-0000-0000-0000-000000000008', 'm0000001-0000-0000-0000-000000000022', 'stabilizer', 0.15),  -- Rectus Abdominis

-- Barbell Row
('ex000001-0000-0000-0000-000000000009', 'm0000001-0000-0000-0000-000000000004', 'primary', 1.00),     -- Lats
('ex000001-0000-0000-0000-000000000009', 'm0000001-0000-0000-0000-000000000006', 'secondary', 0.50),   -- Rhomboids
('ex000001-0000-0000-0000-000000000009', 'm0000001-0000-0000-0000-000000000012', 'secondary', 0.35),   -- Biceps
('ex000001-0000-0000-0000-000000000009', 'm0000001-0000-0000-0000-000000000011', 'secondary', 0.30),   -- Posterior Deltoid
('ex000001-0000-0000-0000-000000000009', 'm0000001-0000-0000-0000-000000000007', 'stabilizer', 0.20),  -- Erector Spinae

-- Lat Pulldown
('ex000001-0000-0000-0000-000000000010', 'm0000001-0000-0000-0000-000000000004', 'primary', 1.00),     -- Lats
('ex000001-0000-0000-0000-000000000010', 'm0000001-0000-0000-0000-000000000012', 'secondary', 0.40),   -- Biceps
('ex000001-0000-0000-0000-000000000010', 'm0000001-0000-0000-0000-000000000006', 'secondary', 0.30),   -- Rhomboids
('ex000001-0000-0000-0000-000000000010', 'm0000001-0000-0000-0000-000000000008', 'secondary', 0.25),   -- Lower Traps

-- Pull-ups
('ex000001-0000-0000-0000-000000000011', 'm0000001-0000-0000-0000-000000000004', 'primary', 1.00),     -- Lats
('ex000001-0000-0000-0000-000000000011', 'm0000001-0000-0000-0000-000000000012', 'secondary', 0.40),   -- Biceps
('ex000001-0000-0000-0000-000000000011', 'm0000001-0000-0000-0000-000000000006', 'secondary', 0.35),   -- Rhomboids
('ex000001-0000-0000-0000-000000000011', 'm0000001-0000-0000-0000-000000000022', 'stabilizer', 0.15),  -- Rectus Abdominis

-- Seated Cable Row
('ex000001-0000-0000-0000-000000000012', 'm0000001-0000-0000-0000-000000000006', 'primary', 1.00),     -- Rhomboids
('ex000001-0000-0000-0000-000000000012', 'm0000001-0000-0000-0000-000000000004', 'secondary', 0.60),   -- Lats
('ex000001-0000-0000-0000-000000000012', 'm0000001-0000-0000-0000-000000000012', 'secondary', 0.35),   -- Biceps
('ex000001-0000-0000-0000-000000000012', 'm0000001-0000-0000-0000-000000000008', 'secondary', 0.30),   -- Lower Traps

-- Dumbbell Row
('ex000001-0000-0000-0000-000000000013', 'm0000001-0000-0000-0000-000000000004', 'primary', 1.00),     -- Lats
('ex000001-0000-0000-0000-000000000013', 'm0000001-0000-0000-0000-000000000006', 'secondary', 0.50),   -- Rhomboids
('ex000001-0000-0000-0000-000000000013', 'm0000001-0000-0000-0000-000000000012', 'secondary', 0.35),   -- Biceps
('ex000001-0000-0000-0000-000000000013', 'm0000001-0000-0000-0000-000000000011', 'secondary', 0.25),   -- Posterior Deltoid

-- T-Bar Row
('ex000001-0000-0000-0000-000000000014', 'm0000001-0000-0000-0000-000000000004', 'primary', 0.90),     -- Lats
('ex000001-0000-0000-0000-000000000014', 'm0000001-0000-0000-0000-000000000006', 'primary', 0.80),     -- Rhomboids
('ex000001-0000-0000-0000-000000000014', 'm0000001-0000-0000-0000-000000000012', 'secondary', 0.35),   -- Biceps
('ex000001-0000-0000-0000-000000000014', 'm0000001-0000-0000-0000-000000000007', 'stabilizer', 0.25),  -- Erector Spinae

-- Face Pull
('ex000001-0000-0000-0000-000000000015', 'm0000001-0000-0000-0000-000000000011', 'primary', 1.00),     -- Posterior Deltoid
('ex000001-0000-0000-0000-000000000015', 'm0000001-0000-0000-0000-000000000006', 'secondary', 0.40),   -- Rhomboids
('ex000001-0000-0000-0000-000000000015', 'm0000001-0000-0000-0000-000000000008', 'secondary', 0.35),   -- Lower Traps

-- Chin-ups
('ex000001-0000-0000-0000-000000000016', 'm0000001-0000-0000-0000-000000000004', 'primary', 1.00),     -- Lats
('ex000001-0000-0000-0000-000000000016', 'm0000001-0000-0000-0000-000000000012', 'secondary', 0.55),   -- Biceps
('ex000001-0000-0000-0000-000000000016', 'm0000001-0000-0000-0000-000000000006', 'secondary', 0.30),   -- Rhomboids

-- Cable Lat Pullover
('ex000001-0000-0000-0000-000000000017', 'm0000001-0000-0000-0000-000000000004', 'primary', 1.00),     -- Lats
('ex000001-0000-0000-0000-000000000017', 'm0000001-0000-0000-0000-000000000002', 'secondary', 0.25),   -- Mid Chest
('ex000001-0000-0000-0000-000000000017', 'm0000001-0000-0000-0000-000000000013', 'secondary', 0.20),   -- Triceps

-- Overhead Press
('ex000001-0000-0000-0000-000000000018', 'm0000001-0000-0000-0000-000000000009', 'primary', 1.00),     -- Anterior Deltoid
('ex000001-0000-0000-0000-000000000018', 'm0000001-0000-0000-0000-000000000010', 'secondary', 0.50),   -- Lateral Deltoid
('ex000001-0000-0000-0000-000000000018', 'm0000001-0000-0000-0000-000000000013', 'secondary', 0.45),   -- Triceps
('ex000001-0000-0000-0000-000000000018', 'm0000001-0000-0000-0000-000000000005', 'stabilizer', 0.20),  -- Upper Traps

-- Dumbbell Shoulder Press
('ex000001-0000-0000-0000-000000000019', 'm0000001-0000-0000-0000-000000000009', 'primary', 1.00),     -- Anterior Deltoid
('ex000001-0000-0000-0000-000000000019', 'm0000001-0000-0000-0000-000000000010', 'secondary', 0.45),   -- Lateral Deltoid
('ex000001-0000-0000-0000-000000000019', 'm0000001-0000-0000-0000-000000000013', 'secondary', 0.40),   -- Triceps

-- Lateral Raise
('ex000001-0000-0000-0000-000000000020', 'm0000001-0000-0000-0000-000000000010', 'primary', 1.00),     -- Lateral Deltoid
('ex000001-0000-0000-0000-000000000020', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.20),   -- Anterior Deltoid
('ex000001-0000-0000-0000-000000000020', 'm0000001-0000-0000-0000-000000000005', 'stabilizer', 0.15),  -- Upper Traps

-- Front Raise
('ex000001-0000-0000-0000-000000000021', 'm0000001-0000-0000-0000-000000000009', 'primary', 1.00),     -- Anterior Deltoid
('ex000001-0000-0000-0000-000000000021', 'm0000001-0000-0000-0000-000000000010', 'secondary', 0.20),   -- Lateral Deltoid

-- Reverse Fly
('ex000001-0000-0000-0000-000000000022', 'm0000001-0000-0000-0000-000000000011', 'primary', 1.00),     -- Posterior Deltoid
('ex000001-0000-0000-0000-000000000022', 'm0000001-0000-0000-0000-000000000006', 'secondary', 0.40),   -- Rhomboids
('ex000001-0000-0000-0000-000000000022', 'm0000001-0000-0000-0000-000000000008', 'secondary', 0.25),   -- Lower Traps

-- Arnold Press
('ex000001-0000-0000-0000-000000000023', 'm0000001-0000-0000-0000-000000000009', 'primary', 0.90),     -- Anterior Deltoid
('ex000001-0000-0000-0000-000000000023', 'm0000001-0000-0000-0000-000000000010', 'primary', 0.80),     -- Lateral Deltoid
('ex000001-0000-0000-0000-000000000023', 'm0000001-0000-0000-0000-000000000013', 'secondary', 0.40),   -- Triceps

-- Cable Lateral Raise
('ex000001-0000-0000-0000-000000000024', 'm0000001-0000-0000-0000-000000000010', 'primary', 1.00),     -- Lateral Deltoid
('ex000001-0000-0000-0000-000000000024', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.15),   -- Anterior Deltoid

-- Barbell Curl
('ex000001-0000-0000-0000-000000000025', 'm0000001-0000-0000-0000-000000000012', 'primary', 1.00),     -- Biceps
('ex000001-0000-0000-0000-000000000025', 'm0000001-0000-0000-0000-000000000014', 'secondary', 0.35),   -- Brachialis
('ex000001-0000-0000-0000-000000000025', 'm0000001-0000-0000-0000-000000000015', 'secondary', 0.25),   -- Forearms

-- Dumbbell Curl
('ex000001-0000-0000-0000-000000000026', 'm0000001-0000-0000-0000-000000000012', 'primary', 1.00),     -- Biceps
('ex000001-0000-0000-0000-000000000026', 'm0000001-0000-0000-0000-000000000014', 'secondary', 0.30),   -- Brachialis
('ex000001-0000-0000-0000-000000000026', 'm0000001-0000-0000-0000-000000000015', 'secondary', 0.20),   -- Forearms

-- Hammer Curl
('ex000001-0000-0000-0000-000000000027', 'm0000001-0000-0000-0000-000000000014', 'primary', 1.00),     -- Brachialis
('ex000001-0000-0000-0000-000000000027', 'm0000001-0000-0000-0000-000000000012', 'secondary', 0.60),   -- Biceps
('ex000001-0000-0000-0000-000000000027', 'm0000001-0000-0000-0000-000000000015', 'secondary', 0.40),   -- Forearms

-- Preacher Curl
('ex000001-0000-0000-0000-000000000028', 'm0000001-0000-0000-0000-000000000012', 'primary', 1.00),     -- Biceps
('ex000001-0000-0000-0000-000000000028', 'm0000001-0000-0000-0000-000000000014', 'secondary', 0.35),   -- Brachialis

-- Tricep Pushdown
('ex000001-0000-0000-0000-000000000029', 'm0000001-0000-0000-0000-000000000013', 'primary', 1.00),     -- Triceps

-- Skull Crushers
('ex000001-0000-0000-0000-000000000030', 'm0000001-0000-0000-0000-000000000013', 'primary', 1.00),     -- Triceps

-- Overhead Tricep Extension
('ex000001-0000-0000-0000-000000000031', 'm0000001-0000-0000-0000-000000000013', 'primary', 1.00),     -- Triceps

-- Close-Grip Bench Press
('ex000001-0000-0000-0000-000000000032', 'm0000001-0000-0000-0000-000000000013', 'primary', 1.00),     -- Triceps
('ex000001-0000-0000-0000-000000000032', 'm0000001-0000-0000-0000-000000000002', 'secondary', 0.50),   -- Mid Chest
('ex000001-0000-0000-0000-000000000032', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.30),   -- Anterior Deltoid

-- Cable Curl
('ex000001-0000-0000-0000-000000000033', 'm0000001-0000-0000-0000-000000000012', 'primary', 1.00),     -- Biceps
('ex000001-0000-0000-0000-000000000033', 'm0000001-0000-0000-0000-000000000014', 'secondary', 0.30),   -- Brachialis

-- Dips (Tricep)
('ex000001-0000-0000-0000-000000000034', 'm0000001-0000-0000-0000-000000000013', 'primary', 1.00),     -- Triceps
('ex000001-0000-0000-0000-000000000034', 'm0000001-0000-0000-0000-000000000002', 'secondary', 0.35),   -- Mid Chest
('ex000001-0000-0000-0000-000000000034', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.25),   -- Anterior Deltoid

-- Barbell Back Squat
('ex000001-0000-0000-0000-000000000035', 'm0000001-0000-0000-0000-000000000016', 'primary', 1.00),     -- Quadriceps
('ex000001-0000-0000-0000-000000000035', 'm0000001-0000-0000-0000-000000000018', 'secondary', 0.60),   -- Glutes
('ex000001-0000-0000-0000-000000000035', 'm0000001-0000-0000-0000-000000000017', 'secondary', 0.35),   -- Hamstrings
('ex000001-0000-0000-0000-000000000035', 'm0000001-0000-0000-0000-000000000007', 'stabilizer', 0.25),  -- Erector Spinae
('ex000001-0000-0000-0000-000000000035', 'm0000001-0000-0000-0000-000000000022', 'stabilizer', 0.15),  -- Rectus Abdominis

-- Leg Press
('ex000001-0000-0000-0000-000000000036', 'm0000001-0000-0000-0000-000000000016', 'primary', 1.00),     -- Quadriceps
('ex000001-0000-0000-0000-000000000036', 'm0000001-0000-0000-0000-000000000018', 'secondary', 0.50),   -- Glutes
('ex000001-0000-0000-0000-000000000036', 'm0000001-0000-0000-0000-000000000017', 'secondary', 0.30),   -- Hamstrings

-- Romanian Deadlift
('ex000001-0000-0000-0000-000000000037', 'm0000001-0000-0000-0000-000000000017', 'primary', 1.00),     -- Hamstrings
('ex000001-0000-0000-0000-000000000037', 'm0000001-0000-0000-0000-000000000018', 'secondary', 0.60),   -- Glutes
('ex000001-0000-0000-0000-000000000037', 'm0000001-0000-0000-0000-000000000007', 'secondary', 0.40),   -- Erector Spinae

-- Leg Curl
('ex000001-0000-0000-0000-000000000038', 'm0000001-0000-0000-0000-000000000017', 'primary', 1.00),     -- Hamstrings
('ex000001-0000-0000-0000-000000000038', 'm0000001-0000-0000-0000-000000000021', 'secondary', 0.15),   -- Calves

-- Leg Extension
('ex000001-0000-0000-0000-000000000039', 'm0000001-0000-0000-0000-000000000016', 'primary', 1.00),     -- Quadriceps

-- Bulgarian Split Squat
('ex000001-0000-0000-0000-000000000040', 'm0000001-0000-0000-0000-000000000016', 'primary', 0.90),     -- Quadriceps
('ex000001-0000-0000-0000-000000000040', 'm0000001-0000-0000-0000-000000000018', 'primary', 0.80),     -- Glutes
('ex000001-0000-0000-0000-000000000040', 'm0000001-0000-0000-0000-000000000017', 'secondary', 0.30),   -- Hamstrings

-- Goblet Squat
('ex000001-0000-0000-0000-000000000041', 'm0000001-0000-0000-0000-000000000016', 'primary', 1.00),     -- Quadriceps
('ex000001-0000-0000-0000-000000000041', 'm0000001-0000-0000-0000-000000000018', 'secondary', 0.50),   -- Glutes
('ex000001-0000-0000-0000-000000000041', 'm0000001-0000-0000-0000-000000000022', 'stabilizer', 0.15),  -- Rectus Abdominis

-- Walking Lunges
('ex000001-0000-0000-0000-000000000042', 'm0000001-0000-0000-0000-000000000016', 'primary', 0.90),     -- Quadriceps
('ex000001-0000-0000-0000-000000000042', 'm0000001-0000-0000-0000-000000000018', 'primary', 0.80),     -- Glutes
('ex000001-0000-0000-0000-000000000042', 'm0000001-0000-0000-0000-000000000017', 'secondary', 0.30),   -- Hamstrings

-- Hip Thrust
('ex000001-0000-0000-0000-000000000043', 'm0000001-0000-0000-0000-000000000018', 'primary', 1.00),     -- Glutes
('ex000001-0000-0000-0000-000000000043', 'm0000001-0000-0000-0000-000000000017', 'secondary', 0.30),   -- Hamstrings
('ex000001-0000-0000-0000-000000000043', 'm0000001-0000-0000-0000-000000000022', 'stabilizer', 0.15),  -- Rectus Abdominis

-- Standing Calf Raise
('ex000001-0000-0000-0000-000000000044', 'm0000001-0000-0000-0000-000000000021', 'primary', 1.00),     -- Calves

-- Seated Calf Raise
('ex000001-0000-0000-0000-000000000045', 'm0000001-0000-0000-0000-000000000021', 'primary', 1.00),     -- Calves

-- Sumo Deadlift
('ex000001-0000-0000-0000-000000000046', 'm0000001-0000-0000-0000-000000000018', 'primary', 0.90),     -- Glutes
('ex000001-0000-0000-0000-000000000046', 'm0000001-0000-0000-0000-000000000016', 'secondary', 0.50),   -- Quadriceps
('ex000001-0000-0000-0000-000000000046', 'm0000001-0000-0000-0000-000000000019', 'secondary', 0.50),   -- Adductors
('ex000001-0000-0000-0000-000000000046', 'm0000001-0000-0000-0000-000000000017', 'secondary', 0.40),   -- Hamstrings
('ex000001-0000-0000-0000-000000000046', 'm0000001-0000-0000-0000-000000000007', 'stabilizer', 0.30),  -- Erector Spinae

-- Hack Squat
('ex000001-0000-0000-0000-000000000047', 'm0000001-0000-0000-0000-000000000016', 'primary', 1.00),     -- Quadriceps
('ex000001-0000-0000-0000-000000000047', 'm0000001-0000-0000-0000-000000000018', 'secondary', 0.45),   -- Glutes

-- Stiff-Leg Deadlift
('ex000001-0000-0000-0000-000000000048', 'm0000001-0000-0000-0000-000000000017', 'primary', 1.00),     -- Hamstrings
('ex000001-0000-0000-0000-000000000048', 'm0000001-0000-0000-0000-000000000018', 'secondary', 0.50),   -- Glutes
('ex000001-0000-0000-0000-000000000048', 'm0000001-0000-0000-0000-000000000007', 'secondary', 0.45),   -- Erector Spinae

-- Leg Press Calf Raise
('ex000001-0000-0000-0000-000000000049', 'm0000001-0000-0000-0000-000000000021', 'primary', 1.00),     -- Calves

-- Plank
('ex000001-0000-0000-0000-000000000050', 'm0000001-0000-0000-0000-000000000022', 'primary', 1.00),     -- Rectus Abdominis
('ex000001-0000-0000-0000-000000000050', 'm0000001-0000-0000-0000-000000000024', 'secondary', 0.50),   -- Transverse Abdominis
('ex000001-0000-0000-0000-000000000050', 'm0000001-0000-0000-0000-000000000023', 'secondary', 0.30),   -- Obliques

-- Cable Crunch
('ex000001-0000-0000-0000-000000000051', 'm0000001-0000-0000-0000-000000000022', 'primary', 1.00),     -- Rectus Abdominis
('ex000001-0000-0000-0000-000000000051', 'm0000001-0000-0000-0000-000000000023', 'secondary', 0.25),   -- Obliques

-- Hanging Leg Raise
('ex000001-0000-0000-0000-000000000052', 'm0000001-0000-0000-0000-000000000022', 'primary', 1.00),     -- Rectus Abdominis
('ex000001-0000-0000-0000-000000000052', 'm0000001-0000-0000-0000-000000000023', 'secondary', 0.30),   -- Obliques
('ex000001-0000-0000-0000-000000000052', 'm0000001-0000-0000-0000-000000000015', 'stabilizer', 0.20),  -- Forearms

-- Russian Twist
('ex000001-0000-0000-0000-000000000053', 'm0000001-0000-0000-0000-000000000023', 'primary', 1.00),     -- Obliques
('ex000001-0000-0000-0000-000000000053', 'm0000001-0000-0000-0000-000000000022', 'secondary', 0.40),   -- Rectus Abdominis

-- Ab Wheel Rollout
('ex000001-0000-0000-0000-000000000054', 'm0000001-0000-0000-0000-000000000022', 'primary', 1.00),     -- Rectus Abdominis
('ex000001-0000-0000-0000-000000000054', 'm0000001-0000-0000-0000-000000000023', 'secondary', 0.35),   -- Obliques
('ex000001-0000-0000-0000-000000000054', 'm0000001-0000-0000-0000-000000000004', 'secondary', 0.25),   -- Lats

-- Dead Bug
('ex000001-0000-0000-0000-000000000055', 'm0000001-0000-0000-0000-000000000024', 'primary', 1.00),     -- Transverse Abdominis
('ex000001-0000-0000-0000-000000000055', 'm0000001-0000-0000-0000-000000000022', 'secondary', 0.40),   -- Rectus Abdominis

-- Pallof Press
('ex000001-0000-0000-0000-000000000056', 'm0000001-0000-0000-0000-000000000023', 'primary', 0.90),     -- Obliques
('ex000001-0000-0000-0000-000000000056', 'm0000001-0000-0000-0000-000000000024', 'primary', 0.80),     -- Transverse Abdominis
('ex000001-0000-0000-0000-000000000056', 'm0000001-0000-0000-0000-000000000022', 'secondary', 0.30),   -- Rectus Abdominis

-- Deadlift
('ex000001-0000-0000-0000-000000000057', 'm0000001-0000-0000-0000-000000000018', 'primary', 0.90),     -- Glutes
('ex000001-0000-0000-0000-000000000057', 'm0000001-0000-0000-0000-000000000017', 'primary', 0.85),     -- Hamstrings
('ex000001-0000-0000-0000-000000000057', 'm0000001-0000-0000-0000-000000000007', 'secondary', 0.60),   -- Erector Spinae
('ex000001-0000-0000-0000-000000000057', 'm0000001-0000-0000-0000-000000000016', 'secondary', 0.40),   -- Quadriceps
('ex000001-0000-0000-0000-000000000057', 'm0000001-0000-0000-0000-000000000005', 'secondary', 0.30),   -- Upper Traps
('ex000001-0000-0000-0000-000000000057', 'm0000001-0000-0000-0000-000000000015', 'stabilizer', 0.25),  -- Forearms

-- Front Squat
('ex000001-0000-0000-0000-000000000058', 'm0000001-0000-0000-0000-000000000016', 'primary', 1.00),     -- Quadriceps
('ex000001-0000-0000-0000-000000000058', 'm0000001-0000-0000-0000-000000000018', 'secondary', 0.45),   -- Glutes
('ex000001-0000-0000-0000-000000000058', 'm0000001-0000-0000-0000-000000000022', 'stabilizer', 0.25),  -- Rectus Abdominis

-- Smith Machine Squat
('ex000001-0000-0000-0000-000000000059', 'm0000001-0000-0000-0000-000000000016', 'primary', 1.00),     -- Quadriceps
('ex000001-0000-0000-0000-000000000059', 'm0000001-0000-0000-0000-000000000018', 'secondary', 0.50),   -- Glutes
('ex000001-0000-0000-0000-000000000059', 'm0000001-0000-0000-0000-000000000017', 'secondary', 0.25),   -- Hamstrings

-- Smith Machine Bench Press
('ex000001-0000-0000-0000-000000000060', 'm0000001-0000-0000-0000-000000000002', 'primary', 1.00),     -- Mid Chest
('ex000001-0000-0000-0000-000000000060', 'm0000001-0000-0000-0000-000000000013', 'secondary', 0.40),   -- Triceps
('ex000001-0000-0000-0000-000000000060', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.30),   -- Anterior Deltoid

-- Incline Cable Fly
('ex000001-0000-0000-0000-000000000061', 'm0000001-0000-0000-0000-000000000001', 'primary', 1.00),     -- Upper Chest
('ex000001-0000-0000-0000-000000000061', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.25),   -- Anterior Deltoid

-- Dumbbell Fly
('ex000001-0000-0000-0000-000000000062', 'm0000001-0000-0000-0000-000000000002', 'primary', 1.00),     -- Mid Chest
('ex000001-0000-0000-0000-000000000062', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.20),   -- Anterior Deltoid

-- Standing Cable Row
('ex000001-0000-0000-0000-000000000063', 'm0000001-0000-0000-0000-000000000006', 'primary', 0.90),     -- Rhomboids
('ex000001-0000-0000-0000-000000000063', 'm0000001-0000-0000-0000-000000000004', 'secondary', 0.50),   -- Lats
('ex000001-0000-0000-0000-000000000063', 'm0000001-0000-0000-0000-000000000012', 'secondary', 0.30),   -- Biceps

-- Pendlay Row
('ex000001-0000-0000-0000-000000000064', 'm0000001-0000-0000-0000-000000000004', 'primary', 1.00),     -- Lats
('ex000001-0000-0000-0000-000000000064', 'm0000001-0000-0000-0000-000000000006', 'secondary', 0.55),   -- Rhomboids
('ex000001-0000-0000-0000-000000000064', 'm0000001-0000-0000-0000-000000000012', 'secondary', 0.35),   -- Biceps
('ex000001-0000-0000-0000-000000000064', 'm0000001-0000-0000-0000-000000000007', 'stabilizer', 0.25),  -- Erector Spinae

-- Machine Row
('ex000001-0000-0000-0000-000000000065', 'm0000001-0000-0000-0000-000000000006', 'primary', 0.90),     -- Rhomboids
('ex000001-0000-0000-0000-000000000065', 'm0000001-0000-0000-0000-000000000004', 'secondary', 0.55),   -- Lats
('ex000001-0000-0000-0000-000000000065', 'm0000001-0000-0000-0000-000000000012', 'secondary', 0.30),   -- Biceps

-- EZ Bar Curl
('ex000001-0000-0000-0000-000000000066', 'm0000001-0000-0000-0000-000000000012', 'primary', 1.00),     -- Biceps
('ex000001-0000-0000-0000-000000000066', 'm0000001-0000-0000-0000-000000000014', 'secondary', 0.35),   -- Brachialis
('ex000001-0000-0000-0000-000000000066', 'm0000001-0000-0000-0000-000000000015', 'secondary', 0.20),   -- Forearms

-- Concentration Curl
('ex000001-0000-0000-0000-000000000067', 'm0000001-0000-0000-0000-000000000012', 'primary', 1.00),     -- Biceps
('ex000001-0000-0000-0000-000000000067', 'm0000001-0000-0000-0000-000000000014', 'secondary', 0.25),   -- Brachialis

-- Tricep Kickback
('ex000001-0000-0000-0000-000000000068', 'm0000001-0000-0000-0000-000000000013', 'primary', 1.00),     -- Triceps

-- Cable Overhead Tricep Extension
('ex000001-0000-0000-0000-000000000069', 'm0000001-0000-0000-0000-000000000013', 'primary', 1.00),     -- Triceps

-- Upright Row
('ex000001-0000-0000-0000-000000000070', 'm0000001-0000-0000-0000-000000000010', 'primary', 0.80),     -- Lateral Deltoid
('ex000001-0000-0000-0000-000000000070', 'm0000001-0000-0000-0000-000000000005', 'primary', 0.70),     -- Upper Traps
('ex000001-0000-0000-0000-000000000070', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.30),   -- Anterior Deltoid

-- Barbell Shrug
('ex000001-0000-0000-0000-000000000071', 'm0000001-0000-0000-0000-000000000005', 'primary', 1.00),     -- Upper Traps
('ex000001-0000-0000-0000-000000000071', 'm0000001-0000-0000-0000-000000000015', 'stabilizer', 0.20),  -- Forearms

-- Face Pull with External Rotation
('ex000001-0000-0000-0000-000000000072', 'm0000001-0000-0000-0000-000000000011', 'primary', 1.00),     -- Posterior Deltoid
('ex000001-0000-0000-0000-000000000072', 'm0000001-0000-0000-0000-000000000006', 'secondary', 0.40),   -- Rhomboids

-- Dumbbell Pullover
('ex000001-0000-0000-0000-000000000073', 'm0000001-0000-0000-0000-000000000004', 'primary', 0.80),     -- Lats
('ex000001-0000-0000-0000-000000000073', 'm0000001-0000-0000-0000-000000000002', 'secondary', 0.40),   -- Mid Chest
('ex000001-0000-0000-0000-000000000073', 'm0000001-0000-0000-0000-000000000013', 'secondary', 0.20),   -- Triceps

-- Reverse Grip Lat Pulldown
('ex000001-0000-0000-0000-000000000074', 'm0000001-0000-0000-0000-000000000004', 'primary', 1.00),     -- Lats
('ex000001-0000-0000-0000-000000000074', 'm0000001-0000-0000-0000-000000000012', 'secondary', 0.50),   -- Biceps

-- Machine Lateral Raise
('ex000001-0000-0000-0000-000000000075', 'm0000001-0000-0000-0000-000000000010', 'primary', 1.00),     -- Lateral Deltoid

-- Incline Dumbbell Curl
('ex000001-0000-0000-0000-000000000076', 'm0000001-0000-0000-0000-000000000012', 'primary', 1.00),     -- Biceps
('ex000001-0000-0000-0000-000000000076', 'm0000001-0000-0000-0000-000000000014', 'secondary', 0.30),   -- Brachialis

-- Seated Lateral Raise
('ex000001-0000-0000-0000-000000000077', 'm0000001-0000-0000-0000-000000000010', 'primary', 1.00),     -- Lateral Deltoid

-- Reverse Pec Deck
('ex000001-0000-0000-0000-000000000078', 'm0000001-0000-0000-0000-000000000011', 'primary', 1.00),     -- Posterior Deltoid
('ex000001-0000-0000-0000-000000000078', 'm0000001-0000-0000-0000-000000000006', 'secondary', 0.35),   -- Rhomboids

-- Landmine Press
('ex000001-0000-0000-0000-000000000079', 'm0000001-0000-0000-0000-000000000009', 'primary', 0.90),     -- Anterior Deltoid
('ex000001-0000-0000-0000-000000000079', 'm0000001-0000-0000-0000-000000000001', 'secondary', 0.40),   -- Upper Chest
('ex000001-0000-0000-0000-000000000079', 'm0000001-0000-0000-0000-000000000013', 'secondary', 0.35),   -- Triceps

-- Cable Woodchop
('ex000001-0000-0000-0000-000000000080', 'm0000001-0000-0000-0000-000000000023', 'primary', 1.00),     -- Obliques
('ex000001-0000-0000-0000-000000000080', 'm0000001-0000-0000-0000-000000000022', 'secondary', 0.30),   -- Rectus Abdominis

-- Glute Bridge
('ex000001-0000-0000-0000-000000000081', 'm0000001-0000-0000-0000-000000000018', 'primary', 1.00),     -- Glutes
('ex000001-0000-0000-0000-000000000081', 'm0000001-0000-0000-0000-000000000017', 'secondary', 0.25),   -- Hamstrings

-- Good Morning
('ex000001-0000-0000-0000-000000000082', 'm0000001-0000-0000-0000-000000000017', 'primary', 0.90),     -- Hamstrings
('ex000001-0000-0000-0000-000000000082', 'm0000001-0000-0000-0000-000000000007', 'primary', 0.80),     -- Erector Spinae
('ex000001-0000-0000-0000-000000000082', 'm0000001-0000-0000-0000-000000000018', 'secondary', 0.50),   -- Glutes

-- Dumbbell Step-up
('ex000001-0000-0000-0000-000000000083', 'm0000001-0000-0000-0000-000000000016', 'primary', 0.90),     -- Quadriceps
('ex000001-0000-0000-0000-000000000083', 'm0000001-0000-0000-0000-000000000018', 'primary', 0.75),     -- Glutes

-- Machine Shoulder Press
('ex000001-0000-0000-0000-000000000084', 'm0000001-0000-0000-0000-000000000009', 'primary', 1.00),     -- Anterior Deltoid
('ex000001-0000-0000-0000-000000000084', 'm0000001-0000-0000-0000-000000000010', 'secondary', 0.40),   -- Lateral Deltoid
('ex000001-0000-0000-0000-000000000084', 'm0000001-0000-0000-0000-000000000013', 'secondary', 0.35),   -- Triceps

-- Pec Deck Fly
('ex000001-0000-0000-0000-000000000085', 'm0000001-0000-0000-0000-000000000002', 'primary', 1.00),     -- Mid Chest
('ex000001-0000-0000-0000-000000000085', 'm0000001-0000-0000-0000-000000000009', 'secondary', 0.20);   -- Anterior Deltoid


-- ─── Exercise ↔ Equipment Mappings ──────────────────────────────────────────

INSERT INTO exercise_equipment (exercise_id, equipment_id, is_primary) VALUES
-- Barbell exercises
('ex000001-0000-0000-0000-000000000001', 'e0000001-0000-0000-0000-000000000001', true),  -- Bench Press → Barbell
('ex000001-0000-0000-0000-000000000001', 'e0000001-0000-0000-0000-000000000011', true),  -- Bench Press → Bench
('ex000001-0000-0000-0000-000000000005', 'e0000001-0000-0000-0000-000000000001', true),  -- Incline BB Press → Barbell
('ex000001-0000-0000-0000-000000000005', 'e0000001-0000-0000-0000-000000000011', true),  -- Incline BB Press → Bench
('ex000001-0000-0000-0000-000000000009', 'e0000001-0000-0000-0000-000000000001', true),  -- Barbell Row → Barbell
('ex000001-0000-0000-0000-000000000018', 'e0000001-0000-0000-0000-000000000001', true),  -- OHP → Barbell
('ex000001-0000-0000-0000-000000000025', 'e0000001-0000-0000-0000-000000000001', true),  -- Barbell Curl → Barbell
('ex000001-0000-0000-0000-000000000030', 'e0000001-0000-0000-0000-000000000001', true),  -- Skull Crushers → Barbell/EZ
('ex000001-0000-0000-0000-000000000030', 'e0000001-0000-0000-0000-000000000011', true),  -- Skull Crushers → Bench
('ex000001-0000-0000-0000-000000000032', 'e0000001-0000-0000-0000-000000000001', true),  -- Close-Grip BP → Barbell
('ex000001-0000-0000-0000-000000000032', 'e0000001-0000-0000-0000-000000000011', true),  -- Close-Grip BP → Bench
('ex000001-0000-0000-0000-000000000035', 'e0000001-0000-0000-0000-000000000001', true),  -- Back Squat → Barbell
('ex000001-0000-0000-0000-000000000037', 'e0000001-0000-0000-0000-000000000001', true),  -- RDL → Barbell
('ex000001-0000-0000-0000-000000000043', 'e0000001-0000-0000-0000-000000000001', true),  -- Hip Thrust → Barbell
('ex000001-0000-0000-0000-000000000043', 'e0000001-0000-0000-0000-000000000011', true),  -- Hip Thrust → Bench
('ex000001-0000-0000-0000-000000000046', 'e0000001-0000-0000-0000-000000000001', true),  -- Sumo DL → Barbell
('ex000001-0000-0000-0000-000000000048', 'e0000001-0000-0000-0000-000000000001', true),  -- Stiff-Leg DL → Barbell
('ex000001-0000-0000-0000-000000000057', 'e0000001-0000-0000-0000-000000000001', true),  -- Deadlift → Barbell
('ex000001-0000-0000-0000-000000000058', 'e0000001-0000-0000-0000-000000000001', true),  -- Front Squat → Barbell
('ex000001-0000-0000-0000-000000000064', 'e0000001-0000-0000-0000-000000000001', true),  -- Pendlay Row → Barbell
('ex000001-0000-0000-0000-000000000070', 'e0000001-0000-0000-0000-000000000001', true),  -- Upright Row → Barbell
('ex000001-0000-0000-0000-000000000071', 'e0000001-0000-0000-0000-000000000001', true),  -- Shrug → Barbell
('ex000001-0000-0000-0000-000000000079', 'e0000001-0000-0000-0000-000000000001', true),  -- Landmine Press → Barbell
('ex000001-0000-0000-0000-000000000082', 'e0000001-0000-0000-0000-000000000001', true),  -- Good Morning → Barbell

-- Dumbbell exercises
('ex000001-0000-0000-0000-000000000002', 'e0000001-0000-0000-0000-000000000002', true),  -- Incline DB Press → Dumbbells
('ex000001-0000-0000-0000-000000000002', 'e0000001-0000-0000-0000-000000000011', true),  -- Incline DB Press → Bench
('ex000001-0000-0000-0000-000000000003', 'e0000001-0000-0000-0000-000000000002', true),  -- DB Bench Press → Dumbbells
('ex000001-0000-0000-0000-000000000003', 'e0000001-0000-0000-0000-000000000011', true),  -- DB Bench Press → Bench
('ex000001-0000-0000-0000-000000000013', 'e0000001-0000-0000-0000-000000000002', true),  -- DB Row → Dumbbells
('ex000001-0000-0000-0000-000000000013', 'e0000001-0000-0000-0000-000000000011', true),  -- DB Row → Bench
('ex000001-0000-0000-0000-000000000019', 'e0000001-0000-0000-0000-000000000002', true),  -- DB Shoulder Press → Dumbbells
('ex000001-0000-0000-0000-000000000020', 'e0000001-0000-0000-0000-000000000002', true),  -- Lateral Raise → Dumbbells
('ex000001-0000-0000-0000-000000000021', 'e0000001-0000-0000-0000-000000000002', true),  -- Front Raise → Dumbbells
('ex000001-0000-0000-0000-000000000022', 'e0000001-0000-0000-0000-000000000002', true),  -- Reverse Fly → Dumbbells
('ex000001-0000-0000-0000-000000000023', 'e0000001-0000-0000-0000-000000000002', true),  -- Arnold Press → Dumbbells
('ex000001-0000-0000-0000-000000000026', 'e0000001-0000-0000-0000-000000000002', true),  -- DB Curl → Dumbbells
('ex000001-0000-0000-0000-000000000027', 'e0000001-0000-0000-0000-000000000002', true),  -- Hammer Curl → Dumbbells
('ex000001-0000-0000-0000-000000000028', 'e0000001-0000-0000-0000-000000000002', true),  -- Preacher Curl → Dumbbells
('ex000001-0000-0000-0000-000000000031', 'e0000001-0000-0000-0000-000000000002', true),  -- Overhead Ext → Dumbbells
('ex000001-0000-0000-0000-000000000040', 'e0000001-0000-0000-0000-000000000002', true),  -- Bulgarian SS → Dumbbells
('ex000001-0000-0000-0000-000000000040', 'e0000001-0000-0000-0000-000000000011', true),  -- Bulgarian SS → Bench
('ex000001-0000-0000-0000-000000000042', 'e0000001-0000-0000-0000-000000000002', true),  -- Walking Lunges → Dumbbells
('ex000001-0000-0000-0000-000000000062', 'e0000001-0000-0000-0000-000000000002', true),  -- DB Fly → Dumbbells
('ex000001-0000-0000-0000-000000000062', 'e0000001-0000-0000-0000-000000000011', true),  -- DB Fly → Bench
('ex000001-0000-0000-0000-000000000067', 'e0000001-0000-0000-0000-000000000002', true),  -- Concentration Curl → Dumbbells
('ex000001-0000-0000-0000-000000000068', 'e0000001-0000-0000-0000-000000000002', true),  -- Tricep Kickback → Dumbbells
('ex000001-0000-0000-0000-000000000073', 'e0000001-0000-0000-0000-000000000002', true),  -- DB Pullover → Dumbbells
('ex000001-0000-0000-0000-000000000073', 'e0000001-0000-0000-0000-000000000011', true),  -- DB Pullover → Bench
('ex000001-0000-0000-0000-000000000076', 'e0000001-0000-0000-0000-000000000002', true),  -- Incline DB Curl → Dumbbells
('ex000001-0000-0000-0000-000000000076', 'e0000001-0000-0000-0000-000000000011', true),  -- Incline DB Curl → Bench
('ex000001-0000-0000-0000-000000000077', 'e0000001-0000-0000-0000-000000000002', true),  -- Seated Lat Raise → Dumbbells
('ex000001-0000-0000-0000-000000000083', 'e0000001-0000-0000-0000-000000000002', true),  -- Step-up → Dumbbells

-- Cable exercises
('ex000001-0000-0000-0000-000000000006', 'e0000001-0000-0000-0000-000000000003', true),  -- Cable Crossover → Cable
('ex000001-0000-0000-0000-000000000010', 'e0000001-0000-0000-0000-000000000003', true),  -- Lat Pulldown → Cable
('ex000001-0000-0000-0000-000000000012', 'e0000001-0000-0000-0000-000000000003', true),  -- Seated Cable Row → Cable
('ex000001-0000-0000-0000-000000000015', 'e0000001-0000-0000-0000-000000000003', true),  -- Face Pull → Cable
('ex000001-0000-0000-0000-000000000017', 'e0000001-0000-0000-0000-000000000003', true),  -- Cable Lat Pullover → Cable
('ex000001-0000-0000-0000-000000000024', 'e0000001-0000-0000-0000-000000000003', true),  -- Cable Lat Raise → Cable
('ex000001-0000-0000-0000-000000000029', 'e0000001-0000-0000-0000-000000000003', true),  -- Tricep Pushdown → Cable
('ex000001-0000-0000-0000-000000000033', 'e0000001-0000-0000-0000-000000000003', true),  -- Cable Curl → Cable
('ex000001-0000-0000-0000-000000000051', 'e0000001-0000-0000-0000-000000000003', true),  -- Cable Crunch → Cable
('ex000001-0000-0000-0000-000000000056', 'e0000001-0000-0000-0000-000000000003', true),  -- Pallof Press → Cable
('ex000001-0000-0000-0000-000000000061', 'e0000001-0000-0000-0000-000000000003', true),  -- Incline Cable Fly → Cable
('ex000001-0000-0000-0000-000000000063', 'e0000001-0000-0000-0000-000000000003', true),  -- Standing Cable Row → Cable
('ex000001-0000-0000-0000-000000000069', 'e0000001-0000-0000-0000-000000000003', true),  -- Cable OH Tri Ext → Cable
('ex000001-0000-0000-0000-000000000072', 'e0000001-0000-0000-0000-000000000003', true),  -- Face Pull ER → Cable
('ex000001-0000-0000-0000-000000000074', 'e0000001-0000-0000-0000-000000000003', true),  -- Rev Grip Pulldown → Cable
('ex000001-0000-0000-0000-000000000080', 'e0000001-0000-0000-0000-000000000003', true),  -- Cable Woodchop → Cable

-- Machine exercises
('ex000001-0000-0000-0000-000000000004', 'e0000001-0000-0000-0000-000000000007', true),  -- Machine Chest Press → Machines
('ex000001-0000-0000-0000-000000000014', 'e0000001-0000-0000-0000-000000000007', true),  -- T-Bar Row → Machines
('ex000001-0000-0000-0000-000000000036', 'e0000001-0000-0000-0000-000000000007', true),  -- Leg Press → Machines
('ex000001-0000-0000-0000-000000000038', 'e0000001-0000-0000-0000-000000000007', true),  -- Leg Curl → Machines
('ex000001-0000-0000-0000-000000000039', 'e0000001-0000-0000-0000-000000000007', true),  -- Leg Extension → Machines
('ex000001-0000-0000-0000-000000000044', 'e0000001-0000-0000-0000-000000000007', true),  -- Standing Calf Raise → Machines
('ex000001-0000-0000-0000-000000000045', 'e0000001-0000-0000-0000-000000000007', true),  -- Seated Calf Raise → Machines
('ex000001-0000-0000-0000-000000000047', 'e0000001-0000-0000-0000-000000000007', true),  -- Hack Squat → Machines
('ex000001-0000-0000-0000-000000000065', 'e0000001-0000-0000-0000-000000000007', true),  -- Machine Row → Machines
('ex000001-0000-0000-0000-000000000075', 'e0000001-0000-0000-0000-000000000007', true),  -- Machine Lat Raise → Machines
('ex000001-0000-0000-0000-000000000078', 'e0000001-0000-0000-0000-000000000007', true),  -- Reverse Pec Deck → Machines
('ex000001-0000-0000-0000-000000000084', 'e0000001-0000-0000-0000-000000000007', true),  -- Machine Shoulder Press → Machines
('ex000001-0000-0000-0000-000000000085', 'e0000001-0000-0000-0000-000000000007', true),  -- Pec Deck Fly → Machines

-- Smith Machine exercises
('ex000001-0000-0000-0000-000000000059', 'e0000001-0000-0000-0000-000000000004', true),  -- Smith Squat → Smith
('ex000001-0000-0000-0000-000000000060', 'e0000001-0000-0000-0000-000000000004', true),  -- Smith Bench → Smith
('ex000001-0000-0000-0000-000000000060', 'e0000001-0000-0000-0000-000000000011', true),  -- Smith Bench → Bench

-- Bodyweight exercises
('ex000001-0000-0000-0000-000000000008', 'e0000001-0000-0000-0000-000000000009', true),  -- Push-ups → Bodyweight
('ex000001-0000-0000-0000-000000000011', 'e0000001-0000-0000-0000-000000000006', true),  -- Pull-ups → Pull-up Bar
('ex000001-0000-0000-0000-000000000016', 'e0000001-0000-0000-0000-000000000006', true),  -- Chin-ups → Pull-up Bar
('ex000001-0000-0000-0000-000000000007', 'e0000001-0000-0000-0000-000000000012', true),  -- Dips Chest → Dip Station
('ex000001-0000-0000-0000-000000000034', 'e0000001-0000-0000-0000-000000000012', true),  -- Dips Tricep → Dip Station
('ex000001-0000-0000-0000-000000000050', 'e0000001-0000-0000-0000-000000000009', true),  -- Plank → Bodyweight
('ex000001-0000-0000-0000-000000000052', 'e0000001-0000-0000-0000-000000000006', true),  -- Hanging Leg Raise → Pull-up Bar
('ex000001-0000-0000-0000-000000000053', 'e0000001-0000-0000-0000-000000000009', true),  -- Russian Twist → Bodyweight
('ex000001-0000-0000-0000-000000000055', 'e0000001-0000-0000-0000-000000000009', true),  -- Dead Bug → Bodyweight
('ex000001-0000-0000-0000-000000000081', 'e0000001-0000-0000-0000-000000000009', true),  -- Glute Bridge → Bodyweight

-- Kettlebell exercises
('ex000001-0000-0000-0000-000000000041', 'e0000001-0000-0000-0000-000000000008', true),  -- Goblet Squat → Kettlebell
('ex000001-0000-0000-0000-000000000041', 'e0000001-0000-0000-0000-000000000002', false),  -- Goblet Squat → Dumbbells (alt)

-- EZ Bar exercises
('ex000001-0000-0000-0000-000000000066', 'e0000001-0000-0000-0000-000000000010', true),  -- EZ Bar Curl → EZ Curl Bar

-- Leg Press Calf Raise → Machines (Leg Press)
('ex000001-0000-0000-0000-000000000049', 'e0000001-0000-0000-0000-000000000007', true),

-- Ab Wheel → Bodyweight (special equipment)
('ex000001-0000-0000-0000-000000000054', 'e0000001-0000-0000-0000-000000000009', true);


-- ─── Planning Parameters ────────────────────────────────────────────────────

INSERT INTO planning_parameters (parameter_key, category, value, description) VALUES
-- Recovery parameters
('recovery_threshold_heavy', 'recovery', '0.30', 'Minimum recovery score for heavy direct training'),
('recovery_threshold_moderate', 'recovery', '0.60', 'Minimum recovery score for moderate volume training'),
('recovery_threshold_light', 'recovery', '0.80', 'Minimum recovery score for light/indirect training'),
('intensity_factor_rpe_6', 'recovery', '0.70', 'Intensity factor for RPE ≤ 6'),
('intensity_factor_rpe_7', 'recovery', '0.85', 'Intensity factor for RPE 7'),
('intensity_factor_rpe_8', 'recovery', '1.00', 'Intensity factor for RPE 8'),
('intensity_factor_rpe_9', 'recovery', '1.15', 'Intensity factor for RPE 9'),
('intensity_factor_rpe_10', 'recovery', '1.35', 'Intensity factor for RPE 10'),

-- Volume parameters
('volume_factor_per_extra_set', 'recovery', '0.05', 'Additional recovery time per set above baseline'),
('experience_modifier_beginner', 'recovery', '1.15', 'Recovery modifier for beginners (more time needed)'),
('experience_modifier_intermediate', 'recovery', '1.00', 'Recovery modifier for intermediate'),
('experience_modifier_advanced', 'recovery', '0.90', 'Recovery modifier for advanced (recover faster)'),

-- Volume targets (weekly sets per muscle group for hypertrophy goal)
('weekly_sets_beginner_major', 'volume', '8', 'Weekly sets per major muscle group for beginners'),
('weekly_sets_beginner_minor', 'volume', '6', 'Weekly sets per minor muscle group for beginners'),
('weekly_sets_intermediate_major', 'volume', '12', 'Weekly sets per major muscle group for intermediate'),
('weekly_sets_intermediate_minor', 'volume', '8', 'Weekly sets per minor muscle group for intermediate'),
('weekly_sets_advanced_major', 'volume', '16', 'Weekly sets per major muscle group for advanced'),
('weekly_sets_advanced_minor', 'volume', '12', 'Weekly sets per minor muscle group for advanced'),

-- Rep ranges per goal
('rep_range_muscle_building', 'programming', '"8-12"', 'Default rep range for muscle building'),
('rep_range_strength', 'programming', '"3-6"', 'Default rep range for strength'),
('rep_range_fat_loss', 'programming', '"10-15"', 'Default rep range for fat loss'),
('rep_range_endurance', 'programming', '"12-20"', 'Default rep range for endurance'),
('rep_range_general', 'programming', '"8-15"', 'Default rep range for general fitness'),

-- Rest periods per goal (seconds)
('rest_seconds_muscle_building', 'programming', '90', 'Rest seconds for muscle building'),
('rest_seconds_strength', 'programming', '180', 'Rest seconds for strength'),
('rest_seconds_fat_loss', 'programming', '60', 'Rest seconds for fat loss'),
('rest_seconds_endurance', 'programming', '45', 'Rest seconds for endurance'),
('rest_seconds_general', 'programming', '90', 'Rest seconds for general fitness'),

-- Progressive overload
('progression_weight_increment_upper', 'progression', '2.5', 'Weight increment (kg) for upper body exercises'),
('progression_weight_increment_lower', 'progression', '5.0', 'Weight increment (kg) for lower body exercises'),
('progression_rpe_threshold', 'progression', '8.0', 'Maximum RPE before suggesting progression'),
('deload_threshold_sessions', 'progression', '12', 'Sessions before suggesting a deload week'),

-- Exercise selection scoring weights
('score_weight_goal_match', 'scoring', '0.25', 'Weight for goal match in exercise scoring'),
('score_weight_muscle_match', 'scoring', '0.25', 'Weight for muscle match in exercise scoring'),
('score_weight_equipment_match', 'scoring', '0.15', 'Weight for equipment match in exercise scoring'),
('score_weight_preference', 'scoring', '0.15', 'Weight for user preference in exercise scoring'),
('score_weight_variety', 'scoring', '0.10', 'Weight for exercise variety in scoring'),
('score_weight_pattern_balance', 'scoring', '0.10', 'Weight for movement pattern balance in scoring'),
('penalty_recent_exercise', 'scoring', '0.30', 'Penalty for recently performed exercises'),
('penalty_fatigue', 'scoring', '0.50', 'Penalty for targeting fatigued muscles'),
('penalty_injury', 'scoring', '1.00', 'Penalty for exercises conflicting with injuries'),

-- Split recommendations
('split_2day', 'splits', '{"beginner": "full_body", "intermediate": "full_body", "advanced": "upper_lower"}', 'Recommended split for 2 training days'),
('split_3day', 'splits', '{"beginner": "full_body", "intermediate": "upper_lower_full", "advanced": "push_pull_legs"}', 'Recommended split for 3 training days'),
('split_4day', 'splits', '{"beginner": "upper_lower", "intermediate": "upper_lower", "advanced": "upper_lower"}', 'Recommended split for 4 training days'),
('split_5day', 'splits', '{"beginner": "upper_lower", "intermediate": "upper_lower", "advanced": "push_pull_legs"}', 'Recommended split for 5 training days'),
('split_6day', 'splits', '{"beginner": "push_pull_legs", "intermediate": "push_pull_legs", "advanced": "push_pull_legs"}', 'Recommended split for 6 training days'),

-- Nutrition multipliers
('bmr_activity_sedentary', 'nutrition', '1.2', 'Activity multiplier for sedentary'),
('bmr_activity_light', 'nutrition', '1.375', 'Activity multiplier for light activity (1-2 days)'),
('bmr_activity_moderate', 'nutrition', '1.55', 'Activity multiplier for moderate activity (3-4 days)'),
('bmr_activity_active', 'nutrition', '1.725', 'Activity multiplier for active (5-6 days)'),
('bmr_activity_very_active', 'nutrition', '1.9', 'Activity multiplier for very active (6-7 days)'),
('protein_per_kg_muscle_building', 'nutrition', '2.0', 'Protein (g) per kg bodyweight for muscle building'),
('protein_per_kg_fat_loss', 'nutrition', '2.2', 'Protein (g) per kg bodyweight for fat loss'),
('protein_per_kg_general', 'nutrition', '1.6', 'Protein (g) per kg bodyweight for general fitness'),
('fat_pct_min', 'nutrition', '0.25', 'Minimum fat percentage of total calories'),
('fat_pct_max', 'nutrition', '0.35', 'Maximum fat percentage of total calories');
