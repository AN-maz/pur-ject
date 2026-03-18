import * as humanioraService from "../services/humanioraService.js";

export const createMeet = async (req, res) => {
  try {
    const result = await humanioraService.createMeet(
      req.body,
      req.user.id_akun,
    );
    res.status(201).json({
      status: true,
      message: "Rapat dibuat",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const updateMeet = async (req, res) => {
  try {
    const { id_meet } = req.params;
    const result = await humanioraService.updateMeet(id_meet, req.body);
    res.status(200).json({
      staus: true,
      message: "Data rapat diupdate",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getMeetDetail = async (req, res) => {
  try {
    const result = await humanioraService.getMeetDetail(req.params.id_meet);
    res.status(200).json({
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getAllMeets = async (req, res) => {
  try {
    const result = await humanioraService.getAllMeets();

    res.status(200).json({
      status: true,
      message: "List rapat internal berasil dimuat",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const deleteMeet = async (req, res) => {
  try {
    const { id_meet } = req.params;

    await humanioraService.deleteMeet(id_meet);

    res.status(200).json({
      status: true,
      message: "Rapat internal berhasil dihapus beserta data absensinya",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const kickPerseta = async (req, res) => {
  try {
    const { id_absensi } = req.body;
    await humanioraService.kickParticipants(id_absensi);
    res.status(200).json({
      status: true,
      message: "Pengurus dihapus dari daftar hadir!",
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

export const absenPengurus = async (req, res) => {
  try {
    const { id_meet, token } = req.body;
    await humanioraService.submitAbsenIntenal(id_meet, token, req.user.nim);
    res.status(200).json({
      status: true,
      message: "Absen rapat berhasil",
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};
