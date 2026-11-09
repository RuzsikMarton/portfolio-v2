'use server';

import { db } from '@/lib/prisma';
import { getLastProject } from '@/lib/queries';
import { requireAdmin } from '@/lib/session';
import { Locale } from '@/prisma/generated/prisma/enums';
import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import z from 'zod';
import { del, put } from '@vercel/blob';
import { processImage } from '@/lib/image';

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
          { locale: 'en', title: title, subtitle: '', description: '', tags: [], highlights: [] },
          { locale: 'hu', title: title, subtitle: '', description: '', tags: [], highlights: [] },
          { locale: 'sk', title: title, subtitle: '', description: '', tags: [], highlights: [] },
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
    subtitle: z.string().trim().max(150),
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
  launchedAt: z.string().trim().max(4),
  githubUrl: z.string().trim().max(100),
  liveUrl: z.string().trim().max(100),
  stack: z.array(z.string().trim().max(50)),
  projectTranslation: translationSchema.length(3),
});

const emptyToNull = (value: string) => value.trim() || null;

export const updateProject = async (
  id: number,
  _prev: FormState,
  formData: FormData
): Promise<FormState> => {
  await requireAdmin();
  const translations = JSON.parse(formData.get('projectTranslation') as string);
  const parsed = detailsSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    featured: formData.has('featured') ? true : false,
    role: formData.get('role') ?? '',
    status: formData.get('status') ?? '',
    period: formData.get('period') ?? '',
    launchedAt: formData.get('launchedAt') ?? '',
    githubUrl: formData.get('githubUrl') ?? '',
    liveUrl: formData.get('liveUrl') ?? '',
    stack: JSON.parse(formData.get('stack') as string),
    projectTranslation: translations,
  });
  if (!parsed.success) {
    console.log(z.prettifyError(parsed.error));
    return {
      error: z.prettifyError(parsed.error),
    };
  }

  // normalize optional fields and arrays
  const data = {
    ...parsed.data,
    role: emptyToNull(parsed.data.role),
    status: emptyToNull(parsed.data.status),
    period: emptyToNull(parsed.data.period),
    launchedAt: emptyToNull(parsed.data.launchedAt),
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
            subtitle: t.subtitle,
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
  const project = await db.project.findUnique({ where: { id } });
  if (!project) redirect('/admin/projects');
  await db.project.delete({ where: { id } });
  invalidate(project.slug);
  redirect('/admin/projects');
};

export const uploadFeaturedPhoto = async (
  id: number,
  _prev: FormState,
  formData: FormData
): Promise<FormState> => {
  await requireAdmin();
  const file = formData.get('featured');
  if (!(file instanceof File)) {
    return { error: 'Please select an image.' };
  }

  const project = await db.project.findUnique({
    where: { id },
    select: { id: true, slug: true, featuredPhoto: true },
  });

  const processed = await processImage(file, 1920);
  let newPhotoUrl: string | null = null;
  if (!project) return { error: 'Project not found' };

  // delete old photo if exists and upload new one
  if (file instanceof File && project.featuredPhoto) {
    await del(project.featuredPhoto);
    const blob = await put(`featured/${id}/${crypto.randomUUID()}.webp`, processed.buffer, {
      access: 'public',
    });
    newPhotoUrl = blob.url;
  } else if (file instanceof File) {
    const blob = await put(`featured/${id}/${crypto.randomUUID()}.webp`, processed.buffer, {
      access: 'public',
    });
    newPhotoUrl = blob.url;
  } else {
    return { error: 'Invalid file' };
  }

  // update db with new photo url if uploaded
  if (newPhotoUrl) await db.project.update({ where: { id }, data: { featuredPhoto: newPhotoUrl } });

  invalidate(project.slug);
  return { ok: true };
};

export const uploadLogoPhoto = async (
  id: number,
  _prev: FormState,
  formData: FormData
): Promise<FormState> => {
  await requireAdmin();
  const file = formData.get('logo');
  if (!(file instanceof File)) {
    return { error: 'Please select an image.' };
  }

  const project = await db.project.findUnique({
    where: { id },
    select: { id: true, slug: true, logo: true },
  });

  const processed = await processImage(file, 1920);
  let newLogoUrl: string | null = null;
  if (!project) return { error: 'Project not found' };

  // delete old photo if exists and upload new one
  if (file instanceof File && project.logo) {
    await del(project.logo);
    const blob = await put(`logo/${project.slug}-logo.webp`, processed.buffer, {
      access: 'public',
    });
    newLogoUrl = blob.url;
  } else if (file instanceof File) {
    const blob = await put(`logo/${project.slug}-logo.webp`, processed.buffer, {
      access: 'public',
    });
    newLogoUrl = blob.url;
  } else {
    return { error: 'Invalid file' };
  }

  // update db with new logo url if uploaded
  if (newLogoUrl) await db.project.update({ where: { id }, data: { logo: newLogoUrl } });

  invalidate(project.slug);
  return { ok: true };
};
