import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProgressStore from '../store/useProgressStore';

const SilabusPage = () => {
  // State untuk menyimpan data JSON
  const [silabus, setSilabus] = useState([]);

  // Memanggil state progress dari Zustand
  const completedModules = useProgressStore((state) => state.completedModules);

  // Mengambil data dari silabus.json saat komponen pertama kali dirender
  useEffect(() => {
    fetch('/silabus.json')
      .then((res) => res.json())
      .then((data) => setSilabus(data))
      .catch((err) => console.error("Gagal memuat silabus:", err));
  }, []);

  return (
    <div className="min-h-screen p-8 text-white font-sans">
      <div className="max-w-3xl mx-auto">

        {/* Tombol Kembali ke Landing Page */}
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white font-bold mb-2 transition-colors text-sm">
          ← Kembali ke Beranda
        </Link>

        {/* Teks Peta Belajar yang sudah ada */}
        <div className="text-[var(--color-software-bright)] font-extrabold text-xl mb-4 md:mb-6">
          Peta Belajar
        </div>

        {/* Header */}
        <h1 className="text-4xl font-bold mb-2 text-center text-[var(--color-software-bright)]">
          Peta Perjalanan Belajar
        </h1>
        <p className="text-center mb-10 text-[var(--color-software-tosca)]">
          Selesaikan materi sebelumnya untuk membuka tantangan berikutnya!
        </p>

        {/* Daftar Materi */}
        <div className="space-y-6">
          {silabus.map((materi, index) => {
            // LOGIKA GAMIFIKASI:
            // Materi terbuka jika: 
            // 1. Ini adalah materi pertama (index === 0)
            // 2. ATAU materi sebelumnya sudah ada di dalam array completedModules
            const previousMateri = silabus[index - 1];
            const isUnlocked = index === 0 || completedModules.includes(previousMateri?.id);

            // Cek apakah materi ini sendiri sudah selesai
            const isCompleted = completedModules.includes(materi.id);

            return (
              <div
                key={materi.id}
                className={`p-6 rounded-xl border-2 transition-all duration-300 shadow-lg ${isUnlocked
                    ? 'border-[var(--color-software-tosca)] bg-black/20 hover:bg-black/40'
                    : 'border-gray-600 bg-gray-800/40 opacity-50'
                  }`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                  {/* Info Materi */}
                  <div>
                    <h2 className={`text-2xl font-bold ${isUnlocked ? 'text-[var(--color-software-bright)]' : 'text-gray-400'
                      }`}>
                      {materi.title}
                    </h2>

                    {/* Indikator Selesai */}
                    {isCompleted && (
                      <span className="inline-block mt-2 px-3 py-1 bg-[var(--color-software-teal)] text-white text-xs rounded-full font-semibold">
                        ✅ Selesai
                      </span>
                    )}
                  </div>

                  {/* Tombol Aksi */}
                  {isUnlocked ? (
                    <Link
                      to={`/materi/${materi.id}`}
                      className="px-6 py-2 bg-[var(--color-software-tosca)] text-black font-bold rounded-lg hover:bg-[var(--color-software-bright)] transition-colors w-full sm:w-auto text-center"
                    >
                      {isCompleted ? 'Baca Ulang' : 'Mulai Belajar'}
                    </Link>
                  ) : (
                    <div className="px-6 py-2 bg-gray-700 text-gray-400 font-bold rounded-lg cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto border border-gray-600">
                      <span>🔒</span> Terkunci
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default SilabusPage;