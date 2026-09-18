import type { Metadata } from 'next';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GymPilot — AI-Powered Smart Gym Planner',
  description: 'Automatically plan, track, and adapt your gym training routines with AI-driven muscle recovery and progressive overload.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark theme-emerald ${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var mode = localStorage.getItem('gympilot_mode') || 'dark';
                var theme = localStorage.getItem('gympilot_theme') || 'theme-emerald';
                var modeClass = mode === 'dark' ? 'dark' : '';
                document.documentElement.className = (modeClass + ' ' + theme + ' ${outfit.variable} ${jetbrainsMono.variable} h-full antialiased').trim();
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        {children}
      </body>
    </html>
  );
}
