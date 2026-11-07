import PageHeader from '@/components/admin/page-header';
import ProjectTabs from '@/components/admin/project-tabs';
import { db } from '@/lib/prisma';
import { requireAdmin } from '@/lib/session';
import PhotoManager from '@/components/admin/photo-manager';
import { notFound } from 'next/navigation';

const ProjectPhotosPage = async ({ params }: PageProps<'/admin/projects/[id]/photos'>) => {
  await requireAdmin();
  const id = Number((await params).id);
  const project = Number.isInteger(id)
    ? await db.project.findUnique({
        where: { id },
        select: { id: true, title: true, featuredPhoto: true, logo: true },
      })
    : null;
  if (!project) notFound();
  return (
    <>
      <PageHeader title={project.title} backHref="/admin/projects" />
      <ProjectTabs id={project.id} active="photos" />
      <PhotoManager
        id={project.id}
        featuredPhoto={project.featuredPhoto ?? null}
        logo={project.logo ?? null}
      />
    </>
  );
};

export default ProjectPhotosPage;
