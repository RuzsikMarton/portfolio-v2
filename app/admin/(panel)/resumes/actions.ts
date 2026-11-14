'use server';

import { Locale } from '@/i18n/config';
import { urlKey } from '@/lib/const';
import { db } from '@/lib/prisma';
import { requireAdmin } from '@/lib/session';
import { del, put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

export const uploadCV = async ({ file, locale }: { file: File; locale: Locale }) => {
  await requireAdmin();

  const key = urlKey[locale];

  // Get the previous URL
  const settings = await db.settings.findUnique({
    where: { id: 1 },
    select: { [key]: true },
  });

  const oldUrl = settings?.[key];

  const blob = await put(`resumes/cv${locale}-${Date.now()}.pdf`, file, {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/pdf',
  });

  await db.settings.update({
    where: { id: 1 },
    data: { [urlKey[locale]]: blob.url },
  });

  if (oldUrl && oldUrl !== blob.url) {
    await del(oldUrl);
  }

  revalidatePath('/admin/resumes');
  return { success: true, url: blob.url };
};

export const deleteCv = async (url: string, locale: Locale) => {
  await requireAdmin();

  await del(url);
  await db.settings.update({
    where: { id: 1 },
    data: { [urlKey[locale]]: null },
  });
  revalidatePath('/admin/resumes');
  return { success: true };
};
