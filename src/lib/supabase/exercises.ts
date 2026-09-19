/**
 * exercises.ts — Supabase data access layer for the exercises table.
 *
 * Public read:   uses the anon (browser) client — respects RLS "viewable by everyone"
 * Admin write:   uses Server Actions with service-role key to bypass RLS
 *
 * NOTE: ExerciseRow is typed locally because the Supabase generated types (supabase.ts)
 * don't yet include the new columns added in migration 004. Once you re-run
 * `npx supabase gen types typescript`, you can replace `any` casts with proper types.
 */

export interface ExerciseRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  instructions: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  movement_pattern: string;
  exercise_type: string;
  category: string;
  target_muscle: string;
  primary_muscle_slug: string;
  youtube_urls: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Public read (browser client, respects RLS) ──────────────────────────────

export async function getExercises(): Promise<ExerciseRow[]> {
  const { createClient } = await import('@/lib/supabase/client');
  const supabase = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('exercises')
    .select('*')
    .eq('is_active', true)
    .order('category', { ascending: true })
    .order('name', { ascending: true });
  if (error) {
    console.error('getExercises error:', error.message);
    return [];
  }
  return (data ?? []) as ExerciseRow[];
}

export async function getExerciseBySlug(slug: string): Promise<ExerciseRow | null> {
  const { createClient } = await import('@/lib/supabase/client');
  const supabase = createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('exercises')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();
  if (error) {
    console.error('getExerciseBySlug error:', error.message);
    return null;
  }
  return (data as ExerciseRow) ?? null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function makeExerciseSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
