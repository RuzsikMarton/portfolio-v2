import Footer from '@/components/layout/footer';
import { getTranslations } from 'next-intl/server';
import WipContent from '@/components/ui/wip-content';

export default async function ProjectsPage() {
  const t = await getTranslations('projectsPage');
  return (
    <section>
      <div className="flex min-h-[calc(100vh-20rem)] flex-col items-center justify-center px-4 text-center">
        <WipContent title={t('title')} text={t('wip')} />
      </div>
      <Footer />
    </section>
  );
}
