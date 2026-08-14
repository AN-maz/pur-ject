import { useState, useRef, useEffect } from 'react';
import * as htmlToImage from 'html-to-image';

export default function CyberLiveReport() {
  const [images, setImages] = useState([]);
  const [gridCount, setGridCount] = useState(1);
  
  // State Text yang disederhanakan
  const [kegiatan, setKegiatan] = useState('SYSTEM BOOT: MEET 01');
  const [isiKegiatan, setIsiKegiatan] = useState('Mempelajari fundamental React JS, state management, dan styling menggunakan Tailwind CSS. Mission accomplished!');
  
  // State Tanggal Kustom (Default hari ini)
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  
  const canvasRef = useRef(null);

  // Membersihkan memory leak saat komponen unmount atau grid berubah
  useEffect(() => {
    return () => images.forEach(img => URL.revokeObjectURL(img));
  }, [images]);

  const handleImageUpload = (e) => {
    images.forEach(img => URL.revokeObjectURL(img)); // Bersihkan URL lama
    const files = Array.from(e.target.files).slice(0, gridCount);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages(imageUrls);
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    try {
      const dataUrl = await htmlToImage.toJpeg(canvasRef.current, {
        quality: 1.0,
        pixelRatio: 3,
      });
      
      const safeKegiatan = kegiatan.replace(/\s+/g, '-').toUpperCase();
      const link = document.createElement('a');
      link.download = `SYS-LOG-${tanggal}-${safeKegiatan}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Gagal mengekspor gambar:', error);
    }
  };

  const renderGridLayout = () => {
    return (
      <div className="flex-1 w-full flex flex-col gap-2 min-h-0 z-10 px-4 pb-4 mt-2">
        {Array.from({ length: gridCount }).map((_, index) => (
          <div
            key={index}
            className="relative flex-1 w-full bg-[#008080]/10 border border-[#20C997]/40 flex items-center justify-center min-h-0 group overflow-hidden"
          >
            {/* Sudut Cyberpunk (Corner Accents) */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#39FF5A] z-20"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#39FF5A] z-20"></div>

            {images[index] ? (
              <img
                src={images[index]}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover opacity-90 saturate-150 contrast-125"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#20C997]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[#39FF5A]/60 font-mono text-[10px] tracking-[0.2em]">
                  IMG_SLOT_0{index + 1}
                </span>
              </div>
            )}
            
            {/* Efek Garis Scanline Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIi8+Cjxwb2x5Z29uIHBvaW50cz0iMCAwIDQgNCA0IDAgMCA0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiAvPgo8L3N2Zz4=')] opacity-30 pointer-events-none z-10"></div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-8 p-6 md:p-10 bg-[#0B1727] min-h-screen font-sans text-white">
      
      <div className="flex flex-col md:flex-row gap-10 items-start justify-center w-full max-w-5xl">
        
        {/* BAGIAN KIRI: KONTROL PANEL (DARK THEME) */}
        <div className="flex flex-col gap-6 w-full md:max-w-[400px]">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[#39FF5A] rounded-full animate-pulse"></div>
              <span className="text-[#39FF5A] font-mono text-xs tracking-widest">SYSTEM_READY</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-wider">
              DATA <span className="text-[#20C997]">LOG</span>
            </h1>
            <p className="text-[#5EEAD4]/70 text-sm mt-1 font-mono">
              Upload your division protocol evidence.
            </p>
          </div>

          <div className="bg-[#11233A] p-6 rounded-xl border border-[#008080]/30 shadow-[0_0_15px_rgba(0,180,167,0.1)] space-y-6">
            
            {/* GRID SELECTION */}
            <div>
              <label className="block text-[#5EEAD4] font-mono text-[10px] font-bold mb-3 uppercase tracking-widest">
                [ Layout Protocol ]
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((count) => (
                  <button
                    key={count}
                    onClick={() => {
                      setGridCount(count);
                      setImages([]);
                    }}
                    className={`py-2 px-4 rounded-md font-mono transition-all text-xs border ${
                      gridCount === count
                        ? 'bg-[#39FF5A]/10 border-[#39FF5A] text-[#39FF5A] shadow-[0_0_10px_rgba(57,255,90,0.2)]'
                        : 'bg-[#0B1727] border-[#008080]/50 text-slate-400 hover:border-[#20C997] hover:text-[#20C997]'
                    }`}
                  >
                    {count} GRID
                  </button>
                ))}
              </div>
            </div>

            {/* UPLOAD BUTTON */}
            <label className="flex flex-col items-center justify-center gap-2 px-6 py-5 bg-[#008080]/10 border border-dashed border-[#20C997] text-[#20C997] font-mono rounded-lg cursor-pointer hover:bg-[#008080]/20 hover:text-[#39FF5A] transition-all group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-xs tracking-wider">INITIATE UPLOAD ({gridCount})</span>
              <input type="file" accept="image/*" multiple={gridCount > 1} className="hidden" onChange={handleImageUpload} />
            </label>

            {/* INPUT FIELDS */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-[#5EEAD4] font-mono text-[10px] font-bold mb-1.5 uppercase tracking-widest">
                  &gt; Tanggal Log
                </label>
                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0B1727] border border-[#008080]/50 rounded-md text-[#5EEAD4] font-mono text-xs focus:outline-none focus:border-[#39FF5A] focus:shadow-[0_0_8px_rgba(57,255,90,0.2)] transition-all"
                />
              </div>

              <div>
                <label className="block text-[#5EEAD4] font-mono text-[10px] font-bold mb-1.5 uppercase tracking-widest">
                  &gt; Nama Kegiatan
                </label>
                <input
                  type="text"
                  value={kegiatan}
                  onChange={(e) => setKegiatan(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0B1727] border border-[#008080]/50 rounded-md text-[#5EEAD4] font-mono text-xs focus:outline-none focus:border-[#39FF5A] focus:shadow-[0_0_8px_rgba(57,255,90,0.2)] transition-all"
                  placeholder="Contoh: MEET 1 - PENGANTAR JS"
                />
              </div>

              <div>
                <label className="block text-[#5EEAD4] font-mono text-[10px] font-bold mb-1.5 uppercase tracking-widest">
                  &gt; Isi Kegiatan
                </label>
                <textarea
                  value={isiKegiatan}
                  onChange={(e) => setIsiKegiatan(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2.5 bg-[#0B1727] border border-[#008080]/50 rounded-md text-slate-300 font-mono text-xs focus:outline-none focus:border-[#39FF5A] focus:shadow-[0_0_8px_rgba(57,255,90,0.2)] transition-all resize-none"
                  placeholder="Ceritakan detail tugas..."
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={images.length === 0}
            className="w-full flex items-center justify-center gap-2 bg-[#39FF5A] text-[#0B1727] font-black py-3.5 rounded-md hover:bg-[#20C997] transition-all shadow-[0_0_15px_rgba(57,255,90,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none uppercase tracking-widest text-sm font-mono"
          >
            Export Sys.Log
          </button>
        </div>

        {/* BAGIAN KANAN: AREA PREVIEW GAMIFIKASI (PORTRAIT) */}
        <div className="relative w-[360px] h-[640px] flex-shrink-0 bg-[#0B1727] ring-1 ring-[#008080] shadow-[0_0_30px_rgba(0,180,167,0.15)] overflow-hidden">
          
          {/* PEMBUNGKUS UTAMA CANVAS */}
          <div ref={canvasRef} className="w-full h-full flex flex-col relative font-sans bg-[#0B1727]">
            
            {/* Background Ornamen Grid Cyberpunk */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,180,167,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,180,167,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

            {/* HEADER LOGO DENGAN PANEL TERANG */}
            <div className="w-full flex justify-between items-center px-4 pt-5 pb-3 z-10">
              
              {/* Panel Logo Oxigen */}
              <div className="flex items-center justify-center p-1.5 bg-[#E6FFFA]/90 backdrop-blur-sm border border-[#20C997] rounded shadow-[0_0_10px_rgba(32,201,151,0.3)]">
                <img src="/oxigen.webp" alt="Oxigen Logo" className="h-6 w-auto object-contain" />
              </div>
              
              <div className="flex items-center gap-1 px-3 py-1 bg-[#008080]/30 border border-[#20C997]/50 rounded-full shadow-[0_0_8px_rgba(0,180,167,0.2)]">
                <div className="w-1.5 h-1.5 bg-[#39FF5A] rounded-full animate-pulse shadow-[0_0_5px_#39FF5A]"></div>
                <span className="text-[#39FF5A] text-[8px] font-mono tracking-widest uppercase">Live Report</span>
              </div>

              {/* Panel Logo Software */}
              <div className="flex items-center justify-center p-1.5 bg-[#E6FFFA]/90 backdrop-blur-sm border border-[#20C997] rounded shadow-[0_0_10px_rgba(32,201,151,0.3)]">
                <img src="/software.png" alt="Software Logo" className="h-6 w-auto object-contain" />
              </div>
            </div>

            {/* RENDER GRID GAMBAR */}
            {renderGridLayout()}

            {/* BOTTOM INFO PANEL - Cyberpunk Box */}
            <div className="relative w-full z-10 px-4 pb-4 pt-2">
              
              <div className="bg-[#11233A]/90 backdrop-blur-md border-l-2 border-[#39FF5A] p-4 relative overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                {/* Aksen Garis di atas box */}
                <div className="absolute top-0 right-0 w-16 h-px bg-[#39FF5A] shadow-[0_0_5px_#39FF5A]"></div>
                
                {/* Lencana Divisi */}
                <div className="inline-block bg-[#39FF5A] text-[#0B1727] px-2.5 py-0.5 text-[9px] font-black tracking-widest uppercase mb-2 shadow-[0_0_8px_rgba(57,255,90,0.4)]">
                  DIVISI SOFTWARE
                </div>

                {/* Judul Kegiatan */}
                <h2 className="text-[#5EEAD4] text-base font-bold uppercase leading-tight mb-1.5 font-mono drop-shadow-sm">
                  {kegiatan}
                </h2>

                {/* Deskripsi Kegiatan */}
                <p className="text-slate-300 text-[10px] leading-relaxed break-words opacity-90">
                  {isiKegiatan}
                </p>

                {/* Dekorasi Bawah Panel (Menampilkan Tanggal Kustom) */}
                <div className="mt-3 pt-2 border-t border-[#008080]/40 flex justify-between items-center">
                  <span className="text-[#008080] font-mono text-[8px] tracking-widest font-bold">
                    SYS.LOG // {tanggal.replace(/-/g, '.')}
                  </span>
                  <div className="flex gap-1">
                    <div className="w-3 h-1 bg-[#20C997]/50"></div>
                    <div className="w-1 h-1 bg-[#39FF5A]"></div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}