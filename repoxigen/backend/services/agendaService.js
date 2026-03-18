import { prisma } from "../lib/prisma.ts";

const superRole = ["super_admin", "admin_divisi"];

const getUserDivision = async (idAkun) => {
  const user = await prisma.users.findUnique({
    where: { id_akun: idAkun },
    select: { divisi_peminatan_id: true },
  });
  return user ? user.divisi_peminatan_id : null;
};

export const createAgenda = async (data, creatorId, userRole) => {
  const { judul, deskripsi, tanggal, lokasi, token_absen, id_divisi, konten_materi} = data;

  let targetDivisi = parseInt(id_divisi);
  // const superRole = ["super_admin"];

  if (!superRole.includes(userRole)) {
    const userDivisiId = await getUserDivision(creatorId);
    if (!userDivisiId) throw new Error("Kamu ga punya akses hak divisi!");
    targetDivisi = userDivisiId;
  }

  return await prisma.agenda.create({
    data: {
      judul,
      deskripsi,
      tanggal: new Date(tanggal),
      lokasi,
      token_absen,
      is_absen_open: true,
      id_divisi: targetDivisi,
      created_by: creatorId,
      konten_materi: konten_materi
    },
  });
};

export const getAllAgenda = async (userRole, userId) => {
  let whereClause = {};

  if (userRole === "admin_divisi") {
    const realDivisiId = await getUserDivision(userId);

    if (!realDivisiId) return [];
    whereClause = { id_divisi: realDivisiId };
  } else if (userRole === "user") {
    const userProfile = await prisma.users.findUnique({
      where: { id_akun: userId },
      select: { divisi_peminatan_id: true },
    });

    if (!userProfile || !userProfile.divisi_peminatan_id) return [];
    whereClause = { id_divisi: userProfile.divisi_peminatan_id };
  }

  return await prisma.agenda.findMany({
    where: whereClause,
    include: {
      divisi: true,
      _count: {
        select: { absensi: true },
      },
    },
    orderBy: { tanggal: "desc" },
  });
};

export const updateAgenda = async (agendaId, data, userRole, userDivisiId) => {
  const agenda = await prisma.agenda.findUnique({
    where: { id_agenda: parseInt(agendaId) },
  });

  if (!agenda) throw new Error("agenda tidak ditemukan!");
  if (!superRole.includes(userRole)) {
    if (agenda.id_divisi !== userDivisiId) {
      throw new Error("Anda tidak berhak mengedit agenda divisi lain!");
    }
  }

  return await prisma.agenda.update({
    where: { id_agenda: parseInt(agendaId) },
    data: {
      judul: data.judul,
      deskripsi: data.deskripsi,
      tanggal: data.tanggal ? new Date(data.tanggal) : undefined,
      lokasi: data.lokasi,
      token_absen: data.token_absen,
      is_absen_open: data.is_absen_open,
      konten_materi: data.konten_materi,
    },
  });
};

export const deleteAgenda = async (agendaId, userRole, userDIvisiId) => {
  const agenda = await prisma.agenda.findUnique({
    where: { id_agenda: parseInt(agendaId) },
  });

  if (!agenda) throw new Error("Agenda tidak ditemukan");
  if (!userRole.include(userRole)) {
    if (agenda.id_divisi !== userDIvisiId) {
      throw new Error("Anda tidak berhak mengghapus agenda divisi lain");
    }
  }

  return await prisma.agenda.delete({
    where: { id_agenda: parseInt(agendaId) },
  });
};

export const kickParticipants = async (absensiId, userRole, userDivisiId) => {
  const absensi = await prisma.absensi.findUnique({
    where: { id_absensi: parseInt(absensiId) },
    include: {
      agenda: true,
    },
  });

  if (!absensi) throw new Error("Data absensi tidak ditemukan!");

  if (!superRole.includes(userRole)) {
    if (absensi.agenda.id_divisi !== userDivisiId) {
      throw new Error("Anda tidak berhak menghapus peserta divisi lain!");
    }
  }

  return await prisma.absensi.delete({
    where: { id_absensi: parseInt(absensiId) },
  });
};

export const getAgendaPartisipants = async (
  agendaId,
  userRole,
  userDivisiId,
) => {
  const agenda = await prisma.agenda.findUnique({
    where: { id_agenda: parseInt(agendaId) },
    include: {
      divisi: true,
      _count: {
        select: { absensi: true },
      },
    },
  });

  if (!agenda) {
    throw new Error("Agenda tidak ditemukan Min...");
  }

  if (!superRole.includes(userRole) && agenda.id_divisi !== userDivisiId) {
    throw new Error("Dilarang mengintip agenda divisi lain Kak!");
  }

  const participants = await prisma.absensi.findMany({
    where: { id_agenda: parseInt(agendaId) },
    include: {
      user: {
        select: {
          nama_lengkap: true,
          nim: true,
          jurusan: true,
          angkatan: true,
        },
      },
    },
    orderBy: { waktu_input: "asc" },
  });

  return {
    detail_agenda: {
      judul: agenda.judul,
      tanggal: agenda.tanggal,
      divisi: agenda.divisi.nama_divisi,
      total_hadir: agenda._count.absensi,
    },
    peserta: participants.map((p) => ({
      id_absensi: p.id_absensi,
      nim: p.nim,
      nama: p.user.nama_lengkap,
      jurusan: p.user.jurusan,
      waktu_absen: p.waktu_input,
    })),
  };
};

export const getAgendaDetail = async (agendaId, userRole, userId) => {
  const agenda = await prisma.agenda.findUnique({
    where: { id_agenda: parseInt(agendaId) },
    include: {
      divisi: true,
      _count: { select: { absensi: true } },
    },
  });

  if(!agenda) throw new Error("Agenda tidak ditemukan!");

  const superRoles = ['super_admin'];

  if(!superRoles.includes(userRole)){

    const userDivisiId = await getUserDivision(userId);

    if(agenda.id_divisi !== userDivisiId){
      throw new Error("Akses ditolak! kamu tidak berhak spill-spill agenda divisi lain...")
    }
  }

  return agenda;
};
