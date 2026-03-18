import { prisma } from "../lib/prisma.ts";
import bcrypt from "bcrypt";


export const getDashboardStats = async (angkatanFilter) => {
  const whereClause = {};

  if (angkatanFilter) {
    whereClause.angkatan = parseInt(angkatanFilter);
  }

  const totalUsers = await prisma.users.count({
    where: whereClause,
  });

  const statsStatus = await prisma.users.groupBy({
    by: ["status_keanggotaan"],
    where: whereClause,
    _count: { nim: true },
  });

  const rangeAngkatan = await prisma.users.aggregate({
    _min: { angkatan: true },
    _max: { angkatan: true },
  });

  const pendingApprovalCount = await prisma.users.count({
    where: {
      ...whereClause,
      akun: {
        is_approved: false,
      },
    },
  });

  return {
    total_users: totalUsers,
    pending_approval: pendingApprovalCount,
    chart_data: statsStatus.map((item) => ({
      status: item.status_keanggotaan,
      jumlah: item._count.nim,
    })),
    filter_angkatan: {
      terlama: rangeAngkatan._min.angkatan,
      terbaru: rangeAngkatan._max.angkatan,
    },
  };
};


export const getAllUsers = async (filters = {}) => {
  const { search, angkatan, jurusan, status, page = 1, limit = 10 } = filters;
  const skip = (page - 1) * limit;

  const whereClause = {};

  if (search) {
    whereClause.OR = [
      { nama_lengkap: { contains: search } },
      { nim: { contains: search } },
    ];
  }
  if (angkatan) {
    whereClause.angkatan = parseInt(angkatan);
  }
  if (jurusan) {
    whereClause.jurusan = jurusan;
  }
  if (status) {
    whereClause.status_keanggotaan = status;
  }

  const users = await prisma.users.findMany({
    where: whereClause,
    include: {
      akun: { 
        select: { 
          email: true, 
          role: true, 
          is_approved: true 
        } 
      },
      peminatan: { select: { nama_divisi: true } },
      jabatan: { select: { nama_divisi: true } },
    },
    orderBy: { createdAt: "desc" },
    skip: parseInt(skip),
    take: parseInt(limit),
  });

  const totalData = await prisma.users.count({ where: whereClause });

  return {
    users,
    pagination: {
      total_data: totalData,
      total_page: Math.ceil(totalData / limit),
      current_page: parseInt(page),
    },
  };
};


export const getUserDetail = async (nim) => {
  const user = await prisma.users.findUnique({
    where: { nim: nim },
    include: {
      akun: { select: { email: true, role: true, is_approved: true } },
      peminatan: true,
      jabatan: true,
    }
  });

  if (!user) throw new Error("Data user tidak ditemukan");
  return user;
};


export const approveUser = async (nim) => {
  const user = await prisma.users.findUnique({
    where: { nim: nim },
    select: { id_akun: true }
  });

  if (!user) throw new Error("User tidak ditemukan");

  const updatedAccount = await prisma.akun.update({
    where: { id_akun: user.id_akun },
    data: { is_approved: true },
  });

  return updatedAccount;
};

export const updateUserProfile = async (nim, data) => {
  return await prisma.users.update({
    where: { nim: nim },
    data: {
      nama_lengkap: data.nama_lengkap, // TYPO DIPERBAIKI (sebelumnya nama_Lengkap)
      jurusan: data.jurusan,
      angkatan: parseInt(data.angkatan),
      status_keanggotaan: data.status_keanggotaan,
      divisi_peminatan_id: data.divisi_id ? parseInt(data.divisi_id) : undefined,
      jabatan_struktural_id: data.jabatan_struktural_id ? parseInt(data.jabatan_struktural_id) : null,
    },
  });
};

export const resetPassword = async (nim, newPassword) => {
  const user = await prisma.users.findUnique({
    where: { nim: nim },
    select: { id_akun: true },
  });

  if (!user) throw new Error("User tidak ditemukan");

  const hashPassword = await bcrypt.hash(newPassword, 10);

  return await prisma.akun.update({
    where: { id_akun: user.id_akun },
    data: { password: hashPassword },
  });
};


export const deleteUser = async (nim) => {
  const user = await prisma.users.findUnique({
    where: { nim },
    select: { id_akun: true },
  });

  if (!user) throw new Error("User tidak ditemukan");

  return await prisma.akun.delete({
    where: { id_akun: user.id_akun },
  });
};