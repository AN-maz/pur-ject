/*
  Warnings:

  - You are about to drop the column `file_lampiran` on the `agenda` table. All the data in the column will be lost.
  - You are about to alter the column `status_keanggotaan` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `agenda` DROP COLUMN `file_lampiran`;

-- AlterTable
ALTER TABLE `users` MODIFY `status_keanggotaan` ENUM('pasif', 'aktif', 'bph') NOT NULL DEFAULT 'pasif';
