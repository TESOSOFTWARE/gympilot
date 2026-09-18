'use client';

import { ReactNode } from 'react';
import { MobileNav } from './MobileNav';
import { DesktopSidebar } from './DesktopSidebar';
import Link from 'next/link';
import { Dumbbell, Zap, Sparkles } from 'lucide-react';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-foreground font-sans">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border px-4 py-3 flex items-center justify-between">
        <Link href="/today" className="flex items-center gap-2.5">
          <div className="bg-primary/15 p-2 rounded-xl border border-primary/30">
            <Dumbbell className="w-5 h-5 text-primary" />
          </div>
          <span className="font-black text-lg tracking-tight gym-gradient-text">
            GymPilot
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Ready to Train</span>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 pb-24 md:pb-10 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Mobile Nav */}
      <MobileNav />
    </div>
  );
}
