# Pertemuan 6
# Backend Meets Frontend: PRO

---

## Daftar Isi

1. **Frontend & Cara Kerja Browser** — *Client vs Server, alur browser, HTML/CSS/JS*
2. **Vite & Build Tool** — *Kenapa perlu build tool, cara kerja Vite*
3. **Tailwind CSS** — *Utility-first, perbandingan, skala besar*
4. **Fetch API & Async/Await** — *HTTP request dari JavaScript, error handling*
5. **Project: UI Inventory** — *Vite + Tailwind + REST API*

---

## 1. Apa itu Frontend & Cara Kerja Browser

---

## Frontend vs Backend

| FRONTEND | BACKEND |
| :--- | :--- |
| Berjalan di browser (komputer user) <br> Bahasa utama: HTML, CSS, JavaScript | Berjalan di server <br> Bahasa utama: Node.js, Python, PHP, dll |
| Mengurus tampilan & interaksi user | Mengurus logic bisnis & database |
| Bisa dilihat langsung oleh user | Tidak terlihat oleh user |

> 💡 **Analogi:** 
> 1. Frontend = ruang makan & pelayan (berhadapan langsung dengan pelanggan) 
> 2. Backend = dapur (tempat makanan dibuat, tidak terlihat pelanggan)

---

## Alur Kerja Browser

| 1. User buka URL | 2. Kirim HTTP Request | 3. Server kirim File | 4. Browser Render | 5. JS Fetch Data |
| :--- | :--- | :--- | :--- | :--- |
| User mengetik alamat website di address bar. | Browser mengirim HTTP Request ke server tujuan. | Server mengirim balik file HTML, CSS, & JS. | Browser membaca HTML, memuat CSS, menjalankan JS. | JS kirim request lagi ke backend, tampilkan data JSON. |

> 💡 **Poin penting:** HTML, CSS, dan JS dijalankan di komputer user (browser), **bukan** di server. Inilah yang membedakan frontend dari backend.

---

## Tiga Bahasa Frontend

| HTML | CSS | JavaScript |
| :--- | :--- | :--- |
| Struktur / kerangka halaman | Tampilan / gaya halaman | Interaktivitas & komunikasi backend |
| `<h1>`, `<table>`, `<button>` | `color`, `font-size`, `padding` | `fetch()`, `addEventListener()` |

```html
<h1>Daftar Produk</h1>
<table id="tabel-produk"></table>
<button id="btn-tambah">Tambah Produk</button>
```

> 💡 **Analogi:** 
> 1. HTML = tulangnya 
> 2. CSS = kulitnya 
> 3. JavaScript = otaknya

---

## Hubungan Frontend dengan Backend

| Backend (sudah dibuat) | Frontend (yang akan kita buat) |
| :--- | :--- |
| Berjalan di `http://localhost:3000` | Berjalan di `http://localhost:5173` |
| Tidak punya tampilan | Menampilkan data secara visual |
| Hanya terima request & kirim JSON | Mengambil, menampilkan, & mengirim data |

**Tugas frontend di materi ini:**
- Mengambil data produk dari backend & menampilkannya di tabel
- Mengirim data produk baru melalui form
- Mengupdate & menghapus produk lewat tombol

---

## 2. Vite & Build Tool

---

## Kenapa Perlu Build Tool?

| Masalah tanpa Build Tool | Solusi dengan Build Tool |
| :--- | :--- |
| ❌ Tidak bisa pakai `import/export` bebas | ✅ Import/export JS tanpa batasan |
| ❌ Tidak ada auto-reload saat kode berubah | ✅ Browser otomatis refresh saat simpan |
| ❌ File tidak dioptimasi untuk performa | ✅ File JS & CSS dikompres untuk production |

> 💡 **Build tool** adalah program yang **memproses kode sebelum dijalankan di browser** — menyediakan dev server, mengelola modul, dan mengoptimasi file.

---

## Apa itu Vite?

| Fitur | Keterangan |
| :--- | :--- |
| **Sangat cepat saat development** | Tidak perlu compile ulang semua file setiap ada perubahan |
| **Setup minimal** | Langsung bisa dipakai tanpa konfigurasi rumit |
| **Hot Module Replacement (HMR)** | Perubahan kode langsung terlihat di browser tanpa full reload |

> 💡 **Vite** (dibaca: *vit*, bahasa Prancis artinya "cepat") adalah build tool modern yang dibuat oleh pembuat Vue.js.

---

## HTML Biasa vs Vite

| | HTML Biasa (buka langsung) | Dengan Vite |
| :--- | :--- | :--- |
| Auto-reload | ❌ Tidak ada | ✅ Otomatis |
| Import/export JS | ❌ Terbatas | ✅ Bebas |
| Dev server | ❌ Tidak ada | ✅ Ada |
| Cocok untuk belajar | Hanya yang sangat sederhana | ✅ Recommended |

---

## Cara Kerja Vite

| 1. Tulis Kode | 2. Vite Pantau | 3. Sajikan via Server | 4. Buka di Browser | 5. Auto Refresh |
| :--- | :--- | :--- | :--- | :--- |
| Tulis HTML, CSS, & JS seperti biasa. | Vite memantau setiap perubahan file secara real-time. | Vite menyajikan file lewat dev server lokal. | Browser membuka `http://localhost:5173`. | Setiap simpan file → browser otomatis refresh. |

---

## 3. Tailwind CSS

---

## Apa itu Tailwind CSS?

| Cara Kerja | Contoh |
| :--- | :--- |
| Alih-alih menulis CSS di file `.css`, kamu langsung menempelkan class-class kecil siap pakai ke elemen HTML. | `bg-blue-500` → background biru <br> `text-white` → teks putih <br> `px-4 py-2` → padding <br> `rounded` → sudut melengkung |

```html
<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Klik Saya
</button>
```

> 💡 Setiap class Tailwind punya **satu tugas spesifik** — tidak ada style tersembunyi di balik satu nama class.

---

## CSS Biasa vs Bootstrap vs Tailwind

| | CSS Biasa | Bootstrap | Tailwind CSS |
| :--- | :--- | :--- | :--- |
| **Cara pakai** | Tulis sendiri di file `.css` | Pakai class komponen jadi (`btn`, `card`) | Pakai utility class kecil langsung di HTML |
| **Fleksibilitas** | ✅ Bebas total | ❌ Terbatas pada desain Bootstrap | ✅ Bebas total |
| **Hasil tampilan** | Terserah kamu | Terlihat "Bootstrap banget" | Terserah kamu |
| **Ukuran file CSS** | Bisa besar | Besar (~30KB+, banyak tidak terpakai) | Kecil (hanya class yang dipakai) |

> 💡 **Analogi:** 
> 1. CSS Biasa = masak dari bahan mentah 
> 2. Bootstrap = beli makanan jadi 
> 3. Tailwind = beli bahan siap masak — tetap bebas berkreasi, tapi tidak mulai dari nol

---

## Kenapa Tailwind Cocok untuk Project Skala Besar?

| Masalah CSS Biasa | Solusi Tailwind |
| :--- | :--- |
| **CSS terus bertambah besar** — setiap fitur baru perlu tambah class baru, lama-lama ribuan baris | Style langsung di HTML, tidak ada file CSS yang terus bertambah |
| **Takut hapus CSS lama** — tidak tahu apakah class masih dipakai atau tidak | Style menempel ke elemen — kalau elemennya dihapus, style-nya ikut hilang otomatis |
| **Nama class tidak konsisten** — tiap developer beda-beda penamaan | Semua developer pakai class yang sama → konsisten otomatis |
| **CSS tidak terpakai ikut ter-load** — Bootstrap muat semua class meski hanya 10% dipakai | Hanya class yang benar-benar dipakai yang masuk ke file production |

---

## Pola Class Tailwind yang Sering Dipakai

| Kategori | Contoh Class | Keterangan |
| :--- | :--- | :--- |
| **Warna** | `bg-blue-500`, `text-red-600`, `bg-gray-100` | Format: `{properti}-{warna}-{intensitas}` |
| **Spacing** | `p-4`, `px-4 py-2`, `mt-6 mb-4` | `p`=padding, `m`=margin, angka = ukuran rem |
| **Teks & Font** | `text-sm`, `text-lg`, `font-bold`, `text-2xl` | Ukuran teks dan ketebalan font |
| **Layout** | `flex gap-4 items-center`, `grid grid-cols-3` | Flexbox & Grid |
| **Pseudo-class** | `hover:bg-green-600`, `focus:ring-2` | Kondisi: hover, focus, dll |
| **Show/Hide** | `hidden` (sembunyikan), `block` (tampilkan) | Setara `display: none` / `display: block` |

---

## 4. Fetch API & Async/Await

---

## Apa itu Fetch API?

| | Keterangan |
| :--- | :--- |
| **Apa itu** | Fitur bawaan browser untuk mengirim HTTP request dari JavaScript |
| **Perlu install?** | ❌ Tidak perlu — sudah ada di semua browser modern |
| **Fungsi** | Melakukan GET, POST, PUT, DELETE — seperti Thunder Client, tapi dari kode JS |

```javascript
// Kirim GET request ke backend
fetch('http://localhost:3000/api/products');
```

> 💡 Ingat REST API yang sudah dibuat? Sekarang kita lakukan hal yang sama, tapi **dari dalam kode JavaScript** — bukan dari Thunder Client.

---

## Synchronous vs Asynchronous

| | Synchronous | Asynchronous |
| :--- | :--- | :--- |
| **Cara kerja** | Kode dijalankan satu per satu, baris berikutnya menunggu baris sebelumnya selesai | Kode tidak menunggu, langsung lanjut ke baris berikutnya |
| **Masalah jika fetch sync** | Browser akan **freeze/hang** selama menunggu response dari server | Browser tetap responsif sambil menunggu data datang |
| **Kenapa fetch async?** | Request ke server bisa butuh waktu 100ms–2 detik tergantung jaringan | Lebih baik untuk user experience |

> 💡 Bayangkan halaman tidak bisa diklik sama sekali selama loading data — itulah yang terjadi kalau fetch bersifat synchronous.

---

## Async/Await

```javascript
// Tanpa async/await (lebih susah dibaca)
fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Dengan async/await (lebih mudah dibaca)
async function ambilProduk() {
  const response = await fetch('http://localhost:3000/api/products');
  const data = await response.json();
  console.log(data);
}
```

> 💡 **Aturan dasar:** Fungsi yang berisi operasi async harus ditandai `async` — dan tambahkan `await` di depan operasi yang perlu "ditunggu". Keduanya melakukan hal yang sama, tapi `async/await` jauh lebih mudah dibaca.

---

## Fetch untuk Berbagai Method HTTP

```javascript
// GET — mengambil data (default)
async function getSemuaProduk() {
  const response = await fetch('http://localhost:3000/api/products');
  const data = await response.json();
  return data;
}

// POST — mengirim data baru
async function tambahProduk(produkBaru) {
  const response = await fetch('http://localhost:3000/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produkBaru),
  });
  return await response.json();
}

// PUT — mengupdate data
async function updateProduk(id, dataBaru) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataBaru),
  });
  return await response.json();
}

// DELETE — menghapus data
async function hapusProduk(id) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
}
```

---

## Ringkasan Method Fetch API

| Aksi | Method | Perlu `body`? | Perlu `headers`? |
| :--- | :--- | :--- | :--- |
| Ambil semua data | GET | ❌ | ❌ |
| Ambil data by ID | GET | ❌ | ❌ |
| Tambah data baru | POST | ✅ | ✅ |
| Update data | PUT | ✅ | ✅ |
| Hapus data | DELETE | ❌ | ❌ |

---

## Error Handling pada Fetch

| Jenis Error | Kapan Terjadi | Ditangkap Otomatis? |
| :--- | :--- | :--- |
| **Network error** | Server mati, tidak ada internet — request tidak sampai ke server | ✅ Ya, otomatis throw |
| **HTTP error** | Request sampai, tapi server balas 404/500 | ❌ Tidak — perlu cek manual lewat `response.ok` |

```javascript
async function getSemuaProduk() {
  try {
    const response = await fetch('http://localhost:3000/api/products');

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`); // Cek HTTP error manual
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Gagal mengambil data:', error.message);
  }
}
```

---

## 5. Project: UI Inventory dengan Vite + Tailwind

---

## Langkah 1: Setup Project

| Perintah | Fungsi |
| :--- | :--- |
| `npm create vite@latest inventory-frontend -- --template vanilla` | Buat project Vite baru dengan template JavaScript murni |
| `cd inventory-frontend && npm install` | Masuk folder & install dependensi Vite |
| `npm install -D tailwindcss @tailwindcss/vite` | Install Tailwind CSS & plugin Vite-nya |
| `npm run dev` | Jalankan dev server → buka `http://localhost:5173` |

```js
// vite.config.js — aktifkan plugin Tailwind
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [ tailwindcss() ],
})
```

```css
/* src/style.css — aktifkan Tailwind */
@import "tailwindcss";
```

---

## Langkah 2: Struktur HTML

```html
<body class="bg-gray-100 min-h-screen p-6">
  <div id="app" class="max-w-4xl mx-auto">

    <h1 class="text-2xl font-bold text-gray-800 mb-6">📦 Inventory Produk</h1>

    <!-- Form Tambah / Edit Produk -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <input type="text" id="input-name" placeholder="Nama Produk" />
      <input type="number" id="input-price" placeholder="Harga" />
      <input type="number" id="input-category" placeholder="ID Kategori" />
      <button id="btn-submit">Simpan</button>
      <button id="btn-cancel" class="hidden">Batal</button>
    </div>

    <!-- Notifikasi -->
    <div id="notifikasi" class="hidden"></div>

    <!-- Tabel Produk -->
    <table class="w-full text-sm text-left">
      <thead>...</thead>
      <tbody id="tabel-body">
        <!-- Data diisi oleh JavaScript -->
      </tbody>
    </table>

  </div>
  <script type="module" src="/src/main.js"></script>
</body>
```

---

## Langkah 3: Fungsi Fetch di main.js

```javascript
const BASE_URL = 'http://localhost:3000/api/products';

// GET semua produk
async function getSemuaProduk() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Gagal mengambil data produk');
  const data = await response.json();
  return data.data;
}

// POST produk baru
async function tambahProduk(produk) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produk),
  });
  if (!response.ok) throw new Error('Gagal menambah produk');
  return await response.json();
}

// PUT update produk
async function updateProduk(id, produk) { ... }

// DELETE hapus produk
async function hapusProduk(id) { ... }
```

---

## Langkah 4: Mengatasi CORS

| | Keterangan |
| :--- | :--- |
| **Masalah** | Browser memblokir request dari port 5173 ke port 3000 karena dianggap *cross-origin* |
| **Solusi** | Install & aktifkan library `cors` di project **backend** |
| **Perintah** | `npm install cors` (di folder backend) |

```javascript
// src/app.js (di backend)
const express = require('express');
const cors = require('cors');            // ← tambahkan ini

const app = express();

app.use(cors());                         // ← tambahkan ini (sebelum routes)
app.use(express.json());

app.use('/api/products', productRoutes);
```

> 💡 **CORS** adalah aturan keamanan browser: JS di halaman A tidak boleh sembarangan mengambil data dari server B yang berbeda domain/port. `cors()` memberi izin eksplisit dari server.

---

## Langkah 5: Jalankan & Test

| Terminal | Perintah | URL |
| :--- | :--- | :--- |
| **Terminal 1 — Backend** | `npm run dev` (di folder `latihan`) | `http://localhost:3000` |
| **Terminal 2 — Frontend** | `npm run dev` (di folder `inventory-frontend`) | `http://localhost:5173` |

| Fitur | Cara Test |
| :--- | :--- |
| Lihat daftar produk | Tabel otomatis terisi saat halaman dibuka |
| Tambah produk | Isi form → klik Simpan |
| Edit produk | Klik tombol Edit → ubah data → klik Simpan |
| Hapus produk | Klik tombol Hapus → konfirmasi |

---

## Alur Kerja Lengkap

| 1. Buka Browser | 2. JS Jalankan Fetch | 3. Backend Query DB | 4. Render Tabel | 5. User Aksi |
| :--- | :--- | :--- | :--- | :--- |
| User buka `localhost:5173`, browser muat HTML & JS. | `muatUlangData()` dipanggil → fetch GET ke `localhost:3000`. | Backend query MySQL → kirim balik data JSON. | JS terima JSON → `renderTabel()` → DOM diupdate, tabel muncul. | Klik Tambah/Edit/Hapus → fetch POST/PUT/DELETE → tabel refresh. |

---

## Penutup

| Konsep | Yang Sudah Dipelajari |
| :--- | :--- |
| **Frontend & Browser** | Perbedaan frontend-backend, alur kerja browser, HTML/CSS/JS |
| **Vite** | Fungsi build tool, dev server, auto-reload, HMR |
| **Tailwind CSS** | Utility-first, perbandingan dengan CSS biasa & Bootstrap, pola class umum |
| **Fetch API** | Async/await, GET/POST/PUT/DELETE, error handling |
| **Project** | UI Inventory lengkap terhubung ke REST API |

> 💡 **Konsep terpenting:** Frontend dan backend adalah dua program terpisah yang berkomunikasi lewat HTTP. Frontend tidak perlu tahu bagaimana backend menyimpan data — yang penting backend mengembalikan JSON yang sesuai.