'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'experience' | 'projects'>('about');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New item draft states
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Frontend', level: 85 });
  const [newExp, setNewExp] = useState({ role: '', company: '', period: '', description: '' });
  const [newProj, setNewProj] = useState({ title: '', category: 'Creative Tech', description: '', tags: '', link: '', featured: false });

  // Fetch initial portfolio data
  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load portfolio:', err);
        setLoading(false);
      });
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        showToast('✓ Portfolio data saved successfully!');
      } else {
        showToast('❌ Failed to save data');
      }
    } catch {
      showToast('❌ Error connecting to backend API');
    } finally {
      setSaving(false);
    }
  };

  // Skill Handlers
  const addSkill = () => {
    if (!newSkill.name.trim()) return;
    const item = { id: `s_${Date.now()}`, ...newSkill };
    setData({ ...data, skills: [...data.skills, item] });
    setNewSkill({ name: '', category: 'Frontend', level: 85 });
    showToast('Skill added! Click "Save All Changes" to persist.');
  };

  const removeSkill = (id: string) => {
    setData({ ...data, skills: data.skills.filter((s: any) => s.id !== id) });
  };

  // Experience Handlers
  const addExp = () => {
    if (!newExp.role.trim()) return;
    const item = { id: `e_${Date.now()}`, ...newExp };
    setData({ ...data, experiences: [...data.experiences, item] });
    setNewExp({ role: '', company: '', period: '', description: '' });
    showToast('Experience added!');
  };

  const removeExp = (id: string) => {
    setData({ ...data, experiences: data.experiences.filter((e: any) => e.id !== id) });
  };

  // Project Handlers
  const addProject = () => {
    if (!newProj.title.trim()) return;
    const tagsArray = newProj.tags.split(',').map(t => t.trim()).filter(Boolean);
    const item = { id: `p_${Date.now()}`, ...newProj, tags: tagsArray };
    setData({ ...data, projects: [...data.projects, item] });
    setNewProj({ title: '', category: 'Creative Tech', description: '', tags: '', link: '', featured: false });
    showToast('Project added!');
  };

  const removeProject = (id: string) => {
    setData({ ...data, projects: data.projects.filter((p: any) => p.id !== id) });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center font-cinzel tracking-widest text-sm">
        Loading Portfolio Management Dashboard...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center font-cinzel tracking-widest text-sm">
        Error loading portfolio data backend.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans p-6 md:p-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-400 text-neutral-950 font-semibold px-6 py-3 rounded-full shadow-xl text-sm transition-all animate-bounce">
          {toastMsg}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-neutral-800">
          <div>
            <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 mb-2 block">
              Admin Portal
            </span>
            <h1 className="font-calligraphy text-4xl sm:text-5xl font-normal text-neutral-100">
              Portfolio <span className="italic text-amber-200">Dashboard</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-widest bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-all"
            >
              ← View Site
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-amber-200 to-amber-400 text-neutral-950 hover:from-amber-100 hover:to-amber-300 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              {saving ? 'Saving...' : '★ Save All Changes'}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {(['about', 'skills', 'experience', 'projects'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all ${
                activeTab === tab
                  ? 'bg-amber-300 text-neutral-950 shadow-md'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB 1: ABOUT & QUOTE */}
        {activeTab === 'about' && (
          <div className="glass-card p-8 rounded-3xl space-y-6">
            <h2 className="font-calligraphy text-2xl text-neutral-100 mb-4">Bio & Philosophical Quote Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">Name</label>
                <input
                  type="text"
                  value={data.about.name}
                  onChange={e => setData({ ...data, about: { ...data.about, name: e.target.value } })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">Title</label>
                <input
                  type="text"
                  value={data.about.title}
                  onChange={e => setData({ ...data, about: { ...data.about, title: e.target.value } })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 focus:border-amber-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">Tagline</label>
              <input
                type="text"
                value={data.about.tagline}
                onChange={e => setData({ ...data, about: { ...data.about, tagline: e.target.value } })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 focus:border-amber-400 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">Opening Calligraphic Quote</label>
                <input
                  type="text"
                  value={data.about.quote}
                  onChange={e => setData({ ...data, about: { ...data.about, quote: e.target.value } })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">Quote Author</label>
                <input
                  type="text"
                  value={data.about.quoteAuthor}
                  onChange={e => setData({ ...data, about: { ...data.about, quoteAuthor: e.target.value } })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 focus:border-amber-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">Bio Description</label>
              <textarea
                rows={4}
                value={data.about.bio}
                onChange={e => setData({ ...data, about: { ...data.about, bio: e.target.value } })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 focus:border-amber-400 outline-none"
              />
            </div>
          </div>
        )}

        {/* TAB 2: SKILLSETS */}
        {activeTab === 'skills' && (
          <div className="space-y-8">
            {/* Add New Skill Form */}
            <div className="glass-card p-6 rounded-3xl">
              <h3 className="font-cinzel text-sm font-semibold uppercase tracking-widest text-amber-300 mb-4">+ Add New Skill</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Skill Name (e.g. Next.js 15)"
                  value={newSkill.name}
                  onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 outline-none"
                />
                <select
                  value={newSkill.category}
                  onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 outline-none"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Creative Tech">Creative Tech</option>
                  <option value="Design">Design</option>
                </select>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={newSkill.level}
                    onChange={e => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                    className="w-24 bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 outline-none"
                  />
                  <span className="text-xs text-neutral-400">% Proficiency</span>
                </div>
                <button
                  onClick={addSkill}
                  className="bg-amber-400 text-neutral-950 font-bold uppercase tracking-widest text-xs rounded-xl p-3 hover:bg-amber-300 transition-all"
                >
                  Add Skill
                </button>
              </div>
            </div>

            {/* Existing Skills List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.skills.map((s: any) => (
                <div key={s.id} className="glass-card p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="font-calligraphy text-lg text-neutral-100">{s.name}</div>
                    <div className="text-xs text-neutral-500 uppercase tracking-wider">{s.category} — {s.level}%</div>
                  </div>
                  <button
                    onClick={() => removeSkill(s.id)}
                    className="text-red-400 text-xs hover:text-red-300 uppercase tracking-wider font-semibold px-3 py-1 bg-red-500/10 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="space-y-8">
            {/* Add Experience Form */}
            <div className="glass-card p-6 rounded-3xl space-y-4">
              <h3 className="font-cinzel text-sm font-semibold uppercase tracking-widest text-amber-300">+ Add Experience Timeline Item</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Role (e.g. Lead Creative Engineer)"
                  value={newExp.role}
                  onChange={e => setNewExp({ ...newExp, role: e.target.value })}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 outline-none"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={newExp.company}
                  onChange={e => setNewExp({ ...newExp, company: e.target.value })}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 outline-none"
                />
                <input
                  type="text"
                  placeholder="Period (e.g. 2024 — Present)"
                  value={newExp.period}
                  onChange={e => setNewExp({ ...newExp, period: e.target.value })}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 outline-none"
                />
              </div>
              <textarea
                placeholder="Description of responsibilities and achievements"
                rows={2}
                value={newExp.description}
                onChange={e => setNewExp({ ...newExp, description: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 outline-none"
              />
              <button
                onClick={addExp}
                className="bg-amber-400 text-neutral-950 font-bold uppercase tracking-widest text-xs rounded-xl px-6 py-3 hover:bg-amber-300 transition-all"
              >
                Add Experience
              </button>
            </div>

            {/* Existing Experience Items */}
            <div className="space-y-4">
              {data.experiences.map((exp: any) => (
                <div key={exp.id} className="glass-card p-6 rounded-2xl flex items-start justify-between gap-4">
                  <div>
                    <div className="font-calligraphy text-xl text-neutral-100">{exp.role}</div>
                    <div className="font-cinzel text-xs text-amber-300 uppercase tracking-wider">{exp.company} ({exp.period})</div>
                    <p className="text-xs text-neutral-400 mt-2">{exp.description}</p>
                  </div>
                  <button
                    onClick={() => removeExp(exp.id)}
                    className="text-red-400 text-xs hover:text-red-300 uppercase tracking-wider font-semibold px-3 py-1 bg-red-500/10 rounded-lg shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            {/* Add Project Form */}
            <div className="glass-card p-6 rounded-3xl space-y-4">
              <h3 className="font-cinzel text-sm font-semibold uppercase tracking-widest text-amber-300">+ Add Featured Project</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={newProj.title}
                  onChange={e => setNewProj({ ...newProj, title: e.target.value })}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 outline-none"
                />
                <input
                  type="text"
                  placeholder="Category (e.g. Creative Tech)"
                  value={newProj.category}
                  onChange={e => setNewProj({ ...newProj, category: e.target.value })}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 outline-none"
                />
                <input
                  type="text"
                  placeholder="Tags comma separated (e.g. Next.js, Canvas, Audio)"
                  value={newProj.tags}
                  onChange={e => setNewProj({ ...newProj, tags: e.target.value })}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 outline-none"
                />
              </div>
              <textarea
                placeholder="Project Description"
                rows={2}
                value={newProj.description}
                onChange={e => setNewProj({ ...newProj, description: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 outline-none"
              />
              <div className="flex items-center gap-6">
                <input
                  type="text"
                  placeholder="Project Link URL"
                  value={newProj.link}
                  onChange={e => setNewProj({ ...newProj, link: e.target.value })}
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 outline-none"
                />
                <label className="flex items-center gap-2 text-xs text-amber-200 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProj.featured}
                    onChange={e => setNewProj({ ...newProj, featured: e.target.checked })}
                    className="accent-amber-400"
                  />
                  Featured Badge
                </label>
                <button
                  onClick={addProject}
                  className="bg-amber-400 text-neutral-950 font-bold uppercase tracking-widest text-xs rounded-xl px-6 py-3 hover:bg-amber-300 transition-all shrink-0"
                >
                  Add Project
                </button>
              </div>
            </div>

            {/* Existing Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.projects.map((p: any) => (
                <div key={p.id} className="glass-card p-6 rounded-2xl flex items-start justify-between gap-4">
                  <div>
                    <div className="font-calligraphy text-2xl text-neutral-100">{p.title}</div>
                    <div className="font-cinzel text-xs text-amber-300 uppercase tracking-wider">{p.category}</div>
                    <p className="text-xs text-neutral-400 mt-2">{p.description}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {p.tags.map((t: string, idx: number) => (
                        <span key={idx} className="text-[10px] bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded-full border border-neutral-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => removeProject(p.id)}
                    className="text-red-400 text-xs hover:text-red-300 uppercase tracking-wider font-semibold px-3 py-1 bg-red-500/10 rounded-lg shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
