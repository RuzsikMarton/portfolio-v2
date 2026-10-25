import Link from 'next/link';
import { Suspense } from 'react';
import { logout } from '../login/actions';
import { IconExternalLink, IconLogout } from '@tabler/icons-react';
import { AdminNav } from '@/components/admin/admin-nav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Admin', template: `%s | Admin` },
  robots: { index: false, follow: false },
};

export default function AdminAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh md:grid md:grid-cols-[17rem_1fr]">
      <aside className="hidden md:sticky md:top-0 md:flex md:h-dvh md:flex-col md:border-r md:border-line md:px-4 md:py-8">
        <Link href="/admin" className="mb-8 px-4 font-display text-xl font-bold">
          Portfolio
        </Link>
        <AdminNav />
        <div className="mt-auto space-y-1">
          <SiteLink />
          <LogoutButton />
        </div>
      </aside>

      {/* Phone nav at bottom */}
      <nav
        aria-label="Admin nav"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/90 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        <AdminNav />
      </nav>

      <main id="main" className="pb-32 md:pb-12">
        <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
      </main>
    </div>
  );
}

function SiteLink() {
  return (
    <Link
      href="/"
      target="_blank"
      className="flex min-h-12 items-center gap-3 rounded-2xl px-4 font-semibold text-ink-2 hover:text-ink"
    >
      <IconExternalLink size={22} />
      View site
    </Link>
  );
}

function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="flex min-h-12 w-full items-center gap-3 rounded-2xl px-4 font-semibold text-ink-2 hover:text-ink"
      >
        <IconLogout size={22} />
        Logout
      </button>
    </form>
  );
}

function PageSkeleton() {
  return (
    <div className="container-page animate-pulse pt-8" aria-hidden="true">
      <div className="h-10 w-48 rounded-xl bg-surface-2" />
      <div className="mt-8 h-40 rounded-card bg-surface-2" />
      <div className="mt-4 h-40 rounded-card bg-surface-2" />
    </div>
  );
}
