import { z } from 'zod'

export const workoutSetSchema = z.object({
  id: z.string().uuid().optional(),
  set_number: z.number().int().min(1),
  weight_kg: z.number().min(0).max(1000).nullable(),
  reps: z.number().int().min(0).max(100).nullable(),
  rpe: z.number().min(1).max(10).nullable(),
  rir: z.number().int().min(0).max(10).nullable(),
  completed: z.boolean().default(false),
  notes: z.string().nullable().optional(),
})

export const workoutExerciseSchema = z.object({
  id: z.string().uuid().optional(),
  exercise_id: z.string().uuid(),
  order_index: z.number().int().min(0),
  skipped: z.boolean().default(false),
  notes: z.string().nullable().optional(),
  sets: z.array(workoutSetSchema).optional(),
})

export const workoutSessionSchema = z.object({
  id: z.string().uuid().optional(),
  plan_day_id: z.string().uuid().nullable().optional(),
  started_at: z.string().datetime(),
  completed_at: z.string().datetime().nullable().optional(),
  duration_minutes: z.number().int().min(1).max(1440).nullable().optional(),
  perceived_difficulty: z.number().int().min(1).max(5).nullable().optional(),
  energy_level: z.number().int().min(1).max(5).nullable().optional(),
  muscle_soreness: z.number().int().min(1).max(5).nullable().optional(),
  enjoyment: z.number().int().min(1).max(5).nullable().optional(),
  notes: z.string().nullable().optional(),
  status: z.enum(['planned', 'in_progress', 'completed', 'skipped']).default('planned'),
  exercises: z.array(workoutExerciseSchema).optional(),
})
