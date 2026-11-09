import { getProject } from '@/lib/queries';
import { PROJECT_SLUGS } from '@/lib/catalog';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Footer from '@/components/layout/footer';
import ProjectView from '@/components/projects/project-view';
import ProjectsLoading from '@/components/projects/projects-loading';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: Props) {
  return (
    <Suspense fallback={<ProjectsLoading loading="project" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return notFound();
  return (
    <div className="flex flex-col mx-auto w-full min-h-[calc(100vh-20rem)] max-w-7xl">
      <ProjectView project={project} translation={project.projectTranslations[0]} />
      <Footer />
    </div>
  );
}
