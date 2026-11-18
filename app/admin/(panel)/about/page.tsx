import PageHeader from '@/components/admin/page-header';
import { requireAdmin } from '@/lib/session';
import AboutForm from './about-form';
import { getAboutStats } from '@/lib/queries';

const AboutPage = async () => {
  await requireAdmin();
  const aboutStats = await getAboutStats();

  return (
    <>
      <PageHeader title="About" backHref="/admin" />
      <AboutForm
        about={{
          age: aboutStats?.age?.toString() ?? '',
          experience: aboutStats?.experience?.toString() ?? '',
          projects: aboutStats?.projects?.toString() ?? '',
          deployed: aboutStats?.deployed?.toString() ?? '',
        }}
      />
    </>
  );
};

export default AboutPage;
