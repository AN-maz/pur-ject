import React from 'react';

export default function EventDetail() {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center py-20 px-4 bg-gray-50/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-800">Kenalan Sama Pemateri Kita</h2>
        <p className="text-gray-500 mt-2">Dapatkan insight langsung dari para praktisi ahli di bidangnya.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Kolom Sesi Talkshow (2 Pemateri) */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-brand-green mb-6 border-b pb-3">🎙️ Sesi Talkshow</h3>
          <div className="flex flex-col gap-6">
            
            {/* Pembicara 1 */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 border-2 border-brand-green">
                {/* <img src={foto1} alt="Pembicara 1" className="w-full h-full rounded-full object-cover"/> */}
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800">Nama Pembicara 1</h4>
                <p className="text-gray-500 text-sm">Jabatan / Instansi</p>
              </div>
            </div>

            {/* Pembicara 2 */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 border-2 border-brand-green"></div>
              <div>
                <h4 className="font-bold text-lg text-gray-800">Nama Pembicara 2</h4>
                <p className="text-gray-500 text-sm">Jabatan / Instansi</p>
              </div>
            </div>
            
          </div>
          <p className="mt-6 text-sm text-gray-600 leading-relaxed">
            Sesi ini akan mengupas tuntas tentang latar belakang masalah, tren saat ini, dan bagaimana kita beradaptasi di industri.
          </p>
        </div>

        {/* Kolom Sesi Workshop (1 Pemateri) */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-brand-green mb-6 border-b pb-3">💻 Sesi Workshop</h3>
          <div className="flex flex-col gap-6">
            
            {/* Instruktur Workshop */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 border-2 border-brand-green"></div>
              <div>
                <h4 className="font-bold text-lg text-gray-800">Nama Instruktur</h4>
                <p className="text-gray-500 text-sm">Jabatan / Instansi</p>
              </div>
            </div>

            {/* Info Tambahan Workshop */}
            <div className="mt-2 p-4 bg-green-50 rounded-xl border border-green-100">
              <h5 className="font-semibold text-brand-green text-sm mb-1">Fokus Praktek:</h5>
              <p className="text-sm text-gray-700">
                Peserta akan diajak untuk mengimplementasikan materi secara langsung (*hands-on*). Pastikan membawa laptop pribadi!
              </p>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}