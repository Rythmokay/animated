'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/src/components/Navbar';
import AboutSection from '@/src/components/AboutSection';
import ExperienceSection from '@/src/components/ExperienceSection';
import SkillsSection from '@/src/components/SkillsSection';
import ProjectsSection from '@/src/components/ProjectsSection';
import HandwrittenText from '@/src/components/HandwrittenText';

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

  // Initialize HTML5 Audio with reduced volume (15% volume)
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

  // Smooth staggered text animation step sequence for quote screen with automatic fade-out
  useEffect(() => {
    const timer1 = setTimeout(() => setQuoteStep(1), 200);
    const timer2 = setTimeout(() => setQuoteStep(2), 800);
    const timer3 = setTimeout(() => setQuoteStep(3), 1600);
    const timerAutoExit = setTimeout(() => {
      handleStartExperience();
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerAutoExit);
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

      // Play reduced volume audio ONLY while actively scrolling
      if (!showQuote && !isMuted && audioRef.current) {
        audioRef.current.volume = 0.15;
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
          <div style={{ maxWidth: '820px', width: '100%' }}>
            {/* Subtitle Badge */}
            <div
              style={{
                fontFamily: 'var(--font-cinzel), serif',
                fontSize: '13px',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#000000',
                fontWeight: 700,
                marginBottom: '24px',
                opacity: quoteStep >= 1 ? 1 : 0,
                transform: quoteStep >= 1 ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              WELCOME TO MY PORTFOLIO
            </div>

            {/* Structured Quote Block */}
            <blockquote
              style={{
                fontSize: 'clamp(24px, 3.8vw, 42px)',
                fontWeight: 600,
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontStyle: 'normal',
                lineHeight: 1.35,
                color: '#000000',
                margin: '0 0 32px 0',
                padding: '0 16px',
                display: 'block',
                opacity: quoteStep >= 2 ? 1 : 0,
                transform: quoteStep >= 2 ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 1.0s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              “Architecting high-performance Android, iOS &amp; full-stack web platforms with engineering precision.”
            </blockquote>

            {/* Author Attribution */}
            <div
              style={{
                fontFamily: 'var(--font-cinzel), serif',
                fontSize: '14px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#000000',
                fontWeight: 700,
                marginBottom: '48px',
                opacity: quoteStep >= 2 ? 1 : 0,
                transition: 'all 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
              }}
            >
              — RYTHM JAGGA
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
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                opacity: quoteStep >= 3 ? 1 : 0,
                transform: quoteStep >= 3 ? 'scale(1)' : 'scale(0.95)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Explore Portfolio
            </button>
          </div>
        </div>
      )}

      {/* Crystal Clear Full Screen Canvas Fixed to Background */}
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
          opacity: showQuote ? 0 : 1, // 100% Full Opacity to make the background person crystal clear
          transition: 'opacity 1.5s ease',
        }}
      />

      {/* Left-Aligned Hero Section Banner (Strictly Constrained to 460px on Left to Prevent Overlapping Background Character) */}
      {!showQuote && (
        <section
          style={{
            position: 'relative',
            zIndex: 10,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '120px 24px',
          }}
        >
          <div
            style={{
              maxWidth: '460px',
              width: '100%',
              marginLeft: 'clamp(16px, 4vw, 60px)',
              textAlign: 'left',
            }}
          >
            {/* Subtitle Category Line */}
            <span
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#000000',
                marginBottom: '14px',
                display: 'block',
              }}
            >
              {portfolioData?.about?.title || 'FULL STACK & MOBILE SOFTWARE ENGINEER'}
            </span>

            {/* Main Name Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-outfit), var(--font-inter), sans-serif',
                fontSize: 'clamp(44px, 5.5vw, 68px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: '#000000',
                marginBottom: '20px',
              }}
            >
              {portfolioData?.about?.name || 'Rythm Jagga'}
            </h1>

            {/* Main Bio Paragraph */}
            <p
              style={{
                marginBottom: '32px',
                color: '#18181b',
                fontSize: 'clamp(16px, 1.8vw, 19px)',
                lineHeight: 1.6,
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 450,
              }}
            >
              {portfolioData?.about?.tagline || 'Full Stack Software Engineer experienced in engineering production mobile apps (Android with Kotlin, iOS with Swift/UIKit) and full-stack web systems (MERN Stack, Next.js, Spring Boot).'}
            </p>

            {/* Clean CTA Button */}
            <div>
              <a
                href="#about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 34px',
                  borderRadius: '30px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  background: '#000000',
                  color: '#ffffff',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.2s ease',
                }}
              >
                <span>Explore Portfolio</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Layered Left-Aligned Portfolio Sections */}
      {!showQuote && portfolioData && (
        <>
          <AboutSection data={portfolioData.about} />
          <ExperienceSection experiences={portfolioData.experiences} />
          <SkillsSection skills={portfolioData.skills} />
          <ProjectsSection projects={portfolioData.projects} />

          {/* Footer */}
          <footer
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '64px 24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div
              style={{
                maxWidth: '560px',
                marginLeft: 'clamp(24px, 6vw, 100px)',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '28px',
                  fontWeight: 400,
                  color: '#ffffff',
                  marginBottom: '12px',
                }}
              >
                Rythm Jagga
              </div>
              <p style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
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
