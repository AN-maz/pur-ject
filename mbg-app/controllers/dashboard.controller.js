// controllers/dashboardController.js

const renderDashboard = async (req, res) => {
    try {
        // Nantinya di sini kita panggil query database menggunakan config/db.js
        // Contoh: const [pesanan] = await pool.query('SELECT * FROM pesanan_harian');

        // Untuk sekarang, kita kirim data statis ke view
        res.render('dashboard', {
            title: 'Dashboard MBG',
            role: 'sekolah', // Simulasi role: 'dapur' atau 'sekolah'
            sekolahName: 'SDN Contoh 01'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan pada server');
    }
};

module.exports = { renderDashboard };