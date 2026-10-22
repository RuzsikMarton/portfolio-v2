import { getAdmin } from '@/lib/session';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginContent />
    </Suspense>
  );
}

async function LoginContent() {
  const user = await getAdmin();

  if (user) {
    redirect('/admin');
  }

  return (
    <main className="grid min-h-dvh place-items-center px-4 py-12">
      <div className="w-full max-w-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          Administration
        </p>
        <h1 className="mt-3 mb-10 text-4xl font-bold">Log In</h1>
      </div>
    </main>
  );
}

function LoginSkeleton() {
  return (
    <main className="grid min-h-dvh place-items-center px-4 py-12">
      <div className="w-full max-w-sm animate-pulse">
        <div className="h-4 w-32 rounded bg-surface-2" />
        <div className="mt-4 h-10 w-48 rounded bg-surface-2" />
        <div className="mt-8 h-40 rounded bg-surface-2" />
      </div>
    </main>
  );
}
