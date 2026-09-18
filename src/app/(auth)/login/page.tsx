'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { login } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dumbbell } from 'lucide-react'

const initialState = {
  error: null as string | null
}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await login(formData)
      if (result?.error) {
        return { error: result.error }
      }
      return { error: null }
    },
    initialState
  )

  return (
    <Card className="w-full max-w-md shadow-xl border-zinc-200">
      <CardHeader className="space-y-2 text-center pb-6">
        <div className="flex justify-center mb-2">
          <div className="bg-primary/10 p-3 rounded-full">
            <Dumbbell className="w-8 h-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
        <CardDescription className="text-zinc-500">
          Sign in to your GymPilot account
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="name@example.com" 
              required 
              className="bg-zinc-50"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="bg-zinc-50"
            />
          </div>
          
          {state.error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
              {state.error}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={pending}>
            {pending ? 'Signing in...' : 'Sign in'}
          </Button>
          <div className="text-center text-sm text-zinc-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
