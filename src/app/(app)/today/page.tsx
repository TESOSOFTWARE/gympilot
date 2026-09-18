'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Dumbbell,
  Play,
  Shuffle,
  Clock,
  Zap,
  ChevronRight,
  Sparkles,
  Flame,
  Activity,
  Layers,
  Plus,
  X,
  Scale,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getGuestData, saveGuestData } from '@/stores/guest-store';
import { generateWorkout } from '@/engines/workout-engine';
import { GeneratedWorkout } from '@/types/database';
import { MuscleIcon } from '@/components/exercises/MuscleIcon';

const EXERCISE_POOL = [
  {
    id: 'ex1',
    name: 'Barbell Bench Press',
    slug: 'barbell-bench-press',
    description: 'Heavy compound pushing movement targeting mid chest and triceps.',
    instructions: 'Lie flat on bench, unrack bar, lower to chest, press up.',
    common_mistakes: ['Bouncing off chest'],
    safety_notes: 'Use spotter for heavy sets.',
    difficulty: 'intermediate' as const,
    movement_pattern: 'horizontal_push' as const,
    exercise_type: 'compound' as const,
    youtube_url: null,
    thumbnail_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    exercise_muscles: [
      {
        id: '1',
        exercise_id: 'ex1',
        muscle_id: 'm1',
        involvement_type: 'primary' as const,
        activation_weight: 1.0,
        muscle: { id: 'm1', name: 'Mid Chest', slug: 'mid-chest', muscle_group: 'Chest', body_region: 'upper_body', default_recovery_hours: 48, is_active: true },
      },
    ],
    exercise_equipment: [],
  },
  {
    id: 'ex2',
    name: 'Incline Dumbbell Press',
    slug: 'incline-dumbbell-press',
    description: 'Incline press targeting upper chest & anterior delts.',
    instructions: 'Set bench to 30 degrees, press dumbbells overhead.',
    common_mistakes: ['Incline too steep'],
    safety_notes: 'Control descent.',
    difficulty: 'intermediate' as const,
    movement_pattern: 'horizontal_push' as const,
    exercise_type: 'compound' as const,
    youtube_url: null,
    thumbnail_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    exercise_muscles: [
      {
        id: '2',
        exercise_id: 'ex2',
        muscle_id: 'm2',
        involvement_type: 'primary' as const,
        activation_weight: 1.0,
        muscle: { id: 'm2', name: 'Upper Chest', slug: 'upper-chest', muscle_group: 'Chest', body_region: 'upper_body', default_recovery_hours: 48, is_active: true },
      },
    ],
    exercise_equipment: [],
  },
  {
    id: 'ex3',
    name: 'Standing Overhead Press',
    slug: 'overhead-press',
    description: 'Strict vertical press for shoulder mass and core stability.',
    instructions: 'Press barbell overhead from shoulder rack.',
    common_mistakes: ['Excessive back arch'],
    safety_notes: 'Brace core.',
    difficulty: 'intermediate' as const,
    movement_pattern: 'vertical_push' as const,
    exercise_type: 'compound' as const,
    youtube_url: null,
    thumbnail_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    exercise_muscles: [
      {
        id: '3',
        exercise_id: 'ex3',
        muscle_id: 'm3',
        involvement_type: 'primary' as const,
        activation_weight: 1.0,
        muscle: { id: 'm3', name: 'Anterior Deltoid', slug: 'anterior-deltoid', muscle_group: 'Shoulders', body_region: 'upper_body', default_recovery_hours: 36, is_active: true },
      },
    ],
    exercise_equipment: [],
  },
  {
    id: 'ex4',
    name: 'Tricep Cable Pushdown',
    slug: 'tricep-pushdown',
    description: 'Tricep isolation with constant cable tension.',
    instructions: 'Push handle down extending arms fully.',
    common_mistakes: ['Flaring elbows'],
    safety_notes: 'Keep elbows stationary.',
    difficulty: 'beginner' as const,
    movement_pattern: 'elbow_extension' as const,
    exercise_type: 'isolation' as const,
    youtube_url: null,
    thumbnail_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    exercise_muscles: [
      {
        id: '4',
        exercise_id: 'ex4',
        muscle_id: 'm4',
        involvement_type: 'primary' as const,
        activation_weight: 1.0,
        muscle: { id: 'm4', name: 'Triceps', slug: 'triceps', muscle_group: 'Arms', body_region: 'upper_body', default_recovery_hours: 36, is_active: true },
      },
    ],
    exercise_equipment: [],
  },
  {
    id: 'ex5',
    name: 'Dumbbell Bench Press',
    slug: 'dumbbell-bench-press',
    description: 'Flat dumbbell press for full range chest stretch & symmetry.',
    instructions: 'Lower dumbbells to outer chest, press together.',
    common_mistakes: ['Dropping weights fast'],
    safety_notes: 'Control dumbbells.',
    difficulty: 'intermediate' as const,
    movement_pattern: 'horizontal_push' as const,
    exercise_type: 'compound' as const,
    youtube_url: null,
    thumbnail_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    exercise_muscles: [
      {
        id: '5',
        exercise_id: 'ex5',
        muscle_id: 'm1',
        involvement_type: 'primary' as const,
        activation_weight: 1.0,
        muscle: { id: 'm1', name: 'Mid Chest', slug: 'mid-chest', muscle_group: 'Chest', body_region: 'upper_body', default_recovery_hours: 48, is_active: true },
      },
    ],
    exercise_equipment: [],
  },
  {
    id: 'ex6',
    name: 'Cable Flyes / Crossover',
    slug: 'cable-crossover',
    description: 'Isolation chest fly bringing handles together with peak contraction.',
    instructions: 'Hug handles together in front of chest.',
    common_mistakes: ['Bending arms too much'],
    safety_notes: 'Focus on squeeze.',
    difficulty: 'intermediate' as const,
    movement_pattern: 'horizontal_push' as const,
    exercise_type: 'isolation' as const,
    youtube_url: null,
    thumbnail_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    exercise_muscles: [
      {
        id: '6',
        exercise_id: 'ex6',
        muscle_id: 'm1',
        involvement_type: 'primary' as const,
        activation_weight: 1.0,
        muscle: { id: 'm1', name: 'Mid Chest', slug: 'mid-chest', muscle_group: 'Chest', body_region: 'upper_body', default_recovery_hours: 48, is_active: true },
      },
    ],
    exercise_equipment: [],
  },
  {
    id: 'ex7',
    name: 'Lateral Dumbbell Raise',
    slug: 'lateral-raise',
    description: 'Isolation movement targeting side delts for wide shoulders.',
    instructions: 'Raise dumbbells to sides up to shoulder height.',
    common_mistakes: ['Swinging body'],
    safety_notes: 'Use light controlled weight.',
    difficulty: 'beginner' as const,
    movement_pattern: 'shoulder_abduction' as const,
    exercise_type: 'isolation' as const,
    youtube_url: null,
    thumbnail_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    exercise_muscles: [
      {
        id: '7',
        exercise_id: 'ex7',
        muscle_id: 'm5',
        involvement_type: 'primary' as const,
        activation_weight: 1.0,
        muscle: { id: 'm5', name: 'Lateral Deltoid', slug: 'lateral-deltoid', muscle_group: 'Shoulders', body_region: 'upper_body', default_recovery_hours: 36, is_active: true },
      },
    ],
    exercise_equipment: [],
  },
  {
    id: 'ex8',
    name: 'Skull Crushers (Lying Tricep Ext)',
    slug: 'skull-crushers',
    description: 'Lying tricep extension targeting the long and lateral heads.',
    instructions: 'Lower EZ bar to forehead, extend arms overhead.',
    common_mistakes: ['Flaring elbows wide'],
    safety_notes: 'Control movement near head.',
    difficulty: 'intermediate' as const,
    movement_pattern: 'elbow_extension' as const,
    exercise_type: 'isolation' as const,
    youtube_url: null,
    thumbnail_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    exercise_muscles: [
      {
        id: '8',
        exercise_id: 'ex8',
        muscle_id: 'm4',
        involvement_type: 'primary' as const,
        activation_weight: 1.0,
        muscle: { id: 'm4', name: 'Triceps', slug: 'triceps', muscle_group: 'Arms', body_region: 'upper_body', default_recovery_hours: 36, is_active: true },
      },
    ],
    exercise_equipment: [],
  },
  {
    id: 'ex9',
    name: 'Arnold Dumbbell Press',
    slug: 'arnold-press',
    description: 'Rotational shoulder press hitting anterior & lateral delts.',
    instructions: 'Rotate palms forward while pressing dumbbells overhead.',
    common_mistakes: ['Arching lower back'],
    safety_notes: 'Smooth rotation.',
    difficulty: 'intermediate' as const,
    movement_pattern: 'vertical_push' as const,
    exercise_type: 'compound' as const,
    youtube_url: null,
    thumbnail_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    exercise_muscles: [
      {
        id: '9',
        exercise_id: 'ex9',
        muscle_id: 'm3',
        involvement_type: 'primary' as const,
        activation_weight: 1.0,
        muscle: { id: 'm3', name: 'Anterior Deltoid', slug: 'anterior-deltoid', muscle_group: 'Shoulders', body_region: 'upper_body', default_recovery_hours: 36, is_active: true },
      },
    ],
    exercise_equipment: [],
  },
];

export default function TodayWorkoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [shuffling, setShuffling] = useState(false);
  const [workoutData, setWorkoutData] = useState<GeneratedWorkout | null>(null);
  const [bodyWeight, setBodyWeight] = useState<number>(70);
  const [weightSaved, setWeightSaved] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [userLevel, setUserLevel] = useState('beginner');

  useEffect(() => {
    const data = getGuestData();
    if (data.profile?.weight_kg) {
      setBodyWeight(data.profile.weight_kg);
    }
    if (data.profile?.training_level) {
      setUserLevel(data.profile.training_level);
    }
    generateNewWorkout(false);
  }, []);

  function handleSaveWeight() {
    const data = getGuestData();
    saveGuestData({
      ...data,
      profile: {
        ...data.profile,
        weight_kg: bodyWeight,
      },
    });
    setWeightSaved(true);
    setTimeout(() => setWeightSaved(false), 2000);
  }

  function generateNewWorkout(isShuffle = false) {
    if (isShuffle) {
      setShuffling(true);
    } else {
      setLoading(true);
    }

    setTimeout(() => {
      const guestData = getGuestData();

      // Shuffle pool for randomized selection
      const poolCopy = [...EXERCISE_POOL].sort(() => Math.random() - 0.5);

      const planDay = {
        id: 'pd1',
        plan_id: 'p1',
        day_number: 1,
        name: 'Upper Body Power & Hypertrophy',
        focus: 'Chest, Shoulders & Triceps',
        target_muscles: ['mid-chest', 'upper-chest', 'triceps', 'anterior-deltoid', 'lateral-deltoid'],
      };

      const result = generateWorkout({
        profile: guestData.profile as any,
        goals: guestData.goals.map((g) => ({ id: '1', user_id: 'u1', goal_id: g.goalSlug, is_primary: g.isPrimary })),
        injuries: [],
        preferences: [],
        recentSessions: [],
        recentSets: [],
        planDay,
        availableExercises: poolCopy as any,
        parameters: {},
      });

      setWorkoutData(result.workout);
      setLoading(false);
      setShuffling(false);
    }, isShuffle ? 300 : 0);
  }

  function handleAddExercise(item: typeof EXERCISE_POOL[0]) {
    if (!workoutData) return;
    const isCompound = item.exercise_type === 'compound';
    const newGe = {
      exercise: item as any,
      muscles: item.exercise_muscles as any,
      equipment: [],
      sets: isCompound ? 4 : 3,
      rep_range: isCompound ? '8-10' : '10-12',
      rest_seconds: isCompound ? 120 : 75,
      target_rpe: isCompound ? 8.0 : 7.5,
      suggested_weight_kg: 24,
      previous_performance: null,
      order_index: workoutData.exercises.length + 1,
    };

    const updatedExercises = [...workoutData.exercises, newGe];
    const newTotalSets = updatedExercises.reduce((s, e) => s + e.sets, 0);

    setWorkoutData({
      ...workoutData,
      exercises: updatedExercises,
      estimated_duration_minutes: Math.round(newTotalSets * 3.2 + 10),
    });
    setShowAddModal(false);
  }

  function handleStartWorkout() {
    if (workoutData) {
      localStorage.setItem('gympilot_pending_workout', JSON.stringify(workoutData));
    }
    router.push('/workout/session-1');
  }

  // Calculate Over/Under volume warnings
  const totalPlannedSets = workoutData?.exercises.reduce((sum, e) => sum + e.sets, 0) || 0;
  const minRecommended = userLevel === 'beginner' ? 10 : 12;
  const maxRecommended = userLevel === 'beginner' ? 18 : 24;

  let volumeStatus: { type: 'low' | 'high' | 'optimal'; message: string } = {
    type: 'optimal',
    message: `Planned routine (${totalPlannedSets} sets) fits optimal ${userLevel} volume range (${minRecommended}-${maxRecommended} sets).`,
  };

  if (totalPlannedSets < minRecommended) {
    volumeStatus = {
      type: 'low',
      message: `⚠️ Low Volume Warning: ${totalPlannedSets} planned sets is under recommended minimum (${minRecommended} sets).`,
    };
  } else if (totalPlannedSets > maxRecommended) {
    volumeStatus = {
      type: 'high',
      message: `🚨 High Volume Warning: ${totalPlannedSets} planned sets exceeds target threshold (${maxRecommended} sets).`,
    };
  }

  return (
    <div className="space-y-6">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-6 md:p-8 shadow-xl gym-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              AI Recommended Session
            </div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
              {workoutData?.plan_day.name || "Today's Workout"}
            </h1>

            <p className="text-muted-foreground text-sm font-medium flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              Target Focus: <span className="text-foreground font-bold">{workoutData?.plan_day.focus}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              disabled={shuffling}
              onClick={() => generateNewWorkout(true)}
              className="border-border bg-background text-muted-foreground hover:text-foreground hover:bg-accent gap-2 font-bold text-xs h-12 px-4 rounded-xl transition-all active:scale-95"
            >
              <Shuffle className={`w-4 h-4 text-primary ${shuffling ? 'animate-spin' : ''}`} />
              {shuffling ? 'Shuffling...' : 'Shuffle Routine'}
            </Button>

            <Button
              onClick={handleStartWorkout}
              className="h-12 px-7 font-black text-sm gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 rounded-xl transition-all hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-current" />
              START WORKOUT
            </Button>
          </div>
        </div>
      </div>

      {/* Body Weight Logging Widget Banner */}
      <Card className="bg-card border-border p-4 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/15 text-primary rounded-xl border border-primary/20">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-foreground">Log Body Weight Today</h3>
              <p className="text-xs text-muted-foreground font-medium">Keep biometrics up to date for precise calorie & volume tuning</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-28">
              <Input
                type="number"
                step="0.1"
                value={bodyWeight}
                onChange={(e) => setBodyWeight(Number(e.target.value))}
                className="h-10 text-center font-black text-sm bg-background border-border text-foreground pr-7"
              />
              <span className="absolute right-2.5 top-2.5 text-xs font-bold text-muted-foreground">kg</span>
            </div>

            <Button onClick={handleSaveWeight} size="sm" className="h-10 px-4 font-black text-xs bg-primary text-primary-foreground gap-1.5">
              {weightSaved ? <CheckCircle2 className="w-4 h-4" /> : null}
              {weightSaved ? 'LOGGED' : 'LOG WEIGHT'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Dynamic Session Volume & Safety Warning Bar */}
      <div
        className={`px-4 py-3 rounded-2xl border text-xs font-bold flex items-center justify-between gap-3 shadow-md transition-all ${
          volumeStatus.type === 'high'
            ? 'bg-red-500/15 border-red-500/30 text-red-500'
            : volumeStatus.type === 'low'
            ? 'bg-amber-500/15 border-amber-500/30 text-amber-500'
            : 'bg-primary/10 border-primary/20 text-primary'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {volumeStatus.type === 'high' ? (
            <ShieldAlert className="w-4 h-4 shrink-0" />
          ) : volumeStatus.type === 'low' ? (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-primary" />
          )}
          <span className="truncate">{volumeStatus.message}</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-background font-mono font-semibold text-muted-foreground shrink-0 border border-border">
          TARGET: {minRecommended}-{maxRecommended} SETS
        </span>
      </div>

      {/* Fitness Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <Card className="bg-card border-border p-4">
          <CardContent className="p-0 flex items-center gap-3.5">
            <div className="p-3 bg-blue-500/15 text-blue-500 rounded-2xl border border-blue-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">EST. DURATION</p>
              <p className="text-xl font-extrabold text-foreground">
                {workoutData?.estimated_duration_minutes || 50} <span className="text-xs font-normal text-muted-foreground">mins</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border p-4">
          <CardContent className="p-0 flex items-center gap-3.5">
            <div className="p-3 bg-primary/15 text-primary rounded-2xl border border-primary/20">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">EXERCISES</p>
              <p className="text-xl font-extrabold text-foreground">
                {workoutData?.exercises.length || 4} <span className="text-xs font-normal text-muted-foreground">Lifts</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border p-4">
          <CardContent className="p-0 flex items-center gap-3.5">
            <div className="p-3 bg-amber-500/15 text-amber-500 rounded-2xl border border-amber-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">TOTAL VOLUME</p>
              <p className="text-xl font-extrabold text-foreground">
                {totalPlannedSets} <span className="text-xs font-normal text-muted-foreground">Sets</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border p-4">
          <CardContent className="p-0 flex items-center gap-3.5">
            <div className="p-3 bg-purple-500/15 text-purple-500 rounded-2xl border border-purple-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">READINESS</p>
              <p className="text-xl font-extrabold text-primary">96% <span className="text-xs font-normal text-muted-foreground">Fresh</span></p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Routine Exercises List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            Today's Lift Protocol
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddModal(true)}
            className="gap-1.5 text-xs font-extrabold border-border bg-card text-primary hover:bg-accent"
          >
            <Plus className="w-4 h-4" />
            Add Practice / Movement
          </Button>
        </div>

        <div className="space-y-3">
          {workoutData?.exercises.map((item, idx) => {
            const primaryMuscle = item.muscles[0]?.muscle;
            return (
              <Card
                key={item.exercise.id}
                className="bg-card border-border hover:border-primary/40 transition-all shadow-md group rounded-2xl overflow-hidden"
              >
                <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Anatomical Muscle Icon Highlight */}
                    <div className="p-2 rounded-2xl bg-secondary border border-border flex items-center justify-center shrink-0">
                      <MuscleIcon
                        muscleSlug={primaryMuscle?.slug}
                        muscleName={primaryMuscle?.name}
                        className="w-10 h-10"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="font-extrabold text-base text-foreground group-hover:text-primary transition-colors">
                          {item.exercise.name}
                        </h3>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-secondary text-secondary-foreground border border-border">
                          {item.exercise.exercise_type}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-1 font-medium">
                        {item.exercise.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-1 font-medium">
                        <span className="text-primary font-semibold flex items-center gap-1">
                          🎯 {primaryMuscle?.name || 'Chest'}
                        </span>
                        <span>⏱ {item.rest_seconds}s Rest</span>
                        <span>📊 RPE {item.target_rpe}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-5 pt-3 md:pt-0 border-t md:border-t-0 border-border">
                    <div className="text-right">
                      <div className="text-sm font-black text-foreground">
                        {item.sets} Sets × {item.rep_range} Reps
                      </div>
                      <div className="text-xs text-primary font-bold">
                        {item.suggested_weight_kg ? `Load: ${item.suggested_weight_kg} kg` : 'Bodyweight / Test weight'}
                      </div>
                    </div>

                    <Link href={`/exercises/${item.exercise.slug}`}>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-accent">
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Modal: Add Exercise to Today's Protocol */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="bg-card border-border max-w-lg w-full p-6 space-y-4 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-primary" />
                Add Practice to Today's Protocol
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {EXERCISE_POOL.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAddExercise(item)}
                  className="w-full p-3.5 rounded-xl bg-background border border-border hover:border-primary/50 hover:bg-accent text-left flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <MuscleIcon muscleSlug={item.exercise_muscles[0]?.muscle?.slug} muscleName={item.exercise_muscles[0]?.muscle?.name} className="w-8 h-8" />
                    <div>
                      <h4 className="font-extrabold text-sm text-foreground group-hover:text-primary">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Plus className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
