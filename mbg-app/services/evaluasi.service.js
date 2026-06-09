// services/evaluasiService.js
const pool = require('../config/db');

const simpanEvaluasi = async (pesanan_id, rating_rasa, rating_porsi, catatan_feedback, nama_file_foto) => {
    // Meminjam koneksi tunggal dari pool untuk menjalankan transaksi
    const connection = await pool.getConnection();
    
    try {
        // Memulai Transaksi
        await connection.beginTransaction();

        // 1. Insert data ulasan dan nama file foto ke evaluasi_makanan
        const sqlInsert = `
            INSERT INTO evaluasi_makanan (pesanan_id, rating_rasa, rating_porsi, catatan_feedback, foto_bukti)
            VALUES (?, ?, ?, ?, ?)
        `;
        const valuesInsert = [pesanan_id, rating_rasa, rating_porsi, catatan_feedback, nama_file_foto];
        await connection.query(sqlInsert, valuesInsert);

        // 2. Update status pesanan_harian menjadi 'Selesai'
        const sqlUpdate = `UPDATE pesanan_harian SET status = 'Selesai' WHERE id = ?`;
        await connection.query(sqlUpdate, [pesanan_id]);

        // Jika kedua query di atas sukses, simpan permanen (commit)
        await connection.commit();
        return true;
        
    } catch (error) {
        // Jika ada yang gagal, batalkan semua (rollback)
        await connection.rollback();
        throw error;
    } finally {
        // Kembalikan koneksi ke pool agar bisa digunakan user lain
        connection.release();
    }
};

module.exports = { simpanEvaluasi };