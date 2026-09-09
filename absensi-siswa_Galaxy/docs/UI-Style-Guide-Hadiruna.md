# UI Style Guide Hadiruna

## Aplikasi Absensi Siswa untuk SMA Islam dan Madrasah Aliyah

| Informasi | Keterangan |
|---|---|
| Dokumen | UI Style Guide |
| Produk | Hadiruna *(nama sementara)* |
| Tema | Modern Madrasah |
| Platform | Web responsif untuk laptop dan ponsel |
| Acuan | Mini PRD, Sitemap, dan User Flow Hadiruna v1.0 |
| Versi dokumen | 1.0 |
| Tanggal | 8 September 2026 |

## 1. Tujuan

UI Style Guide ini menjadi acuan visual dan perilaku antarmuka prototype Hadiruna. Panduan dirancang agar setiap halaman terlihat sebagai satu produk yang konsisten, mudah digunakan oleh guru, dan memiliki identitas SMA Islam/Madrasah Aliyah yang terasa modern.

Tema Arab-Islam diterapkan melalui warna, pola geometri, ritme visual, dan bentuk lengkung yang halus. Tema tidak boleh mengurangi keterbacaan daftar siswa, kejelasan status, atau kecepatan guru ketika melakukan absensi.

## 2. Arah Visual

### Konsep: Modern Madrasah

Hadiruna menggabungkan tiga karakter:

- **Akademis:** rapi, terstruktur, dan dapat dipercaya.
- **Islami:** tenang, hangat, bersahaja, dan bermakna.
- **Modern:** ringan, responsif, dan tidak dipenuhi ornamen.

### Kata Kunci Visual

`Tenang` · `Terpercaya` · `Bersih` · `Hangat` · `Teratur` · `Modern`

### Prinsip Desain

1. **Fungsi lebih utama daripada dekorasi.** Kontrol absensi harus selalu menjadi pusat perhatian.
2. **Status mudah dibedakan.** Warna selalu didampingi teks atau ikon.
3. **Identitas tampil secara halus.** Pola dan lengkungan digunakan sebagai aksen, bukan isi utama.
4. **Aksi memiliki hierarki.** Dalam satu area hanya ada satu tindakan primer.
5. **Nyaman disentuh.** Kontrol utama memiliki ukuran yang aman untuk layar ponsel.
6. **Umpan balik selalu terlihat.** Menyimpan, berhasil, dan gagal tidak boleh terasa samar.

## 3. Identitas Arab-Islam

### Elemen yang Dianjurkan

- Pola geometri Islam dengan opacity rendah pada halaman Login atau bagian atas Dashboard.
- Lengkungan terinspirasi mihrab pada bingkai dekoratif, ilustrasi kosong, atau latar hero kecil.
- Garis tipis berwarna emas sebagai detail pemisah.
- Komposisi simetris pada area branding.
- Ruang kosong yang cukup untuk menghasilkan kesan tenang.

### Elemen yang Dibatasi

- Pola dekoratif tidak digunakan di belakang teks kecil atau daftar siswa.
- Emas tidak digunakan sebagai warna teks utama atau tombol utama.
- Kaligrafi Arab tidak digunakan sebagai pengganti label navigasi.
- Ornamen tidak ditempatkan pada setiap kartu.
- Bentuk kubah, bulan sabit, atau lentera tidak perlu digunakan bersamaan.

### Penggunaan Teks Arab

Tulisan Arab bersifat opsional. Jika digunakan:

- hanya sebagai elemen identitas atau sambutan singkat;
- makna dan ejaannya harus diverifikasi;
- tersedia terjemahan bahasa Indonesia;
- tidak menggunakan ayat Al-Qur'an sebagai dekorasi antarmuka; dan
- tidak ditempatkan pada elemen yang dapat terpotong, tertutup, atau diperlakukan secara tidak pantas.

Istilah operasional tetap menggunakan bahasa Indonesia, misalnya **Buka Absensi**, **Tutup Absensi**, dan **Buka Kembali**.

## 4. Logo dan Nama Produk

### Arah Logo Sementara

Logo dapat menggunakan gabungan:

- monogram huruf **H**;
- bentuk lengkung geometris;
- titik atau bentuk daftar kehadiran; dan
- warna hijau zamrud.

Logo harus tetap terbaca pada ukuran kecil dan tidak bergantung pada detail kaligrafi.

### Lockup

| Varian | Penggunaan |
|---|---|
| Logo + “Hadiruna” | Login dan header desktop |
| Logo saja | Header mobile atau favicon |
| Monokrom putih | Latar hijau gelap |
| Monokrom gelap | Dokumen atau latar terang |

### Clear Space

Berikan ruang kosong minimal sebesar tinggi huruf **H** di sekeliling logo. Logo tidak boleh ditempatkan terlalu dekat dengan tepi layar, pola, atau tombol.

## 5. Sistem Warna

### 5.1 Warna Merek

| Token | Hex | Peran |
|---|---|---|
| `brand-700` | `#0B473C` | Hover/pressed tombol primer |
| `brand-600` | `#0F5C4D` | Warna utama dan tombol primer |
| `brand-500` | `#176B5B` | Ikon atau aksen merek |
| `brand-100` | `#DCEFE9` | Latar elemen terpilih |
| `brand-50` | `#EEF7F4` | Latar lembut |
| `navy-700` | `#19324A` | Warna sekunder dan heading alternatif |
| `gold-500` | `#C59B4B` | Aksen dekoratif terbatas |
| `ivory-50` | `#F8F5EC` | Latar utama aplikasi |

### 5.2 Warna Netral

| Token | Hex | Peran |
|---|---|---|
| `neutral-950` | `#172B27` | Teks utama |
| `neutral-700` | `#354943` | Teks sekunder kuat |
| `neutral-600` | `#52655F` | Teks pendukung |
| `neutral-300` | `#C9D5D1` | Border kontrol |
| `neutral-200` | `#DCE5E1` | Border kartu dan divider |
| `neutral-100` | `#EEF2F0` | Latar kontrol nonaktif |
| `neutral-50` | `#F6F8F7` | Latar bagian sekunder |
| `white` | `#FFFFFF` | Surface dan teks di atas warna gelap |

### 5.3 Warna Status Kehadiran

| Status | Teks/ikon | Latar | Makna |
|---|---|---|---|
| Hadir | `#155E46` | `#E8F5EF` | Positif dan selesai |
| Izin | `#1D4ED8` | `#EFF6FF` | Informasional |
| Sakit | `#92400E` | `#FFF7E6` | Perhatian tanpa kesan kesalahan |
| Alpa | `#B42318` | `#FDECEA` | Ketidakhadiran tanpa keterangan |
| Terlambat | `#6D28D9` | `#F3E8FF` | Hadir dengan kondisi khusus |

Warna status memiliki rasio kontras teks terhadap latar di atas 4.5:1. Status tetap harus memiliki label teks agar tidak bergantung pada persepsi warna.

### 5.4 Warna Status Sesi

| Status | Teks/ikon | Latar |
|---|---|---|
| Belum Dibuka | `#52655F` | `#EEF2F0` |
| Dibuka | `#155E46` | `#E8F5EF` |
| Ditutup | `#334155` | `#F1F5F9` |

### 5.5 Warna Sistem

| Keadaan | Warna Utama | Latar |
|---|---|---|
| Berhasil | `#155E46` | `#E8F5EF` |
| Informasi | `#1D4ED8` | `#EFF6FF` |
| Peringatan | `#92400E` | `#FFF7E6` |
| Kesalahan | `#B42318` | `#FDECEA` |

### Aturan Penggunaan Warna

- Hijau merek tidak otomatis berarti “Hadir”; label tetap diperlukan.
- Merah hanya digunakan untuk kesalahan, Alpa, atau tindakan berisiko.
- Emas hanya menjadi aksen visual dan tidak digunakan pada teks kecil.
- Teks utama memakai `neutral-950`, bukan hitam murni.
- Latar halaman memakai ivory, sedangkan kartu memakai putih untuk membentuk kedalaman lembut.

## 6. Tipografi

### Font Utama

**Plus Jakarta Sans** digunakan untuk teks Latin karena modern, ramah, dan tetap profesional.

Fallback:

```css
font-family: "Plus Jakarta Sans", Inter, system-ui, -apple-system, sans-serif;
```

### Font Arab Opsional

**Noto Sans Arabic** digunakan hanya jika terdapat teks Arab.

```css
font-family: "Noto Sans Arabic", sans-serif;
```

Teks Arab tidak menggunakan font dekoratif yang sulit dibaca.

### Skala Tipografi

| Token | Desktop | Mobile | Line Height | Weight | Penggunaan |
|---|---:|---:|---:|---:|---|
| `display` | 40 px | 32 px | 1.2 | 700 | Judul Login, bila diperlukan |
| `h1` | 32 px | 28 px | 1.25 | 700 | Judul halaman |
| `h2` | 24 px | 22 px | 1.3 | 700 | Judul bagian utama |
| `h3` | 20 px | 18 px | 1.4 | 600 | Judul kartu |
| `body-lg` | 18 px | 17 px | 1.6 | 400 | Teks pengantar |
| `body` | 16 px | 16 px | 1.5 | 400 | Teks utama dan input |
| `body-sm` | 14 px | 14 px | 1.5 | 400 | Metadata |
| `label` | 14 px | 14 px | 1.4 | 600 | Label input dan kontrol |
| `caption` | 12 px | 12 px | 1.4 | 500 | Timestamp atau bantuan singkat |

Ukuran teks utama tidak boleh lebih kecil dari 16 px pada input mobile agar nyaman dibaca dan tidak memicu zoom otomatis pada browser tertentu.

## 7. Spacing dan Grid

### Skala Spacing

Gunakan basis 4 px:

| Token | Nilai | Contoh |
|---|---:|---|
| `space-1` | 4 px | Jarak ikon dan indikator kecil |
| `space-2` | 8 px | Jarak ikon dengan teks |
| `space-3` | 12 px | Jarak internal badge |
| `space-4` | 16 px | Padding kontrol/kartu kecil |
| `space-5` | 20 px | Jarak antarelemen form |
| `space-6` | 24 px | Padding kartu desktop |
| `space-8` | 32 px | Jarak antarbagian |
| `space-10` | 40 px | Jarak bagian besar |
| `space-12` | 48 px | Ruang vertikal halaman |

### Container

| Ukuran | Aturan |
|---|---|
| Desktop besar | Lebar maksimum 1200 px, padding sisi 32 px |
| Tablet | Padding sisi 24 px |
| Mobile | Padding sisi 16 px |

### Grid Halaman

- Dashboard desktop dapat memakai grid 12 kolom.
- Jadwal utama memakai 8 kolom dan ringkasan memakai 4 kolom jika ditampilkan berdampingan.
- Sesi Absensi mengutamakan satu kolom daftar agar pemindaian nama tetap cepat.
- Hasil Absensi dapat memakai dua kolom pada desktop dan satu kolom pada mobile.

## 8. Bentuk, Border, dan Bayangan

### Radius

| Token | Nilai | Penggunaan |
|---|---:|---|
| `radius-sm` | 8 px | Badge, input kecil |
| `radius-md` | 12 px | Input, tombol |
| `radius-lg` | 16 px | Kartu |
| `radius-xl` | 24 px | Panel Login atau kartu dekoratif |
| `radius-full` | 9999 px | Avatar dan status pill |

### Border

- Border default: 1 px solid `neutral-200`.
- Border input: 1 px solid `neutral-300`.
- Border fokus: 2 px solid `brand-600` dengan focus ring transparan.
- Elemen terpilih dapat menggunakan border `brand-500` dan latar `brand-50`.

### Bayangan

```css
--shadow-sm: 0 1px 2px rgba(15, 71, 60, 0.06);
--shadow-md: 0 8px 24px rgba(15, 71, 60, 0.08);
--shadow-dialog: 0 24px 64px rgba(23, 43, 39, 0.18);
```

Bayangan dibuat lembut. Kartu tidak perlu terlihat mengambang terlalu tinggi.

## 9. Ikonografi

- Gunakan satu keluarga ikon outline yang konsisten.
- Ukuran standar: 16, 20, dan 24 px.
- Ketebalan garis disarankan sekitar 1.75–2 px.
- Ikon selalu didampingi teks pada aksi penting.
- Gunakan ikon yang mudah dikenali: kalender, jam, pengguna, pencarian, cek, kunci, edit, dan keluar.
- Hindari ikon dekoratif bergaya berbeda dalam satu halaman.

Contoh pemetaan:

| Aksi/Informasi | Ikon |
|---|---|
| Jadwal | Kalender |
| Waktu | Jam |
| Kelas/siswa | Pengguna |
| Tersimpan | Cek lingkaran |
| Gagal disimpan | Peringatan |
| Sesi ditutup | Kunci |
| Buka kembali | Kunci terbuka atau edit |

## 10. Tombol

### Varian

| Varian | Tampilan | Penggunaan |
|---|---|---|
| Primary | Latar `brand-600`, teks putih | Buka Absensi, konfirmasi utama |
| Secondary | Latar putih, border `neutral-300` | Kembali, Batal, aksi pendukung |
| Tertiary | Transparan, teks `brand-600` | Aksi ringan dalam kartu |
| Danger | Latar `#B42318`, teks putih | Tindakan destruktif nyata |

**Tutup Absensi bukan tombol Danger.** Menutup sesi merupakan penyelesaian alur normal, sehingga menggunakan Primary. Peringatan penguncian ditempatkan di dialog konfirmasi.

### Ukuran

| Ukuran | Tinggi Minimum | Penggunaan |
|---|---:|---|
| Small | 36 px | Aksi sekunder di desktop |
| Medium | 44 px | Default |
| Large | 48 px | Aksi utama mobile atau Login |

### State

- Default
- Hover
- Focus-visible
- Pressed
- Loading
- Disabled

Tombol loading mempertahankan lebar agar tata letak tidak bergeser. Disabled harus berbeda secara visual tetapi teks tetap terbaca.

## 11. Form dan Input

### Text Input

- Tinggi minimum 44 px pada desktop dan 48 px pada mobile.
- Label berada di atas input dan tidak hanya mengandalkan placeholder.
- Bantuan atau error berada tepat di bawah input.
- Focus ring harus terlihat jelas.

### Password Input

- Memiliki tombol tampilkan/sembunyikan kata sandi.
- Tombol memiliki label aksesibilitas.

### Search Input

- Menggunakan ikon pencarian.
- Placeholder: **Cari nama atau nomor induk...**
- Tombol hapus pencarian muncul ketika input berisi teks.

### Input Alasan Buka Kembali

- Menggunakan textarea.
- Menampilkan label, batas 10–250 karakter, dan penghitung karakter.
- Nilai tidak hilang ketika permintaan gagal.

### Catatan Siswa

- Bersifat opsional.
- Pada desktop dapat diperlihatkan sebagai input ringkas di baris siswa.
- Pada mobile dibuka melalui area detail siswa agar kartu tidak terlalu padat.
- Autosave dilakukan setelah jeda mengetik atau ketika input kehilangan fokus.

## 12. Badge dan Status

### Badge Kehadiran

Badge selalu memuat:

- label status;
- warna teks;
- latar lembut; dan
- ikon opsional.

Contoh label: **Hadir**, **Izin**, **Sakit**, **Alpa**, **Terlambat**.

### Badge Sesi

Gunakan label: **Belum Dibuka**, **Dibuka**, atau **Ditutup**. Hindari mengganti label secara tidak konsisten dengan “Aktif”, “Selesai”, atau istilah lain.

### Status Autosave

| State | Tampilan | Perilaku |
|---|---|---|
| Menyimpan | Spinner kecil + “Menyimpan...” | Tombol Tutup dinonaktifkan |
| Tersimpan | Ikon cek + “Tersimpan” | Hilang perlahan setelah beberapa detik |
| Gagal | Ikon peringatan + “Gagal disimpan” | Tetap terlihat dan sediakan Coba Lagi |

Ringkasan kehadiran hanya berubah berdasarkan data terakhir yang berhasil tersimpan.

## 13. Kartu Jadwal

### Isi Wajib

- rentang jam;
- nama mata pelajaran;
- kelas;
- status sesi; dan
- tindakan sesuai status.

### Hierarki

1. Mata pelajaran dan kelas.
2. Jam pelajaran.
3. Status sesi.
4. Tindakan.

### State Kartu

| State | Tampilan |
|---|---|
| Akan datang | Surface putih, border netral |
| Sedang berlangsung | Border `brand-500`, latar `brand-50`, aksen sisi kiri |
| Selesai | Surface netral lembut, badge Ditutup |
| Fokus keyboard | Focus ring jelas di seluruh kartu/tautan |

Jadwal dapat dibuka di luar waktu sebenarnya pada mode prototype, tetapi penanda “Sedang berlangsung” tetap mengikuti waktu jadwal.

## 14. Daftar Kehadiran Siswa

Daftar siswa merupakan komponen terpenting dan harus memprioritaskan kecepatan pemindaian.

### Desktop

Gunakan struktur baris atau tabel dengan kolom:

| Kolom | Isi |
|---|---|
| Siswa | Nomor urut, nama, dan nomor induk |
| Status | Pilihan Hadir, Izin, Sakit, Alpa, Terlambat |
| Catatan | Input opsional |
| Simpan | Indikator autosave |

Header daftar tetap terlihat ketika daftar panjang apabila implementasinya tidak mengganggu mobile.

### Mobile

Gunakan kartu siswa:

- nama dan nomor induk di bagian atas;
- kontrol status dengan area sentuh minimal 44 × 44 px;
- catatan berada di area yang dapat dibuka; dan
- indikator autosave berada dekat nama atau bagian bawah kartu.

### Pemilihan Status

- Desktop: segmented control atau kelompok tombol ringkas.
- Mobile: segmented control yang dapat bergeser secara horizontal atau dropdown/select yang mudah disentuh.
- Status aktif memiliki warna, border, ikon cek, dan label.
- Jangan menggunakan warna sebagai satu-satunya tanda status aktif.

## 15. Ringkasan Kehadiran

Ringkasan menampilkan:

- total siswa;
- jumlah Hadir;
- jumlah Izin;
- jumlah Sakit;
- jumlah Alpa;
- jumlah Terlambat; dan
- persentase kehadiran.

### Desktop

Gunakan kartu statistik dalam satu baris atau panel ringkas yang tetap terlihat di atas daftar.

### Mobile

Gunakan dua pendekatan yang diperbolehkan:

1. grid dua atau tiga kolom; atau
2. ringkasan horizontal yang dapat digeser.

Hindari diagram kompleks. Angka dan label lebih cepat dipahami dalam konteks absensi kelas.

## 16. Dialog

### Dialog Tutup Absensi

Wajib menampilkan:

- judul **Tutup Absensi?**;
- ringkasan semua status;
- informasi bahwa sesi akan dikunci;
- tombol **Batal**; dan
- tombol **Ya, Tutup Absensi**.

### Dialog Buka Kembali

Wajib menampilkan:

- judul **Buka Kembali Absensi?**;
- penjelasan bahwa data dapat diedit kembali;
- textarea alasan wajib;
- tombol **Batal**; dan
- tombol **Buka Kembali**.

### Perilaku Dialog

- Fokus keyboard masuk ke dialog ketika dibuka.
- Fokus kembali ke pemicu ketika dialog ditutup.
- Dialog dapat ditutup melalui Batal dan tombol Escape jika tidak sedang mengirim data.
- Klik di luar dialog tidak menutup dialog untuk tindakan penting.
- Tombol aksi menampilkan loading ketika permintaan diproses.

## 17. Notifikasi dan Pesan

### Toast

Gunakan toast untuk hasil tindakan singkat:

- Absensi berhasil dibuka.
- Perubahan berhasil disimpan, jika indikator inline tidak cukup.
- Absensi berhasil ditutup.
- Absensi berhasil dibuka kembali.

Toast bukan satu-satunya tempat untuk menampilkan kesalahan penting. Kesalahan autosave harus tetap terlihat pada baris siswa terkait.

### Gaya Bahasa

- Ringkas dan langsung.
- Menjelaskan apa yang terjadi.
- Jika gagal, berikan tindakan yang dapat dilakukan.
- Hindari istilah teknis seperti request, endpoint, atau database.

Contoh:

| Situasi | Pesan |
|---|---|
| Login gagal | “Email atau kata sandi tidak sesuai.” |
| Jadwal kosong | “Tidak ada jadwal mengajar hari ini.” |
| Autosave gagal | “Perubahan belum tersimpan. Coba lagi.” |
| Tutup berhasil | “Absensi berhasil ditutup.” |
| Akses ditolak | “Kamu tidak memiliki akses ke data ini.” |

## 18. Loading, Empty, dan Error State

### Loading

- Gunakan skeleton pada kartu jadwal dan baris siswa.
- Spinner digunakan pada tombol atau area kecil.
- Hindari spinner layar penuh jika struktur halaman dapat tetap ditampilkan.

### Empty State

- Gunakan ikon atau ilustrasi geometris sederhana.
- Berikan judul, penjelasan, dan tindakan bila tersedia.
- Contoh: **Tidak ada jadwal mengajar hari ini.**

### Error State

- Jelaskan data atau tindakan yang gagal.
- Sediakan tombol **Coba Lagi** atau **Muat Ulang**.
- Jangan menghapus data input yang belum tersimpan dari layar.

## 19. Navigasi

### Desktop

Gunakan header horizontal yang berisi:

- logo Hadiruna;
- menu Beranda;
- menu Riwayat; dan
- menu akun guru.

Navigasi tidak membutuhkan sidebar karena hanya memiliki dua menu utama.

### Mobile

Gunakan header ringkas dengan logo, judul halaman, dan menu akun. Beranda dan Riwayat dapat ditempatkan pada navigasi bawah jika dibutuhkan setelah pengujian, tetapi bukan kewajiban prototype.

### Breadcrumb dan Kembali

- Detail Jadwal: **Kembali ke Beranda**.
- Sesi Absensi: hindari keluar tanpa penjelasan ketika masih ada perubahan gagal disimpan.
- Hasil Absensi: **Kembali ke Beranda**.
- Halaman Riwayat dapat dibuka langsung melalui menu utama.

## 20. Layout per Halaman

### Login

- Desktop: panel branding/dekoratif dan panel form.
- Mobile: satu kolom, branding ringkas di atas form.
- Pola geometri dapat terlihat lebih kuat dibanding halaman lain.

### Dashboard

- Header halaman berisi sapaan dan tanggal.
- Jadwal yang sedang berlangsung menjadi fokus utama.
- Ringkasan ditempatkan sebelum atau di samping daftar jadwal.
- Pola geometri hanya sebagai aksen header dengan kontras rendah.

### Detail Jadwal

- Informasi mata pelajaran, kelas, tanggal, dan jam berada dalam satu kartu utama.
- Pratinjau siswa tidak perlu memuat kontrol absensi.
- Tombol tindakan mengikuti status sesi.

### Sesi Absensi

- Informasi kelas dan ringkasan tetap mudah terlihat.
- Pencarian diletakkan tepat sebelum daftar siswa.
- Daftar siswa memperoleh ruang terbesar.
- Tombol Tutup Absensi dapat dibuat sticky pada mobile jika tidak menutupi konten.

### Hasil Absensi

- Statistik utama berada di bagian atas.
- Daftar siswa tidak hadir atau terlambat berada setelah ringkasan.
- Informasi pembukaan kembali tampil sebagai catatan riwayat.
- Buka Kembali menjadi secondary action, bukan aksi paling menonjol.

### Riwayat

- Pencarian dan filter sederhana berada di atas daftar.
- Desktop dapat memakai tabel.
- Mobile menggunakan kartu sesi.

## 21. Responsivitas

### Breakpoint Acuan

| Nama | Lebar |
|---|---:|
| Mobile | `< 640 px` |
| Tablet | `640–1023 px` |
| Desktop | `≥ 1024 px` |

Breakpoint dapat disesuaikan berdasarkan konten, bukan hanya jenis perangkat.

### Aturan Mobile

- Tidak ada scroll horizontal pada halaman.
- Segmented control status boleh bergeser di dalam areanya sendiri jika diperlukan.
- Area sentuh minimal 44 × 44 px.
- Dialog menjadi bottom sheet atau dialog layar hampir penuh bila ruang terbatas.
- Aksi utama dapat selebar container.
- Informasi sekunder boleh dipindahkan ke bagian yang dapat dibuka.

## 22. Motion dan Transisi

- Durasi mikrointeraksi: 150–200 ms.
- Durasi dialog/panel: 200–250 ms.
- Gunakan easing lembut, misalnya `ease-out` saat masuk.
- Perubahan angka ringkasan boleh dianimasikan secara halus tanpa efek berlebihan.
- Toast dapat masuk dari sisi atas atau kanan pada desktop dan dari atas pada mobile.
- Hormati preferensi `prefers-reduced-motion` dengan mengurangi atau menghapus animasi non-esensial.

Ornamen tidak menggunakan animasi kontinu karena dapat mengganggu proses absensi.

## 23. Aksesibilitas

- Target kontras teks normal minimal 4.5:1.
- Target kontras teks besar minimal 3:1.
- Semua fungsi dapat dijalankan dengan keyboard.
- Focus ring tidak dihilangkan.
- Ikon dekoratif disembunyikan dari pembaca layar.
- Ikon tindakan memiliki label yang dapat diakses.
- Error input dihubungkan dengan input terkait.
- Status autosave diumumkan secara wajar tanpa membanjiri pembaca layar.
- Urutan fokus mengikuti urutan visual.
- Tabel memiliki header yang benar.
- Kontrol status menggunakan label yang eksplisit.

## 24. Design Tokens CSS

```css
:root {
  --color-brand-700: #0b473c;
  --color-brand-600: #0f5c4d;
  --color-brand-500: #176b5b;
  --color-brand-100: #dcefe9;
  --color-brand-50: #eef7f4;

  --color-navy-700: #19324a;
  --color-gold-500: #c59b4b;
  --color-ivory-50: #f8f5ec;

  --color-text: #172b27;
  --color-text-secondary: #354943;
  --color-text-muted: #52655f;
  --color-border-strong: #c9d5d1;
  --color-border: #dce5e1;
  --color-surface-muted: #eef2f0;
  --color-surface: #ffffff;

  --color-present-text: #155e46;
  --color-present-bg: #e8f5ef;
  --color-permit-text: #1d4ed8;
  --color-permit-bg: #eff6ff;
  --color-sick-text: #92400e;
  --color-sick-bg: #fff7e6;
  --color-absent-text: #b42318;
  --color-absent-bg: #fdecea;
  --color-late-text: #6d28d9;
  --color-late-bg: #f3e8ff;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --shadow-sm: 0 1px 2px rgba(15, 71, 60, 0.06);
  --shadow-md: 0 8px 24px rgba(15, 71, 60, 0.08);
  --shadow-dialog: 0 24px 64px rgba(23, 43, 39, 0.18);

  --font-sans: "Plus Jakarta Sans", Inter, system-ui, -apple-system, sans-serif;
  --font-arabic: "Noto Sans Arabic", sans-serif;
}
```

Token bersifat framework-agnostic dan dapat dipetakan ke CSS Modules, Tailwind CSS, atau sistem styling lain yang dipilih saat implementasi.

## 25. Checklist Konsistensi UI

- [ ] Semua halaman memakai warna, tipografi, spacing, dan radius yang sama.
- [ ] Setiap halaman hanya memiliki satu aksi primer pada satu konteks.
- [ ] Label status kehadiran selalu konsisten.
- [ ] Label status sesi selalu memakai Belum Dibuka, Dibuka, atau Ditutup.
- [ ] Warna tidak menjadi satu-satunya penanda informasi.
- [ ] Daftar siswa nyaman dipindai di desktop dan mobile.
- [ ] Status autosave terlihat pada perubahan data.
- [ ] Tombol Tutup dinonaktifkan ketika data belum berhasil tersimpan.
- [ ] Dialog penting tidak tertutup karena klik tidak sengaja di luar area.
- [ ] Empty, loading, error, dan unauthorized state tersedia.
- [ ] Ornamen Arab-Islam tidak berada di belakang informasi penting.
- [ ] Tidak ada ayat Al-Qur'an yang digunakan sebagai dekorasi UI.
- [ ] Seluruh area sentuh utama minimal 44 × 44 px.
- [ ] Focus ring dapat terlihat pada navigasi keyboard.
- [ ] Tampilan diuji minimal pada lebar 360 px, 768 px, dan 1280 px.

## 26. Handoff ke Desain dan Implementasi

Style guide ini menjadi dasar untuk:

1. membuat wireframe low-fidelity berdasarkan sitemap;
2. membuat mockup high-fidelity menggunakan token dan komponen yang ditetapkan;
3. membangun komponen React yang dapat digunakan kembali;
4. menyusun state komponen sesuai User Flow; dan
5. melakukan pemeriksaan visual serta aksesibilitas sebelum demo.

Komponen yang sebaiknya dibangun lebih dahulu:

1. Button dan IconButton.
2. Input, SearchInput, dan Textarea.
3. StatusBadge dan AttendanceStatusControl.
4. ScheduleCard.
5. AttendanceSummary.
6. StudentAttendanceRow/StudentAttendanceCard.
7. SaveStatusIndicator.
8. ConfirmDialog dan ReopenDialog.
9. AppHeader dan AccountMenu.
10. EmptyState, ErrorState, dan Skeleton.

---

Hadiruna harus terasa Islami melalui ketenangan dan keteraturan visual, bukan melalui banyaknya ornamen. Identitas memperkuat pengalaman, sementara proses absensi tetap menjadi pusat dari seluruh desain.
