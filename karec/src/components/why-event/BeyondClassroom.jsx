import { useState, useRef } from 'react';
import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import { opportunities } from '../../data/stories';

export default function BeyondClassroom() {
  const revealRef = useReveal();
  const sliderRef = useRef(null);

  // State untuk menyimpan card yang sedang dibuka di modal
  const [selectedCard, setSelectedCard] = useState(null);

  // Fungsi untuk menggeser slider ke kiri atau kanan
  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.75;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-ec-navy via-ec-blue to-ec-navy border-t-8 border-blue-900/60 relative overflow-hidden">
      
      {/* CSS Custom Animation untuk Modal Pop-up */}
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalScaleUp {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-backdrop {
          animation: modalFadeIn 0.25s ease-out forwards;
        }
        .animate-modal-pop {
          animation: modalScaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Background Grid Pattern & Glow Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <div ref={revealRef} className="reveal-up relative z-10">
          
          {/* Header & Slider Navigation Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
            <div className="max-w-2xl">
              
              {/* Retro Skewed Badge (Tanpa Emoji) */}
              <div className="inline-flex items-center -skew-x-12 bg-gradient-to-r from-blue-900/90 via-ec-navy to-blue-900/90 border-2 border-amber-400/80 px-4 py-1.5 mb-4 shadow-[4px_4px_0px_rgba(245,158,11,0.5)] rounded-md backdrop-blur-md">
                <span className="skew-x-12 text-amber-300 text-xs sm:text-sm font-black tracking-widest uppercase">
                  UNLIMITED OPPORTUNITIES
                </span>
              </div>

              <SectionTitle subtitle="Bahasa Inggris membuka kesempatan, pengalaman, koneksi, dan perjalanan baru">
                English Opens More<br className="hidden sm:inline" /> Than Conversations
              </SectionTitle>
            </div>

            {/* Tombol Navigasi Slider (SVG Arrow Icons) */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <button
                onClick={() => scroll('left')}
                aria-label="Previous Slide"
                className="w-11 h-11 rounded-xl bg-blue-950/90 border-2 border-blue-600/60 hover:border-amber-400 text-white flex items-center justify-center transition-all duration-300 hover:bg-amber-400 hover:text-ec-navy shadow-lg active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Next Slide"
                className="w-11 h-11 rounded-xl bg-blue-950/90 border-2 border-blue-600/60 hover:border-amber-400 text-white flex items-center justify-center transition-all duration-300 hover:bg-amber-400 hover:text-ec-navy shadow-lg active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Horizontal Scrollable Cards Container */}
          <div
            ref={sliderRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {opportunities.map((opportunity, index) => (
              <div
                key={opportunity.id || index}
                onClick={() => setSelectedCard({ ...opportunity, index: index + 1 })}
                className="snap-start shrink-0 w-[280px] sm:w-[330px] md:w-[370px] group relative bg-gradient-to-br from-ec-card/95 via-blue-950/90 to-ec-card/95 border-2 border-blue-700/50 hover:border-amber-400/80 rounded-2xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_30px_rgba(245,158,11,0.25)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col cursor-pointer"
              >
                {/* Photo Header Container */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-blue-950">
                  <img
                    src={
                      opportunity.image ||
                      `https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop`
                    }
                    alt={opportunity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Bottom Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ec-card/95 via-transparent to-transparent" />

                  {/* Card Index Tag */}
                  <span className="absolute top-3 right-3 bg-blue-950/80 border border-amber-400/60 text-amber-300 font-black text-xs px-2.5 py-1 rounded-lg backdrop-blur-md">
                    0{index + 1}
                  </span>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors mb-2">
                      {opportunity.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-100/80 font-medium leading-relaxed line-clamp-3">
                      {opportunity.description}
                    </p>
                  </div>

                  {/* Bottom Accent Footer */}
                  <div className="mt-6 pt-4 border-t border-blue-800/60 flex items-center justify-between text-xs font-bold text-amber-400">
                    <span className="tracking-wider uppercase group-hover:underline">VIEW DETAILS</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7M3 12h18" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Subtext */}
          <div className="text-center mt-8 max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm text-blue-300/90 italic font-medium">
              English Club menjadi tempat yang membuka kemungkinan tersebut.
            </p>
          </div>

        </div>
      </Container>

      {/* ========================================================= */}
      {/* POP-UP MODAL DETAIL & FOTO UTUH */}
      {/* ========================================================= */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-backdrop">
          
          {/* Overlay Backdrop Click to Close */}
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setSelectedCard(null)} 
          />

          {/* Modal Content Box */}
          <div className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 border-2 border-amber-400/80 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.3)] flex flex-col animate-modal-pop">
            
            {/* Top Glowing Accent Line */}
            <div className="h-2 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 shrink-0" />

            {/* Tombol Close (X) */}
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white bg-blue-900/80 hover:bg-amber-500 hover:text-slate-950 rounded-full border border-blue-600 hover:border-amber-400 transition-all z-20 shadow-lg"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>

            {/* Scrollable Container Inside Modal */}
            <div className="overflow-y-auto p-5 sm:p-8 flex-1 custom-scrollbar">
              
              {/* CONTAINER FOTO UTUH (OBJECT-CONTAIN) */}
              <div className="relative w-full max-h-[380px] sm:max-h-[420px] bg-slate-950/90 rounded-2xl border border-blue-800/80 overflow-hidden flex items-center justify-center p-2 mb-6 shadow-inner">
                <img
                  src={
                    selectedCard.image ||
                    `https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop`
                  }
                  alt={selectedCard.title}
                  className="w-full h-full max-h-[360px] sm:max-h-[400px] object-contain rounded-xl"
                />
                
                {/* Badge Card Index dalam Pop-up */}
                <div className="absolute bottom-3 left-3 bg-blue-950/90 border border-amber-400/80 text-amber-300 font-black text-xs px-3 py-1 rounded-lg backdrop-blur-md shadow-md">
                  OPPORTUNITY #0{selectedCard.index}
                </div>
              </div>

              {/* DETAIL CONTENT */}
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-md bg-amber-400/10 border border-amber-400/40 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  ENGLISH CLUB EXPERIENCE
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug">
                  {selectedCard.title}
                </h3>

                <div className="p-4 sm:p-5 rounded-2xl bg-blue-900/40 border border-blue-700/50 backdrop-blur-sm">
                  <p className="text-sm sm:text-base text-blue-100/90 font-normal leading-relaxed whitespace-pre-line">
                    {selectedCard.fullDescription || selectedCard.description}
                  </p>
                </div>

                {/* Optional Quote / Highlight Note */}
                <p className="text-xs sm:text-sm text-amber-300/90 italic font-medium pt-2 border-t border-blue-800/40">
                  "Jelajahi dan kembangkan potensimu bersama komunitas English Club."
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-blue-950/80 border-t border-blue-800/60 flex items-center justify-end">
              <button
                onClick={() => setSelectedCard(null)}
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-md active:scale-95"
              >
                Tutup Informasi
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}