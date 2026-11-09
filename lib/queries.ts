import { cacheLife, cacheTag } from 'next/cache';
import 'server-only';
import { db } from './prisma';
import { getLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';

export async function getLastProject() {
  return db.project.findFirst({
    orderBy: { order: 'desc' },
    select: { slug: true, order: true },
  });
}

export async function getProjects() {
  'use cache';
  cacheLife('hours');

  return db.project.findMany({
    select: {
      slug: true,
    },
  });
}

export async function getProject(slug: string) {
  'use cache';

  cacheLife('hours');
  cacheTag('projects', `project:${slug}`);

  const locale = (await getLocale()) as Locale;
  return db.project.findUnique({
    where: { slug },
    include: { projectTranslations: { where: { locale } } },
  });
}

export async function getProjectSlugs() {
  'use cache';
  cacheLife('days');
  cacheTag('projects');

  return ['workoutracker', 'evidio', 'matrixvis'];
}

{
  /* will get project slugs and updatedAt from db later */
}
