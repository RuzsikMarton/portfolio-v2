import { getProject } from '@/lib/queries';
import { PROJECT_SLUGS } from '@/lib/catalog';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import WipContent from '@/components/ui/wip-content';
import { getTranslations } from 'next-intl/server';
import Footer from '@/components/layout/footer';

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
  const t = await getTranslations('projectsPage');
  return (
    <>
      <div className="flex min-h-[calc(100vh-20rem)] flex-col items-center justify-center px-4 text-center">
        <WipContent title={t('title')} text={t('wip')} />
      </div>
      <Footer />
    </>
  );
}
