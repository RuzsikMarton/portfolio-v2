'use client';

import { IconFaceIdError } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function SiteError({ error, retry }: { error: unknown; retry: () => void }) {
  const t = useTranslations('errors');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60dvh] flex-col items-center justify-center gap-4 text-center">
      <IconFaceIdError className="size-16 text-accent" />
      <h1 className="max-w-5xl text-3xl font-bold">{t('title')}</h1>
      <p className="max-w-md text-white/80">{t('description')}</p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-full bg-accent px-6 py-2 font-semibold text-accent-ink transition-all duration-150 hover:bg-hover active:scale-[0.97]"
      >
        {t('retry')}
      </button>
    </main>
  );
}
