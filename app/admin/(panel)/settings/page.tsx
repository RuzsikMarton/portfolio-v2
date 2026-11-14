import PageHeader from '@/components/admin/page-header';
import Settings from '@/components/admin/settings';
import { db } from '@/lib/prisma';
import { requireAdmin } from '@/lib/session';

const SettingsPage = async () => {
  await requireAdmin();
  const settings = await db.settings.findFirst();
  if (!settings) throw new Error('No settings');
  return (
    <>
      <PageHeader title="Settings" />
      <div className="container-page">
        <Settings />
      </div>
    </>
  );
};

export default SettingsPage;
