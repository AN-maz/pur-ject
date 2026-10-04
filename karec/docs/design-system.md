# Banquet Under Horizon 2026

## Design System (design-system.md)

**Version:** 1.0
**Project:** English Club UTB – Banquet Under Horizon 2026

---

# Purpose

Dokumen ini menjadi acuan utama dalam membangun seluruh tampilan Landing Page.

Tujuan design system adalah menjaga konsistensi visual, pengalaman pengguna, serta menghindari tampilan website yang terasa seperti template AI.

Semua keputusan desain harus mengikuti prinsip yang ada pada dokumen ini.

---

# Design Principles

Landing page harus memiliki lima karakter utama.

## 1. Story Driven

Website tidak terasa seperti brosur.

Setiap section adalah kelanjutan dari section sebelumnya.

Pengunjung harus merasa sedang mengikuti perjalanan.

---

## 2. Minimal but Memorable

Gunakan elemen seminimal mungkin.

Namun setiap elemen harus memiliki fungsi yang jelas.

Hindari dekorasi yang hanya memenuhi layar.

---

## 3. Spacious

Gunakan whitespace yang luas.

Biarkan setiap section memiliki ruang bernapas.

Jangan memenuhi layar dengan terlalu banyak card.

---

## 4. Human

Website harus terasa hangat.

Gunakan bahasa yang ramah.

Animasi harus terasa natural.

Hover tidak boleh berlebihan.

---

## 5. Premium

Walaupun merupakan website organisasi mahasiswa, tampilannya harus memiliki kualitas seperti landing page startup modern.

---

# Brand Identity

Website merepresentasikan karakter English Club.

Brand Personality:

* Friendly
* Creative
* Modern
* Confident
* Collaborative
* Growth Mindset

Website tidak boleh terasa formal seperti website pemerintahan.

Website juga tidak boleh terlalu playful seperti website anak-anak.

---

# Color System

## Primary

EC Blue

#001452

Digunakan untuk:

* Heading
* CTA
* Navbar
* Footer
* Section Highlight

---

## Accent

EC Red

#D81B2B

Digunakan untuk:

* Badge
* Highlight text
* Active state
* Small decoration
* Button hover accent

Jangan menggunakan warna merah secara berlebihan.

---

## Neutral

White

Digunakan sebagai background utama.

---

## Surface

Gunakan warna putih dengan sedikit opacity untuk card glass.

Gunakan shadow ringan agar card terlihat terangkat.

---

# Color Philosophy

Tema acara adalah nature.

Namun identitas organisasi tetap menggunakan biru dan merah.

Nuansa nature dibangun menggunakan:

* daun
* kertas
* tekstur
* polaroid
* cahaya
* bayangan
* garis doodle

Bukan menggunakan hijau sebagai warna utama.

---

# Typography

## Font

Inter

---

## Heading

Weight

700–800

Letter spacing sedikit rapat.

Line height cukup longgar.

Gunakan uppercase pada heading utama.

---

## Section Title

Bold

Ukuran besar

Mudah dibaca.

---

## Body

Regular

Ukuran nyaman.

Tidak terlalu kecil.

---

## Caption

Gunakan warna abu tipis.

Jangan menggunakan opacity terlalu rendah.

---

# Spacing System

Gunakan kelipatan 8.

Contoh:

8

16

24

32

48

64

96

128

Jangan menggunakan spacing acak.

---

# Border Radius

Small

12px

Medium

20px

Large

28px

Hero Card

36px

Website harus terasa lembut.

Hindari sudut tajam.

---

# Shadow System

Gunakan shadow ringan.

Contoh:

Small

untuk card.

Medium

untuk floating object.

Large

untuk Hero scrapbook.

Shadow tidak boleh terlalu gelap.

---

# Grid System

Desktop

12 Column

Container

Max Width

1200px

Padding Horizontal

32px

Mobile

16px

Gunakan container yang konsisten.

---

# Layout Rules

Setiap section memiliki struktur:

Section

↓

Container

↓

Content

↓

Decoration

Decoration tidak boleh mengganggu isi.

---

# Section Spacing

Desktop

Top

120px

Bottom

120px

Mobile

80px

Gunakan ritme yang konsisten.

---

# Buttons

Primary

Background

EC Blue

Text

White

Hover

Naik sedikit.

Shadow bertambah.

Transition halus.

---

Secondary

Outline

Blue Border

Hover

Fill Blue

---

Ghost

Tanpa border.

Underline saat hover.

---

# Card Design

Card menggunakan:

Rounded Corner

Soft Shadow

White Surface

Hover Lift

Border sangat tipis.

Tidak menggunakan gradient berlebihan.

---

# Icon Style

Gunakan icon outline.

Konsisten.

Jangan mencampur outline dan fill.

---

# Illustration Style

Gunakan:

Simple SVG

Line Art

Tiny Decoration

Doodle

Compass

Leaf

Notebook

Envelope

Polaroid

Map

Hindari ilustrasi kartun.

---

# Background

Background utama putih.

Tambahkan:

Noise Texture

Blob Gradient opacity rendah

Soft Blur

Tiny Decoration

Doodle Line

Supaya halaman tidak kosong.

---

# Scrapbook Elements

Landing page memiliki identitas scrapbook.

Elemen yang dapat digunakan:

Masking Tape

Polaroid

Notebook Paper

Paper Clip

Leaf

Hand Drawn Arrow

Location Pin

Compass

Semua elemen dibuat sederhana.

---

# Motion System

Gunakan animasi seperlunya.

Tujuan animasi:

Memberikan kehidupan.

Bukan menarik perhatian berlebihan.

---

Reveal Animation

Gunakan reveal-up yang sudah tersedia.

---

Hover

Scale

1.02

Rotate

1°–2°

Lift

4px–8px

Transition

300–500ms

---

Floating

Gunakan untuk:

Leaf

Compass

Seed

Polaroid

Amplitude kecil.

---

Parallax

Sangat ringan.

Background bergerak lebih lambat.

---

Scroll Indicator

Gunakan animasi naik turun perlahan.

---

# Scroll Experience

Landing page harus terasa seperti membaca cerita.

Setiap section muncul secara bertahap.

Pengunjung tidak boleh merasa "dipindahkan" secara tiba-tiba.

---

# Journey Illustration

Website menggunakan metafora perjalanan.

Gunakan garis melengkung.

Panah.

Jejak kaki.

Akar tanaman.

Tunas.

Semuanya dibuat menggunakan SVG sederhana.

---

# Seed Animation

Seed merupakan identitas utama website.

Hero

Benih kecil.

Journey

Mulai retak.

Mission

Akar muncul.

Memory Capsule

Tunas tumbuh.

CTA

Menjadi tanaman kecil.

Animasi dilakukan menggunakan SVG.

Tidak perlu library berat.

---

# Component Principles

Semua komponen harus reusable.

Tidak boleh ada styling yang diulang.

Gunakan variasi props.

---

# Responsive Principles

Desktop

Fokus visual.

Tablet

Menyesuaikan.

Mobile

Prioritaskan keterbacaan.

Semua section harus tetap memiliki storytelling.

---

# Accessibility

Kontras warna harus baik.

Ukuran font minimal nyaman dibaca.

Button mudah ditekan.

Heading memiliki hirarki yang jelas.

Semua gambar memiliki alt text.

---

# Performance

Prioritaskan:

SVG

CSS Animation

Intersection Observer

Optimized Image

Lazy Loading

Jangan menggunakan library animasi yang berat.

---

# Overall Feeling

Ketika website selesai dibangun, kesan pertama yang harus muncul adalah:

> "Website ini terasa seperti halaman event profesional."

Setelah beberapa saat menjelajah, pengunjung harus mulai merasa:

> "Ini bukan hanya acara picnic."

Dan ketika mencapai bagian terakhir, mereka harus merasa:

> "Aku ingin menjadi bagian dari perjalanan ini."

Itulah tujuan utama dari keseluruhan design system ini.
