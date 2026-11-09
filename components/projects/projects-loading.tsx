'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { useTranslations } from 'next-intl';

export default function ProjectsLoading({ loading }: { loading: string }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('loading');

  useEffect(() => {
    if (!titleRef.current || !lineRef.current) return;

    const titleAnimation = animate(titleRef.current, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 700,
      ease: 'out(3)',
    });

    const lineAnimation = animate(lineRef.current, {
      translateX: ['-100%', '300%'],
      duration: 1600,
      loop: true,
      alternate: true,
      ease: 'inOut(3)',
    });

    return () => {
      titleAnimation.revert();
      lineAnimation.revert();
    };
  }, []);

  return (
    <div className="flex flex-1 min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <h1 ref={titleRef} className="text-3xl font-semibold tracking-tight opacity-0">
          MártonRuzsik<span className="text-accent">.</span>
        </h1>

        <div className="h-[2px] w-32 overflow-hidden rounded-full bg-white/10">
          <div ref={lineRef} className="h-full w-1/3 rounded-full bg-accent" />
        </div>

        <span className="text-[10px] font-medium tracking-[0.25em] text-ink-2 uppercase">
          {t(loading)}
        </span>
      </div>
    </div>
  );
}
