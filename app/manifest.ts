import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MR | Portfolio',
    short_name: 'Portfolio',
    lang: 'en',
    start_url: '/admin',
    scope: '/',
    display: 'standalone',
    background_color: '#1c1c21',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
