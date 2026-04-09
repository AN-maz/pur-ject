import React from 'react';

export default function Hero() {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center px-5 pt-24 md:pt-20 relative bg-transparent">
      <div className="max-w-5xl mx-auto text-center z-10 w-full">
        
        {/* Label Badge */}
        <span className="inline-block py-1.5 px-4 rounded-full bg-green-50 text-brand-green font-semibold text-xs md:text-sm mb-4 md:mb-6 border border-green-200 shadow-sm">
          Talkshow & Workshop 2026
        </span>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-4 md:mb-6 leading-tight">
          Transformasi Coding Era AI : <br className="hidden md:block" />
          <span className="text-brand-green">Berkenalan dengan Vibe Coding</span>
        </h1>
        
        {/* Sub-headline */}
        <p className="text-base md:text-lg text-gray-600 mb-8 max-w-3xl mx-auto px-2">
          Pelajari bagaimana industri beradaptasi dengan AI dan bangun project pertamamu menggunakan pendekatan "Vibe Coding" bersama praktisi ahli.
        </p>
        

        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 mb-8 md:mb-10 w-full max-w-2xl mx-auto">
          {/* Card Tanggal */}
          <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm px-5 py-4 rounded-2xl border border-gray-200 shadow-sm w-full md:w-auto text-left">
            <span className="text-2xl shrink-0">📅</span>
            <div>
              <p className="text-[11px] md:text-xs text-gray-500 font-semibold uppercase tracking-wider">Tanggal & Waktu</p>
              <p className="text-sm md:text-base font-bold text-gray-800">Sabtu, 18 April 2026 • 09:00 - Selesai</p>
            </div>
          </div>
          {/* Card Lokasi */}
          <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm px-5 py-4 rounded-2xl border border-gray-200 shadow-sm w-full md:w-auto text-left">
            <span className="text-2xl shrink-0">📍</span>
            <div>
              <p className="text-[11px] md:text-xs text-gray-500 font-semibold uppercase tracking-wider">Lokasi Acara</p>
              <p className="text-sm md:text-base font-bold text-gray-800">Coming Soon</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <button className="bg-brand-green text-white px-8 py-3.5 rounded-full font-bold text-base md:text-lg hover:bg-green-700 transition shadow-lg shadow-green-200/50 hover:-translate-y-1 w-full sm:w-auto">
            Daftar Sekarang
          </button>
        </div>

      </div>
    </section>
  );
}