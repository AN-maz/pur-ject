
import * as absensiService from "../services/absensiService.js";

export const submitAbsensi = async (req, res) => {
  try {
    const { id_agenda } = req.params; 
    const { token_absen } = req.body; 
    const { nim } = req.user; 

    if (!token_absen) {
      return res.status(400).json({ status: false, message: "Token absensi wajib diisi!" });
    }

    const absensi = await absensiService.submitAbsensi(id_agenda, token_absen, nim);

    res.status(201).json({
      status: true,
      message: "Absen sukses! Terima kasih sudah hadir.",
      data: absensi
    });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};