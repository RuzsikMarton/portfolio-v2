import { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Admin panel for managing the portfolio',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" translate="no" className="" suppressHydrationWarning>
      <body className="bg-bg text-primary antialiased">{children}</body>
    </html>
  );
}
