// ============================================================================
// GymPilot — Nutrition Engine
// Calculates BMR, TDEE, macro split ranges, and daily hydration goals
// ============================================================================

import { NutritionInput, NutritionRecommendation } from '@/types/database';

export function calculateNutritionTargets(input: NutritionInput): NutritionRecommendation {
  const {
    age,
    height_cm,
    weight_kg,
    biological_sex = 'male',
    training_days_per_week = 3,
    goals = ['build-muscle'],
  } = input;

  // 1. Calculate BMR (Mifflin-St Jeor Equation)
  let bmr = 10 * weight_kg + 6.25 * height_cm - 5 * age;
  if (biological_sex === 'female') {
    bmr -= 161;
  } else {
    bmr += 5;
  }

  // 2. TDEE Activity Multiplier based on training frequency
  let activityMultiplier = 1.2; // Sedentary base
  if (training_days_per_week >= 5) {
    activityMultiplier = 1.55; // Very active
  } else if (training_days_per_week >= 3) {
    activityMultiplier = 1.375; // Moderately active
  } else if (training_days_per_week >= 1) {
    activityMultiplier = 1.25;
  }

  const tdee = Math.round(bmr * activityMultiplier);

  // 3. Caloric Adjustment by Primary Goal
  const primaryGoal = goals[0] || 'build-muscle';
  let calorieTargetMin = tdee;
  let calorieTargetMax = tdee;

  switch (primaryGoal) {
    case 'build-muscle':
    case 'bodybuilding':
      calorieTargetMin = Math.round(tdee + 250); // Surplus
      calorieTargetMax = Math.round(tdee + 450);
      break;
    case 'fat-loss':
      calorieTargetMin = Math.round(tdee - 500); // Deficit
      calorieTargetMax = Math.round(tdee - 300);
      break;
    case 'strength':
      calorieTargetMin = Math.round(tdee + 150);
      calorieTargetMax = Math.round(tdee + 300);
      break;
    default:
      calorieTargetMin = Math.round(tdee - 100);
      calorieTargetMax = Math.round(tdee + 100);
  }

  // 4. Protein Recommendation (1.8g - 2.2g per kg for lifting)
  const proteinMinG = Math.round(weight_kg * 1.8);
  const proteinMaxG = Math.round(weight_kg * 2.2);

  // 5. Fat Recommendation (20% - 30% of total calories)
  const fatMinG = Math.round((calorieTargetMin * 0.2) / 9);
  const fatMaxG = Math.round((calorieTargetMax * 0.3) / 9);

  // 6. Carbs Recommendation (Remaining calories)
  const avgCalories = (calorieTargetMin + calorieTargetMax) / 2;
  const avgProteinCal = ((proteinMinG + proteinMaxG) / 2) * 4;
  const avgFatCal = ((fatMinG + fatMaxG) / 2) * 9;
  const remainingCarbCal = Math.max(400, avgCalories - avgProteinCal - avgFatCal);

  const carbsMinG = Math.round((remainingCarbCal * 0.9) / 4);
  const carbsMaxG = Math.round((remainingCarbCal * 1.1) / 4);

  // 7. Water Hydration Target (35ml per kg + 500ml per training hour)
  const waterLiters = Math.round(((weight_kg * 0.035) + 0.5) * 10) / 10;

  return {
    bmr: Math.round(bmr),
    tdee,
    calories: { min: calorieTargetMin, max: calorieTargetMax },
    protein: { min: proteinMinG, max: proteinMaxG },
    fat: { min: fatMinG, max: fatMaxG },
    carbs: { min: carbsMinG, max: carbsMaxG },
    water_liters: waterLiters,
  };
}
