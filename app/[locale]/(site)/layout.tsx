import PublicNav from '@/components/layout/public-nav';

export default async function SiteLayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <div>
      <PublicNav />
      {children}
    </div>
  );
}
