import { prisma } from "../lib/prisma.ts";

export const createMeet = async (data, creatorId) => {
  return await prisma.internalMeet.create({
    data: {
      judul: data.judul,
      tanggal: new Date(data.tanggal),
      lokasi: data.lokasi,
      token_absen: data.token_absen,
      created_by: creatorId,
    },
  });
};

export const updateMeet = async (meetId, data) => {
  return await prisma.internalMeet.update({
    where: { id_meet: parseInt(meetId) },
    data: data,
  });
};

export const getMeetDetail = async (meetId) => {
  const meet = await prisma.internalMeet.findUnique({
    where: { id_meet: parseInt(meetId) },
    include: {
      absensi: {
        include: {
          user: {
            select: {
              nama_lengkap: true,
              nim: true,
              status_keanggotaan: true,
            },
          },
        },
        orderBy: { waktu_input: "asc" },
      },
    },
  });

  if (!meet) throw new Error("Rapat tidak ditemukan");
  return meet;
};

export const getAllMeets = async () => {
  return await prisma.internalMeet.findMany({
    orderBy: {
      tanggal: "desc",
    },
    include: {
      _count: {
        select: { absensi: true },
      },
      creator: {
        select: { email: true },
      },
    },
  });
};

export const deleteMeet = async (meetId) => {
  const meet = await prisma.internalMeet.findUnique({
    where: { id_meet: parseInt(meetId) },
  });

  if (!meet) {
    throw new Error("Rapat tidak ditemukan! meren sudah diapusan");
  }

  return await prisma.internalMeet.delete({
    where: { id_meet: parseInt(meetId) },
  });
};
export const submitAbsenIntenal = async (meetId, token, userNim) => {
  const meet = await prisma.internalMeet.findUnique({
    where: { id_meet: parseInt(meetId) },
  });

  if (!meet) throw new Error("Rapat tidak valid!");
  if (!meet.is_open) throw new Error("Absensi rapat sudah ditutup");
  if (meet.token_absen !== token) throw new Error("Token salah!");

  const user = await prisma.users.findUnique({ where: { nim: userNim } });
  const allowedStatus = ["bph"];

  if (!allowedStatus.includes(user.status_keanggotaan))
    throw new Error("Hey antum bukan BPH!");

  return await prisma.absensiInternal.create({
    data: { id_meet: parseInt(meetId), nim: userNim },
  });
};

export const kickParticipants = async (absensiId) => {
  return await prisma.absensiInternal.delete({
    where: { id_absensi: parseInt(absensiId) },
  });
};
