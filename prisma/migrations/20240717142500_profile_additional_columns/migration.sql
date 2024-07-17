/*
  Warnings:

  - Made the column `firstname` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `profile` ADD COLUMN `aboutBio` VARCHAR(191) NULL,
    ADD COLUMN `linkedInUrl` VARCHAR(191) NULL,
    ADD COLUMN `portfolioUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `firstname` VARCHAR(191) NOT NULL,
    MODIFY `lastname` VARCHAR(191) NOT NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;
