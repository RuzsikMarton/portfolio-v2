-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "cvEnUrl" TEXT,
    "cvSkUrl" TEXT,
    "cvHuUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
