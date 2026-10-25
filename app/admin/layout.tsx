import { Metadata } from 'next';
import '../globals.css';
import { JetBrains_Mono } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Admin panel for managing the portfolio',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" translate="no" className="" suppressHydrationWarning>
      <body
        className="bg-bg text-primary antialiased"
        style={{ fontFamily: jetBrainsMono.style.fontFamily }}
      >
        <NextTopLoader color="#00bfff" />
        {children}
      </body>
    </html>
  );
}
