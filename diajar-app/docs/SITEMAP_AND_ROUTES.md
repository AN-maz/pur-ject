# Application Routes & Sitemap Architecture

**Project:** Learning Management System — Gamified Learning Platform
**Document Type:** Information Architecture (IA) & Page Mapping

---

## 1. Halaman Learner & Publik

Bagian ini mencakup halaman yang digunakan pengguna untuk mencari, membaca, dan berinteraksi dengan materi pembelajaran.

| Route Path                | Nama Halaman               | Fungsi & Komponen Utama                                                                                                                                                                                            |
| ------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/materi` | **Katalog Materi**         | - Menampilkan daftar materi yang telah berstatus `Approved`.<br>- Filter berdasarkan kategori.<br>- Pencarian materi berdasarkan teks.<br>- Pengurutan berdasarkan **Terpopuler** atau **Terbaru**.                |
| `/materi/[slug]`          | **Detail & Reader Materi** | - Menampilkan isi materi dari Markdown.<br>- Mendukung *syntax highlighting* untuk kode program/SQL.<br>- Tombol **Selesai Baca** untuk klaim EXP.<br>- Sistem rating 1–5 bintang.<br>- Kolom komentar interaktif. |
| `/leaderboard`            | **Papan Peringkat**        | - Menampilkan peringkat pengguna berdasarkan total EXP.<br>- Filter periode peringkat: **Global** atau **Mingguan**.                                                                                               |

---

## 2. Halaman Dashboard Creator

Dashboard Creator digunakan oleh pengguna untuk melihat progres akun sekaligus membuat dan mengelola materi pembelajaran.

| Route Path                       | Nama Halaman                | Fungsi & Komponen Utama                                                                                                                                                                                                                  |
| -------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/dashboard`                     | **User Dashboard Overview** | - Ringkasan statistik pengguna seperti **Level**, **Total EXP**, dan **Poin**.<br>- Tracker materi yang sedang atau pernah dibaca.<br>- Ringkasan status materi yang pernah dibuat.                                                      |
| `/dashboard/materi/create`       | **Editor Buat Materi**      | - **Rich Text Editor berbasis blok** dengan dukungan *Slash Commands* (`/`).<br>- Form judul materi.<br>- Pemilihan kategori.<br>- Upload *cover image*.<br>- Tombol **Ajukan Materi** untuk mengubah status menjadi `Pending Approval`. |
| `/dashboard/materi/my-materials` | **Kelola Materi Saya**      | - Menampilkan daftar materi yang dibuat pengguna.<br>- Menampilkan status `Pending`, `Approved`, atau `Rejected`.<br>- Menampilkan catatan/alasan penolakan apabila materi berstatus `Rejected`.                                         |
| `/dashboard/materi/[id]/edit`    | **Editor Edit Materi**      | - Mengubah atau memperbaiki isi materi.<br>- Melakukan revisi materi berdasarkan hasil moderasi.                                                                                                                                         |
| `/profile`                       | **Profil Pengguna**         | - Menampilkan informasi akun pengguna.<br>- Riwayat level, lencana, dan aktivitas.<br>- Form pengubahan data profil.<br>- Form pengubahan password.                                                                                      |

---

## 3. Halaman Dashboard Moderator / Admin

Dashboard Admin digunakan untuk memantau sistem, melakukan moderasi materi, dan mengelola data pendukung platform.

| Route Path               | Nama Halaman                 | Fungsi & Komponen Utama                                                                                                                                                                                                             |
| ------------------------ | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/admin`                 | **Admin Dashboard Overview** | - Menampilkan statistik sistem seperti **Total User**, **Materi Pending**, **Materi Terbit**, dan **Total Interaksi**.                                                                                                              |
| `/admin/moderation`      | **Daftar Moderasi**          | - Menampilkan antrean materi yang memiliki status `Pending Approval` dan membutuhkan proses review.                                                                                                                                 |
| `/admin/moderation/[id]` | **Review Detail Materi**     | - Preview penuh isi materi.<br>- Tombol **Approve** untuk menerbitkan materi dan memberikan EXP kepada creator.<br>- Tombol **Reject** untuk menolak materi.<br>- Form/pop-up alasan penolakan ketika moderator memilih **Reject**. |
| `/admin/categories`      | **Kelola Kategori**          | - Antarmuka CRUD kategori materi.<br>- Contoh kategori: **Teknologi**, **Bahasa**, dan **Pengembangan Diri**.                                                                                                                       |

---

## 4. Pemetaan Aksi Halaman ke Endpoint API

Bagian ini memetakan interaksi utama pada halaman frontend dengan endpoint REST API yang akan digunakan oleh aplikasi.

| Aksi Frontend                  | Method  | Endpoint API                                | Keterangan                                                             |
| ------------------------------ | ------- | ------------------------------------------- | ---------------------------------------------------------------------- |
| Membuka katalog materi         | `GET`   | `/api/v1/materials?category=&search=&sort=` | Mengambil daftar materi berdasarkan filter, pencarian, dan pengurutan. |
| Membuka detail materi          | `GET`   | `/api/v1/materials/:slug`                   | Mengambil detail materi berdasarkan `slug`.                            |
| Menandai materi selesai dibaca | `POST`  | `/api/v1/materials/:id/complete`            | Menandai materi sebagai selesai dan memberikan bonus EXP.              |
| Memberikan rating              | `POST`  | `/api/v1/materials/:id/ratings`             | Menyimpan rating pengguna dan memberikan bonus poin jika berlaku.      |
| Membuat dan mengajukan materi  | `POST`  | `/api/v1/materials`                         | Membuat materi baru untuk diajukan ke proses moderasi.                 |
| Melakukan review materi        | `PATCH` | `/api/v1/admin/materials/:id/status`        | Admin mengubah status materi menjadi `Approved` atau `Rejected`.       |

---

## 5. Alur Navigasi Utama

Secara umum, alur navigasi aplikasi dapat digambarkan sebagai berikut:

**Learner Flow**

`Explore Materi` → `Detail Materi` → `Baca Materi` → `Selesai Baca` → `Dapat EXP` → `Leaderboard`

**Creator Flow**

`Dashboard` → `Buat Materi` → `Submit Materi` → `Pending Approval` → `Approved / Rejected`

Jika materi ditolak:

`Rejected` → `Lihat Alasan Penolakan` → `Edit Materi` → `Submit Ulang`

**Admin / Moderator Flow**

`Admin Dashboard` → `Daftar Moderasi` → `Review Materi` → `Approve / Reject`

---

## 6. Kesimpulan

Dokumen **Application Routes & Sitemap Architecture** ini menjadi acuan awal untuk mendefinisikan struktur halaman, navigasi pengguna, serta hubungan antara frontend dan backend pada aplikasi Learning Management System.

Dokumen ini juga menjadi dasar untuk tahap perancangan berikutnya, yaitu **API Contract**, yang akan mendefinisikan secara lebih detail:

* Endpoint API.
* HTTP Method.
* Authentication & Authorization.
* Path Parameter.
* Query Parameter.
* Request Body.
* Response Body.
* HTTP Status Code.
* Error Response.
* Role dan permission setiap endpoint.

Dengan demikian, alur perancangannya dapat disusun sebagai:

**Information Architecture → Route Mapping → API Contract → API Documentation → Implementation**
