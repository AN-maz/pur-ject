/*
  Warnings:

  - You are about to drop the column `cookie_expiry` on the `akun` table. All the data in the column will be lost.
  - You are about to drop the column `cookie_token` on the `akun` table. All the data in the column will be lost.
  - You are about to drop the column `kelola_divisi_id` on the `akun` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `akun` DROP COLUMN `cookie_expiry`,
    DROP COLUMN `cookie_token`,
    DROP COLUMN `kelola_divisi_id`;
