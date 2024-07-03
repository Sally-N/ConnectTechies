/*
  Warnings:

  - You are about to drop the column `body` on the `conversation` table. All the data in the column will be lost.
  - Added the required column `message` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socketId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `conversation` DROP COLUMN `body`,
    ADD COLUMN `message` VARCHAR(191) NOT NULL,
    ADD COLUMN `socketId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `updated_at` DROP DEFAULT;
