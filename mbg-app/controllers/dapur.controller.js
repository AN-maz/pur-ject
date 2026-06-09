// controllers/dapurController.js
const dapurService = require('../services/dapur.service');

const tampilkanDashboardDapur = async (req, res) => {
    const tanggal_hari_ini = new Date().toISOString().split('T')[0];

    try {
        const rekapPorsi = await dapurService.getRekapPorsiHariIni(tanggal_hari_ini);
        const daftarPesanan = await dapurService.getDaftarPesananHariIni(tanggal_hari_ini);

        res.render('dapur-dashboard', {
            rekapPorsi: rekapPorsi.length > 0 ? rekapPorsi[0] : null,
            daftarPesanan
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Gagal memuat dashboard dapur.");
    }
};

const prosesKirimMakanan = async (req, res) => {
    const { pesanan_id } = req.body;
    try {
        await dapurService.updateStatusKirim(pesanan_id);
        res.redirect('/dapur?pesan=berhasil_dikirim');
    } catch (error) {
        console.error(error);
        res.status(500).send("Gagal mengupdate status.");
    }
};

module.exports = {
    tampilkanDashboardDapur,
    prosesKirimMakanan
};