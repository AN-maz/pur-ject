const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    method: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Pintu masuk
app.get("/", (req, res) => {
  res.json({
    message: "Sampuran di OXIWEB API SERVER!",
    status: "Running Securely",
  });
});

// CONTOH DATA DUMMY (Buat ditest sama Fetch Frontend)

app.get("/api/posts", (req, res) => {
  const posts = [
    { id: 1, title: "Belajar Backend", body: "Seru banget!" },
    { id: 2, title: "Oxiweb Project", body: "Progress lancar." },
  ];
  res.json(posts);
});

app.post("/api/posts", (req, res) => {
  const dataBaru = req.body;
  console.log("data ditampi: ", dataBaru);

  res.status(201).json({
    message: "Posts berhasil dibuat",
    data: dataBaru,
  });
});

app.listen(PORT, () => {
  console.log(`Server OXIWEB berjalan di http://localhost:${PORT}`);
});
