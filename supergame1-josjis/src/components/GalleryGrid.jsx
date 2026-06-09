import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import galleryData from '../data/gallery.json';

export default function GalleryGrid({ onBack, selectedItem, setSelectedItem }) {
  // --- STATES ---
  const [activeCategory, setActiveCategory] = useState('ALL STAGES');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12); // Tampilkan 12 foto pertama

  // --- MEMOIZED DATA ---
  const categories = useMemo(() => ['ALL STAGES', ...new Set(galleryData.map(item => item.category || 'SUPERGAMES ARCHIVE'))], []);
  
  const filteredData = useMemo(() => {
    return activeCategory === 'ALL STAGES' 
      ? galleryData 
      : galleryData.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Reset jumlah foto yang tampil setiap kali ganti filter kategori
  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory]);

  // --- AUTO SCROLL OPTIMIZED (Ringan untuk CPU/GPU) ---
  useEffect(() => {
    if (selectedItem || !isAutoScrollActive) return;

    let animationFrameId;
    const scroll = () => {
      window.scrollBy({ top: 1, left: 0 });
      animationFrameId = requestAnimationFrame(scroll);
    };

    const timeout = setTimeout(() => {
      animationFrameId = requestAnimationFrame(scroll);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedItem, isAutoScrollActive]);

  const hoverColors = ['hover:shadow-[8px_8px_0px_#FF6B6B]', 'hover:shadow-[8px_8px_0px_#FFD93D]', 'hover:shadow-[8px_8px_0px_#6BCB77]', 'hover:shadow-[8px_8px_0px_#4D96FF]'];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1, transition: { duration: 0.6 } }} 
      exit={{ opacity: 0 }}
      className="relative z-10 w-full min-h-screen bg-[#F8F9FA]"
    >
      {/* Background Latar Galeri */}
      <div className="absolute inset-0 pointer-events-none opacity-30 fixed" style={{
        backgroundImage: 'linear-gradient(#CBD5E1 2px, transparent 2px), linear-gradient(90deg, #CBD5E1 2px, transparent 2px)', backgroundSize: '60px 60px'
      }}></div>

      {/* 1. PETUNJUK KLIK */}
      <AnimatePresence>
        {!selectedItem && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-[90] pointer-events-none">
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="bg-[#FFD93D] px-5 py-2 rounded-full border-4 border-[#0A2B3E] shadow-[4px_4px_0px_#0A2B3E] flex items-center gap-2">
              <span className="text-sm md:text-base">👆</span>
              <span className="text-[#0A2B3E] font-black tracking-wide text-xs md:text-sm uppercase whitespace-nowrap">Klik foto untuk detail</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. DROPDOWN FILTER KATEGORI (Level Select) */}
      <div className="relative z-50 w-full max-w-7xl mx-auto pt-10 px-4 flex justify-center">
        <div className="relative w-64 md:w-72">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full bg-white text-[#0A2B3E] border-4 border-[#0A2B3E] px-5 py-3 rounded-2xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_#0A2B3E] flex items-center justify-between">
            <span>🎰 {activeCategory}</span>
            <span className={`transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
          </motion.button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 5 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 w-full bg-white border-4 border-[#0A2B3E] rounded-2xl shadow-[6px_6px_0px_#0A2B3E] overflow-hidden p-1 flex flex-col gap-1 mt-2">
                {categories.map((cat, idx) => (
                  <button key={idx} onClick={() => { setActiveCategory(cat); setIsDropdownOpen(false); }} className={`w-full text-left px-4 py-2.5 rounded-xl font-extrabold text-xs md:text-sm uppercase transition-colors ${activeCategory === cat ? 'bg-[#FF6B6B] text-white' : 'text-[#0A2B3E] hover:bg-[#FFD93D]/40'}`}>
                    🎯 {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. BENTO GRID ASIMETRIS */}
      <div className="relative z-10 w-full grid grid-cols-2 md:grid-cols-12 gap-4 p-4 md:gap-6 md:p-8 auto-rows-[180px] md:auto-rows-[240px] max-w-7xl mx-auto pt-8">
        <AnimatePresence>
          {filteredData.slice(0, visibleCount).map((item, index) => {
            // Logika Grid Asimetris (Bento Grid)
            let gridClass = "col-span-1 row-span-1"; 
            if (index % 4 === 0) gridClass = "col-span-2 row-span-1 md:col-span-6 md:row-span-2";
            else if (index % 4 === 1) gridClass = "col-span-1 row-span-2 md:col-span-3 md:row-span-2";
            else if (index % 4 === 2) gridClass = "col-span-1 row-span-1 md:col-span-3 md:row-span-1";
            else if (index % 4 === 3) gridClass = "col-span-2 row-span-1 md:col-span-3 md:row-span-1";

            const randomShadow = hoverColors[index % hoverColors.length];
            const isRotated = item.image.includes('IMG') || item.image.includes('DSC');

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedItem(item)}
                className={`relative overflow-hidden rounded-3xl group ${gridClass} bg-white border-4 border-[#0A2B3E] shadow-[4px_4px_0px_#0A2B3E] ${randomShadow} cursor-pointer transition-shadow z-10`}
              >
                <img 
                  src={item.image} 
                  alt={item.tag}
                  loading="lazy" // Lazy Load agar memori hemat
                  decoding="async"
                  className={`w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105 ${isRotated ? '-rotate-90 scale-[1.35]' : ''}`}
                />
                <div className="absolute bottom-4 left-4 right-4 flex pointer-events-none">
                  <div className="bg-[#0A2B3E] text-white px-4 py-2 rounded-xl border-2 border-[#0A2B3E] shadow-[4px_4px_0px_#FFD93D] group-hover:shadow-[4px_4px_0px_#FF6B6B] transition-shadow">
                    <h2 className="text-sm md:text-xl font-extrabold tracking-wide line-clamp-1">{item.tag}</h2>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 4. TOMBOL LOAD MORE (PAGINATION) */}
      {visibleCount < filteredData.length && (
        <div className="relative z-10 flex justify-center pb-10">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setVisibleCount(prev => prev + 12)} className="px-8 py-3 bg-[#FFD93D] border-4 border-[#0A2B3E] text-[#0A2B3E] font-black rounded-full shadow-[4px_4px_0px_#0A2B3E]">
            + MUAT LEBIH BANYAK ({filteredData.length - visibleCount} lagi)
          </motion.button>
        </div>
      )}

      {/* FOOTER */}
      <div className="py-12 flex flex-col items-center justify-center gap-6 relative z-10">
        <h3 className="text-[#0A2B3E] text-lg font-bold tracking-[0.2em] opacity-80">GAME OVER</h3>
        <motion.button whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95, y: 0, boxShadow: "0px 0px 0px #0A2B3E" }} onClick={onBack} className="px-8 py-3 bg-white border-4 border-[#0A2B3E] text-[#0A2B3E] font-extrabold rounded-full shadow-[4px_4px_0px_#0A2B3E] hover:shadow-[6px_6px_0px_#4D96FF] transition-all">
          KEMBALI KE START
        </motion.button>
      </div>

      {/* TOMBOL KONTROL AUTO-SCROLL */}
      <AnimatePresence>
        {!selectedItem && (
          <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} whileHover={{ scale: 1.1, y: -4 }} whileTap={{ scale: 0.9, y: 0 }} onClick={() => setIsAutoScrollActive(!isAutoScrollActive)} className={`fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[9999] w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border-4 border-[#0A2B3E] shadow-[4px_4px_0px_#0A2B3E] transition-colors text-xl md:text-2xl cursor-pointer ${isAutoScrollActive ? 'bg-[#6BCB77] text-white' : 'bg-[#FF6B6B] text-white'}`}>
            {isAutoScrollActive ? '▶️' : '⏸️'}
          </motion.button>
        )}
      </AnimatePresence>

      {/* 5. MODAL DETAIL SUPER RINGAN (Tanpa layoutId) */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#F8F9FA]/90">
            
            {/* Latar Belakang & Ornamen Draggable */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-0">
              <div className="absolute inset-0 pointer-events-none opacity-50" style={{ backgroundImage: 'linear-gradient(#CBD5E1 2px, transparent 2px), linear-gradient(90deg, #CBD5E1 2px, transparent 2px)', backgroundSize: '60px 60px' }}></div>
              <motion.div drag dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }} whileDrag={{ scale: 1.1, rotate: 10 }} className="absolute top-10 left-4 md:left-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#FFD93D] border-4 border-[#0A2B3E] shadow-[6px_6px_0px_#0A2B3E] cursor-grab active:cursor-grabbing" />
              <motion.div drag dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }} whileDrag={{ scale: 1.1, rotate: 30 }} className="absolute bottom-20 right-10 md:right-32 w-20 h-20 md:w-32 md:h-32 bg-[#FF6B6B] border-4 border-[#0A2B3E] shadow-[6px_6px_0px_#0A2B3E] rotate-12 cursor-grab active:cursor-grabbing" />
              <motion.div drag dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }} whileDrag={{ scale: 1.1, rotate: -20 }} className="absolute top-1/3 right-4 md:right-16 w-12 h-12 md:w-16 md:h-16 bg-[#6BCB77] border-4 border-[#0A2B3E] shadow-[4px_4px_0px_#0A2B3E] rotate-45 cursor-grab active:cursor-grabbing" />
            </motion.div>

            {/* Tombol Close */}
            <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white border-4 border-[#0A2B3E] shadow-[4px_4px_0px_#0A2B3E] text-[#0A2B3E] hover:bg-[#FF6B6B] hover:text-white transition-all text-2xl md:text-3xl font-black z-50 cursor-pointer">
              ✕
            </button>

            {/* Kontainer Foto (Animasi Scale Spring GPU-Friendly) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              style={{ willChange: "transform, opacity" }}
              className="relative w-full h-full md:h-[90vh] md:max-w-[90vw] md:rounded-[2rem] bg-transparent flex items-center justify-center z-10 p-4 md:p-10 pointer-events-none"
            >
              <img 
                src={selectedItem.image} 
                alt={selectedItem.tag} 
                className={`w-full h-full object-contain pointer-events-auto ${selectedItem.image.includes('IMG') || selectedItem.image.includes('DSC') ? '-rotate-90' : ''}`} 
              />
              
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }} exit={{ opacity: 0, y: 30 }} className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-[85%] md:max-w-xl bg-white border-4 border-[#0A2B3E] shadow-[8px_8px_0px_#0A2B3E] p-5 md:p-8 rounded-2xl z-50 pointer-events-auto">
                <div className="inline-block bg-[#4D96FF] text-white px-3 py-1 rounded-full border-2 border-[#0A2B3E] font-bold text-xs md:text-sm mb-3 shadow-[2px_2px_0px_#0A2B3E]">{selectedItem.category || 'SUPERGAMES ARCHIVE'}</div>
                <h2 className="text-2xl md:text-4xl font-black text-[#0A2B3E] mb-2 uppercase">{selectedItem.tag}</h2>
                <p className="text-[#0A2B3E]/80 font-bold text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">{selectedItem.description}</p>
              </motion.div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}