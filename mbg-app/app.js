const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. MIDDLEWARE BODY PARSER (HARUS PALING ATAS)
// Ini yang bertugas membaca data dari form (req.body)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2. SETTING VIEW ENGINE & ASSETS STATIS
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 3. ROUTES (SETELAH MIDDLEWARE SIAP)
const webRoutes = require('./routes/web.route');    
app.use('/', webRoutes);

// (Hapus app.get('/') yang mengarah ke send text, karena sudah di-handle oleh webRoutes)

// 4. ERROR HANDLING (404)
app.use((req, res) => {
    res.status(404).send('Halaman tidak ditemukan.');
});

// 5. START SERVER
app.listen(PORT, () => {
    console.log(`==============================================`);
    console.log(` Server MBG aktif di: http://localhost:${PORT} `);
    console.log(`==============================================`);
});