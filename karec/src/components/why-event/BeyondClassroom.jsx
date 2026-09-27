import { useRef } from 'react';
import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import { opportunities } from '../../data/stories';

export default function BeyondClassroom() {
  const revealRef = useReveal();
  const sliderRef = useRef(null);

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
                className="snap-start shrink-0 w-[280px] sm:w-[330px] md:w-[370px] group relative bg-gradient-to-br from-ec-card/95 via-blue-950/90 to-ec-card/95 border-2 border-blue-700/50 hover:border-amber-400/80 rounded-2xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_30px_rgba(245,158,11,0.25)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
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
                    <p className="text-xs sm:text-sm text-blue-100/80 font-medium leading-relaxed">
                      {opportunity.description}
                    </p>
                  </div>

                  {/* Bottom Accent Footer */}
                  <div className="mt-6 pt-4 border-t border-blue-800/60 flex items-center justify-between text-xs font-bold text-amber-400">
                    <span className="tracking-wider uppercase">OPPORTUNITY</span>
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
    </section>
  );
}