'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 240;

const getFramePath = (index: number) => {
  const frameNum = String(index + 1).padStart(3, '0');
  return `/frames/frame_${frameNum}.jpg`;
};

// Web Audio ASMR Click Synthesizer for tactile scroll sound
class ASMRSoundEngine {
  private ctx: AudioContext | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  public isMuted: boolean = false;

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.createNoiseBuffer();
    } catch {
      // AudioContext not supported or blocked
    }
  }

  private createNoiseBuffer() {
    if (!this.ctx) return;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.02); // 20ms noise buffer
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Soft organic noise curve
      output[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }
    this.noiseBuffer = buffer;
  }

  playTick(velocity = 1) {
    if (this.isMuted) return;
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    try {
      const t = this.ctx.currentTime;

      // 1. Noise click source
      const source = this.ctx.createBufferSource();
      if (!this.noiseBuffer) this.createNoiseBuffer();
      if (!this.noiseBuffer) return;
      source.buffer = this.noiseBuffer;

      // 2. Warm bandpass filter (film reel / mechanical ASMR tone)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      // Slight pitch variation per tick for organic texture
      const centerFreq = 1500 + (Math.random() * 200 - 100) + Math.min(600, velocity * 100);
      filter.frequency.setValueAtTime(centerFreq, t);
      filter.Q.setValueAtTime(3.0, t);

      // 3. Exponential decay volume envelope
      const gain = this.ctx.createGain();
      const baseVol = Math.min(0.06, 0.015 + Math.min(0.035, velocity * 0.008));
      gain.gain.setValueAtTime(baseVol, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.006);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      source.start(t);
      source.stop(t + 0.008);
    } catch {
      // Ignore transient audio play errors
    }
  }
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const soundEngineRef = useRef<ASMRSoundEngine | null>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
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

  // Animation loop with lerping & ASMR audio triggering
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

        // Trigger ASMR micro-tick sound when frame changes
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

  const toggleSound = () => {
    if (soundEngineRef.current) {
      soundEngineRef.current.isMuted = !soundEngineRef.current.isMuted;
      setIsAudioMuted(soundEngineRef.current.isMuted);
    }
  };

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

      {/* Floating ASMR Audio Control Button */}
      <button
        onClick={toggleSound}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 100,
          background: 'rgba(15, 15, 15, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: isAudioMuted ? '#71717a' : '#f4f4f5',
          padding: '10px 18px',
          borderRadius: '30px',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.04em',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          transition: 'all 0.2s ease',
        }}
        aria-label="Toggle ASMR Scroll Sound"
      >
        <span style={{ fontSize: '14px' }}>{isAudioMuted ? '🔇' : '🎧'}</span>
        <span>{isAudioMuted ? 'ASMR Sound OFF' : 'ASMR Sound ON'}</span>
      </button>

      {/* Subtle interaction tip / audio indicator */}
      {!hasInteracted && isLoaded && (
        <div
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '8px 20px',
            borderRadius: '20px',
            fontSize: '12px',
            color: '#a1a1aa',
            pointerEvents: 'none',
            letterSpacing: '0.04em',
          }}
        >
          Scroll to experience ASMR sound
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
