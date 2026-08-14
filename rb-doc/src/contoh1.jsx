import { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';

export default function GamifiedLiveReport() {
  const [images, setImages] = useState([]);
  const [gridCount, setGridCount] = useState(1);
  const [stage, setStage] = useState('STAGE 01 : WEEK 1');
  const [checkpoint, setCheckpoint] = useState('CHECKPOINT #MEET3');
  const [problemSolving, setProblemSolving] = useState('+500 PAHALA KESABARAN');
  const [teamName, setTeamName] = useState('TEAM 2');
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
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
      const link = document.createElement('a');
      link.download = 'Live-Report-Meet3.jpg';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Gagal mengekspor gambar:', error);
    }
  };

  const renderGridLayout = () => {
    return (
      // Tambahkan absolute inset-0 agar benar-benar mengunci pada ukuran parent (tidak molor ke bawah)
      <div className="absolute inset-0 w-full h-full flex flex-col">
        {Array.from({ length: gridCount }).map((_, index) => (
          <div
            key={index}
            className="relative w-full flex-1 flex items-center justify-center bg-slate-200 overflow-hidden border-b border-slate-300 last:border-b-0 min-h-0"
          >
            {images[index] ? (
              <img
                src={images[index]}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-teal-600/50 font-mono text-xs z-10 font-semibold tracking-wider">
                [ FOTO {index + 1} ]
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-8 p-6 md:p-10 bg-slate-50 min-h-screen font-sans text-slate-800">
      
      {/* NAVIGASI ATAS */}
      <div className="w-full max-w-5xl flex justify-start">
        <a
          href="/"
          className="flex items-center gap-2 text-teal-700 hover:text-teal-900 transition-colors font-bold bg-teal-100 hover:bg-teal-200 px-5 py-2.5 rounded-xl shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Kembali ke Home
        </a>
      </div>

      <div className="flex flex-col md:flex-row gap-10 items-start justify-center w-full max-w-5xl">
        
        {/* BAGIAN KIRI: KONTROL PANEL */}
        <div className="flex flex-col gap-6 w-full md:max-w-[400px]">
          <div>
            <h1 className="text-4xl font-black text-slate-900 italic tracking-widest drop-shadow-sm">
              QUEST <span className="text-teal-600">REPORT</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1.5 font-medium">
              Upload bukti penyelesaian misimu!
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div>
              <label className="block text-slate-700 text-sm font-bold mb-3 uppercase tracking-wide">
                Pilih Grid Layout
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((count) => (
                  <button
                    key={count}
                    onClick={() => {
                      setGridCount(count);
                      setImages([]);
                    }}
                    className={`py-2.5 px-4 rounded-xl font-bold transition-all text-sm ${
                      gridCount === count
                        ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-teal-400 hover:text-teal-600'
                    }`}
                  >
                    {count} Foto
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center justify-center gap-3 px-6 py-4 bg-teal-50/50 border-2 border-dashed border-teal-400 text-teal-700 font-bold rounded-xl cursor-pointer hover:bg-teal-50 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Pilih Foto ({gridCount})</span>
              <input type="file" accept="image/*" multiple={gridCount > 1} className="hidden" onChange={handleImageUpload} />
            </label>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-slate-600 text-xs font-bold mb-1.5 uppercase tracking-wide">
                  Team Name
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="TEAM 2"
                />
              </div>

              <div>
                <label className="block text-slate-600 text-xs font-bold mb-1.5 uppercase tracking-wide">
                  Stage
                </label>
                <input
                  type="text"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="STAGE 01 : WEEK 1"
                />
              </div>

              <div>
                <label className="block text-slate-600 text-xs font-bold mb-1.5 uppercase tracking-wide">
                  Checkpoint
                </label>
                <input
                  type="text"
                  value={checkpoint}
                  onChange={(e) => setCheckpoint(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="CHECKPOINT #MEET5"
                />
              </div>

              <div>
                <label className="block text-slate-600 text-xs font-bold mb-1.5 uppercase tracking-wide">
                  Deskripsi EXP Bar
                </label>
                <input
                  type="text"
                  value={problemSolving}
                  onChange={(e) => setProblemSolving(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="+500 PAHALA KESABARAN"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={images.length === 0}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white font-bold py-3.5 rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Download IG Story
          </button>
        </div>

        {/* BAGIAN KANAN: AREA PREVIEW GAMIFIKASI (PORTRAIT) */}
        <div className="relative w-[360px] h-[640px] shadow-2xl flex-shrink-0 rounded-2xl overflow-hidden ring-4 ring-white">
          
          {/* PEMBUNGKUS UTAMA CANVAS (Yang diexport jadi JPG) */}
          <div ref={canvasRef} className="w-full h-full bg-slate-100 flex flex-col p-3 gap-3">
            
            {/* AREA 1: FOTO KELOMPOK / KOLASE - Tambahan min-h-0 di container parent agar tidak molor */}
            <div className="relative flex-1 w-full flex flex-col rounded-xl overflow-hidden border border-slate-300 bg-white shadow-sm z-0 min-h-0">
              
              {/* LENCANA HEADER - Ditambah shrink-0 agar ukurannya paten */}
              <div className="w-full flex justify-between items-start z-10 bg-white p-3 pb-2.5 shrink-0 border-b border-slate-100">
                <div className="mt-0.5 -ml-3">
                  <span className="bg-slate-50 text-teal-700 px-4 py-2 text-xs font-black border-l-4 border-teal-500 shadow-sm uppercase tracking-wider rounded-r-md">
                    {teamName}
                  </span>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-end pt-0.5">
                    <div className="bg-yellow-400 text-slate-900 text-[9px] font-black px-2.5 py-1 rounded-sm uppercase tracking-widest transform rotate-2 shadow-sm">
                      Achievement Unlocked
                    </div>
                    <div className="bg-white border border-slate-200 text-slate-700 font-bold text-[10px] px-2.5 py-1 mt-1.5 rounded-l-full flex items-center gap-1.5 shadow-sm">
                      <span className="text-yellow-500 text-xs">★</span> Mentorship Active
                    </div>
                  </div>

                  <div className="w-11 h-11 bg-white rounded-full overflow-hidden border-[3px] border-teal-500 shadow-sm flex-shrink-0 flex items-center justify-center p-0.5">
                    <img
                      src="/logo.png"
                      alt="Logo"
                      className="w-full h-full object-contain rounded-full scale-110"
                    />
                  </div>
                </div>
              </div>

              {/* Tempat Gambar Grid - ditambah min-h-0 */}
              <div className="relative flex-1 w-full min-h-0 z-0 bg-slate-200">
                {renderGridLayout()}
              </div>

            </div>

            {/* AREA 2: PANEL INFO (Di bawah) */}
            <div className="shrink-0 bg-white/95 rounded-xl border border-slate-200 p-3 shadow-sm relative overflow-hidden backdrop-blur-md">
              
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-teal-700 font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                  <span className="text-[10px]">▶</span> {stage}
                </span>
                <span className="bg-teal-100 text-teal-800 font-black text-[9px] px-2 py-0.5 rounded-md tracking-wider">
                  {checkpoint}
                </span>
              </div>

              <div className="mb-2.5">
                <h2 className="text-xs font-black text-slate-900 uppercase tracking-wide leading-tight">
                  Mentorship Program
                </h2>
                <p className="text-teal-600 font-mono text-[9px] mt-0 font-semibold">
                  &gt; RuangBelajar.it
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/80">
                <div className="flex justify-between text-[8px] font-mono text-slate-700 mb-1 uppercase font-bold tracking-wider">
                  <span>{problemSolving}</span>
                  <span className="text-teal-600 font-black">+500 EXP</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
                  <div className="h-full bg-gradient-to-r from-teal-400 to-teal-500 w-[75%] rounded-full relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-white/30 animate-pulse"></div>
                  </div>
                </div>
                <div className="text-[7px] text-teal-600 font-mono mt-1 text-right font-black tracking-widest">
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