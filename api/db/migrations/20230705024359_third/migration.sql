/*
  Warnings:

  - The primary key for the `FileVersion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FileVersion` table. All the data in the column will be lost.
  - Made the column `fileId` on table `FileVersion` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FileVersion" (
    "fileId" INTEGER NOT NULL,
    "versionId" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("fileId", "versionId"),
    CONSTRAINT "FileVersion_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FileVersion" ("createdAt", "description", "fileId", "hash", "name", "versionId") SELECT "createdAt", "description", "fileId", "hash", "name", "versionId" FROM "FileVersion";
DROP TABLE "FileVersion";
ALTER TABLE "new_FileVersion" RENAME TO "FileVersion";
CREATE UNIQUE INDEX "FileVersion_fileId_hash_key" ON "FileVersion"("fileId", "hash");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
