import { prisma } from "./lib/prisma";
import { Faker, id_ID, en, base } from "@faker-js/faker";
import bcrypt from "bcrypt";

const faker = new Faker({ locale: [id_ID] });

async function main() {
  console.log("🌱 Memulai seeding database v2...");

  // 1. Reset Data (Opsional, biar bersih)
  // await prisma.absensi.deleteMany();
  // await prisma.agenda.deleteMany();
  // await prisma.users.deleteMany();
  // await prisma.akun.deleteMany();
  // await prisma.divisi.deleteMany();

  // 2. Setup Divisi (Master Data)
  console.log("🏗️ Membuat Divisi...");
  await prisma.divisi.createMany({
    data: [
      // Top Management
      {
        id_divisi: 1,
        nama_divisi: "Top Manajemen",
        kode: "TOP",
        kategori: "topman",
      },

      // Peminatan (Teknis)
      {
        id_divisi: 2,
        nama_divisi: "Divisi Software",
        kode: "SFT",
        kategori: "peminatan",
      },
      {
        id_divisi: 3,
        nama_divisi: "Divisi Hardware",
        kode: "HRD",
        kategori: "peminatan",
      },
      {
        id_divisi: 4,
        nama_divisi: "Divisi Game",
        kode: "GAM",
        kategori: "peminatan",
      },

      // Humaniora (Non-Teknis)
      {
        id_divisi: 5,
        nama_divisi: "Humaniora Internal",
        kode: "INT",
        kategori: "pendukung",
      },
      {
        id_divisi: 6,
        nama_divisi: "Humaniora External",
        kode: "EXT",
        kategori: "pendukung",
      },
      {
        id_divisi: 7,
        nama_divisi: "Kominfo",
        kode: "KOM",
        kategori: "pendukung",
      },
      {
        id_divisi: 8,
        nama_divisi: "Kewirausahaan",
        kode: "KWU",
        kategori: "pendukung",
      },
    ],
  });

  const passwordHash = await bcrypt.hash("123456", 10);

  // 3. Buat Akun Penting (Super Admin & Humaniora Internal)

  // A. Ketua (Topman)
  const ketua = await prisma.akun.create({
    data: {
      email: "sulastian@oxigen.ac.id",
      password: passwordHash,
      role: "super_admin",
      is_approved: true,
    },
  });
  await prisma.users.create({
    data: {
      id_akun: ketua.id_akun,
      nim: "23552001",
      nama_lengkap: "Sulastian",
      jurusan: "Teknik Informatika",
      angkatan: 2023,
      status_keanggotaan: "bph",
      divisi_peminatan_id: 2,
      jabatan_struktural_id: 1,
    },
  });

  // B. Admin Humaniora Internal (Si Pengelola User)
  const adminInt = await prisma.akun.create({
    data: {
      email: "ahmad@oxigen.ac.id",
      password: passwordHash,
      role: "admin_hum_in",
      is_approved: true,
    },
  });
  await prisma.users.create({
    data: {
      id_akun: adminInt.id_akun,
      nim: "24552011001",
      nama_lengkap: "Admin Internal",
      jurusan: "Teknik Informatika",
      angkatan: 2024,
      status_keanggotaan: "bph",
      divisi_peminatan_id: 2,
      jabatan_struktural_id: 5,
    },
  });

  const kadiv_soft = await prisma.akun.create({
    data: {
      email: "andrian@oxigen.ac.id",
      password: passwordHash,
      role: "admin_divisi",
      is_approved: true,
    },
  });
  await prisma.users.create({
    data: {
      id_akun: kadiv_soft.id_akun,
      nim: "24552002",
      nama_lengkap: "Andrian ",
      jurusan: "Teknik Informatika",
      angkatan: 2024,
      status_keanggotaan: "bph",
      divisi_peminatan_id: 2,
      jabatan_struktural_id: 2,
    },
  });

  const kadiv_hrd = await prisma.akun.create({
    data: {
      email: "alvin@oxigen.ac.id",
      password: passwordHash,
      role: "admin_divisi",
      is_approved: true,
    },
  });
  await prisma.users.create({
    data: {
      id_akun: kadiv_hrd.id_akun,
      nim: "23552002",
      nama_lengkap: "Alvin ",
      jurusan: "Teknik Informatika",
      angkatan: 2024,
      status_keanggotaan: "bph",
      divisi_peminatan_id: 3,
      jabatan_struktural_id: 3,
    },
  });

  const kadiv_gam = await prisma.akun.create({
    data: {
      email: "winata@oxigen.ac.id",
      password: passwordHash,
      role: "admin_divisi",
      is_approved: true,
    },
  });
  await prisma.users.create({
    data: {
      id_akun: kadiv_gam.id_akun,
      nim: "24552003",
      nama_lengkap: "Winata ",
      jurusan: "Teknik Informatika",
      angkatan: 2024,
      status_keanggotaan: "bph",
      divisi_peminatan_id: 4,
      jabatan_struktural_id: 4,
    },
  });

  // 4. Generate 30 User Dummy
  console.log("👥 Generating 30 User Dummy...");
  const listJurusan = [
    "Teknik Informatika",
    "Teknik Industri",
    "Desain Komunikasi Visual",
    "Bisnis Digital",
    "Manajemen Retail",
  ];

  for (let i = 0; i < 30; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet
      .email({ firstName, lastName, provider: "oxigen.ac.id" })
      .toLowerCase();

    const isApproved = faker.datatype.boolean();
    const status = isApproved
      ? faker.helpers.arrayElement(["aktif", "pasif"])
      : "pending";

    // Random Divisi Peminatan (2, 3, 4)
    const divId = faker.helpers.arrayElement([2, 3, 4]);

    const akun = await prisma.akun.create({
      data: {
        email: email,
        password: passwordHash,
        role: "user",
        is_approved: isApproved,
      },
    });

    await prisma.users.create({
      data: {
        id_akun: akun.id_akun,
        nim: faker.string.numeric(12),
        nama_lengkap: `${firstName} ${lastName}`,
        jurusan: faker.helpers.arrayElement(listJurusan),
        angkatan: faker.helpers.arrayElement([2024, 2025]),
        status_keanggotaan: status,
        divisi_peminatan_id: faker.helpers.arrayElement([2, 3, 4]),
        alasan: `Saya ingin bergabung UKM OXIGEN untuk mengembangkan kemampuan di bidang ${faker.helpers.arrayElement(['teknologi', 'organisasi', 'kepemimpinan', 'problem solving'])}.`,
        jabatan_struktural_id: null,
      },
    });
  }

  console.log("✅ Seeding Selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
