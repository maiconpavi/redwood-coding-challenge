-- CreateTable
CREATE TABLE "FileVersion" (
    "fileId" INTEGER NOT NULL,
    "versionId" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("fileId", "versionId"),
    CONSTRAINT "FileVersion_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "FileVersion_createdAt_idx" ON "FileVersion"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "FileVersion_fileId_hash_key" ON "FileVersion"("fileId", "hash");

-- CreateIndex
CREATE INDEX "File_createdAt_idx" ON "File"("createdAt" DESC);
