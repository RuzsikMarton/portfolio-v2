'use client';

import { Ref, useEffect, useRef } from 'react';
import { animate } from 'animejs';

// Animated rotating circles background around hero image
export default function AnimatedCircle({ borderRef }: { borderRef?: Ref<SVGSVGElement> }) {
  const circle1Ref = useRef<SVGCircleElement>(null);
  const circle2Ref = useRef<SVGCircleElement>(null);
  const circle3Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const circles = [
      { ref: circle1Ref, duration: 21000, direction: '1turn' },
      { ref: circle2Ref, duration: 24000, direction: '-1turn' },
      { ref: circle3Ref, duration: 30000, direction: '1turn' },
    ];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const animations = circles.map(({ ref, duration, direction }) => {
      const element = ref.current;
      if (!element) return null;

      element.style.transformBox = 'fill-box';
      element.style.transformOrigin = 'center';

      return animate(element, {
        rotate: direction,
        duration,
        ease: 'outBounce',
        loop: true,
      });
    });

    return () => {
      animations.forEach((animation) => animation?.cancel());
    };
  }, []);

  return (
    <svg
      className="pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] overflow-visible opacity-0"
      viewBox="0 0 506 506"
      fill="none"
      aria-hidden="true"
      ref={borderRef}
    >
      <circle
        ref={circle1Ref}
        cx="253"
        cy="253"
        r="240"
        stroke="#00bfff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="6 197 38 550"
      />
      <circle
        ref={circle2Ref}
        cx="253"
        cy="253"
        r="240"
        stroke="#00bfff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="45 180 12 554"
      />
      <circle
        ref={circle3Ref}
        cx="253"
        cy="253"
        r="240"
        stroke="#00bfff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="20 300 50 421"
      />
    </svg>
  );
}
