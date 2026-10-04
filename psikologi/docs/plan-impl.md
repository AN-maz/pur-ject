# Rencana Implementasi — PsychometricApp

Dokumen aksi: langkah yang harus dikerjakan, urut. Referensi: `docs/PRD.md`.

## Status Saat Ini

| Komponen | Status |
|---|---|
| Scaffold React + Vite + Tailwind v4 | ✅ |
| Landing Page / Menu Page | ✅ (berfungsi) |
| TestPage | ⚠️ render markdown mentah, belum interaktif |
| ResultPage | ❌ kosong |
| mdParser (`import.meta.glob`) | ✅ |
| File konten | hanya `phq.md`, `mbti.md` (format frontmatter lama) |
| 3 tema warna | ✅ di `index.css` |

## Fase 1 — Sistem Inti (prioritas)

1. **Update 2 file konten contoh dulu** — `content/phq.md` & `content/mbti.md` ikut spec PRD & 5.1: frontmatter `type`, `scoring`, `interpretation`; soal jadi numbered list. Ini jadi test case parser + halaman tes.
2. **Perluas `utils/mdParser.js`** — tambah fungsi parse soal dari numbered list di body markdown. Kembalikan `{ metadata, questions[], rawContent }`.
3. **Rewrite `pages/TestPage.jsx`** — pengerjaan per-pertanyaan:
   - Petunjuk dirender pakai react-markdown.
   - Daftar opsi dari frontmatter `options`.
   - Navigasi Sebelumnya / Berikutnya.
   - Validasi: semua soal terjawab sebelum "Lihat Hasil".
   - Kirim state ke ResultPage.
4. **Bangun `pages/ResultPage.jsx`**:
   - Hitung total skor dari jawaban.
   - Cari level di `scoring.levels` (`min <= total <= max`).
   - Tampilkan label + interpretasi.
   - Disclaimer edukasi (bukan diagnosis medis).
   - Tombol Ulangi Tes / Kembali ke Menu.
5. **Verify** — `npm run dev`, `npm run lint`, `npm run build`. Uji alur PHQ-9 & MBTI end-to-end.

## Fase 2 — Lengkapi Semua Tes

6. **Buat 8 file `.md`**:
   - `content/mmpi.md`
   - `content/bdi.md`
   - `content/stepi.md`
   - `content/ybocs.md`
   - `content/bigfive.md`
   - `content/disc.md`
   - `content/enneagram.md`
   - `content/four-temperaments.md`
7. **Skoring `personality`** untuk MBTI/DISC — grup jawaban per dimensi, tentukan kutub dominan, gabung jadi tipe akhir (mis. INTJ), baca interpretasi dari `interpretation`.

## Fase 3 — Polish

8. Progres bar, indikator soal aktif, konfirmasi sebelum kirim, tombol kembali konsisten, disclaimer di semua tes.

## Keputusan Terbuka

- **A:** Skoring tipe `score` dulu (PHQ-9, BDI, dll.), tunda typing `personality` ke Fase 2.
  **B:** Kerjakan `score` dan `personality` sekaligus.
- Konten soal/interpretasi 10 tes: isi draf standar oleh AI (bisa dimodifikasi) atau pakai konten milik user sendiri.