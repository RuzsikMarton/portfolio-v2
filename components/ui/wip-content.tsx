'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { IconTools } from '@tabler/icons-react';

const WipContent = ({ title, text }: { title: string; text: string }) => {
  const iconRef = useRef<SVGSVGElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const icon = iconRef.current;
    const items = itemsRef.current?.children;
    if (!icon || !items) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      itemsRef.current!.style.opacity = '1';
      itemsRef.current!.style.transform = 'none';
      return;
    }

    const reveal = animate(items, {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(150),
      ease: 'outCubic',
    });
    const swing = animate(icon, {
      rotate: [-15, 15],
      duration: 900,
      alternate: true,
      loop: true,
      ease: 'inOutSine',
    });

    return () => {
      reveal.revert();
      swing.revert();
    };
  }, []);

  return (
    <div ref={itemsRef} className="flex flex-col items-center gap-4">
      <IconTools ref={iconRef} className="size-16 text-accent" />
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-white/80 max-w-md">{text}</p>
    </div>
  );
};

export default WipContent;
