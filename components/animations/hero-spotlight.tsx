'use client';

import { useEffect, useRef } from 'react';

const POINTER_COLOR = '0 191 255';
const MAX_OPACITY = 0.3;

export default function HeroSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pointer = pointerRef.current;
    const hero = container?.closest('main');
    if (!container || !pointer || !hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return;

    let frame = 0;
    let target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };

    const tick = () => {
      current.x += (target.x - current.x) / 20;
      current.y += (target.y - current.y) / 20;
      pointer.style.transform = `translate(${Math.round(current.x)}px, ${Math.round(current.y)}px)`;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      target = { x: e.clientX, y: e.clientY };
    };

    // The layer is fixed to the viewport so it is never clipped; fade it out as the hero scrolls away.
    const observer = new IntersectionObserver(
      ([entry]) => {
        container.style.opacity = String(MAX_OPACITY * entry.intersectionRatio);
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    observer.observe(hero);

    window.addEventListener('pointermove', onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden mix-blend-screen [@media(pointer:coarse)]:hidden motion-reduce:hidden"
      style={{ opacity: MAX_OPACITY }}
    >
      <div className="absolute inset-0 blur-3xl">
        <div
          ref={pointerRef}
          className="absolute -top-1/2 -left-1/2 size-full opacity-70 [mix-blend-mode:hard-light]"
          style={{
            background: `radial-gradient(circle at center, rgb(${POINTER_COLOR} / 0.8) 0, rgb(${POINTER_COLOR} / 0) 50%) no-repeat`,
          }}
        />
      </div>
    </div>
  );
}
