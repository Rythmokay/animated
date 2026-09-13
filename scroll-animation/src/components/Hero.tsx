'use client';

import React from 'react';
import { ArrowRight, Download, Sparkles, Zap, ShieldCheck, Search, Code, Cpu } from 'lucide-react';
import { profileData } from '@/data/portfolioData';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden" id="hero">
      {/* Background Ambient Glow Effects */}
      <div className="glow-ambient w-96 h-96 bg-indigo-600 top-10 left-1/4 animate-pulse-glow" />
      <div className="glow-ambient w-80 h-80 bg-sky-500 top-40 right-10 animate-pulse-glow" style={{ animationDelay: '4s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-indigo-500/30 text-xs font-semibold text-slate-300 shadow-inner mb-6 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>{profileData.status}</span>
          </div>

          {/* SEO Primary Heading - H1 */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Engineering High-Performance <br className="hidden sm:inline" />
            <span className="text-gradient-accent">Next.js & AI Web Applications</span>
          </h1>

          {/* Bio & Intro Paragraph */}
          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2.5xl leading-relaxed">
            Hi, I&apos;m <span className="font-semibold text-white">{profileData.name}</span>. Senior Full Stack Engineer specializing in <span className="text-indigo-400 font-medium">Next.js App Router</span>, <span className="text-sky-400 font-medium">Core Web Vitals SEO</span>, and <span className="text-purple-400 font-medium">AI Agent Platforms</span>. I transform complex ideas into lightning-fast, accessible, and search-optimized digital products.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              Explore Featured Projects
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Schedule a Consultation
            </a>
          </div>

          {/* Highlights & Tech Tags Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl mb-12 text-left">
            <div className="glass-panel p-4 rounded-2xl border border-slate-800/80">
              <div className="flex items-center gap-2 text-indigo-400 mb-1">
                <Search className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Technical SEO</span>
              </div>
              <p className="text-sm font-semibold text-white">99+ Google Ratings</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-slate-800/80">
              <div className="flex items-center gap-2 text-sky-400 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Speed First</span>
              </div>
              <p className="text-sm font-semibold text-white">&lt; 0.5s Initial Paint</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-slate-800/80">
              <div className="flex items-center gap-2 text-purple-400 mb-1">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">AI Enabled</span>
              </div>
              <p className="text-sm font-semibold text-white">RAG & LLM Agents</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-slate-800/80">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Architecture</span>
              </div>
              <p className="text-sm font-semibold text-white">Enterprise Scalable</p>
            </div>
          </div>

          {/* Metric Counter Bar */}
          <div className="w-full glass-panel p-6 rounded-3xl border border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-extrabold text-white">{profileData.yearsExperience}+</p>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-indigo-400">{profileData.completedProjects}+</p>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Shipped Projects</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-sky-400">{profileData.happyClients}+</p>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Satisfied Clients</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-emerald-400">{profileData.openSourceContributions}</p>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">GitHub Stars & Commits</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
