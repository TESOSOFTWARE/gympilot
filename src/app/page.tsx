import Link from 'next/link';
import { Dumbbell, Sparkles, ArrowRight, ShieldCheck, Zap, Activity, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col font-sans selection:bg-emerald-500 selection:text-zinc-950">
      {/* Gym Top Header */}
      <nav className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-zinc-900/80">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/15 p-2.5 rounded-2xl border border-emerald-500/30 gym-glow">
            <Dumbbell className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">GymPilot</span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/today">
            <Button className="font-extrabold text-xs uppercase tracking-wider gap-2 px-6 h-11 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/20 rounded-xl">
              Open App
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Muscular Hero Section */}
      <section className="flex-1 max-w-5xl mx-auto w-full px-6 py-20 text-center flex flex-col items-center justify-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          AI Workout & Muscle Recovery Engine
        </div>

        <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1]">
          NEVER GUESS YOUR LIFT AGAIN. <br />
          <span className="gym-gradient-text">
            KNOW EXACTLY WHAT TO TRAIN.
          </span>
        </h1>

        <p className="max-w-2xl text-zinc-400 text-base md:text-lg leading-relaxed font-medium">
          GymPilot continuously calculates muscle recovery scores, optimizes volume budgets, and suggests progressive overload load targets.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link href="/today">
            <Button size="lg" className="h-14 px-9 text-base font-black gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all hover:scale-105">
              <Zap className="w-5 h-5 fill-current" />
              GENERATE WORKOUT NOW (GUEST MODE)
            </Button>
          </Link>
          <Link href="/onboarding">
            <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold border-zinc-800 bg-zinc-900/80 text-zinc-200 hover:bg-zinc-800 rounded-2xl">
              Customize Setup
            </Button>
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left w-full">
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-3 shadow-xl">
            <div className="p-3 bg-blue-500/15 text-blue-400 rounded-2xl w-fit border border-blue-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-white">Non-Linear Fatigue Model</h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-medium">
              Computes muscle recovery scores from 0-100% using non-linear intensity factors and session activation weights.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-3 shadow-xl">
            <div className="p-3 bg-emerald-500/15 text-emerald-400 rounded-2xl w-fit border border-emerald-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-white">Progressive Overload</h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-medium">
              Calculates weight (+2.5kg/+5kg) and rep targets automatically based on your previous RPE performance history.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-3 shadow-xl">
            <div className="p-3 bg-purple-500/15 text-purple-400 rounded-2xl w-fit border border-purple-500/20">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-white">Injury & Joint Guardrails</h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-medium">
              Excludes conflicting movement patterns for active joint injuries and prevents overtraining.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900/80 py-6 text-center text-xs text-zinc-500 font-medium">
        © 2026 GymPilot Inc. Built for heavy lifters & fitness enthusiasts.
      </footer>
    </div>
  );
}
