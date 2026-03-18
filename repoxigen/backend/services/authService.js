import { prisma } from "../lib/prisma.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (data) => {
  const { nama_lengkap, nim, jurusan, email, password, kode_divisi, alasan } =
    data;

  const existingUser = await prisma.users.findFirst({
    where: {
      OR: [{ akun: { email: email } }, { nim: nim }],
    },
  });

  if (existingUser) {
    throw new Error("Email atau Nim sudah terdaftar!");
  }

  const divisiTarget = await prisma.divisi.findUnique({
    where: { kode: kode_divisi },
  });

  if (!divisiTarget) {
    throw new Error("Divisi tidak ditemukan!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const result = await prisma.$transaction(async (tx) => {
      const newAccount = await tx.akun.create({
        data: {
          email,
          password: hashedPassword,
          role: "user",
        },
      });

      const newUser = await tx.users.create({
        data: {
          nim,
          id_akun: newAccount.id_akun,
          nama_lengkap,
          jurusan,
          angkatan: 2025,
          divisi_peminatan_id: divisiTarget.id_divisi,
          alasan,
          jabatan_struktural_id: null,
        },
      });

      return { account: newAccount, user: newUser };
    });

    return result;
  } catch (err) {
    throw new Error("Gagal registrasi: " + err.message);
  }
};

export const loginUser = async ({ email, password }) => {
  const account = await prisma.akun.findUnique({
    where: { email },
    include: { userProfile: true },
  });

  if (!account) {
    throw new Error("Email atau Password salah MasPur!");
  }

  const isMatch = await bcrypt.compare(password, account.password);
  if (!isMatch) {
    throw new Error("Email atau password salah MasPur!");
  }

  if (account.is_approved === false) {
    throw new Error(
      "Akun kamu belum disetujui sama Admin, Mangga dikontak dulu adminnya bisi lupa",
    );
  }

  const payload = {
    id_akun: account.id_akun,
    role: account.role,
    nim: account.userProfile?.nim,
    status: account.userProfile?.status_keanggotaan,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    token,
    user: account.userProfile,
    role: account.role,
  };
};
