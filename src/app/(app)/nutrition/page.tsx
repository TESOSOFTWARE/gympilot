'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Apple,
  Flame,
  Droplets,
  Dumbbell,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Calendar,
  Sparkles,
  X,
  TrendingDown,
  TrendingUp,
  Scale,
  SunMedium,
  Sunset,
  Moon,
  Coffee,
} from 'lucide-react';
import { calculateNutritionTargets } from '@/engines/nutrition-engine';
import {
  getGuestData,
  getDailyFoodLog,
  saveFoodEntry,
  removeFoodEntry,
  getWorkoutHistoryRecords,
} from '@/stores/guest-store';
import { DailyFoodLog, FoodEntry, MealType } from '@/types/database';

const QUICK_PRESETS: {
  name: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  serving_size: string;
  meal_type: MealType;
}[] = [
  {
    name: '4 Scrambled Eggs & Whole Wheat Toast',
    calories: 410,
    protein_g: 28,
    carbs_g: 30,
    fat_g: 20,
    serving_size: '1 plate',
    meal_type: 'breakfast',
  },
  {
    name: 'Oatmeal with Whey & Banana',
    calories: 380,
    protein_g: 32,
    carbs_g: 52,
    fat_g: 6,
    serving_size: '1 large bowl',
    meal_type: 'breakfast',
  },
  {
    name: 'Grilled Chicken Breast & Jasmine Rice',
    calories: 450,
    protein_g: 48,
    carbs_g: 50,
    fat_g: 6,
    serving_size: '250g bowl',
    meal_type: 'lunch',
  },
  {
    name: 'Salmon Fillet with Sweet Potato',
    calories: 540,
    protein_g: 42,
    carbs_g: 44,
    fat_g: 18,
    serving_size: '300g plate',
    meal_type: 'dinner',
  },
  {
    name: 'Lean Beef & Roasted Potatoes',
    calories: 590,
    protein_g: 50,
    carbs_g: 40,
    fat_g: 22,
    serving_size: '350g plate',
    meal_type: 'dinner',
  },
  {
    name: 'Whey Protein Isolate Shake',
    calories: 140,
    protein_g: 27,
    carbs_g: 3,
    fat_g: 1.5,
    serving_size: '1 scoop (35g)',
    meal_type: 'snack',
  },
  {
    name: 'Greek Yogurt with Blueberries',
    calories: 210,
    protein_g: 22,
    carbs_g: 24,
    fat_g: 2,
    serving_size: '200g cup',
    meal_type: 'snack',
  },
];

const MEAL_CONFIG: {
  type: MealType;
  label: string;
  icon: any;
  color: string;
  bgLight: string;
}[] = [
  {
    type: 'breakfast',
    label: 'Breakfast',
    icon: Coffee,
    color: 'text-amber-500',
    bgLight: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    type: 'lunch',
    label: 'Lunch',
    icon: SunMedium,
    color: 'text-orange-500',
    bgLight: 'bg-orange-500/10 border-orange-500/20',
  },
  {
    type: 'dinner',
    label: 'Dinner',
    icon: Sunset,
    color: 'text-indigo-500',
    bgLight: 'bg-indigo-500/10 border-indigo-500/20',
  },
  {
    type: 'snack',
    label: 'Snacks & Supplements',
    icon: Apple,
    color: 'text-emerald-500',
    bgLight: 'bg-emerald-500/10 border-emerald-500/20',
  },
];

function formatDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatDisplayDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  const formatted = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  if (isToday) return `Today, ${formatted}`;
  if (isYesterday) return `Yesterday, ${formatted}`;
  return formatted;
}

export default function NutritionPage() {
  const [selectedDate, setSelectedDate] = useState<string>(formatDateKey(new Date()));
  const [dailyLog, setDailyLog] = useState<DailyFoodLog>({
    date: selectedDate,
    entries: [],
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
  });

  const [nutrition, setNutrition] = useState<any>(null);
  const [workoutCaloriesBurned, setWorkoutCaloriesBurned] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Form State
  const [formMealType, setFormMealType] = useState<MealType>('breakfast');
  const [formName, setFormName] = useState('');
  const [formCalories, setFormCalories] = useState<number | ''>('');
  const [formProtein, setFormProtein] = useState<number | ''>('');
  const [formCarbs, setFormCarbs] = useState<number | ''>('');
  const [formFat, setFormFat] = useState<number | ''>('');
  const [formServing, setFormServing] = useState('');

  // Load nutrition targets & daily log
  useEffect(() => {
    const guestData = getGuestData();
    const profile = guestData.profile || {};

    const res = calculateNutritionTargets({
      age: profile.age || 25,
      height_cm: profile.height_cm || 175,
      weight_kg: profile.weight_kg || 70,
      biological_sex: profile.biological_sex || 'male',
      training_days_per_week: profile.training_days_per_week || 3,
      goals: (guestData.goals || []).map((g) => g.goalSlug),
    });

    setNutrition(res);
  }, []);

  // Reload log and burned calories when date changes
  useEffect(() => {
    const log = getDailyFoodLog(selectedDate);
    setDailyLog(log);

    // Calculate workout calories burned for this date
    const history = getWorkoutHistoryRecords();
    const sessionsToday = history.filter((s) => s.startedAt && s.startedAt.slice(0, 10) === selectedDate);
    const burned = sessionsToday.reduce((sum, s) => sum + (s.caloriesBurned || 0), 0);
    setWorkoutCaloriesBurned(burned);
  }, [selectedDate]);

  const handlePrevDay = () => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const prev = new Date(y, m - 1, d - 1);
    setSelectedDate(formatDateKey(prev));
  };

  const handleNextDay = () => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const next = new Date(y, m - 1, d + 1);
    setSelectedDate(formatDateKey(next));
  };

  const openAddModal = (mealType: MealType = 'breakfast') => {
    setFormMealType(mealType);
    setFormName('');
    setFormCalories('');
    setFormProtein('');
    setFormCarbs('');
    setFormFat('');
    setFormServing('');
    setIsModalOpen(true);
  };

  const applyPreset = (preset: (typeof QUICK_PRESETS)[0]) => {
    setFormName(preset.name);
    setFormCalories(preset.calories);
    setFormProtein(preset.protein_g);
    setFormCarbs(preset.carbs_g);
    setFormFat(preset.fat_g);
    setFormServing(preset.serving_size);
    setFormMealType(preset.meal_type);
  };

  const handleSaveFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || formCalories === '') return;

    const updated = saveFoodEntry(selectedDate, {
      name: formName.trim(),
      calories: Number(formCalories) || 0,
      protein_g: Number(formProtein) || 0,
      carbs_g: Number(formCarbs) || 0,
      fat_g: Number(formFat) || 0,
      serving_size: formServing.trim() || undefined,
      meal_type: formMealType,
    });

    setDailyLog(updated);
    setIsModalOpen(false);
  };

  const handleDeleteEntry = (entryId: string) => {
    const updated = removeFoodEntry(selectedDate, entryId);
    setDailyLog(updated);
  };

  // Calculations for Deficit / Surplus
  const tdee = nutrition?.tdee || 2200;
  const targetCalories = nutrition?.calories?.min || tdee;
  const totalBurned = tdee + workoutCaloriesBurned;
  const caloriesEaten = dailyLog.totalCalories;
  const netBalance = caloriesEaten - totalBurned; // Negative = Deficit, Positive = Surplus
  const isDeficit = netBalance < 0;
  const isSurplus = netBalance > 0;
  const absoluteBalance = Math.abs(netBalance);

  // Group entries by meal type
  const mealEntries = useMemo(() => {
    const map: Record<MealType, FoodEntry[]> = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    };
    dailyLog.entries.forEach((entry) => {
      const type = entry.meal_type || 'snack';
      if (map[type]) {
        map[type].push(entry);
      } else {
        map.snack.push(entry);
      }
    });
    return map;
  }, [dailyLog]);

  if (!nutrition) return null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header & Date Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Utensils className="w-6 h-6 text-primary" />
            Food Intake & Calorie Balance
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Log your daily nutrition and track your real-time caloric deficit
          </p>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-1.5 bg-card border border-border p-1 rounded-xl self-start sm:self-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevDay}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="px-3 py-1 flex items-center gap-2 font-bold text-xs text-foreground min-w-[140px] justify-center">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            {formatDisplayDate(selectedDate)}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextDay}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          <Button
            onClick={() => openAddModal()}
            className="gap-1.5 text-xs font-black bg-primary hover:bg-primary/80 text-primary-foreground ml-1 px-3 h-8"
          >
            <Plus className="w-3.5 h-3.5" />
            Log Food
          </Button>
        </div>
      </div>

      {/* ─── Calorie Deficit / Surplus Hero Card ─────────────────────────── */}
      <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-border p-6 rounded-2xl shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Eaten */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Apple className="w-3.5 h-3.5 text-emerald-500" />
              Calories Eaten
            </span>
            <div className="text-3xl font-black text-foreground">
              {caloriesEaten}{' '}
              <span className="text-xs font-semibold text-muted-foreground">kcal</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {dailyLog.entries.length} items logged today
            </p>
          </div>

          {/* Burned */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              Total Expended
            </span>
            <div className="text-3xl font-black text-foreground">
              {totalBurned}{' '}
              <span className="text-xs font-semibold text-muted-foreground">kcal</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {tdee} TDEE + {workoutCaloriesBurned} Workout
            </p>
          </div>

          {/* Calorie Deficit / Surplus Banner */}
          <div className="md:col-span-2 p-4 rounded-xl border flex items-center justify-between transition-all bg-card/60 backdrop-blur-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {isDeficit ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-500 border border-emerald-500/25">
                    <TrendingDown className="w-3.5 h-3.5" />
                    CALORIC DEFICIT
                  </span>
                ) : isSurplus ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/15 text-amber-500 border border-amber-500/25">
                    <TrendingUp className="w-3.5 h-3.5" />
                    CALORIC SURPLUS
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-500/15 text-blue-500 border border-blue-500/25">
                    <Scale className="w-3.5 h-3.5" />
                    AT MAINTENANCE
                  </span>
                )}
              </div>

              <div className="text-2xl font-black text-foreground">
                {absoluteBalance}{' '}
                <span className="text-xs font-semibold text-muted-foreground">kcal net</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {isDeficit
                  ? `Burning ~${((absoluteBalance * 7) / 7700).toFixed(2)} kg fat pace / week`
                  : isSurplus
                  ? `Anabolic surplus fueling hypertrophy`
                  : `Energy intake equals energy expenditure`}
              </p>
            </div>

            <div className="text-right pl-4">
              <div className="text-[10px] font-bold text-muted-foreground uppercase">Target Intake</div>
              <div className="text-base font-extrabold text-foreground">
                {nutrition.calories.min}–{nutrition.calories.max}
              </div>
              <div className="text-[10px] text-muted-foreground">kcal / day</div>
            </div>
          </div>
        </div>

        {/* Macro Progress Bars */}
        <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Protein */}
          <div className="space-y-1.5 bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/20">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-emerald-500">PROTEIN</span>
              <span className="text-foreground">
                {dailyLog.totalProtein}g / {nutrition.protein.min}–{nutrition.protein.max}g
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    Math.round((dailyLog.totalProtein / (nutrition.protein.min || 150)) * 100)
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Carbs */}
          <div className="space-y-1.5 bg-amber-500/5 p-3 rounded-xl border border-amber-500/20">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-amber-500">CARBS</span>
              <span className="text-foreground">
                {dailyLog.totalCarbs}g / {nutrition.carbs.min}–{nutrition.carbs.max}g
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-500 rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    Math.round((dailyLog.totalCarbs / (nutrition.carbs.min || 200)) * 100)
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Fats */}
          <div className="space-y-1.5 bg-purple-500/5 p-3 rounded-xl border border-purple-500/20">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-purple-500">FATS</span>
              <span className="text-foreground">
                {dailyLog.totalFat}g / {nutrition.fat.min}–{nutrition.fat.max}g
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-500 rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    Math.round((dailyLog.totalFat / (nutrition.fat.min || 60)) * 100)
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* ─── Meal Breakdown Sections ─────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
          <Utensils className="w-4 h-4 text-primary" />
          Meals & Food Log for {formatDisplayDate(selectedDate)}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {MEAL_CONFIG.map((meal) => {
            const Icon = meal.icon;
            const entries = mealEntries[meal.type];
            const mealCalories = entries.reduce((s, e) => s + (Number(e.calories) || 0), 0);
            const mealProtein = entries.reduce((s, e) => s + (Number(e.protein_g) || 0), 0);
            const mealCarbs = entries.reduce((s, e) => s + (Number(e.carbs_g) || 0), 0);
            const mealFat = entries.reduce((s, e) => s + (Number(e.fat_g) || 0), 0);

            return (
              <Card key={meal.type} className="bg-card border-border rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-border/60 flex items-center justify-between bg-muted/10">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl ${meal.bgLight}`}>
                      <Icon className={`w-4 h-4 ${meal.color}`} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-foreground">{meal.label}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium">
                        <span>{mealCalories} kcal</span>
                        <span>•</span>
                        <span>{mealProtein}g P</span>
                        <span>•</span>
                        <span>{mealCarbs}g C</span>
                        <span>•</span>
                        <span>{mealFat}g F</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openAddModal(meal.type)}
                    className="gap-1.5 text-xs font-bold border-border hover:border-primary/50"
                  >
                    <Plus className="w-3.5 h-3.5 text-primary" />
                    Add Food
                  </Button>
                </div>

                <CardContent className="p-4">
                  {entries.length === 0 ? (
                    <div className="py-4 text-center">
                      <p className="text-xs text-muted-foreground">
                        No food entries logged for {meal.label.toLowerCase()} yet.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border/50">
                      {entries.map((item) => (
                        <div
                          key={item.id}
                          className="py-3 flex items-center justify-between gap-3 group"
                        >
                          <div className="space-y-0.5">
                            <div className="font-bold text-sm text-foreground">{item.name}</div>
                            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                              {item.serving_size && (
                                <>
                                  <span className="text-primary font-semibold">
                                    {item.serving_size}
                                  </span>
                                  <span>•</span>
                                </>
                              )}
                              <span className="font-bold text-foreground">{item.calories} kcal</span>
                              <span>•</span>
                              <span className="text-emerald-500 font-semibold">{item.protein_g}g P</span>
                              <span>•</span>
                              <span className="text-amber-500 font-semibold">{item.carbs_g}g C</span>
                              <span>•</span>
                              <span className="text-purple-500 font-semibold">{item.fat_g}g F</span>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteEntry(item.id)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            title="Remove food item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ─── Target Science Card (TDEE & Hydration) ────────────────────── */}
      <Card className="bg-card border-border p-6 rounded-2xl space-y-4">
        <CardTitle className="text-base font-extrabold text-foreground flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Metabolic Baselines & Hydration Guide
        </CardTitle>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border bg-background space-y-1">
            <span className="text-[11px] font-bold text-muted-foreground uppercase">
              BMR (Basal Rate)
            </span>
            <div className="text-xl font-black text-foreground">
              {nutrition.bmr}{' '}
              <span className="text-xs font-normal text-muted-foreground">kcal/day</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Mifflin-St Jeor resting energy</p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-background space-y-1">
            <span className="text-[11px] font-bold text-muted-foreground uppercase">
              Daily Hydration
            </span>
            <div className="text-xl font-black text-blue-500 flex items-center gap-1.5">
              <Droplets className="w-4 h-4" />
              {nutrition.water_liters}{' '}
              <span className="text-xs font-normal text-muted-foreground">Liters / day</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Baseline + workout fluid recovery</p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-background space-y-1">
            <span className="text-[11px] font-bold text-muted-foreground uppercase">
              Hypertrophy Target
            </span>
            <div className="text-xl font-black text-primary">
              {nutrition.calories.min}–{nutrition.calories.max}{' '}
              <span className="text-xs font-normal text-muted-foreground">kcal</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Optimal muscle protein synthesis</p>
          </div>
        </div>
      </Card>

      {/* ─── Log Food Modal ──────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-black text-foreground">Log Food Item</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5 overflow-y-auto">
              {/* Meal Type Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  Meal Category
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {MEAL_CONFIG.map((m) => {
                    const isSelected = formMealType === m.type;
                    return (
                      <button
                        key={m.type}
                        type="button"
                        onClick={() => setFormMealType(m.type)}
                        className={`py-2 px-1 rounded-xl border text-center text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'bg-background border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {m.label.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Presets */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-primary" /> Quick Presets
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all"
                    >
                      {preset.name.split('&')[0]} ({preset.calories} kcal)
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Inputs */}
              <form id="food-form" onSubmit={handleSaveFood} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Food or Meal Name *</label>
                  <Input
                    required
                    placeholder="e.g., Grilled Chicken Rice Bowl"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="bg-background border-border text-foreground font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground">Calories (kcal) *</label>
                    <Input
                      required
                      type="number"
                      placeholder="e.g. 450"
                      value={formCalories}
                      onChange={(e) => setFormCalories(e.target.value === '' ? '' : Number(e.target.value))}
                      className="bg-background border-border text-foreground font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground">Serving Size (optional)</label>
                    <Input
                      placeholder="e.g., 250g or 1 bowl"
                      value={formServing}
                      onChange={(e) => setFormServing(e.target.value)}
                      className="bg-background border-border text-foreground font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-emerald-500">Protein (g)</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={formProtein}
                      onChange={(e) => setFormProtein(e.target.value === '' ? '' : Number(e.target.value))}
                      className="bg-background border-border text-foreground font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-amber-500">Carbs (g)</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={formCarbs}
                      onChange={(e) => setFormCarbs(e.target.value === '' ? '' : Number(e.target.value))}
                      className="bg-background border-border text-foreground font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-purple-500">Fat (g)</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={formFat}
                      onChange={(e) => setFormFat(e.target.value === '' ? '' : Number(e.target.value))}
                      className="bg-background border-border text-foreground font-semibold"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border flex items-center justify-end gap-2 bg-muted/20">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
                className="text-xs font-bold"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                form="food-form"
                className="text-xs font-black bg-primary hover:bg-primary/80 text-primary-foreground px-5"
              >
                Save Food Entry
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
