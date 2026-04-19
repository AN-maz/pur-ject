# Product Requirements Document (PRD) - English Flashcard & Quiz App

## 1. Ringkasan Proyek
Aplikasi ini adalah platform pembelajaran bahasa Inggris berbasis web untuk membantu pengguna menguasai 1000-2000 kata paling umum dari kamus pribadi. Aplikasi menggunakan metode Active Recall dengan sistem sesi (chunking) dan mendukung berbagai mode belajar yang dapat dikembangkan di masa depan (Scalable Game Modes).

## 2. Tujuan Utama
Mastery Focus: Memastikan pengguna benar-benar hafal melalui logika pengulangan (Salah = Ulang, Benar = Selesai).

Flexibility: Mempermudah pengelolaan data ribuan kata melalui import JSON massal.

Modular Architecture: Memungkinkan penambahan mode permainan baru tanpa merombak logika utama aplikasi.

Grammar Context: Memberikan pemahaman bentuk kata kerja (V1, V2, V3, V-ing) secara otomatis bagi kata tipe "Verb".

## 3. Fitur Utama
### 3.1. Manajemen Sesi (Chunking Logic)
- Custom Session Size: Sebelum mulai, user memilih beban belajar antara 10 hingga 50 kata per sesi.
- Session Queue: Aplikasi hanya menarik kata yang belum berstatus "Mastered".
- Completion Criteria: Sesi dianggap selesai hanya jika semua kata dalam antrean sudah dijawab "Benar" setidaknya satu kali.

### 3.2. Mode Belajar (Multi-Mode)
Sistem menggunakan Modular View untuk memfasilitasi berbagai metode:

- Mode Flashcard: * Depan: Menampilkan kata (V1).
- Belakang: Menampilkan arti, tipe kata, dan tabel perubahan bentuk (khusus verb).
- Evaluasi: User menentukan sendiri "Benar" atau "Salah".

- Mode Multiple Choice (Pilihan Ganda):
- Menampilkan 1 kata target dan 4 pilihan jawaban.
- Smart Distractors: 3 jawaban salah diambil secara acak dari database yang memiliki type yang sama (misal: sesama Verb atau sesama Adjective) agar kuis lebih menantang.

### 3.3. Logika Pengulangan Cerdas (Core Logic)
- Jika Salah: Kata tersebut dipindahkan ke urutan acak di sisa antrean kartu sesi tersebut agar muncul lagi nanti.
- Jika Benar: Kata dianggap "Mastered" untuk sesi tersebut, dihapus dari antrean aktif, dan status di database diperbarui secara permanen.

### 3.4. Manajemen Kata Kerja (Verbs Handling)
- Conditional Display: Jika type === "Verb", aplikasi wajib menampilkan tabel ekspansi:
- V1: Base Form
- V2: Past Simple
- V3: Past Participle
- V-ing: Gerund/Continuous
- Berlaku untuk kata kerja reguler maupun irreguler yang diinput melalui JSON.

### 3.5. Progress Tracking & Dashboard
- Doughnut Chart: Menampilkan persentase penguasaan kata (Mastered vs Learning).
- Daily Statistics: Menghitung jumlah kata yang berhasil diselesaikan pada hari tersebut.
- Visual Identity: Menggunakan brand colors: Navy (#001A57) untuk stabilitas/header dan Blue (#0051D2) untuk aksi utama/tombol.

### 4. Arsitektur Teknis
- Frontend: React.js dengan Vite.
- Styling: Tailwind CSS.
- Database Lokal: IndexedDB (via Dexie.js) untuk menampung ribuan kata secara aman di browser dengan kapasitas lebih besar dari LocalStorage.
- Modular Design: Logika antrean dipisahkan ke dalam Custom Hook (useSession), sehingga komponen UI mode (Flashcard/Quiz) hanya berfungsi sebagai penampil data.

### 5. Skema Data (JSON Structure)
Format lengkap untuk fitur Bulk Import:

JSON
[
  {
    "id": "u1",
    "word": "Go",
    "frequency": 1,
    "type": "Verb",
    "meaning": "Pergi",
    "forms": {
      "v1": "Go",
      "v2": "Went",
      "v3": "Gone",
      "v_ing": "Going"
    },
    "status": "new"
  },
  {
    "id": "u2",
    "word": "Diligent",
    "frequency": 150,
    "type": "Adjective",
    "meaning": "Rajin",
    "forms": null,
    "status": "mastered"
  }
]

### 6. Alur Pengguna (User Flow)
- Initial Setup: User mengimpor file JSON berisi daftar kata dari kamus buku ke dalam aplikasi.
- Dashboard: User melihat progres total dan menekan tombol "Mulai Sesi".
- Konfigurasi: User memilih jumlah kata (misal: 20) dan memilih mode (Flashcard atau Pilihan Ganda).
- Learning Loop: * User melihat soal/kata.
- User menjawab.
- Jika Salah, sistem menyisipkan kembali kata tersebut ke antrean sisa.
- Jika Benar, sistem menghapus kata dari antrean sesi dan mengupdate status database.
- Finish: Setelah antrean kosong (0), user melihat rangkuman hasil dan kembali ke Dashboard yang progresnya sudah terupdate.

### 7. Design System (Stitch MCP)
**Theme:** Light
**Typography:** Manrope (Headline), Inter (Body)
**Roundness:** 8px
**Primary Color:** #001452 (Scholar Navy)

**Design System Strategy: The Scholarly Perspective**

#### 1. Overview & Creative North Star: "The Academic Atelier"
This design system rejects the "toy-like" aesthetic common in gamified education. Instead, it embraces **The Academic Atelier**—a North Star that treats the learning process with editorial prestige and focused intent. 

We break the "template" look by moving away from rigid grids and boxy containment. We prioritize **intentional asymmetry**, where large-scale editorial typography (Manrope) sits in high contrast against functional UI elements (Inter). By utilizing layered surfaces, subtle "glass" overlays, and a strict "no-line" philosophy, the interface feels like a premium, physical workspace—a digital desk where knowledge is curated, not just consumed.

#### 2. Colors & Surface Philosophy
The palette is anchored in authoritative Navy and a high-energy "Oxford" Red. However, the sophistication lies in the neutral "Surface" tiers.

- **Primary / Header:** `primary_container` (#001452) — Use for deep immersion and navigational stability.
- **Accent / CTA:** `secondary` (#bb001e) — A refined red for "Aha!" moments and critical actions.
- **Surface:** `surface` (#f8f9fa) — The global canvas.
- **Interactive Layers:** `surface_container_lowest` (#ffffff) to `surface_container_highest` (#e1e3e4).

**The "No-Line" Rule**
Explicit Instruction: Do not use 1px solid borders to section content. Boundaries must be defined solely through background color shifts. For example, a card (`surface_container_lowest`) should sit on a section background (`surface_container_low`) to create a natural, borderless distinction.

**The "Glass & Gradient" Rule**
To elevate the app above "standard" UI, utilize **Glassmorphism** for floating elements (like Quiz HUDs). Use semi-transparent surface colors with a `backdrop-blur: 20px`. 
- Signature Texture: Apply a subtle linear gradient from `primary_container` (#001452) to `on_primary_fixed_variant` (#33437f) on main Action Buttons to give them a tactile, "weighted" feel.

#### 3. Typography: The Editorial Scale
We use a dual-font strategy to balance character with utility.

- **Display & Headlines (Manrope):** This is our "Academic" voice. Manrope’s geometric yet warm proportions provide an authoritative, editorial feel. 
    - *Usage:* Use `display-lg` for progress percentages and `headline-md` for flashcard terms.
- **Body & UI (Inter):** The workhorse. Inter provides maximum legibility for definitions, example sentences, and system labels.
    - *Usage:* Use `body-lg` for definitions and `label-md` for metadata.

**Key Rule:** Create "Negative Space Anchors" by pairing a `display-sm` headline with a significantly smaller `body-sm` description, leaving generous room between them to avoid visual clutter.

#### 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are forbidden. We convey hierarchy through **Tonal Layering** and **Ambient Light**.

- **The Layering Principle:** Stack your surfaces. A flashcard (`surface_container_lowest`) should feel "lifted" against the app background (`surface`) simply because it is lighter in tone.
- **Ambient Shadows:** For floating elements (like a "Correct Answer" modal), use an ultra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 20, 82, 0.06)`. Note the use of a Navy tint (`#001452`) rather than pure black to keep the shadow "in-system."
- **The Ghost Border:** If a separator is required for accessibility, use the `outline_variant` (#c6c5d1) at **15% opacity**. It should be felt, not seen.

#### 5. Signature Components

**The Study Flashcard**
- **Background:** `surface_container_lowest` (#ffffff).
- **Radius:** `xl` (1.5rem) for a friendly, modern feel.
- **Interaction:** No border. High-contrast Manrope `headline-lg` for the term.
- **Depth:** Use a subtle `surface_tint` (#4c5b99) at 5% opacity for a soft inner glow.

**Action Buttons (The "Weighted" CTA)**
- **Primary:** Gradient from `primary_container` to `on_primary_fixed_variant`. 
- **Radius:** `full` (pill shape).
- **Label:** Inter `title-sm`, uppercase with 0.05em letter spacing for an "official" look.

**The "Pulse" Doughnut Chart**
- **Base:** `surface_container_high` (#e7e8e9).
- **Progress:** `secondary` (#bb001e) for errors/to-do; `on_primary_container` (#7180c1) for mastered words.
- **Styling:** Use a thick stroke width (20% of diameter) with rounded caps. Place a `display-md` number in the center.

**Input Fields**
- **Surface:** `surface_container_low` (#f3f4f5).
- **Active State:** Change background to `surface_container_lowest` and add a "Ghost Border" of `primary` (#000000) at 10% opacity. No harsh outlines.

#### 6. Do’s and Don’ts

**Do**
- **Do** use `surface_container` tiers to create "islands" of content.
- **Do** lean into asymmetrical layouts (e.g., left-aligning headers while right-aligning data visualizations).
- **Do** use `secondary` (#bb001e) sparingly. It is a "surgical" color for high-importance feedback only.

**Don't**
- **Don't** use 1px solid lines for dividers. Use 16px or 24px of white space instead.
- **Don't** use pure black (#000000) for text. Use `on_surface` (#191c1d) to maintain a soft, premium readability.
- **Don't** use "Default" shadows. If an element doesn't look lifted through color alone, use an Ambient Shadow with a Navy tint.