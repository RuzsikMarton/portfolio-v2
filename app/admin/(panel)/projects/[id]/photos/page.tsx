import PageHeader from '@/components/admin/page-header';
import ProjectTabs from '@/components/admin/project-tabs';
import { db } from '@/lib/prisma';
import { requireAdmin } from '@/lib/session';

const ProjectPhotosPage = async ({ params }: PageProps<'/admin/projects/[id]/photos'>) => {
  requireAdmin();
  const id = Number((await params).id);
  const project = Number.isInteger(id)
    ? await db.project.findUnique({
        where: { id },
        select: { id: true, title: true, featuredPhoto: true, logo: true },
      })
    : null;
  if (!project) return null;
  return (
    <>
      <PageHeader title={project.title} backHref="/admin/projects" />
      <ProjectTabs id={project.id} active="photos" />
    </>
  );
};

export default ProjectPhotosPage;
