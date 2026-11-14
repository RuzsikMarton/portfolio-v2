import PageHeader from '@/components/admin/page-header';
import ResumeEdit from '@/components/admin/resumes-edit';
import { db } from '@/lib/prisma';
import { requireAdmin } from '@/lib/session';

const ResumesPage = async () => {
  await requireAdmin();
  const resumes = await db.settings.findFirst({
    select: {
      cvSkUrl: true,
      cvEnUrl: true,
      cvHuUrl: true,
    },
  });
  if (!resumes) throw new Error('No resumes');
  return (
    <>
      <PageHeader title="Resume / CV" />
      <ResumeEdit
        resumes={{
          cvSkUrl: resumes.cvSkUrl,
          cvEnUrl: resumes.cvEnUrl,
          cvHuUrl: resumes.cvHuUrl,
        }}
      />
    </>
  );
};

export default ResumesPage;
