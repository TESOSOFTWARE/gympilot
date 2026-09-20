'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Check,
  Clock,
  ChevronLeft,
  Flame,
  Trophy,
  Dumbbell,
  CheckCircle2,
  Timer,
  X,
  Plus,
  Trash2,
  AlertTriangle,
  Info,
  ShieldAlert,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getGuestData, saveWorkoutRecord, WorkoutSessionRecord } from '@/stores/guest-store';
import { YouTubeEmbed } from '@/components/exercises/YouTubeEmbed';
import { createClient } from '@/lib/supabase/client';

interface SetState {
  setNumber: number;
  weightKg: number;
  reps: number;
  rpe: number;
  completed: boolean;
}

interface ActiveExercise {
  id: string;
  slug?: string;
  name: string;
  targetSets: number;
  repRange: string;
  youtubeUrls?: string[];
  sets: SetState[];
}

const SESSION_ID = 'session_upper_power_01';

const ADDABLE_EXERCISES_LIBRARY = [
  { id: 'ex_db_bench', name: 'Dumbbell Bench Press', repRange: '8-12', defaultWeight: 24, defaultReps: 10 },
  { id: 'ex_cable_fly', name: 'Cable Crossover / Flyes', repRange: '12-15', defaultWeight: 15, defaultReps: 12 },
  { id: 'ex_arnold_press', name: 'Arnold Dumbbell Press', repRange: '10-12', defaultWeight: 18, defaultReps: 10 },
  { id: 'ex_lat_raise', name: 'Lateral Dumbbell Raise', repRange: '12-15', defaultWeight: 10, defaultReps: 15 },
  { id: 'ex_skull_crusher', name: 'Skull Crushers (Tricep Ext)', repRange: '10-12', defaultWeight: 25, defaultReps: 10 },
  { id: 'ex_lat_pull', name: 'Lat Pulldown', repRange: '10-12', defaultWeight: 50, defaultReps: 10 },
  { id: 'ex_barbell_curl', name: 'Standing Barbell Curl', repRange: '10-12', defaultWeight: 30, defaultReps: 10 },
];

export default function ActiveWorkoutPage() {
  const router = useRouter();
  const params = useParams();

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [restSeconds, setRestSeconds] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [logToast, setLogToast] = useState<string | null>(null);
  const [userWeightKg, setUserWeightKg] = useState(70);
  const [userTrainingLevel, setUserTrainingLevel] = useState('beginner');
  const [showAddModal, setShowAddModal] = useState(false);
  const [sessionName, setSessionName] = useState('Workout Session');

  const [dbExercises, setDbExercises] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [isFetchingExercises, setIsFetchingExercises] = useState(false);

  const [exercises, setExercises] = useState<ActiveExercise[]>([]);


  // Fetch all exercises for the Add Movement modal
  useEffect(() => {
    async function fetchAllExercises() {
      if (showAddModal && dbExercises.length === 0) {
        setIsFetchingExercises(true);
        const supabase = createClient();
        const { data } = await (supabase as any).from('exercises').select('*').eq('is_active', true).order('name', { ascending: true });
        if (data) {
          setDbExercises(data);
        }
        setIsFetchingExercises(false);
      }
    }
    fetchAllExercises();
  }, [showAddModal, dbExercises.length]);

  // Load user profile
  useEffect(() => {
    const guest = getGuestData();
    if (guest.profile?.weight_kg) {
      setUserWeightKg(guest.profile.weight_kg);
    }
    if (guest.profile?.training_level) {
      setUserTrainingLevel(guest.profile.training_level);
    }
  }, []);

  // Load dynamically generated workout from Today's page
  useEffect(() => {
    const pendingStr = localStorage.getItem('gympilot_pending_workout');
    if (pendingStr) {
      try {
        const data = JSON.parse(pendingStr);
        if (data && data.plan_day) {
          setSessionName(data.plan_day.name || 'Workout Session');
        }
        if (data && data.exercises) {
          const activeExs: ActiveExercise[] = data.exercises.map((item: any, idx: number) => {
            const numSets = item.sets || 3;
            const reps = parseInt((item.rep_range || '10').split('-')[0]) || 10;
            const weight = item.suggested_weight_kg || 20;

            const sets = Array.from({ length: numSets }).map((_, i) => ({
              setNumber: i + 1,
              weightKg: weight,
              reps: reps,
              rpe: item.target_rpe || 8.0,
              completed: false,
            }));

            return {
              id: item.exercise?.id || `ex_${idx}`,
              slug: item.exercise?.slug,
              name: item.exercise?.name || 'Unknown Exercise',
              targetSets: numSets,
              repRange: item.rep_range || '10-12',
              youtubeUrls: item.exercise?.youtube_urls || (item.exercise?.youtube_url ? [item.exercise.youtube_url] : []), // handle both formats
              sets,
            };
          });
          setExercises(activeExs);
          // Optional: Clear it out so it doesn't persist on a fresh reload without clicking start
          // localStorage.removeItem('gympilot_pending_workout');
        }
      } catch (err) {
        console.error('Failed to parse pending workout', err);
      }
    }
  }, []);

  // Workout duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rest timer countdown
  useEffect(() => {
    if (restSeconds === null || restSeconds <= 0) return;
    const restTimer = setInterval(() => {
      setRestSeconds((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(restTimer);
  }, [restSeconds]);


  // Fetch real youtube URLs from database if missing
  useEffect(() => {
    async function fetchVideos() {
      if (exercises.length === 0) return;
      const slugsToFetch = exercises.filter(e => (!e.youtubeUrls || e.youtubeUrls.length === 0) && e.slug).map(e => e.slug);
      if (slugsToFetch.length === 0) return;
      
      const supabase = createClient();
      
      const { data } = await (supabase as any)
        .from('exercises')
        .select('slug, youtube_urls')
        .in('slug', slugsToFetch);
        
      if (data && data.length > 0) {
        setExercises(prev => prev.map(ex => {
          const dbEx = data.find((d: any) => d.slug === ex.slug);
          if (dbEx && dbEx.youtube_urls && dbEx.youtube_urls.length > 0) {
            return { ...ex, youtubeUrls: dbEx.youtube_urls };
          }
          return ex;
        }));
      }
    }
    fetchVideos();
  }, [exercises.length]);

  // Derived metrics
  const totalSetsCount = exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  const totalCompletedSets = exercises.reduce(
    (sum, ex) => sum + ex.sets.filter((s) => s.completed).length,
    0
  );

  const totalVolumeKg = exercises.reduce((sum, ex) => {
    return (
      sum +
      ex.sets
        .filter((s) => s.completed)
        .reduce((sSum, set) => sSum + set.weightKg * set.reps, 0)
    );
  }, 0);

  // Calorie Burn Formula
  const caloriesBurned = Math.round(
    (elapsedSeconds / 60) * (userWeightKg * 0.08) +
      totalCompletedSets * 7.5 +
      totalVolumeKg * 0.0006
  );

  // Dynamic Volume / Intensity Warning Calculator based on user info
  const minRecommendedSets = userTrainingLevel === 'beginner' ? 10 : 12;
  const maxRecommendedSets = userTrainingLevel === 'beginner' ? 18 : 24;

  let volumeStatus: { type: 'low' | 'high' | 'optimal'; message: string } = {
    type: 'optimal',
    message: `Routine volume (${totalSetsCount} sets) matches recommended ${userTrainingLevel} target.`,
  };

  if (totalSetsCount < minRecommendedSets) {
    volumeStatus = {
      type: 'low',
      message: `⚠️ Low Volume Warning: ${totalSetsCount} total sets is below recommended minimum (${minRecommendedSets} sets) for ${userTrainingLevel} lifters.`,
    };
  } else if (totalSetsCount > maxRecommendedSets) {
    volumeStatus = {
      type: 'high',
      message: `🚨 Over-Training Alert: High volume (${totalSetsCount} sets) exceeds single-session threshold (${maxRecommendedSets} sets). Watch out for fatigue!`,
    };
  }

  // Auto-sync completed sets to permanent workout record log
  function syncToPermanentRecord(updatedExercises: ActiveExercise[], isCompleted = false) {
    const completedSetsCount = updatedExercises.reduce(
      (sum, ex) => sum + ex.sets.filter((s) => s.completed).length,
      0
    );

    const record: WorkoutSessionRecord = {
      id: SESSION_ID,
      workoutName: sessionName,
      startedAt: new Date(Date.now() - elapsedSeconds * 1000).toISOString(),
      completedAt: isCompleted ? new Date().toISOString() : null,
      durationMinutes: Math.max(1, Math.round(elapsedSeconds / 60)),
      totalSetsCompleted: completedSetsCount,
      totalVolumeKg,
      caloriesBurned,
      exercises: updatedExercises.map((e) => ({
        id: e.id,
        name: e.name,
        completedSets: e.sets
          .filter((s) => s.completed)
          .map((s) => ({
            setNumber: s.setNumber,
            weightKg: s.weightKg,
            reps: s.reps,
            rpe: s.rpe,
          })),
      })),
    };

    saveWorkoutRecord(record);
  }

  function toggleSetCompletion(exIdx: number, setIdx: number) {
    setExercises((prev) => {
      const next = prev.map((ex, i) => {
        if (i !== exIdx) return ex;
        return {
          ...ex,
          sets: ex.sets.map((set, j) => {
            if (j !== setIdx) return set;
            const newCompleted = !set.completed;
            return { ...set, completed: newCompleted };
          }),
        };
      });

      const updatedSet = next[exIdx].sets[setIdx];
      syncToPermanentRecord(next, false);

      if (updatedSet.completed) {
        setRestSeconds(90);
        showToast(`Set #${updatedSet.setNumber} Logged! (${updatedSet.weightKg}kg × ${updatedSet.reps})`);
      }
      return next;
    });
  }

  function updateSetField(exIdx: number, setIdx: number, field: keyof SetState, val: number) {
    setExercises((prev) => {
      const next = prev.map((ex, i) => {
        if (i !== exIdx) return ex;
        return {
          ...ex,
          sets: ex.sets.map((set, j) => {
            if (j !== setIdx) return set;
            return { ...set, [field]: val };
          }),
        };
      });
      syncToPermanentRecord(next, false);
      return next;
    });
  }

  // ADD SET to exercise
  function handleAddSet(exIdx: number) {
    setExercises((prev) => {
      const next = prev.map((ex, i) => {
        if (i !== exIdx) return ex;
        const lastSet = ex.sets[ex.sets.length - 1];
        const newSetNumber = ex.sets.length + 1;
        const newSet: SetState = {
          setNumber: newSetNumber,
          weightKg: lastSet ? lastSet.weightKg : 50,
          reps: lastSet ? lastSet.reps : 10,
          rpe: 8.0,
          completed: false,
        };
        return {
          ...ex,
          targetSets: ex.sets.length + 1,
          sets: [...ex.sets, newSet],
        };
      });
      syncToPermanentRecord(next, false);
      return next;
    });
    showToast('Added +1 Set');
  }

  // REMOVE SET from exercise
  function handleRemoveSet(exIdx: number, setIdx: number) {
    setExercises((prev) => {
      const next = prev.map((ex, i) => {
        if (i !== exIdx) return ex;
        if (ex.sets.length <= 1) return ex;
        const filteredSets = ex.sets
          .filter((_, j) => j !== setIdx)
          .map((s, newIdx) => ({ ...s, setNumber: newIdx + 1 }));
        return {
          ...ex,
          targetSets: filteredSets.length,
          sets: filteredSets,
        };
      });
      syncToPermanentRecord(next, false);
      return next;
    });
  }

  // REMOVE ENTIRE EXERCISE / MOVEMENT
  function handleRemoveExercise(exIdx: number) {
    setExercises((prev) => {
      const next = prev.filter((_, i) => i !== exIdx);
      syncToPermanentRecord(next, false);
      return next;
    });
    showToast('Exercise removed from session');
  }

  // ADD NEW EXERCISE TO SESSION
  function handleAddExercise(item: any) {
    const newEx: ActiveExercise = {
      id: `${item.id}_${Date.now()}`,
      slug: item.slug,
      name: item.name,
      targetSets: 3,
      repRange: item.repRange || '10-12',
      youtubeUrls: item.youtube_urls,
      sets: [
        { setNumber: 1, weightKg: item.defaultWeight || 20, reps: item.defaultReps || 10, rpe: 8.0, completed: false },
        { setNumber: 2, weightKg: item.defaultWeight || 20, reps: item.defaultReps || 10, rpe: 8.0, completed: false },
        { setNumber: 3, weightKg: item.defaultWeight || 20, reps: item.defaultReps || 10, rpe: 8.5, completed: false },
      ],
    };

    setExercises((prev) => {
      const next = [...prev, newEx];
      syncToPermanentRecord(next, false);
      return next;
    });

    setShowAddModal(false);
    showToast(`Added ${item.name} to session!`);
  }

  function showToast(msg: string) {
    setLogToast(msg);
    setTimeout(() => {
      setLogToast(null);
    }, 3000);
  }

  function handleFinishSession() {
    syncToPermanentRecord(exercises, true);
    setFinished(true);
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (finished) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-6">
        <div className="inline-flex p-5 rounded-full bg-primary/20 text-primary mb-2 gym-glow animate-pulse">
          <Trophy className="w-14 h-14" />
        </div>
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          WORKOUT LOGGED TO RECORD! 🏋️‍♂️
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Saved permanently to your <span className="text-primary font-bold">Session History Record</span>.
        </p>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-3 gap-3 text-left">
          <Card className="bg-card border-border p-4 rounded-2xl">
            <p className="text-[11px] font-bold text-muted-foreground uppercase">TIME</p>
            <p className="text-xl font-black text-foreground">{formatTime(elapsedSeconds)}</p>
          </Card>
          <Card className="bg-card border-border p-4 rounded-2xl">
            <p className="text-[11px] font-bold text-muted-foreground uppercase">SETS LOGGED</p>
            <p className="text-xl font-black text-primary">{totalCompletedSets}</p>
          </Card>
          <Card className="bg-card border-border p-4 rounded-2xl">
            <p className="text-[11px] font-bold text-muted-foreground uppercase">CALORIES</p>
            <p className="text-xl font-black text-orange-500">🔥 {caloriesBurned} kcal</p>
          </Card>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => router.push('/progress')} variant="outline" className="flex-1 h-12 text-sm font-bold border-border bg-card text-foreground">
            VIEW WORKOUT LOGS
          </Button>
          <Button onClick={() => router.push('/today')} className="flex-1 h-12 text-sm font-black bg-primary text-primary-foreground hover:bg-primary/90">
            RETURN TO DASHBOARD
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Session Status Bar & Integrated Volume Warning Container */}
      <div className="sticky top-14 md:top-4 z-30 bg-card/95 border border-border p-3.5 md:p-4 rounded-2xl shadow-xl backdrop-blur-md space-y-2.5 transition-all">
        {/* Main Control Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-muted-foreground hover:text-foreground hover:bg-accent h-9 w-9 shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-black text-sm md:text-base text-foreground leading-tight">{sessionName}</h1>
              <p className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                <span className="text-primary font-bold">{totalCompletedSets} / {totalSetsCount} Sets Finished</span>
                <span>•</span>
                <span className="text-foreground font-semibold">{totalVolumeKg} kg lifted</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Real-time Calories Burned Indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-500 font-black text-xs">
              <Flame className="w-3.5 h-3.5 fill-current animate-pulse text-orange-500" />
              <span>{caloriesBurned} kcal</span>
            </div>

            <div className="flex items-center gap-1.5 text-sm font-mono font-black text-primary px-2.5 py-1 rounded-xl bg-primary/10 border border-primary/20">
              <Clock className="w-4 h-4 text-primary" />
              {formatTime(elapsedSeconds)}
            </div>

            <Button onClick={handleFinishSession} size="sm" className="font-black text-xs h-8 px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-md">
              FINISH
            </Button>
          </div>
        </div>

        {/* Integrated Session Volume & Safety Warning Bar (Sticky along with header) */}
        <div
          className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center justify-between gap-2 transition-all ${
            volumeStatus.type === 'high'
              ? 'bg-red-500/15 border-red-500/30 text-red-500'
              : volumeStatus.type === 'low'
              ? 'bg-amber-500/15 border-amber-500/30 text-amber-500'
              : 'bg-primary/10 border-primary/20 text-primary'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
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
            TARGET: {minRecommendedSets}-{maxRecommendedSets} SETS
          </span>
        </div>
      </div>

      {/* Floating Logged Toast Notification */}
      {logToast && (
        <div className="fixed bottom-20 right-6 z-50 bg-primary text-primary-foreground font-black px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs border border-primary/40 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 fill-current text-primary-foreground" />
          <span>{logToast}</span>
        </div>
      )}

      {/* Exercise Set Tracker Cards */}
      <div className="space-y-6">
        {exercises.map((ex, exIdx) => {
          const exCompletedSets = ex.sets.filter((s) => s.completed).length;
          const isExDone = exCompletedSets === ex.sets.length && ex.sets.length > 0;

          return (
            <Card key={ex.id} className={`bg-card border rounded-2xl overflow-hidden shadow-lg transition-all ${isExDone ? 'border-primary/50 bg-primary/5' : 'border-border'}`}>
              <CardHeader className="bg-muted/40 py-3.5 px-5 border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-extrabold text-foreground flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-primary" />
                    {exIdx + 1}. {ex.name}
                  </CardTitle>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-foreground bg-secondary px-2.5 py-1 rounded-lg border border-border">
                      <span className="text-primary font-black">{exCompletedSets}</span> / {ex.sets.length} Sets Done
                    </span>

                    {/* Remove Entire Movement Button */}
                    <button
                      onClick={() => handleRemoveExercise(exIdx)}
                      className="p-1 text-muted-foreground hover:text-red-500 transition-colors"
                      title="Remove Exercise"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-3">
                <div className="mb-4">
                  {ex.youtubeUrls && ex.youtubeUrls.length > 0 ? (
                    <div className="flex gap-4 overflow-x-auto pb-2 snap-x scrollbar-hide">
                      {ex.youtubeUrls.map((url, i) => (
                        <div key={i} className="min-w-[280px] sm:min-w-[320px] snap-start shrink-0">
                          <YouTubeEmbed url={url} title={`${ex.name} Demo ${i+1}`} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <YouTubeEmbed url={undefined} title={`${ex.name} Demo`} />
                  )}
                </div>
                <div className="grid grid-cols-12 gap-2 text-[11px] font-black uppercase text-muted-foreground px-2 tracking-wider">
                  <div className="col-span-2">SET</div>
                  <div className="col-span-4 text-center">WEIGHT (KG)</div>
                  <div className="col-span-4 text-center">REPS</div>
                  <div className="col-span-2 text-right">LOG / DEL</div>
                </div>

                {ex.sets.map((set, setIdx) => (
                  <div
                    key={set.setNumber}
                    className={`grid grid-cols-12 gap-2 items-center p-2.5 rounded-xl transition-all ${
                      set.completed
                        ? 'bg-primary/15 border-2 border-primary shadow-lg shadow-primary/10'
                        : 'bg-background border border-border'
                    }`}
                  >
                    <div className="col-span-2 font-black text-xs text-muted-foreground pl-2 flex items-center gap-1.5">
                      <span>#{set.setNumber}</span>
                      {set.completed && (
                        <span className="text-[10px] font-black bg-primary text-primary-foreground px-1.5 py-0.5 rounded shadow">
                          DONE
                        </span>
                      )}
                    </div>

                    <div className="col-span-4">
                      <Input
                        type="number"
                        step="0.5"
                        value={set.weightKg}
                        onChange={(e) => updateSetField(exIdx, setIdx, 'weightKg', Number(e.target.value))}
                        className={`h-10 text-center font-black text-base bg-card text-foreground ${set.completed ? 'border-primary/60 font-black text-primary' : 'border-border'}`}
                      />
                    </div>

                    <div className="col-span-4">
                      <Input
                        type="number"
                        value={set.reps}
                        onChange={(e) => updateSetField(exIdx, setIdx, 'reps', Number(e.target.value))}
                        className={`h-10 text-center font-black text-base bg-card text-foreground ${set.completed ? 'border-primary/60 font-black text-primary' : 'border-border'}`}
                      />
                    </div>

                    <div className="col-span-2 flex items-center justify-end gap-1.5 pr-1">
                      {ex.sets.length > 1 && (
                        <button
                          onClick={() => handleRemoveSet(exIdx, setIdx)}
                          className="p-1 text-muted-foreground hover:text-red-500 transition-colors"
                          title="Remove Set"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => toggleSetCompletion(exIdx, setIdx)}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                          set.completed
                            ? 'bg-primary text-primary-foreground font-black shadow-md shadow-primary/30 scale-105 ring-2 ring-primary/40'
                            : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[4px]" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add Set Button per Exercise */}
                <div className="pt-2 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddSet(exIdx)}
                    className="gap-1.5 text-xs font-bold border-border bg-background text-primary hover:bg-primary/10 hover:border-primary/40"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Set
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Add New Exercise to Session Button */}
        <div className="pt-4 flex justify-center">
          <Button
            onClick={() => setShowAddModal(true)}
            className="gap-2 font-black text-xs h-11 px-6 bg-card border border-border hover:border-primary text-primary hover:bg-accent rounded-xl"
          >
            <Plus className="w-4 h-4" />
            Add Exercise to Routine
          </Button>
        </div>
      </div>

      {/* Modal: Add Exercise Selector */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="bg-card border-border max-w-lg w-full p-6 space-y-4 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-black text-foreground flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-primary" />
                Select Movement to Add
              </CardTitle>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search movements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-11 bg-background border-border text-foreground font-medium"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {['All', 'Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Core'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMuscle(m)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${
                      selectedMuscle === m
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                        : 'bg-background text-muted-foreground border-border hover:border-primary/50'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1 mt-4">
              {isFetchingExercises ? (
                <div className="p-8 text-center text-muted-foreground text-sm font-semibold">Loading library...</div>
              ) : (
                dbExercises
                  .filter((ex) => {
                    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
                    const targetLower = (ex.target_muscle || '').toLowerCase();
                    let matchesMuscle = selectedMuscle === 'All';
                    if (!matchesMuscle) {
                      matchesMuscle = targetLower.includes(selectedMuscle.toLowerCase());
                    }
                    return matchesSearch && matchesMuscle;
                  })
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleAddExercise(item);
                        setSearchQuery('');
                        setSelectedMuscle('All');
                      }}
                      className="w-full p-3.5 rounded-xl bg-background border border-border hover:border-primary/50 hover:bg-accent text-left flex items-center justify-between transition-all group"
                    >
                      <div>
                        <h4 className="font-extrabold text-sm text-foreground group-hover:text-primary">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">Target: {item.target_muscle || 'General'}</p>
                      </div>
                      <Plus className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    </button>
                  ))
              )}
              {!isFetchingExercises && dbExercises.length > 0 && dbExercises.filter((ex) => {
                const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
                const targetLower = (ex.target_muscle || '').toLowerCase();
                return matchesSearch && (selectedMuscle === 'All' || targetLower.includes(selectedMuscle.toLowerCase()));
              }).length === 0 && (
                <div className="p-8 text-center text-muted-foreground text-sm font-semibold">
                  No movements found. Try adjusting your filters.
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
      {/* Floating Rest Timer */}
      {restSeconds !== null && restSeconds > 0 && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-black text-sm shadow-2xl border border-primary/40 animate-fade-in">
          <Timer className="w-5 h-5 animate-spin" />
          <span>Rest: {formatTime(restSeconds)}</span>
          <button
            onClick={() => setRestSeconds(null)}
            className="ml-2 p-1 hover:bg-primary-foreground/20 rounded text-primary-foreground font-bold"
            title="Skip Rest"
          >
            <X className="w-4 h-4 stroke-[3px]" />
          </button>
        </div>
      )}
    </div>
  );
}
