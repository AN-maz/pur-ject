// services/orderService.js
const pool = require('../config/db');

const simpanPesananHarian = async (sekolah_id, menu_id, jumlah_hadir, tanggal_hari_ini) => {
    const sql = `
        INSERT INTO pesanan_harian (sekolah_id, menu_id, tanggal_pesanan, jumlah_siswa_hadir, status)
        VALUES (?, ?, ?, ?, 'Pending')
    `;
    const values = [sekolah_id, menu_id, tanggal_hari_ini, jumlah_hadir];
    
    // Mengeksekusi query native
    const [result] = await pool.query(sql, values);
    return result;
};

module.exports = {
    simpanPesananHarian
};