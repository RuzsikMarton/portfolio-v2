import { createHmac, randomBytes } from 'node:crypto';
import 'server-only';
import { db } from './prisma';
import { cookies } from 'next/headers';
import { connection } from 'next/server';
import { cache } from 'react';
import { redirect } from 'next/navigation';

export const SESSION_COOKIE = 'a_session';
const SESSION_DAYS = 30;
const DAY = 24 * 60 * 60 * 1000; // milliseconds in a day

function hashToken(token: string) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error('SESSION_SECRET is not defined');
  }
  return createHmac('sha256', secret).update(token).digest('hex');
}

function cookieSecure() {
  return (process.env.SITE_URL ?? '').startsWith('https://');
}

export async function createSession(userId: number) {
  const token = randomBytes(32).toString('base64url');
  await db.session.create({
    data: {
      id: hashToken(token),
      userId,
      expiresAt: new Date(Date.now() + SESSION_DAYS * DAY),
    },
  });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: cookieSecure(),
    maxAge: 400 * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax',
  });
}

export async function deleteSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (token) {
    await db.session.deleteMany({
      where: {
        id: hashToken(token),
      },
    });
    (await cookies()).delete(SESSION_COOKIE);
  }
}

export const getAdmin = cache(async () => {
  await connection();
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const id = hashToken(token);
  const session = await db.session.findUnique({
    where: {
      id,
    },
    include: {
      user: { select: { id: true, username: true } },
    },
  });

  if (!session || session.expiresAt < new Date()) return null;

  // Extends session expiration
  if (session.expiresAt.getTime() - Date.now() < (SESSION_DAYS * DAY) / 2) {
    await db.session.update({
      where: { id },
      data: { expiresAt: new Date(Date.now() + SESSION_DAYS * DAY) },
    });
  }
  return session.user;
});

export const requireAdmin = async () => {
  const admin = await getAdmin();
  if (!admin) redirect('/admin/login');
  return admin;
};
