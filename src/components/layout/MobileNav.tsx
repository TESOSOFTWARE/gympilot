'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dumbbell, CalendarDays, TrendingUp, BookOpen, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/today', label: 'Today', icon: Dumbbell },
  { href: '/plan', label: 'Plan', icon: CalendarDays },
  { href: '/progress', label: 'Stats', icon: TrendingUp },
  { href: '/exercises', label: 'Library', icon: BookOpen },
  { href: '/profile', label: 'Profile', icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border px-2 py-1">
      <div className="flex items-center justify-around h-15">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full text-[11px] font-bold transition-all',
                isActive
                  ? 'text-primary font-extrabold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className={cn('p-1.5 rounded-xl transition-all', isActive && 'bg-primary/15')}>
                <Icon className={cn('w-5 h-5', isActive && 'text-primary stroke-[2.5px]')} />
              </div>
              <span className="mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
