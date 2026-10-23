'use client';

export default function AdminError() {
  return (
    <div className="container-page flex min-h-[60dvh] max-w-2xl flex-col justify-center py-16">
      <h1 className="text-3xl font-bold">Error</h1>
      <p className="mt-3 text-lg text-ink-2">Something went wrong. Please try again.</p>
      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => location.reload()}
          className="inline-flex min-h-14 items-center justify-center rounded-full bg-accent px-7 text-lg font-semibold text-accent-ink"
        >
          Retry
        </button>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/admin"
          className="inline-flex min-h-14 items-center justify-center rounded-full border border-line px-7 text-lg font-semibold"
        >
          Home
        </a>
      </div>
    </div>
  );
}
