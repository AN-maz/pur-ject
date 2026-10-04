# PRD — Aplikasi Web Tes Psikologi (PsychometricApp)

## 1. Ringkasan Produk

Web app skrining psikologi mandiri berisi belasan instrumen psikometri (MMPI, PHQ-9, BDI, STEPI, Y-BOCS, MBTI, Big Five, DISC, Enneagram, dan 4 Tipe Kepribadian Klasik). Pengguna mengerjakan soal berbasis markdown, sistem menghitung skor lokal di browser, lalu menampilkan hasil + interpretasi.

Semua kalkulasi berjalan di sisi klien (client-side). Tidak ada server, tidak ada penyimpanan data pengguna — privasi terjaga.

## 2. Tujuan & Sasaran

- Menyediakan akses cepat dan gratis ke instrumen psikometri populer.
- Skor awal + ringkasan interpretasi sebagai bahan edukasi, **bukan diagnosis medis**.
- Proses tes dictiempatkan sesingkat mungkin: pilih tes → jawab → lihat hasil.

## 3. Teknologi

| Lapisan | Teknologi |
|---|---|
| Framework | React 19 + Vite |
| Routing | react-router-dom |
| Markdown | react-markdown + gray-matter |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Ikon | lucide-react |

## 4. Arsitektur File

```
client/
├─ index.html
├─ src/
│  ├─ main.jsx                  # entry point
│  ├─ App.jsx                   # router + navbar + selector tema
│  ├─ index.css                 # Tailwind + 3 palet warna (CSS variables)
│  ├─ content/                  # SATU FILE MARKDOWN PER TES
│  │  ├─ phq-9.md
│  │  ├─ mmpi.md
│  │  ├─ bdi.md
│  │  ├─ stepi.md
│  │  ├─ ybocs.md
│  │  ├─ mbti.md
│  │  ├─ bigfive.md
│  │  ├─ disc.md
│  │  ├─ enneagram.md
│  │  └─ four-temperaments.md
│  ├─ pages/
│  │  ├─ LandingPage.jsx        # landing page
│  │  ├─ MenuPage.jsx           # menu daftar tes + filter kategori
│  │  ├─ TestPage.jsx           # halaman pengerjaan tes
│  │  └─ ResultPage.jsx         # halaman hasil + interpretasi
│  └─ utils/
│     └─ mdParser.js            # loader markdown via import.meta.glob
```

### 4.1 Aturan Satu File Per Tes

- File disimpan di `src/content/[id].md`.
- `id` di frontmatter Wajib sama dengan nama file (dipakai route `/test/:testId`).
- Menambah tes baru = cukup menambah satu file `.md`, tanpa ubah kode (mekanisme `import.meta.glob`).
- Format umum block MDX/Component tidak diperlukan — cukup markdown murni + frontmatter.

## 5. Spec Format File Markdown

```markdown
---
id: phq-9
title: Patient Health Questionnaire-9 (PHQ-9)
category: Kesehatan Mental        # "Kesehatan Mental" | "Tipe Kepribadian"
type: score                       # score (skor total) | personality (tipe/huruf)
description: Deskripsi singkat tes.
options:
  - label: Tidak pernah
    score: 0
  - label: Beberapa hari
    score: 1
  - label: Lebih dari separuh hari
    score: 2
  - label: Hampir setiap hari
    score: 3
scoring:
  levels:
    - min: 0
      max: 4
      label: Depresi minimal
      interpretation: |
        Teks interpretasi...
    - min: 5
      max: 9
      label: Depresi ringan
      interpretation: |
        Teks interpretasi...
---

### Petunjuk Pengisian
Pilih jawaban yang paling mencerminkan kondisi Anda ...

1. Kurang berminat atau tidak ada kesenangan dalam melakukan sesuatu.
2. Merasa murung, muram, atau putus asa.
...
```

### 5.1 Frontmatter Fields

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `id` | string | ya | Slug tes, sama dengan nama file |
| `title` | string | ya | Nama lengkap tes |
| `category` | string | ya | `Kesehatan Mental` / `Tipe Kepribadian` |
| `description` | string | ya | Satu kalimat deskripsi untuk kartu menu |
| `options` | array | ya | Opsi jawaban; `label` + `score` |
| `type` | string | opsional | `score` (default) atau `personality` |
| `scoring` | object | opsional | ^Level interpretasi skor (rentang + label + teks) |
| `interpretation` | object | opsional | ^Mapping hasil tipe → deskripsi (untuk MBTI dsb.) |

^Jika `scoring` kosong: hasil cukup tampilkan total skor apa adanya.

### 5.2 Body Markdown

- Bagian awal body bisa berisi instruksi via heading `###`.
- Soal ditulis sebagai **numbered list** — tiap item diparse sebagai 1 pertanyaan.
- Rendering instruksi/petunjuk tetap pakai `react-markdown` (requirement user).

## 6. Halaman

### 6.1 Landing Page (`/`)
- Hero + deskripsi + CTA "Mulai Tes Sekarang".
- Kartu fitur (Instrumen Standar, Privasi Terjaga, Hasil Instant).

### 6.2 Menu Tes (`/menu`)
- Daftar semua tes sebagai kartu (dibaca dari semua file `.md`).
- Filter kategori: Semua / Kesehatan Mental / Tipe Kepribadian.

### 6.3 Halaman Tes (`/test/:testId`)
- Mengambil file via `getTestById(testId)`.
- Petunjuk dirender dari `rawContent` dengan `react-markdown`.
- Soal ditampilkan satu per satu (atau bertahap); tiap soal + daftar tombol opsi dari frontmatter `options`.
- Jawaban tersimpan di state `{ indexSoal: score }`.
- Validasi: semua soal harus terjawab sebelum "Lihat Hasil".
- Tombol navigasi Soal Sebelumnya / Berikutnya.

### 6.4 Halaman Hasil (`/result/:testId`)
- Menerima state: total skor, metadata, (dan results per tipe untuk MBTI).
- Tampilkan skor total, label level, ringkasan interpretasi.
- Disclaimer edukasi: bukan alat diagnosis medis; sarankan konsultasi profesional bila perlu.
- Tombol "Ulangi Tes" dan "Kembali ke Menu".

## 7. Daftar Tes (Phase 1)

| file | Tes | Kategori | Jml Soal |
|---|---|---|---|
| `phq-9.md` | PHQ-9 | Kesehatan Mental | 9 |
| `mmpi.md` | MMPI (versi ringkas) | Kesehatan Mental | — |
| `bdi.md` | BDI | Kesehatan Mental | 21 |
| `stepi.md` | STEPI | Kesehatan Mental | 17 |
| `ybocs.md` | Y-BOCS | Kesehatan Mental | 10 |
| `mbti.md` | MBTI | Tipe Kepribadian | — |
| `bigfive.md` | Big Five | Tipe Kepribadian | — |
| `disc.md` | DISC | Tipe Kepribadian | — |
| `enneagram.md` | Enneagram | Tipe Kepribadian | 9 tipe |
| `four-temperaments.md` | 4 Tipe Kepribadian Klasik | Tipe Kepribadian | — |

Catatan: MMPI asli punya ratusan soal & butuh lisensi ahli — deploy versi **edukasi ringkas** dan cantumkan disclaimer, bukan instrumen clinical-grade.

## 8. Tiga Referensi Tema Warna

Tema dikelola via CSS variables di `src/index.css`, diaktifkan dengan atribut `data-theme` + selector tema di navbar.

### Tema 1 — Serene & Mindful (Teal/Emerald) — default
| Var | Nilai | Tailwind setara |
|---|---|---|
| primary | `#0d9488` | teal-600 |
| primary-hover | `#0f766e` | teal-700 |
| primary-light | `#ccfbf1` | teal-100 |
| accent | `#10b981` | emerald-500 |
| bg | `#f8fafc` | slate-50 |
| text-main | `#0f172a` | slate-900 |
| text-muted | `#64748b` | slate-500 |
| border | `#e2e8f0` | slate-200 |

### Tema 2 — Warm & Empathetic (Indigo/Rose)
| Var | Nilai | Tailwind setara |
|---|---|---|
| primary | `#4f46e5` | indigo-600 |
| primary-hover | `#4338ca` | indigo-700 |
| primary-light | `#e0e7ff` | indigo-100 |
| accent | `#f43f5e` | rose-500 |
| bg | `#fafaf9` | stone-50 |
| text-main | `#18181b` | zinc-900 |
| text-muted | `#71717a` | zinc-500 |
| border | `#e4e4e7` | zinc-200 |

### Tema 3 — Modern Clinical (Sky Blue/Violet)
| Var | Nilai | Tailwind setara |
|---|---|---|
| primary | `#0284c7` | sky-600 |
| primary-hover | `#0369a1` | sky-700 |
| primary-light | `#e0f2fe` | sky-100 |
| accent | `#7c3aed` | violet-600 |
| bg | `#f9fafb` | gray-50 |
| text-main | `#111827` | gray-900 |
| text-muted | `#6b7280` | gray-500 |
| border | `#e5e7eb` | gray-200 |

Ketiga palet sudah terpasang di `client/src/index.css`.

## 9. Mekanisme Skoring

Tipe `score`:
- Jumlahkan semua `score` jawaban terpilih → total skor.
- Cari level di `scoring.levels` di mana `min <= total <= max` → tampilkan label + interpretasi.

Tipe `personality` (MBTI, DISC, dll.):
- Jawaban dikelompokkan per dimensi (label opsi bisa bernilai `-2..2`, atau opsi per-kutub).
- Total per dimensi menentukan kutub dominan; kombinasi kutub membentuk tipe akhir (mis. INTJ).
- Interpretasi tipe dibaca dari frontmatter `interpretation`.

## 10. Non-Fungsional

- **Privasi**: tidak ada server / localStorage opsional; semua state di memory.
- **Responsif**: layout mobile-first, Tailwind.
- **A11y**: kontras cukup, tombol berlabel jelas, navigasi keyboard.
- **Performance**: load markdown eager via `import.meta.glob` — file kecil, aman.

## 11. Disclaimer

Aplikasi ini untuk tujuan edukasi & skrining mandiri. Hasil BUKAN diagnosis medis/psikologis. Untuk masalah kesehatan mental, hubungi profesional (psikolog/psikiater).

## 12. Roadmap

1. **Phase 1 (inti)**: sistem markdown + 4 halaman + 2-3 tes contoh (PHQ-9, MBTI).
2. **Phase 2**: lengkapi 10 file tes + mekanisme skoring tipe `score` & `personality`.
3. **Phase 3**: polish (progres bar, history jawaban, export hasil PDF, dark mode).