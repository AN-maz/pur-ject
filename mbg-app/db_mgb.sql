-- 1. Membuat Database
CREATE DATABASE IF NOT EXISTS mbg_db;
USE mbg_db;

-- 2. Tabel Sekolah
-- Menyimpan data sekolah yang berpartisipasi serta kredensial login dasar
CREATE TABLE IF NOT EXISTS sekolah (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_sekolah VARCHAR(150) NOT NULL,
    alamat TEXT NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Disiapkan untuk hash password saat login
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Tabel Menu Makanan (Tahap 1: Perencanaan H-1)
-- Menyimpan variasi menu makanan beserta tanggal jadwal penyajiannya
CREATE TABLE IF NOT EXISTS menu_makanan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_menu VARCHAR(150) NOT NULL,
    deskripsi TEXT,
    tanggal_jadwal DATE NOT NULL, -- Menentukan kapan menu ini disajikan (H-1 input)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Tabel Pesanan Harian (Tahap 2 & 3: Absensi, Porsi, & Distribusi)
-- Menghubungkan Sekolah dan Menu dengan relasi One-to-Many
CREATE TABLE IF NOT EXISTS pesanan_harian (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sekolah_id INT NOT NULL,
    menu_id INT NOT NULL,
    tanggal_pesanan DATE NOT NULL, -- Hari-H pelaksanaan
    jumlah_siswa_hadir INT NOT NULL DEFAULT 0, -- Input pagi hari dari pihak sekolah
    status ENUM('Pending', 'Diproses', 'Dikirim', 'Selesai') NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Relasi Foreign Key
    FOREIGN KEY (sekolah_id) REFERENCES sekolah(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES menu_makanan(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 5. Tabel Evaluasi Makanan (Tahap 4: Konfirmasi Terima & Umpan Balik)
-- Memiliki relasi One-to-One dengan pesanan_harian (menggunakan UNIQUE pada pesanan_id)
CREATE TABLE IF NOT EXISTS evaluasi_makanan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pesanan_id INT NOT NULL UNIQUE, -- UNIQUE memastikan 1 pesanan hanya punya 1 laporan evaluasi
    rating_rasa TINYINT NOT NULL CHECK (rating_rasa BETWEEN 1 AND 5),
    rating_porsi TINYINT NOT NULL CHECK (rating_porsi BETWEEN 1 AND 5),
    catatan_feedback TEXT,
    foto_bukti VARCHAR(255) NOT NULL, -- Menyimpan nama file gambar yang diunggah via multer
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Relasi Foreign Key (Jika pesanan dihapus, evaluasi otomatis terhapus)
    FOREIGN KEY (pesanan_id) REFERENCES pesanan_harian(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;