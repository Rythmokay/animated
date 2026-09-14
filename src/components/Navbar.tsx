'use client';

import { useEffect, useState } from 'react';

interface NavbarProps {
  isMuted: boolean;
  toggleAudio: () => void;
}

export default function Navbar({ isMuted, toggleAudio }: NavbarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Trigger Dynamic Island opening expansion animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: '24px',
        left: 0,
        width: '100%',
        zIndex: 99,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Dynamic Island Capsule Pill (Matching Reference Image) */}
      <div
        style={{
          pointerEvents: 'auto',
          position: 'relative',
          width: !isExpanded ? '64px' : '380px',
          maxWidth: '92vw',
          height: '54px',
          borderRadius: '40px',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 12px 35px -8px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px',
          overflow: 'hidden',
          transition: 'all 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Left Section: Home Icon */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '46px',
            height: '40px',
            color: '#000000',
            textDecoration: 'none',
            borderRadius: '20px',
            transition: 'transform 0.2s ease, opacity 0.3s ease',
            opacity: isExpanded ? 1 : 0.8,
            flexShrink: 0,
          }}
          aria-label="Home"
          title="Home"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </a>

        {/* Thin Vertical Divider 1 */}
        <div
          style={{
            width: '1px',
            height: '24px',
            background: 'rgba(0, 0, 0, 0.12)',
            opacity: isExpanded ? 1 : 0,
            transition: 'opacity 0.4s ease 0.3s',
            flexShrink: 0,
          }}
        />

        {/* Middle Section: Social & Contact Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '0 8px',
            opacity: isExpanded ? 1 : 0,
            transform: isExpanded ? 'scale(1)' : 'scale(0.85)',
            transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            visibility: isExpanded ? 'visible' : 'hidden',
          }}
        >
          {/* GitHub */}
          <a
            href="https://github.com/Rythmokay/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              color: '#000000',
              textDecoration: 'none',
              transition: 'transform 0.2s ease',
            }}
            aria-label="GitHub"
            title="GitHub"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/rythmjagga/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              color: '#000000',
              textDecoration: 'none',
              transition: 'transform 0.2s ease',
            }}
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>

          {/* X / Twitter */}
          <a
            href="https://workrythm.vercel.app"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              color: '#000000',
              textDecoration: 'none',
              transition: 'transform 0.2s ease',
            }}
            aria-label="X / Website"
            title="X / Website"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:rythm.meta@gmail.com"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              color: '#000000',
              textDecoration: 'none',
              transition: 'transform 0.2s ease',
            }}
            aria-label="Email"
            title="Email"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>

        {/* Thin Vertical Divider 2 */}
        <div
          style={{
            width: '1px',
            height: '24px',
            background: 'rgba(0, 0, 0, 0.12)',
            opacity: isExpanded ? 1 : 0,
            transition: 'opacity 0.4s ease 0.3s',
            flexShrink: 0,
          }}
        />

        {/* Right Section: Audio / Mode Toggle */}
        <button
          onClick={toggleAudio}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '46px',
            height: '40px',
            background: 'transparent',
            border: 'none',
            color: '#000000',
            cursor: 'pointer',
            opacity: isExpanded ? 1 : 0,
            transition: 'opacity 0.4s ease 0.35s',
            flexShrink: 0,
          }}
          aria-label="Toggle Audio"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        </button>
      </div>
    </header>
  );
}


