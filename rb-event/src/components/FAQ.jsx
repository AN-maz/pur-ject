import React, { useState } from 'react';

export default function FAQ() {
  const allFaqs = [
    { question: "Apakah acara ini berbayar?", answer: "Acara ini gratis untuk anggota internal dan berbayar untuk umum." },
    { question: "Apakah pemula boleh ikut workshop ini?", answer: "Sangat boleh! Kita akan menggunakan AI, jadi yang ditekankan adalah logika dan prompt, bukan menghafal sintaks." },
    { question: "Apa saja spesifikasi laptop yang dibutuhkan?", answer: "Spesifikasi standar cukup (RAM minimal 4GB). Yang penting memiliki browser modern (Chrome/Edge) dan koneksi internet stabil." },
    { question: "Apakah harus menginstal software tertentu?", answer: "Kita akan banyak menggunakan tools berbasis web. Namun disarankan sudah menginstal VS Code dan Node.js." },
    { question: "Apakah mendapat sertifikat?", answer: "Ya, seluruh peserta yang mengikuti acara dari awal hingga akhir akan mendapatkan e-certificate." },
    { question: "Siapa kontak panitia yang bisa dihubungi?", answer: "Hubungi panitia via WhatsApp: 0812-XXXX-XXXX." },
    { question: "Apakah ada recording/rekaman acara?", answer: "Rekaman hanya akan dibagikan kepada peserta yang sudah terdaftar secara resmi." },
    { question: "Boleh bawa makanan sendiri?", answer: "Boleh membawa air minum dalam *tumbler* tertutup. Makanan berat disarankan dimakan saat jam istirahat di luar ruangan." },
  ];


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 
  const totalPages = Math.ceil(allFaqs.length / itemsPerPage);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFaqs = allFaqs.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center py-20 px-4 bg-green-50/30">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Pertanyaan yang Sering <span className="text-brand-green">Diajukan</span>
          </h2>
          <p className="text-gray-500 mt-3">Jawaban lengkap seputar pendaftaran, teknis, dan pelaksanaan acara.</p>
        </div>

        {/* List FAQ (Sesuai halaman aktif) */}
        <div className="grid md:grid-cols-2 gap-6 min-h-[300px]">
          {currentFaqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-start gap-2">
                <span className="text-brand-green">Q:</span> {faq.question}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                <span className="font-bold text-gray-300">A:</span> {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Kontrol Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg font-medium bg-white border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition"
            >
              Sebelumnya
            </button>
            
            <span className="text-sm font-semibold text-gray-600">
              Halaman {currentPage} dari {totalPages}
            </span>

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg font-medium bg-white border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition"
            >
              Selanjutnya
            </button>
          </div>
        )}
        
      </div>
    </section>
  );
}