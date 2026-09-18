'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Dumbbell, Play, Loader2, Target, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { YouTubeEmbed } from '@/components/exercises/YouTubeEmbed';
import { MuscleIcon } from '@/components/exercises/MuscleIcon';
import { ExerciseRow, getExerciseBySlug } from '@/lib/supabase/exercises';

export default function ExerciseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const [exercise, setExercise] = useState<ExerciseRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getExerciseBySlug(slug).then((data) => {
      if (!data) setNotFound(true);
      else setExercise(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 py-24 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
        <span className="text-sm font-medium">Loading exercise…</span>
      </div>
    );
  }

  if (notFound || !exercise) {
    return (
      <div className="space-y-4 max-w-3xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2 text-xs text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-4 h-4" />
          Back to Library
        </Button>
        <div className="py-16 text-center text-muted-foreground">
          <Dumbbell className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">Exercise not found.</p>
          <p className="text-xs mt-1 text-muted-foreground/60">It may not have been migrated to Supabase yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Button variant="ghost" onClick={() => router.back()} className="gap-2 text-xs text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" />
        Back to Library
      </Button>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-2xl bg-secondary border border-border shrink-0">
          <MuscleIcon muscleSlug={exercise.primary_muscle_slug} muscleName={exercise.target_muscle} className="w-14 h-14" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
              <Activity className="w-3 h-3" />
              {exercise.movement_pattern.replace(/_/g, ' ')} · {exercise.exercise_type}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold border border-border">
              {exercise.category}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border capitalize ${
              exercise.difficulty === 'beginner' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' :
              exercise.difficulty === 'advanced' ? 'text-red-500 bg-red-500/10 border-red-500/20' :
              'text-amber-500 bg-amber-500/10 border-amber-500/20'
            }`}>
              {exercise.difficulty}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{exercise.name}</h1>
          {exercise.description && (
            <p className="text-muted-foreground text-sm leading-relaxed">{exercise.description}</p>
          )}
        </div>
      </div>

      {/* Target Muscle Card */}
      {exercise.target_muscle && (
        <Card className="bg-card border-border p-5 flex items-center gap-4">
          <Target className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Primary Target Muscle</p>
            <p className="text-sm font-bold text-foreground">{exercise.target_muscle}</p>
          </div>
        </Card>
      )}

      {/* Demo Videos */}
      {exercise.youtube_urls && exercise.youtube_urls.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Play className="w-5 h-5 text-primary" />
            Demo Videos ({exercise.youtube_urls.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercise.youtube_urls.map((url, i) => (
              <YouTubeEmbed key={i} url={url} title={`Demo Video ${i + 1}`} />
            ))}
          </div>
        </div>
      )}

      {/* No videos placeholder */}
      {(!exercise.youtube_urls || exercise.youtube_urls.length === 0) && (
        <Card className="bg-card border-border p-6 text-center text-muted-foreground">
          <Play className="w-8 h-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm font-medium">No demo videos yet.</p>
          <p className="text-xs mt-1">Admin can add YouTube videos in the Exercise Library management.</p>
        </Card>
      )}
    </div>
  );
}
