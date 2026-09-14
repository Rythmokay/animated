'use client';

import { useState } from 'react';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: number;
}

export default function SkillsSection({ skills }: { skills: SkillItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!skills || skills.length === 0) return null;

  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="relative z-10 min-h-screen flex items-center justify-center px-6 py-32">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80 mb-3 block">
            Technical Mastery
          </span>
          <h2 className="font-calligraphy text-4xl sm:text-5xl font-normal text-neutral-100 mb-6">
            Skillset & <span className="italic text-amber-200">Capabilities</span>
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-300 text-neutral-950 font-semibold shadow-md shadow-amber-500/20'
                    : 'bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skillset Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filteredSkills.map((skill, idx) => (
            <div key={skill.id || idx} className="glass-card p-5 sm:p-6 rounded-2xl border border-neutral-800/80">
              <div className="flex items-center justify-between mb-2">
                <span className="font-calligraphy text-lg font-medium text-neutral-100">
                  {skill.name}
                </span>
                <span className="font-cinzel text-xs font-bold text-amber-300">
                  {skill.level}%
                </span>
              </div>

              <div className="text-[11px] font-medium uppercase tracking-wider text-neutral-500 mb-3">
                {skill.category}
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-200 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
