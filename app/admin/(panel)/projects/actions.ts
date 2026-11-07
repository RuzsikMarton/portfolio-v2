'use server';

import { db } from '@/lib/prisma';
import { getLastProject } from '@/lib/queries';
import { requireAdmin } from '@/lib/session';
import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

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

export const updateProject = async (_prev: FormState, formData: FormData): Promise<FormState> => {
  await requireAdmin();

  const stack = JSON.parse(formData.get('stack') as string);
  const translations = JSON.parse(formData.get('projectTranslation') as string);
  console.log(translations, stack);
  return { ok: true };
};

export const deleteProject = async (id: number) => {
  await requireAdmin();
  console.log('delete', id);
};
