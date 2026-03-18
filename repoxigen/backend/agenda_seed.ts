import { prisma } from './lib/prisma';

async function main() {
  console.log('📅 Memulai proses seeding data Agenda...');

  // 1. Ambil ID Divisi dari database berdasarkan kode
  const divSFT = await prisma.divisi.findUnique({ where: { kode: 'SFT' } });
  const divHRD = await prisma.divisi.findUnique({ where: { kode: 'HRD' } });
  const divGAM = await prisma.divisi.findUnique({ where: { kode: 'GAM' } });

  if (!divSFT || !divHRD || !divGAM) {
    throw new Error('Divisi SFT, HRD, atau GAM tidak ditemukan. Pastikan seed divisi & user sudah dijalankan!');
  }

  // 2. Ambil 1 User per divisi untuk dijadikan pembuat agenda (created_by)
  const userSFT = await prisma.users.findFirst({ where: { divisi_peminatan_id: divSFT.id_divisi } });
  const userHRD = await prisma.users.findFirst({ where: { divisi_peminatan_id: divHRD.id_divisi } });
  const userGAM = await prisma.users.findFirst({ where: { divisi_peminatan_id: divGAM.id_divisi } });

  if (!userSFT || !userHRD || !userGAM) {
    throw new Error('Belum ada user di salah satu divisi untuk dijadikan pembuat agenda!');
  }

  // 3. Data Dummy Agenda
  const agendas = [
    // --- AGENDA SOFTWARE (SFT) ---
    {
      judul: 'Workshop React.js Fundamental',
      deskripsi: 'Belajar dasar-dasar komponen, props, dan state pada React.',
      id_divisi: divSFT.id_divisi,
      kategori: 'pelatihan',
      tanggal: new Date('2026-03-01T09:00:00Z'),
      lokasi: 'Lab Komputer A',
      token_absen: 'REACT01',
      is_absen_open: true,
      konten_materi: '# React JS Fundamental\n\nReact adalah library JavaScript untuk membangun antarmuka pengguna.\n\n## Materi:\n- JSX\n- Components\n- Hooks (useState, useEffect)',
      created_by: userSFT.id_akun,
    },
    {
      judul: 'API Design dengan Express',
      deskripsi: 'Membuat RESTful API sederhana menggunakan Node.js dan Express.',
      id_divisi: divSFT.id_divisi,
      kategori: 'pelatihan',
      tanggal: new Date('2026-03-08T13:00:00Z'),
      lokasi: 'Lab Komputer B',
      token_absen: 'EXPRES',
      is_absen_open: true,
      konten_materi: '# REST API\n\nMemahami *Request* dan *Response* di arsitektur REST.\n\n```javascript\napp.get("/", (req, res) => res.send("Halo!"));\n```',
      created_by: userSFT.id_akun,
    },
    {
      judul: 'Tech Talk: Tailwind vs Bootstrap',
      deskripsi: 'Diskusi santai memilih framework CSS terbaik untuk project.',
      id_divisi: divSFT.id_divisi,
      kategori: 'sharing',
      tanggal: new Date('2026-03-15T15:30:00Z'),
      lokasi: 'Discord Voice Channel',
      token_absen: 'CSSWOW',
      is_absen_open: false, // Sudah ditutup
      konten_materi: 'Tidak ada modul. Sesi diskusi bebas.',
      created_by: userSFT.id_akun,
    },

    // --- AGENDA HARDWARE (HRD) ---
    {
      judul: 'Pengenalan Mikrokontroler ESP32',
      deskripsi: 'Belajar pinout, WiFi module, dan setup ESP32 di Arduino IDE.',
      id_divisi: divHRD.id_divisi,
      kategori: 'pelatihan',
      tanggal: new Date('2026-03-02T10:00:00Z'),
      lokasi: 'Lab Hardware Terpadu',
      token_absen: 'ESP32X',
      is_absen_open: true,
      konten_materi: '# Pengenalan ESP32\n\nESP32 sangat cocok untuk proyek IoT karena sudah memiliki WiFi dan Bluetooth bawaan.',
      created_by: userHRD.id_akun,
    },
    {
      judul: 'Solder Menyolder Dasar',
      deskripsi: 'Praktik menyolder komponen ke PCB bolong dengan rapi.',
      id_divisi: divHRD.id_divisi,
      kategori: 'pelatihan',
      tanggal: new Date('2026-03-09T09:00:00Z'),
      lokasi: 'Ruang Workshop',
      token_absen: 'SOLDER',
      is_absen_open: true,
      konten_materi: '# Teknik Solder\n\nPastikan memanaskan pad dan kaki komponen secara bersamaan sebelum memasukkan timah.',
      created_by: userHRD.id_akun,
    },
    {
      judul: 'Rapat Proyek Smart Trashbin',
      deskripsi: 'Pembagian tugas perakitan sensor ultrasonik dan motor servo.',
      id_divisi: divHRD.id_divisi,
      kategori: 'proyek',
      tanggal: new Date('2026-03-16T16:00:00Z'),
      lokasi: 'Basecamp',
      token_absen: 'TRASH1',
      is_absen_open: true,
      konten_materi: null,
      created_by: userHRD.id_akun,
    },

    // --- AGENDA GAME DEV (GAM) ---
    {
      judul: 'Basic Movement di Unity 2D',
      deskripsi: 'Membuat script Rigidbody2D untuk pergerakan karakter.',
      id_divisi: divGAM.id_divisi,
      kategori: 'pelatihan',
      tanggal: new Date('2026-03-05T19:00:00Z'),
      lokasi: 'Discord Voice Channel',
      token_absen: 'UNITY2',
      is_absen_open: true,
      konten_materi: '# Unity 2D Movement\n\nGunakan `Input.GetAxisRaw` untuk pergerakan yang lebih snappy di game 2D retro.',
      created_by: userGAM.id_akun,
    },
    {
      judul: 'Workshop Aseprite: Pixel Art Animation',
      deskripsi: 'Cara membuat animasi berjalan (walk cycle) 4 frame.',
      id_divisi: divGAM.id_divisi,
      kategori: 'pelatihan',
      tanggal: new Date('2026-03-12T14:00:00Z'),
      lokasi: 'Lab Multimedia',
      token_absen: 'PIXELX',
      is_absen_open: true,
      konten_materi: '# Walk Cycle Basics\n\nKunci utama: Contact, Recoil, Passing, dan High Point.',
      created_by: userGAM.id_akun,
    },
    {
      judul: 'Sharing Session: Game Design Document (GDD)',
      deskripsi: 'Cara menyusun GDD agar visi game jelas sebelum dikoding.',
      id_divisi: divGAM.id_divisi,
      kategori: 'sharing',
      tanggal: new Date('2026-03-19T16:00:00Z'),
      lokasi: 'Taman Kampus',
      token_absen: 'GDDYES',
      is_absen_open: false, // Sudah ditutup
      konten_materi: '# GDD Template\n\nHal yang wajib ada:\n1. Core Mechanics\n2. Art Style\n3. Target Audience',
      created_by: userGAM.id_akun,
    },
  ];

  // 4. Masukkan data ke Database
  for (const agenda of agendas) {
    await prisma.agenda.create({
      data: agenda,
    });
  }

  console.log('✅ 9 Agenda berhasil dibuat! (3 per divisi)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });