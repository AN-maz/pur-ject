import React, { useEffect, useState } from 'react';
import Canvas3D from './components/Canvas3D';
import WishCard from './components/WishCard';
import WishModal from './components/WishModal';
import WishSearchModal from './components/WishSearchModal';
import { subscribeWishes } from './lib/firebase';
import { Plus, Search, Sparkles, Terminal } from 'lucide-react';

export default function App() {
  const [wishes, setWishes] = useState([]);
  const [selectedWish, setSelectedWish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeWishes((data) => {
      setWishes(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="relative w-screen h-screen bg-[#030712] overflow-hidden select-none font-sans text-slate-100 flex flex-col justify-between">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950/40 to-transparent z-0" />

      {/* Top Bar: Header & 2 UKM Logos */}
      <header className="relative z-10 p-4 md:px-8 border-b border-cyan-500/10 backdrop-blur-md bg-slate-950/40 flex items-center justify-between">
        <div>
          <span className="text-[9px] md:text-xs tracking-[0.25em] uppercase text-cyan-400 font-mono flex items-center gap-1">
            <Sparkles size={11} className="text-cyan-400 animate-pulse" />
            Collaboration Exhibition
          </span>
          <span className="text-[11px] md:text-xs text-slate-400 font-medium">
            Technology <span className="text-rose-500">✕</span> Culture
          </span>
        </div>

        {/* 2 UKM Logos */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-cyan-500/30 bg-slate-900/90 p-1 shadow-[0_0_10px_rgba(6,182,212,0.2)] flex items-center justify-center overflow-hidden">
            <img src="/logos/software.webp" alt="UKM 1" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerText = 'UKM1'; }} />
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-rose-500/30 bg-slate-900/90 p-1 shadow-[0_0_10px_rgba(244,63,94,0.2)] flex items-center justify-center overflow-hidden">
            <img src="/logos/oxigen.webp" alt="UKM 2" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerText = 'UKM2'; }} />
          </div>
        </div>
      </header>

      {/* Hero Title */}
      <div className="absolute top-20 left-4 md:left-8 z-10 pointer-events-none">
        <div className="inline-block bg-slate-900/70 border border-cyan-500/20 backdrop-blur-md px-2.5 py-1 rounded-md mb-1.5">
          <p className="text-[10px] md:text-xs text-cyan-300 font-mono">七夕とアルゴリズム</p>
        </div>
        <h1 className="text-lg md:text-2xl font-extrabold tracking-wider bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent leading-tight">
          TANABATA <span className="text-[10px] font-mono text-slate-400">TO</span> ALGORITHM
        </h1>
        <p className="text-[10px] md:text-xs text-slate-400 font-light tracking-wide mt-0.5">
          星がつながり、想いがコードになる。
        </p>
      </div>

      {/* Code Snippet (Desktop Only) */}
      <div className="hidden lg:block absolute top-24 right-8 z-10 pointer-events-none w-60 p-3 rounded-xl bg-slate-950/75 border border-cyan-500/20 backdrop-blur-md font-mono text-[11px] text-cyan-400/90">
        <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-cyan-500/20 text-slate-400 text-[10px]">
          <Terminal size={12} className="text-cyan-400" />
          <span>algorithm.js</span>
        </div>
        <p><span className="text-rose-400">function</span> connect(star) &#123;</p>
        <p className="pl-3">connection = share(create());</p>
        <p className="pl-3 text-cyan-300"><span className="text-rose-400">return</span> innovate(connection);</p>
        <p>&#125;</p>
      </div>

      {/* 3D Scene Viewport */}
      <div className="absolute inset-0 z-0">
        <Canvas3D wishes={wishes} onSelectWish={(wish) => setSelectedWish(wish)} />
      </div>

      {/* Bottom Floating Actions & Slogan */}
      <footer className="relative z-10 p-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-none">
        <div className="text-center md:text-left">
          <p className="text-[11px] md:text-xs font-medium text-slate-300">
            Satu <span className="text-amber-400 font-semibold">Hoshi</span>, Satu <span className="text-cyan-400 font-semibold">Koneksi</span>, Banyak <span className="text-rose-400 font-semibold">Inovasi</span>!
          </p>
        </div>

        {/* Dual Button Group (Search & Create Wish) */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          {/* Tombol Cari Harapan */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-cyan-300 text-xs md:text-sm font-mono px-4 py-3 rounded-full border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
          >
            <Search size={15} />
            <span>Cari Harapan</span>
          </button>

          {/* Redesain Tombol Gantung Harapan (Cyber-Festive) */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs md:text-sm font-semibold px-5 py-3 rounded-full shadow-[0_0_25px_rgba(244,63,94,0.45)] transition-all hover:scale-105 active:scale-95 cursor-pointer border border-rose-300/40"
          >
            <Plus size={16} />
            <span>Gantung Harapan</span>
          </button>
        </div>
      </footer>

      {/* Pop-up Modals */}
      <WishCard wish={selectedWish} onClose={() => setSelectedWish(null)} />
      <WishSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        wishes={wishes}
        onSelectWish={(wish) => setSelectedWish(wish)}
      />
      <WishModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}