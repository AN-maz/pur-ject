/*
  Warnings:

  - The values [bph] on the enum `akun_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `akun` MODIFY `role` ENUM('super_admin', 'admin_divisi', 'admin_hum_in', 'user') NOT NULL DEFAULT 'user';
