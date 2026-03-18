import * as agendaService from "../services/agendaService.js";

export const createAgenda = async (req, res) => {
  try {
    const { id_akun, role } = req.user;

    const newAgenda = await agendaService.createAgenda(req.body, id_akun, role);

    res.status(201).json({
      status: true,
      message: "Agenda berhasil dibuat",
      data: newAgenda,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

export const getAllAgenda = async (req, res) => {
  try {
    const { role, id_akun } = req.user;

    console.log("ISI REQ.USER DARI TOKEN:", req.user);
    console.log("ID AKUN YANG DIAMBIL:", id_akun);

    const agendas = await agendaService.getAllAgenda(role, id_akun);

    res.status(200).json({
      status: true,
      message: "List agenda berhasil dimuat",
      data: agendas,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

export const updateAgenda = async (req, res) => {
  try {
    const { id_agenda } = req.params;
    const { role, id_akun } = req.user;

    const result = await agendaService.updateAgenda(
      id_agenda,
      req.body,
      role,
      id_akun,
    );

    res.status(200).json({
      status: true,
      message: "Agenda berhasil diupdate",
      data: result,
    });
  } catch (err) {
    if (err.message.includes("tidak berhak")) {
      return res.status(403).json({
        status: false,
        message: err.message,
      });
    }
    res.status(500).json({ status: false, message: err.message });
  }
};

export const deleteAgenda = async (req, res) => {
  try {
    const { id_agenda } = req.params;
    const { role, id_akun } = req.user;

    await agendaService.deleteAgenda(id_agenda, role, id_akun);

    res.status(200).json({
      status: true,
      message: "Agenda berhasil dihapus permanen",
    });
  } catch (err) {
    if (err.message.includes("tidak berhak")) {
      return res.status(403).json({ status: false, message: err.message });
    }
    res.status(500).json({ status: false, message: err.message });
  }
};

export const kickParticipant = async (req, res) => {
  try {
    const { id_absensi } = req.params;
    const { role, divisi_peminatan_id } = req.user;

    await agendaService.kickParticipants(id_absensi, role, divisi_peminatan_id);

    res.status(200).json({
      status: true,
      message: "Peserta berhasil dihapus dari daftar hadir",
    });
  } catch (err) {
    if (err.message.includes("tidak berhak")) {
      return res.status(403).json({ status: false, message: err.message });
    }
    res.status(500).json({ status: false, message: err.message });
  }
};

export const getParticipants = async (req, res) => {
  try {
    const { id_agenda } = req.params;
    const { role, id_akun } = req.user;

    const result = await agendaService.getAgendaPartisipants(
      id_agenda,
      role,
      id_akun,
    );

    res.status(200).json({
      status: true,
      message: "Data presensi berhasil ditarik",
      data: result,
    });
  } catch (err) {
    if (err.message.includes("Dilarang")) {
      return res.status(403).json({ status: false, message: err.message });
    }
    res.status(400).json({ status: false, message: err.message });
  }
};

export const getAgendaDetail = async (req, res) => {
  try {
    const { id_agenda } = req.params;
    const { role, id_akun } = req.user;

    const agenda = await agendaService.getAgendaDetail(
      id_agenda,
      role,
      id_akun,
    );

    res.status(200).json({
      status: true,
      message: "Berhasil ambil detail agenda ya...",
      data: agenda,
    });
  } catch (err) {
    if (err.message.includes("Akses ditolak")) {
      return res.status(403).json({
        status: false,
        message: err.message,
      });
    }
    res.status(404).json({
      status: false,
      message: err.message,
    });
  }
};
