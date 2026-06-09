// services/evaluasiService.js
const pool = require('../config/db');
const evaluasiService = require('../services/evaluasi.service');

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

const prosesEvaluasi = async (req, res) => {
    const { pesanan_id, rating_rasa, rating_porsi, catatan_feedback } = req.body;
    
    // req.file otomatis berisi informasi file berkat middleware multer
    const nama_file_foto = req.file ? req.file.filename : null;

    // Validasi sederhana jika foto gagal terunggah
    if (!nama_file_foto) {
        return res.status(400).send("Gagal: Foto bukti kedatangan wajib diunggah!");
    }

    try {
        await evaluasiService.simpanEvaluasi(
            pesanan_id, 
            rating_rasa, 
            rating_porsi, 
            catatan_feedback, 
            nama_file_foto
        );
        
        // Redirect ke dashboard dengan pesan sukses
        res.redirect('/?pesan=evaluasi_selesai');
    } catch (error) {
        console.error("Gagal menyimpan evaluasi:", error);
        
        // Menangani error jika pesanan_id duplicate (One-to-One dilarang double evaluasi)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).send("Pesanan ini sudah pernah dievaluasi sebelumnya.");
        }
        
        res.status(500).send("Terjadi kesalahan sistem saat memproses evaluasi.");
    }
};

module.exports = { simpanEvaluasi,prosesEvaluasi };