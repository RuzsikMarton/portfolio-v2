'use server';

import z from 'zod';
import { hash, verify } from '@node-rs/argon2';
import { db } from '@/lib/prisma';
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export type LoginState = { error?: string };

const loginSchema = z.object({
  username: z.string().trim().min(1).max(64),
  password: z.string().min(1).max(255),
});

let dummyHash: Promise<string> | undefined;
const getDummyHash = () => (dummyHash ??= hash('not-a-real-password'));

export const login = async (_prev: LoginState, formData: FormData): Promise<LoginState> => {
  const parse = loginSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });
  if (!parse.success) {
    return { error: 'Invalid username or password' };
  }

  const user = await db.admin.findUnique({ where: { username: parse.data.username } });
  const ok = await verify(user?.passwordHash ?? (await getDummyHash()), parse.data.password).catch(
    () => false
  );
  if (!user || !ok) {
    return { error: 'Invalid username or password' };
  }

  await createSession(user.id);
  redirect('/admin');
};

export const logout = async () => {
  await deleteSession();
  redirect('/admin/login');
};
