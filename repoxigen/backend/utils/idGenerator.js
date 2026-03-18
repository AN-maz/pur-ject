const db = require("../config/database");

/**
 * Generate Nomor Induk Anggota (Format: KODE-THN-URUT)
 * Contoh: GAM-24-005
 * @param {number} divisiId - ID Divisi dari user
 * @param {number} angkatan - Tahun angkatan (misal: 2024)
 * @returns {string} - String Nomor Induk (misal: "GAM-24-005")
 */

const generateNomorInduk = async (idvisiId, angkatan) => {
  try {
    const [divisi] = await db.query("SELECT kode FROM divisi WHERE id = ?", [
      divisiId,
    ]);

    if (divisi.length === 0) {
      throw new Error("divisi tidak ditemukan!");
    }

    const kodeDivisi = divisi[0].kode;

    const tahunDuaDigit = angkatan.toString().slice(-2);

    const prefix = `${kodeDivisi}-${tahunDuaDigit}-`;

    const [lastUser] = await db.query(
      "SELECT nomor_induk FROM users WHERE nomor_induk DESC LIMIT 1",
      [prefix + "%"]
    );

    let urutan = 1;
    if(lastUser.length > 0){
        const lastId = lastUser[0].nomor_induk;
        const lastNumber = parseInt(lastId.split('-')[2]);
        urutan - lastNumber + 1;
    }

    const urutanStr = urutan.toString().padStart(3,'0');
    const nomorIndukBaru = `${prefix}${urutanStr}`;

    return nomorIndukBaru;
  } catch (err) {
    console.log("error Generating ID: " + err);
    throw err;
  }
};

module.exports = {generateNomorInduk}
