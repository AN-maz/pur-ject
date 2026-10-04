import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import { faqs } from '../../data/faq';

// Import 1 Karakter utama
import character from '/cewe.png';

export default function FAQ() {
  const revealRef = useReveal();
  const [activeFaq, setActiveFaq] = useState(null); // FAQ yang sedang dibuka di Modal Pop-up

  // SETUP PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Menampilkan 6 item per halaman (2 kolom x 3 baris)

  const totalPages = Math.ceil(faqs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFaqs = faqs.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section id="faq" className="py-24 bg-slate-950 relative overflow-hidden border-t-8 border-blue-900">
      
      {/* CSS Custom Animation */}
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalScaleUp {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-backdrop {
          animation: modalFadeIn 0.25s ease-out forwards;
        }
        .animate-letter-pop {
          animation: modalScaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* AMBIENT BACKGROUND GLOW & GRID */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <Container>
        <div ref={revealRef} className="reveal-up relative z-10 flex flex-col items-center">
          
          {/* HEADER BADGE */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black px-6 py-2 rounded-t-xl border-b-4 border-amber-700 shadow-[0_4px_15px_rgba(245,158,11,0.3)] mb-6 uppercase tracking-widest text-xs">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
            </svg>
            GUILD HELP CENTER
          </div>

          <SectionTitle subtitle="Klik pada pertanyaan untuk membuka surat balasan">
            FREQUENTLY ASKED QUESTIONS
          </SectionTitle>

          {/* FAQ GRID LIST (PAGINATED) */}
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {currentFaqs.map((faq, index) => {
              const globalIndex = startIndex + index + 1;
              return (
                <button
                  key={faq.id || globalIndex}
                  onClick={() => setActiveFaq(faq)}
                  className="group w-full text-left p-5 rounded-2xl bg-blue-950/40 border-2 border-blue-800/60 hover:border-amber-400/80 hover:bg-blue-900/50 backdrop-blur-md transition-all duration-300 flex items-center justify-between gap-4 shadow-lg hover:shadow-[0_4px_20px_rgba(245,158,11,0.2)] hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Badge Icon Letter */}
                    <div className="p-2.5 rounded-xl bg-blue-900/80 border border-blue-700/60 text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-300 transition-colors shrink-0">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-amber-400/80 block uppercase tracking-wider mb-0.5">
                        Quest #{String(globalIndex).padStart(2, '0')}
                      </span>
                      <span className="font-bold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                        {faq.question}
                      </span>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="text-cyan-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all shrink-0">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-xl border border-blue-800 bg-blue-950/80 text-blue-300 hover:text-white hover:bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Previous Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>

              {/* Page Number Buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-xl font-black text-xs transition-all border-b-4 ${
                    currentPage === page
                      ? 'bg-amber-400 text-slate-950 border-amber-700 shadow-md translate-y-[-2px]'
                      : 'bg-blue-950/80 text-blue-300 border-blue-900 hover:text-white hover:bg-blue-900'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-xl border border-blue-800 bg-blue-950/80 text-blue-300 hover:text-white hover:bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Next Page"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </div>
          )}

        </div>
      </Container>

      {/* POP-UP MODAL: ANIMATED MESSAGE LETTER WITH CHARACTER */}
      {activeFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-backdrop">
          
          {/* Overlay Backdrop Click to Close */}
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setActiveFaq(null)} 
          />

          {/* MESSAGE LETTER CONTAINER WITH POP ANIMATION */}
          <div className="relative z-10 w-full max-w-2xl bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 border-2 border-amber-400/80 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(245,158,11,0.3)] flex flex-col md:flex-row items-center gap-6 overflow-hidden animate-letter-pop">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500" />

            {/* Tombol Close (X) */}
            <button
              onClick={() => setActiveFaq(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-blue-900/60 hover:bg-amber-500 hover:text-slate-950 rounded-full border border-blue-700 hover:border-amber-400 transition-all z-20"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>

            {/* SEGMENT 1: KARAKTER (1 KARAKTER PENDAMPING) */}
            <div className="w-36 md:w-48 shrink-0 flex flex-col items-center relative group">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl -z-10" />
              <img 
                src={character} 
                alt="Quest Assistant" 
                className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-105"
              />
              <span className="mt-2 text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-amber-400 text-slate-950 rounded-md border border-amber-300 shadow-md">
                QUEST ASSISTANT
              </span>
            </div>

            {/* SEGMENT 2: SURAT PESAN / MESSAGE BODY */}
            <div className="flex-1 w-full bg-blue-900/40 border border-blue-700/60 rounded-2xl p-5 md:p-6 backdrop-blur-sm relative">
              
              {/* Header Letter Tag */}
              <div className="flex items-center justify-between gap-2 border-b border-blue-700/50 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="text-[11px] font-black text-amber-400 tracking-wider uppercase">
                    RESPONSE MESSAGE
                  </span>
                </div>
                <span className="text-[10px] font-bold text-blue-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                  OFFICIAL GUILD
                </span>
              </div>

              {/* Judul Pertanyaan */}
              <h3 className="text-base md:text-lg font-bold text-white mb-3 leading-snug">
                {activeFaq.question}
              </h3>

              {/* Isi Jawaban Surat */}
              <div className="text-xs sm:text-sm text-blue-100 leading-relaxed max-h-60 overflow-y-auto pr-1">
                <p className="bg-slate-950/60 p-4 rounded-xl border border-blue-800/40 text-blue-100/90 italic">
                  "{activeFaq.answer}"
                </p>
              </div>

              {/* Footer Surat */}
              <div className="mt-4 pt-3 border-t border-blue-800/40 flex items-center justify-between text-[11px] text-blue-300 font-medium">
                <span>English Club UTB</span>
                <span className="text-amber-400/90 font-bold">Have a nice quest!</span>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}