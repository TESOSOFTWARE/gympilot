import { ReactNode } from 'react';
import Link from 'next/link';
import { Shield, BookOpen, Sliders, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/30">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight">GymPilot Admin Portal</h1>
            <p className="text-[11px] text-zinc-400">System Parameters & Content Management</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/exercises">
            <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-zinc-300">
              <BookOpen className="w-4 h-4" />
              Exercises
            </Button>
          </Link>
          <Link href="/admin/parameters">
            <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-zinc-300">
              <Sliders className="w-4 h-4" />
              Parameters
            </Button>
          </Link>
          <Link href="/today">
            <Button size="sm" className="text-xs gap-1.5 font-semibold">
              <ArrowLeft className="w-4 h-4" />
              Exit Admin
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-8">{children}</main>
    </div>
  );
}
