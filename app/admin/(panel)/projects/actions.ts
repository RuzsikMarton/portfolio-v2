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
