    src/
    ├── assets/
    │   └── styles/
    │       ├── base/            <-- Reset dan setting global
    │       │   ├── reset.css     <-- Margin/padding 0 untuk semua browser
    │       │   └── variables.css <-- Tempat simpan warna (CSS Variables)
    │       ├── components/      <-- Styling untuk bagian kecil/spesifik
    │       │   ├── button.css    <-- Semua style tombol
    │       │   ├── card.css      <-- Style untuk container kartu/box
    │       │   └── navbar.css    
    │       ├── layouts/         <-- Struktur besar halaman
    │       │   ├── grid.css      <-- Pengaturan display grid/flex
    │       │   └── header.css
    │       └── main.css         <-- File utama yang meng-import semuanya


--- 
## Package dari luar 

- `express` : Framework untuk bikin API.
- `mysql2`  : Driver untuk koneksi ke database MySQL kamu.
- `cors`    : Supaya Frontend (Vite) diizinkan mengambil data dari Backend (Express).
- `dotenv`  : Untuk mengamankan konfigurasi database.