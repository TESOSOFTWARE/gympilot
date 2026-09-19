'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Download,
  Upload,
  Video,
  AlertTriangle,
  CheckCircle2,
  X,
  Layers,
  Loader2,
} from 'lucide-react';
import {
  ExerciseRow,
  getExercises,
} from '@/lib/supabase/exercises';
import {
  adminUpsertExercise,
  adminDeleteExercise,
  adminBulkImportExercises,
} from '@/app/actions/exercise-actions';
import { MuscleIcon } from '@/components/exercises/MuscleIcon';
import { getYouTubeEmbedUrl } from '@/components/exercises/YouTubeEmbed';

const CATEGORIES = [
  'All',
  'Strength Training',
  'Cardio',
  'Team Sports',
  'Individual Sports',
  'Swimming / Aquatic',
  'Mobility / Flexibility',
  'Recovery',
] as const;

type EditingItem = Partial<ExerciseRow> & { name: string };

export default function AdminExercisesPage() {
  const [exercises, setExercises] = useState<ExerciseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Video Manager State inside Modal
  const [videoInput, setVideoInput] = useState('');
  const [videoWarning, setVideoWarning] = useState<string | null>(null);

  // File Input Ref for CSV Upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from Supabase on mount
  useEffect(() => {
    loadExercises();
  }, []);

  async function loadExercises() {
    setLoading(true);
    const data = await getExercises();
    setExercises(data);
    setLoading(false);
  }

  function showToast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  }

  // Filter exercises
  const filtered = exercises.filter((ex) => {
    const matchesCat = activeCategory === 'All' || ex.category === activeCategory;
    const matchesSearch =
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.movement_pattern.toLowerCase().includes(search.toLowerCase()) ||
      ex.category.toLowerCase().includes(search.toLowerCase()) ||
      (ex.target_muscle && ex.target_muscle.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Open modal for NEW exercise
  function handleOpenAdd() {
    setEditingItem({
      name: '',
      category: 'Strength Training',
      movement_pattern: 'horizontal_push',
      difficulty: 'intermediate',
      exercise_type: 'compound',
      target_muscle: 'Mid-Lower Pectoralis Major',
      primary_muscle_slug: 'mid-chest',
      youtube_urls: [],
      description: '',
    });
    setVideoInput('');
    setVideoWarning(null);
    setShowModal(true);
  }

  // Open modal for EDIT exercise
  function handleOpenEdit(item: ExerciseRow) {
    setEditingItem({ ...item, youtube_urls: [...(item.youtube_urls || [])] });
    setVideoInput('');
    setVideoWarning(null);
    setShowModal(true);
  }

  // Delete exercise (soft-delete via Server Action)
  function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    startTransition(async () => {
      const { error } = await adminDeleteExercise(id);
      if (error) {
        showToast(`❌ Error: ${error}`);
      } else {
        setExercises((prev) => prev.filter((e) => e.id !== id));
        showToast(`Deleted "${name}"`);
      }
    });
  }

  // Save exercise via Server Action
  async function handleSaveForm() {
    if (!editingItem?.name?.trim()) {
      alert('Exercise Name is required!');
      return;
    }
    setSaving(true);
    const { data, error } = await adminUpsertExercise({
      id: editingItem.id,
      name: editingItem.name.trim(),
      slug: editingItem.slug,
      category: editingItem.category || 'Strength Training',
      movement_pattern: editingItem.movement_pattern || 'compound_lift',
      difficulty: editingItem.difficulty || 'intermediate',
      exercise_type: editingItem.exercise_type || 'compound',
      target_muscle: editingItem.target_muscle || '',
      primary_muscle_slug: editingItem.primary_muscle_slug || 'mid-chest',
      youtube_urls: editingItem.youtube_urls || [],
      description: editingItem.description || '',
      instructions: (editingItem as ExerciseRow).instructions || '',
    });
    setSaving(false);

    if (error || !data) {
      showToast(`❌ Error saving: ${error}`);
      return;
    }

    // Update local list
    setExercises((prev) => {
      const idx = prev.findIndex((e) => e.id === data.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = data;
        return next;
      }
      return [data, ...prev];
    });
    setShowModal(false);
    showToast(`✅ Saved "${data.name}" to Supabase`);
  }

  // Add YouTube Video Link with Duplicate Validation
  function handleAddVideo() {
    if (!videoInput.trim()) return;
    const url = videoInput.trim();
    const embedUrl = getYouTubeEmbedUrl(url);

    const currentUrls = editingItem?.youtube_urls || [];
    const isDuplicateLocal = currentUrls.some((u) => getYouTubeEmbedUrl(u) === embedUrl);
    if (isDuplicateLocal) {
      setVideoWarning(`⚠️ This video link is already added for this exercise!`);
      return;
    }

    const duplicateOther = exercises.find(
      (e) => e.id !== editingItem?.id && e.youtube_urls?.some((u) => getYouTubeEmbedUrl(u) === embedUrl)
    );
    if (duplicateOther) {
      setVideoWarning(`⚠️ This video is already used in "${duplicateOther.name}". Adding anyway...`);
    } else {
      setVideoWarning(null);
    }

    setEditingItem((prev) => ({
      ...prev!,
      youtube_urls: [...(prev?.youtube_urls || []), url],
    }));
    setVideoInput('');
  }

  function handleRemoveVideo(index: number) {
    setEditingItem((prev) => ({
      ...prev!,
      youtube_urls: (prev?.youtube_urls || []).filter((_, i) => i !== index),
    }));
  }

  // Export CSV
  function handleExportCSV() {
    const headers = ['id', 'name', 'category', 'movement_pattern', 'difficulty', 'exercise_type',
      'target_muscle', 'primary_muscle_slug', 'youtube_urls', 'description'];
    const rows = exercises.map((e) => [
      `"${e.id}"`,
      `"${e.name}"`,
      `"${e.category}"`,
      `"${e.movement_pattern}"`,
      `"${e.difficulty}"`,
      `"${e.exercise_type}"`,
      `"${e.target_muscle || ''}"`,
      `"${e.primary_muscle_slug}"`,
      `"${(e.youtube_urls || []).join(';')}"`,
      `"${(e.description || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `gympilot_exercises_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported CSV file!');
  }

  // Upload / Import CSV File → Supabase bulk upsert
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
        if (lines.length < 2) { alert('CSV file is empty or invalid!'); return; }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const items: any[] = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map((c) => c.replace(/^"|"$/g, '').trim());
          if (cols.length >= 2 && cols[1]) {
            items.push({
              id: cols[0] || undefined,
              name: cols[1],
              category: cols[2] || 'Strength Training',
              movement_pattern: cols[3] || 'compound_lift',
              difficulty: cols[4] || 'intermediate',
              exercise_type: cols[5] || 'compound',
              target_muscle: cols[6] || '',
              primary_muscle_slug: cols[7] || 'mid-chest',
              youtube_urls: cols[8] ? cols[8].split(';') : [],
              description: cols[9] || '',
            });
          }
        }

        if (items.length > 0) {
          const { count, error } = await adminBulkImportExercises(items);
          if (error) {
            showToast(`❌ Import error: ${error}`);
          } else {
            await loadExercises();
            showToast(`✅ Imported ${count} exercises to Supabase!`);
          }
        }
      } catch {
        alert('Failed to parse CSV file!');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary" />
            Exercise & Activity Library
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            {loading ? 'Loading from Supabase…' : `${exercises.length} exercises · changes sync to all users instantly`}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv,.txt" className="hidden" />

          <Button variant="outline" onClick={() => fileInputRef.current?.click()}
            className="gap-2 text-xs font-bold border-border bg-card text-foreground hover:bg-accent">
            <Upload className="w-4 h-4 text-primary" />
            Upload CSV
          </Button>

          <Button variant="outline" onClick={handleExportCSV}
            className="gap-2 text-xs font-bold border-border bg-card text-foreground hover:bg-accent">
            <Download className="w-4 h-4 text-primary" />
            Export CSV
          </Button>

          <Button onClick={handleOpenAdd} className="gap-2 text-xs font-black bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            Add New Exercise
          </Button>
        </div>
      </div>

      {/* Category Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              activeCategory === cat
                ? 'bg-primary border-primary text-primary-foreground shadow-md'
                : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 text-muted-foreground absolute left-3.5 top-3" />
        <Input
          placeholder="Search by name, category, movement pattern or target muscle…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-11 h-11 bg-card border-border text-foreground font-medium"
        />
      </div>

      {/* Exercises Data Table */}
      <Card className="bg-card border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center gap-3 py-16 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-sm font-medium">Loading exercises from Supabase…</span>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 border-b border-border text-muted-foreground font-black uppercase">
                <tr>
                  <th className="p-3.5">Exercise / Activity</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Pattern / Type</th>
                  <th className="p-3.5">Difficulty</th>
                  <th className="p-3.5">Demo Videos</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((ex) => (
                  <tr key={ex.id} className="hover:bg-accent/40 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-xl bg-secondary border border-border shrink-0">
                          <MuscleIcon muscleSlug={ex.primary_muscle_slug} muscleName={ex.target_muscle} className="w-7 h-7" />
                        </div>
                        <div>
                          <span className="font-extrabold text-sm text-foreground block">{ex.name}</span>
                          <span className="text-[11px] text-muted-foreground font-medium block">
                            🎯 {ex.category} • <span className="text-primary font-bold">{ex.target_muscle}</span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-primary/10 text-primary border border-primary/20">
                        {ex.category}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-muted-foreground">
                      <div>{ex.movement_pattern}</div>
                      <span className="text-[10px] uppercase font-bold text-foreground">{ex.exercise_type}</span>
                    </td>
                    <td className="p-3.5 capitalize text-foreground font-semibold">{ex.difficulty}</td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted text-foreground text-[11px] font-bold border border-border">
                        <Video className="w-3.5 h-3.5 text-primary" />
                        {ex.youtube_urls?.length || 0} Videos
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-1.5">
                      <Button onClick={() => handleOpenEdit(ex)} variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => handleDelete(ex.id, ex.name)} variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10" disabled={isPending}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-muted-foreground text-sm">
                      No exercises found. Run the SQL migration in Supabase or add a new exercise.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground font-black px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs border border-primary/40">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Add / Edit Exercise Modal */}
      {showModal && editingItem && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <Card className="bg-card border-border max-w-2xl w-full p-6 space-y-5 rounded-2xl shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-3">
                <MuscleIcon muscleSlug={editingItem.primary_muscle_slug} muscleName={editingItem.target_muscle} className="w-8 h-8" />
                <h3 className="text-lg font-black text-foreground">
                  {exercises.some((e) => e.id === editingItem.id) ? 'Edit Exercise / Activity' : 'Add New Exercise / Activity'}
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-muted-foreground">
              <div>
                <label className="block mb-1">Exercise / Activity Name</label>
                <Input
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. Barbell Bench Press, Football, Treadmill"
                  className="bg-background border-border text-foreground font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Category</label>
                <select
                  value={editingItem.category || 'Strength Training'}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full h-10 px-3 rounded-md bg-background border border-border text-foreground font-semibold"
                >
                  <option value="Strength Training">Strength Training</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Team Sports">Team Sports</option>
                  <option value="Individual Sports">Individual Sports</option>
                  <option value="Swimming / Aquatic">Swimming / Aquatic</option>
                  <option value="Mobility / Flexibility">Mobility / Flexibility</option>
                  <option value="Recovery">Recovery</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Movement Pattern</label>
                <Input
                  value={editingItem.movement_pattern || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, movement_pattern: e.target.value })}
                  placeholder="e.g. horizontal_push, squat, team_sport"
                  className="bg-background border-border text-foreground font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Difficulty</label>
                <select
                  value={editingItem.difficulty || 'intermediate'}
                  onChange={(e) => setEditingItem({ ...editingItem, difficulty: e.target.value as ExerciseRow['difficulty'] })}
                  className="w-full h-10 px-3 rounded-md bg-background border border-border text-foreground font-semibold"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Exercise Type</label>
                <select
                  value={editingItem.exercise_type || 'compound'}
                  onChange={(e) => setEditingItem({ ...editingItem, exercise_type: e.target.value })}
                  className="w-full h-10 px-3 rounded-md bg-background border border-border text-foreground font-semibold"
                >
                  <option value="compound">Compound</option>
                  <option value="isolation">Isolation</option>
                  <option value="cardio">Cardio</option>
                  <option value="sport">Sport</option>
                  <option value="recovery">Recovery</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Muscle Group</label>
                <Input
                  value={(editingItem as ExerciseRow & { muscleGroup?: string }).muscleGroup || editingItem.category || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  placeholder="e.g. Chest, Back, Shoulders, Quadriceps"
                  className="bg-background border-border text-foreground font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Target Muscle</label>
                <Input
                  value={editingItem.target_muscle || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, target_muscle: e.target.value })}
                  placeholder="e.g. Upper Pectoralis Major, Latissimus Dorsi"
                  className="bg-background border-border text-foreground font-semibold"
                />
              </div>

              <div>
                <label className="block mb-1">Primary Muscle Slug (Anatomical Highlight)</label>
                <select
                  value={editingItem.primary_muscle_slug || 'mid-chest'}
                  onChange={(e) => setEditingItem({ ...editingItem, primary_muscle_slug: e.target.value })}
                  className="w-full h-10 px-3 rounded-md bg-background border border-border text-foreground font-semibold"
                >
                  <option value="mid-chest">Mid Chest</option>
                  <option value="upper-chest">Upper Chest</option>
                  <option value="anterior-deltoid">Shoulders / Deltoids</option>
                  <option value="lateral-deltoid">Lateral Deltoid</option>
                  <option value="triceps">Triceps</option>
                  <option value="biceps">Biceps</option>
                  <option value="lats">Back / Lats</option>
                  <option value="quads">Legs / Quads</option>
                  <option value="core">Core / Abs</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1">Description</label>
                <Input
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Brief description of the exercise…"
                  className="bg-background border-border text-foreground font-semibold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1">Instructions (How to perform properly)</label>
                <textarea
                  value={(editingItem as ExerciseRow).instructions || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, instructions: e.target.value })}
                  placeholder={"1. Set up position...\n2. Execute the movement...\n3. Return to start...\n4. Repeat for reps."}
                  rows={6}
                  className="w-full px-3 py-2 rounded-md bg-background border border-border text-foreground font-semibold text-xs resize-y focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* YouTube Demo Videos Manager */}
            <div className="space-y-3 pt-3 border-t border-border">
              <h4 className="text-sm font-extrabold text-foreground flex items-center gap-2">
                <Video className="w-4 h-4 text-primary" />
                YouTube Demo Videos Manager
              </h4>

              {videoWarning && (
                <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500 text-xs font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{videoWarning}</span>
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                  placeholder="Paste YouTube Video / Shorts URL…"
                  className="bg-background border-border text-foreground font-semibold text-xs"
                />
                <Button type="button" onClick={handleAddVideo} className="h-10 px-4 text-xs font-black bg-secondary text-primary hover:bg-accent border border-border shrink-0">
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add Video
                </Button>
              </div>

              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {(editingItem.youtube_urls || []).map((url, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-background border border-border flex items-center justify-between text-xs">
                    <span className="font-mono text-muted-foreground truncate max-w-md">{url}</span>
                    <button type="button" onClick={() => handleRemoveVideo(idx)} className="p-1 text-muted-foreground hover:text-red-500" title="Remove Video">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="text-xs font-bold border-border">
                Cancel
              </Button>
              <Button type="button" onClick={handleSaveForm} disabled={saving}
                className="text-xs font-black bg-primary text-primary-foreground hover:bg-primary/90 px-6 gap-2">
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {saving ? 'Saving to Supabase…' : 'Save Exercise'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
