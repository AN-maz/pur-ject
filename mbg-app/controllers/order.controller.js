// controllers/orderController.js
const orderService = require('../services/order.service');

// Menampilkan halaman form
const tampilkanFormAbsensi = (req, res) => {
    res.render('input-absensi');
};

// Memproses data dari form
const prosesInputAbsensi = async (req, res) => {
    // req.body sekarang akan terbaca asalkan app.use(express.urlencoded) ada di app.js
    const { sekolah_id, menu_id, jumlah_hadir } = req.body;
    const tanggal_hari_ini = new Date().toISOString().split('T')[0];

    try {
        // Panggil logic database dari layer service
        await orderService.simpanPesananHarian(sekolah_id, menu_id, jumlah_hadir, tanggal_hari_ini);
        
        // Redirect ke dashboard dengan indikator sukses
        res.redirect('/?status=sukses_input');
    } catch (error) {
        console.error("Gagal memproses absensi:", error);
        res.status(500).send("Terjadi kesalahan sistem saat menyimpan data.");
    }
};

module.exports = {
    tampilkanFormAbsensi,
    prosesInputAbsensi
};