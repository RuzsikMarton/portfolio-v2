import { getProject } from '@/lib/queries';
import { PROJECT_SLUGS } from '@/lib/catalog';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

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
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return notFound();
  return <div>{project.title}</div>;
}
