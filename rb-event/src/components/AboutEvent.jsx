import React from 'react';

export default function AboutEvent() {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center py-20 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Kolom Kiri: Visual / Grafis */}
        <div className="relative">
          {/* Aksen Kotak Hijau di Belakang */}
          <div className="absolute -inset-4 bg-green-50 rounded-3xl transform rotate-3 -z-10 border border-green-100"></div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mengapa Mengangkat Tema Ini?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-brand-green text-xl">💡</span>
                <p className="text-gray-600 text-sm md:text-base">Perkembangan pesat di industri menuntut mahasiswa dan praktisi untuk terus beradaptasi.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-green text-xl">🤝</span>
                <p className="text-gray-600 text-sm md:text-base">Menjembatani kesenjangan antara teori akademik dengan kebutuhan nyata di lapangan.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-green text-xl">🚀</span>
                <p className="text-gray-600 text-sm md:text-base">Membangun ekosistem belajar bersama melalui *hands-on project* dan kolaborasi.</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Kolom Kanan: Teks Penjelasan */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
            Latar Belakang <span className="text-brand-green">Acara</span>
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
            <p>
              Teknologi tidak pernah berhenti bergerak. Seringkali, apa yang kita pelajari hari ini akan berevolusi menjadi sesuatu yang benar-benar baru dalam waktu singkat.
            </p>
            <p>
              Event <strong>Talkshow & Workshop Ruang Belajar</strong> hadir sebagai wadah interaktif. Kami mengundang praktisi ahli untuk berbagi pengalaman langsung di industri, mengupas tuntas tantangan terkini, serta memberikan simulasi nyata melalui sesi praktek yang terarah.
            </p>
            <p className="font-medium text-brand-green">
              Tujuan kami sederhana: Learn Together, Grow Together.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}