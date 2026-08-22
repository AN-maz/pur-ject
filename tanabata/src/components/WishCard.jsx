import React, { useRef, useState } from 'react';
import { X, Sparkles, Terminal, Download, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toJpeg } from 'html-to-image';

export default function WishCard({ wish, onClose }) {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  if (!wish) return null;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      // Konversi DOM node ke file PNG
      const dataUrl = await toJpeg(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2, // Kualitas HD/Tajam untuk Story
      });

      const link = document.createElement('a');
      link.download = `Tanabata-${wish.name || 'Wish'}.jpeg`;
      link.href = dataUrl;
      link.click();

      setIsDownloaded(true);
      setTimeout(() => setIsDownloaded(false), 2500);
    } catch (err) {
      console.error('Gagal mengunduh gambar:', err);
      alert('Gagal mendownload kartu. Silakan coba lagi.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="flex flex-col items-center gap-3 my-auto"
        >
          {/* Container Kartu 9:16 (Yang akan di-capture) */}
          <div
            ref={cardRef}
            className="relative w-[320px] sm:w-[340px] aspect-[9/16] rounded-3xl bg-[#030712] border-2 border-cyan-500/40 text-white shadow-[0_0_40px_rgba(6,182,212,0.25)] p-6 flex flex-col justify-between overflow-hidden"
          >
            {/* Background Decorative Gradient */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/40 via-transparent to-rose-950/20" />
            <div
              className="absolute top-0 left-0 right-0 h-1.5 shadow-[0_0_15px_currentColor]"
              style={{ backgroundColor: wish.color || '#f43f5e', color: wish.color || '#f43f5e' }}
            />

            {/* Top Section: Logos & Event Header */}
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-cyan-500/40 bg-slate-900/90 p-1 flex items-center justify-center overflow-hidden">
                    <img
                      src="/logos/software.webp"
                      alt="UKM 1"
                      crossOrigin="anonymous"
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerText = 'UKM1'; }}
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border border-rose-500/40 bg-slate-900/90 p-1 flex items-center justify-center overflow-hidden">
                    <img
                      src="/logos/oxigen.webp"
                      alt="UKM 2"
                      crossOrigin="anonymous"
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerText = 'UKM2'; }}
                    />
                  </div>
                </div>
                <span className="text-[9px] font-mono tracking-widest text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                  COLLAB EXHIBITION
                </span>
              </div>

              <div className="mt-3.5 text-left">
                <p className="text-[10px] font-mono text-cyan-300">七夕とアルゴリズム</p>
                <h2 className="text-base font-extrabold tracking-wider bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                  TANABATA <span className="text-[9px] font-mono text-slate-400">TO</span> ALGORITHM
                </h2>
                <p className="text-[9px] text-slate-400 font-mono">Technology ✕ Culture</p>
              </div>
            </div>

            {/* Center Section: Pita Tanzaku & Harapan */}
            <div className="relative z-10 my-auto py-2">
              <div className="relative mx-auto w-full p-4 sm:p-5 rounded-2xl bg-slate-900/85 border border-slate-700/80 backdrop-blur-md shadow-xl text-center">
                {/* Ornamen Pita */}
                <div className="flex justify-center -mt-7 mb-2.5">
                  <div
                    className="w-7 h-10 rounded-b-md shadow-lg flex items-center justify-center text-[10px]"
                    style={{ backgroundColor: wish.color || '#f43f5e' }}
                  >
                    🎋
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-800/90 border border-slate-700 mb-2.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: wish.color || '#f43f5e' }}
                  />
                  <span className="text-xs font-semibold text-slate-200">
                    {wish.name || 'Anonim'}
                  </span>
                </div>

                <p className="text-sm text-slate-100 font-serif italic leading-relaxed px-1">
                  "{wish.wish}"
                </p>
              </div>
            </div>

            {/* Bottom Section: Slogan & Motif */}
            <div className="relative z-10 pt-2 border-t border-slate-800 text-center space-y-1">
              <p className="text-[10px] text-slate-300 font-medium tracking-wide">
                Satu <span className="text-amber-400">Hoshi</span>, Satu <span className="text-cyan-400">Koneksi</span>, Banyak <span className="text-rose-400">Inovasi</span>!
              </p>
              <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-500 font-mono">
                <Terminal size={11} className="text-cyan-400" />
                <span>星がつながり、想いがコードになる。</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Download & Close (Di luar container capture) */}
          <div className="flex items-center gap-3 w-full max-w-[320px] sm:max-w-[340px]">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 flex items-center justify-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-mono text-xs py-2.5 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.2)] transition active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isDownloaded ? (
                <>
                  <Check size={15} className="text-emerald-400" />
                  <span className="text-emerald-400">Tersimpan di Galeri!</span>
                </>
              ) : (
                <>
                  <Download size={15} />
                  <span>{downloading ? 'Membuat Story...' : 'Download untuk SG'}</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition active:scale-95"
              title="Tutup"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}