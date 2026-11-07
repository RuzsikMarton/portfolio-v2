'use client';

import { cn } from '@/lib/utils';

type Locale = 'en' | 'sk' | 'hu';

interface Props {
  activeLocale: string;
  setActiveLocale: (locale: Locale) => void;
}

const TranslationsTabs = ({ activeLocale, setActiveLocale }: Props) => {
  const tabs = [{ key: 'en' }, { key: 'sk' }, { key: 'hu' }];
  return (
    <div aria-label="translations-tabs" className="mb-6">
      <ul className="grid grid-cols-3 gap-1 rounded-full bg-surface-2 p-1">
        {tabs.map((tab) => (
          <li key={tab.key}>
            <button
              type="button"
              onClick={() => setActiveLocale(tab.key as Locale)}
              className={cn(
                'flex min-h-12 w-full items-center justify-center rounded-full text-lg font-semibold transition-colors duration-200 cursor-pointer',
                tab.key === activeLocale
                  ? 'bg-surface text-ink shadow-sm'
                  : 'text-ink-2 hover:text-ink'
              )}
            >
              {tab.key.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TranslationsTabs;
