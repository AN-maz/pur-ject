// services/dapurService.js
const pool = require('../config/db');

// Mengambil total porsi yang harus dimasak hari ini
const getRekapPorsiHariIni = async (tanggal_hari_ini) => {
    const sql = `
        SELECT 
            m.nama_menu, 
            SUM(p.jumlah_siswa_hadir) AS total_porsi_dibutuhkan
        FROM pesanan_harian p
        JOIN menu_makanan m ON p.menu_id = m.id
        WHERE p.tanggal_pesanan = ?
        GROUP BY m.id
    `;
    const [result] = await pool.query(sql, [tanggal_hari_ini]);
    return result;
};

// Mengambil daftar pesanan per sekolah untuk di-update statusnya
const getDaftarPesananHariIni = async (tanggal_hari_ini) => {
    const sql = `
        SELECT 
            p.id AS pesanan_id, 
            s.nama_sekolah, 
            p.jumlah_siswa_hadir, 
            p.status 
        FROM pesanan_harian p
        JOIN sekolah s ON p.sekolah_id = s.id
        WHERE p.tanggal_pesanan = ?
    `;
    const [result] = await pool.query(sql, [tanggal_hari_ini]);
    return result;
};

// Mengubah status pesanan menjadi 'Dikirim'
const updateStatusKirim = async (pesanan_id) => {
    const sql = `UPDATE pesanan_harian SET status = 'Dikirim' WHERE id = ?`;
    const [result] = await pool.query(sql, [pesanan_id]);
    return result;
};

module.exports = {
    getRekapPorsiHariIni,
    getDaftarPesananHariIni,
    updateStatusKirim
};