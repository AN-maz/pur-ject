import React from 'react';

export default function Hero() {
  return (
    // min-h-screen memastikan section ini mengambil layar penuh
    // pt-20 digunakan agar konten tidak tertutup Navbar yang fixed
    <section className="min-h-screen w-full flex flex-col justify-center items-center px-4 pt-20 relative">
      <div className="max-w-4xl mx-auto text-center z-10">
        
        {/* Label Badge */}
        <span className="inline-block py-1 px-4 rounded-full bg-green-50 text-brand-green font-semibold text-sm mb-6 border border-green-200 shadow-sm">
          Tech Talkshow & Workshop 2026
        </span>
        
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
          Eksplorasi Teknologi <br className="hidden md:block" />
          <span className="text-brand-green">Software & Hardware</span>
        </h1>
        
        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Temukan inovasi terbaru dan tingkatkan keahlian teknismu secara langsung melalui sesi *hands-on* bersama para praktisi berpengalaman di industrinya.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-brand-green text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-green-700 transition shadow-lg shadow-green-200/50 hover:-translate-y-1">
            Amankan Kursi Sekarang
          </button>
          <button className="bg-white text-gray-700 px-8 py-3 rounded-full font-bold text-lg border-2 border-gray-200 hover:border-brand-green hover:text-brand-green transition">
            Lihat Latar Belakang
          </button>
        </div>

      </div>
    </section>
  );
}