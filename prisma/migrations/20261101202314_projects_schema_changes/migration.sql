/*
  Warnings:

  - You are about to drop the column `builtWith` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `ProjectTranslation` table. All the data in the column will be lost.
  - The `highlights` column on the `ProjectTranslation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `description` on table `ProjectTranslation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "builtWith",
DROP COLUMN "tags",
ADD COLUMN     "pdf" TEXT;

-- AlterTable
ALTER TABLE "ProjectTranslation" DROP COLUMN "content",
ADD COLUMN     "overview" TEXT,
ADD COLUMN     "stat1" TEXT,
ADD COLUMN     "stat1Value" TEXT,
ADD COLUMN     "stat2" TEXT,
ADD COLUMN     "stat2Value" TEXT,
ADD COLUMN     "stat3" TEXT,
ADD COLUMN     "stat3Value" TEXT,
ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "description" SET NOT NULL,
DROP COLUMN "highlights",
ADD COLUMN     "highlights" TEXT[];
