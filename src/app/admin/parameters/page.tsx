'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sliders, Save, CheckCircle2 } from 'lucide-react';

export default function AdminParametersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Planning Parameters Configuration</h1>
        <p className="text-zinc-400 text-sm">Tune global fitness engine constants & non-linear recovery parameters</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-50 p-6 space-y-4">
          <CardTitle className="text-base font-bold text-zinc-100">Recovery Engine Constants</CardTitle>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-zinc-400 font-semibold block mb-1">Chest Base Recovery Hours</label>
              <Input defaultValue="48" className="bg-zinc-950 border-zinc-800 text-zinc-100" />
            </div>
            <div>
              <label className="text-zinc-400 font-semibold block mb-1">Biceps / Small Muscle Recovery Hours</label>
              <Input defaultValue="36" className="bg-zinc-950 border-zinc-800 text-zinc-100" />
            </div>
            <div>
              <label className="text-zinc-400 font-semibold block mb-1">RPE 10 Intensity Multiplier</label>
              <Input defaultValue="1.35" className="bg-zinc-950 border-zinc-800 text-zinc-100" />
            </div>
          </div>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-zinc-50 p-6 space-y-4">
          <CardTitle className="text-base font-bold text-zinc-100">Volume Manager Defaults</CardTitle>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-zinc-400 font-semibold block mb-1">Hypertrophy Baseline Weekly Sets</label>
              <Input defaultValue="12" className="bg-zinc-950 border-zinc-800 text-zinc-100" />
            </div>
            <div>
              <label className="text-zinc-400 font-semibold block mb-1">Strength Baseline Weekly Sets</label>
              <Input defaultValue="9" className="bg-zinc-950 border-zinc-800 text-zinc-100" />
            </div>
            <div>
              <label className="text-zinc-400 font-semibold block mb-1">Advanced Lifter Volume Multiplier</label>
              <Input defaultValue="1.25" className="bg-zinc-950 border-zinc-800 text-zinc-100" />
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="gap-2 font-bold text-xs px-6">
          <Save className="w-4 h-4" />
          Save Global Parameters
        </Button>
      </div>
    </div>
  );
}
