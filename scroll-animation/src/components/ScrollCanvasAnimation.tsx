'use client';

import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 300;

export default function ScrollCanvasAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(1);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Format frame index: 1 -> "001", 45 -> "045", 300 -> "300"
  const getFrameFilename = (index: number) => {
    const padded = String(index).padStart(3, '0');
    return `/animated-portfolio/ezgif-frame-${padded}.jpg`;
  };

  // Preload image frames
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameFilename(i);
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // Razor-Sharp Fullscreen Canvas Render (Edge-to-Edge)
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index - 1];
    if (!img || !img.complete) return;

    const logicalWidth = window.innerWidth;
    const logicalHeight = window.innerHeight;

    if (logicalWidth === 0 || logicalHeight === 0) return;

    // Device Pixel Ratio scaling for High-DPI screens
    const dpr = typeof window !== 'undefined' ? Math.max(window.devicePixelRatio || 1, 2) : 2;
    const targetWidth = Math.round(logicalWidth * dpr);
    const targetHeight = Math.round(logicalHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.clearRect(0, 0, logicalWidth, logicalHeight);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, logicalWidth, logicalHeight);

    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = logicalWidth / logicalHeight;

    let drawWidth = logicalWidth;
    let drawHeight = logicalHeight;
    let offsetX = 0;
    let offsetY = 0;

    // OBJECT-COVER: Edge-to-edge full screen without borders or TV card covers
    if (canvasRatio > imgRatio) {
      drawWidth = logicalWidth;
      drawHeight = logicalWidth / imgRatio;
      offsetY = (logicalHeight - drawHeight) / 2;
    } else {
      drawHeight = logicalHeight;
      drawWidth = logicalHeight * imgRatio;
      offsetX = (logicalWidth - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Resize canvas handler
  useEffect(() => {
    const handleResize = () => {
      renderFrame(currentFrameIndex);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentFrameIndex]);

  // Scroll listener
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) return;

      const scrollFraction = Math.min(1, Math.max(0, scrollTop / docHeight));
      const frameIndex = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.floor(scrollFraction * TOTAL_FRAMES) + 1)
      );

      setCurrentFrameIndex(frameIndex);

      animationFrameId = requestAnimationFrame(() => {
        renderFrame(frameIndex);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    renderFrame(1);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded]);

  return (
    <div className="relative min-h-[500vh] bg-white overflow-hidden">
      
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-slate-800 animate-spin" />
        </div>
      )}

      {/* Pure Fullscreen Edge-to-Edge Canvas (No TV cover, no frames, no borders) */}
      <div className="fixed inset-0 w-full h-full overflow-hidden bg-white z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover"
        />
      </div>

    </div>
  );
}
