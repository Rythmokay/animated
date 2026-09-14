'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 240;

const getFramePath = (index: number) => {
  const frameNum = String(index + 1).padStart(3, '0');
  return `/frames/frame_${frameNum}.jpg`;
};

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showQuote, setShowQuote] = useState(true);
  const [quoteStep, setQuoteStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Animation state refs for rAF loop
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const requestRef = useRef<number | null>(null);

  // Initialize HTML5 Audio for sound.mp3
  useEffect(() => {
    const audio = new Audio('/sound.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Lock scroll while opening quote is active
  useEffect(() => {
    if (showQuote) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showQuote]);

  // Text animation step sequence for quote screen
  useEffect(() => {
    const timer1 = setTimeout(() => setQuoteStep(1), 300);
    const timer2 = setTimeout(() => setQuoteStep(2), 1200);
    const timer3 = setTimeout(() => setQuoteStep(3), 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleStartExperience = () => {
    setShowQuote(false);
    document.body.style.overflow = 'auto';
  };

  const toggleAudio = () => {
    setIsMuted(prev => {
      const nextMuted = !prev;
      if (nextMuted && audioRef.current) {
        audioRef.current.pause();
      }
      return nextMuted;
    });
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

  // Scroll listener: Computes target frame AND controls audio so it ONLY plays while actively scrolling
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

      // Play audio ONLY while actively scrolling
      if (!showQuote && !isMuted && audioRef.current) {
        if (audioRef.current.paused) {
          audioRef.current.play().catch(() => {});
        }

        // Reset scroll stop timer: if no scroll event for 120ms, pause audio immediately!
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          if (audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause();
          }
        }, 120);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [showQuote, isMuted]);

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
      {showQuote && (
        <div
          onClick={handleStartExperience}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#ffffff',
            color: '#000000',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            userSelect: 'none',
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
                color: '#555555',
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

            {/* Interactive Start Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStartExperience();
              }}
              style={{
                background: '#000000',
                color: '#ffffff',
                border: 'none',
                padding: '16px 38px',
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
      )}

      {/* Floating Audio Control Button */}
      {!showQuote && (
        <button
          onClick={toggleAudio}
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 100,
            background: 'rgba(15, 15, 15, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: isMuted ? '#71717a' : '#f4f4f5',
            padding: '10px 20px',
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
          aria-label="Toggle Scroll Sound"
        >
          <span>{isMuted ? '🔇' : '🎧'}</span>
          <span>{isMuted ? 'Scroll Sound OFF' : 'Scroll Sound ON'}</span>
        </button>
      )}

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
