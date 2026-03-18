-- CreateTable
CREATE TABLE `divisi` (
    `id_divisi` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_divisi` VARCHAR(191) NOT NULL,
    `kode` CHAR(3) NOT NULL,
    `kategori` ENUM('topman', 'peminatan', 'pendukung') NOT NULL,
    `deskripsi` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `divisi_kode_key`(`kode`),
    PRIMARY KEY (`id_divisi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `akun` (
    `id_akun` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('super_admin', 'admin_divisi', 'admin_hum_in', 'bph', 'user') NOT NULL DEFAULT 'user',
    `is_approved` BOOLEAN NOT NULL DEFAULT false,
    `cookie_token` VARCHAR(191) NULL,
    `cookie_expiry` DATETIME(3) NULL,
    `kelola_divisi_id` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `akun_email_key`(`email`),
    PRIMARY KEY (`id_akun`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `nim` VARCHAR(20) NOT NULL,
    `id_akun` VARCHAR(191) NOT NULL,
    `nama_lengkap` VARCHAR(191) NOT NULL,
    `jurusan` VARCHAR(191) NOT NULL,
    `angkatan` INTEGER NOT NULL,
    `alasan` TEXT NULL,
    `status_keanggotaan` ENUM('pending', 'pasif', 'aktif', 'bph') NOT NULL DEFAULT 'pending',
    `divisi_peminatan_id` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_id_akun_key`(`id_akun`),
    PRIMARY KEY (`nim`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agenda` (
    `id_agenda` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NULL,
    `id_divisi` INTEGER NOT NULL,
    `kategori` VARCHAR(191) NOT NULL DEFAULT 'pelatihan',
    `tanggal` DATETIME(3) NOT NULL,
    `lokasi` VARCHAR(191) NULL,
    `token_absen` VARCHAR(10) NOT NULL,
    `is_absen_open` BOOLEAN NOT NULL DEFAULT false,
    `konten_materi` LONGTEXT NULL,
    `file_lampiran` VARCHAR(191) NULL,
    `created_by` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_agenda`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `absensi` (
    `id_absensi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_agenda` INTEGER NOT NULL,
    `nim` VARCHAR(191) NOT NULL,
    `waktu_input` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL DEFAULT 'hadir',

    UNIQUE INDEX `absensi_id_agenda_nim_key`(`id_agenda`, `nim`),
    PRIMARY KEY (`id_absensi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `intenal_meet` (
    `id_meet` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `lokasi` VARCHAR(191) NULL,
    `token_absen` VARCHAR(10) NOT NULL,
    `is_open` BOOLEAN NOT NULL DEFAULT true,
    `notulensi` LONGTEXT NULL,
    `file_notulensi` VARCHAR(191) NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_meet`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `absensi_internal` (
    `id_absensi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_meet` INTEGER NOT NULL,
    `nim` VARCHAR(191) NOT NULL,
    `waktu_input` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `absensi_internal_id_meet_nim_key`(`id_meet`, `nim`),
    PRIMARY KEY (`id_absensi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_divisi_peminatan_id_fkey` FOREIGN KEY (`divisi_peminatan_id`) REFERENCES `divisi`(`id_divisi`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_id_akun_fkey` FOREIGN KEY (`id_akun`) REFERENCES `akun`(`id_akun`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agenda` ADD CONSTRAINT `agenda_id_divisi_fkey` FOREIGN KEY (`id_divisi`) REFERENCES `divisi`(`id_divisi`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agenda` ADD CONSTRAINT `agenda_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `akun`(`id_akun`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absensi` ADD CONSTRAINT `absensi_id_agenda_fkey` FOREIGN KEY (`id_agenda`) REFERENCES `agenda`(`id_agenda`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absensi` ADD CONSTRAINT `absensi_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `users`(`nim`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `intenal_meet` ADD CONSTRAINT `intenal_meet_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `akun`(`id_akun`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absensi_internal` ADD CONSTRAINT `absensi_internal_id_meet_fkey` FOREIGN KEY (`id_meet`) REFERENCES `intenal_meet`(`id_meet`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absensi_internal` ADD CONSTRAINT `absensi_internal_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `users`(`nim`) ON DELETE CASCADE ON UPDATE CASCADE;
