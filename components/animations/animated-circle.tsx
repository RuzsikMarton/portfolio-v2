'use client';

import { Ref, useEffect, useRef } from 'react';
import { animate } from 'animejs';

const HERO_FADE_END_MS = 3000;

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

    // Wait for the hero fade-ins (image ends ~3.5s) so rotation doesn't compete with them.
    let animations: Array<ReturnType<typeof animate> | null> = [];
    let idleId: number | undefined;

    const start = () => {
      animations = circles.map(({ ref, duration, direction }) => {
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
    };

    const timeoutId = window.setTimeout(() => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(start, { timeout: 1000 });
      } else {
        start();
      }
    }, HERO_FADE_END_MS);

    return () => {
      window.clearTimeout(timeoutId);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      animations.forEach((animation) => animation?.cancel());
    };
  }, []);

  return (
    <svg
      className="pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] overflow-visible opacity-0 will-change-[opacity]"
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
