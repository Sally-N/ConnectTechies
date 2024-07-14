/*
  Warnings:

  - You are about to drop the column `socketId` on the `message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `message` DROP COLUMN `socketId`;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `updated_at` DROP DEFAULT;
