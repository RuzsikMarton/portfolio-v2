'use client';

import { animate, stagger } from 'animejs';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  const t = useTranslations('notFound');
  const codeRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const code = codeRef.current;
    const items = itemsRef.current?.children;
    if (!code || !items) return;

    const reveal = animate(items, {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
      delay: stagger(150),
      ease: 'outCubic',
    });
    const float = animate(code, {
      translateY: [-8, 8],
      duration: 1800,
      alternate: true,
      loop: true,
      ease: 'inOutSine',
    });

    return () => {
      reveal.revert();
      float.revert();
    };
  }, []);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div ref={itemsRef} className="flex flex-col items-center gap-4">
        <p ref={codeRef} className="text-8xl font-bold text-accent">
          404
        </p>
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <p className="text-white/80 max-w-md">{t('text')}</p>
        <Link
          href="/"
          className="mt-2 px-5 py-3 text-accent-ink bg-accent rounded-full font-bold hover:bg-hover hover:shadow-lg shadow-accent-dark active:scale-[0.97] transition-all duration-150"
        >
          {t('home')}
        </Link>
      </div>
    </div>
  );
}
