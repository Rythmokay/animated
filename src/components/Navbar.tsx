'use client';

import Link from 'next/link';

interface NavbarProps {
  isMuted: boolean;
  toggleAudio: () => void;
}

export default function Navbar({ isMuted, toggleAudio }: NavbarProps) {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        className="glass-pill"
        style={{
          maxWidth: '1100px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 28px',
          borderRadius: '50px',
          pointerEvents: 'auto',
        }}
      >
        {/* Brand Logo / Monogram */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: '#111113',
              border: '1px solid rgba(223, 194, 133, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#dfc285',
            }}
          >
            R
          </div>
          <span
            style={{
              fontFamily: 'var(--font-cinzel), serif',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: '#f4f4f5',
            }}
          >
            RYTHM JAGGA
          </span>
        </Link>

        {/* Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: '#a1a1aa',
          }}
        >
          <a href="#about" style={{ color: 'inherit', textDecoration: 'none' }}>
            About
          </a>
          <a href="#experience" style={{ color: 'inherit', textDecoration: 'none' }}>
            Experience
          </a>
          <a href="#skills" style={{ color: 'inherit', textDecoration: 'none' }}>
            Skillset
          </a>
          <a href="#projects" style={{ color: 'inherit', textDecoration: 'none' }}>
            Projects
          </a>
        </nav>

        {/* Audio Toggle Control */}
        <button
          onClick={toggleAudio}
          style={{
            padding: '8px 18px',
            borderRadius: '30px',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            background: 'rgba(15, 15, 18, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: isMuted ? '#71717a' : '#f4f4f5',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
          aria-label="Toggle Sound"
        >
          <span>{isMuted ? '🔇' : '🎧'}</span>
          <span>{isMuted ? 'Muted' : 'Audio'}</span>
        </button>
      </div>
    </header>
  );
}
