// routes/web.route.js (atau routes/web.js)
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Import Controllers
const dashboardController = require("../controllers/dashboard.controller");
const orderController = require("../controllers/order.controller");
const dapurController = require("../controllers/dapur.controller");
const evaluasiController = require('../controllers/evaluasi.controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Lokasi simpan file
  },
  filename: function (req, file, cb) {
    // Menambahkan timestamp agar nama file unik dan tidak tertimpa
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Rute Dashboard
router.get("/", dashboardController.renderDashboard);

// Rute Absensi / Pesanan (Tahap 2)
router.get("/input-absensi", orderController.tampilkanFormAbsensi);
router.post("/submit-absensi", orderController.prosesInputAbsensi);

router.get("/dapur", dapurController.tampilkanDashboardDapur);
router.post("/dapur/update-status", dapurController.prosesKirimMakanan);

router.get('/evaluasi', (req, res) => {
    res.render('evaluasi');
});

router.post('/submit-evaluasi', upload.single('foto_bukti'), evaluasiController.prosesEvaluasi);

module.exports = router;
