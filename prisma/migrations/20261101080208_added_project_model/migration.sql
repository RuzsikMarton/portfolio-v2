-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('en', 'sk', 'hu');

-- CreateTable
CREATE TABLE "About" (
    "id" SERIAL NOT NULL,
    "age" TEXT NOT NULL,
    "projects" TEXT NOT NULL,
    "deployed" TEXT NOT NULL,
    "experience" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "order" INTEGER,
    "builtWith" TEXT[],
    "stack" TEXT[],
    "featuredPhoto" TEXT,
    "logo" TEXT,
    "githubUrl" TEXT,
    "liveUrl" TEXT,
    "status" TEXT,
    "launchedAt" TIMESTAMP(3),
    "period" TEXT,
    "role" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTranslation" (
    "id" SERIAL NOT NULL,
    "locale" "Locale" NOT NULL DEFAULT 'sk',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" JSONB,
    "highlights" JSONB,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "ProjectTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTranslation_locale_projectId_key" ON "ProjectTranslation"("locale", "projectId");

-- AddForeignKey
ALTER TABLE "ProjectTranslation" ADD CONSTRAINT "ProjectTranslation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
