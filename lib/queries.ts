import { cacheLife, cacheTag } from 'next/cache';
import 'server-only';

export async function getProjectSlugs() {
  'use cache';
  cacheLife('days');
  cacheTag('projects');

  return ['workoutracker', 'evidio', 'matrixvis'];
}

{
  /* will project slugs and updatedAt from db later */
}
