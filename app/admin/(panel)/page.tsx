import { requireAdmin } from '@/lib/session';

export default async function AdminPage() {
  await requireAdmin();
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
    </main>
  );
}
