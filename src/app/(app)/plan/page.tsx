'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Dumbbell, Sparkles, CheckCircle2, Sliders, Play, BedDouble } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getGuestData, getWorkoutHistoryRecords } from '@/stores/guest-store';
import { getSplitForDays, getSplitPlanTitle, SplitDayInfo } from '@/utils/split-generator';
import { MuscleIcon } from '@/components/exercises/MuscleIcon';

export default function WeeklyPlanPage() {
  const [profile, setProfile] = useState<any>(null);
  const [days, setDays] = useState<SplitDayInfo[]>([]);
  const [todayDayOfWeek, setTodayDayOfWeek] = useState<string>('');
  const [completedDayIndices, setCompletedDayIndices] = useState<number[]>([]);

  useEffect(() => {
    const guest = getGuestData();
    const prof = guest.profile || {};
    setProfile(prof);

    const daysPerWeek = prof.training_days_per_week || 3;
    const splitSchedule = getSplitForDays(daysPerWeek, prof.preferred_days);
    setDays(splitSchedule);

    // Get current day of week
    const now = new Date();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDayName = dayNames[now.getDay()];
    setTodayDayOfWeek(currentDayName);

    // Check sessions completed this week
    const history = getWorkoutHistoryRecords();
    const startOfWeek = new Date(now);
    const dayDiff = (now.getDay() + 6) % 7; // Monday = 0
    startOfWeek.setDate(now.getDate() - dayDiff);
    startOfWeek.setHours(0, 0, 0, 0);

    const thisWeekCompletedDays: number[] = [];
    history.forEach((sess) => {
      const sessDate = new Date(sess.startedAt);
      if (sessDate >= startOfWeek) {
        thisWeekCompletedDays.push(sessDate.getDay());
      }
    });
    setCompletedDayIndices(thisWeekCompletedDays);
  }, []);

  const daysPerWeek = profile?.training_days_per_week || 3;
  const planTitle = getSplitPlanTitle(daysPerWeek);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
              {daysPerWeek} DAYS / WEEK
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs font-semibold text-muted-foreground">
              {profile?.workout_duration_minutes || 60} MIN SESSIONS
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            Weekly Training Split
          </h1>
          <p className="text-muted-foreground text-sm font-medium">{planTitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/profile">
            <Button variant="outline" className="gap-2 text-xs font-bold border-border">
              <Sliders className="w-4 h-4 text-primary" />
              Adjust Schedule
            </Button>
          </Link>
          <Link href="/workout/day-1">
            <Button className="gap-2 text-xs font-black bg-primary hover:bg-primary/80 text-primary-foreground">
              <Play className="w-4 h-4 fill-current" />
              Start Workout
            </Button>
          </Link>
        </div>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {days.map((item) => {
          const isToday = item.dayOfWeek === todayDayOfWeek;
          const isCompleted = completedDayIndices.includes(item.dayIndex);

          let statusTheme = 'border-border bg-card';
          if (isToday) {
            statusTheme = 'border-primary ring-2 ring-primary/30 bg-primary/5';
          } else if (isCompleted) {
            statusTheme = 'border-emerald-500/40 bg-emerald-500/5';
          } else if (!item.isTrainingDay) {
            statusTheme = 'border-border/60 bg-muted/20 opacity-85';
          }

          return (
            <Card
              key={item.dayOfWeek}
              className={`border transition-all flex flex-col justify-between rounded-xl overflow-hidden ${statusTheme}`}
            >
              <CardHeader className="p-3 pb-2 border-b border-border/50 flex flex-row items-center justify-between space-y-0">
                <span className="font-extrabold text-xs uppercase tracking-wider text-muted-foreground">
                  {item.shortDay}
                </span>

                <div className="flex items-center gap-1">
                  {isCompleted && (
                    <span title="Completed this week">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </span>
                  )}
                  {isToday && (
                    <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-black tracking-wide">
                      TODAY
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-3 space-y-3 flex-1 flex flex-col justify-between">
                {item.isTrainingDay && item.workout ? (
                  <>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <MuscleIcon
                          muscleSlug={item.workout.muscleSlug}
                          className="w-5 h-5 flex-shrink-0"
                        />
                        <h4 className="font-bold text-sm text-foreground leading-tight">
                          {item.workout.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-2">
                        {item.workout.focus}
                      </p>
                    </div>

                    <div className="text-[10px] text-muted-foreground pt-2 border-t border-border flex items-center justify-between font-semibold">
                      <span className="flex items-center gap-1">
                        <Dumbbell className="w-3 h-3 text-primary" />
                        {item.workout.exercises} Exercises
                      </span>
                      <span>{item.workout.sets} Sets</span>
                    </div>
                  </>
                ) : (
                  <div className="py-5 text-center space-y-1.5">
                    <BedDouble className="w-6 h-6 text-muted-foreground/50 mx-auto" />
                    <h4 className="font-bold text-xs text-muted-foreground">Rest & Recovery</h4>
                    <p className="text-[10px] text-muted-foreground/70">Muscle repair & adaptation</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
