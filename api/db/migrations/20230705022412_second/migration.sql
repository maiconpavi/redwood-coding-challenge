/*
  Warnings:

  - A unique constraint covering the columns `[fileId,versionId]` on the table `FileVersion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FileVersion_fileId_versionId_key" ON "FileVersion"("fileId", "versionId");
