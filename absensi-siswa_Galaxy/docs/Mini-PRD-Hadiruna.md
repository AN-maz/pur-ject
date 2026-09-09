# Mini Product Requirements Document (PRD)

## Hadiruna — Aplikasi Absensi Siswa untuk SMA Islam dan Madrasah Aliyah

| Informasi | Keterangan |
|---|---|
| Nama produk | Hadiruna *(nama sementara)* |
| Jenis produk | Aplikasi web absensi siswa |
| Pengguna utama | Guru SMA Islam/Madrasah Aliyah |
| Status | Prototype untuk demonstrasi |
| Platform | Web responsif untuk laptop dan ponsel |
| Teknologi | React, Hono.js, dan SQLite |
| Versi dokumen | 1.0 |
| Tanggal | 8 September 2026 |

## 1. Ringkasan Produk

Hadiruna adalah aplikasi web yang membantu guru mencatat kehadiran siswa berdasarkan jadwal mengajar. Setelah masuk ke sistem, guru melihat jadwal hari ini, memilih kelas dan jam pelajaran, membuka sesi absensi, mengisi status kehadiran siswa, lalu menutup sesi tersebut.

Sesi yang sudah ditutup tidak dapat langsung diubah. Jika terdapat kesalahan, guru dapat membuka kembali sesi dengan memberikan alasan, memperbaiki data, kemudian menutupnya kembali. Aplikasi dirancang sebagai prototype yang sederhana, cepat digunakan, dan menarik untuk didemonstrasikan.

Hadiruna ditujukan untuk lingkungan SMA Islam dan Madrasah Aliyah. Identitas tersebut diwujudkan melalui tampilan bernuansa Arab-Islam yang modern, tenang, dan akademis tanpa mengurangi keterbacaan maupun kemudahan penggunaan.

## 2. Latar Belakang

Absensi siswa sering dilakukan melalui buku kehadiran atau pencatatan terpisah. Cara tersebut dapat memakan waktu, menimbulkan kesalahan pencatatan, dan menyulitkan guru ketika ingin melihat kembali hasil kehadiran pada suatu kelas.

Prototype Hadiruna dibuat untuk memperlihatkan bagaimana proses absensi dapat disederhanakan melalui jadwal mengajar yang sudah tersedia di sistem. Guru tidak perlu mencari kelas atau membuat sesi secara manual dari awal; guru cukup memilih jadwal, memeriksa daftar siswa, dan mencatat siswa yang tidak hadir atau terlambat.

## 3. Masalah yang Diselesaikan

1. Guru membutuhkan proses absensi yang singkat ketika pelajaran dimulai.
2. Daftar siswa harus langsung sesuai dengan kelas yang sedang diajar.
3. Guru membutuhkan ringkasan kehadiran tanpa menghitung secara manual.
4. Data yang telah dikunci perlu tetap dapat diperbaiki secara terkendali.
5. Aplikasi demo perlu memiliki alur yang realistis tanpa membutuhkan sistem akademik yang kompleks.

## 4. Tujuan Produk

- Mempercepat proses pencatatan kehadiran siswa.
- Menampilkan jadwal mengajar guru secara jelas dan kontekstual.
- Mengurangi pengisian berulang dengan menetapkan semua siswa sebagai hadir secara default.
- Memberikan ringkasan kehadiran secara langsung.
- Menjaga perubahan data melalui mekanisme buka, tutup, dan buka kembali sesi.
- Menghasilkan prototype yang mudah dipahami dalam demonstrasi singkat.

## 5. Target Pengguna

### Guru

Guru merupakan satu-satunya aktor pada versi prototype. Guru dapat:

- masuk ke aplikasi;
- melihat jadwal mengajarnya;
- memilih jadwal dan kelas;
- membuka sesi absensi;
- mengisi dan memperbarui status kehadiran;
- menutup sesi absensi;
- membuka kembali sesi dengan alasan; dan
- melihat hasil serta ringkasan absensi.

Data guru, siswa, kelas, mata pelajaran, dan jadwal disediakan melalui database seed. Prototype belum menyediakan antarmuka admin untuk mengelola data tersebut.

## 6. Ruang Lingkup

### 6.1 Termasuk dalam Prototype

1. Login guru menggunakan akun yang telah disediakan.
2. Dashboard berisi identitas guru dan jadwal mengajar hari ini.
3. Penanda jadwal yang sedang berlangsung, akan datang, dan telah selesai.
4. Detail jadwal yang memuat mata pelajaran, kelas, tanggal, dan jam pelajaran.
5. Pembukaan sesi absensi berdasarkan jadwal.
6. Daftar siswa sesuai dengan kelas pada jadwal.
7. Status kehadiran: Hadir, Izin, Sakit, Alpa, dan Terlambat.
8. Catatan opsional pada kehadiran siswa.
9. Pencarian siswa berdasarkan nama atau nomor induk.
10. Ringkasan jumlah setiap status secara langsung.
11. Penyimpanan perubahan selama sesi masih dibuka.
12. Konfirmasi sebelum sesi ditutup.
13. Penguncian data setelah sesi ditutup.
14. Pembukaan kembali sesi dengan alasan wajib.
15. Halaman hasil absensi dan daftar siswa yang tidak hadir atau terlambat.
16. Riwayat absensi sederhana milik guru.

### 6.2 Tidak Termasuk dalam Prototype

- Panel admin dan CRUD data master.
- Absensi mandiri oleh siswa.
- QR code, GPS, biometrik, atau pengenalan wajah.
- Pengelolaan guru pengganti.
- Perubahan atau pertukaran jadwal.
- Notifikasi kepada orang tua atau wali.
- Rekap bulanan dan semester.
- Ekspor Excel atau integrasi sistem akademik.
- Pengelolaan tahun ajaran yang kompleks.
- Multi-sekolah atau multi-madrasah.
- Mode offline dan sinkronisasi data.

## 7. Alur Utama Pengguna

### 7.1 Melakukan Absensi

1. Guru membuka aplikasi dan masuk menggunakan akun yang tersedia.
2. Sistem menampilkan jadwal mengajar guru pada hari tersebut.
3. Guru memilih salah satu jadwal.
4. Sistem menampilkan informasi pelajaran dan daftar siswa dalam kelas.
5. Guru menekan **Buka Absensi**.
6. Sistem membuat sesi dan memberikan status Hadir kepada seluruh siswa secara default.
7. Guru mengubah status siswa yang izin, sakit, alpa, atau terlambat.
8. Ringkasan kehadiran diperbarui setiap kali status berubah.
9. Guru menekan **Tutup Absensi**.
10. Sistem menampilkan ringkasan untuk dikonfirmasi.
11. Setelah dikonfirmasi, sistem mengunci sesi dan menampilkan hasil absensi.

### 7.2 Memperbaiki Absensi yang Telah Ditutup

1. Guru membuka hasil atau riwayat absensi.
2. Guru memilih **Buka Kembali**.
3. Sistem meminta alasan pembukaan kembali.
4. Setelah alasan diisi, status sesi kembali menjadi Dibuka.
5. Guru memperbaiki data kehadiran.
6. Guru menutup sesi kembali.
7. Sistem menyimpan waktu pembukaan kembali dan alasannya.

## 8. Status Sesi Absensi

| Status | Arti | Tindakan yang Tersedia |
|---|---|---|
| Belum Dibuka | Jadwal belum memiliki sesi absensi | Buka Absensi |
| Dibuka | Guru sedang mengisi atau memperbaiki absensi | Ubah status, simpan, tutup |
| Ditutup | Absensi telah dikonfirmasi dan dikunci | Lihat hasil, buka kembali |

Pembukaan kembali tidak membutuhkan status database yang terpisah. Sesi kembali berstatus **Dibuka**, sementara waktu dan alasan pembukaan kembali dicatat sebagai informasi perubahan.

## 9. Aturan Bisnis

| ID | Aturan |
|---|---|
| BR-01 | Guru hanya dapat melihat dan mengakses jadwal miliknya. |
| BR-02 | Satu jadwal hanya boleh memiliki satu sesi absensi pada tanggal yang sama. |
| BR-03 | Daftar siswa pada sesi mengikuti kelas yang terhubung dengan jadwal. |
| BR-04 | Ketika sesi pertama kali dibuka, semua siswa berstatus Hadir secara default. |
| BR-05 | Setiap siswa hanya memiliki satu status kehadiran dalam satu sesi. |
| BR-06 | Status yang tersedia adalah Hadir, Izin, Sakit, Alpa, dan Terlambat. |
| BR-07 | Catatan siswa bersifat opsional. |
| BR-08 | Sesi berstatus Ditutup tidak dapat diedit secara langsung. |
| BR-09 | Guru wajib mengisi alasan untuk membuka kembali sesi. |
| BR-10 | Sistem mencatat waktu sesi dibuka, ditutup, dan terakhir kali dibuka kembali. |
| BR-11 | Hanya pemilik jadwal yang dapat membuka kembali sesi. |
| BR-12 | Ringkasan harus dihitung dari status terbaru seluruh siswa dalam sesi. |
| BR-13 | Prototype mengizinkan guru membuka jadwal di luar jam mengajar agar demonstrasi tidak bergantung pada waktu nyata. |

## 10. Kebutuhan Fungsional

### FR-01 — Autentikasi Guru

- Sistem menyediakan formulir email dan kata sandi.
- Sistem menolak kredensial yang tidak sesuai.
- Setelah berhasil masuk, guru diarahkan ke dashboard.
- Guru dapat keluar dari aplikasi.

### FR-02 — Dashboard dan Jadwal

- Sistem menampilkan nama guru dan tanggal hari ini.
- Sistem menampilkan jadwal milik guru.
- Setiap jadwal menampilkan jam, mata pelajaran, kelas, dan status sesi.
- Sistem memberikan penanda visual pada jadwal yang sedang berlangsung.
- Guru dapat membuka detail jadwal.

### FR-03 — Pembukaan Sesi

- Guru dapat membuka sesi dari jadwal yang belum memiliki sesi.
- Sistem mencegah pembuatan sesi ganda untuk jadwal dan tanggal yang sama.
- Sistem menghasilkan catatan kehadiran awal untuk seluruh siswa di kelas.

### FR-04 — Pengisian Kehadiran

- Sistem menampilkan nama dan nomor induk siswa.
- Guru dapat mencari siswa.
- Guru dapat memilih satu status kehadiran untuk setiap siswa.
- Guru dapat menambahkan catatan opsional.
- Sistem menampilkan jumlah Hadir, Izin, Sakit, Alpa, dan Terlambat.
- Perubahan ringkasan muncul tanpa memuat ulang halaman.

### FR-05 — Penutupan Sesi

- Sistem menampilkan konfirmasi dan ringkasan sebelum sesi ditutup.
- Setelah dikonfirmasi, sistem mengubah status sesi menjadi Ditutup.
- Sistem mencegah perubahan data ketika sesi telah ditutup.
- Sistem menampilkan hasil absensi setelah penutupan berhasil.

### FR-06 — Pembukaan Kembali

- Guru dapat membuka kembali sesi miliknya yang telah ditutup.
- Sistem mewajibkan alasan pembukaan kembali.
- Sistem mencatat waktu dan alasan pembukaan kembali.
- Guru dapat kembali memperbarui kehadiran setelah sesi dibuka.

### FR-07 — Hasil dan Riwayat

- Sistem menampilkan ringkasan hasil absensi.
- Sistem menampilkan persentase kehadiran.
- Sistem menampilkan siswa berstatus Izin, Sakit, Alpa, atau Terlambat.
- Sistem menampilkan riwayat sesi absensi milik guru secara sederhana.

## 11. Kebutuhan Nonfungsional

### Usability

- Alur absensi dapat diselesaikan tanpa berpindah melalui banyak halaman.
- Tombol aksi utama mudah ditemukan dan memiliki label yang jelas.
- Status tidak hanya dibedakan melalui warna, tetapi juga teks atau ikon.
- Tampilan dapat digunakan dengan nyaman melalui laptop dan ponsel.

### Performance

- Dashboard dan daftar siswa ditargetkan tampil dalam waktu maksimal 2 detik pada lingkungan demo normal.
- Perubahan status dan ringkasan terasa langsung tanpa pemuatan ulang halaman penuh.

### Security

- Kata sandi tidak disimpan sebagai teks biasa.
- Endpoint yang membutuhkan autentikasi harus memverifikasi sesi atau token pengguna.
- Guru tidak dapat mengakses jadwal dan absensi milik guru lain hanya dengan mengubah URL.
- Input pengguna divalidasi pada frontend dan backend.

### Reliability

- Sistem tidak membuat sesi atau catatan kehadiran ganda.
- Kegagalan penyimpanan harus ditampilkan kepada guru dan tidak boleh memberikan pesan berhasil palsu.
- Operasi pembukaan sesi beserta pembuatan daftar kehadiran dilakukan secara atomik melalui transaksi database.

### Compatibility

- Prototype ditargetkan berjalan pada browser desktop dan mobile modern.
- Tata letak tetap dapat digunakan pada lebar layar minimal 360 piksel.

## 12. Arah Pengalaman dan Visual

### Prinsip Pengalaman

1. **Cepat:** guru hanya mengubah siswa yang tidak hadir atau terlambat.
2. **Jelas:** status sesi dan aksi berikutnya selalu terlihat.
3. **Aman:** sesi yang ditutup tidak dapat berubah tanpa proses buka kembali.
4. **Kontekstual:** guru memulai absensi dari jadwal, bukan memilih kelas secara terpisah.

### Identitas Arab-Islam

- Gaya visual modern, bersih, tenang, dan akademis.
- Warna utama hijau zamrud dengan latar putih hangat atau ivory.
- Warna navy dapat digunakan sebagai warna teks atau warna sekunder.
- Emas lembut digunakan terbatas sebagai aksen.
- Pola geometri Islam digunakan secara halus pada halaman login, header, atau latar dekoratif.
- Bentuk lengkung yang terinspirasi arsitektur Islam dapat digunakan pada elemen dekoratif atau kartu utama.
- Ornamen tidak boleh mengganggu daftar siswa dan kontrol absensi.
- Istilah operasional tetap menggunakan bahasa Indonesia agar mudah dipahami.
- Tulisan Arab atau kaligrafi hanya digunakan bila makna dan penulisannya telah dipastikan benar.

Arah visual terperinci akan ditentukan pada dokumen UI Style Guide terpisah.

## 13. Data Demo yang Dibutuhkan

- 1 akun guru utama dan 1 akun guru pembanding.
- 2–3 mata pelajaran.
- 2–3 kelas.
- Sekitar 15–25 siswa per kelas agar daftar terlihat realistis tetapi tetap nyaman didemonstrasikan.
- 3–4 jadwal pada hari demo.
- Minimal 1 sesi belum dibuka, 1 sesi sedang dibuka, dan 1 sesi telah ditutup.
- Contoh siswa dengan status Hadir, Izin, Sakit, Alpa, dan Terlambat.

Data merupakan data fiktif dan tidak menggunakan identitas siswa sebenarnya.

## 14. Skenario Demonstrasi Utama

1. Presenter masuk sebagai guru.
2. Dashboard menyorot jadwal Informatika kelas XI IPA 2.
3. Presenter membuka sesi absensi.
4. Seluruh siswa otomatis berstatus Hadir.
5. Presenter mengubah beberapa siswa menjadi Izin, Sakit, Alpa, dan Terlambat.
6. Ringkasan berubah secara langsung.
7. Presenter menutup sesi dan memperlihatkan halaman hasil.
8. Presenter membuka kembali sesi dengan alasan kesalahan pencatatan.
9. Satu data siswa diperbaiki dan sesi ditutup kembali.

Target durasi skenario utama adalah sekitar 3–5 menit.

## 15. Kriteria Penerimaan

Prototype dianggap memenuhi Mini PRD apabila:

- [ ] Guru dapat masuk dengan akun demo yang valid.
- [ ] Guru tidak dapat masuk menggunakan kredensial yang salah.
- [ ] Dashboard hanya menampilkan jadwal milik guru yang sedang masuk.
- [ ] Informasi jadwal dan kelas tampil dengan benar.
- [ ] Satu jadwal tidak menghasilkan sesi ganda pada tanggal yang sama.
- [ ] Daftar siswa sesuai dengan kelas pada jadwal.
- [ ] Seluruh siswa berstatus Hadir ketika sesi pertama kali dibuka.
- [ ] Guru dapat memilih kelima status kehadiran.
- [ ] Ringkasan berubah sesuai status siswa.
- [ ] Guru dapat menutup sesi melalui dialog konfirmasi.
- [ ] Data tidak dapat diedit setelah sesi ditutup.
- [ ] Sesi hanya dapat dibuka kembali setelah alasan diisi.
- [ ] Perubahan setelah pembukaan kembali dapat disimpan.
- [ ] Hasil absensi menampilkan jumlah dan persentase yang benar.
- [ ] Tampilan tetap dapat digunakan pada desktop dan ponsel.
- [ ] Identitas visual Arab-Islam terlihat tanpa mengganggu fungsi utama.

## 16. Indikator Keberhasilan Demo

- Penonton dapat memahami tujuan aplikasi dari dashboard tanpa penjelasan panjang.
- Proses dari memilih jadwal sampai menutup absensi dapat diperagakan dalam maksimal 5 menit.
- Ringkasan kehadiran merespons perubahan data dengan benar.
- Mekanisme buka kembali menunjukkan bahwa koreksi data tetap terkontrol.
- Nuansa SMA Islam/Madrasah Aliyah terlihat konsisten pada tampilan.

## 17. Asumsi dan Batasan

- Prototype digunakan untuk demonstrasi, bukan operasional sekolah sebenarnya.
- Koneksi internet atau jaringan lokal dianggap tersedia.
- Data master sudah benar dan tidak dikelola melalui aplikasi.
- SQLite digunakan selama tahap prototype.
- Waktu jadwal tidak membatasi tombol Buka Absensi agar demo dapat dilakukan kapan saja.
- Persentase kehadiran pada halaman hasil dihitung sebagai jumlah siswa berstatus Hadir dibagi jumlah seluruh siswa, dikalikan 100. Status Terlambat tetap ditampilkan terpisah dan tidak dihitung sebagai Hadir pada versi prototype.

## 18. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi Prototype |
|---|---|---|
| Scope berkembang menjadi sistem akademik lengkap | Pengerjaan tidak selesai | Menjaga daftar *out of scope* sebagai batas pengembangan |
| Data absensi ganda | Ringkasan tidak akurat | Constraint unik dan transaksi database |
| Semua siswa otomatis Hadir tanpa diperiksa | Data keliru | Konfirmasi ringkasan sebelum penutupan |
| Ornamen visual berlebihan | Aplikasi sulit digunakan | Membatasi ornamen pada area dekoratif |
| Demo bergantung pada waktu jadwal | Skenario tidak dapat dijalankan | Mengizinkan pembukaan jadwal di luar jam pada mode prototype |

## 19. Tahap Dokumentasi Berikutnya

Setelah Mini PRD disetujui, dokumen berikutnya disusun secara berurutan:

1. Sitemap untuk menentukan struktur halaman.
2. User flow untuk memetakan alur utama dan kondisi gagal.
3. UI Style Guide untuk menetapkan identitas visual Arab-Islam.
4. Database schema dan ERD berdasarkan aturan bisnis.
5. API contract berdasarkan kebutuhan frontend dan model data.

---

Dokumen ini menjadi batas dan acuan awal prototype Hadiruna. Perubahan fitur harus diperiksa terhadap tujuan demo agar aplikasi tetap sederhana, realistis, dan selesai dalam ruang lingkup yang telah ditentukan.
