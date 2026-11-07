import PageHeader from '@/components/admin/page-header';
import SortableProjects from '@/components/admin/sortable-projects';
import { db } from '@/lib/prisma';
import { requireAdmin } from '@/lib/session';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

const AdminProjectsPage = async () => {
  await requireAdmin();
  const projects = await db.project.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      order: true,
      _count: {
        select: {
          projectTranslations: true,
        },
      },
    },
    orderBy: { order: 'desc' },
  });

  return (
    <>
      <PageHeader
        title="Projects"
        action={
          <Link href="/admin/projects/new" className="primary-button min-h-12 px-5 text-base">
            <IconPlus size={22} />
            New
          </Link>
        }
      />
      <div className="container-page">
        {projects.length === 0 ? (
          <div className="text-center text-ink-2 text-xl">No projects</div>
        ) : (
          <SortableProjects projects={projects} />
        )}
      </div>
    </>
  );
};

export default AdminProjectsPage;
