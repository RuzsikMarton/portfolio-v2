import PageHeader from '@/components/admin/page-header';
import { requireAdmin } from '@/lib/session';

export default async function AdminPage() {
  await requireAdmin();
  return (
    <main>
      <PageHeader title="Admin Panel" />
    </main>
  );
}
