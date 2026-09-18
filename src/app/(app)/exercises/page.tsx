'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Dumbbell, ChevronRight, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ExerciseRow, getExercises } from '@/lib/supabase/exercises';
import { MuscleIcon } from '@/components/exercises/MuscleIcon';

const CATEGORY_FILTERS = [
  'All',
  'Strength Training',
  'Cardio',
  'Team Sports',
  'Individual Sports',
  'Swimming / Aquatic',
  'Mobility / Flexibility',
  'Recovery',
];

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  intermediate: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  advanced: 'text-red-500 bg-red-500/10 border-red-500/20',
};

export default function ExerciseLibraryPage() {
  const [exercises, setExercises] = useState<ExerciseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    getExercises().then((data) => {
      setExercises(data);
      setLoading(false);
    });
  }, []);

  const filtered = exercises.filter((ex) => {
    const matchesCat = activeCategory === 'All' || ex.category === activeCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      ex.name.toLowerCase().includes(q) ||
      ex.category.toLowerCase().includes(q) ||
      ex.target_muscle.toLowerCase().includes(q) ||
      ex.movement_pattern.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Exercise Library</h1>
        <p className="text-muted-foreground text-sm">
          {loading ? 'Loading…' : `${exercises.length} exercises & activities across all categories`}
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              activeCategory === cat
                ? 'bg-primary border-primary text-primary-foreground'
                : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 text-muted-foreground absolute left-3.5 top-3" />
        <Input
          placeholder="Search by exercise name, muscle or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-11 h-11 bg-card border-border text-foreground"
        />
      </div>

      {/* Exercise List */}
      {loading ? (
        <div className="flex items-center justify-center gap-3 py-20 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span className="text-sm font-medium">Loading exercise library…</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((item) => (
            <Link key={item.id} href={`/exercises/${item.slug}`}>
              <Card className="bg-card border-border hover:border-primary transition-all p-4 flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-xl bg-secondary border border-border shrink-0 group-hover:border-primary/50 transition-colors">
                    <MuscleIcon
                      muscleSlug={item.primary_muscle_slug}
                      muscleName={item.target_muscle}
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{item.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>🎯 {item.target_muscle || item.category}</span>
                      <span>•</span>
                      <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold capitalize ${DIFFICULTY_COLOR[item.difficulty] ?? ''}`}>
                        {item.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </Card>
            </Link>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-2 py-16 text-center text-muted-foreground">
              <Dumbbell className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No exercises found.</p>
              <p className="text-xs mt-1">Run the SQL migration in Supabase to seed 191 exercises.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
