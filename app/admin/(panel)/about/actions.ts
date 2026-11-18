'use server';

import { requireAdmin } from '@/lib/session';
import { FormState } from '../projects/actions';
import z from 'zod';
import { updateTag } from 'next/cache';
import { db } from '@/lib/prisma';

export const updateAbout = async (_prev: FormState, formData: FormData): Promise<FormState> => {
  await requireAdmin();
  const parsed = z
    .object({
      age: z.string().min(1),
      experience: z.string().trim().min(1),
      projects: z.string().trim().min(1),
      deployed: z.string().trim().min(1),
    })
    .safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    console.log(z.prettifyError(parsed.error));
    return { error: 'Invalid input' };
  }
  await db.about.upsert({
    where: {
      id: 1,
    },
    update: {
      age: parsed.data.age,
      experience: parsed.data.experience,
      projects: parsed.data.projects,
      deployed: parsed.data.deployed,
    },
    create: {
      id: 1,
      age: parsed.data.age,
      experience: parsed.data.experience,
      projects: parsed.data.projects,
      deployed: parsed.data.deployed,
    },
  });

  updateTag('about');
  return { ok: true };
};
