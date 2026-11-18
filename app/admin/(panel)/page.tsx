import { db } from '@/lib/prisma';
import { requireAdmin } from '@/lib/session';
import { IconArrowRight, IconCode, IconFileCv } from '@tabler/icons-react';
import Link from 'next/link';

export default async function AdminPage() {
  await requireAdmin();
  const [featured, projects] = await Promise.all([
    db.project.count({ where: { featured: true } }),
    db.project.count(),
  ]);
  return (
    <div className="container-page pt-8 md:pt-12">
      <h1 className="text-3xl leading-tight font-bold md:text-5xl">Stats</h1>
      <dl className="mt-8 grid grid-cols-2 gap-4">
        <Stat href="/admin/projects" label="Featured Projects" value={featured} />
        <Stat href="/admin/projects" label="Published Projects" value={projects} />
      </dl>

      <div className="mt-3 grid md:grid-cols-2 gap-4">
        <Card
          href="/admin/projects/new"
          label="Add new project"
          description="Create new project to list in projects list"
          Icon={IconCode}
        />
        <Card
          href="/admin/resume"
          label="Edit resume"
          description="Edit resumes or upload new ones"
          Icon={IconFileCv}
        />
      </div>
    </div>
  );
}

const Stat = ({ href, label, value }: { href: string; label: string; value: number }) => (
  <Link
    href={href}
    className="block p-4 border border-line rounded-card bg-surface transition-colors duration-150 hover:border-ink-2"
  >
    <dt className="text-base font-semibold text-ink-2">{label}</dt>
    <dt className="mt-2 text-5xl font-bold tabular text-accent">{value}</dt>
  </Link>
);

const Card = ({
  href,
  label,
  description,
  Icon,
}: {
  href: string;
  label: string;
  description: string;
  Icon: typeof IconArrowRight;
}) => (
  <Link
    href={href}
    className="group border border-line rounded-card bg-surface group flex min-h-36 items-center gap-5 p-6 transition-colors duration-150 hover:border-ink-2"
  >
    <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
      <Icon size={30} />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block font-display text-xl font-bold">{label}</span>
      <span className="mt-1 block text-base text-ink-2">{description}</span>
    </span>

    <IconArrowRight className="shrink-0 text-ink-2 transition-transform duration-200 group-hover:translate-x-1" />
  </Link>
);
