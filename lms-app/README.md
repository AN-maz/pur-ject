📋 Golden Rules (Sistem Halaman & Daftar Isi)
Karena web kita membaca Markdown untuk membuat halaman secara dinamis, aturan nomor satu ini wajib diikuti:

1. Pembagian Halaman Menggunakan Heading 1 (# )
Web memotong file .md menjadi beberapa halaman (Pagination) berdasarkan Heading 1. Setiap kali ada tanda #  di awal baris, web akan menganggap itu sebagai Halaman Baru sekaligus Judul di Daftar Isi (Sidebar).

❌ Salah (Jangan jadikan # sebagai judul kecil):

Markdown
# Pengenalan
Ini teks pengenalan.

# Sub Pengenalan (Ini malah akan jadi halaman baru dan terpotong!)
Ini teks sub pengenalan.
✅ Benar (Satu # untuk satu halaman):

Markdown
# 1. Pengenalan HTML
Ini adalah halaman pertama. (Halaman 1)

# 2. Struktur Dasar HTML
Ini adalah halaman kedua. Semua teks di bawahnya masuk ke halaman 2. (Halaman 2)
2. Gunakan ##  atau ###  untuk Sub-Bab
Untuk membuat judul di dalam halaman yang sama, gunakan Heading 2 atau Heading 3. Ini akan dirender dengan warna Tosca dan Teal khas UKM-mu.

Markdown
## Apa itu Tag HTML?
Tag HTML adalah blablabla...

### Aturan Penulisan Tag
1. Harus dibuka dan ditutup.
🎨 Aturan Format Konten (Code, Gambar, & Tabel)
3. Penulisan Blok Kode (Syntax Highlighting)
Agar kode dirender dengan warna cantik (mirip VS Code), kamu wajib menambahkan nama bahasa pemrograman tepat di sebelah backtick (```).

✅ Benar (Akan berwarna):

❌ Salah (Hanya jadi teks abu-abu biasa):

4. Memasukkan Gambar (Image)
Karena aplikasi kita tidak menggunakan database, letakkan semua gambar di dalam folder public/img/ di proyek React-mu.

Cara memanggilnya di Markdown harus menggunakan awalan garis miring / (merujuk ke folder public).

Markdown
![Ilustrasi Struktur DOM](/img/struktur-dom.png)
(Catatan: Web sudah kita atur agar gambar otomatis membulat (rounded) dan responsif tidak melebihi layar).

5. Membuat Tabel
Tabel sudah kita atur agar rapi dan bisa di-scroll menyamping di HP. Gunakan format standar Markdown:

Markdown
| Tipe Data | Keterangan | Contoh |
| --- | --- | --- |
| String | Teks biasa | "Halo" |
| Number | Angka | 100 |
| Boolean | Benar/Salah | true |
6. Catatan Penting (Blockquote)
Untuk memberikan catatan atau warning kepada pembaca, gunakan tanda >. Web akan merendernya menjadi kotak elegan dengan garis kiri berwarna Tosca.

Markdown
> **Perhatian:** Jangan lupa titik koma (;) di akhir baris JavaScript!

```
lms-app/
│
├── public/                  <-- Tempat menyimpan data murni
│   ├── materi/
│   │   ├── pertemuan-1.md   <-- File materi Markdown
│   │   ├── pertemuan-2.md
│   │   └── pertemuan-3.md
│   └── silabus.json         <-- "Database" dummy berisi daftar materi
│
├── src/
│   ├── components/          <-- Komponen yang bisa dipakai berulang
│   │   ├── Navbar.jsx
│   │   ├── MarkdownViewer.jsx <-- Jantung aplikasinya (Render MD to HTML)
│   │   └── CourseCard.jsx
│   │
│   ├── pages/               <-- Komponen Halaman (Views)
│   │   ├── LandingPage.jsx
│   │   ├── SilabusPage.jsx
│   │   └── MateriDetail.jsx
│   │
│   ├── store/               <-- State Management
│   │   └── useProgressStore.js <-- Menyimpan state (materi terbuka/terkunci)
│   │
│   ├── App.jsx              <-- Konfigurasi React Router diletakkan di sini
│   ├── main.jsx
│   └── index.css            <-- Konfigurasi warna kamu di sini
│
├── tailwind.config.js       <-- (Biarkan default, pastikan path 'content' sudah benar)
└── package.json
```