'use client';

import MobileNav from './mobile-nav';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSelector from './language-selector';

export default function PublicNav() {
  const locale = useLocale();
  const t = useTranslations('nav');

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

  return (
    <nav className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href={`/${locale}`}>
          <h1 className="text-4xl font-semibold">MártonRuzsik</h1>
        </Link>

        <div className="hidden xl:flex items-center gap-8 relative">
          <div className="flex gap-12">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}#${item.key}`}
                className="relative group capitilize font-medium hover:text-accent transition-all duration-150 active:scale-[0.97]"
              >
                {item.label}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
          <LanguageSelector />
        </div>
        <MobileNav navItems={navItems} />
      </div>
    </nav>
  );
}
