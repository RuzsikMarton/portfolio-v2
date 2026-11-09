'use client';

import { Link } from '@/i18n/navigation';
import { Project, ProjectTranslation } from '@/prisma/generated/prisma/client';
import { IconArrowLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

type Props = {
  project: Project;
  translation: ProjectTranslation;
};

const PorjectView = ({ project, translation }: Props) => {
  const t = useTranslations('projectpage');
  return (
    <div className="w-full max-w-5xl mx-auto px-5 sm:px-10 pt-2">
      <Link
        href={`/projects`}
        className="inline-flex items-center gap-2 text-xs text-ink-2/80 transition-colors duration-200 hover:text-ink"
      >
        <IconArrowLeft size={18} stroke={2} />
        {t('back')}
      </Link>
      <p className="mt-6 text-xs uppercase tracking-[0.30em] text-accent">
        {translation.tags.length > 0 && translation.tags.join(' • ')}
      </p>
      <h1 className="mt-2 text-4xl font-bold md:text-5xl">{translation.title}</h1>
      <p className="mt-4 max-w-2xl font-extralight leading-relaxed text-ink/90">
        {translation.subtitle}
      </p>
      <p className="mt-4 max-w-2xl font-extralight leading-relaxed text-ink/90 md:text-base whitespace-pre-line">
        {translation.overview}
      </p>
    </div>
  );
};

export default PorjectView;
