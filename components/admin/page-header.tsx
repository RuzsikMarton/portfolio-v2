'use client';

import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  backHref?: string;
  action?: React.ReactNode;
}

const PageHeader = ({ title, backHref, action }: PageHeaderProps) => {
  return (
    <header className="container-page flex items-center gap-3 pt-6 pb-6 md:pt-10">
      {backHref && (
        <Link
          href={backHref}
          aria-label="Back"
          className="grid size-12 shrink-0 place-items-center text-ink rounded-2xl hover:bg-surface-2"
        >
          <IconArrowLeft />
        </Link>
      )}
      <h1 className="min-w-0 flex-1 truncate text-2xl leading-tight font-bold md:text-4xl">
        {title}
      </h1>
      {action}
    </header>
  );
};

export default PageHeader;
