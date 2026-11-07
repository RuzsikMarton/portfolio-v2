import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://kko3lkzfwzwmta8o.public.blob.vercel-storage.com/**')],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
