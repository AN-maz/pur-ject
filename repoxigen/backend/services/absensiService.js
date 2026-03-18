import { prisma } from "../lib/prisma.ts";

export const submitAbsensi = async (id_agenda, token_input, userNim) => {

  const agendaId = parseInt(id_agenda);

  const agenda = await prisma.agenda.findUnique({
    where: { id_agenda: parseInt(agendaId) },
  });

  if (!agenda) {
    throw new Error("Agenda tidak ditemukan");
  }

  if (!agenda.is_absen_open) throw new Error("Absensi sudah ditutup euy!");

  if (agenda.token_absen !== token_input)
    throw new Error("Token absensi salah Euy");
  if (!agenda.is_absen_open) throw new Error("Absensi sudah ditutup");

  const user = await prisma.users.findUnique({
    where: { nim: userNim },
  });

  if (!user) throw new Error("Data user tidak valid");

  if (agenda.id_divisi !== user.divisi_peminatan_id) {
    throw new Error(
      "kamu bukan anggota dari divisi ini! Dilarang absen sembarangan gan!",
    );
  }

  const existingAbsensi = await prisma.absensi.findFirst({
    where: {
      id_agenda: parseInt(id_agenda),
      nim: userNim,
    },
  });

  if (existingAbsensi) {
    throw new Error("Kamu sudah absen sebelumnya!");
  }

  return await prisma.absensi.create({
    data: {
      id_agenda: agendaId,
      nim: userNim,
      status: "hadir",
      waktu_input: new Date(),
    },
  });
};
