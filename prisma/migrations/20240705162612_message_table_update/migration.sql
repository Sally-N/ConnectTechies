-- AlterTable
ALTER TABLE `message` MODIFY `socketId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `updated_at` DROP DEFAULT;
