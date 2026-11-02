import { requireAdmin } from '@/lib/session';

const AdminProjectPage = async () => {
  await requireAdmin();

  return <div>AdminProjectPage</div>;
};

export default AdminProjectPage;
