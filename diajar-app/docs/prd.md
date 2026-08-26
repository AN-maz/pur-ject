# Learning Management System (Gamified Learning Platform)

---

## 1. Executive Summary

Aplikasi ini adalah platform pembelajaran dua arah berbasis gamifikasi yang memungkinkan pengguna tidak hanya mengonsumsi materi, tetapi juga membuat materi pembelajaran interaktif menggunakan **Rich Text Editor berbasis Markdown**. Platform ini dirancang untuk meningkatkan keterlibatan pengguna melalui reward system (EXP, Level, Peringkat, dan Point) serta menjaga kualitas konten melalui proses kurasi/approval oleh Admin.

---

## 2. Platform Roles & User Types

* **Guest:** Pengguna tanpa akun; hanya bisa meramban katalog materi publik (terbatas).
* **Learner / Creator (User):** Pengguna terautentikasi yang dapat membaca materi, membuat materi baru menggunakan Markdown editor, memberi ulasan/komentar, serta mengumpulkan EXP dan Poin.
* **Admin:** Pengguna dengan hak akses khusus untuk memoderasi konten (*Approve/Reject*), mengelola kategori, dan mengawasi aktivitas sistem secara menyeluruh.

---

## 3. Key Features & Functional Requirements

### 3.1 Authentication & User Profile

* **Registrasi & Login:** Dukungan autentikasi standar (Email/Password & Social Sign-On).
* **User Profile:** Menampilkan informasi pribadi, total EXP, level saat ini, riwayat materi yang dibuat, serta statistik aktivitas membaca/menulis.

### 3.2 Content & Course Management (Dua Arah)

* **Explore & Reading (Learner):**
* Pencarian dan filter materi berdasarkan kategori (misal: *Teknologi*, *Bahasa*, *Pengembangan Diri*).
* Halaman detail materi untuk membaca dokumen yang ter-render dari Markdown (mendukung *syntax highlighting* untuk kode program/SQL).


* **Interactive Markdown Creation (Creator):**
* **Block-based Editor with Slash Commands (`/`):** Editor interaktif real-time di frontend. Saat pengguna mengetik `/`, muncul pilihan format seperti Heading (`/h1`, `/h2`), Code Block (`/code`, `/sql`), List, Quote, dsb.
* **Markdown Output:** Hasil input disimpan dalam bentuk teks/string Markdown murni ke database (efisien & ringan).
* **Admin Approval Flow:**
* Materi baru berstatus `Pending Approval`.
* Admin menerima notifikasi submission, kemudian dapat memilih `Approve` atau `Reject` (disertai alasan).
* Hanya materi status `Approved` yang terbit secara publik.





### 3.3 Interactivity & Feedback

* **Komentar:** Kolom komentar interaktif di setiap halaman materi.
* **Rating System (1–5 Star):** User dapat memberikan ulasan bintang 1 hingga 5, yang memberikan imbalan Poin tambahan.

### 3.4 Gamification System

* **EXP & Leveling:**
* Mendapatkan EXP setelah menyelesaikan bacaan materi.
* Mendapatkan EXP ketika materi buatan pengguna disetujui oleh Admin.
* Akumulasi EXP otomatis menaikkan level pengguna (*Level Up*).


* **Leaderboard (Sistem Peringkat):** Papan peringkat global/mingguan berdasarkan total EXP yang dikumpulkan.
* **Point System:** Poin terpisah dari EXP, didapatkan dari aksi interaksi tertentu (seperti memberi rating 1–5).

### 3.5 Admin Dashboard

* **Content Moderation:** Antarmuka khusus untuk mereview materi Markdown yang masuk (Approve/Reject).
* **Category Management:** Fitur CRUD (Create, Read, Update, Delete) untuk daftar kategori materi.
* **System Monitoring:** Dashboard ringkas mengenai statistik user aktif, jumlah materi terbit, dan laporan konten.

---

## 4. Gamification Mechanics Matrix

| Akses / Tindakan | EXP Reward | Point Reward | Trigger Condition |
| --- | --- | --- | --- |
| **Membaca Materi** | +50 EXP | - | Membaca modul hingga selesai (halaman terakhir/progress 100%) |
| **Membuat & Publish Materi** | +200 EXP | - | Setelah materi di-approve oleh Admin |
| **Memberikan Rating (1-5 Star)** | - | +10 Points | Setiap memberikan rating pertama kali pada suatu materi |
| **Menerima Rating Tinggi (4-5 Star)** | +20 EXP | +15 Points | Creator mendapatkan bonus ketika materi mereka disukai |

---

## 5. Non-Functional Requirements

* **Security:** Role-based Access Control (RBAC) ketat antara User dan Admin. Sanitisasi input Markdown pada editor untuk mencegah celah keamanan XSS (*Cross-Site Scripting*).
* **Data Storage Efficiency:** Kolom penyimpanan konten materi menggunakan tipe data `TEXT` (PostgreSQL) atau `LONGTEXT` (MySQL) untuk menampung teks Markdown berukuran panjang dengan jejak memori yang tetap ringan.
* **Performance:** Pengunduhan teks Markdown & sistem leaderboard harus responsif (latensi < 2 detik). Rendering Markdown di sisi client harus mulus tanpa lag saat mengetik.
* **Scalability:** Arsitektur database siap menangani penambahan relasi materi, interaksi komentar, dan skor leaderboard yang dinamis.