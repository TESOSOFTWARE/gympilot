import { DayOfWeek } from '@/types/database';

export interface SplitWorkoutTemplate {
  name: string;
  focus: string;
  muscleSlug: string;
  label: string;
  exercises: number;
  sets: number;
}

export interface SplitDayInfo {
  dayOfWeek: DayOfWeek;
  shortDay: string;
  dayIndex: number; // 0=Sun, 1=Mon, ..., 6=Sat
  dayNumber: number; // 1=Mon ... 7=Sun
  isTrainingDay: boolean;
  workout: SplitWorkoutTemplate | null;
}

export const ORDERED_DAYS: { slug: DayOfWeek; short: string; dayIndex: number; dayNumber: number }[] = [
  { slug: 'monday', short: 'Mon', dayIndex: 1, dayNumber: 1 },
  { slug: 'tuesday', short: 'Tue', dayIndex: 2, dayNumber: 2 },
  { slug: 'wednesday', short: 'Wed', dayIndex: 3, dayNumber: 3 },
  { slug: 'thursday', short: 'Thu', dayIndex: 4, dayNumber: 4 },
  { slug: 'friday', short: 'Fri', dayIndex: 5, dayNumber: 5 },
  { slug: 'saturday', short: 'Sat', dayIndex: 6, dayNumber: 6 },
  { slug: 'sunday', short: 'Sun', dayIndex: 0, dayNumber: 7 },
];

export const DEFAULT_PREFERRED_DAYS: Record<number, DayOfWeek[]> = {
  1: ['wednesday'],
  2: ['tuesday', 'thursday'],
  3: ['monday', 'wednesday', 'friday'],
  4: ['monday', 'tuesday', 'thursday', 'friday'],
  5: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  6: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  7: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
};

const SPLIT_TEMPLATES: Record<number, SplitWorkoutTemplate[]> = {
  1: [
    { name: 'Full Body Essentials', focus: 'Quads, Chest, Back, Core', muscleSlug: 'quads', label: 'FULL BODY', exercises: 6, sets: 18 },
  ],
  2: [
    { name: 'Upper Body Power', focus: 'Chest, Back, Shoulders, Arms', muscleSlug: 'mid-chest', label: 'UPPER', exercises: 5, sets: 16 },
    { name: 'Lower Body & Core', focus: 'Quads, Hamstrings, Glutes, Abs', muscleSlug: 'quads', label: 'LOWER', exercises: 5, sets: 16 },
  ],
  3: [
    { name: 'Push Day (Chest & Delts)', focus: 'Chest, Shoulders, Triceps', muscleSlug: 'mid-chest', label: 'PUSH', exercises: 5, sets: 16 },
    { name: 'Pull Day (Back & Arms)', focus: 'Lats, Upper Back, Biceps', muscleSlug: 'lat', label: 'PULL', exercises: 5, sets: 16 },
    { name: 'Legs & Core', focus: 'Quads, Hamstrings, Calves, Core', muscleSlug: 'quads', label: 'LEGS', exercises: 5, sets: 16 },
  ],
  4: [
    { name: 'Upper Body A', focus: 'Chest, Shoulders, Triceps', muscleSlug: 'mid-chest', label: 'UPPER A', exercises: 5, sets: 16 },
    { name: 'Lower Body A', focus: 'Quads, Hamstrings, Calves', muscleSlug: 'quads', label: 'LOWER A', exercises: 4, sets: 14 },
    { name: 'Upper Body B', focus: 'Back, Biceps, Rear Delts', muscleSlug: 'lat', label: 'UPPER B', exercises: 5, sets: 16 },
    { name: 'Lower Body B', focus: 'Glutes, Hamstrings, Core', muscleSlug: 'quads', label: 'LOWER B', exercises: 4, sets: 14 },
  ],
  5: [
    { name: 'Push (Chest Emphasis)', focus: 'Chest, Shoulders, Triceps', muscleSlug: 'mid-chest', label: 'PUSH', exercises: 5, sets: 16 },
    { name: 'Pull (Back Emphasis)', focus: 'Lats, Rhomboids, Biceps', muscleSlug: 'lat', label: 'PULL', exercises: 5, sets: 16 },
    { name: 'Legs (Quad Dominant)', focus: 'Quads, Calves, Abs', muscleSlug: 'quads', label: 'LEGS', exercises: 5, sets: 16 },
    { name: 'Upper Body Hypertrophy', focus: 'Chest, Back, Shoulders, Arms', muscleSlug: 'mid-chest', label: 'UPPER', exercises: 5, sets: 15 },
    { name: 'Lower Body & Posterior', focus: 'Hamstrings, Glutes, Core', muscleSlug: 'quads', label: 'POSTERIOR', exercises: 4, sets: 14 },
  ],
  6: [
    { name: 'Push A (Strength)', focus: 'Chest, Front Delts, Triceps', muscleSlug: 'mid-chest', label: 'PUSH A', exercises: 5, sets: 15 },
    { name: 'Pull A (Strength)', focus: 'Lats, Upper Back, Biceps', muscleSlug: 'lat', label: 'PULL A', exercises: 5, sets: 15 },
    { name: 'Legs A (Quad Bias)', focus: 'Quads, Calves, Core', muscleSlug: 'quads', label: 'LEGS A', exercises: 5, sets: 15 },
    { name: 'Push B (Hypertrophy)', focus: 'Upper Chest, Lateral Delts, Triceps', muscleSlug: 'upper-chest', label: 'PUSH B', exercises: 5, sets: 15 },
    { name: 'Pull B (Hypertrophy)', focus: 'Mid Back, Rear Delts, Biceps', muscleSlug: 'lat', label: 'PULL B', exercises: 5, sets: 15 },
    { name: 'Legs B (Hamstring Bias)', focus: 'Hamstrings, Glutes, Core', muscleSlug: 'quads', label: 'LEGS B', exercises: 5, sets: 15 },
  ],
  7: [
    { name: 'Push Power', focus: 'Chest, Shoulders, Triceps', muscleSlug: 'mid-chest', label: 'PUSH', exercises: 5, sets: 15 },
    { name: 'Pull Power', focus: 'Lats, Traps, Biceps', muscleSlug: 'lat', label: 'PULL', exercises: 5, sets: 15 },
    { name: 'Legs Heavy', focus: 'Quads, Glutes, Calves', muscleSlug: 'quads', label: 'LEGS', exercises: 5, sets: 15 },
    { name: 'Push Pump', focus: 'Upper Chest, Deltoids, Arms', muscleSlug: 'mid-chest', label: 'PUSH 2', exercises: 4, sets: 14 },
    { name: 'Pull & Rear Delts', focus: 'Back, Rear Delts, Biceps', muscleSlug: 'lat', label: 'PULL 2', exercises: 4, sets: 14 },
    { name: 'Legs & Core', focus: 'Hamstrings, Glutes, Core', muscleSlug: 'quads', label: 'LEGS 2', exercises: 4, sets: 14 },
    { name: 'Active Recovery & Core', focus: 'Full Body Mobility & Core', muscleSlug: 'core', label: 'MOBILITY', exercises: 3, sets: 9 },
  ],
};

export function getSplitForDays(daysPerWeek: number, preferredDays?: DayOfWeek[]): SplitDayInfo[] {
  const clampedDays = Math.max(1, Math.min(7, Math.round(daysPerWeek || 3)));
  const templates = SPLIT_TEMPLATES[clampedDays] || SPLIT_TEMPLATES[3];

  let activePreferred: DayOfWeek[] = preferredDays && preferredDays.length > 0 
    ? [...preferredDays] 
    : (DEFAULT_PREFERRED_DAYS[clampedDays] || DEFAULT_PREFERRED_DAYS[3]);

  // Adjust activePreferred to match clampedDays length
  if (activePreferred.length > clampedDays) {
    activePreferred = activePreferred.slice(0, clampedDays);
  } else if (activePreferred.length < clampedDays) {
    const defaults = DEFAULT_PREFERRED_DAYS[clampedDays] || [];
    for (const d of defaults) {
      if (!activePreferred.includes(d) && activePreferred.length < clampedDays) {
        activePreferred.push(d);
      }
    }
  }

  let templateIndex = 0;

  return ORDERED_DAYS.map((day) => {
    const isTrainingDay = activePreferred.includes(day.slug);
    let workout: SplitWorkoutTemplate | null = null;

    if (isTrainingDay) {
      workout = templates[templateIndex % templates.length];
      templateIndex++;
    }

    return {
      dayOfWeek: day.slug,
      shortDay: day.short,
      dayIndex: day.dayIndex,
      dayNumber: day.dayNumber,
      isTrainingDay,
      workout,
    };
  });
}

export function getSplitPlanTitle(daysPerWeek: number): string {
  switch (daysPerWeek) {
    case 1:
      return '1-Day Full Body Frequency Routine';
    case 2:
      return '2-Day Upper / Lower Periodization Plan';
    case 3:
      return '3-Day Push / Pull / Legs Hypertrophy Split';
    case 4:
      return '4-Day Upper / Lower Periodization Plan';
    case 5:
      return '5-Day PPLUL Advanced Hypertrophy Split';
    case 6:
      return '6-Day Push / Pull / Legs High-Volume Split';
    case 7:
      return '7-Day High Frequency & Active Recovery Protocol';
    default:
      return `${daysPerWeek}-Day Custom Hypertrophy Split`;
  }
}
