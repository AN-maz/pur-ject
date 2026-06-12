# Materi Frontend: Menghubungkan UI ke REST API

> **Konteks:** Materi ini adalah lanjutan dari backend Inventory API yang sudah dibuat sebelumnya. Di sini kita akan belajar cara membuat tampilan (frontend) yang bisa berkomunikasi dengan backend tersebut.

---

## Daftar Isi

1. Apa itu Frontend & Cara Kerja Browser
2. Vite & Build Tool
3. Tailwind CSS
4. Fetch API & Async/Await
5. Project: UI Inventory dengan Vite + Tailwind

---

# 1. Apa itu Frontend & Cara Kerja Browser

## Frontend vs Backend

Ketika kamu membuka sebuah website, ada dua bagian besar yang bekerja:

| | Frontend | Backend |
|---|---|---|
| **Berjalan di** | Browser (komputer user) | Server |
| **Bahasa utama** | HTML, CSS, JavaScript | Node.js, Python, PHP, dll |
| **Yang dikerjakan** | Tampilan, interaksi user | Logic bisnis, database |
| **Dilihat user?** | Ya | Tidak |

Analoginya seperti restoran:
- **Frontend** = ruang makan + pelayan (yang berhadapan langsung dengan pelanggan)
- **Backend** = dapur (tempat makanan dibuat, tidak terlihat pelanggan)

---

## Cara Kerja Browser

Ketika user membuka website, ini yang terjadi secara berurutan:

```
User buka URL
     ↓
Browser kirim HTTP Request ke server
     ↓
Server kirim balik file HTML, CSS, JS
     ↓
Browser membaca & menampilkan HTML
Browser memuat CSS → halaman jadi cantik
Browser menjalankan JS → halaman jadi interaktif
     ↓
JS bisa kirim request lagi ke backend (Fetch API)
     ↓
Backend kirim data JSON
     ↓
JS tampilkan data ke halaman
```

Poin pentingnya: **HTML, CSS, dan JS yang dikirim server itu dijalankan di komputer user (browser)**, bukan di server. Inilah yang membedakan frontend dari backend.

---

## Tiga Bahasa Frontend

**HTML** — Struktur/kerangka halaman

```html
<h1>Daftar Produk</h1>
<table id="tabel-produk"></table>
<button id="btn-tambah">Tambah Produk</button>
```

**CSS** — Tampilan/gaya

```css
h1 {
  color: #333;
  font-size: 24px;
}

button {
  background-color: blue;
  color: white;
  padding: 8px 16px;
}
```

**JavaScript** — Interaktivitas & komunikasi dengan backend

```js
// Klik tombol → tampilkan pesan
document.getElementById('btn-tambah').addEventListener('click', () => {
  alert('Tombol diklik!');
});
```

Ketiganya bekerja bersama: HTML adalah "tulangnya", CSS adalah "kulitnya", dan JavaScript adalah "otaknya".

---

## Hubungan Frontend dengan Backend yang Sudah Dibuat

Backend Inventory API yang sudah kita buat sebelumnya berjalan di `http://localhost:3000`. Backend itu **tidak punya tampilan** — dia hanya menerima request dan mengembalikan data JSON.

Tugas frontend di materi ini adalah membuat **tampilan** yang bisa:
- Mengambil data produk dari backend dan menampilkannya di tabel
- Mengirim data produk baru melalui form
- Mengupdate dan menghapus produk lewat tombol

---

# 2. Vite & Build Tool

## Kenapa Tidak Buat File HTML Biasa Saja?

Secara teknis, kamu bisa membuat file `index.html` dan langsung membukanya di browser tanpa tools apapun. Tapi ada masalah:

1. **Tidak bisa pakai `import/export`** — browser punya batasan ketika membuka file lokal langsung
2. **Tidak ada auto-reload** — setiap ubah kode, harus refresh manual
3. **Tidak ada optimasi** — file JS dan CSS tidak dikompresi untuk performa

**Build tool** hadir untuk menyelesaikan masalah-masalah itu.

---

## Apa itu Build Tool?

Build tool adalah program yang **memproses kode kamu sebelum dijalankan di browser**. Tugasnya antara lain:

- Menyediakan **dev server** dengan auto-reload otomatis
- Memungkinkan penggunaan `import/export` secara bebas
- Menggabungkan dan mengompres semua file untuk production

---

## Apa itu Vite?

Vite (dibaca: *vit*, bahasa Prancis artinya "cepat") adalah build tool modern yang dibuat oleh pembuat Vue.js. Keunggulan utamanya:

- **Sangat cepat** saat development — tidak perlu compile ulang semua file setiap ada perubahan
- **Setup minimal** — langsung bisa dipakai tanpa konfigurasi rumit
- **Hot Module Replacement (HMR)** — perubahan kode langsung terlihat di browser tanpa full reload

---

## Vite vs Membuka HTML Langsung

| | HTML Biasa (buka langsung) | Dengan Vite |
|---|---|---|
| Auto-reload | ❌ | ✅ |
| Import/export JS | Terbatas | ✅ Bebas |
| Dev server | ❌ | ✅ |
| Cocok untuk belajar | Untuk yang sangat sederhana | ✅ Recommended |

---

## Cara Kerja Vite (Sederhana)

```
Kamu tulis kode (HTML, CSS, JS)
          ↓
Vite memantau perubahan file
          ↓
Vite menyajikan file lewat dev server lokal
          ↓
Browser membuka http://localhost:5173
          ↓
Setiap kamu simpan file → browser otomatis refresh
```

Saat nanti project akan "dipublish", Vite juga bisa mengemas semua file menjadi versi yang dioptimasi dengan perintah `npm run build`. Tapi untuk belajar, kita cukup gunakan mode development-nya saja.

---

# 3. Tailwind CSS

## Apa itu Tailwind CSS?

Tailwind CSS adalah **utility-first CSS framework**. Artinya, alih-alih menulis CSS sendiri di file `.css`, kamu langsung menempelkan class-class kecil siap pakai ke elemen HTML.

Setiap class di Tailwind punya **satu tugas spesifik**:

```html
<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Klik Saya
</button>
```

Terjemahan tiap class:
- `bg-blue-500` → background biru sedang
- `text-white` → teks putih
- `px-4 py-2` → padding horizontal 1rem, vertikal 0.5rem
- `rounded` → sudut melengkung
- `hover:bg-blue-600` → saat di-hover, background jadi biru lebih gelap

Tanpa Tailwind, kamu perlu menulis CSS terpisah:

```css
.tombol-saya {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
.tombol-saya:hover {
  background-color: #2563eb;
}
```

Hasilnya sama persis — tapi dengan Tailwind kamu tidak perlu berpindah file.

---

## CSS Biasa vs Tailwind CSS vs Bootstrap

Mungkin kamu pernah dengar **Bootstrap** — framework CSS yang juga populer. Apa bedanya dengan Tailwind?

| | CSS Biasa | Bootstrap | Tailwind CSS |
|---|---|---|---|
| **Cara pakai** | Tulis sendiri di file `.css` | Pakai class komponen jadi (`btn`, `card`, `navbar`) | Pakai utility class kecil-kecil langsung di HTML |
| **Fleksibilitas** | ✅ Bebas total | ❌ Terbatas pada desain Bootstrap | ✅ Bebas total |
| **Kecepatan awal** | Lambat (tulis semua sendiri) | Cepat (tinggal pakai) | Cepat (tinggal pakai) |
| **Hasil tampilan** | Terserah kamu | Terlihat "Bootstrap banget" | Terserah kamu |
| **Ukuran file CSS** | Bisa besar kalau tidak dikelola | Besar (~30KB+, banyak yang tidak dipakai) | Kecil (hanya class yang dipakai yang ikut di-build) |
| **Cocok untuk** | Project kecil / belajar dasar | Prototyping cepat | Project skala menengah–besar |

**Analogi:**
- **CSS Biasa** = masak dari bahan mentah sendiri
- **Bootstrap** = beli makanan jadi — cepat, tapi rasanya sama semua
- **Tailwind** = beli bahan siap masak — tetap bebas berkreasi, tapi tidak mulai dari nol

---

## Kenapa Tailwind Cocok untuk Project Skala Besar?

Ini adalah pertanyaan yang bagus. Untuk project kecil seperti latihan ini, CSS biasa pun cukup. Tapi begitu project bertambah besar, ada masalah yang muncul dengan CSS biasa:

**Masalah 1 — CSS terus bertambah besar**

Setiap fitur baru → perlu tambah class baru di CSS. Lama-lama file CSS bisa ribuan baris dan susah dikelola.

```
Bulan 1:  style.css  → 200 baris
Bulan 3:  style.css  → 800 baris
Bulan 6:  style.css  → 2000 baris  ← mulai kacau
```

Dengan Tailwind, tidak ada file CSS yang terus bertambah — semua style langsung di HTML.

**Masalah 2 — Takut hapus CSS lama**

Di proyek besar, developer sering takut menghapus class CSS karena tidak tahu apakah masih dipakai atau tidak. Akhirnya CSS lama menumpuk dan tidak pernah dibersihkan.

Dengan Tailwind, style menempel langsung ke elemen HTML — kalau elemennya dihapus, style-nya ikut hilang otomatis.

**Masalah 3 — Nama class tidak konsisten antar developer**

Di tim yang besar, satu developer bisa bikin `.btn-primary`, developer lain bikin `.primary-button`, developer lain lagi bikin `.button-blue`. Hasilnya berantakan.

Dengan Tailwind, semua developer pakai class yang sama (`bg-blue-500 text-white px-4 py-2`) — konsisten secara otomatis.

**Masalah 4 — CSS yang tidak dipakai ikut ter-load**

Bootstrap memuat semua class-nya (~30KB+) meski kamu hanya pakai 10% dari fiturnya. Tailwind hanya menyertakan class yang benar-benar dipakai di HTML — ukuran file CSS production bisa sangat kecil (biasanya di bawah 10KB).

---

## Kapan Sebaiknya TIDAK Pakai Tailwind?

Tailwind juga punya kekurangan — penting untuk tahu batasannya:

- **HTML jadi panjang** — class yang banyak di satu elemen bisa membuat HTML susah dibaca
- **Kurva belajar** — perlu waktu untuk hafal nama-nama class utility-nya
- **Tidak cocok untuk yang baru belajar CSS dari nol** — lebih baik belajar CSS dasar dulu sebelum pakai Tailwind, agar tahu apa yang sebenarnya terjadi di balik class-class itu

Untuk project sederhana (landing page statis, tugas kuliah), CSS biasa atau Bootstrap mungkin lebih praktis.

---

## Pola Class Tailwind yang Sering Dipakai

### Warna

Format: `{properti}-{warna}-{intensitas}`

```html
<div class="bg-blue-500">...</div>     <!-- background biru -->
<div class="bg-gray-100">...</div>     <!-- background abu-abu terang -->
<p class="text-red-600">Error!</p>    <!-- teks merah -->
<p class="text-gray-500">...</p>       <!-- teks abu-abu -->
```

Intensitas: `100` (paling terang) → `900` (paling gelap). Yang sering dipakai: `100`, `200`, `400`, `500`, `600`, `700`.

### Spacing (Padding & Margin)

Format: `{p/m}{sisi}-{ukuran}`

```html
<div class="p-4">...</div>          <!-- padding semua sisi: 1rem -->
<div class="px-4 py-2">...</div>    <!-- padding horizontal 1rem, vertikal 0.5rem -->
<div class="mt-6 mb-4">...</div>    <!-- margin top 1.5rem, bottom 1rem -->
```

Ukuran: `1`=0.25rem · `2`=0.5rem · `4`=1rem · `6`=1.5rem · `8`=2rem

### Ukuran Teks & Font

```html
<p class="text-xs">Sangat kecil</p>
<p class="text-sm">Kecil</p>
<p class="text-base">Normal</p>
<p class="text-lg font-semibold">Agak besar, tebal</p>
<p class="text-2xl font-bold">Judul besar</p>
```

### Layout

```html
<!-- Flexbox -->
<div class="flex gap-4 items-center justify-between">...</div>

<!-- Lebar & centering -->
<div class="max-w-4xl mx-auto">...</div>

<!-- Grid -->
<div class="grid grid-cols-3 gap-4">...</div>
```

### Pseudo-class (Hover & Focus)

Format: `{kondisi}:{class}`

```html
<button class="bg-green-500 hover:bg-green-600">Simpan</button>
<input class="focus:outline-none focus:ring-2 focus:ring-blue-400" />
```

### Show / Hide dari JavaScript

Di Tailwind, untuk menyembunyikan elemen digunakan class `hidden` (setara `display: none`). Untuk menampilkannya kembali, hapus class `hidden` dan tambahkan `block`.

```js
// Sembunyikan elemen
element.classList.add('hidden');

// Tampilkan elemen
element.classList.remove('hidden');
element.classList.add('block');
```

---

# 4. Fetch API & Async/Await

Ini adalah materi **paling penting** di bagian frontend — karena inilah cara JavaScript di browser "berbicara" dengan backend.

## Apa itu Fetch API?

Fetch API adalah fitur bawaan browser (tidak perlu install library apapun) yang digunakan untuk **mengirim HTTP request dari JavaScript**.

Ingat materi REST API sebelumnya? Kita bisa melakukan GET, POST, PUT, DELETE — tapi waktu itu dari Thunder Client. Sekarang kita lakukan hal yang sama, tapi **dari dalam kode JavaScript**.

```js
// Kirim GET request ke backend
fetch('http://localhost:3000/api/products');
```

Satu baris itu sudah cukup untuk mengirim request. Tapi hasilnya perlu kita "tangkap" dan proses — di sinilah `async/await` berperan.

---

## Review: Synchronous vs Asynchronous

Sebelum masuk ke `async/await`, pahami dulu perbedaan ini:

**Synchronous** — kode dijalankan satu per satu, baris berikutnya menunggu baris sebelumnya selesai:

```js
console.log('Mulai');
console.log('Tengah');   // Menunggu baris atas selesai
console.log('Selesai');

// Output:
// Mulai
// Tengah
// Selesai
```

**Asynchronous** — kode tidak menunggu, langsung lanjut ke baris berikutnya meski proses sebelumnya belum selesai:

```js
console.log('Mulai');

setTimeout(() => {
  console.log('Ini butuh waktu...');
}, 2000);

console.log('Selesai');

// Output:
// Mulai
// Selesai
// Ini butuh waktu...   ← muncul 2 detik kemudian
```

**Kenapa fetch bersifat asynchronous?**

Karena request ke server membutuhkan waktu — bisa 100ms, bisa 2 detik, tergantung jaringan. Kalau JavaScript harus menunggu (synchronous), browser akan **freeze/hang** selama menunggu response. Bayangkan halaman tidak bisa diklik sama sekali selama loading data — buruk sekali untuk user experience.

Dengan asynchronous, JavaScript bisa tetap responsif sambil menunggu data datang.

---

## Async/Await

`async/await` adalah cara modern untuk menulis kode asynchronous agar **terlihat seperti kode synchronous** — lebih mudah dibaca dan dipahami.

**Aturan dasar:**
- Fungsi yang berisi operasi async harus ditandai dengan kata kunci `async`
- Di dalam fungsi tersebut, tambahkan `await` di depan operasi yang perlu "ditunggu"

```js
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

Keduanya melakukan hal yang sama persis — tapi versi `async/await` jauh lebih mudah dibaca, terutama kalau operasinya bertambah kompleks.

---

## Anatomi Fetch Request

Mari bedah satu per satu:

```js
async function ambilProduk() {
  // 1. Kirim request, tunggu sampai ada response
  const response = await fetch('http://localhost:3000/api/products');

  // 2. Dari response, ambil body-nya dan parse sebagai JSON
  //    Ini juga async karena perlu membaca stream data
  const data = await response.json();

  // 3. Sekarang data sudah berupa JavaScript object/array
  console.log(data);
  // Output: { success: true, data: [...] }
}
```

**Apa isi `response` sebelum di-`.json()`?**

`response` berisi informasi lengkap tentang HTTP response — bukan datanya langsung:

```js
response.status    // → 200, 404, 500, dll
response.ok        // → true kalau status 200-299
response.headers   // → header dari response
```

Data JSON-nya baru keluar setelah kita panggil `await response.json()`.

---

## Fetch untuk Berbagai Method HTTP

**GET** (mengambil data — default):

```js
async function getSemuaProduk() {
  const response = await fetch('http://localhost:3000/api/products');
  const data = await response.json();
  return data;
}
```

**POST** (mengirim data baru):

```js
async function tambahProduk(produkBaru) {
  const response = await fetch('http://localhost:3000/api/products', {
    method: 'POST',                         // Tentukan method
    headers: {
      'Content-Type': 'application/json',   // Beritahu server bahwa kita kirim JSON
    },
    body: JSON.stringify(produkBaru),        // Ubah object JS menjadi string JSON
  });
  const data = await response.json();
  return data;
}

// Cara pakai:
tambahProduk({ name: 'Mouse Gaming', price: 350000, category_id: 1 });
```

**PUT** (mengupdate data):

```js
async function updateProduk(id, dataBaru) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataBaru),
  });
  const data = await response.json();
  return data;
}
```

**DELETE** (menghapus data):

```js
async function hapusProduk(id) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}
```

---

## Error Handling pada Fetch

Ada dua jenis error yang perlu ditangani:

**1. Network error** — request tidak sampai ke server sama sekali (misalnya: server mati, tidak ada internet)

**2. HTTP error** — request sampai ke server, tapi server mengembalikan status error (misalnya: 404 Not Found, 500 Internal Server Error)

Fetch **hanya otomatis throw error untuk network error**. HTTP error seperti 404 atau 500 tidak dianggap error oleh fetch — perlu dicek manual lewat `response.ok`.

```js
async function getSemuaProduk() {
  try {
    const response = await fetch('http://localhost:3000/api/products');

    // Cek apakah HTTP status-nya OK (200-299)
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    // Menangkap: network error ATAU error yang kita throw di atas
    console.error('Gagal mengambil data:', error.message);
  }
}
```

---

## Ringkasan Fetch API

| Aksi | Method | Perlu `body`? | Perlu `headers`? |
|------|--------|---------------|------------------|
| Ambil semua data | GET | ❌ | ❌ |
| Ambil data by ID | GET | ❌ | ❌ |
| Tambah data baru | POST | ✅ | ✅ |
| Update data | PUT | ✅ | ✅ |
| Hapus data | DELETE | ❌ | ❌ |

---

# 5. Project: UI Inventory dengan Vite + Tailwind

Sekarang kita terapkan semua yang sudah dipelajari ke dalam project nyata. Kita akan membuat UI untuk Inventory API yang sudah dibuat sebelumnya.

**Fitur yang akan dibuat:**
- Tampilkan daftar produk dalam tabel
- Form tambah produk baru
- Tombol edit & hapus per baris

> **Sebelum mulai:** Pastikan backend Inventory API sudah berjalan di `http://localhost:3000` dengan menjalankan `npm run dev` di folder project backend.

---

## Langkah 1: Buat Project Vite + Install Tailwind CSS

Buka terminal **baru** (jangan yang sudah dipakai untuk backend), lalu jalankan:

```bash
npm create vite@latest inventory-frontend -- --template vanilla
```

Penjelasan:
- `npm create vite@latest` — perintah untuk membuat project Vite baru
- `inventory-frontend` — nama folder project yang akan dibuat
- `--template vanilla` — gunakan template JavaScript murni (tanpa framework seperti Vue/React)

Masuk ke folder project dan install dependensi Vite:

```bash
cd inventory-frontend
npm install
```

### Install Tailwind CSS

Tailwind CSS adalah **utility-first CSS framework** — artinya kamu tidak menulis CSS sendiri, melainkan langsung memakai class-class siap pakai yang disediakan Tailwind langsung di dalam HTML.

Contoh perbandingan:

```html
<!-- Tanpa Tailwind — perlu tulis CSS terpisah -->
<button class="btn-simpan">Simpan</button>

<!-- Dengan Tailwind — style langsung di class HTML -->
<button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Simpan</button>
```

Install Tailwind dan plugin Vite-nya:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

Penjelasan:
- `tailwindcss` — library Tailwind CSS itu sendiri
- `@tailwindcss/vite` — plugin resmi Tailwind untuk integrasi dengan Vite
- `-D` — install sebagai devDependency (hanya dibutuhkan saat development/build, tidak dibawa ke production)

### Konfigurasi Vite agar mengenali Tailwind

Buka file `vite.config.js` di root folder project, lalu isi dengan:

```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

### Aktifkan Tailwind di CSS

Buka file `src/style.css`, **hapus semua isinya**, lalu ganti dengan satu baris ini:

```css
@import "tailwindcss";
```

Baris ini memberitahu Tailwind untuk meng-inject semua utility class-nya ke dalam file CSS yang dihasilkan saat build.

Jalankan dev server:

```bash
npm run dev
```

Buka browser dan akses **http://localhost:5173** — akan muncul halaman default Vite.

---

## Langkah 2: Bersihkan File Bawaan Vite

Project Vite baru berisi file-file contoh yang tidak kita butuhkan. Kita bersihkan dulu.

**Hapus file-file ini:**
- `public/vite.svg`
- `src/counter.js`
- `javascript.svg`

**Ganti isi `index.html`** dengan struktur berikut:

```html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Inventory App</title>
    <link rel="stylesheet" href="/src/style.css" />
  </head>
  <body class="bg-gray-100 min-h-screen p-6">
    <div id="app" class="max-w-4xl mx-auto">

      <h1 class="text-2xl font-bold text-gray-800 mb-6">📦 Inventory Produk</h1>

      <!-- Form Tambah / Edit Produk -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 id="form-title" class="text-lg font-semibold text-gray-600 mb-4">Tambah Produk</h2>
        <input type="hidden" id="product-id" />
        <input type="text" id="input-name" placeholder="Nama Produk"
          class="block w-full border border-gray-300 rounded px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="number" id="input-price" placeholder="Harga"
          class="block w-full border border-gray-300 rounded px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="number" id="input-category" placeholder="ID Kategori"
          class="block w-full border border-gray-300 rounded px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <div class="flex gap-2">
          <button id="btn-submit"
            class="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded">
            Simpan
          </button>
          <button id="btn-cancel"
            class="hidden bg-gray-400 hover:bg-gray-500 text-white text-sm font-medium px-4 py-2 rounded">
            Batal
          </button>
        </div>
      </div>

      <!-- Notifikasi -->
      <div id="notifikasi" class="hidden px-4 py-3 rounded mb-4 text-sm"></div>

      <!-- Tabel Produk -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-600 mb-4">Daftar Produk</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="bg-gray-50 text-gray-500 font-semibold">
              <tr>
                <th class="px-4 py-3">ID</th>
                <th class="px-4 py-3">Nama Produk</th>
                <th class="px-4 py-3">Harga</th>
                <th class="px-4 py-3">Kategori</th>
                <th class="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody id="tabel-body">
              <!-- Data akan diisi oleh JavaScript -->
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

> **Catatan kelas Tailwind yang dipakai di atas:**
> - `bg-gray-100`, `bg-white` — warna background
> - `max-w-4xl mx-auto` — lebar maksimum + tengah horizontal
> - `rounded-lg shadow` — sudut melengkung + bayangan
> - `p-6`, `px-4 py-3`, `mb-4` — padding dan margin
> - `text-sm`, `font-semibold`, `text-gray-600` — ukuran & warna teks
> - `hidden` — menyembunyikan elemen (setara `display: none`)
> - `hover:bg-green-600` — warna berubah saat mouse di atasnya
> - `focus:ring-2 focus:ring-blue-400` — efek glow biru saat input diklik

---

## Langkah 3: Tulis JavaScript Utama

Ganti isi `src/main.js` dengan kode berikut. Baca setiap komentar dengan seksama — semua bagian penting sudah dijelaskan:

```js
// ==========================================
// KONFIGURASI
// ==========================================

// Base URL backend — sesuaikan jika port berbeda
const BASE_URL = 'http://localhost:3000/api/products';


// ==========================================
// FUNGSI FETCH (Komunikasi dengan Backend)
// ==========================================

// GET: Ambil semua produk dari backend
async function getSemuaProduk() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Gagal mengambil data produk');
  const data = await response.json();
  return data.data; // Ambil array produk dari dalam { success, data }
}

// POST: Kirim data produk baru ke backend
async function tambahProduk(produk) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produk),
  });
  if (!response.ok) throw new Error('Gagal menambah produk');
  return await response.json();
}

// PUT: Update produk berdasarkan ID
async function updateProduk(id, produk) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produk),
  });
  if (!response.ok) throw new Error('Gagal mengupdate produk');
  return await response.json();
}

// DELETE: Hapus produk berdasarkan ID
async function hapusProduk(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Gagal menghapus produk');
  return await response.json();
}


// ==========================================
// FUNGSI UI (Mengubah Tampilan)
// ==========================================

// Tampilkan notifikasi sementara di atas tabel
function tampilkanNotifikasi(pesan, tipe = 'sukses') {
  const el = document.getElementById('notifikasi');
  el.textContent = pesan;

  // Reset class dulu, lalu tambahkan class sesuai tipe
  el.className = 'px-4 py-3 rounded mb-4 text-sm block';
  if (tipe === 'sukses') {
    el.classList.add('bg-green-100', 'text-green-800', 'border', 'border-green-300');
  } else {
    el.classList.add('bg-red-100', 'text-red-800', 'border', 'border-red-300');
  }

  // Sembunyikan otomatis setelah 3 detik
  setTimeout(() => {
    el.classList.add('hidden');
  }, 3000);
}

// Render semua produk ke dalam tabel HTML
function renderTabel(produkList) {
  const tbody = document.getElementById('tabel-body');

  // Kalau tidak ada data, tampilkan pesan
  if (produkList.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="px-4 py-6 text-center text-gray-400">Belum ada produk</td></tr>';
    return;
  }

  // Buat baris tabel untuk setiap produk
  // .map() mengubah setiap objek produk menjadi string HTML <tr>
  // .join('') menggabungkan semua string menjadi satu
  tbody.innerHTML = produkList.map(produk => `
    <tr class="border-t border-gray-100 hover:bg-gray-50">
      <td class="px-4 py-3 text-gray-500">${produk.id}</td>
      <td class="px-4 py-3 font-medium text-gray-800">${produk.name}</td>
      <td class="px-4 py-3 text-gray-600">Rp ${Number(produk.price).toLocaleString('id-ID')}</td>
      <td class="px-4 py-3">
        <span class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">${produk.category_name}</span>
      </td>
      <td class="px-4 py-3 flex gap-2">
        <button class="btn-edit bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
          data-id="${produk.id}" data-name="${produk.name}" data-price="${produk.price}" data-category="${produk.category_id}">
          Edit
        </button>
        <button class="btn-hapus bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
          data-id="${produk.id}">
          Hapus
        </button>
      </td>
    </tr>
  `).join('');

  // Pasang event listener ke semua tombol Edit yang baru dibuat
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', handleKlikEdit);
  });

  // Pasang event listener ke semua tombol Hapus yang baru dibuat
  document.querySelectorAll('.btn-hapus').forEach(btn => {
    btn.addEventListener('click', handleKlikHapus);
  });
}

// Isi form dengan data produk yang akan diedit
function isiFormUntukEdit(id, name, price, categoryId) {
  document.getElementById('form-title').textContent = 'Edit Produk';
  document.getElementById('product-id').value = id;
  document.getElementById('input-name').value = name;
  document.getElementById('input-price').value = price;
  document.getElementById('input-category').value = categoryId;

  // Tampilkan tombol Batal saat mode edit
  document.getElementById('btn-cancel').classList.remove('hidden');

  // Scroll ke atas agar form terlihat
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Reset form ke kondisi awal (mode tambah)
function resetForm() {
  document.getElementById('form-title').textContent = 'Tambah Produk';
  document.getElementById('product-id').value = '';
  document.getElementById('input-name').value = '';
  document.getElementById('input-price').value = '';
  document.getElementById('input-category').value = '';
  document.getElementById('btn-cancel').classList.add('hidden');
}

// Muat ulang data dari backend dan render ke tabel
async function muatUlangData() {
  try {
    const produkList = await getSemuaProduk();
    renderTabel(produkList);
  } catch (error) {
    tampilkanNotifikasi('Gagal memuat data: ' + error.message, 'gagal');
  }
}


// ==========================================
// EVENT HANDLERS (Merespons Aksi User)
// ==========================================

// Handler: Tombol Edit diklik
function handleKlikEdit(event) {
  const btn = event.target;

  // Ambil data dari atribut data-* pada tombol
  const id = btn.dataset.id;
  const name = btn.dataset.name;
  const price = btn.dataset.price;
  const categoryId = btn.dataset.category;

  isiFormUntukEdit(id, name, price, categoryId);
}

// Handler: Tombol Hapus diklik
async function handleKlikHapus(event) {
  const id = event.target.dataset.id;

  // Minta konfirmasi sebelum menghapus
  const konfirmasi = confirm(`Yakin ingin menghapus produk dengan ID ${id}?`);
  if (!konfirmasi) return; // Batalkan kalau user klik "Cancel"

  try {
    await hapusProduk(id);
    tampilkanNotifikasi('Produk berhasil dihapus!');
    await muatUlangData(); // Refresh tabel setelah hapus
  } catch (error) {
    tampilkanNotifikasi('Gagal menghapus: ' + error.message, 'gagal');
  }
}

// Handler: Tombol Simpan diklik (untuk tambah ATAU edit)
async function handleSubmit() {
  const id = document.getElementById('product-id').value;
  const name = document.getElementById('input-name').value.trim();
  const price = document.getElementById('input-price').value;
  const categoryId = document.getElementById('input-category').value;

  // Validasi: semua field harus diisi
  if (!name || !price || !categoryId) {
    tampilkanNotifikasi('Semua field harus diisi!', 'gagal');
    return;
  }

  const dataProduk = {
    name: name,
    price: Number(price),
    category_id: Number(categoryId),
  };

  try {
    if (id) {
      // Kalau ada ID → mode edit → gunakan PUT
      await updateProduk(id, dataProduk);
      tampilkanNotifikasi('Produk berhasil diupdate!');
    } else {
      // Kalau tidak ada ID → mode tambah → gunakan POST
      await tambahProduk(dataProduk);
      tampilkanNotifikasi('Produk berhasil ditambahkan!');
    }

    resetForm();
    await muatUlangData(); // Refresh tabel setelah simpan

  } catch (error) {
    tampilkanNotifikasi('Gagal menyimpan: ' + error.message, 'gagal');
  }
}

// Handler: Tombol Batal diklik
function handleBatal() {
  resetForm();
}


// ==========================================
// INISIALISASI
// ==========================================

// Pasang event listener ke tombol-tombol utama
document.getElementById('btn-submit').addEventListener('click', handleSubmit);
document.getElementById('btn-cancel').addEventListener('click', handleBatal);

// Muat data pertama kali saat halaman dibuka
muatUlangData();
```

---

## Langkah 4: Mengatasi CORS

Ketika frontend (port 5173) mencoba mengakses backend (port 3000), browser akan memblokir request tersebut karena berbeda port. Ini disebut **CORS (Cross-Origin Resource Sharing)**.

Untuk mengizinkannya, kita perlu menambahkan konfigurasi CORS di **project backend**.

Masuk ke folder backend, install library cors:

```bash
npm install cors
```

Lalu buka file `src/app.js` di project backend, tambahkan konfigurasi cors:

```js
const express = require('express');
const cors = require('cors');                          // Tambahkan ini
const productRoutes = require('./routes/product.route');

const app = express();

app.use(cors());                                       // Tambahkan ini (sebelum routes)
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Selamat datang di API Inventory!');
});

app.use('/api/products', productRoutes);

module.exports = app;
```

Restart server backend, lalu coba lagi dari frontend.

> **Apa itu CORS?**  
> Browser punya aturan keamanan: JavaScript di halaman A tidak boleh sembarangan mengambil data dari server B yang berbeda domain/port. CORS adalah mekanisme yang memungkinkan server memberikan izin secara eksplisit: "Boleh kok, request dari sana aku terima."

---

## Langkah 5: Jalankan dan Test

Pastikan dua terminal berjalan bersamaan:

**Terminal 1 — Backend:**
```bash
cd latihan
npm run dev
## Server berjalan di http://localhost:3000
```

**Terminal 2 — Frontend:**
```bash
cd inventory-frontend
npm run dev
## Dev server berjalan di http://localhost:5173
```

Buka browser di **http://localhost:5173** dan coba semua fitur:

| Fitur | Cara Test |
|-------|-----------|
| Lihat daftar produk | Tabel otomatis terisi saat halaman dibuka |
| Tambah produk | Isi form → klik Simpan |
| Edit produk | Klik tombol Edit → ubah data di form → klik Simpan |
| Hapus produk | Klik tombol Hapus → konfirmasi |

---

## Alur Kerja Lengkap (Ringkasan)

```
User membuka http://localhost:5173
         ↓
Browser memuat index.html, main.js
Tailwind CSS di-generate otomatis oleh Vite
         ↓
main.js dijalankan → muatUlangData() dipanggil
         ↓
fetch GET http://localhost:3000/api/products
         ↓
Backend query ke MySQL → kirim balik JSON
         ↓
JavaScript terima JSON → renderTabel() → DOM diupdate
         ↓
Tabel produk muncul di halaman

--- Saat user klik Tambah ---

User isi form → klik Simpan
         ↓
handleSubmit() dipanggil
         ↓
fetch POST http://localhost:3000/api/products (+ body JSON)
         ↓
Backend INSERT ke MySQL → kirim balik response sukses
         ↓
Notifikasi muncul → muatUlangData() → tabel refresh
```

---

## Penutup

Di materi ini kita sudah mempelajari:

- Perbedaan frontend dan backend, serta cara kerja browser
- Fungsi Vite sebagai build tool dan dev server
- Cara menggunakan Fetch API dengan `async/await` untuk GET, POST, PUT, DELETE
- Cara membuat UI lengkap yang terhubung ke REST API

Konsep yang paling penting untuk diingat: **frontend dan backend adalah dua program terpisah yang berkomunikasi lewat HTTP**. Frontend tidak tahu (dan tidak perlu tahu) bagaimana backend menyimpan data — yang penting backend mengembalikan JSON yang sesuai.
