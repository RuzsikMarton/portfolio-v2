import { Locale } from '@/i18n/config';
import { Project } from '@/prisma/generated/prisma/client';

export interface Translation {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  locale: Locale;
  tags: string[];
  overview: string | null;
  highlights: string[];

  stat1: string | null;
  stat2: string | null;
  stat3: string | null;
  stat1Value: string | null;
  stat2Value: string | null;
  stat3Value: string | null;
  projectId: number;
}

export type ProjectWithTranslation = Project & {
  translation: Translation | null;
  projectTranslations: Translation[];
};

export interface ProjectDetail {
  id: number;
  slug: string;
  title: string;
  featured: boolean;
  order: number;
  stack: string[];
  featuredPhoto: string | null;
  logo: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  pdf: string | null;
  status: string | null;
  launchedAt: string | null;
  period: string | null;
  role: string | null;
  createdAt: Date;
  updatedAt: Date;
  translation: Translation | null;
  projectTranslations: {
    id: number;
    title: string;
    locale: Locale;
    subtitle: string;
    description: string;
    tags: string[];
    overview: string | null;
    highlights: string[];
    stat1: string | null;
    stat1Value: string | null;
    stat2: string | null;
    stat2Value: string | null;
    stat3: string | null;
    stat3Value: string | null;
    projectId: number;
  }[];
}
