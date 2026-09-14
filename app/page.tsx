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
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Animation state refs for rAF loop
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const requestRef = useRef<number | null>(null);

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
        
        // Trigger initial draw as soon as first frame loads
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

  // Animation loop with lerping for responsive, smooth transitions
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

      {/* Non-intrusive loading indicator */}
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
