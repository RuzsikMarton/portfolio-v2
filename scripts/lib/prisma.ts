// Separate Prisma client because scripts may run independently.

import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/prisma/generated/prisma/client';

export function createPrisma() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set (.env)');
  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
}
