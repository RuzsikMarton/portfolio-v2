'use client';

import MobileNav from './mobile-nav';
import { useTranslations } from 'next-intl';
import LanguageSelector from './language-selector';
import { Suspense, useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Link } from '@/i18n/navigation';

export default function PublicNav() {
  const t = useTranslations('nav');
  const titleRef = useRef<HTMLAnchorElement>(null);

  const navItems = [
    {
      key: 'about',
      label: t('about'),
    },
    {
      key: 'projects',
      label: t('projects'),
    },
    {
      key: 'contact',
      label: t('contact'),
    },
  ];

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    const items = document.querySelectorAll('.nav-item');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      title.style.opacity = '1';
      title.style.transform = 'none';
      items.forEach((item) => {
        const element = item as HTMLElement;
        element.style.opacity = '1';
        element.style.transform = 'none';
      });
      return;
    }

    const titleAnim = animate(title, {
      opacity: [0, 1],
      duration: 1000,
      ease: 'in(3)',
    });

    const reveal = animate(items, {
      opacity: [0, 1],
      translateY: [-50, 0],
      delay: stagger(200),
      ease: 'inOutQuart',
      duration: 800,
    });

    return () => {
      titleAnim.revert();
      reveal.revert();
    };
  }, []);

  return (
    <nav aria-label="Main navigation" className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link ref={titleRef} aria-label="Home" href={`/`}>
          <h1 className="text-4xl font-semibold">MártonRuzsik.</h1>
        </Link>

        <div className="hidden xl:flex items-center gap-8 relative">
          <div className="flex gap-12">
            {navItems.map((item) => (
              <Link
                aria-label={item.label}
                key={item.key}
                href={`/#${item.key}`}
                className="nav-item relative group capitilize font-medium hover:text-accent transition-colors duration-150 active:scale-[0.97] opacity-0"
              >
                {item.label}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
          <Suspense fallback={<div className="h-10 w-10" />}>
            <LanguageSelector aria-label="Language" />
          </Suspense>
        </div>
        <MobileNav navItems={navItems} />
      </div>
    </nav>
  );
}
