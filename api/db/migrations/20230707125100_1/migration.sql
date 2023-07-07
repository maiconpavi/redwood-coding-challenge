-- CreateTable
CREATE TABLE "FileVersion" (
    "fileId" INTEGER NOT NULL,
    "versionId" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileVersion_pkey" PRIMARY KEY ("fileId","versionId")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FileVersion_createdAt_idx" ON "FileVersion"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "FileVersion_fileId_hash_key" ON "FileVersion"("fileId", "hash");

-- CreateIndex
CREATE INDEX "File_createdAt_idx" ON "File"("createdAt" DESC);

-- AddForeignKey
ALTER TABLE "FileVersion" ADD CONSTRAINT "FileVersion_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
