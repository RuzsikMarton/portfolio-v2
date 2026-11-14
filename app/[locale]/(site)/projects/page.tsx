import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { getProjects } from '@/lib/queries';
import ProjectsLoading from '@/components/projects/projects-loading';
import ProjectsList from '@/components/projects/projects-list';
import Footer from '@/components/layout/footer';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('projectsPage');
  return { title: `${t('title')} | Márton Ruzsik` };
}

export default async function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsLoading loading="projects" />}>
      <ProjectsContent />
    </Suspense>
  );
}

const ProjectsContent = async () => {
  const projects = await getProjects();
  if (!projects.length) return null;

  return (
    <div className="mx-auto w-full min-h-[calc(100vh-20rem)] max-w-7xl">
      <ProjectsList projects={projects} />
      <Footer />
    </div>
  );
};
