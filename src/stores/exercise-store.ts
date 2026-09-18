'use client';

export interface ExerciseItem {
  id: string;
  name: string;
  category: 'Strength Training' | 'Cardio' | 'Team Sports' | 'Individual Sports' | 'Swimming / Aquatic' | 'Mobility / Flexibility' | 'Recovery';
  movementPattern: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'compound' | 'isolation' | 'cardio' | 'sport' | 'recovery';
  muscleGroup: string;
  targetMuscle: string;
  primaryMuscleSlug: string;
  youtubeUrls: string[];
  description: string;
}

export const SEEDED_EXERCISES: ExerciseItem[] = [
  {
    "id": "ex_dumbbell_bench_press",
    "name": "Dumbbell Bench Press",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Chest",
    "targetMuscle": "Mid-Lower Pectoralis Major",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dumbbell Bench Press targeting Chest."
  },
  {
    "id": "ex_machine_chest_press",
    "name": "Machine Chest Press",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Chest",
    "targetMuscle": "Mid-Lower Pectoralis Major",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Machine Chest Press targeting Chest."
  },
  {
    "id": "ex_smith_machine_bench_press",
    "name": "Smith Machine Bench Press",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Chest",
    "targetMuscle": "Mid-Lower Pectoralis Major",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Smith Machine Bench Press targeting Chest."
  },
  {
    "id": "ex_incline_barbell_bench_press",
    "name": "Incline Barbell Bench Press",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Chest",
    "targetMuscle": "Upper Pectoralis Major",
    "primaryMuscleSlug": "upper-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Incline Barbell Bench Press targeting Chest."
  },
  {
    "id": "ex_incline_machine_chest_press",
    "name": "Incline Machine Chest Press",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Chest",
    "targetMuscle": "Upper Pectoralis Major",
    "primaryMuscleSlug": "upper-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Incline Machine Chest Press targeting Chest."
  },
  {
    "id": "ex_decline_barbell_bench_press",
    "name": "Decline Barbell Bench Press",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Chest",
    "targetMuscle": "Mid-Lower Pectoralis Major",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Decline Barbell Bench Press targeting Chest."
  },
  {
    "id": "ex_decline_dumbbell_press",
    "name": "Decline Dumbbell Press",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Chest",
    "targetMuscle": "Mid-Lower Pectoralis Major",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Decline Dumbbell Press targeting Chest."
  },
  {
    "id": "ex_chest_dip",
    "name": "Chest Dip",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Chest",
    "targetMuscle": "Mid-Lower Pectoralis Major",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Chest Dip targeting Chest."
  },
  {
    "id": "ex_push_up",
    "name": "Push-Up",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Chest",
    "targetMuscle": "Mid-Lower Pectoralis Major",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Push-Up targeting Chest."
  },
  {
    "id": "ex_weighted_push_up",
    "name": "Weighted Push-Up",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Chest",
    "targetMuscle": "Mid-Lower Pectoralis Major",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Weighted Push-Up targeting Chest."
  },
  {
    "id": "ex_cable_chest_press",
    "name": "Cable Chest Press",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Chest",
    "targetMuscle": "Mid-Lower Pectoralis Major",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Cable Chest Press targeting Chest."
  },
  {
    "id": "ex_cable_fly",
    "name": "Cable Fly",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Chest",
    "targetMuscle": "Sternal Chest & Inner Pecs",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Cable Fly targeting Chest."
  },
  {
    "id": "ex_dumbbell_fly",
    "name": "Dumbbell Fly",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Chest",
    "targetMuscle": "Sternal Chest & Inner Pecs",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dumbbell Fly targeting Chest."
  },
  {
    "id": "ex_pec_deck_fly",
    "name": "Pec Deck Fly",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Chest",
    "targetMuscle": "Sternal Chest & Inner Pecs",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Pec Deck Fly targeting Chest."
  },
  {
    "id": "ex_incline_dumbbell_fly",
    "name": "Incline Dumbbell Fly",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Chest",
    "targetMuscle": "Upper Pectoralis Major",
    "primaryMuscleSlug": "upper-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Incline Dumbbell Fly targeting Chest."
  },
  {
    "id": "ex_low_to_high_cable_fly",
    "name": "Low-to-High Cable Fly",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Chest",
    "targetMuscle": "Upper Pectoralis Major",
    "primaryMuscleSlug": "upper-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Low-to-High Cable Fly targeting Chest."
  },
  {
    "id": "ex_high_to_low_cable_fly",
    "name": "High-to-Low Cable Fly",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Chest",
    "targetMuscle": "Sternal Chest & Inner Pecs",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "High-to-Low Cable Fly targeting Chest."
  },
  {
    "id": "ex_svend_press",
    "name": "Svend Press",
    "category": "Strength Training",
    "movementPattern": "horizontal_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Chest",
    "targetMuscle": "Mid-Lower Pectoralis Major",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Svend Press targeting Chest."
  },
  {
    "id": "ex_pull_up",
    "name": "Pull-Up",
    "category": "Strength Training",
    "movementPattern": "vertical_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Latissimus Dorsi",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Pull-Up targeting Back."
  },
  {
    "id": "ex_chin_up",
    "name": "Chin-Up",
    "category": "Strength Training",
    "movementPattern": "compound_lift",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Back",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Chin-Up targeting Back."
  },
  {
    "id": "ex_assisted_pull_up",
    "name": "Assisted Pull-Up",
    "category": "Strength Training",
    "movementPattern": "vertical_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Latissimus Dorsi",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Assisted Pull-Up targeting Back."
  },
  {
    "id": "ex_weighted_pull_up",
    "name": "Weighted Pull-Up",
    "category": "Strength Training",
    "movementPattern": "vertical_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Latissimus Dorsi",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Weighted Pull-Up targeting Back."
  },
  {
    "id": "ex_close_grip_lat_pulldown",
    "name": "Close-Grip Lat Pulldown",
    "category": "Strength Training",
    "movementPattern": "vertical_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Latissimus Dorsi",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Close-Grip Lat Pulldown targeting Back."
  },
  {
    "id": "ex_wide_grip_lat_pulldown",
    "name": "Wide-Grip Lat Pulldown",
    "category": "Strength Training",
    "movementPattern": "vertical_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Latissimus Dorsi",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Wide-Grip Lat Pulldown targeting Back."
  },
  {
    "id": "ex_neutral_grip_lat_pulldown",
    "name": "Neutral-Grip Lat Pulldown",
    "category": "Strength Training",
    "movementPattern": "vertical_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Latissimus Dorsi",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Neutral-Grip Lat Pulldown targeting Back."
  },
  {
    "id": "ex_straight_arm_pulldown",
    "name": "Straight-Arm Pulldown",
    "category": "Strength Training",
    "movementPattern": "vertical_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Latissimus Dorsi",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Straight-Arm Pulldown targeting Back."
  },
  {
    "id": "ex_barbell_bent_over_row",
    "name": "Barbell Bent-Over Row",
    "category": "Strength Training",
    "movementPattern": "horizontal_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Rhomboids & Mid-Traps",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Barbell Bent-Over Row targeting Back."
  },
  {
    "id": "ex_pendlay_row",
    "name": "Pendlay Row",
    "category": "Strength Training",
    "movementPattern": "horizontal_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Rhomboids & Mid-Traps",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Pendlay Row targeting Back."
  },
  {
    "id": "ex_dumbbell_row",
    "name": "Dumbbell Row",
    "category": "Strength Training",
    "movementPattern": "horizontal_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Rhomboids & Mid-Traps",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dumbbell Row targeting Back."
  },
  {
    "id": "ex_chest_supported_dumbbell_row",
    "name": "Chest-Supported Dumbbell Row",
    "category": "Strength Training",
    "movementPattern": "horizontal_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Rhomboids & Mid-Traps",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Chest-Supported Dumbbell Row targeting Back."
  },
  {
    "id": "ex_t_bar_row",
    "name": "T-Bar Row",
    "category": "Strength Training",
    "movementPattern": "horizontal_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Rhomboids & Mid-Traps",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "T-Bar Row targeting Back."
  },
  {
    "id": "ex_seated_cable_row",
    "name": "Seated Cable Row",
    "category": "Strength Training",
    "movementPattern": "horizontal_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Rhomboids & Mid-Traps",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Seated Cable Row targeting Back."
  },
  {
    "id": "ex_machine_row",
    "name": "Machine Row",
    "category": "Strength Training",
    "movementPattern": "horizontal_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Rhomboids & Mid-Traps",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Machine Row targeting Back."
  },
  {
    "id": "ex_chest_supported_machine_row",
    "name": "Chest-Supported Machine Row",
    "category": "Strength Training",
    "movementPattern": "horizontal_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Rhomboids & Mid-Traps",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Chest-Supported Machine Row targeting Back."
  },
  {
    "id": "ex_meadows_row",
    "name": "Meadows Row",
    "category": "Strength Training",
    "movementPattern": "horizontal_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Rhomboids & Mid-Traps",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Meadows Row targeting Back."
  },
  {
    "id": "ex_inverted_row",
    "name": "Inverted Row",
    "category": "Strength Training",
    "movementPattern": "horizontal_pull",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Rhomboids & Mid-Traps",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Inverted Row targeting Back."
  },
  {
    "id": "ex_cable_pullover",
    "name": "Cable Pullover",
    "category": "Strength Training",
    "movementPattern": "shoulder_extension",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Lats & Teres Major",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Cable Pullover targeting Back."
  },
  {
    "id": "ex_dumbbell_pullover",
    "name": "Dumbbell Pullover",
    "category": "Strength Training",
    "movementPattern": "shoulder_extension",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Back",
    "targetMuscle": "Lats & Teres Major",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dumbbell Pullover targeting Back."
  },
  {
    "id": "ex_barbell_shrug",
    "name": "Barbell Shrug",
    "category": "Strength Training",
    "movementPattern": "shoulder_elevation",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Back",
    "targetMuscle": "Upper Trapezius",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Barbell Shrug targeting Back."
  },
  {
    "id": "ex_dumbbell_shrug",
    "name": "Dumbbell Shrug",
    "category": "Strength Training",
    "movementPattern": "shoulder_elevation",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Back",
    "targetMuscle": "Upper Trapezius",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dumbbell Shrug targeting Back."
  },
  {
    "id": "ex_seated_dumbbell_shoulder_press",
    "name": "Seated Dumbbell Shoulder Press",
    "category": "Strength Training",
    "movementPattern": "vertical_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Shoulders",
    "targetMuscle": "Anterior Deltoid & Upper Chest",
    "primaryMuscleSlug": "anterior-deltoid",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Seated Dumbbell Shoulder Press targeting Shoulders."
  },
  {
    "id": "ex_standing_dumbbell_shoulder_press",
    "name": "Standing Dumbbell Shoulder Press",
    "category": "Strength Training",
    "movementPattern": "vertical_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Shoulders",
    "targetMuscle": "Anterior Deltoid & Upper Chest",
    "primaryMuscleSlug": "anterior-deltoid",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Standing Dumbbell Shoulder Press targeting Shoulders."
  },
  {
    "id": "ex_seated_barbell_overhead_press",
    "name": "Seated Barbell Overhead Press",
    "category": "Strength Training",
    "movementPattern": "vertical_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Shoulders",
    "targetMuscle": "Anterior Deltoid & Upper Chest",
    "primaryMuscleSlug": "anterior-deltoid",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Seated Barbell Overhead Press targeting Shoulders."
  },
  {
    "id": "ex_machine_shoulder_press",
    "name": "Machine Shoulder Press",
    "category": "Strength Training",
    "movementPattern": "vertical_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Shoulders",
    "targetMuscle": "Anterior Deltoid & Upper Chest",
    "primaryMuscleSlug": "anterior-deltoid",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Machine Shoulder Press targeting Shoulders."
  },
  {
    "id": "ex_arnold_press",
    "name": "Arnold Press",
    "category": "Strength Training",
    "movementPattern": "vertical_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Shoulders",
    "targetMuscle": "Anterior Deltoid & Upper Chest",
    "primaryMuscleSlug": "anterior-deltoid",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Arnold Press targeting Shoulders."
  },
  {
    "id": "ex_smith_machine_shoulder_press",
    "name": "Smith Machine Shoulder Press",
    "category": "Strength Training",
    "movementPattern": "vertical_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Shoulders",
    "targetMuscle": "Anterior Deltoid & Upper Chest",
    "primaryMuscleSlug": "anterior-deltoid",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Smith Machine Shoulder Press targeting Shoulders."
  },
  {
    "id": "ex_cable_lateral_raise",
    "name": "Cable Lateral Raise",
    "category": "Strength Training",
    "movementPattern": "shoulder_abduction",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Shoulders",
    "targetMuscle": "Lateral Deltoid",
    "primaryMuscleSlug": "lateral-deltoid",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Cable Lateral Raise targeting Shoulders."
  },
  {
    "id": "ex_machine_lateral_raise",
    "name": "Machine Lateral Raise",
    "category": "Strength Training",
    "movementPattern": "shoulder_abduction",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Shoulders",
    "targetMuscle": "Lateral Deltoid",
    "primaryMuscleSlug": "lateral-deltoid",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Machine Lateral Raise targeting Shoulders."
  },
  {
    "id": "ex_lean_away_cable_lateral_raise",
    "name": "Lean-Away Cable Lateral Raise",
    "category": "Strength Training",
    "movementPattern": "shoulder_abduction",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Shoulders",
    "targetMuscle": "Lateral Deltoid",
    "primaryMuscleSlug": "lateral-deltoid",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Lean-Away Cable Lateral Raise targeting Shoulders."
  },
  {
    "id": "ex_dumbbell_front_raise",
    "name": "Dumbbell Front Raise",
    "category": "Strength Training",
    "movementPattern": "compound_lift",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Shoulders",
    "targetMuscle": "Deltoids",
    "primaryMuscleSlug": "anterior-deltoid",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dumbbell Front Raise targeting Shoulders."
  },
  {
    "id": "ex_cable_front_raise",
    "name": "Cable Front Raise",
    "category": "Strength Training",
    "movementPattern": "compound_lift",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Shoulders",
    "targetMuscle": "Deltoids",
    "primaryMuscleSlug": "anterior-deltoid",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Cable Front Raise targeting Shoulders."
  },
  {
    "id": "ex_reverse_pec_deck",
    "name": "Reverse Pec Deck",
    "category": "Strength Training",
    "movementPattern": "horizontal_abduction",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Shoulders",
    "targetMuscle": "Posterior Deltoid & Infraspinatus",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Reverse Pec Deck targeting Shoulders."
  },
  {
    "id": "ex_bent_over_dumbbell_reverse_fly",
    "name": "Bent-Over Dumbbell Reverse Fly",
    "category": "Strength Training",
    "movementPattern": "horizontal_abduction",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Shoulders",
    "targetMuscle": "Posterior Deltoid & Infraspinatus",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Bent-Over Dumbbell Reverse Fly targeting Shoulders."
  },
  {
    "id": "ex_cable_reverse_fly",
    "name": "Cable Reverse Fly",
    "category": "Strength Training",
    "movementPattern": "horizontal_abduction",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Shoulders",
    "targetMuscle": "Posterior Deltoid & Infraspinatus",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Cable Reverse Fly targeting Shoulders."
  },
  {
    "id": "ex_face_pull",
    "name": "Face Pull",
    "category": "Strength Training",
    "movementPattern": "horizontal_abduction",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Shoulders",
    "targetMuscle": "Posterior Deltoid & Infraspinatus",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Face Pull targeting Shoulders."
  },
  {
    "id": "ex_upright_row",
    "name": "Upright Row",
    "category": "Strength Training",
    "movementPattern": "compound_lift",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Shoulders",
    "targetMuscle": "Deltoids",
    "primaryMuscleSlug": "anterior-deltoid",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Upright Row targeting Shoulders."
  },
  {
    "id": "ex_dumbbell_curl",
    "name": "Dumbbell Curl",
    "category": "Strength Training",
    "movementPattern": "elbow_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Biceps",
    "targetMuscle": "Biceps Brachii (Short & Long Heads)",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dumbbell Curl targeting Biceps."
  },
  {
    "id": "ex_alternating_dumbbell_curl",
    "name": "Alternating Dumbbell Curl",
    "category": "Strength Training",
    "movementPattern": "elbow_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Biceps",
    "targetMuscle": "Biceps Brachii (Short & Long Heads)",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Alternating Dumbbell Curl targeting Biceps."
  },
  {
    "id": "ex_hammer_curl",
    "name": "Hammer Curl",
    "category": "Strength Training",
    "movementPattern": "elbow_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Biceps",
    "targetMuscle": "Brachialis & Brachioradialis",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Hammer Curl targeting Biceps."
  },
  {
    "id": "ex_cable_curl",
    "name": "Cable Curl",
    "category": "Strength Training",
    "movementPattern": "elbow_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Biceps",
    "targetMuscle": "Biceps Brachii (Short & Long Heads)",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Cable Curl targeting Biceps."
  },
  {
    "id": "ex_ez_bar_curl",
    "name": "EZ-Bar Curl",
    "category": "Strength Training",
    "movementPattern": "elbow_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Biceps",
    "targetMuscle": "Biceps Brachii (Short & Long Heads)",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "EZ-Bar Curl targeting Biceps."
  },
  {
    "id": "ex_preacher_curl",
    "name": "Preacher Curl",
    "category": "Strength Training",
    "movementPattern": "elbow_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Biceps",
    "targetMuscle": "Biceps Brachii (Short & Long Heads)",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Preacher Curl targeting Biceps."
  },
  {
    "id": "ex_machine_preacher_curl",
    "name": "Machine Preacher Curl",
    "category": "Strength Training",
    "movementPattern": "elbow_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Biceps",
    "targetMuscle": "Biceps Brachii (Short & Long Heads)",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Machine Preacher Curl targeting Biceps."
  },
  {
    "id": "ex_incline_dumbbell_curl",
    "name": "Incline Dumbbell Curl",
    "category": "Strength Training",
    "movementPattern": "elbow_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Biceps",
    "targetMuscle": "Biceps Brachii (Short & Long Heads)",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Incline Dumbbell Curl targeting Biceps."
  },
  {
    "id": "ex_concentration_curl",
    "name": "Concentration Curl",
    "category": "Strength Training",
    "movementPattern": "elbow_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Biceps",
    "targetMuscle": "Biceps Brachii (Short & Long Heads)",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Concentration Curl targeting Biceps."
  },
  {
    "id": "ex_bayesian_cable_curl",
    "name": "Bayesian Cable Curl",
    "category": "Strength Training",
    "movementPattern": "elbow_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Biceps",
    "targetMuscle": "Biceps Brachii (Short & Long Heads)",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Bayesian Cable Curl targeting Biceps."
  },
  {
    "id": "ex_spider_curl",
    "name": "Spider Curl",
    "category": "Strength Training",
    "movementPattern": "elbow_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Biceps",
    "targetMuscle": "Biceps Brachii (Short & Long Heads)",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Spider Curl targeting Biceps."
  },
  {
    "id": "ex_reverse_curl",
    "name": "Reverse Curl",
    "category": "Strength Training",
    "movementPattern": "elbow_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Biceps",
    "targetMuscle": "Brachialis & Brachioradialis",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Reverse Curl targeting Biceps."
  },
  {
    "id": "ex_cross_body_hammer_curl",
    "name": "Cross-Body Hammer Curl",
    "category": "Strength Training",
    "movementPattern": "elbow_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Biceps",
    "targetMuscle": "Brachialis & Brachioradialis",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Cross-Body Hammer Curl targeting Biceps."
  },
  {
    "id": "ex_rope_triceps_pushdown",
    "name": "Rope Triceps Pushdown",
    "category": "Strength Training",
    "movementPattern": "elbow_extension",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Triceps",
    "targetMuscle": "Triceps Lateral & Medial Heads",
    "primaryMuscleSlug": "triceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Rope Triceps Pushdown targeting Triceps."
  },
  {
    "id": "ex_straight_bar_triceps_pushdown",
    "name": "Straight-Bar Triceps Pushdown",
    "category": "Strength Training",
    "movementPattern": "elbow_extension",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Triceps",
    "targetMuscle": "Triceps Lateral & Medial Heads",
    "primaryMuscleSlug": "triceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Straight-Bar Triceps Pushdown targeting Triceps."
  },
  {
    "id": "ex_overhead_cable_triceps_extension",
    "name": "Overhead Cable Triceps Extension",
    "category": "Strength Training",
    "movementPattern": "elbow_extension",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Triceps",
    "targetMuscle": "Triceps Long Head",
    "primaryMuscleSlug": "triceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Overhead Cable Triceps Extension targeting Triceps."
  },
  {
    "id": "ex_dumbbell_overhead_triceps_extension",
    "name": "Dumbbell Overhead Triceps Extension",
    "category": "Strength Training",
    "movementPattern": "elbow_extension",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Triceps",
    "targetMuscle": "Triceps Long Head",
    "primaryMuscleSlug": "triceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dumbbell Overhead Triceps Extension targeting Triceps."
  },
  {
    "id": "ex_ez_bar_skull_crusher",
    "name": "EZ-Bar Skull Crusher",
    "category": "Strength Training",
    "movementPattern": "elbow_extension",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Triceps",
    "targetMuscle": "Triceps Long Head",
    "primaryMuscleSlug": "triceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "EZ-Bar Skull Crusher targeting Triceps."
  },
  {
    "id": "ex_dumbbell_skull_crusher",
    "name": "Dumbbell Skull Crusher",
    "category": "Strength Training",
    "movementPattern": "elbow_extension",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Triceps",
    "targetMuscle": "Triceps Long Head",
    "primaryMuscleSlug": "triceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dumbbell Skull Crusher targeting Triceps."
  },
  {
    "id": "ex_close_grip_bench_press",
    "name": "Close-Grip Bench Press",
    "category": "Strength Training",
    "movementPattern": "vertical_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Triceps",
    "targetMuscle": "Triceps Lateral & Medial Heads",
    "primaryMuscleSlug": "triceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Close-Grip Bench Press targeting Triceps."
  },
  {
    "id": "ex_triceps_dip",
    "name": "Triceps Dip",
    "category": "Strength Training",
    "movementPattern": "vertical_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Triceps",
    "targetMuscle": "Triceps Lateral & Medial Heads",
    "primaryMuscleSlug": "triceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Triceps Dip targeting Triceps."
  },
  {
    "id": "ex_assisted_dip",
    "name": "Assisted Dip",
    "category": "Strength Training",
    "movementPattern": "vertical_push",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Triceps",
    "targetMuscle": "Triceps Lateral & Medial Heads",
    "primaryMuscleSlug": "triceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Assisted Dip targeting Triceps."
  },
  {
    "id": "ex_cable_triceps_kickback",
    "name": "Cable Triceps Kickback",
    "category": "Strength Training",
    "movementPattern": "elbow_extension",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Triceps",
    "targetMuscle": "Triceps Lateral & Medial Heads",
    "primaryMuscleSlug": "triceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Cable Triceps Kickback targeting Triceps."
  },
  {
    "id": "ex_dumbbell_triceps_kickback",
    "name": "Dumbbell Triceps Kickback",
    "category": "Strength Training",
    "movementPattern": "elbow_extension",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Triceps",
    "targetMuscle": "Triceps Lateral & Medial Heads",
    "primaryMuscleSlug": "triceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dumbbell Triceps Kickback targeting Triceps."
  },
  {
    "id": "ex_single_arm_cable_pushdown",
    "name": "Single-Arm Cable Pushdown",
    "category": "Strength Training",
    "movementPattern": "elbow_extension",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Triceps",
    "targetMuscle": "Triceps Lateral & Medial Heads",
    "primaryMuscleSlug": "triceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Single-Arm Cable Pushdown targeting Triceps."
  },
  {
    "id": "ex_front_squat",
    "name": "Front Squat",
    "category": "Strength Training",
    "movementPattern": "squat",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Quadriceps",
    "targetMuscle": "Rectus Femoris & Vastus Lateralis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Front Squat targeting Quadriceps."
  },
  {
    "id": "ex_goblet_squat",
    "name": "Goblet Squat",
    "category": "Strength Training",
    "movementPattern": "squat",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Quadriceps",
    "targetMuscle": "Rectus Femoris & Vastus Lateralis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Goblet Squat targeting Quadriceps."
  },
  {
    "id": "ex_smith_machine_squat",
    "name": "Smith Machine Squat",
    "category": "Strength Training",
    "movementPattern": "squat",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Quadriceps",
    "targetMuscle": "Rectus Femoris & Vastus Lateralis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Smith Machine Squat targeting Quadriceps."
  },
  {
    "id": "ex_hack_squat",
    "name": "Hack Squat",
    "category": "Strength Training",
    "movementPattern": "squat",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Quadriceps",
    "targetMuscle": "Rectus Femoris & Vastus Lateralis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Hack Squat targeting Quadriceps."
  },
  {
    "id": "ex_leg_press",
    "name": "Leg Press",
    "category": "Strength Training",
    "movementPattern": "squat",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Quadriceps",
    "targetMuscle": "Rectus Femoris & Vastus Lateralis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Leg Press targeting Quadriceps."
  },
  {
    "id": "ex_horizontal_leg_press",
    "name": "Horizontal Leg Press",
    "category": "Strength Training",
    "movementPattern": "squat",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Quadriceps",
    "targetMuscle": "Rectus Femoris & Vastus Lateralis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Horizontal Leg Press targeting Quadriceps."
  },
  {
    "id": "ex_leg_extension",
    "name": "Leg Extension",
    "category": "Strength Training",
    "movementPattern": "knee_extension",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Quadriceps",
    "targetMuscle": "Quadriceps Isolation",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Leg Extension targeting Quadriceps."
  },
  {
    "id": "ex_bulgarian_split_squat",
    "name": "Bulgarian Split Squat",
    "category": "Strength Training",
    "movementPattern": "squat",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Quadriceps",
    "targetMuscle": "Rectus Femoris & Vastus Lateralis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Bulgarian Split Squat targeting Quadriceps."
  },
  {
    "id": "ex_dumbbell_split_squat",
    "name": "Dumbbell Split Squat",
    "category": "Strength Training",
    "movementPattern": "squat",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Quadriceps",
    "targetMuscle": "Rectus Femoris & Vastus Lateralis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dumbbell Split Squat targeting Quadriceps."
  },
  {
    "id": "ex_barbell_split_squat",
    "name": "Barbell Split Squat",
    "category": "Strength Training",
    "movementPattern": "squat",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Quadriceps",
    "targetMuscle": "Rectus Femoris & Vastus Lateralis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Barbell Split Squat targeting Quadriceps."
  },
  {
    "id": "ex_walking_lunge",
    "name": "Walking Lunge",
    "category": "Strength Training",
    "movementPattern": "squat",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Quadriceps",
    "targetMuscle": "Rectus Femoris & Vastus Lateralis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Walking Lunge targeting Quadriceps."
  },
  {
    "id": "ex_reverse_lunge",
    "name": "Reverse Lunge",
    "category": "Strength Training",
    "movementPattern": "squat",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Quadriceps",
    "targetMuscle": "Rectus Femoris & Vastus Lateralis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Reverse Lunge targeting Quadriceps."
  },
  {
    "id": "ex_forward_lunge",
    "name": "Forward Lunge",
    "category": "Strength Training",
    "movementPattern": "squat",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Quadriceps",
    "targetMuscle": "Rectus Femoris & Vastus Lateralis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Forward Lunge targeting Quadriceps."
  },
  {
    "id": "ex_step_up",
    "name": "Step-Up",
    "category": "Strength Training",
    "movementPattern": "compound_lift",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Quadriceps",
    "targetMuscle": "Quadriceps",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Step-Up targeting Quadriceps."
  },
  {
    "id": "ex_sissy_squat",
    "name": "Sissy Squat",
    "category": "Strength Training",
    "movementPattern": "squat",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Quadriceps",
    "targetMuscle": "Rectus Femoris & Vastus Lateralis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Sissy Squat targeting Quadriceps."
  },
  {
    "id": "ex_belt_squat",
    "name": "Belt Squat",
    "category": "Strength Training",
    "movementPattern": "squat",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Quadriceps",
    "targetMuscle": "Rectus Femoris & Vastus Lateralis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Belt Squat targeting Quadriceps."
  },
  {
    "id": "ex_romanian_deadlift",
    "name": "Romanian Deadlift",
    "category": "Strength Training",
    "movementPattern": "hip_hinge",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Hamstrings",
    "targetMuscle": "Biceps Femoris & Glute-Ham Hinge",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Romanian Deadlift targeting Hamstrings."
  },
  {
    "id": "ex_dumbbell_romanian_deadlift",
    "name": "Dumbbell Romanian Deadlift",
    "category": "Strength Training",
    "movementPattern": "hip_hinge",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Hamstrings",
    "targetMuscle": "Biceps Femoris & Glute-Ham Hinge",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dumbbell Romanian Deadlift targeting Hamstrings."
  },
  {
    "id": "ex_stiff_leg_deadlift",
    "name": "Stiff-Leg Deadlift",
    "category": "Strength Training",
    "movementPattern": "hip_hinge",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Hamstrings",
    "targetMuscle": "Biceps Femoris & Glute-Ham Hinge",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Stiff-Leg Deadlift targeting Hamstrings."
  },
  {
    "id": "ex_seated_leg_curl",
    "name": "Seated Leg Curl",
    "category": "Strength Training",
    "movementPattern": "knee_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Hamstrings",
    "targetMuscle": "Hamstrings Isolation",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Seated Leg Curl targeting Hamstrings."
  },
  {
    "id": "ex_lying_leg_curl",
    "name": "Lying Leg Curl",
    "category": "Strength Training",
    "movementPattern": "knee_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Hamstrings",
    "targetMuscle": "Hamstrings Isolation",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Lying Leg Curl targeting Hamstrings."
  },
  {
    "id": "ex_standing_leg_curl",
    "name": "Standing Leg Curl",
    "category": "Strength Training",
    "movementPattern": "knee_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Hamstrings",
    "targetMuscle": "Hamstrings Isolation",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Standing Leg Curl targeting Hamstrings."
  },
  {
    "id": "ex_nordic_hamstring_curl",
    "name": "Nordic Hamstring Curl",
    "category": "Strength Training",
    "movementPattern": "knee_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Hamstrings",
    "targetMuscle": "Hamstrings Isolation",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Nordic Hamstring Curl targeting Hamstrings."
  },
  {
    "id": "ex_good_morning",
    "name": "Good Morning",
    "category": "Strength Training",
    "movementPattern": "hip_hinge",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Hamstrings",
    "targetMuscle": "Biceps Femoris & Glute-Ham Hinge",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Good Morning targeting Hamstrings."
  },
  {
    "id": "ex_cable_pull_through",
    "name": "Cable Pull-Through",
    "category": "Strength Training",
    "movementPattern": "hip_hinge",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Hamstrings",
    "targetMuscle": "Biceps Femoris & Glute-Ham Hinge",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Cable Pull-Through targeting Hamstrings."
  },
  {
    "id": "ex_glute_ham_raise",
    "name": "Glute-Ham Raise",
    "category": "Strength Training",
    "movementPattern": "knee_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Hamstrings",
    "targetMuscle": "Hamstrings Isolation",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Glute-Ham Raise targeting Hamstrings."
  },
  {
    "id": "ex_barbell_hip_thrust",
    "name": "Barbell Hip Thrust",
    "category": "Strength Training",
    "movementPattern": "hip_extension",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Glutes",
    "targetMuscle": "Gluteus Maximus",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Barbell Hip Thrust targeting Glutes."
  },
  {
    "id": "ex_dumbbell_hip_thrust",
    "name": "Dumbbell Hip Thrust",
    "category": "Strength Training",
    "movementPattern": "hip_extension",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Glutes",
    "targetMuscle": "Gluteus Maximus",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dumbbell Hip Thrust targeting Glutes."
  },
  {
    "id": "ex_machine_hip_thrust",
    "name": "Machine Hip Thrust",
    "category": "Strength Training",
    "movementPattern": "hip_extension",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Glutes",
    "targetMuscle": "Gluteus Maximus",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Machine Hip Thrust targeting Glutes."
  },
  {
    "id": "ex_glute_bridge",
    "name": "Glute Bridge",
    "category": "Strength Training",
    "movementPattern": "hip_extension",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Glutes",
    "targetMuscle": "Gluteus Maximus",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Glute Bridge targeting Glutes."
  },
  {
    "id": "ex_single_leg_glute_bridge",
    "name": "Single-Leg Glute Bridge",
    "category": "Strength Training",
    "movementPattern": "hip_extension",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Glutes",
    "targetMuscle": "Gluteus Maximus",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Single-Leg Glute Bridge targeting Glutes."
  },
  {
    "id": "ex_cable_glute_kickback",
    "name": "Cable Glute Kickback",
    "category": "Strength Training",
    "movementPattern": "hip_extension",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Glutes",
    "targetMuscle": "Gluteus Maximus",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Cable Glute Kickback targeting Glutes."
  },
  {
    "id": "ex_machine_glute_kickback",
    "name": "Machine Glute Kickback",
    "category": "Strength Training",
    "movementPattern": "hip_extension",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Glutes",
    "targetMuscle": "Gluteus Maximus",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Machine Glute Kickback targeting Glutes."
  },
  {
    "id": "ex_cable_hip_abduction",
    "name": "Cable Hip Abduction",
    "category": "Strength Training",
    "movementPattern": "hip_abduction",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Glutes",
    "targetMuscle": "Gluteus Medius & Minimus",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Cable Hip Abduction targeting Glutes."
  },
  {
    "id": "ex_hip_abduction_machine",
    "name": "Hip Abduction Machine",
    "category": "Strength Training",
    "movementPattern": "hip_abduction",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Glutes",
    "targetMuscle": "Gluteus Medius & Minimus",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Hip Abduction Machine targeting Glutes."
  },
  {
    "id": "ex_curtsy_lunge",
    "name": "Curtsy Lunge",
    "category": "Strength Training",
    "movementPattern": "hip_hinge",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Glutes",
    "targetMuscle": "Gluteal Complex",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Curtsy Lunge targeting Glutes."
  },
  {
    "id": "ex_sumo_squat",
    "name": "Sumo Squat",
    "category": "Strength Training",
    "movementPattern": "hip_hinge",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Glutes",
    "targetMuscle": "Gluteal Complex",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Sumo Squat targeting Glutes."
  },
  {
    "id": "ex_sumo_deadlift",
    "name": "Sumo Deadlift",
    "category": "Strength Training",
    "movementPattern": "hip_hinge",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Glutes",
    "targetMuscle": "Gluteal Complex",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Sumo Deadlift targeting Glutes."
  },
  {
    "id": "ex_standing_calf_raise",
    "name": "Standing Calf Raise",
    "category": "Strength Training",
    "movementPattern": "plantar_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Calves",
    "targetMuscle": "Gastrocnemius",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Standing Calf Raise targeting Calves."
  },
  {
    "id": "ex_seated_calf_raise",
    "name": "Seated Calf Raise",
    "category": "Strength Training",
    "movementPattern": "plantar_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Calves",
    "targetMuscle": "Soleus",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Seated Calf Raise targeting Calves."
  },
  {
    "id": "ex_leg_press_calf_raise",
    "name": "Leg Press Calf Raise",
    "category": "Strength Training",
    "movementPattern": "plantar_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Calves",
    "targetMuscle": "Gastrocnemius",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Leg Press Calf Raise targeting Calves."
  },
  {
    "id": "ex_smith_machine_calf_raise",
    "name": "Smith Machine Calf Raise",
    "category": "Strength Training",
    "movementPattern": "plantar_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Calves",
    "targetMuscle": "Gastrocnemius",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Smith Machine Calf Raise targeting Calves."
  },
  {
    "id": "ex_donkey_calf_raise",
    "name": "Donkey Calf Raise",
    "category": "Strength Training",
    "movementPattern": "plantar_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Calves",
    "targetMuscle": "Gastrocnemius",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Donkey Calf Raise targeting Calves."
  },
  {
    "id": "ex_single_leg_calf_raise",
    "name": "Single-Leg Calf Raise",
    "category": "Strength Training",
    "movementPattern": "plantar_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Calves",
    "targetMuscle": "Gastrocnemius",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Single-Leg Calf Raise targeting Calves."
  },
  {
    "id": "ex_tibialis_raise",
    "name": "Tibialis Raise",
    "category": "Strength Training",
    "movementPattern": "dorsiflexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Calves",
    "targetMuscle": "Tibialis Anterior",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Tibialis Raise targeting Calves."
  },
  {
    "id": "ex_plank",
    "name": "Plank",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Internal & External Obliques, Transverse Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Plank targeting Core."
  },
  {
    "id": "ex_side_plank",
    "name": "Side Plank",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Internal & External Obliques, Transverse Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Side Plank targeting Core."
  },
  {
    "id": "ex_weighted_plank",
    "name": "Weighted Plank",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Internal & External Obliques, Transverse Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Weighted Plank targeting Core."
  },
  {
    "id": "ex_dead_bug",
    "name": "Dead Bug",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Rectus Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dead Bug targeting Core."
  },
  {
    "id": "ex_bird_dog",
    "name": "Bird Dog",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Rectus Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Bird Dog targeting Core."
  },
  {
    "id": "ex_crunch",
    "name": "Crunch",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Rectus Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Crunch targeting Core."
  },
  {
    "id": "ex_cable_crunch",
    "name": "Cable Crunch",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Rectus Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Cable Crunch targeting Core."
  },
  {
    "id": "ex_machine_crunch",
    "name": "Machine Crunch",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Rectus Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Machine Crunch targeting Core."
  },
  {
    "id": "ex_reverse_crunch",
    "name": "Reverse Crunch",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Rectus Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Reverse Crunch targeting Core."
  },
  {
    "id": "ex_bicycle_crunch",
    "name": "Bicycle Crunch",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Rectus Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Bicycle Crunch targeting Core."
  },
  {
    "id": "ex_hanging_knee_raise",
    "name": "Hanging Knee Raise",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Rectus Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Hanging Knee Raise targeting Core."
  },
  {
    "id": "ex_hanging_leg_raise",
    "name": "Hanging Leg Raise",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Rectus Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Hanging Leg Raise targeting Core."
  },
  {
    "id": "ex_captains_chair_knee_raise",
    "name": "Captain\u2019s Chair Knee Raise",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Rectus Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Captain\u2019s Chair Knee Raise targeting Core."
  },
  {
    "id": "ex_ab_wheel_rollout",
    "name": "Ab Wheel Rollout",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Rectus Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Ab Wheel Rollout targeting Core."
  },
  {
    "id": "ex_pallof_press",
    "name": "Pallof Press",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Internal & External Obliques, Transverse Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Pallof Press targeting Core."
  },
  {
    "id": "ex_cable_wood_chop",
    "name": "Cable Wood Chop",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Internal & External Obliques, Transverse Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Cable Wood Chop targeting Core."
  },
  {
    "id": "ex_russian_twist",
    "name": "Russian Twist",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Internal & External Obliques, Transverse Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Russian Twist targeting Core."
  },
  {
    "id": "ex_decline_sit_up",
    "name": "Decline Sit-Up",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Rectus Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Decline Sit-Up targeting Core."
  },
  {
    "id": "ex_v_up",
    "name": "V-Up",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Rectus Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "V-Up targeting Core."
  },
  {
    "id": "ex_hollow_body_hold",
    "name": "Hollow Body Hold",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Rectus Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Hollow Body Hold targeting Core."
  },
  {
    "id": "ex_mountain_climber",
    "name": "Mountain Climber",
    "category": "Strength Training",
    "movementPattern": "trunk_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Core",
    "targetMuscle": "Rectus Abdominis",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Mountain Climber targeting Core."
  },
  {
    "id": "ex_back_extension",
    "name": "Back Extension",
    "category": "Strength Training",
    "movementPattern": "spinal_extension",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Lower Back / Posterior Chain",
    "targetMuscle": "Erector Spinae & Multifidus",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Back Extension targeting Lower Back / Posterior Chain."
  },
  {
    "id": "ex_45_degree_back_extension",
    "name": "45-Degree Back Extension",
    "category": "Strength Training",
    "movementPattern": "spinal_extension",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Lower Back / Posterior Chain",
    "targetMuscle": "Erector Spinae & Multifidus",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "45-Degree Back Extension targeting Lower Back / Posterior Chain."
  },
  {
    "id": "ex_reverse_hyperextension",
    "name": "Reverse Hyperextension",
    "category": "Strength Training",
    "movementPattern": "spinal_extension",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Lower Back / Posterior Chain",
    "targetMuscle": "Erector Spinae & Multifidus",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Reverse Hyperextension targeting Lower Back / Posterior Chain."
  },
  {
    "id": "ex_superman",
    "name": "Superman",
    "category": "Strength Training",
    "movementPattern": "spinal_extension",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Lower Back / Posterior Chain",
    "targetMuscle": "Erector Spinae & Multifidus",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Superman targeting Lower Back / Posterior Chain."
  },
  {
    "id": "ex_rack_pull",
    "name": "Rack Pull",
    "category": "Strength Training",
    "movementPattern": "spinal_extension",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Lower Back / Posterior Chain",
    "targetMuscle": "Erector Spinae & Multifidus",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Rack Pull targeting Lower Back / Posterior Chain."
  },
  {
    "id": "ex_barbell_wrist_curl",
    "name": "Barbell Wrist Curl",
    "category": "Strength Training",
    "movementPattern": "wrist_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Forearms / Grip",
    "targetMuscle": "Forearm Flexors, Extensors & Brachioradialis",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Barbell Wrist Curl targeting Forearms / Grip."
  },
  {
    "id": "ex_dumbbell_wrist_curl",
    "name": "Dumbbell Wrist Curl",
    "category": "Strength Training",
    "movementPattern": "wrist_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Forearms / Grip",
    "targetMuscle": "Forearm Flexors, Extensors & Brachioradialis",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dumbbell Wrist Curl targeting Forearms / Grip."
  },
  {
    "id": "ex_reverse_wrist_curl",
    "name": "Reverse Wrist Curl",
    "category": "Strength Training",
    "movementPattern": "wrist_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Forearms / Grip",
    "targetMuscle": "Forearm Flexors, Extensors & Brachioradialis",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Reverse Wrist Curl targeting Forearms / Grip."
  },
  {
    "id": "ex_wrist_roller",
    "name": "Wrist Roller",
    "category": "Strength Training",
    "movementPattern": "wrist_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Forearms / Grip",
    "targetMuscle": "Forearm Flexors, Extensors & Brachioradialis",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Wrist Roller targeting Forearms / Grip."
  },
  {
    "id": "ex_farmers_walk",
    "name": "Farmer\u2019s Walk",
    "category": "Strength Training",
    "movementPattern": "wrist_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Forearms / Grip",
    "targetMuscle": "Forearm Flexors, Extensors & Brachioradialis",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Farmer\u2019s Walk targeting Forearms / Grip."
  },
  {
    "id": "ex_dead_hang",
    "name": "Dead Hang",
    "category": "Strength Training",
    "movementPattern": "wrist_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Forearms / Grip",
    "targetMuscle": "Forearm Flexors, Extensors & Brachioradialis",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dead Hang targeting Forearms / Grip."
  },
  {
    "id": "ex_plate_pinch",
    "name": "Plate Pinch",
    "category": "Strength Training",
    "movementPattern": "wrist_flexion",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Forearms / Grip",
    "targetMuscle": "Forearm Flexors, Extensors & Brachioradialis",
    "primaryMuscleSlug": "biceps",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Plate Pinch targeting Forearms / Grip."
  },
  {
    "id": "ex_hip_adduction_machine",
    "name": "Hip Adduction Machine",
    "category": "Strength Training",
    "movementPattern": "hip_adduction",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Adductors / Abductors",
    "targetMuscle": "Adductor Longus, Magnus & Gracilis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Hip Adduction Machine targeting Adductors / Abductors."
  },
  {
    "id": "ex_hip_abduction_machine_160",
    "name": "Hip Abduction Machine",
    "category": "Strength Training",
    "movementPattern": "hip_adduction",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Adductors / Abductors",
    "targetMuscle": "Adductor Longus, Magnus & Gracilis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Hip Abduction Machine targeting Adductors / Abductors."
  },
  {
    "id": "ex_cable_hip_adduction",
    "name": "Cable Hip Adduction",
    "category": "Strength Training",
    "movementPattern": "hip_adduction",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Adductors / Abductors",
    "targetMuscle": "Adductor Longus, Magnus & Gracilis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Cable Hip Adduction targeting Adductors / Abductors."
  },
  {
    "id": "ex_cable_hip_abduction_162",
    "name": "Cable Hip Abduction",
    "category": "Strength Training",
    "movementPattern": "hip_adduction",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Adductors / Abductors",
    "targetMuscle": "Adductor Longus, Magnus & Gracilis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Cable Hip Abduction targeting Adductors / Abductors."
  },
  {
    "id": "ex_copenhagen_plank",
    "name": "Copenhagen Plank",
    "category": "Strength Training",
    "movementPattern": "hip_adduction",
    "difficulty": "intermediate",
    "type": "isolation",
    "muscleGroup": "Adductors / Abductors",
    "targetMuscle": "Adductor Longus, Magnus & Gracilis",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Copenhagen Plank targeting Adductors / Abductors."
  },
  {
    "id": "ex_power_clean",
    "name": "Power Clean",
    "category": "Strength Training",
    "movementPattern": "explosive_power",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Full Body / Olympic / Power",
    "targetMuscle": "Full Body Power & Central Nervous System",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Power Clean targeting Full Body / Olympic / Power."
  },
  {
    "id": "ex_hang_clean",
    "name": "Hang Clean",
    "category": "Strength Training",
    "movementPattern": "explosive_power",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Full Body / Olympic / Power",
    "targetMuscle": "Full Body Power & Central Nervous System",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Hang Clean targeting Full Body / Olympic / Power."
  },
  {
    "id": "ex_clean_and_press",
    "name": "Clean and Press",
    "category": "Strength Training",
    "movementPattern": "explosive_power",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Full Body / Olympic / Power",
    "targetMuscle": "Full Body Power & Central Nervous System",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Clean and Press targeting Full Body / Olympic / Power."
  },
  {
    "id": "ex_push_press",
    "name": "Push Press",
    "category": "Strength Training",
    "movementPattern": "explosive_power",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Full Body / Olympic / Power",
    "targetMuscle": "Full Body Power & Central Nervous System",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Push Press targeting Full Body / Olympic / Power."
  },
  {
    "id": "ex_thruster",
    "name": "Thruster",
    "category": "Strength Training",
    "movementPattern": "explosive_power",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Full Body / Olympic / Power",
    "targetMuscle": "Full Body Power & Central Nervous System",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Thruster targeting Full Body / Olympic / Power."
  },
  {
    "id": "ex_kettlebell_swing",
    "name": "Kettlebell Swing",
    "category": "Strength Training",
    "movementPattern": "explosive_power",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Full Body / Olympic / Power",
    "targetMuscle": "Full Body Power & Central Nervous System",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Kettlebell Swing targeting Full Body / Olympic / Power."
  },
  {
    "id": "ex_dumbbell_thruster",
    "name": "Dumbbell Thruster",
    "category": "Strength Training",
    "movementPattern": "explosive_power",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Full Body / Olympic / Power",
    "targetMuscle": "Full Body Power & Central Nervous System",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dumbbell Thruster targeting Full Body / Olympic / Power."
  },
  {
    "id": "ex_farmers_walk_171",
    "name": "Farmer\u2019s Walk",
    "category": "Strength Training",
    "movementPattern": "explosive_power",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Full Body / Olympic / Power",
    "targetMuscle": "Full Body Power & Central Nervous System",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Farmer\u2019s Walk targeting Full Body / Olympic / Power."
  },
  {
    "id": "ex_sled_push",
    "name": "Sled Push",
    "category": "Strength Training",
    "movementPattern": "explosive_power",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Full Body / Olympic / Power",
    "targetMuscle": "Full Body Power & Central Nervous System",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Sled Push targeting Full Body / Olympic / Power."
  },
  {
    "id": "ex_sled_pull",
    "name": "Sled Pull",
    "category": "Strength Training",
    "movementPattern": "explosive_power",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Full Body / Olympic / Power",
    "targetMuscle": "Full Body Power & Central Nervous System",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Sled Pull targeting Full Body / Olympic / Power."
  },
  {
    "id": "ex_battle_rope",
    "name": "Battle Rope",
    "category": "Strength Training",
    "movementPattern": "explosive_power",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Full Body / Olympic / Power",
    "targetMuscle": "Full Body Power & Central Nervous System",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Battle Rope targeting Full Body / Olympic / Power."
  },
  {
    "id": "ex_medicine_ball_slam",
    "name": "Medicine Ball Slam",
    "category": "Strength Training",
    "movementPattern": "explosive_power",
    "difficulty": "intermediate",
    "type": "compound",
    "muscleGroup": "Full Body / Olympic / Power",
    "targetMuscle": "Full Body Power & Central Nervous System",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Medicine Ball Slam targeting Full Body / Olympic / Power."
  },
  {
    "id": "ex_treadmill_running",
    "name": "Treadmill Running",
    "category": "Cardio",
    "movementPattern": "cardio_running",
    "difficulty": "beginner",
    "type": "cardio",
    "muscleGroup": "Cardio / Heart",
    "targetMuscle": "Cardiovascular System & Quads",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Continuous aerobic running for stamina."
  },
  {
    "id": "ex_outdoor_cycling",
    "name": "Outdoor Cycling",
    "category": "Cardio",
    "movementPattern": "cardio_cycling",
    "difficulty": "beginner",
    "type": "cardio",
    "muscleGroup": "Cardio / Heart",
    "targetMuscle": "Quadriceps & Cardiovascular System",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Low-impact leg conditioning and aerobic capacity."
  },
  {
    "id": "ex_rowing_machine",
    "name": "Rowing Machine",
    "category": "Cardio",
    "movementPattern": "cardio_rowing",
    "difficulty": "intermediate",
    "type": "cardio",
    "muscleGroup": "Cardio / Full Body",
    "targetMuscle": "Latissimus Dorsi & Lower Body Stamina",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Full body ergometer cardio endurance."
  },
  {
    "id": "ex_stair_climber",
    "name": "Stair Climber",
    "category": "Cardio",
    "movementPattern": "cardio_climbing",
    "difficulty": "intermediate",
    "type": "cardio",
    "muscleGroup": "Cardio / Legs",
    "targetMuscle": "Glutes, Quads & Heart",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "High-intensity stair climbing."
  },
  {
    "id": "ex_football",
    "name": "Football (Soccer)",
    "category": "Team Sports",
    "movementPattern": "team_sport",
    "difficulty": "intermediate",
    "type": "sport",
    "muscleGroup": "Team Sports",
    "targetMuscle": "Full Body Agility & Legs",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Dynamic team sport sprint endurance."
  },
  {
    "id": "ex_basketball",
    "name": "Basketball",
    "category": "Team Sports",
    "movementPattern": "team_sport",
    "difficulty": "intermediate",
    "type": "sport",
    "muscleGroup": "Team Sports",
    "targetMuscle": "Lower Body Power & Agility",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "High-tempo vertical jumping & court play."
  },
  {
    "id": "ex_volleyball",
    "name": "Volleyball",
    "category": "Team Sports",
    "movementPattern": "team_sport",
    "difficulty": "intermediate",
    "type": "sport",
    "muscleGroup": "Team Sports",
    "targetMuscle": "Shoulders, Core & Legs",
    "primaryMuscleSlug": "anterior-deltoid",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Jumping, spiking & team coordination."
  },
  {
    "id": "ex_tennis",
    "name": "Tennis",
    "category": "Individual Sports",
    "movementPattern": "racket_sport",
    "difficulty": "intermediate",
    "type": "sport",
    "muscleGroup": "Individual Sports",
    "targetMuscle": "Shoulder Rotators & Footwork",
    "primaryMuscleSlug": "anterior-deltoid",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Racket sport for lateral speed & stamina."
  },
  {
    "id": "ex_badminton",
    "name": "Badminton",
    "category": "Individual Sports",
    "movementPattern": "racket_sport",
    "difficulty": "beginner",
    "type": "sport",
    "muscleGroup": "Individual Sports",
    "targetMuscle": "Wrist Flexors & Lower Body Agility",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Fast-paced agility racket sport."
  },
  {
    "id": "ex_boxing",
    "name": "Boxing / Heavy Bag",
    "category": "Individual Sports",
    "movementPattern": "combat_sport",
    "difficulty": "advanced",
    "type": "sport",
    "muscleGroup": "Individual Sports",
    "targetMuscle": "Shoulders, Pecs & Rotational Obliques",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Combat bag work & punching power."
  },
  {
    "id": "ex_freestyle_swimming",
    "name": "Freestyle Swimming",
    "category": "Swimming / Aquatic",
    "movementPattern": "swimming",
    "difficulty": "intermediate",
    "type": "cardio",
    "muscleGroup": "Swimming / Aquatic",
    "targetMuscle": "Latissimus Dorsi & Core",
    "primaryMuscleSlug": "lats",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Low-impact water cardio endurance."
  },
  {
    "id": "ex_breaststroke",
    "name": "Breaststroke Swimming",
    "category": "Swimming / Aquatic",
    "movementPattern": "swimming",
    "difficulty": "intermediate",
    "type": "cardio",
    "muscleGroup": "Swimming / Aquatic",
    "targetMuscle": "Pectoralis Major & Adductors",
    "primaryMuscleSlug": "mid-chest",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Rhythmic breaststroke swimming."
  },
  {
    "id": "ex_yoga",
    "name": "Vinyasa Yoga Flow",
    "category": "Mobility / Flexibility",
    "movementPattern": "mobility_flow",
    "difficulty": "beginner",
    "type": "recovery",
    "muscleGroup": "Mobility / Flexibility",
    "targetMuscle": "Full Body Spine & Joint Flexibility",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Breath & body mobility postures."
  },
  {
    "id": "ex_stretching",
    "name": "Dynamic Full-Body Stretching",
    "category": "Mobility / Flexibility",
    "movementPattern": "stretching",
    "difficulty": "beginner",
    "type": "recovery",
    "muscleGroup": "Mobility / Flexibility",
    "targetMuscle": "Muscle Tendons & Fascia Mobility",
    "primaryMuscleSlug": "core",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Warm-up & active stretch routines."
  },
  {
    "id": "ex_active_walking",
    "name": "Active Recovery Walking",
    "category": "Recovery",
    "movementPattern": "walking",
    "difficulty": "beginner",
    "type": "recovery",
    "muscleGroup": "Recovery",
    "targetMuscle": "Active Blood Flow & Lower Body",
    "primaryMuscleSlug": "quads",
    "youtubeUrls": [
      "https://www.youtube.com/shorts/8fXfwG4ftaQ"
    ],
    "description": "Gentle active recovery walking."
  }
];

const LOCAL_STORAGE_KEY = 'gympilot_admin_exercises';

export function getAdminExercises(): ExerciseItem[] {
  if (typeof window === 'undefined') return SEEDED_EXERCISES;
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SEEDED_EXERCISES));
      return SEEDED_EXERCISES;
    }
    const parsed: ExerciseItem[] = JSON.parse(data);
    
    // Auto-merge any newly seeded exercises that aren't in localStorage yet
    let updated = [...parsed];
    let hasNew = false;
    for (const seeded of SEEDED_EXERCISES) {
      if (!updated.some((item) => item.id === seeded.id || item.name.toLowerCase() === seeded.name.toLowerCase())) {
        updated.push(seeded);
        hasNew = true;
      }
    }

    if (hasNew) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
    return updated;
  } catch (e) {
    return SEEDED_EXERCISES;
  }
}

export function resetToSeededExercises(): ExerciseItem[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SEEDED_EXERCISES));
  }
  return SEEDED_EXERCISES;
}

export function saveAdminExercise(item: ExerciseItem): ExerciseItem[] {
  const current = getAdminExercises();
  const index = current.findIndex((ex) => ex.id === item.id);

  let updated: ExerciseItem[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = item;
  } else {
    updated = [item, ...current];
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function deleteAdminExercise(id: string): ExerciseItem[] {
  const current = getAdminExercises();
  const updated = current.filter((ex) => ex.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function importAdminExercises(items: ExerciseItem[]): ExerciseItem[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }
  return items;
}
