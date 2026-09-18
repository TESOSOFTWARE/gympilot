import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  age: z.coerce.number().int().min(10, 'Must be at least 10').max(120, 'Must be under 120').optional(),
  biological_sex: z.enum(['male', 'female', 'prefer_not_to_say']).optional(),
  height_cm: z.coerce.number().min(50).max(300).optional(),
  weight_kg: z.coerce.number().min(20).max(300).optional(),
  measurement_system: z.enum(['metric', 'imperial']).default('metric'),
  training_level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  training_days_per_week: z.coerce.number().int().min(1).max(7).default(3),
  preferred_days: z.array(z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])).default([]),
  workout_duration_minutes: z.coerce.number().int().min(15).max(180).default(60),
  training_location: z.enum(['commercial_gym', 'home_gym', 'home_minimal', 'outdoor', 'mixed']).default('commercial_gym'),
  available_equipment: z.array(z.string()).default([]),
  history_window_days: z.coerce.number().int().min(1).max(90).default(7),
})
