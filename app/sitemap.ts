import { getProjectSlugs } from '@/lib/queries';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.SITE_URL ?? 'http://localhost:4000';
  const lastModified = new Date().toISOString();
  const slugs = await getProjectSlugs();

  return [
    { url: `${base}/`, lastModified: lastModified, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${base}/projects`,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...slugs.map((slug) => ({
      url: `${base}/projects/${slug}`,
      lastModified: lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
