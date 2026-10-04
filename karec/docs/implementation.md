# Banquet Under Horizon 2026

## Implementation Guide (implementation.md)

**Version:** 1.0
**Project:** English Club UTB Landing Page
**Framework:** React + Vite + Tailwind CSS v4

---

# Objective

Dokumen ini menjadi panduan implementasi bagi AI Agent dalam membangun Landing Page Banquet Under Horizon 2026.

Prioritas utama bukan hanya menghasilkan tampilan yang sesuai desain, tetapi juga menghasilkan struktur project yang bersih, reusable, mudah dikembangkan, dan memiliki performa yang baik.

Setiap keputusan implementasi harus mempertimbangkan:

* Readability
* Maintainability
* Reusability
* Scalability
* Performance
* Accessibility

---

# General Rules

Landing page harus dibangun menggunakan pendekatan **Component Driven Development**.

Hindari membuat halaman besar yang berisi seluruh UI.

Setiap section merupakan komponen terpisah.

Komponen harus memiliki satu tanggung jawab yang jelas (Single Responsibility Principle).

---

# Project Structure

```text
src/
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── textures/
│   ├── illustrations/
│   └── nav-logo.png
│
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Container.jsx
│   │   ├── SectionTitle.jsx
│   │   ├── Badge.jsx
│   │   ├── Reveal.jsx
│   │   └── Divider.jsx
│   │
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── BackgroundDecoration.jsx
│   │
│   ├── hero/
│   ├── why-event/
│   ├── journey/
│   ├── mission/
│   ├── memory/
│   ├── information/
│   ├── faq/
│   └── cta/
│
├── hooks/
│   ├── useReveal.js
│   ├── useScrollProgress.js
│   └── useParallax.js
│
├── data/
│   ├── missions.js
│   ├── faq.js
│   ├── timeline.js
│   └── event.js
│
├── utils/
│   ├── cn.js
│   └── constants.js
│
├── pages/
│   └── Home.jsx
│
├── App.jsx
└── main.jsx
```

---

# Component Philosophy

Semua komponen harus:

* reusable
* stateless jika memungkinkan
* menerima props
* tidak memiliki styling yang berulang

Jangan membuat komponen yang terlalu spesifik apabila dapat digeneralisasi.

---

# Naming Convention

Gunakan PascalCase untuk komponen.

Contoh:

Navbar.jsx

JourneyMap.jsx

MissionCard.jsx

FAQItem.jsx

Container.jsx

Gunakan camelCase untuk variabel dan fungsi.

---

# Data Driven UI

Seluruh data statis sebaiknya dipisahkan dari komponen.

Contoh:

Mission Card berasal dari

missions.js

FAQ berasal dari

faq.js

Timeline berasal dari

timeline.js

Komponen hanya bertugas melakukan rendering.

---

# Layout System

Seluruh section menggunakan komponen Container.

Container bertugas mengatur:

* max width
* horizontal padding
* alignment

Jangan menulis ulang class container di setiap section.

---

# Section Pattern

Seluruh section mengikuti pola berikut.

```jsx
<section>
    <Container>
        <SectionTitle />
        <Content />
    </Container>
</section>
```

Pattern ini harus konsisten.

---

# Styling Rules

Gunakan Tailwind Utility Class.

Hindari inline style.

Hindari CSS tambahan apabila dapat diselesaikan menggunakan utility.

Gunakan class yang konsisten.

---

# Responsive Strategy

Desktop First Design

Breakpoint harus dipikirkan sejak awal.

Komponen tidak boleh rusak ketika ukuran layar berubah.

Prioritaskan pengalaman mobile.

---

# Animation Strategy

Gunakan animasi ringan.

Semua animasi menggunakan:

* CSS Transition
* Transform
* Opacity

Hindari animasi berbasis posisi absolut yang kompleks.

---

# Reveal Animation

Gunakan class:

reveal-up

yang sudah tersedia pada project.

Aktivasi menggunakan Intersection Observer.

Jangan menggunakan library seperti AOS.

---

# Scroll Behavior

Scrolling harus terasa natural.

Gunakan:

scroll-behavior: smooth;

Progress indicator dapat menggunakan scroll progress sederhana.

---

# Assets

Semua asset dikelompokkan.

Jangan mencampur icon dengan ilustrasi.

Gunakan format SVG jika memungkinkan.

Gunakan WebP untuk gambar berukuran besar.

---

# Icons

Gunakan satu style icon yang konsisten.

Outline style.

Ukuran icon konsisten.

---

# Buttons

Gunakan satu komponen Button.

Button menerima props.

Contoh:

variant

size

icon

fullWidth

href

target

Semua button menggunakan komponen yang sama.

---

# Cards

Gunakan komponen Card.

Card menerima props.

title

description

icon

children

hover

Semua card menggunakan style yang konsisten.

---

# Journey Map

Journey tidak dibuat menggunakan gambar.

Gunakan HTML + CSS + SVG.

Timeline harus dapat di-maintain dengan mudah.

---

# Mission Slider

Mission Card dibuat dari array.

Gunakan horizontal scrolling.

Tambahkan snap scrolling agar nyaman digunakan pada mobile.

---

# FAQ

Gunakan Accordion.

State sederhana.

Tidak perlu library tambahan.

Hanya satu item terbuka pada satu waktu.

---

# CTA

CTA merupakan section terakhir.

Gunakan visual yang paling kuat.

Button register harus menjadi fokus utama.

---

# Accessibility

Gunakan semantic HTML.

section

header

nav

main

footer

button

article

Semua gambar wajib memiliki alt text.

Gunakan heading secara berurutan.

---

# Performance

Prioritaskan:

* Lazy loading image
* SVG
* CSS animation
* Memoization jika diperlukan
* Intersection Observer

Hindari dependency yang tidak diperlukan.

Landing page harus ringan.

---

# Clean Code

Komponen maksimal berisi satu tanggung jawab.

Pisahkan logika ke dalam hooks apabila mulai kompleks.

Jangan membuat file dengan panjang ratusan baris apabila dapat dipisahkan.

---

# State Management

Landing page bersifat statis.

Gunakan React state seperlunya.

Tidak perlu Redux maupun Context API kecuali benar-benar dibutuhkan.

---

# Reusable Hooks

Buat custom hook apabila logika digunakan lebih dari satu kali.

Contoh:

useReveal()

useScrollProgress()

useParallax()

Hook harus sederhana dan mudah dipahami.

---

# Folder Data

Semua data yang berpotensi berubah harus berada pada folder data.

Dengan demikian konten dapat diperbarui tanpa mengubah struktur komponen.

---

# SEO

Tambahkan:

title

meta description

Open Graph image

favicon

Semantic heading

Gunakan struktur heading yang baik.

---

# Coding Style

Gunakan kode yang mudah dibaca.

Prioritaskan:

Konsistensi

Kejelasan

Kesederhanaan

Daripada optimasi berlebihan.

---

# AI Implementation Rules

Saat mengimplementasikan halaman, AI Agent harus mengikuti urutan berikut:

1. Membangun struktur project.
2. Membuat reusable components.
3. Menyusun layout dasar.
4. Mengimplementasikan setiap section sesuai `plan.md`.
5. Mengikuti seluruh aturan visual pada `design-system.md`.
6. Menambahkan animasi setelah layout selesai.
7. Memastikan responsivitas.
8. Melakukan optimasi performa.
9. Melakukan review aksesibilitas.
10. Melakukan refactoring apabila terdapat kode yang berulang.

AI Agent **tidak diperbolehkan** mengubah urutan section, filosofi storytelling, maupun identitas visual yang telah ditentukan pada dokumen lain tanpa alasan yang jelas.

---

# Definition of Done

Implementasi dianggap selesai apabila memenuhi seluruh kriteria berikut:

* Seluruh section pada `plan.md` telah diimplementasikan.
* Seluruh aturan visual pada `design-system.md` diterapkan secara konsisten.
* Layout responsif pada mobile, tablet, dan desktop.
* Tidak terdapat komponen dengan styling yang berulang.
* Semua data statis dipisahkan ke folder `data`.
* Seluruh komponen reusable.
* Tidak menggunakan library yang tidak diperlukan.
* Performa halaman tetap ringan.
* Kode mudah dipahami dan dikembangkan di masa depan.

---

# Final Notes

Landing page ini bukan sekadar proyek frontend.

Website ini merupakan representasi digital dari identitas English Club UTB dan filosofi **ROOTS & SHOOTS**.

Seluruh implementasi harus menjaga keseimbangan antara desain, pengalaman pengguna, performa, dan kualitas kode.

Fokus utama bukan membuat website yang ramai, tetapi menciptakan pengalaman yang sederhana, modern, dan bermakna sehingga setiap pengunjung merasa bahwa mereka sedang memulai sebuah perjalanan baru bersama English Club.
