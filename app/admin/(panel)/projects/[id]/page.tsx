import PageHeader from '@/components/admin/page-header';
import ProjectTabs from '@/components/admin/project-tabs';
import ProjectDetailsForm from './project-details-form';
import { db } from '@/lib/prisma';
import { requireAdmin } from '@/lib/session';
import { notFound } from 'next/navigation';

const AdminProjectPage = async ({ params }: PageProps<'/admin/projects/[id]'>) => {
  await requireAdmin();

  const id = Number((await params).id);
  const project = Number.isInteger(id)
    ? await db.project.findUnique({ where: { id }, include: { projectTranslations: true } })
    : null;
  if (!project) return notFound();
  return (
    <>
      <PageHeader title={project.title} backHref="/admin/projects" />
      <ProjectTabs id={id} active="details" />
      <ProjectDetailsForm
        project={{
          id: project.id,
          slug: project.slug,
          title: project.title,
          featured: project.featured,
          stack: project.stack,
          githubUrl: project.githubUrl ? project.githubUrl : '',
          liveUrl: project.liveUrl ? project.liveUrl : '',
          pdf: project.pdf ? project.pdf : '',
          status: project.status ? project.status : '',
          launchedAt: project.launchedAt ? project.launchedAt : '',
          period: project.period ? project.period : '',
          role: project.role ? project.role : '',
          projectTranslation: project.projectTranslations.map((translation) => ({
            ...translation,
            overview: translation.overview ?? '',
            stat1: translation.stat1 ?? '',
            stat2: translation.stat2 ?? '',
            stat3: translation.stat3 ?? '',
            stat1Value: translation.stat1Value ?? '',
            stat2Value: translation.stat2Value ?? '',
            stat3Value: translation.stat3Value ?? '',
          })),
        }}
      />
    </>
  );
};

export default AdminProjectPage;
