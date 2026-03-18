-- AlterTable
ALTER TABLE `users` ADD COLUMN `jabatan_struktural_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_jabatan_struktural_id_fkey` FOREIGN KEY (`jabatan_struktural_id`) REFERENCES `divisi`(`id_divisi`) ON DELETE SET NULL ON UPDATE CASCADE;
