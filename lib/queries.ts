import { cacheLife, cacheTag } from 'next/cache';
import 'server-only';
import { db } from './prisma';
import { Locale } from '@/i18n/config';
import { getLocale } from 'next-intl/server';
import { ProjectDetail } from './types';
import { urlKey } from './const';

/** will get project slugs and updatedAt from db later for sitemap */

/** get project slugs for static params */
export async function getProjectSlugs(): Promise<string[]> {
  'use cache';
  cacheLife('days');
  cacheTag('projects');

  const projects = await db.project.findMany({
    select: {
      slug: true,
    },
  });

  return projects.map((p) => p.slug);
}

/** get cached projects by order with translation*/
export async function getCachedProjects(locale: Locale): Promise<ProjectDetail[]> {
  'use cache';

  cacheTag('projects');
  cacheLife('hours');

  const projects = await db.project.findMany({
    orderBy: { order: 'asc' },
    include: { projectTranslations: { where: { locale }, take: 1 } },
  });

  return projects.map((p) => ({
    ...p,
    translation: p.projectTranslations[0] ?? null,
  }));
}

/** get cached project by slug with translation */
export async function getCachedProject(
  slug: string,
  locale?: Locale
): Promise<ProjectDetail | null> {
  'use cache';

  cacheLife('hours');
  cacheTag('projects', `project:${slug}`);

  const project = await db.project.findUnique({
    where: { slug },
    include: {
      projectTranslations: {
        where: { locale },
      },
    },
  });
  return project ? { ...project, translation: project.projectTranslations[0] ?? null } : null;
}

/** get project by slug using locale */
export async function getProject(slug: string) {
  const locale = (await getLocale()) as Locale;
  return getCachedProject(slug, locale);
}

/** get cached projects using locale */
export async function getProjects() {
  const locale = (await getLocale()) as Locale;
  return getCachedProjects(locale);
}

/** get last project */
export async function getLastProject() {
  return db.project.findFirst({
    orderBy: { order: 'desc' },
    select: { slug: true, order: true },
  });
}

/** resume based on locale */
export async function getResume() {
  const locale = (await getLocale()) as Locale;

  const resume = await db.settings.findFirst({
    select: { [urlKey[locale]]: true },
  });
  return resume?.[urlKey[locale]] ?? null;
}
