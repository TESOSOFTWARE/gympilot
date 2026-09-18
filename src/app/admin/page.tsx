import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Sliders, Database, ShieldAlert, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Admin Control Center</h1>
        <p className="text-zinc-400 text-sm">Configure engine algorithms, seed database metrics, & exercise library</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-50 p-6 space-y-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg">Exercise Database</h3>
          <p className="text-xs text-zinc-400">Manage 80+ exercise movement patterns, equipment requirements, & activation weights.</p>
          <Link href="/admin/exercises">
            <Button size="sm" className="w-full text-xs font-semibold">Manage Exercises</Button>
          </Link>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-zinc-50 p-6 space-y-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit">
            <Sliders className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg">Planning Parameters</h3>
          <p className="text-xs text-zinc-400">Configure recovery threshold constants, volume multipliers, & RPE progression scales.</p>
          <Link href="/admin/parameters">
            <Button size="sm" className="w-full text-xs font-semibold">Configure Parameters</Button>
          </Link>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-zinc-50 p-6 space-y-4">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl w-fit">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg">Engine Telemetry</h3>
          <p className="text-xs text-zinc-400">Audit generation latency, exercise scoring distribution, & safety guardrail hits.</p>
          <Button size="sm" variant="outline" className="w-full text-xs border-zinc-800 text-zinc-300">View Telemetry</Button>
        </Card>
      </div>
    </div>
  );
}
