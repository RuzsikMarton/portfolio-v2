'use server';

import { db } from '@/lib/prisma';
import { getLastProject } from '@/lib/queries';
import { requireAdmin } from '@/lib/session';
import { Locale } from '@/prisma/generated/prisma/enums';
import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import z from 'zod';

function invalidate(slug?: string) {
  updateTag('projects');
  if (slug) updateTag(`project:${slug}`);
}

export type FormState = { error?: string; ok?: boolean };

export async function createProject(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const title = String(formData.get('title') ?? '')
    .trim()
    .slice(0, 50);
  const slug = String(formData.get('slug') ?? '')
    .trim()
    .toLowerCase()
    .slice(0, 20);
  if (!title) return { error: 'Title required' };
  if (!slug) return { error: 'Slug required' };

  const lastProject = await getLastProject();
  const project = await db.project.create({
    data: {
      title,
      slug,
      order: (lastProject?.order ?? 0) + 1,
      projectTranslations: {
        create: [
          { locale: 'en', title: '', description: '', tags: [], highlights: [] },
          { locale: 'hu', title: '', description: '', tags: [], highlights: [] },
          { locale: 'sk', title: '', description: '', tags: [], highlights: [] },
        ],
      },
    },
  });
  redirect(`/admin/projects/${project.id}`);
}

export const reorderProjects = async (ids: number[]) => {
  await requireAdmin();

  if (!Array.isArray(ids) || !ids.every(Number.isInteger)) return { error: 'Invalid project IDs' };

  const projects = await db.project.findMany({ select: { id: true } });

  if (
    projects.length !== ids.length ||
    new Set(ids).size !== ids.length ||
    !projects.every((p) => ids.includes(p.id))
  )
    return { error: 'Mismatch' };

  await db.$transaction(
    ids.map((id, index) =>
      db.project.update({
        where: { id },
        data: { order: index + 1 },
      })
    )
  );
  updateTag('projects');

  return { ok: true };
};

const translationSchema = z.array(
  z.object({
    locale: z.enum(Locale),
    title: z.string().trim().max(50),
    description: z.string().trim().max(500),
    tags: z.array(z.string().trim().max(50)),
    overview: z.string().trim().max(5000).nullable(),
    highlights: z.array(z.string().trim().max(5000)),
    stat1: z.string().trim().max(50),
    stat2: z.string().trim().max(50),
    stat3: z.string().trim().max(50),
    stat1Value: z.string().trim().max(50),
    stat2Value: z.string().trim().max(50),
    stat3Value: z.string().trim().max(50),
  })
);

const detailsSchema = z.object({
  title: z.string().trim().min(1).max(50),
  slug: z.string().trim().min(1).max(20),
  featured: z.boolean(),
  role: z.string().trim().max(50),
  status: z.string().trim().max(30),
  period: z.string().trim().max(30),
  launchedAt: z.int(),
  githubUrl: z.string().trim().max(100),
  liveUrl: z.string().trim().max(100),
  stack: z.array(z.string().trim().max(50)),
  projectTranslation: translationSchema.max(3),
});

const emptyToNull = (value: string) => value.trim() || null;

export const updateProject = async (
  id: number,
  _prev: FormState,
  formData: FormData
): Promise<FormState> => {
  await requireAdmin();
  console.log('Updating project', formData);
  const translations = JSON.parse(formData.get('projectTranslation') as string);
  const parsed = detailsSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    featured: formData.has('featured') ? true : false,
    role: formData.get('role') ?? '',
    status: formData.get('status') ?? '',
    period: formData.get('period') ?? '',
    launchedAt: Number(formData.get('launchedAt')) ?? '',
    githubUrl: formData.get('githubUrl') ?? '',
    liveUrl: formData.get('liveUrl') ?? '',
    stack: JSON.parse(formData.get('stack') as string),
    projectTranslation: translations,
  });
  if (!parsed.success) {
    console.log('Validation errors:', parsed.error.flatten());

    return {
      error: parsed.error.issues
        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
        .join(', '),
    };
  }
  if (!parsed.success) return { error: 'Invalid data' };

  // normalize optional fields and arrays
  const data = {
    ...parsed.data,
    role: emptyToNull(parsed.data.role),
    status: emptyToNull(parsed.data.status),
    period: emptyToNull(parsed.data.period),
    launchedAt: parsed.data.launchedAt === 0 ? null : parsed.data.launchedAt,
    githubUrl: emptyToNull(parsed.data.githubUrl),
    liveUrl: emptyToNull(parsed.data.liveUrl),

    projectTranslation: parsed.data.projectTranslation.map((t) => ({
      ...t,
      tags: t.tags.filter((tag) => tag.trim() !== ''),
      overview: emptyToNull(t.overview ?? ''),
      stat1: emptyToNull(t.stat1 ?? ''),
      stat2: emptyToNull(t.stat2 ?? ''),
      stat3: emptyToNull(t.stat3 ?? ''),
      stat1Value: emptyToNull(t.stat1Value ?? ''),
      stat2Value: emptyToNull(t.stat2Value ?? ''),
      stat3Value: emptyToNull(t.stat3Value ?? ''),
      highlights: t.highlights.filter((h) => h.trim() !== ''),
    })),
  };

  // verify all expected locales are present exactly once
  const locales = data.projectTranslation.map((t) => t.locale);
  if (
    new Set(locales).size !== 3 ||
    !['en', 'hu', 'sk'].every((locale) => locales.includes(locale as (typeof locales)[number]))
  ) {
    return { error: 'Missing or duplicate translations' };
  }
  const current = await db.project.findUniqueOrThrow({ where: { id } });

  await db.project.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      featured: data.featured,
      role: data.role,
      status: data.status,
      period: data.period,
      launchedAt: data.launchedAt,
      githubUrl: data.githubUrl,
      liveUrl: data.liveUrl,
      stack: data.stack,

      projectTranslations: {
        update: data.projectTranslation.map((t) => ({
          where: {
            locale_projectId: {
              locale: t.locale,
              projectId: id,
            },
          },
          data: {
            title: t.title,
            description: t.description,
            tags: t.tags,
            overview: t.overview,
            highlights: t.highlights,
            stat1: t.stat1,
            stat2: t.stat2,
            stat3: t.stat3,
            stat1Value: t.stat1Value,
            stat2Value: t.stat2Value,
            stat3Value: t.stat3Value,
          },
        })),
      },
    },
  });
  invalidate(current.slug);
  if (current.slug !== data.slug) invalidate(data.slug);
  return { ok: true };
};

export const deleteProject = async (id: number) => {
  await requireAdmin();
  console.log('delete', id);
};
