'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dumbbell, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { updateGuestProfile, getGuestData, saveGuestData } from '@/stores/guest-store';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Athlete',
    age: 25,
    gender: 'male',
    height_cm: 175,
    weight_kg: 70,
    goal: 'build-muscle',
    days_per_week: 4,
    workout_duration: 60,
    training_level: 'intermediate',
    equipment: ['barbell', 'dumbbells', 'cable-machine', 'bench', 'pull-up-bar'],
    injuries: '',
  });

  function handleNext() {
    if (step < 5) {
      setStep((prev) => prev + 1);
    } else {
      // Save onboarding choices to guest store
      const current = getGuestData();
      const updated = {
        ...current,
        profile: {
          ...current.profile,
          name: formData.name,
          age: formData.age,
          height_cm: formData.height_cm,
          weight_kg: formData.weight_kg,
          training_level: formData.training_level as any,
          training_days_per_week: formData.days_per_week,
          workout_duration_minutes: formData.workout_duration,
          available_equipment: formData.equipment,
        },
        goals: [{ goalSlug: formData.goal, isPrimary: true }],
      };
      saveGuestData(updated);
      router.push('/today');
    }
  }

  function handleBack() {
    if (step > 1) setStep((prev) => prev - 1);
  }

  const toggleEquipment = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      equipment: prev.equipment.includes(item)
        ? prev.equipment.filter((e) => e !== item)
        : [...prev.equipment, item],
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex bg-primary/20 p-3 rounded-full mb-1">
            <Dumbbell className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Setup Your GymPilot Profile</h1>
          <p className="text-zinc-400 text-sm">Step {step} of 5 — Personalized workout engine configuration</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Card Body */}
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-50 shadow-2xl">
          <CardHeader>
            {step === 1 && (
              <>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription className="text-zinc-400">Tell us a bit about your physical background</CardDescription>
              </>
            )}
            {step === 2 && (
              <>
                <CardTitle>Fitness Goals</CardTitle>
                <CardDescription className="text-zinc-400">What is your main target for gym training?</CardDescription>
              </>
            )}
            {step === 3 && (
              <>
                <CardTitle>Schedule & Equipment</CardTitle>
                <CardDescription className="text-zinc-400">Where and how often will you train?</CardDescription>
              </>
            )}
            {step === 4 && (
              <>
                <CardTitle>Experience Level</CardTitle>
                <CardDescription className="text-zinc-400">Select your current lifting proficiency</CardDescription>
              </>
            )}
            {step === 5 && (
              <>
                <CardTitle>Health & Limitations</CardTitle>
                <CardDescription className="text-zinc-400">Any active injuries or joint concerns?</CardDescription>
              </>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {step === 1 && (
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-zinc-400 mb-1 block">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-400 mb-1 block">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-400 mb-1 block">Weight (kg)</label>
                  <input
                    type="number"
                    value={formData.weight_kg}
                    onChange={(e) => setFormData({ ...formData, weight_kg: Number(e.target.value) })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-2">
                {[
                  { slug: 'build-muscle', title: 'Build Muscle & Hypertrophy', desc: 'Maximize volume for size & symmetry' },
                  { slug: 'strength', title: 'Gain Strength', desc: 'Focus on heavy compound progressive overload' },
                  { slug: 'fat-loss', title: 'Fat Loss & Conditioning', desc: 'Keep rest tight and metabolic output high' },
                  { slug: 'general-fitness', title: 'General Fitness', desc: 'Maintain overall health, mobility & energy' },
                ].map((g) => (
                  <button
                    key={g.slug}
                    onClick={() => setFormData({ ...formData, goal: g.slug })}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      formData.goal === g.slug
                        ? 'border-primary bg-primary/10 text-zinc-50 font-medium'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-zinc-100">{g.title}</div>
                      <div className="text-xs text-zinc-400">{g.desc}</div>
                    </div>
                    {formData.goal === g.slug && <CheckCircle2 className="w-5 h-5 text-primary" />}
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 mb-2 block">Training Days Per Week ({formData.days_per_week} days)</label>
                  <div className="flex gap-2">
                    {[2, 3, 4, 5, 6].map((days) => (
                      <button
                        key={days}
                        onClick={() => setFormData({ ...formData, days_per_week: days })}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold border ${
                          formData.days_per_week === days
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        {days}d
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 mb-2 block">Available Equipment</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'barbell', name: 'Barbell' },
                      { id: 'dumbbells', name: 'Dumbbells' },
                      { id: 'cable-machine', name: 'Cable Machine' },
                      { id: 'bench', name: 'Bench' },
                      { id: 'pull-up-bar', name: 'Pull-up Bar' },
                      { id: 'smith-machine', name: 'Smith Machine' },
                    ].map((eq) => (
                      <button
                        key={eq.id}
                        onClick={() => toggleEquipment(eq.id)}
                        className={`p-2.5 rounded-lg border text-xs font-medium text-left flex items-center justify-between ${
                          formData.equipment.includes(eq.id)
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                        }`}
                      >
                        <span>{eq.name}</span>
                        {formData.equipment.includes(eq.id) && <CheckCircle2 className="w-4 h-4 text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-3">
                {[
                  { id: 'beginner', title: 'Beginner (< 1 year)', desc: 'Learning compound movements and form' },
                  { id: 'intermediate', title: 'Intermediate (1 - 3 years)', desc: 'Consistent training with progressive overload' },
                  { id: 'advanced', title: 'Advanced (3+ years)', desc: 'High strength baseline and periodization' },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setFormData({ ...formData, training_level: lvl.id })}
                    className={`w-full p-4 rounded-xl border text-left flex items-center justify-between ${
                      formData.training_level === lvl.id
                        ? 'border-primary bg-primary/10 text-zinc-50'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-zinc-100">{lvl.title}</div>
                      <div className="text-xs text-zinc-400">{lvl.desc}</div>
                    </div>
                    {formData.training_level === lvl.id && <CheckCircle2 className="w-5 h-5 text-primary" />}
                  </button>
                ))}
              </div>
            )}

            {step === 5 && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-zinc-400 block">
                  Describe any active injuries or body areas to avoid (e.g., lower back, right shoulder):
                </label>
                <textarea
                  rows={4}
                  value={formData.injuries}
                  onChange={(e) => setFormData({ ...formData, injuries: e.target.value })}
                  placeholder="None / Mild shoulder impingement..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-100 focus:outline-none focus:border-primary"
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between border-t border-zinc-800 pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="border-zinc-800 text-zinc-400 hover:text-zinc-100 gap-1 text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button onClick={handleNext} className="gap-1.5 text-xs font-semibold">
              {step === 5 ? 'Generate My Plan' : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
