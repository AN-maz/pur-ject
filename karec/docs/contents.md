# Konten Per Section — Banquet Under Horizon 2026

Landing page **English Club UTB** — `Banquet Under Horizon 2026`, tema **ROOTS & SHOOTS: Cultivating Unity Under The Open Sky**. Konsep UI: *quest/game campaign* (XP, level, quest, guild, checkpoint, badge).

Order section sesuai `src/pages/Home.jsx`.

---

## 1. Hero — `src/components/hero/Hero.jsx`

- Badge header:
  - `★ NEW SEASON: 2026`
  - `🎮 Level Up Your English Skills`
- Teks backdrop besar: **BANQUET HORIZON**
- Karakter perempuan (`/cewe.png`) dengan speech bubble *"Ready for the quest?" 👋*
- Floating badge samping karakter:
  - Kiri: `🗺️ 5 Active Quests — Ready to play`
  - Kanan: `⭐️ Level 1 Explorer — 25 / 100 XP`
- H1: **BANQUET UNDER HORIZON 2026**
- Deskripsi: *Cultivating Unity Under The Open Sky. Selesaikan misi interaktif, kumpulkan XP, buka achievement badge, dan tingkatkan level skill Bahasa Inggris kamu bersama English Club UTB!*
- CTA buttons:
  - `Start The Quest 🚀` → `#register`
  - `Learn More` → `#about`
- Visual: retro dot grid, emoji melayang (⭐️🚀🎮🏆), glow aura.

---

## 2. Why English Club — `WhyEnglishClub.jsx`

Badge: `✨ GUILD ADVANTAGES`. Title: **More Than Just Learning English**. Subtitle: *"English Club bukan hanya tempat belajar grammar atau vocabulary"*. Karakter + speech bubble *"Why join our Guild? 🎓"*, badge *Guild Guide — Interactive Learning*.

3 kartu keuntungan:
| # | Title | Deskripsi | Icon |
|---|-------|-----------|------|
| 01 | Global Opportunity | Mengenal kesempatan yang dapat membuka wawasan lebih luas. | 🌍 |
| 02 | Supportive Community | Bertemu teman yang memiliki tujuan berkembang bersama. | 🤝 |
| 03 | Personal Growth | Meningkatkan confidence, communication skill, dan leadership. | 🌱 |

---

## 3. Why This Event — `WhyThisEvent.jsx`

Badge: `🎯 QUEST PURPOSE`. Title: **Why This Quest Exists**.

Deskripsi: *Semester break bukan hanya waktu untuk beristirahat. Ini adalah kesempatan emas untuk mengenal orang baru, menemukan lingkungan baru, dan mencoba pengalaman berharga bersama!*

4 pillar cards (mengapit karakter utama):
- **Pillar 01 — Meet** 🤝 ─ Bertemu orang baru dan memperluas koneksi
- **Pillar 02 — Connect** 🔗 ─ Mengenal keluarga besar English Club
- **Pillar 03 — Learn** 📚 ─ Mencoba pengalaman baru yang berharga
- **Pillar 04 — Grow** 🌱 ─ Memulai perjalanan perkembangan diri

Tengah: karakter (`/cewe.png`) + badge `🏆 4 Quest Pillars`, ring orbit animasi.

---

## 4. Journey Map — `JourneyMap.jsx`

Badge retro: `🗺️ QUEST ROADMAP`. Title: **Your Journey Awaits**. Deskripsi: *Ikuti alur perjalanan dari gerbang awal hingga garis akhir. Setiap checkpoint menyimpan pengalaman seru yang siap kamu jelajahi!*

Badge atas: `🚀 START YOUR QUEST`. Timeline zig-zag 7 checkpoint (jam + judul + deskripsi):

| # | Waktu | Title | Deskripsi |
|---|-------|-------|-----------|
| 01 | 08:00 | Gathering Point | Peserta berkumpul di kampus sebelum menuju lokasi |
| 02 | 09:00 | Opening | Sambutan dan pengenalan acara |
| 03 | 09:30 | Ice Breaking | Peserta mulai mengenal satu sama lain |
| 04 | 10:30 | Mission Games | Berbagai aktivitas dan tantangan menarik |
| 05 | 14:00 | Reflection | Review pengalaman kegiatan |
| 06 | 15:00 | Member Oath | Pengesahan anggota baru melalui pembacaan ikrar |
| 07 | 16:00 | New Beginning | Perjalanan baru dimulai |

Badge bawah: `🏆 QUEST COMPLETED & CELEBRATION!`

---

## 5. Mission Preview — `MissionPreview.jsx`

Badge: `QUEST BOARD` (pill, melintas di atas section). Title: **Mission Preview**. Subtitle: *"Setiap quest memiliki hadiah XP dan difficulty sendiri"*. Horizontal scroll 5 kartu misi:

| No | Mission | Focus Skill | Deskripsi | Reward | Difficulty |
|----|---------|-------------|-----------|--------|------------|
| 01 | Impostor Between Us | Communication, Observation, Trust | Build your communication skills while finding the impostor among us. | +200 XP | Easy |
| 02 | English Area | Confidence, Speaking Practice, Expression | Practice speaking English in a supportive and fun environment. | +250 XP | Easy |
| 03 | Leadership Challenge | Teamwork, Problem Solving, Leadership | Work together to overcome challenges and develop leadership skills. | +300 XP | Medium |
| 04 | Scavenger Hunt | Collaboration, Creativity, Strategy | Explore and strategize with your team to complete the hunt. | +350 XP | Hard |
| 05 | Werewolf | Analysis, Decision Making, Communication | Use logic and communication to survive the night. | +400 XP | Hard |

Footer: *Scroll untuk mengetahui semua quest*.

---

## 6. Beyond The Classroom — `BeyondClassroom.jsx`

Badge: `UNLIMITED OPPORTUNITIES`. Title: **English Opens More Than Conversations**. Subtitle: *"Bahasa Inggris membuka kesempatan, pengalaman, koneksi, dan perjalanan baru"*.

Slider horizontal dengan tombol panah (← →) — 4 kartu peluang:

| # | Title | Deskripsi |
|---|-------|-----------|
| 01 | International Delegate | Anggota English Club yang mendapatkan kesempatan menjadi delegasi dalam kegiatan internasional. |
| 02 | International Liaison Officer | Anggota yang mendapatkan pengalaman menjadi penghubung komunikasi dengan pihak internasional. |
| 03 | Communication Experience | Pengalaman menggunakan bahasa Inggris dalam situasi nyata. |
| 04 | Leadership Journey | Kesempatan berkembang melalui organisasi dan kepanitiaan. |

Footer: *"English Club menjadi tempat yang membuka kemungkinan tersebut."*

---

## 7. Member Stories — `MemberStories.jsx`

Title: **Our Members, Their Stories**. Subtitle: *"Fokus pada cerita individu"*. 3 kartu testimoni member:

| Nama | Role | Quote |
|------|------|-------|
| Member Name | International Delegate | "English Club gave me the confidence to communicate beyond campus." |
| Member Name | Liaison Officer | "I found more than just language skills, I found a community." |
| Member Name | Active Member | "Every meeting became a stepping stone for my personal growth." |

Footer: *Mungkin aku juga bisa berkembang seperti mereka.*

---

## 8. Journey Roadmap — `JourneyRoadmap.jsx`

Badge: `PATHWAY TO EXCELLENCE`. Title: **Where Can This Journey Take You?**. Subtitle: *"Menunjukkan kemungkinan perjalanan anggota selama berada di English Club"*. Deskripsi: *Setiap langkah dirancang untuk mengasah keberanian, jaringan, dan kepemimpinan dalam lingkungan yang suportif.*

Stepper vertikal 7 stage (node `LVL 01–07`):

| Stage | Langkah |
|-------|---------|
| STAGE 01 | Join English Club 🚪 |
| STAGE 02 | Meet New Friends 👥 |
| STAGE 03 | Build Confidence 💪 |
| STAGE 04 | Become Active Member ⭐ |
| STAGE 05 | Join Organization Experience 📋 |
| STAGE 06 | Take New Opportunities 🎯 |
| STAGE 07 | Create Your Own Story 📖 |

Catatan akhir: **QUEST OBJECTIVE NOTE** — *"Fokus pada kesempatan berkembang dan eksplorasi potensi diri, bukan menjanjikan hasil instan tertentu."*

---

## 9. Community Stories — `CommunityStories.jsx`

Title: **Community Stories**. 3 kartu testimoni komunitas (anonym):

1. "I joined because I wanted to improve my English. I stayed because I found a community."
2. "English Club taught me that language is not a barrier, it's a bridge."
3. "The best decision I made in university was joining English Club."

---

## 10. Memory Capsule — `MemoryCapsule.jsx`

Badge: `TIME CAPSULE PROJECT`. Title: **Memory Capsule**. Subtitle: *"Menjadi bagian emosional dan penuh makna dari perjalanan organisasi"*.

Kartu besar — visual amplop tersegel (SEALED) dengan ring berputar + badge `CLASSIFIED MEMORY`.
Header: **SPECIAL EXECUTIVE MISSION — A Letter To Your Future Self**.

2 step:
- **01** — Setiap peserta akan menulis surat harapan, mimpi, dan pesan khusus untuk dirinya sendiri.
- **02** — Surat akan disegel dan dikembalikan secara emosional pada akhir masa kepengurusan.

Quote penutup: *"A small letter today. A timeless memory from your journey tomorrow."*

---

## 11. Event Information — `EventInformation.jsx`

Title: **Event Information**. Panel detail + CTA:

| Label | Value |
|-------|-------|
| Event | Banquet Under Horizon 2026 |
| Theme | ROOTS & SHOOTS |
| Date | 14 July 2026 |
| Location | Batununggal |
| Meeting Point | Universitas Teknologi Bandung |
| HTM | Rp12.000 |

CTA: `Claim Your Spot - Only Rp12.000 🎮` → `#register`.

---

## 12. FAQ — `FAQ.jsx`

Badge: `TIME CAPSULE SUPPORT` (info ikon). Title: **FAQ**. Subtitle: *"Pertanyaan yang sering ditanyakan"*. List header: `CRAFTING MEANINGFUL JOURNEYS`.

Diapit 2 karakter: kiri **GUIDE ACCOMPANIST** ("Here are some common quest queries, buddy! Ready to guide you?"), kanan **EXPLORER BUDDY** ("Level Up Your Knowledge! Ask anything, I'm with you!").

Accordion 5 pertanyaan (1 terbuka dalam satu waktu):
1. **Aku belum lancar bahasa Inggris, apakah tetap bisa ikut?** — Tentu bisa. English Club adalah tempat untuk belajar dan berkembang bersama. Kegiatan ini bukan hanya untuk orang yang sudah mahir berbahasa Inggris, tetapi untuk siapa saja yang ingin meningkatkan kemampuan dan kepercayaan diri.
2. **Apakah harus datang bersama teman?** — Tidak perlu. Salah satu tujuan kegiatan ini adalah mempertemukan anggota baru dengan teman-teman baru dalam lingkungan English Club.
3. **Apa yang harus dipersiapkan?** — Persiapkan pakaian yang nyaman untuk kegiatan outdoor, semangat untuk berkenalan, dan kesiapan mengikuti berbagai aktivitas.
4. **Apakah kegiatan ini wajib?** — Kegiatan ini merupakan bagian dari proses kaderisasi dan menjadi salah satu langkah awal untuk menjadi anggota aktif English Club UTB.
5. **Apa yang akan aku dapatkan setelah mengikuti kegiatan ini?** — Kamu akan mendapatkan pengalaman baru, mengenal anggota English Club lebih dekat, serta menjadi bagian dari komunitas yang terus berkembang bersama.

---

## 13. Final CTA — `FinalCTA.jsx`

Badge: `FINAL QUEST • REGISTRATION`. Diapit karakter kiri (`/cewe.png`, *"Ready for the quest?"*, badge `LEVEL 1 EXPLORER`) dan kanan (`/cewe2.png`, *"Level Up Your Skills!"*, badge `5 ACTIVE QUESTS`).

- H2: **Ready To Start The Quest?**
- Sub: *Every great journey begins with one small step.*
- Deskripsi: *Kumpulkan XP, naikkan level, dan berkembang bersama komunitas English Club UTB.*
- CTA:
  - `JOIN THE QUEST` (merah) → `#`
  - `QUEST BOARD` (biru) → `#event`
- Server bar bawah: `Registration Open • Join The Quest Today` + badge `ONLINE`.

---

## Layout & Pendukung

### Navbar — `Navbar.jsx`
- Logo English Club UTB (`nav-logo.png`) dalam frame emas 3D.
- Links: **Home** (`#hero`), **About** (`#about`), **Quests** (`#event`), **FAQ** (`#faq`).
- CTA: `Register Now` (`#register`).
- Indikator scroll progress (gradient gold-red) di bawah navbar.
- Mobile: hamburger menu fullscreen overlay.

### Footer — `Footer.jsx`
- Brand: **Banquet Under Horizon 2026** + tagline *Cultivating Unity Under The Open Sky*.
- Deskripsi: *Selesaikan misi, kumpulkan XP, taklukkan grammar! Bergabunglah dalam petualangan seru bersama English Club UTB.*
- **Fast Travel**: More Than Learning (`#about`), Quest Board (`#event`), Guild Support (`#faq`).
- **Guild Contact**: Universitas Teknologi Bandung, englishclub@utb.ac.id, 14 July 2026.
- Bottom: `MISSION LOG © 2026 ENGLISH CLUB UTB` + tombol `BACK TO TOP`.

### BackgroundDecoration — `BackgroundDecoration.jsx`
- 3 blob glow biru/merah/amber (fixed) + overlay noise SVG (fractalNoise, opacity rendah).

---

## Data Files (`src/data/`)
- `event.js` — `eventInfo` (nama, tema, subtitle, tanggal, lokasi, meeting point, harga, link registrasi) + `whyEnglishClub` (3 items).
- `missions.js` — `missions` (5 quest: title, focus skill, description, reward XP, difficulty).
- `timeline.js` — `timeline` (7 checkpoint jalan/jam).
- `stories.js` — `opportunities` (4), `memberStories` (3), `journeyRoadmap` (7), `testimonials` (3).
- `faq.js` — `faqs` (5 Q&A).

## Visual Identity
- Warna: EC Blue `#001452`, EC Navy `#000d36`, EC Card `#001a66`, EC Red `#D81B2B`, EC Iron `#91121d`, EC Gold `#FBBF24`.
- Font: Inter (Google Fonts).
- Gaya: retro grid, glow orb, kartu 3D border-bottom tebal, badge skew (`-skew-x-12`), animasi reveal-up, float, pulse.