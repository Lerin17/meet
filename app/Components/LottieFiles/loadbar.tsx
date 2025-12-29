'use client';

import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface ProgressAnimationProps {
  progress?: number; // 0-100 percentage
}

export default function ProgressAnimation({ progress = 0 }: ProgressAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false, // Don't autoplay, we'll control it manually
      path: '/animations/data.json',
    });

    animationRef.current = animation;

    return () => animation.destroy();
  }, []);

  // Control animation progress when progress prop changes
  useEffect(() => {
    if (!animationRef.current) return;

    // Convert percentage (0-100) to frame number (0-240 based on the animation data)
    const totalFrames = 240; // From your Lottie JSON (op: 240)
    const targetFrame = Math.round((progress / 100) * totalFrames);

    // Go to the specific frame
    animationRef.current.goToAndStop(targetFrame, true);
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="w-full h-6"
    />
  );
}
