/*
  Warnings:

  - Made the column `photo` on table `Artist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `album` on table `Music` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artist" (
    "idArtist" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "streams" INTEGER NOT NULL,
    "photo" TEXT NOT NULL
);
INSERT INTO "new_Artist" ("idArtist", "name", "photo", "streams") SELECT "idArtist", "name", "photo", "streams" FROM "Artist";
DROP TABLE "Artist";
ALTER TABLE "new_Artist" RENAME TO "Artist";
CREATE TABLE "new_Music" (
    "idMusic" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "artistId" INTEGER,
    CONSTRAINT "Music_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("idArtist") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Music" ("album", "artistId", "genre", "idMusic", "name") SELECT "album", "artistId", "genre", "idMusic", "name" FROM "Music";
DROP TABLE "Music";
ALTER TABLE "new_Music" RENAME TO "Music";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
