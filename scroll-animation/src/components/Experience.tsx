'use client';

import React from 'react';
import { experienceData } from '@/data/portfolioData';
import { Briefcase, Calendar, MapPin, Award, CheckCircle } from 'lucide-react';

export default function Experience() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-950/60" id="experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones & Roles</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work Experience & <span className="text-gradient-accent">Leadership</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl">
            Track record of designing scalable web systems, optimizing Core Web Vitals, and leading high-performing teams.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-transparent">
          {experienceData.map((item, index) => (
            <div
              key={item.id}
              className={`relative flex flex-col md:flex-row items-start ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Center Node Badge */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/30 z-20">
                <Award className="w-5 h-5" />
              </div>

              {/* Content Card */}
              <div className="ml-16 md:ml-0 md:w-1/2 px-0 md:px-8 w-full">
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 glass-panel-hover">
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
                      {item.period}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">
                    {item.role}
                  </h3>
                  <p className="text-sm font-semibold text-indigo-400 mb-4">
                    {item.company}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {item.description.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-400 text-xs font-mono border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
