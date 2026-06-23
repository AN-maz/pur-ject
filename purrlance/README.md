# 📋 Perencanaan Landing Page — Jasa Web UMKM

> **Dokumen ini adalah blueprint lengkap untuk diimplementasikan oleh agent.**
> Baca seluruh dokumen sebelum menulis satu baris kode pun.

---

## 🎯 Ringkasan Proyek

**Nama Agensi (Placeholder):** `urWeb` 
**Target Klien:** UMKM (kuliner, fashion lokal, toko kelontong, jasa, dll.)
**Tujuan Halaman:** Meyakinkan pemilik UMKM untuk menghubungi agensi via WhatsApp / konsultasi gratis.
**Deliverable:** Single-page React app (`App.jsx`) dengan semua section dalam satu file, CSS modules atau Tailwind.
**Bahasa Konten:** Bahasa Indonesia (informal, ramah, tidak teknis)

---

## 🎨 Sistem Desain (Design Tokens)

### Palet Warna — "Trusty Jade"

Filosofi: Hijau toska/emerald memberi kesan segar, modern, dan terpercaya — cocok untuk audiens UMKM yang ingin naik kelas tanpa terasa "korporat dingin". Dipadukan dengan putih bersih dan aksen gelap untuk keterbacaan maksimal.

| Nama Token | Hex | Peran |
|---|---|---|
| `--color-primary` | `#0FA888` | CTA, tombol utama, highlight |
| `--color-primary-dark` | `#0B7A63` | Hover state tombol |
| `--color-primary-light` | `#E6F7F4` | Background card, section alternating |
| `--color-bg` | `#FFFFFF` | Background utama |
| `--color-surface` | `#F8FFFE` | Background section alternating |
| `--color-text-primary` | `#111827` | Heading utama |
| `--color-text-secondary` | `#4B5563` | Body text, subheading |
| `--color-text-muted` | `#9CA3AF` | Caption, label kecil |
| `--color-border` | `#E5E7EB` | Border card, divider |
| `--color-accent` | `#F59E0B` | Badge "Terlaris", highlight harga |

> **Catatan Agen:** Definisikan semua token ini sebagai CSS custom properties di `:root` atau sebagai konstanta Tailwind config.

### Tipografi

| Peran | Font | Import |
|---|---|---|
| Display / Heading | `Plus Jakarta Sans` (700, 800) | Google Fonts |
| Body / UI | `Inter` (400, 500, 600) | Google Fonts |

```html
<!-- Tambahkan di <head> index.html -->
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### Skala Tipe

```css
--text-xs:   0.75rem;   /* caption */
--text-sm:   0.875rem;  /* label */
--text-base: 1rem;      /* body */
--text-lg:   1.125rem;  /* subheading */
--text-xl:   1.25rem;   /* card title */
--text-2xl:  1.5rem;    /* section subtitle */
--text-3xl:  1.875rem;  /* section title */
--text-4xl:  2.25rem;   /* hero subheading */
--text-5xl:  3rem;      /* hero headline */
--text-6xl:  3.75rem;   /* hero headline mobile fallback */
```

---

## 🏗️ Arsitektur Proyek React

```
src/
├── App.jsx                  # Root, import semua section
├── main.jsx                 # Entry point
├── index.css                # CSS variables & global reset
│
├── components/
│   ├── Navbar.jsx           # Sticky nav dengan logo & CTA
│   ├── Hero.jsx             # Section 1 — Hero
│   ├── WhyUs.jsx            # Section 2 — Value Proposition
│   ├── Features.jsx         # Section 3 — Fitur Andalan
│   ├── Portfolio.jsx        # Section 4 — Portofolio / Mockup
│   ├── Pricing.jsx          # Section 5 — Paket Harga
│   ├── About.jsx            # Section 6 — Tentang Kami
│   ├── FAQ.jsx              # Section 6b — FAQ (accordion)
│   └── Footer.jsx           # Section 7 — Footer & Kontak
│
├── hooks/
│   └── useScrollAnimation.js  # Custom hook untuk Intersection Observer
│
└── assets/
    ├── mockup-kopi.png       # Mockup dummy "Kedai Kopi"
    ├── mockup-baju.png       # Mockup dummy "Toko Baju"
    └── mockup-kuliner.png    # Mockup dummy "Warung Makan"
```

> **Catatan Agen:** Jika assets belum tersedia, gunakan placeholder via `https://placehold.co/` dengan warna `#0FA888`.

---

## ✍️ Copywriting & Konten Per Section

---

### 1. NAVBAR

**Logo:** `WebKu` (teks dengan dot aksen warna `--color-primary`)
**Nav Links:** Layanan · Portofolio · Harga · FAQ
**CTA Button:** `Konsultasi Gratis →`

**Behavior:**
- Sticky saat scroll, tambahkan `box-shadow` dan `background: rgba(255,255,255,0.95)` + `backdrop-filter: blur(8px)` setelah scroll > 50px.
- Animasi: fade-in dari atas saat halaman load (`0ms` delay).

---

### 2. HERO SECTION

**Eyebrow label (badge kecil di atas headline):**
> ✦ Solusi Digital untuk UMKM Indonesia

**Headline Utama (H1, font Plus Jakarta Sans 800):**
> Penjualanmu Bisa Lebih Ramai,
> Tanpa Ribet Kelola Orderan

**Sub-headline:**
> Kami buatkan website katalog produk yang profesional, cepat, dan pesanan pelanggan langsung masuk ke WhatsApp-mu — tanpa potongan komisi, tanpa pusing teknis.

**CTA Buttons (dua tombol, berdampingan):**
- Primary: `🚀 Konsultasi Gratis` → scroll ke section Kontak / WhatsApp
- Secondary: `Lihat Contoh Web →` → scroll ke section Portofolio

**Elemen Visual Hero:**
- Sisi kanan: mockup floating smartphone menampilkan katalog UMKM.
- Tiga "social proof badge" floating di sekitar mockup:
  - `⚡ Selesai dalam 7 Hari`
  - `✅ Tanpa Potongan Komisi`
  - `📱 Pesanan Langsung ke WA`

**Animasi Hero:**
- Konten kiri: slide-in dari kiri, `opacity: 0 → 1`, durasi `600ms`, easing `ease-out`.
- Mockup kanan: slide-in dari kanan, delay `200ms`.
- Badge floating: animasi `float` idle — naik-turun perlahan, masing-masing dengan `animation-delay` berbeda (`0s`, `0.4s`, `0.8s`) agar tidak sinkron.
- Background: gradien radial dari `--color-primary-light` di pojok kiri atas ke putih di tengah. Tambahkan beberapa lingkaran blur besar (`blur(80px)`) sebagai ambient light yang bergerak sangat lambat (idle animation via `@keyframes drift`).

---

### 3. WHY US — VALUE PROPOSITION

**Section Label:** Mengapa Pilih Kami?
**Section Title:** Jualan Lebih Mudah, Keuntungan Utuh di Tangan Kamu

**3 Kartu Value (grid 3 kolom):**

| Icon | Judul | Deskripsi |
|---|---|---|
| 💰 | Nol Potongan Komisi | Pesanan masuk langsung ke WhatsApp-mu. Tidak ada marketplace yang ambil jatah. Setiap rupiah dari pelanggan, utuh untuk kamu. |
| ⚡ | Ringan & Cepat Dibuka | Website dibuat dengan teknologi modern — sangat ringan saat dibuka dari HP pelanggan, bahkan dengan koneksi seadanya. Pelanggan tidak kabur karena loading lama. |
| 🛠️ | Serahkan Semua ke Kami | Tidak perlu ngerti IT. Kami urus dari desain, pembuatan, sampai website kamu live dan siap dipakai. Kamu cukup terima orderan. |

**Animasi:**
- Kartu masuk dengan `stagger animation` — kartu 1, 2, 3 muncul bergantian dengan delay `0ms`, `100ms`, `200ms` saat section masuk viewport (Intersection Observer).
- Idle: icon berputar sangat halus `rotate(0deg → 360deg)` setiap 8 detik saat hover kartu.

---

### 4. FEATURES — FITUR ANDALAN

**Section Label:** Yang Kamu Dapatkan
**Section Title:** Satu Website, Semua yang UMKM-mu Butuhkan

**Layout:** Alternating left-right (zigzag) untuk tiap fitur, atau grid 2x2 untuk 4 fitur.

**Fitur 1 — Katalog Produk Interaktif**
> Tampilkan produk atau menu dengan foto, harga, dan deskripsi yang menarik. Pelanggan bisa browse seperti belanja online sungguhan — tapi ini milikmu sendiri, bukan milik marketplace.

**Fitur 2 — Pesan via WhatsApp Otomatis**
> Setiap item dilengkapi tombol "Pesan Sekarang". Ringkasan pesanan pelanggan akan otomatis terformat rapi dan langsung dikirim ke nomor WhatsApp bisnismu. Tidak ada orderan yang terlewat.

**Fitur 3 — Desain Sesuai Brand-mu**
> Bukan template kaku yang sama untuk semua. Kami sesuaikan warna, font, dan tampilan website dengan karakter dan identitas merek UMKM-mu agar pelanggan langsung mengenalinya.

**Fitur 4 — Siap Tampil di Google**
> Website-mu dioptimasi agar bisa ditemukan di Google. Ketika orang mencari "[nama produkmu] di [kotamu]", peluang untuk muncul jauh lebih besar.

**Animasi:**
- Tiap blok fitur: fade-in dari bawah saat masuk viewport.
- Ilustrasi/icon tiap fitur: animasi idle `pulse` halus (scale 1 → 1.03 → 1, durasi 3s, infinite).

---

### 5. PORTFOLIO — CONTOH HASIL KERJA

**Section Label:** Portofolio
**Section Title:** Begini Hasilnya Jika UMKM-mu Punya Website

**Sub-copy:**
> Berikut adalah prototipe desain yang kami buat sebagai gambaran nyata. Desain final untuk bisnis kamu akan disesuaikan penuh dengan merek dan kebutuhanmu.

**3 Kartu Portofolio:**

**Kartu 1 — Kedai Kopi "Nusantara Brew"**
- Gambar: mockup smartphone menampilkan menu kopi
- Tag: `☕ Kuliner · Katalog Menu`
- Deskripsi: Website menu digital untuk kedai kopi lokal, dengan galeri foto produk dan integrasi pemesanan via WhatsApp.

**Kartu 2 — Toko Baju "Loka Wastra"**
- Gambar: mockup tablet menampilkan katalog pakaian
- Tag: `👗 Fashion Lokal · Katalog Produk`
- Deskripsi: Toko online sederhana untuk brand fashion lokal, dilengkapi filter kategori dan tombol pesan langsung.

**Kartu 3 — Warung Makan "Dapur Bu Sari"**
- Gambar: mockup laptop menampilkan daftar menu warung
- Tag: `🍽️ Kuliner · Daftar Menu`
- Deskripsi: Pengganti menu cetak berbasis digital, cocok untuk warung makan yang ingin tampil lebih profesional.

**Animasi:**
- Kartu: hover effect — `translateY(-8px)` + `box-shadow` lebih dalam, transisi `300ms ease`.
- Scroll masuk: stagger fade-up seperti section WhyUs.

---

### 6. PRICING — PAKET HARGA

**Section Label:** Harga Transparan
**Section Title:** Investasi Sekali, Manfaat Jangka Panjang

**Sub-copy:**
> Tidak ada biaya tersembunyi. Tidak ada kontrak panjang. Semua sudah jelas dari awal.

**Paket 1 — Starter** *(Paling Populer)*
- **Harga:** Mulai Rp 1.500.000
- **Termasuk:**
  - Landing page 1 halaman yang elegan
  - Katalog hingga 20 produk/menu
  - Tombol "Pesan via WhatsApp" di setiap produk
  - Desain disesuaikan dengan brand kamu
  - Hosting & domain `.com` tahun pertama gratis
  - Garansi revisi 2x
  - Proses selesai 5–7 hari kerja
- **Badge:** ⭐ Paling Banyak Dipilih

**Paket 2 — Growth**
- **Harga:** Mulai Rp 2.800.000
- **Termasuk:**
  - Semua fitur Starter
  - Katalog hingga 60 produk/menu
  - Halaman multi-section (Beranda, Menu, Tentang, Kontak)
  - Fitur pencarian produk
  - Optimasi Google (SEO dasar)
  - Hosting & domain `.com` tahun pertama gratis
  - Garansi revisi 3x

**Catatan Harga (penting, tampilkan dengan jelas):**
> ⚠️ Biaya perpanjangan hosting & domain mulai Rp 300.000–600.000 per tahun untuk tahun berikutnya, tergantung paket domain yang dipilih. Kami akan ingatkan kamu sebelum jatuh tempo.

**Animasi:**
- Kartu Starter memiliki efek "highlight" — border `--color-primary`, subtle background tint.
- Kartu hover: efek lift seperti kartu portofolio.

---

### 7. ABOUT — TENTANG KAMI

**Section Label:** Tentang Kami
**Section Title:** Kami Ada untuk Membuat UMKM Indonesia Go Digital

**Paragraf:**
> WebKu Studio adalah tim developer muda yang percaya bahwa setiap UMKM berhak tampil profesional di dunia digital — bukan hanya korporasi besar. Kami fokus membangun website yang fungsional, estetik, dan benar-benar memberikan hasil nyata untuk bisnis kamu.

> Dengan pengalaman di bidang pengembangan web full-stack, kami tidak hanya membuat tampilan yang cantik — tapi memastikan website kamu benar-benar bekerja: cepat, mudah digunakan pelanggan, dan membawa pesanan masuk ke WhatsApp-mu.

**3 Stat / Trust Badge:**
| Angka | Label |
|---|---|
| 7 Hari | Rata-rata Selesai |
| 100% | Kepuasan Klien |
| 2x | Revisi Gratis |

---

### 8. FAQ — PERTANYAAN YANG SERING DITANYA

**Section Title:** Pertanyaan yang Sering Ditanya

**Daftar FAQ (komponen Accordion — klik untuk buka/tutup):**

**Q1:** Berapa lama proses pembuatan websitenya?
> Rata-rata 5–7 hari kerja setelah data produk dan aset desain (logo, foto) diterima dari kamu. Untuk paket Growth, bisa 10–14 hari kerja.

**Q2:** Apakah saya perlu mengerti IT atau coding?
> Sama sekali tidak perlu! Kamu cukup menyiapkan foto produk dan info bisnis. Sisanya kami yang urus, dari desain hingga website live.

**Q3:** Bagaimana cara update menu atau produk ke depannya?
> Kamu bisa kirimkan perubahan via WhatsApp ke tim kami. Untuk update kecil (ganti harga, tambah/hapus produk), kami bantu gratis untuk 30 hari pertama setelah launch.

**Q4:** Apakah website bisa dibuka di HP pelanggan saya?
> Tentu! Semua website yang kami buat sudah dioptimasi penuh untuk tampilan mobile (smartphone). Ini justru prioritas utama kami.

**Q5:** Bagaimana dengan biaya setelah tahun pertama?
> Biaya hosting dan domain biasanya sekitar Rp 300.000–600.000 per tahun. Kami akan mengingatkan kamu 1 bulan sebelum jatuh tempo agar tidak ada yang terlewat.

**Q6:** Apakah pesanan pelanggan benar-benar langsung masuk ke WA saya?
> Ya, persis. Ketika pelanggan klik "Pesan Sekarang", sistem akan membuka WhatsApp dengan ringkasan pesanan yang sudah terformat otomatis — nama produk, jumlah, dan total harga. Kamu tinggal konfirmasi dan proses.

**Animasi Accordion:**
- Buka/tutup dengan animasi `max-height` transition + `opacity`, durasi `300ms ease`.

---

### 9. FOOTER & KONTAK

**CTA Banner sebelum Footer:**
> **Siap Bawa UMKM-mu ke Level Berikutnya?**
> Konsultasi pertama gratis. Tanpa basa-basi, langsung ke solusi.
> `[Chat WhatsApp Sekarang]` ← tombol hijau besar, buka WA

**Footer Content:**
- Logo + tagline singkat: *"Website profesional untuk UMKM Indonesia."*
- **Kolom Link:** Layanan · Portofolio · Harga · FAQ
- **Kolom Kontak:**
  - WhatsApp: `+62 8xx-xxxx-xxxx`
  - Email: `hello@webku.id` *(placeholder)*
  - Instagram: `@webkustudio` *(placeholder)*
- **Copyright:** © 2025 WebKu Studio. Semua hak dilindungi.

---

## 🎬 Panduan Animasi Lengkap

> **Catatan Agen:** Implementasikan semua animasi berikut. Hormati `prefers-reduced-motion` — matikan semua animasi jika user mengaktifkan preferensi tersebut.

### A. Animasi Masuk Halaman (Page Load)

```css
/* Navbar: fade dari atas */
@keyframes slideDown {
  from { transform: translateY(-20px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}

/* Hero konten kiri */
@keyframes slideInLeft {
  from { transform: translateX(-40px); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
}

/* Hero mockup kanan */
@keyframes slideInRight {
  from { transform: translateX(40px); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
```

### B. Animasi Scroll (Intersection Observer)

Gunakan custom hook `useScrollAnimation` untuk semua section di bawah hero:

```js
// hooks/useScrollAnimation.js
import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

Class yang diterapkan saat `isVisible = true`:

```css
.fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger untuk child elements */
.stagger-1 { transition-delay: 0ms; }
.stagger-2 { transition-delay: 100ms; }
.stagger-3 { transition-delay: 200ms; }
```

### C. Animasi Idle (Ambient / Loop)

```css
/* Badge floating di hero */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
}
.badge-float-1 { animation: float 3s ease-in-out infinite; }
.badge-float-2 { animation: float 3s ease-in-out infinite 0.4s; }
.badge-float-3 { animation: float 3s ease-in-out infinite 0.8s; }

/* Background ambient blobs */
@keyframes drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(30px, -20px) scale(1.05); }
  66%       { transform: translate(-20px, 10px) scale(0.98); }
}
.blob {
  animation: drift 12s ease-in-out infinite;
  will-change: transform;
}

/* Icon pulse pada kartu fitur */
@keyframes pulse-soft {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.06); }
}
.icon-pulse {
  animation: pulse-soft 3s ease-in-out infinite;
}
```

### D. Animasi Interaksi (Micro-interactions)

```css
/* Tombol CTA */
.btn-primary {
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(15, 168, 136, 0.35);
}
.btn-primary:active {
  transform: translateY(0);
}

/* Kartu portofolio & pricing */
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
```

### E. Respek Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📦 Dependensi yang Digunakan

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x"
  },
  "devDependencies": {
    "vite": "^5.x",
    "@vitejs/plugin-react": "^4.x"
  }
}
```

> **Tidak ada library animasi eksternal** (Framer Motion, GSAP, dll). Semua animasi menggunakan CSS pure dan Intersection Observer native — lebih ringan dan tidak menambah bundle size.

---

## 🔗 Tautan & Placeholder

Ganti semua placeholder berikut sebelum deploy:

| Placeholder | Ganti dengan |
|---|---|
| `WebKu Studio` | Nama agensi kamu |
| `+62 8xx-xxxx-xxxx` | Nomor WhatsApp bisnis |
| `hello@webku.id` | Email bisnis |
| `@webkustudio` | Handle Instagram |
| `Rp 1.500.000` | Harga aktual paket Starter |
| `Rp 2.800.000` | Harga aktual paket Growth |

---

## ✅ Checklist Implementasi untuk Agent

- [ ] Buat project Vite + React (`npm create vite@latest`)
- [ ] Install Google Fonts via `index.html`
- [ ] Definisikan CSS custom properties di `index.css`
- [ ] Implementasi `useScrollAnimation` hook
- [ ] Buat semua komponen sesuai struktur di atas
- [ ] Terapkan copywriting dari dokumen ini (jangan ubah tone/isi tanpa izin)
- [ ] Implementasi semua animasi dari seksi Panduan Animasi
- [ ] Pastikan layout responsif (mobile-first): breakpoint utama `768px` dan `1024px`
- [ ] Tambahkan `prefers-reduced-motion` media query
- [ ] Test: scroll animation muncul dengan benar di tiap section
- [ ] Test: semua link CTA mengarah ke WhatsApp dengan format `https://wa.me/62xxxxxxxxxx`
- [ ] Pastikan tidak ada library animasi eksternal yang diinstall

---

*Dokumen ini dibuat sebagai panduan implementasi lengkap. Agent tidak perlu bertanya lagi — semua keputusan desain, copy, dan animasi sudah ada di sini.*