'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { IconCheck, IconChevronDown, IconWorld } from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import Flag from '../ui/flag';

const LanguageSelector = ({ onSelect }: { onSelect?: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('language');
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const languages: { code: 'sk' | 'en' | 'hu'; lang: string }[] = [
    { code: 'sk', lang: t('sk') },
    { code: 'en', lang: t('en') },
    { code: 'hu', lang: t('hu') },
  ];

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-accent px-4 py-2 text-base font-semibold text-accent-ink transition-all duration-150 hover:bg-hover active:scale-[0.97]"
      >
        <IconWorld className="mr-1" />

        {t(locale)}

        <IconChevronDown
          className={cn('transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <div
        aria-hidden={!open}
        className={cn(
          'absolute left-1/2 top-full z-10 mt-2 min-w-36',
          '-translate-x-1/2 rounded-md border border-accent bg-bg',
          'transition-[opacity,translate,visibility] duration-200 ease-out',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        )}
      >
        <div className="px-3 py-2 text-sm">{t('language')}</div>

        <div className="flex flex-col gap-1 px-0.5 py-0.5">
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              className={cn(
                'flex w-full cursor-pointer items-center gap-4 rounded bg-bg px-4 py-2 text-left text-sm transition-colors duration-150 hover:bg-accent',
                locale === language.code && 'font-bold'
              )}
              onClick={() => {
                setOpen(false);
                onSelect?.();

                if (locale !== language.code) {
                  router.replace(pathname ?? '/', {
                    locale: language.code,
                  });
                }
              }}
            >
              <Flag locale={language.code} size={16} />

              {language.lang}
              {locale === language.code && (
                <IconCheck size={16} className="ml-auto mr-2 shrink-0 text-ink" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
