/*
  Warnings:

  - You are about to drop the column `x` on the `Tile` table. All the data in the column will be lost.
  - You are about to drop the column `y` on the `Tile` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "color" TEXT NOT NULL
);
INSERT INTO "new_Tile" ("color", "id") SELECT "color", "id" FROM "Tile";
DROP TABLE "Tile";
ALTER TABLE "new_Tile" RENAME TO "Tile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
