-- AlterTable
ALTER TABLE `profile` ADD COLUMN `industries` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `updated_at` DROP DEFAULT;
