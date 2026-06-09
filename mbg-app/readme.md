# DOKUMENTASI PENGEMBANGAN APLIKASI MBG 

## 1. Stack Teknologi (Tech Stack)
Arsitektur yang digunakan adalah `Monolith Architecture` yang efisien, hemat biaya, dan cepat dalam proses deployment awal.

### - Backend & Server-side Logic: Node.js dengan framework Express.js.

### - Frontend Templating Engine: EJS (Embedded JavaScript): untuk merender tampilan dinamis langsung dari server.

### - Database: MySQL (Relational Database) untuk menjamin konsistensi data transaksi harian.

### - Database Driver `mysql2` (mendukung fitur promise/async-await).

### - Media/File Handler `multer` (middleware untuk mengelola unggahan foto bukti pengiriman makanan dari sekolah).


## 2. Struktur Folder Proyek (MVC Pattern)

```
mbg-app/
├── config/             # Konfigurasi database & pihak ketiga
│   └── db.js           # Pool koneksi MySQL
├── controllers/        # Logika bisnis utama & pengolahan data
│   ├── orderController.js
│   └── menuController.js
├── routes/             # Pemetaan URL/Endpoint aplikasi
│   ├── web.js          # Rute untuk tampilan EJS dan API
├── views/              # Komponen Frontend (EJS Files)
│   ├── layouts/        # Komponen global (Header, Footer, Sidebar)
│   ├── dashboard.ejs   # Halaman utama dapur & sekolah
│   ├── menu.ejs        # Manajemen jadwal menu
│   └── laporan.ejs     # Evaluasi dan rating harian
├── public/             # Aset statis client-side
│   ├── css/            # File styling (Bootstrap / Tailwind / CSS Custom)
│   ├── js/             # Script sisi client
│   └── uploads/        # Folder penyimpanan foto bukti makanan dari sekolah
├── app.js              # Entry point utama aplikasi Express
└── package.json        # Manifest proyek dan daftar dependency

```

## 3. Alur Kerja Sistem (Workflow)
Sistem ini memiliki siklus harian (Daily Lifecycle) yang dibagi menjadi 4 tahapan utama:

### Tahap 1: Perencanaan & Jadwal Menu (H-1)

- Pengelola Dapur menginput variasi menu makanan untuk esok hari melalui sistem dashboard admin.
- Data tersimpan di tabel `menu_makanan`.

### Tahap 2: Input Absensi & Konfirmasi Porsi (Pagi Hari / Hari-H)
- Pihak Sekolah (Guru/Admin) membuka aplikasi sebelum proses memasak dimulai.
- Sekolah menginput `Jumlah Siswa Hadir` hari itu untuk menghindari pemborosan makanan (zero food waste).
- Data masuk ke tabel `pesanan_harian` dengan status awal `Pending` atau `Diproses`.

### Tahap 3: Produksi & Distribusi (Siang Hari)
- Aplikasi menjumlahkan seluruh input siswa dari semua sekolah secara real-time `(SUM(jumlah_siswa_hadir))`.
- `Tim Dapur` memasak sesuai total porsi tersebut.
- Setelah makanan matang dan dikemas, status diubah menjadi Dikirim saat kurir berangkat.

### Tahap 4: Konfirmasi Terima & Evaluasi (Selesai Distribusi)
- `Pihak Sekolah` menerima makanan, mencocokkan jumlah porsi fisik, lalu menekan tombol Selesai.
- Guru mengisi rating bintang (1-5) untuk rasa dan porsi, menulis catatan umpan balik, serta wajib `mengunggah foto makanan` sebagai bukti higienitas dan kelayakan.
- Data umpan balik dan nama file foto disimpan ke tabel `evaluasi_makanan`.

## 4. Skema Hubungan Database (Entity-Relationship)
### 1. Satu Sekolah dapat memiliki Banyak Pesanan Harian (One-to-Many ke pesanan_harian).
### 2. Satu Menu dapat dijadwalkan di Banyak Pesanan Harian (One-to-Many ke pesanan_harian).
### 3. Satu Pesanan Harian hanya memiliki Satu Laporan Evaluasi (One-to-One ke evaluasi_makanan).