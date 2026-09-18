'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { loginSchema, registerSchema } from '@/validations/user'
import { z } from 'zod'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const data = loginSchema.parse({ email, password })
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      return { error: error.message }
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message }
    }
    return { error: 'An unexpected error occurred' }
  }

  revalidatePath('/', 'layout')
  redirect('/today')
}

export async function register(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  try {
    const data = registerSchema.parse({ email, password, confirmPassword })
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    if (error) {
      return { error: error.message }
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message }
    }
    return { error: 'An unexpected error occurred' }
  }

  revalidatePath('/', 'layout')
  redirect('/today')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/')
}
