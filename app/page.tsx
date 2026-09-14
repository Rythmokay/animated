'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/src/components/Navbar';
import AboutSection from '@/src/components/AboutSection';
import ExperienceSection from '@/src/components/ExperienceSection';
import SkillsSection from '@/src/components/SkillsSection';
import ProjectsSection from '@/src/components/ProjectsSection';

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

  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showQuote, setShowQuote] = useState(true);
  const [isExitingQuote, setIsExitingQuote] = useState(false);
  const [quoteStep, setQuoteStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Animation state refs for rAF loop
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const requestRef = useRef<number | null>(null);

  // Fetch live portfolio data from Next.js backend API
  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setPortfolioData(data);
        }
      })
      .catch(err => console.error('Error fetching portfolio data:', err));
  }, []);

  // Initialize HTML5 Audio with gentle volume (15% volume)
  useEffect(() => {
    const audio = new Audio('/sound.mp3');
    audio.loop = true;
    audio.volume = 0.15; // Gentle, subtle background volume
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

  // Smooth staggered text animation step sequence for quote screen
  useEffect(() => {
    const timer1 = setTimeout(() => setQuoteStep(1), 300);
    const timer2 = setTimeout(() => setQuoteStep(2), 1000);
    const timer3 = setTimeout(() => setQuoteStep(3), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleStartExperience = () => {
    if (isExitingQuote) return;
    setIsExitingQuote(true);

    setTimeout(() => {
      setShowQuote(false);
      document.body.style.overflow = 'auto';
    }, 1000);
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

  // Scroll listener: Computes target frame AND controls audio so it ONLY plays while actively scrolling (volume = 0.15)
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

      // Play reduced volume audio ONLY while actively scrolling
      if (!showQuote && !isMuted && audioRef.current) {
        audioRef.current.volume = 0.15; // 15% volume
        if (audioRef.current.paused) {
          audioRef.current.play().catch(() => {});
        }

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          if (audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause();
          }
        }, 130);
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
    <main className="relative width-full bg-[#050505] text-white overflow-x-hidden">
      {/* Floating Navbar */}
      {!showQuote && <Navbar isMuted={isMuted} toggleAudio={toggleAudio} />}

      {/* Full Screen White Intro Overlay with Calligraphic Font Quote */}
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
            opacity: isExitingQuote ? 0 : 1,
            transform: isExitingQuote ? 'scale(1.02)' : 'scale(1)',
            transition: 'opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1), transform 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
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
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              A Reflection On Persistence
            </div>

            {/* Main Philosophical Quote on Failure & Hard Work */}
            <blockquote
              style={{
                fontSize: 'clamp(24px, 4vw, 42px)',
                fontWeight: 400,
                fontFamily: "var(--font-cormorant), Georgia, 'Times New Roman', serif",
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                color: '#000000',
                margin: '0 0 32px 0',
                opacity: quoteStep >= 2 ? 1 : 0,
                transform: quoteStep >= 2 ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {portfolioData?.about?.quote || "“Do not judge me by my successes, judge me by how many times I fell down and got back up again.”"}
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
                transition: 'all 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
              }}
            >
              — {portfolioData?.about?.quoteAuthor || "Nelson Mandela"}
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
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
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

      {/* Full screen canvas fixed to viewport background */}
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
          opacity: showQuote ? 0 : 0.85,
          transition: 'opacity 1.5s ease',
        }}
      />

      {/* Hero Section Banner */}
      {!showQuote && (
        <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-24 pb-12 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.4em] text-amber-300 mb-6 block">
              {portfolioData?.about?.title || 'Creative Technologist'}
            </span>
            <h1 className="font-calligraphy text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-white mb-8">
              {portfolioData?.about?.name || 'Rythm Jagga'}
            </h1>
            <p className="font-calligraphy text-2xl sm:text-3xl text-neutral-300 italic max-w-2xl mx-auto mb-12">
              {portfolioData?.about?.tagline || 'Architecting high-performance digital experiences through engineering precision.'}
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="#about"
                className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-amber-200 to-amber-400 text-neutral-950 hover:from-amber-100 hover:to-amber-300 transition-all shadow-xl shadow-amber-500/20"
              >
                Explore Portfolio ↓
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Layered Portfolio Sections */}
      {!showQuote && portfolioData && (
        <>
          <AboutSection data={portfolioData.about} />
          <ExperienceSection experiences={portfolioData.experiences} />
          <SkillsSection skills={portfolioData.skills} />
          <ProjectsSection projects={portfolioData.projects} />

          {/* Footer */}
          <footer className="relative z-10 py-16 px-6 border-t border-neutral-800/80 text-center">
            <div className="max-w-5xl mx-auto">
              <div className="font-calligraphy text-3xl font-normal text-neutral-200 mb-4">
                Rythm Jagga
              </div>
              <p className="text-xs text-neutral-500 uppercase tracking-widest mb-6">
                © {new Date().getFullYear()} — Built with Next.js 15, Canvas 2D & Luxury Aesthetics
              </p>
            </div>
          </footer>
        </>
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
