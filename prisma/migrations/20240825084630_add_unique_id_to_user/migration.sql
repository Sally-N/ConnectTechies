-- AlterTable
ALTER TABLE `user` ADD COLUMN `uniqueId` VARCHAR(191) NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;
