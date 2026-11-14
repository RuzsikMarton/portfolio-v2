'use client';

import { cn } from '@/lib/utils';
import { animate } from 'animejs';
import { useEffect, useRef } from 'react';

export const MovingBorder = ({
  duration = 3000,
  rx = '24px',
  ry = '24px',
  borderClassName,
}: {
  duration?: number;
  rx?: string;
  ry?: string;
  borderClassName?: string;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;

    if (!path || !dot) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const state = { progress: 0 };

    const animation = animate(state, {
      progress: 1,
      duration,
      ease: 'linear',
      loop: true,
      onUpdate: () => {
        const length = path.getTotalLength();
        if (!length) return;
        const point = path.getPointAtLength(state.progress * length);
        dot.style.transform = `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`;
      },
    });

    return () => {
      animation.revert();
    };
  }, [duration]);

  return (
    <>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <rect ref={pathRef} x="0" y="0" width="100%" height="100%" fill="none" rx={rx} ry={ry} />
      </svg>

      <div ref={dotRef} className="pointer-events-none absolute left-0 top-0">
        <div
          className={cn(
            'h-28 w-28 rounded-full bg-[radial-gradient(#00c1ff_40%,transparent_60%)] opacity-90',
            borderClassName
          )}
        />
      </div>
    </>
  );
};
