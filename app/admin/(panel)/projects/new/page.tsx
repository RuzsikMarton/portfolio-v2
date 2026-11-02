import PageHeader from '@/components/admin/page-header';
import NewProjectForm from './new-project-form';
import { requireAdmin } from '@/lib/session';

const AdminNewProjectPage = async () => {
  await requireAdmin();
  return (
    <>
      <PageHeader title="New Project" backHref="/admin/projects" />
      <NewProjectForm />
    </>
  );
};

export default AdminNewProjectPage;
