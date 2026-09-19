'use client';

import { useState, useEffect } from 'react';
import { User, Dumbbell, Save, CheckCircle2, Flame, Sun, Moon, Calendar, Clock, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getGuestData, saveGuestData } from '@/stores/guest-store';
import { ORDERED_DAYS, DEFAULT_PREFERRED_DAYS, getSplitPlanTitle } from '@/utils/split-generator';
import { DayOfWeek } from '@/types/database';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [primaryGoal, setPrimaryGoal] = useState<string>('');
  const [secondaryGoals, setSecondaryGoals] = useState<string[]>([]);
  const [mode, setMode] = useState<string>('dark');
  const [theme, setTheme] = useState<string>('theme-emerald');
  const [saved, setSaved] = useState(false);

  const PRIMARY_GOALS = [
    { slug: 'build-muscle', label: 'Build Muscle' },
    { slug: 'lose-fat', label: 'Lose Fat' },
    { slug: 'body-recomposition', label: 'Body Recomposition' },
    { slug: 'increase-strength', label: 'Increase Strength' },
    { slug: 'improve-general-fitness', label: 'Improve General Fitness' },
    { slug: 'improve-endurance', label: 'Improve Endurance' },
    { slug: 'improve-athletic-performance', label: 'Improve Athletic Performance' },
    { slug: 'maintain-fitness', label: 'Maintain Fitness' },
  ];

  const SECONDARY_GOALS = [
    { slug: 'improve-strength', label: 'Improve Strength' },
    { slug: 'build-more-muscle', label: 'Build More Muscle' },
    { slug: 'reduce-body-fat', label: 'Reduce Body Fat' },
    { slug: 'improve-endurance-sec', label: 'Improve Endurance' },
    { slug: 'improve-mobility', label: 'Improve Mobility & Flexibility' },
    { slug: 'improve-core-strength', label: 'Improve Core Strength' },
    { slug: 'improve-posture', label: 'Improve Posture' },
    { slug: 'improve-cardio', label: 'Improve Cardiovascular Fitness' },
    { slug: 'increase-consistency', label: 'Increase Training Consistency' },
    { slug: 'improve-athleticism', label: 'Improve Athleticism' },
    { slug: 'improve-muscle-definition', label: 'Improve Muscle Definition' },
    { slug: 'improve-balance', label: 'Improve Balance & Stability' },
  ];

  const THEMES = [
    { id: 'theme-emerald', label: 'Electric Emerald', colorClass: 'bg-emerald-500' },
    { id: 'theme-orange', label: 'Neon Orange', colorClass: 'bg-orange-500' },
    { id: 'theme-blue', label: 'Ocean Blue', colorClass: 'bg-blue-500' },
    { id: 'theme-purple', label: 'Cyberpunk Purple', colorClass: 'bg-purple-500' },
  ];

  const DURATIONS = [30, 45, 60, 75, 90];
  const LEVELS = [
    { slug: 'beginner', label: 'Beginner', desc: '< 1 year lifting' },
    { slug: 'intermediate', label: 'Intermediate', desc: '1 - 3 years lifting' },
    { slug: 'advanced', label: 'Advanced', desc: '3+ years structured lifting' },
  ];

  useEffect(() => {
    const data = getGuestData();
    const loadedProfile = {
      training_days_per_week: 3,
      preferred_days: ['monday', 'wednesday', 'friday'],
      workout_duration_minutes: 60,
      training_level: 'beginner',
      ...data.profile,
    };
    setProfile(loadedProfile);
    const prim = data.goals?.find(g => g.isPrimary)?.goalSlug || 'build-muscle';
    setPrimaryGoal(prim);
    setSecondaryGoals(data.goals?.filter(g => !g.isPrimary).map(g => g.goalSlug) || []);
    
    const savedMode = localStorage.getItem('gympilot_mode') || 'dark';
    const savedTheme = localStorage.getItem('gympilot_theme') || 'theme-emerald';
    setMode(savedMode);
    setTheme(savedTheme);
  }, []);

  const getFilteredSecondaryGoals = (primarySlug: string) => {
    const overlaps: Record<string, string[]> = {
      'build-muscle': ['build-more-muscle'],
      'lose-fat': ['reduce-body-fat'],
      'increase-strength': ['improve-strength'],
      'improve-endurance': ['improve-endurance-sec', 'improve-cardio'],
      'improve-athletic-performance': ['improve-athleticism'],
      'body-recomposition': ['build-more-muscle', 'reduce-body-fat'],
    };
    const toHide = overlaps[primarySlug] || [];
    return SECONDARY_GOALS.filter(g => !toHide.includes(g.slug));
  };

  const toggleSecondaryGoal = (slug: string) => {
    setSecondaryGoals(prev => {
      if (prev.includes(slug)) return prev.filter(s => s !== slug);
      if (prev.length >= 2) return prev; // max 2
      return [...prev, slug];
    });
  };

  const handleDaysPerWeekChange = (days: number) => {
    if (!profile) return;
    const currentPreferred: DayOfWeek[] = profile.preferred_days || [];
    let updatedPreferred = [...currentPreferred];
    
    if (updatedPreferred.length > days) {
      updatedPreferred = updatedPreferred.slice(0, days);
    } else if (updatedPreferred.length < days) {
      const defaults = DEFAULT_PREFERRED_DAYS[days] || [];
      for (const d of defaults) {
        if (!updatedPreferred.includes(d) && updatedPreferred.length < days) {
          updatedPreferred.push(d);
        }
      }
    }

    setProfile({
      ...profile,
      training_days_per_week: days,
      preferred_days: updatedPreferred,
    });
  };

  const togglePreferredDay = (day: DayOfWeek) => {
    if (!profile) return;
    const current: DayOfWeek[] = profile.preferred_days || [];
    const maxDays = profile.training_days_per_week || 3;

    if (current.includes(day)) {
      if (current.length <= 1) return; // Must have at least 1
      setProfile({
        ...profile,
        preferred_days: current.filter(d => d !== day),
      });
    } else {
      if (current.length >= maxDays) {
        // Replace oldest or shift
        const shifted = [...current.slice(1), day];
        setProfile({
          ...profile,
          preferred_days: shifted,
        });
      } else {
        setProfile({
          ...profile,
          preferred_days: [...current, day],
        });
      }
    }
  };

  const applyThemeSettings = (newMode: string, newTheme: string) => {
    setMode(newMode);
    setTheme(newTheme);
    localStorage.setItem('gympilot_mode', newMode);
    localStorage.setItem('gympilot_theme', newTheme);
    
    const html = document.documentElement;
    const allThemes = THEMES.map(t => t.id);
    html.classList.remove('dark', ...allThemes);
    
    if (newMode === 'dark') html.classList.add('dark');
    if (newTheme) html.classList.add(newTheme);
  };

  function handleSave() {
    const current = getGuestData();
    const newGoals = [
      { goalSlug: primaryGoal, isPrimary: true },
      ...secondaryGoals.map(slug => ({ goalSlug: slug, isPrimary: false }))
    ];
    saveGuestData({
      ...current,
      profile,
      goals: newGoals,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!profile) return null;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <User className="w-6 h-6 text-primary" />
          Lifter Profile & Parameters
        </h1>
        <p className="text-muted-foreground text-sm font-medium">Manage your goals, biometrics & appearance settings</p>
      </div>

      {/* Theme & Appearance Selection */}
      <Card className="bg-card border-border p-6 space-y-5 rounded-2xl">
        <CardTitle className="text-base font-extrabold text-foreground flex items-center gap-2">
          <Flame className="w-5 h-5 text-primary" />
          Appearance & Theme
        </CardTitle>

        {/* Light vs Dark Mode */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground">Color Mode</label>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <button
              type="button"
              onClick={() => applyThemeSettings('dark', theme)}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                mode === 'dark'
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'bg-background border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <Moon className="w-4 h-4" />
              Dark Mode
            </button>

            <button
              type="button"
              onClick={() => applyThemeSettings('light', theme)}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                mode === 'light'
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'bg-background border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <Sun className="w-4 h-4" />
              Light Mode
            </button>
          </div>
        </div>

        {/* Accent Colors */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground">Accent Color</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {THEMES.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => applyThemeSettings(mode, t.id)}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  theme === t.id
                    ? 'bg-primary/20 border-primary text-foreground font-bold'
                    : 'bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                <div className={`w-6 h-6 rounded-full ${t.colorClass} shadow-md`} />
                <span className="text-xs">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Fitness Target Form */}
      <Card className="bg-card border-border p-6 space-y-5 rounded-2xl">
        <CardTitle className="text-base font-extrabold text-foreground flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-primary" />
          Primary Fitness Goal (Choose 1)
        </CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRIMARY_GOALS.map(goal => (
            <button
              key={goal.slug}
              type="button"
              onClick={() => {
                setPrimaryGoal(goal.slug);
                const validSecondary = getFilteredSecondaryGoals(goal.slug).map(g => g.slug);
                setSecondaryGoals(prev => prev.filter(s => validSecondary.includes(s)));
              }}
              className={`p-4 rounded-xl border text-left transition-all text-sm ${
                primaryGoal === goal.slug
                  ? 'bg-primary/20 border-primary text-primary font-bold'
                  : 'bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {goal.label}
            </button>
          ))}
        </div>

        <CardTitle className="text-base font-extrabold text-foreground flex items-center gap-2 pt-4 border-t border-border">
          <Dumbbell className="w-5 h-5 text-primary" />
          Secondary Goals (Choose up to 2)
        </CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {getFilteredSecondaryGoals(primaryGoal).map(goal => {
            const isSelected = secondaryGoals.includes(goal.slug);
            const isDisabled = !isSelected && secondaryGoals.length >= 2;
            return (
              <button
                key={goal.slug}
                type="button"
                onClick={() => toggleSecondaryGoal(goal.slug)}
                disabled={isDisabled}
                className={`p-3 rounded-xl border text-left transition-all text-xs ${
                  isSelected
                    ? 'bg-primary/20 border-primary text-primary font-bold'
                    : isDisabled 
                      ? 'bg-muted/40 border-border text-muted-foreground/50 cursor-not-allowed'
                      : 'bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {goal.label}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Training Schedule & Split Configuration */}
      <Card className="bg-card border-border p-6 space-y-6 rounded-2xl">
        <div>
          <CardTitle className="text-base font-extrabold text-foreground flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Training Schedule & Split
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Configure how many days you can train each week and your preferred workout routine.
          </p>
        </div>

        {/* Days Per Week */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Training Frequency
            </label>
            <span className="text-xs font-black text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
              {profile.training_days_per_week || 3} Days / Week
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => {
              const isSelected = (profile.training_days_per_week || 3) === num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleDaysPerWeekChange(num)}
                  className={`py-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-primary border-primary text-primary-foreground font-black shadow-md shadow-primary/25 scale-[1.02]'
                      : 'bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                  }`}
                >
                  <span className="text-base font-extrabold">{num}</span>
                  <span className="text-[10px] uppercase font-bold opacity-80">
                    {num === 1 ? 'day' : 'days'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-primary/5 border border-primary/15 text-xs text-foreground flex items-center justify-between">
            <span className="font-semibold text-muted-foreground">Generated Protocol:</span>
            <span className="font-bold text-primary">{getSplitPlanTitle(profile.training_days_per_week || 3)}</span>
          </div>
        </div>

        {/* Preferred Days of the Week */}
        <div className="space-y-2.5 pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Preferred Workout Days
            </label>
            <span className="text-xs font-medium text-muted-foreground">
              Select <strong className="text-foreground">{profile.training_days_per_week || 3}</strong> days
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {ORDERED_DAYS.map((day) => {
              const isPreferred = (profile.preferred_days || []).includes(day.slug);
              return (
                <button
                  key={day.slug}
                  type="button"
                  onClick={() => togglePreferredDay(day.slug)}
                  className={`py-2.5 px-1 rounded-xl border text-center transition-all text-xs font-bold ${
                    isPreferred
                      ? 'bg-primary/20 border-primary text-primary shadow-sm'
                      : 'bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  <div>{day.short}</div>
                  <div className="text-[9px] font-normal opacity-70 mt-0.5">
                    {isPreferred ? 'ON' : 'REST'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Session Duration & Experience Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" /> Target Workout Duration
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {DURATIONS.map((mins) => {
                const isSelected = (profile.workout_duration_minutes || 60) === mins;
                return (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setProfile({ ...profile, workout_duration_minutes: mins })}
                    className={`py-2 rounded-lg border text-center text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'bg-background border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {mins}m
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-primary" /> Training Experience
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {LEVELS.map((lvl) => {
                const isSelected = (profile.training_level || 'beginner') === lvl.slug;
                return (
                  <button
                    key={lvl.slug}
                    type="button"
                    onClick={() => setProfile({ ...profile, training_level: lvl.slug })}
                    className={`py-2 px-1 rounded-lg border text-center text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'bg-background border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {lvl.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Biometrics Form */}
      <Card className="bg-card border-border p-6 space-y-5 rounded-2xl">
        <CardTitle className="text-base font-extrabold text-foreground flex items-center gap-2">
          <Flame className="w-5 h-5 text-primary" />
          Physical Biometrics
        </CardTitle>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Athlete Name</label>
            <Input
              value={profile.name ?? ''}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="bg-background border-border text-foreground font-semibold"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Age</label>
            <Input
              type="number"
              value={profile.age ?? 25}
              onChange={(e) => setProfile({ ...profile, age: e.target.value === '' ? '' : Number(e.target.value) })}
              className="bg-background border-border text-foreground font-semibold"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Height (cm)</label>
            <Input
              type="number"
              value={profile.height_cm ?? 175}
              onChange={(e) => setProfile({ ...profile, height_cm: e.target.value === '' ? '' : Number(e.target.value) })}
              className="bg-background border-border text-foreground font-semibold"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Weight (kg)</label>
            <Input
              type="number"
              value={profile.weight_kg ?? 70}
              onChange={(e) => setProfile({ ...profile, weight_kg: e.target.value === '' ? '' : Number(e.target.value) })}
              className="bg-background border-border text-foreground font-semibold"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          {saved ? (
            <span className="text-xs font-bold text-primary flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Parameters Saved!
            </span>
          ) : <span />}

          <Button onClick={handleSave} className="gap-2 text-xs font-black bg-primary hover:bg-primary/80 text-primary-foreground px-5">
            <Save className="w-4 h-4" />
            SAVE PROFILE
          </Button>
        </div>
      </Card>
    </div>
  );
}
