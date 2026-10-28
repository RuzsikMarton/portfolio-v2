import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/config';
import NextTopLoader from 'nextjs-toploader';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import PublicNav from '@/components/layout/public-nav';

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#00bfff',
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'site' });
  return {
    metadataBase: new URL(process.env.SITE_URL ?? 'http://localhost:4000'),
    title: t('name'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((lang) => [lang, `/${lang}`])),
    },
    openGraph: {
      title: t('name'),
      description: t('description'),
      url: `/${locale}`,
      siteName: 'Márton Ruzsik - Portfolio',
      type: 'website',
      locale: locale,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<'/[locale]'>) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className="h-full antialiased scroll-smooth"
      style={{ fontFamily: jetBrainsMono.style.fontFamily }}
    >
      <body className="min-h-full">
        <NextTopLoader color="#00bfff" />
        <NextIntlClientProvider>
          <PublicNav />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
