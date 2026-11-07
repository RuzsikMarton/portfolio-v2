'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

const ProjectTabs = ({ id, active }: { id: number; active: 'details' | 'photos' }) => {
  const tabs = [
    { key: 'details', href: `/admin/projects/${id}`, label: 'Projects' },
    { key: 'photos', href: `/admin/projects/${id}/photos`, label: 'Photos' },
  ];
  return (
    <nav aria-label="Project Tabs" className="container-page mb-6">
      <ul className="grid grid-cols-2 gap-1 rounded-full bg-surface-2 p-1">
        {tabs.map((tab) => (
          <li key={tab.key}>
            <Link
              href={tab.href}
              aria-current={active === tab.key ? 'page' : undefined}
              className={cn(
                'flex min-h-12 w-full items-center justify-center rounded-full text-lg font-semibold transition-colors duration-200',
                active === tab.key ? 'bg-surface text-ink shadow-sm' : 'text-ink-2 hover:text-ink'
              )}
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProjectTabs;
