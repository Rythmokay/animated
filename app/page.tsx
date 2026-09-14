'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 240;

const getFramePath = (index: number) => {
  const frameNum = String(index + 1).padStart(3, '0');
  return `/frames/frame_${frameNum}.jpg`;
};

// Synchronized Web Audio Engine for Opening Intro & Scroll Resonance
class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscs: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;
  private isInitialized = false;

  init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Master gain node
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Low pass filter for warm cinematic tone
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(450, this.ctx.currentTime);
      this.filter.connect(this.masterGain);

      this.isInitialized = true;
    } catch {
      // AudioContext blocked or unsupported
    }
  }

  // Play opening synchronized chord pulse
  playIntroChord() {
    this.init();
    if (!this.ctx || !this.filter || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    const t = this.ctx.currentTime;
    
    // Stop any previous oscillators
    this.oscs.forEach(osc => {
      try { osc.stop(); } catch {}
    });
    this.oscs = [];

    // F-minor / C-deep atmospheric ambient triad (C2, F2, Ab2, C3)
    const freqs = [65.41, 87.31, 103.83, 130.81];

    freqs.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const oscGain = this.ctx!.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      // Slight detune for rich analog chorus warmth
      const detune = (i - 1.5) * 4;
      osc.detune.setValueAtTime(detune, t);

      oscGain.gain.setValueAtTime(0.12 / freqs.length, t);
      osc.connect(oscGain);
      oscGain.connect(this.filter!);

      osc.start(t);
      this.oscs.push(osc);
    });

    // Fade in master gain smoothly
    this.masterGain.gain.cancelScheduledValues(t);
    this.masterGain.gain.setValueAtTime(0.001, t);
    this.masterGain.gain.exponentialRampToValueAtTime(0.18, t + 1.2);

    // Filter frequency sweep
    this.filter.frequency.cancelScheduledValues(t);
    this.filter.frequency.setValueAtTime(300, t);
    this.filter.frequency.exponentialRampToValueAtTime(850, t + 2.5);
  }

  // Modulate sound smoothly during scroll
  updateScrollAudio(scrollRatio: number) {
    if (!this.ctx || !this.filter || !this.masterGain || this.oscs.length === 0) return;

    const t = this.ctx.currentTime;
    
    // Dynamically adjust cutoff frequency based on scroll position
    const targetFreq = Math.min(2200, 400 + scrollRatio * 1600);
    this.filter.frequency.setTargetAtTime(targetFreq, t, 0.1);

    // Subtly modulate pitch to match frame progression speed
    this.oscs.forEach((osc, i) => {
      const baseFreq = [65.41, 87.31, 103.83, 130.81][i] || 100;
      const pitchMod = baseFreq * (1 + scrollRatio * 0.15);
      osc.frequency.setTargetAtTime(pitchMod, t, 0.1);
    });
  }

  stop() {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;
    this.masterGain.gain.setTargetAtTime(0.0001, t, 0.3);
    setTimeout(() => {
      this.oscs.forEach(osc => {
        try { osc.stop(); } catch {}
      });
      this.oscs = [];
    }, 500);
  }
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const audioEngineRef = useRef<CinematicAudioEngine | null>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showQuote, setShowQuote] = useState(true);
  const [quoteStep, setQuoteStep] = useState(0);

  // Animation state refs for rAF loop
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const requestRef = useRef<number | null>(null);

  // Initialize Cinematic Audio Engine
  useEffect(() => {
    audioEngineRef.current = new CinematicAudioEngine();
  }, []);

  // Text animation step sequence for quote screen
  useEffect(() => {
    const timer1 = setTimeout(() => setQuoteStep(1), 400);
    const timer2 = setTimeout(() => setQuoteStep(2), 1800);
    const timer3 = setTimeout(() => setQuoteStep(3), 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleStartExperience = () => {
    setShowQuote(false);
    if (audioEngineRef.current) {
      audioEngineRef.current.playIntroChord();
    }
  };

  // Preload frames
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let loadedCounter = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);

      const onFrameLoad = () => {
        if (!isMounted) return;
        loadedCounter++;
        setLoadedCount(loadedCounter);

        if (i === 0 && canvasRef.current) {
          drawFrame(0);
        }

        if (loadedCounter === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onload = onFrameLoad;
      img.onerror = onFrameLoad;
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, []);

  // Helper to draw a specific frame index with object-cover fit
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[frameIndex - offset];
        const next = imagesRef.current[frameIndex + offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const canvasAspect = canvasWidth / canvasHeight;
    const imgAspect = imgWidth / imgHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasAspect > imgAspect) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgAspect;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgAspect;
      drawHeight = canvasHeight;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Scroll listener to compute target frame & sync audio modulation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;

      if (maxScroll <= 0) return;

      const scrollFraction = Math.min(1, Math.max(0, scrollTop / maxScroll));
      targetFrameRef.current = scrollFraction * (TOTAL_FRAMES - 1);

      // Auto dismiss quote on initial scroll
      if (scrollTop > 50 && showQuote) {
        setShowQuote(false);
        if (audioEngineRef.current) {
          audioEngineRef.current.playIntroChord();
        }
      }

      // Modulate audio with scroll
      if (audioEngineRef.current) {
        audioEngineRef.current.updateScrollAudio(scrollFraction);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [showQuote]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      drawFrame(Math.round(currentFrameRef.current));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation loop with lerping
  useEffect(() => {
    let lastDrawnFrame = -1;

    const animate = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      const diff = target - current;
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.35;
      } else {
        currentFrameRef.current = target;
      }

      const frameToDraw = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      if (frameToDraw !== lastDrawnFrame) {
        drawFrame(frameToDraw);
        lastDrawnFrame = frameToDraw;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const progressPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <main
      style={{
        minHeight: '600vh',
        height: '600vh',
        position: 'relative',
        width: '100%',
        background: '#050505',
      }}
    >
      {/* Full Screen White Intro Overlay with Black Font */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#ffffff',
          color: '#000000',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          textAlign: 'center',
          opacity: showQuote ? 1 : 0,
          pointerEvents: showQuote ? 'auto' : 'none',
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{ maxWidth: '850px', width: '100%' }}>
          {/* Subtitle Tagline */}
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              marginBottom: '32px',
              color: '#444444',
              opacity: quoteStep >= 1 ? 1 : 0,
              transform: quoteStep >= 1 ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.8s ease',
            }}
          >
            A Reflection On Persistence
          </div>

          {/* Main Philosophical Quote on Failure & Hard Work */}
          <blockquote
            style={{
              fontSize: 'clamp(24px, 4vw, 42px)',
              fontWeight: 400,
              fontFamily: "Georgia, 'Times New Roman', serif",
              lineHeight: 1.4,
              letterSpacing: '-0.01em',
              color: '#000000',
              margin: '0 0 32px 0',
              opacity: quoteStep >= 2 ? 1 : 0,
              transform: quoteStep >= 2 ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 1.0s ease',
            }}
          >
            “Do not judge me by my successes, judge me by how many times I fell down and got back up again.”
          </blockquote>

          {/* Quote Author */}
          <div
            style={{
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#666666',
              marginBottom: '48px',
              opacity: quoteStep >= 2 ? 1 : 0,
              transition: 'all 1.0s ease 0.2s',
            }}
          >
            — Nelson Mandela
          </div>

          {/* Interactive Start Button with Synchronized Audio */}
          <button
            onClick={handleStartExperience}
            style={{
              background: '#000000',
              color: '#ffffff',
              border: 'none',
              padding: '16px 36px',
              borderRadius: '40px',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              opacity: quoteStep >= 3 ? 1 : 0,
              transform: quoteStep >= 3 ? 'scale(1)' : 'scale(0.95)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Begin Experience
          </button>
        </div>
      </div>

      {/* Full screen canvas fixed to viewport */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'block',
          objectFit: 'cover',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Non-intrusive preloader indicator */}
      {!isLoaded && (
        <div
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            color: '#a1a1aa',
            letterSpacing: '0.05em',
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease',
          }}
        >
          Loading assets {progressPercent}%
        </div>
      )}
    </main>
  );
}
