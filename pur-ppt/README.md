# Panduan Penulisan Konten Markdown untuk Slide Presentasi Web

## Divisi Software - UKM Oxigen (periode Purwa)
Aplikasi ini menggunakan Standard Markdown Parser. Anda tidak perlu menulis kode HTML atau CSS kustom di dalam dokumen. Cukup gunakan simbol Markdown biasa, dan sistem akan otomatis mengubahnya menjadi layout PPT modern yang responsif dan sesuai dengan tema warna divisi.

# 1. Aturan Dasar & Navigasi
- **Pemisah Halaman (Slide Delimiter):** Gunakan tiga tanda hubung `---` di baris kosong yang terpisah untuk memotong slide. Teks sebelum dan sesudah simbol ini akan otomatis menjadi halaman yang berbeda.
- **Navigasi:** Gunakan tombol Panah Kanan / Spasi untuk maju ke slide berikutnya, dan Panah Kiri untuk kembali. Tekan tombol F untuk masuk atau keluar dari mode Layanan Penuh (Fullscreen).

# 2. Komponen & Contoh Layout UI
Berikut adalah daftar elemen Markdown standar dan bagaimana mereka akan berubah bentuk saat ditampilkan di layar presentasi:

## A. Halaman Judul Utama & Sub-Judul
- **Cara Tulis:** Gunakan `#` untuk Judul Utama (Slide Cover) dan `##` untuk judul topik di dalam slide.
- **Hasil Visual:** Judul utama otomatis berwarna hijau terang `(#39FF5A)` dengan posisi di tengah, sedangkan sub-judul otomatis berwarna toska dengan garis bawah pembatas yang elegan.

```Markdown
# Pemrograman Modern dengan JavaScript
Slide Pengenalan Divisi Software

---

## 1. Apa itu Frontend & Cara Kerja Browser
```

## B. Daftar Isi (Layout White Card)
- **Cara Tulis:** Gunakan daftar penomoran angka standar `(1., 2., 3.).`

- **Hasil Visual:** Otomatis diubah menjadi barisan kotak putih bergaya minimalis modern dengan nomor indeks berlatar belakang warna teal gelap, persis seperti struktur Table of Contents pada PPT profesional.

```Markdown
## Daftar Isi

1. **Frontend & Cara Kerja Browser** — *Client vs Server, alur browser, HTML/CSS/JS*
2. **Vite & Build Tool** — *Kenapa perlu build tool, cara kerja Vite*
3. **Tailwind CSS** — *Utility-first, perbandingan, skala besar*
```

## C. Komparasi Karakteristik (Layout Side-by-Side)
- **Cara Tulis:** Buat tabel Markdown standar dengan `2 Kolom`. Gunakan tag HTML <br> jika ingin membuat baris baru di dalam sel tabel.

- **Hasil Visual:** Menjadi tabel perbandingan dengan pembatas baris yang bersih, kontras gelap yang nyaman di mata, dan teks tebal otomatis berwarna toska.

```Markdown
## Frontend vs Backend

| FRONTEND | BACKEND |
| :--- | :--- |
| - Berjalan di browser (komputer user) <br> - Bahasa: HTML, CSS, JavaScript | - Berjalan di server <br> - Bahasa: Node.js, Python, PHP, dll |
| - Mengurus tampilan & interaksi user | - Mengurus logic bisnis & database |
```

## D. Alur Proses / Langkah Kerja (Horizontal Timeline)
- **Cara Tulis:** Buat tabel Markdown melebar dengan banyak kolom (misalnya 4 atau 5 kolom) sesuai jumlah langkah prosesnya.

- **Hasil Visual:** Karena disusun horizontal, kolom-kolom ini akan berjejer dari kiri ke kanan secara alami membentuk rangkaian diagram alur (process flow) yang sangat rapi.

```Markdown
## Alur Kerja Browser

| 1. User buka URL | 2. Kirim Request | 3. Server kirim File | 4. Render Kode |
| :--- | :--- | :--- | :--- |
| User mengetik alamat website di browser. | Browser mengirim HTTP Request ke server. | Server mengirim balik HTML, CSS, & JS. | Browser membaca kode agar interaktif. |
```

## E. Poin Kunci & Catatan Analogi (Callout Box)
- **Cara Tulis:** Gunakan tanda lebih besar `>` di awal baris (format Blockquote).

- **Hasil Visual:** Teks akan dibungkus ke dalam sebuah kotak Callout dengan gradasi warna teal transparan yang estetik, sangat cocok untuk menarik perhatian audiens pada poin-poin krusial atau analogi materi.

```Markdown
> 💡 **Analogi:** Frontend = ruang makan & pelayan | Backend = dapur (tidak terlihat pelanggan)
```

## F. Blok Kode Kodingan (Syntax Highlighting)

- **Cara Tulis:** Bungkus kode dengan tiga tanda backtick `(```)` dan sebutkan nama bahasanya (seperti `javascript`, `html`, `css`, atau `json`).

- **Hasil Visual:** Kode akan langsung berwarna warni secara otomatis menggunakan tema gelap One Dark layaknya teks editor VS Code.


```markdown
## Contoh Kode Javascript

```javascript
const sapa = (nama) => {
  console.log(`Halo ${nama}, selamat belajar frontend!`);
};
sapa("Anggota Baru");
``

