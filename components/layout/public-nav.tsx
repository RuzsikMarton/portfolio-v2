'use client';

import MobileNav from './mobile-nav';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSelector from './language-selector';
import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

export default function PublicNav() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const titleRef = useRef<HTMLAnchorElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

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
    const items = itemsRef.current?.children;
    const title = titleRef.current;
    if (!items || !title) return;

    const titleAnim = animate(title, {
      opacity: [0, 1],
      duration: 2000,
      easing: 'inOutQuart',
    });

    const reveal = animate(items, {
      opacity: [0, 1],
      translateY: [-50, 0],
      delay: stagger(200),
      easing: 'inOutQuart',
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
        <Link ref={titleRef} aria-label="Home" href={`/${locale}`}>
          <h1 className="text-4xl font-semibold">MártonRuzsik.</h1>
        </Link>

        <div className="hidden xl:flex items-center gap-8 relative">
          <div ref={itemsRef} className="flex gap-12">
            {navItems.map((item) => (
              <Link
                aria-label={item.label}
                key={item.key}
                href={`/#${item.key}`}
                className="relative group capitilize font-medium hover:text-accent transition-colors duration-150 active:scale-[0.97] opacity-0"
              >
                {item.label}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
          <LanguageSelector aria-label="Language" />
        </div>
        <MobileNav navItems={navItems} />
      </div>
    </nav>
  );
}
