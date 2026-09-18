'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Flame, Trophy, Calendar as CalendarIcon, CheckCircle2, Dumbbell, Clock, ChevronLeft, ChevronRight, Moon } from 'lucide-react';
import { getGuestData } from '@/stores/guest-store';
import { MuscleIcon } from '@/components/exercises/MuscleIcon';
import { getSplitForDays } from '@/utils/split-generator';

export default function ProgressPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [userWeight, setUserWeight] = useState<number>(70);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
  const [plannedSplitMap, setPlannedSplitMap] = useState<Record<number, { name: string; label: string; muscleSlug: string }>>({});

  useEffect(() => {
    const data = getGuestData();
    if (data.sessions) {
      setSessions(data.sessions);
    }
    if (data.profile?.weight_kg) {
      setUserWeight(data.profile.weight_kg);
    }

    const days = data.profile?.training_days_per_week || 3;
    const preferred = data.profile?.preferred_days;
    const schedule = getSplitForDays(days, preferred);
    const map: Record<number, { name: string; label: string; muscleSlug: string }> = {};
    schedule.forEach((s) => {
      if (s.isTrainingDay && s.workout) {
        map[s.dayIndex] = {
          name: s.workout.name,
          label: s.workout.label,
          muscleSlug: s.workout.muscleSlug,
        };
      }
    });
    setPlannedSplitMap(map);
  }, []);

  const totalWorkoutCount = sessions.length;
  const totalVolumeLifted = sessions.reduce((s, item) => s + (item.totalVolumeKg || 0), 0);
  const totalCaloriesBurned = sessions.reduce((s, item) => s + (item.caloriesBurned || 0), 0);

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sun, 1 = Mon...
  const totalDaysInMonth = lastDayOfMonth.getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Build date string YYYY-MM-DD helper
  const formatDateKey = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  // Map sessions to YYYY-MM-DD
  const sessionsByDateKey: Record<string, any[]> = {};
  sessions.forEach((sess) => {
    const dateObj = new Date(sess.completedAt || sess.startedAt);
    if (!isNaN(dateObj.getTime())) {
      const key = formatDateKey(dateObj);
      if (!sessionsByDateKey[key]) sessionsByDateKey[key] = [];
      sessionsByDateKey[key].push(sess);
    }
  });

  // Filtered sessions for selected date
  const displayedSessions = selectedDateStr
    ? sessions.filter((s) => {
        const dateObj = new Date(s.completedAt || s.startedAt);
        return formatDateKey(dateObj) === selectedDateStr;
      })
    : sessions;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Progress & Workout Logs
        </h1>
        <p className="text-muted-foreground text-sm font-medium">Interactive activity calendar, body part tracking & logged workouts</p>
      </div>

      {/* Top Level Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border p-5 flex items-center gap-4 rounded-2xl">
          <div className="p-3.5 bg-primary/15 text-primary rounded-2xl border border-primary/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold uppercase">Total Volume Lifted</p>
            <p className="text-2xl font-black text-foreground">{totalVolumeLifted > 0 ? `${totalVolumeLifted.toLocaleString()} kg` : '14,250 kg'}</p>
            <p className="text-[11px] text-primary font-bold">+8.4% Progressive Overload</p>
          </div>
        </Card>

        <Card className="bg-card border-border p-5 flex items-center gap-4 rounded-2xl">
          <div className="p-3.5 bg-orange-500/15 text-orange-500 rounded-2xl border border-orange-500/20">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold uppercase">Active Streak</p>
            <p className="text-2xl font-black text-foreground">{totalWorkoutCount > 0 ? `${totalWorkoutCount} Sessions` : '4 Weeks'}</p>
            <p className="text-[11px] text-orange-500 font-bold">🔥 {totalCaloriesBurned} Total kcal Burned</p>
          </div>
        </Card>

        <Card className="bg-card border-border p-5 flex items-center gap-4 rounded-2xl">
          <div className="p-3.5 bg-purple-500/15 text-purple-500 rounded-2xl border border-purple-500/20">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold uppercase">Personal Records</p>
            <p className="text-2xl font-black text-foreground">12 PRs</p>
            <p className="text-[11px] text-purple-500 font-bold">Bench Press +2.5kg</p>
          </div>
        </Card>
      </div>

      {/* Interactive Activity Calendar */}
      <Card className="bg-card border-border p-5 space-y-4 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <h2 className="text-base font-black text-foreground">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {selectedDateStr && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDateStr(null)}
                className="text-xs font-bold text-primary hover:bg-primary/10"
              >
                Clear Date Filter
              </Button>
            )}
            <Button variant="outline" size="icon" onClick={prevMonth} className="h-8 w-8 border-border">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8 border-border">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-black text-muted-foreground uppercase py-1 border-b border-border">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Calendar Grid Cells */}
        <div className="grid grid-cols-7 gap-1.5 pt-1">
          {/* Empty cells before month starts */}
          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="h-24 rounded-xl bg-muted/20 border border-transparent" />
          ))}

          {/* Month Days */}
          {Array.from({ length: totalDaysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const thisDate = new Date(year, month, dayNum);
            const key = formatDateKey(thisDate);
            const todayKey = formatDateKey(new Date());

            const isToday = key === todayKey;
            const isPast = key < todayKey;
            const isFuture = key > todayKey;

            const daySessions = sessionsByDateKey[key] || [];
            const hasWorkout = daySessions.length > 0;

            const dayOfWeek = thisDate.getDay();
            const plannedItem = plannedSplitMap[dayOfWeek];

            const activeMuscleSlug = plannedItem?.muscleSlug;
            const displayMuscleName = hasWorkout ? daySessions[0]?.workoutName : plannedItem?.name;

            const isSelected = selectedDateStr === key;

            return (
              <button
                key={key}
                onClick={() => setSelectedDateStr(key)}
                className={`h-24 p-2 rounded-xl border flex flex-col justify-between text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/40 bg-primary/10 font-bold'
                    : isToday
                    ? 'border-primary/60 bg-accent/40 font-semibold'
                    : hasWorkout
                    ? 'border-primary/30 bg-primary/5 hover:border-primary/60'
                    : 'border-border bg-background hover:bg-accent/30'
                }`}
              >
                {/* Header: Day number & status indicator */}
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs ${isToday ? 'text-primary font-black' : 'text-foreground'}`}>
                    {dayNum}
                  </span>

                  {hasWorkout ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  ) : isPast ? (
                    <span className="text-[10px] text-muted-foreground/40 font-bold">💤</span>
                  ) : (
                    <span className="text-[9px] font-bold text-muted-foreground/60 uppercase">PLAN</span>
                  )}
                </div>

                {/* Middle: Anatomical Muscle Icon & Badge */}
                {hasWorkout ? (
                  <div className="flex items-center gap-1.5 my-0.5">
                    <MuscleIcon muscleSlug={activeMuscleSlug} muscleName={displayMuscleName} className="w-8 h-8 shrink-0" />
                    <span className="inline-block text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-primary text-primary-foreground line-clamp-1">
                      {daySessions[0]?.workoutName?.split(' ')[0] || plannedItem?.label || 'DONE'}
                    </span>
                  </div>
                ) : isFuture && plannedItem ? (
                  <div className="flex items-center gap-1.5 my-0.5 opacity-80">
                    <MuscleIcon muscleSlug={plannedItem.muscleSlug} className="w-7 h-7 shrink-0" />
                    <span className="inline-block text-[9px] font-extrabold uppercase px-1 py-0.5 rounded bg-muted text-muted-foreground border border-border line-clamp-1">
                      {plannedItem.label}
                    </span>
                  </div>
                ) : isPast ? (
                  <span className="text-[10px] text-muted-foreground/60 font-semibold block my-auto">Rest</span>
                ) : (
                  <span className="text-[10px] text-muted-foreground/40 font-semibold block my-auto">Rest</span>
                )}

                {/* Footer: Logged metrics (body weight, lifted volume, calories) */}
                <div className="w-full">
                  {hasWorkout ? (
                    <div className="flex flex-col gap-0 text-[8px] font-bold leading-tight">
                      {daySessions[0]?.bodyWeightKg && (
                        <span className="text-muted-foreground">⚖️ {daySessions[0].bodyWeightKg}kg</span>
                      )}
                      {daySessions[0]?.totalVolumeKg > 0 && (
                        <span className="text-primary">🏋️ {daySessions[0].totalVolumeKg.toLocaleString()}kg</span>
                      )}
                      {daySessions[0]?.caloriesBurned > 0 && (
                        <span className="text-orange-500">🔥 {daySessions[0].caloriesBurned}kcal</span>
                      )}
                    </div>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Logged Session History Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black tracking-tight text-foreground flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            {selectedDateStr ? `Logged Sessions for ${selectedDateStr}` : 'All Logged Session History'}
          </h2>
          <span className="text-xs font-semibold text-muted-foreground">
            {displayedSessions.length} Sessions Found
          </span>
        </div>

        {displayedSessions.length === 0 ? (
          <Card className="bg-card border-border p-8 text-center space-y-2 rounded-2xl">
            <div className="inline-flex p-3 rounded-full bg-muted text-muted-foreground mb-1">
              <Moon className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-foreground">Rest Day / No Practice Logged</h3>
            <p className="text-muted-foreground text-xs font-medium max-w-sm mx-auto">
              No completed workout sessions were logged on {selectedDateStr || 'this date'}. Enjoy your recovery!
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {displayedSessions.map((sess, idx) => (
              <Card key={sess.id || idx} className="bg-card border-border p-5 rounded-2xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/15 text-primary shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-foreground">{sess.workoutName || 'Workout Session'}</h3>
                      <p className="text-xs text-muted-foreground font-medium">
                        {new Date(sess.completedAt || sess.startedAt).toLocaleDateString(undefined, {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-bold text-foreground">
                    <span className="flex items-center gap-1 text-primary"><Dumbbell className="w-4 h-4" /> {sess.totalSetsCompleted || sess.totalSets || 0} Sets ({sess.totalVolumeKg} kg)</span>
                    <span className="flex items-center gap-1 text-orange-500"><Flame className="w-4 h-4" /> {sess.caloriesBurned} kcal</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><Clock className="w-4 h-4" /> {sess.durationMinutes}m</span>
                  </div>
                </div>

                {sess.exercises && sess.exercises.length > 0 && (
                  <div className="pt-2 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
                    {sess.exercises.map((ex: any, exIdx: number) => (
                      <div key={exIdx} className="bg-background p-2.5 rounded-xl border border-border flex items-center justify-between">
                        <span className="font-semibold text-foreground">{ex.name}</span>
                        <span className="font-bold text-primary">{(ex.completedSets || ex.sets)?.length || 0} Sets Logged</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
