// ============================================================================
// GymPilot — Guest Store (localStorage State Manager)
// Manages guest profile, onboarding choices, current workout, and session tracking
// ============================================================================

import { GuestData, UserProfile, FoodEntry, DailyFoodLog } from '@/types/database';

const GUEST_STORAGE_KEY = 'gympilot_guest_data_v1';
const HISTORY_RECORD_KEY = 'gympilot_workout_history_records_v1';
const FOOD_LOG_STORAGE_KEY = 'gympilot_food_logs_v1';

export interface WorkoutSessionRecord {
  id: string;
  workoutName: string;
  startedAt: string;
  completedAt?: string | null;
  durationMinutes: number;
  totalSetsCompleted: number;
  totalVolumeKg: number;
  caloriesBurned: number;
  exercises: {
    id: string;
    name: string;
    completedSets: {
      setNumber: number;
      weightKg: number;
      reps: number;
      rpe?: number;
    }[];
  }[];
}

export const defaultGuestData: GuestData = {
  profile: {
    name: 'Athlete',
    age: 25,
    biological_sex: 'male',
    height_cm: 175,
    weight_kg: 70,
    measurement_system: 'metric',
    training_level: 'beginner',
    training_days_per_week: 3,
    preferred_days: ['monday', 'wednesday', 'friday'],
    workout_duration_minutes: 60,
    training_location: 'commercial_gym',
    available_equipment: ['barbell', 'dumbbells', 'cable-machine', 'bench', 'pull-up-bar'],
    history_window_days: 7,
  },
  goals: [{ goalSlug: 'build-muscle', isPrimary: true }],
  injuries: [],
  currentPlan: null,
  sessions: [],
  foodLogs: {},
  createdAt: new Date().toISOString(),
};

export function getGuestData(): GuestData {
  if (typeof window === 'undefined') return defaultGuestData;

  try {
    const raw = localStorage.getItem(GUEST_STORAGE_KEY);
    if (!raw) return defaultGuestData;
    const parsed = JSON.parse(raw) as GuestData;
    if (!parsed.foodLogs) {
      parsed.foodLogs = getFoodLogs();
    }
    return parsed;
  } catch (err) {
    console.error('Failed to parse guest data from localStorage', err);
    return defaultGuestData;
  }
}

export function saveGuestData(data: GuestData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save guest data to localStorage', err);
  }
}

export function updateGuestProfile(updates: Partial<UserProfile>): GuestData {
  const current = getGuestData();
  const updated: GuestData = {
    ...current,
    profile: {
      ...current.profile,
      ...updates,
    },
  };
  saveGuestData(updated);
  return updated;
}

export function saveWorkoutRecord(sessionRecord: WorkoutSessionRecord): WorkoutSessionRecord[] {
  if (typeof window === 'undefined') return [];

  try {
    const existing = getWorkoutHistoryRecords();
    const index = existing.findIndex((s) => s.id === sessionRecord.id);

    let updatedHistory: WorkoutSessionRecord[];
    if (index >= 0) {
      updatedHistory = [...existing];
      updatedHistory[index] = sessionRecord;
    } else {
      updatedHistory = [sessionRecord, ...existing];
    }

    localStorage.setItem(HISTORY_RECORD_KEY, JSON.stringify(updatedHistory));

    // Also sync to main guest sessions store
    const guest = getGuestData();
    saveGuestData({
      ...guest,
      sessions: updatedHistory as any,
    });

    return updatedHistory;
  } catch (err) {
    console.error('Failed to save workout record', err);
    return [];
  }
}

export function getWorkoutHistoryRecords(): WorkoutSessionRecord[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(HISTORY_RECORD_KEY);
    if (raw) return JSON.parse(raw) as WorkoutSessionRecord[];
    const guest = getGuestData();
    return (guest.sessions as any) || [];
  } catch (err) {
    console.error('Failed to get workout history records', err);
    return [];
  }
}

// ─── Food Logging Helpers ───────────────────────────────────────────────────

export function getFoodLogs(): Record<string, DailyFoodLog> {
  if (typeof window === 'undefined') return {};

  try {
    const raw = localStorage.getItem(FOOD_LOG_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Record<string, DailyFoodLog>;
    return {};
  } catch (err) {
    console.error('Failed to get food logs from localStorage', err);
    return {};
  }
}

export function saveAllFoodLogs(logs: Record<string, DailyFoodLog>): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(FOOD_LOG_STORAGE_KEY, JSON.stringify(logs));
    const guest = getGuestData();
    saveGuestData({
      ...guest,
      foodLogs: logs,
    });
  } catch (err) {
    console.error('Failed to save food logs to localStorage', err);
  }
}

export function getDailyFoodLog(date: string): DailyFoodLog {
  const all = getFoodLogs();
  if (all[date]) {
    return all[date];
  }

  return {
    date,
    entries: [],
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
  };
}

export function saveFoodEntry(
  date: string,
  entryData: Omit<FoodEntry, 'id' | 'logged_at'>
): DailyFoodLog {
  const all = getFoodLogs();
  const currentDaily = all[date] || {
    date,
    entries: [],
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
  };

  const newEntry: FoodEntry = {
    ...entryData,
    id: `food_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    logged_at: new Date().toISOString(),
  };

  const newEntries = [newEntry, ...currentDaily.entries];
  const updatedDaily: DailyFoodLog = {
    date,
    entries: newEntries,
    totalCalories: Math.round(newEntries.reduce((sum, item) => sum + (Number(item.calories) || 0), 0)),
    totalProtein: Math.round(newEntries.reduce((sum, item) => sum + (Number(item.protein_g) || 0), 0)),
    totalCarbs: Math.round(newEntries.reduce((sum, item) => sum + (Number(item.carbs_g) || 0), 0)),
    totalFat: Math.round(newEntries.reduce((sum, item) => sum + (Number(item.fat_g) || 0), 0)),
  };

  all[date] = updatedDaily;
  saveAllFoodLogs(all);
  return updatedDaily;
}

export function removeFoodEntry(date: string, entryId: string): DailyFoodLog {
  const all = getFoodLogs();
  const currentDaily = all[date] || {
    date,
    entries: [],
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
  };

  const newEntries = currentDaily.entries.filter((e) => e.id !== entryId);
  const updatedDaily: DailyFoodLog = {
    date,
    entries: newEntries,
    totalCalories: Math.round(newEntries.reduce((sum, item) => sum + (Number(item.calories) || 0), 0)),
    totalProtein: Math.round(newEntries.reduce((sum, item) => sum + (Number(item.protein_g) || 0), 0)),
    totalCarbs: Math.round(newEntries.reduce((sum, item) => sum + (Number(item.carbs_g) || 0), 0)),
    totalFat: Math.round(newEntries.reduce((sum, item) => sum + (Number(item.fat_g) || 0), 0)),
  };

  all[date] = updatedDaily;
  saveAllFoodLogs(all);
  return updatedDaily;
}

export function clearGuestData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(GUEST_STORAGE_KEY);
  localStorage.removeItem(HISTORY_RECORD_KEY);
  localStorage.removeItem(FOOD_LOG_STORAGE_KEY);
}
