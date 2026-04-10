import React, { useState } from 'react';

export default function FAQ() {
  const allFaqs = [
    {
      question: "Apakah acara ini berbayar?",
      answer: "Acara ini gratis ya."
    },
    {
      question: "Apakah pemula boleh ikut workshop ini?",
      answer: "Sangat boleh! Kita akan menggunakan AI, jadi yang ditekankan adalah logika dan prompt, bukan menghafal sintaks."
    },
    {
      question: "Apa saja spesifikasi laptop yang dibutuhkan?",
      answer: "Spesifikasi standar cukup (RAM minimal 4GB). Yang penting memiliki browser modern (Chrome/Edge) dan koneksi internet stabil."
    },
    {
      question: "Apakah harus menginstal software tertentu?",
      answer: "nanti hari H akan diarahkan untuk menginstall dan menggunakan toolsnya"
    },
    {
      question: "Di lokasi acara nanti disediakan koneksi WiFi gratis nggak? Atau aku harus sedia kuota/tethering sendiri dari HP?",
      answer: "Tenang, nanti akan disediakan WiFi."
    },
    {
      question: "Mengingat kita bakal pakai laptop pas workshop, apakah di ruangan banyak colokan listrik atau aku perlu bawa kabel roll (terminal) sendiri?",
      answer: "Nanti akan disediakan beberapa terminal colokan."
    },
    {
      question: "Kalau tiba-tiba berhalangan hadir di hari H padahal sudah daftar, apakah ada konsekuensinya? Haruskah konfirmasi ke panitia?",
      answer: "Perlu konfirmasi maksimal H-2 ya..."
    }
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