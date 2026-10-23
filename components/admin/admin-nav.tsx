'use client';

import { cn } from '@/lib/utils';
import { IconFileCv, IconLayoutGrid, IconSettings, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/admin/about', label: 'About', Icon: IconUser },
  { href: '/admin/resumes', label: 'Resumes', Icon: IconFileCv },
  { href: '/admin/projects', label: 'Projects', Icon: IconLayoutGrid },
  { href: '/admin/settings', label: 'Settings', Icon: IconSettings },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <ul className="grid grid-cols-4 md:grid-cols-1 md:gap-1">
      {items.map(({ href, label, Icon, ...rest }) => {
        const prefixes = [href];
        const current =
          !!pathname && prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={current ? 'page' : undefined}
              className={cn(
                'flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl text-sm font-semibold transition-colors duration-150 md:flex-row md:justify-start md:gap-3 md:px-4 md:text-base',
                current ? 'text-accent md:bg-accent-dark' : 'text-ink-2 hover:text-ink'
              )}
            >
              <Icon size={26} />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
