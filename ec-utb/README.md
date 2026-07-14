# English Club UTB - Landing Page

Website resmi English Club Universitas Teknologi Bandung yang dibangun dengan React, Vite, dan Tailwind CSS. Landing page ini menampilkan informasi lengkap tentang organisasi, berita terkini, struktur kepengurusan, serta berbagai program dan kegiatan English Club UTB.

## ✨ Fitur Utama

- **Multi-Page Navigation**: Navigasi lengkap dengan halaman Home, About, News, dan detail pages
- **Dynamic News System**: Sistem berita dinamis dengan detail page dan slug-based routing
- **Organization Structure**: Tampilan struktur organisasi BPH yang interaktif
- **Recruitment System**: Halaman khusus untuk open recruitment BPH dan volunteer event
- **Smooth Animations**: Animasi halus menggunakan Framer Motion dan scroll-based reveals
- **Responsive Design**: Tampilan optimal di semua ukuran layar dengan Tailwind CSS
- **Theme Context**: Sistem manajemen tema yang fleksibel
- **SEO-Friendly**: Routing berbasis slug untuk optimasi mesin pencari

## 📋 Prasyarat

Pastikan sistem anda sudah terinstal:

- **Node.js** (versi 18.x atau lebih tinggi)
- **npm** atau **yarn** sebagai package manager
- **OpenCode CLI** (opsional, untuk development workflow yang lebih efisien)

## 🚀 Panduan Memulai

### Installation

Clone repository dan install dependencies:

```bash
# Clone repository
git clone <repository-url>
cd ec-utb

# Install dependencies
npm install
```

### Development Server

Jalankan development server dengan hot-reload:

```bash
npm run dev
```

Server akan berjalan di `http://localhost:5173` (port default Vite).

### Linting

Cek kualitas kode dengan ESLint:

```bash
npm run lint
```

### Preview Production Build

Preview hasil build production secara lokal:

```bash
npm run preview
```

## 📁 Struktur Folder

Berikut adalah penjelasan struktur folder utama dalam projek ini:

```
ec-utb/
├── public/                      # Static assets
│   ├── English Club Logo.png   # Logo organisasi
│   └── images/                 # Folder gambar publik
│
├── src/                        # Source code utama
│   ├── app/                    # Konfigurasi aplikasi
│   │   └── router.jsx          # React Router configuration
│   │
│   ├── assets/                 # Assets internal (images, icons, dll)
│   │
│   ├── components/             # Komponen React
│   │   ├── layout/             # Layout components (Navbar, Footer, RootLayout)
│   │   └── sections/           # Section components per halaman
│   │       ├── about/          # Sections untuk About page
│   │       └── home/           # Sections untuk Home page
│   │
│   ├── context/                # React Context API
│   │   └── Theme.context.js    # Theme context provider
│   │
│   ├── data/                   # Data JSON statis
│   │   ├── newsData.json       # Data berita
│   │   ├── oprecBphData.json   # Data open recruitment
│   │   ├── structureData.json  # Data struktur organisasi
│   │   └── volunteerEventData.json  # Data volunteer events
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── useRevealOnScroll.js  # Hook untuk scroll animations
│   │
│   ├── routes/                 # Halaman utama (Pages)
│   │   ├── Home.jsx            # Homepage
│   │   ├── About.jsx           # About page
│   │   ├── News.jsx            # News listing page
│   │   ├── NewsDetail.jsx      # News detail page
│   │   ├── StructureDetail.jsx # Organization structure detail
│   │   ├── OprecBph.jsx        # BPH recruitment page
│   │   └── VolunteerEvent.jsx  # Volunteer event page
│   │
│   ├── services/               # Service layer
│   │   └── contect.service.js  # Content management service
│   │
│   ├── styles/                 # Global styles
│   │
│   ├── App.jsx                 # Root component
│   └── main.jsx                # Entry point aplikasi
│
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
└── package.json                # Dependencies dan scripts
```

### 🔍 Penjelasan Folder Penting

| Folder | Deskripsi |
|--------|-----------|
| **`/src/routes`** | Berisi semua halaman utama aplikasi. Setiap file merepresentasikan satu route/page. |
| **`/src/components/sections`** | Komponen section yang digunakan untuk membangun setiap halaman. Terorganisir per page (home, about, dll). |
| **`/src/components/layout`** | Komponen layout global seperti Navbar, Footer, dan RootLayout yang digunakan di semua halaman. |
| **`/src/data`** | File JSON yang menyimpan data statis seperti berita, struktur organisasi, dan event. Memudahkan update konten tanpa mengubah kode. |
| **`/src/hooks`** | Custom React hooks untuk logic reusable, seperti `useRevealOnScroll` untuk animasi scroll. |
| **`/src/context`** | React Context untuk state management global (theme, dll). |
| **`/src/services`** | Service layer untuk mengatur business logic dan data fetching. |

## 🏗️ Tech Stack

- **React 19** - Library UI modern dengan JSX
- **Vite 8** - Build tool yang super cepat
- **React Router DOM v7** - Routing solution
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **ESLint** - Code linting

## 📦 Production Build

Untuk membuat production build yang siap di-deploy:

```bash
npm run build
```

Build output akan tersimpan di folder `dist/`. Folder ini berisi:
- HTML, CSS, dan JavaScript yang sudah diminify
- Assets yang sudah dioptimasi
- Source maps (opsional)

### Deploy ke Hosting

Setelah build berhasil, upload isi folder `dist/` ke hosting pilihan anda:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop folder `dist/` ke Netlify dashboard
- **GitHub Pages**: Push folder `dist/` ke branch `gh-pages`
- **Traditional Hosting**: Upload via FTP/SFTP

> **Catatan**: Pastikan server hosting mendukung SPA (Single Page Application) routing. Tambahkan rewrite rules jika diperlukan untuk React Router.

## 🛠️ Development dengan OpenCode CLI

Jika menggunakan OpenCode CLI, anda bisa memanfaatkan workflow automation:

```bash
# Jalankan dev server
opencode run dev

# Build production
opencode run build

# Linting
opencode run lint
```

## 📝 Update Konten

Untuk mengupdate konten website tanpa mengubah kode:

1. Edit file JSON di folder `/src/data/`
2. Update gambar di folder `/public/images/`
3. Refresh browser (development) atau build ulang (production)

Contoh update berita: edit `/src/data/newsData.json`

## 📄 License

Private project - English Club Universitas Teknologi Bandung

---

**Developed with ❤️ by English Club UTB Team**
