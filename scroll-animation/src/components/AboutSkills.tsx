'use client';

import React, { useState } from 'react';
import { skillCategoriesData } from '@/data/portfolioData';
import { Layout, Server, Sparkles, Cloud, CheckCircle2, Code2, Search, Cpu, Layers } from 'lucide-react';

export default function AboutSkills() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-5 h-5" />;
      case 'Server':
        return <Server className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5" />;
      default:
        return <Code2 className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-slate-950/60" id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-3">
            <Search className="w-3.5 h-3.5" />
            <span>Technical Capabilities & Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Specialized Tech Stack & <span className="text-gradient-accent">Architecture Skills</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl">
            Built with modern standards, strict typing, and SEO best practices to ensure peak search visibility and lightning rendering.
          </p>
        </div>

        {/* Skill Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {skillCategoriesData.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => setSelectedCategory(idx)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                selectedCategory === idx
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {getCategoryIcon(cat.iconName)}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Skill Category Card Grid */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800/90 max-w-4xl mx-auto">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                {getCategoryIcon(skillCategoriesData[selectedCategory].iconName)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {skillCategoriesData[selectedCategory].title}
                </h3>
                <p className="text-xs text-slate-400">Core technologies & tools</p>
              </div>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 text-slate-300">
              {skillCategoriesData[selectedCategory].skills.length} Core Competencies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategoriesData[selectedCategory].skills.map((skill) => (
              <div
                key={skill.name}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${skill.highlight ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <span className="text-sm font-semibold text-slate-200">{skill.name}</span>
                  </div>
                  {skill.highlight && (
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                      Core Specialty
                    </span>
                  )}
                </div>
                {/* Progress Indicator */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
