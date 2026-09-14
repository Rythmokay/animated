'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 240;

const getFramePath = (index: number) => {
  const frameNum = String(index + 1).padStart(3, '0');
  return `/frames/frame_${frameNum}.jpg`;
};

export type SoundMode = 'haptic' | 'wood' | 'tick' | 'muted';

// Crystal-Clear Web Audio ASMR Sound Engine (Pure Sine/Triangle Oscillators - Zero Static Noise)
class ASMRSoundEngine {
  private ctx: AudioContext | null = null;
  public mode: SoundMode = 'haptic';

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
    } catch {
      // AudioContext not supported
    }
  }

  playTick(velocity = 1) {
    if (this.mode === 'muted') return;
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (this.mode === 'haptic') {
        // Mode 1: Haptic Click (Apple Crown / Mechanical Wheel - Pure Sine Pitch Sweep)
        osc.type = 'sine';
        const startFreq = Math.min(900, 650 + velocity * 25);
        const endFreq = 160;
        osc.frequency.setValueAtTime(startFreq, t);
        osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.007);

        const vol = Math.min(0.04, 0.012 + Math.min(0.02, velocity * 0.004));
        gain.gain.setValueAtTime(vol, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.007);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.008);

      } else if (this.mode === 'wood') {
        // Mode 2: Soft Wood Pop (Warm Mechanical Camera Shutter / Woodblock)
        osc.type = 'triangle';
        const startFreq = Math.min(1400, 1000 + velocity * 30);
        osc.frequency.setValueAtTime(startFreq, t);
        osc.frequency.exponentialRampToValueAtTime(220, t + 0.012);

        const vol = Math.min(0.035, 0.01 + Math.min(0.018, velocity * 0.003));
        gain.gain.setValueAtTime(vol, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.012);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.013);

      } else if (this.mode === 'tick') {
        // Mode 3: Minimal Whisper Tick (Ultra-quiet high frequency tap)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1800, t);
        osc.frequency.exponentialRampToValueAtTime(500, t + 0.004);

        const vol = Math.min(0.025, 0.008 + Math.min(0.012, velocity * 0.002));
        gain.gain.setValueAtTime(vol, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.004);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.005);
      }
    } catch {
      // Ignore audio playback errors
    }
  }
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const soundEngineRef = useRef<ASMRSoundEngine | null>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [soundMode, setSoundMode] = useState<SoundMode>('haptic');
  const [hasInteracted, setHasInteracted] = useState(false);

  // Animation state refs for rAF loop
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const requestRef = useRef<number | null>(null);

  // Initialize ASMR Audio Engine
  useEffect(() => {
    soundEngineRef.current = new ASMRSoundEngine();

    const handleFirstInteraction = () => {
      if (soundEngineRef.current) {
        soundEngineRef.current.init();
      }
      setHasInteracted(true);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('scroll', handleFirstInteraction, { passive: true });
    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Sync sound mode
  const changeSoundMode = (newMode: SoundMode) => {
    setSoundMode(newMode);
    if (soundEngineRef.current) {
      soundEngineRef.current.mode = newMode;
      if (newMode !== 'muted') {
        soundEngineRef.current.playTick(1.5);
      }
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

  // Scroll listener to compute target frame
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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      drawFrame(Math.round(currentFrameRef.current));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation loop with lerping & sound triggering
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

        if (lastDrawnFrame !== -1 && soundEngineRef.current) {
          const frameDelta = Math.abs(frameToDraw - lastDrawnFrame);
          soundEngineRef.current.playTick(frameDelta);
        }

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

      {/* Premium Floating Sound Control Menu */}
      <div
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 100,
          background: 'rgba(15, 15, 15, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '30px',
          padding: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        }}
      >
        <button
          onClick={() => changeSoundMode('haptic')}
          style={{
            background: soundMode === 'haptic' ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
            border: 'none',
            color: soundMode === 'haptic' ? '#ffffff' : '#a1a1aa',
            padding: '8px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          🎧 Haptic
        </button>

        <button
          onClick={() => changeSoundMode('wood')}
          style={{
            background: soundMode === 'wood' ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
            border: 'none',
            color: soundMode === 'wood' ? '#ffffff' : '#a1a1aa',
            padding: '8px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          🪵 Wood Pop
        </button>

        <button
          onClick={() => changeSoundMode('tick')}
          style={{
            background: soundMode === 'tick' ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
            border: 'none',
            color: soundMode === 'tick' ? '#ffffff' : '#a1a1aa',
            padding: '8px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          ✨ Soft Tick
        </button>

        <button
          onClick={() => changeSoundMode('muted')}
          style={{
            background: soundMode === 'muted' ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
            border: 'none',
            color: soundMode === 'muted' ? '#ef4444' : '#71717a',
            padding: '8px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          🔇 Mute
        </button>
      </div>

      {/* Subtle interaction tip */}
      {!hasInteracted && isLoaded && (
        <div
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '8px 22px',
            borderRadius: '20px',
            fontSize: '12px',
            color: '#d4d4d8',
            pointerEvents: 'none',
            letterSpacing: '0.04em',
          }}
        >
          Scroll to trigger interactive sound presets
        </div>
      )}

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
