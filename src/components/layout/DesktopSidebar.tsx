'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Dumbbell,
  CalendarDays,
  TrendingUp,
  BookOpen,
  User,
  Apple,
  Shield,
  Zap,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/today', label: "Today's Workout", icon: Dumbbell },
  { href: '/plan', label: 'Weekly Plan', icon: CalendarDays },
  { href: '/progress', label: 'Progress & Stats', icon: TrendingUp },
  { href: '/exercises', label: 'Exercise Library', icon: BookOpen },
  { href: '/nutrition', label: 'Nutrition Targets', icon: Apple },
  { href: '/profile', label: 'Profile & Settings', icon: User },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card/95 backdrop-blur-md h-screen sticky top-0 px-4 py-6">
      {/* Gym Brand Header */}
      <Link href="/today" className="flex items-center gap-3 px-2 mb-8 group">
        <div className="bg-primary/15 p-2.5 rounded-2xl border border-primary/30 group-hover:scale-105 group-hover:bg-primary/20 transition-all gym-glow">
          <Dumbbell className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tight text-foreground flex items-center gap-1">
            GymPilot
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">PRO</span>
          </h1>
          <p className="text-xs text-muted-foreground font-medium">Smart AI Gym System</p>
        </div>
      </Link>

      {/* Main Nav Links */}
      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-bold transition-all',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 font-extrabold'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive ? 'text-primary-foreground' : 'text-muted-foreground')} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Quick Action */}
      <div className="pt-4 border-t border-border space-y-2">
        <Link href="/admin">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 border-border bg-background text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Shield className="w-4 h-4 text-primary" />
            Admin Settings
          </Button>
        </Link>
      </div>
    </aside>
  );
}
