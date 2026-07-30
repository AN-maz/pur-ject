import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';

export default function GamifiedLiveReport() {
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    try {
      const dataUrl = await htmlToImage.toJpeg(canvasRef.current, { 
        quality: 1.0, 
        pixelRatio: 3 
      });
      const link = document.createElement('a');
      link.download = 'Live-Report-Meet3.jpg';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Gagal mengekspor gambar:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-[var(--color-rb-dark)] min-h-screen font-sans">
      
      {/* NAVIGASI ATAS */}
      <div className="w-full max-w-4xl flex justify-start">
        <a 
          href="/" 
          className="flex items-center gap-2 text-[var(--color-rb-teal)] hover:text-[var(--color-rb-light)] transition-colors font-bold bg-[var(--color-rb-teal)]/10 px-4 py-2 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Kembali ke Home
        </a>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full">
        
        {/* BAGIAN KIRI: KONTROL PANEL */}
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <div className="mb-4">
            <h1 className="text-3xl font-black text-white italic tracking-widest drop-shadow-lg">
              QUEST <span className="text-[var(--color-rb-teal)]">REPORT</span>
            </h1>
            <p className="text-[var(--color-rb-light)] text-sm mt-1">
              Upload bukti penyelesaian misimu!
            </p>
          </div>

          <label className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-rb-dark)] border-2 border-dashed border-[var(--color-rb-teal)] text-[var(--color-rb-light)] font-bold rounded-lg cursor-pointer hover:bg-[var(--color-rb-teal)]/20 transition-all shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span>Pilih Foto</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>

          <button 
            onClick={handleDownload}
            disabled={!image}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-rb-teal)] text-[#0B1727] font-bold py-3 rounded-lg hover:bg-[var(--color-rb-light)] transition-all shadow-[0_0_15px_rgba(0,180,167,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download IG Story
          </button>
        </div>

        {/* BAGIAN KANAN: AREA PREVIEW GAMIFIKASI (REDESAIN SPLIT LAYOUT) */}
        <div className="relative w-[360px] h-[640px] shadow-[0_0_40px_rgba(0,180,167,0.3)] flex-shrink-0">
          
          {/* PEMBUNGKUS UTAMA CANVAS (Yang diexport jadi JPG) */}
          {/* Menggunakan bg gelap dan Flexbox untuk memisahkan atas & bawah */}
          <div ref={canvasRef} className="w-full h-full bg-[#070e17] flex flex-col p-3 gap-3">
            
            {/* AREA 1: FOTO KELOMPOK / KOLASE */}
            <div className="relative flex-1 rounded-xl overflow-hidden border border-[var(--color-rb-teal)]/40 bg-[#0B1727]">
              
              {/* Gambar (Mengisi penuh ruang Area 1 saja) */}
              {image ? (
                <img src={image} alt="Preview" className="absolute inset-0 w-full h-full object-cover z-0" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-rb-teal)]/50 font-mono text-xs">
                  <span>[ AREA FOTO ]</span>
                </div>
              )}

              {/* Gradient halus di atas saja untuk memperjelas lencana Header */}
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0B1727]/90 to-transparent z-10 pointer-events-none"></div>

              {/* LENCANA HEADER (Tetap melayang di atas foto karena tidak mengganggu area bawah) */}
              <div className="absolute top-2 left-2 right-2 z-20 flex justify-between items-start pointer-events-none">
                
                {/* Lencana Player (Sesuai referensi gambar: biru cyan solid) */}
                <div className="mt-1">
                  <span className="bg-[#0B1727]/95 text-[var(--color-rb-teal)] px-3 py-1.5 text-xs font-bold border-l-[3px] border-[var(--color-rb-light)] shadow-lg uppercase tracking-wider">
                    TEAM 2
                  </span>
                </div>
                
                {/* Area Kanan Atas: Achievement & Logo */}
                <div className="flex items-start gap-2.5">
                  <div className="flex flex-col items-end pt-1">
                    <div className="bg-yellow-400 text-[#0B1727] text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest transform rotate-2">
                      Achievement Unlocked
                    </div>
                    <div className="bg-[#0B1727]/95 border border-yellow-400/50 text-white text-[10px] px-2 py-1 mt-1 rounded-l-full flex items-center gap-1.5 shadow-md">
                      <span className="text-yellow-400">★</span> Mentorship Active
                    </div>
                  </div>

                  {/* Logo Ruang Belajar (Putihnya di-masking) */}
                  <div className="w-11 h-11 bg-white rounded-full overflow-hidden border-2 border-[var(--color-rb-teal)] shadow-[0_0_15px_rgba(0,180,167,0.5)] flex-shrink-0 flex items-center justify-center p-0.5">
                    <img 
                      src="/logo.png" 
                      alt="Logo" 
                      className="w-full h-full object-contain rounded-full scale-110" 
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* AREA 2: PANEL INFO (Sama sekali tidak menimpa foto) */}
            <div className="shrink-0 bg-[#0B1727]/80 rounded-xl border border-[var(--color-rb-teal)]/60 p-3 shadow-lg relative overflow-hidden backdrop-blur-sm">
              
              {/* Status Minggu & Pertemuan */}
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[var(--color-rb-light)] font-mono text-[9px] font-bold tracking-widest uppercase flex items-center gap-1">
                  <span className="text-[10px]">▶</span> STAGE 01 : WEEK 1
                </span>
                <span className="bg-[var(--color-rb-teal)] text-[#0B1727] font-black text-[9px] px-2 py-0.5 rounded-sm tracking-wider">
                  CHECKPOINT #MEET3
                </span>
              </div>

              {/* Judul Program */}
              <div className="mb-3">
                <h2 className="text-sm font-black text-white uppercase tracking-wide leading-tight drop-shadow-md">
                  Mentorship Program
                </h2>
                <p className="text-[var(--color-rb-teal)] font-mono text-[9px] mt-0.5 opacity-90">
                  &gt; RuangBelajar.it
                </p>
              </div>

              {/* EXP Bar (Dengan Pahala Kesabaran!) */}
              <div className="pt-2 border-t border-[var(--color-rb-teal)]/30">
                <div className="flex justify-between text-[8px] font-mono text-white mb-1 uppercase font-bold tracking-wider">
                  <span>Problem Solving</span>
                  <span className="text-[var(--color-rb-light)]">+500 EXP</span>
                </div>
                <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden border border-[var(--color-rb-teal)]/40 shadow-inner">
                  <div className="h-full bg-gradient-to-r from-[var(--color-rb-teal)] to-[var(--color-rb-light)] w-[75%] rounded-full relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <div className="text-[7px] text-[var(--color-rb-teal)] font-mono mt-1 text-right font-bold tracking-widest">
                  [ LEVEL UP IMMINENT... ]
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}