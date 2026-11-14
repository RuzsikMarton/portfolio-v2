'use server';

import { Locale } from '@/i18n/config';
import { urlKey } from '@/lib/const';
import { db } from '@/lib/prisma';
import { requireAdmin } from '@/lib/session';
import { del, put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

export const uploadCV = async ({ file, locale }: { file: File; locale: Locale }) => {
  await requireAdmin();

  const blob = await put(`resumes/cv${locale}.pdf`, file, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/pdf',
  });

  await db.settings.update({
    where: { id: 1 },
    data: { [urlKey[locale]]: blob.url },
  });

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
