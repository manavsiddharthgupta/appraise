/*
  Warnings:

  - Added the required column `slug` to the `Forum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Forum" ADD COLUMN     "slug" TEXT NOT NULL;
