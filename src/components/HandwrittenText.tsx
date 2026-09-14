'use client';

import { useEffect, useState, useRef } from 'react';

interface HandwrittenTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  duration?: number; // duration in ms for smooth continuous writing
  delay?: number; // ms before start
  showPenNib?: boolean;
}

export default function HandwrittenText({
  text,
  className = '',
  style = {},
  duration = 2200,
  delay = 200,
  showPenNib = true,
}: HandwrittenTextProps) {
  const [progress, setProgress] = useState(0); // 0 to 100%
  const [isWriting, setIsWriting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setProgress(0);
    setIsWriting(false);
    setIsFinished(false);

    const startTimer = setTimeout(() => {
      setIsWriting(true);
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const rawProgress = Math.min(1, elapsed / duration);
        // Smooth easeInOutQuad easing for natural continuous handwriting flow
        const easedProgress =
          rawProgress < 0.5
            ? 2 * rawProgress * rawProgress
            : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

        const currentPercent = easedProgress * 100;
        setProgress(currentPercent);

        if (rawProgress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setIsWriting(false);
          setIsFinished(true);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [text, duration, delay]);

  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontStyle: 'italic',
        display: 'inline-block',
        position: 'relative',
        letterSpacing: '0.02em',
        verticalAlign: 'baseline',
        lineHeight: 1.4,
        ...style,
      }}
    >
      {/* Full text placeholder for layout dimension reserve */}
      <span style={{ opacity: 0, userSelect: 'none', pointerEvents: 'none' }}>
        {text}
      </span>

      {/* Smooth Continuous Clip-Path Reveal Container */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'inline-block',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          clipPath: `inset(0 ${100 - progress}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - progress}% 0 0)`,
        }}
      >
        {text}
      </span>

      {/* Smooth Gliding Pen Nib */}
      {isWriting && showPenNib && !isFinished && (
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: `${progress}%`,
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 10px #ffffff',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}
    </span>
  );
}
