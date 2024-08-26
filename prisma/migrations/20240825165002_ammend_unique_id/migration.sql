/*
  Warnings:

  - Made the column `uniqueId` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` ALTER COLUMN `updated_at` DROP DEFAULT,
    MODIFY `uniqueId` VARCHAR(191) NOT NULL;
