'use server';

/**
 * exercise-actions.ts — Server Actions for admin exercise CRUD.
 *
 * These run on the server with the Supabase service-role key (bypasses RLS).
 * Only call these from the admin pages — never expose to regular users.
 */

import { createAdminClient } from '@/lib/supabase/admin';
import { ExerciseRow, makeExerciseSlug } from '@/lib/supabase/exercises';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function db() { return createAdminClient() as any; }

export async function adminUpsertExercise(
  item: Partial<ExerciseRow> & { name: string }
): Promise<{ data: ExerciseRow | null; error: string | null }> {
  const slug = item.slug || makeExerciseSlug(item.name);

  const payload: Record<string, unknown> = {
    name: item.name,
    slug,
    description: item.description ?? '',
    difficulty: item.difficulty ?? 'intermediate',
    movement_pattern: item.movement_pattern ?? 'compound_lift',
    exercise_type: item.exercise_type ?? 'compound',
    category: item.category ?? 'Strength Training',
    target_muscle: item.target_muscle ?? '',
    primary_muscle_slug: item.primary_muscle_slug ?? 'mid-chest',
    youtube_urls: item.youtube_urls ?? [],
    instructions: item.instructions ?? '',
    is_active: item.is_active !== false,
  };

  // Include id only when updating an existing row
  if (item.id) payload.id = item.id;

  const { data, error } = await db()
    .from('exercises')
    .upsert(payload, { onConflict: 'slug' })
    .select()
    .maybeSingle();

  return {
    data: (data as ExerciseRow) ?? null,
    error: error?.message ?? null,
  };
}

export async function adminDeleteExercise(
  id: string
): Promise<{ error: string | null }> {
  // Soft-delete: preserve referential integrity with workout logs
  const { error } = await db()
    .from('exercises')
    .update({ is_active: false })
    .eq('id', id);
  return { error: error?.message ?? null };
}

export async function adminBulkImportExercises(
  items: Array<Partial<ExerciseRow> & { name: string }>
): Promise<{ count: number; error: string | null }> {
  const rows = items.map((item) => ({
    name: item.name,
    slug: item.slug || makeExerciseSlug(item.name),
    description: item.description ?? '',
    difficulty: item.difficulty ?? 'intermediate',
    movement_pattern: item.movement_pattern ?? 'compound_lift',
    exercise_type: item.exercise_type ?? 'compound',
    category: item.category ?? 'Strength Training',
    target_muscle: item.target_muscle ?? '',
    primary_muscle_slug: item.primary_muscle_slug ?? 'mid-chest',
    youtube_urls: item.youtube_urls ?? [],
    is_active: true,
  }));

  const { data, error } = await db()
    .from('exercises')
    .upsert(rows, { onConflict: 'slug' })
    .select('id');

  return {
    count: data?.length ?? 0,
    error: error?.message ?? null,
  };
}
