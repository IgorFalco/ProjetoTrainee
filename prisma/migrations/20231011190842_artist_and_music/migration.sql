/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `idUser` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Artist" (
    "idArtist" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "streams" INTEGER NOT NULL,
    "photo" TEXT
);

-- CreateTable
CREATE TABLE "Music" (
    "idMusic" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "album" TEXT,
    "artistId" INTEGER NOT NULL,
    CONSTRAINT "Music_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("idArtist") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_MusicToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MusicToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Music" ("idMusic") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MusicToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("idUser") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "idUser" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photo" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "name", "password", "photo", "role") SELECT "email", "name", "password", "photo", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_MusicToUser_AB_unique" ON "_MusicToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicToUser_B_index" ON "_MusicToUser"("B");
