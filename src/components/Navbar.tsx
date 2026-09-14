'use client';

import Link from 'next/link';

interface NavbarProps {
  isMuted: boolean;
  toggleAudio: () => void;
}

export default function Navbar({ isMuted, toggleAudio }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-pill px-6 py-3 rounded-full">
        {/* Brand Logo / Monogram */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-neutral-900 border border-amber-500/30 flex items-center justify-center font-calligraphy text-lg font-bold text-amber-200 group-hover:border-amber-400 transition-colors">
            R
          </div>
          <span className="font-cinzel text-sm font-semibold tracking-widest text-neutral-200 group-hover:text-amber-200 transition-colors">
            RYTHM JAGGA
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest text-neutral-400">
          <a href="#about" className="hover:text-amber-200 transition-colors">
            About
          </a>
          <a href="#experience" className="hover:text-amber-200 transition-colors">
            Experience
          </a>
          <a href="#skills" className="hover:text-amber-200 transition-colors">
            Skillset
          </a>
          <a href="#projects" className="hover:text-amber-200 transition-colors">
            Projects
          </a>
        </nav>

        {/* Action Controls (Sound Toggle & Dashboard Button) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleAudio}
            className="px-4 py-2 rounded-full text-xs font-medium tracking-wider bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-amber-200 transition-all flex items-center gap-2"
            aria-label="Toggle Sound"
          >
            <span>{isMuted ? '🔇' : '🎧'}</span>
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio'}</span>
          </button>

          <Link
            href="/dashboard"
            className="px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-amber-200 to-amber-400 text-neutral-950 hover:from-amber-100 hover:to-amber-300 transition-all shadow-lg shadow-amber-500/10"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
