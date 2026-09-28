import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import { journeyRoadmap } from '../../data/stories';

export default function JourneyRoadmap() {
  const revealRef = useReveal();

  return (
    <section className="py-24 md:py-36 bg-gradient-to-b from-ec-navy via-blue-950 to-ec-navy border-t-8 border-blue-900/80 relative overflow-hidden">
      
      {/* 1. BACKGROUND ELEMENS & NEON AMBIENT GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <div ref={revealRef} className="reveal-up relative z-10">
          
          {/* HEADER SECTION */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            
            {/* Retro Skewed Badge (Multi-Border & Neon Shadow) */}
            <div className="inline-flex items-center gap-2 -skew-x-12 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-ec-navy px-5 py-2 mb-5 shadow-[5px_5px_0px_rgba(15,23,42,0.9)] border-2 border-yellow-200 rounded-md backdrop-blur-md transition-transform hover:scale-105">
              <svg className="w-4 h-4 skew-x-12 text-ec-navy fill-current" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/>
              </svg>
              <span className="skew-x-12 text-xs sm:text-sm font-black tracking-widest uppercase">
                PATHWAY TO EXCELLENCE
              </span>
            </div>

            <SectionTitle subtitle="Menunjukkan kemungkinan perjalanan anggota selama berada di English Club">
              Where Can This<br className="hidden sm:inline" /> Journey Take You?
            </SectionTitle>

            <p className="text-xs sm:text-base text-blue-100/90 font-medium leading-relaxed mt-4 max-w-xl mx-auto">
              Setiap langkah dirancang untuk mengasah keberanian, jaringan, dan kepemimpinan dalam lingkungan yang suportif.
            </p>
          </div>

          {/* STEPPER TIMELINE CONTAINER */}
          <div className="max-w-3xl mx-auto relative px-2 sm:px-4">
            
            {/* GLOWING ENERGY TRACK LINE */}
            <div className="absolute left-[26px] sm:left-[35px] top-8 bottom-8 w-1.5 bg-gradient-to-b from-amber-400 via-cyan-400 via-indigo-400 to-amber-400 rounded-full z-0 shadow-[0_0_15px_rgba(56,189,248,0.7)]" />
            <div className="absolute left-[28px] sm:left-[37px] top-8 bottom-8 w-0.5 bg-white opacity-80 z-0 animate-pulse" />

            {/* ROADMAP ITEMS */}
            <div className="space-y-8 sm:space-y-12 relative z-10">
              {journeyRoadmap.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex items-start gap-4 sm:gap-7 group"
                >
                  {/* 3D ROTATED CHECKPOINT PIN WITH NEON RINGS */}
                  <div className="relative shrink-0 mt-1">
                    {/* Outer Pulse Glow */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-cyan-400 rounded-2xl blur-md opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
                    
                    {/* 3D Rotated Diamond Node */}
                    <div className="relative w-13 h-13 sm:w-18 sm:h-18 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-600 border-2 sm:border-4 border-amber-100 shadow-[0_8px_20px_rgba(0,0,0,0.6)] flex items-center justify-center transform rotate-45 group-hover:rotate-0 transition-all duration-300">
                      <div className="transform -rotate-45 group-hover:rotate-0 flex flex-col items-center justify-center transition-transform duration-300">
                        <span className="text-[10px] sm:text-[11px] font-black text-ec-navy tracking-tighter leading-none uppercase">
                          LVL
                        </span>
                        <span className="text-base sm:text-2xl font-black text-ec-navy leading-none">
                          0{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* HIGH-VIBRANCE CARD */}
                  <div className="flex-1 bg-gradient-to-br from-ec-card/95 via-blue-950/95 to-ec-navy/95 border-2 border-blue-600/50 group-hover:border-amber-400 rounded-2xl p-5 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group-hover:shadow-[0_15px_35px_rgba(245,158,11,0.3)] transition-all duration-300 group-hover:-translate-y-1.5 backdrop-blur-xl relative overflow-hidden">
                    
                    {/* Decorative Background Watermark SVG */}
                    <svg
                      className="absolute -right-6 -bottom-6 w-32 h-32 text-blue-500/5 group-hover:text-amber-400/10 transition-colors duration-300 pointer-events-none"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/>
                    </svg>

                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-cyan-400 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                    {/* Card Header & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase text-amber-300 tracking-wider bg-blue-900/90 border border-amber-400/50 px-3 py-1 rounded-md shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                        STAGE 0{index + 1}
                      </span>

                      <span className="text-[10px] sm:text-xs font-black text-cyan-400 tracking-widest uppercase">
                        UNLOCKABLE
                      </span>
                    </div>

                    {/* Content Text */}
                    <p className="text-base sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {item.step}
                    </p>

                    {/* Bottom Status Bar */}
                    <div className="mt-4 pt-3 border-t border-blue-800/60 flex items-center justify-between text-[11px] font-bold text-blue-200/70">
                      <span>PROGRESSION MILESTONE</span>
                      <svg
                        className="w-4 h-4 text-amber-400 transform group-hover:translate-x-1.5 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* SYSTEM MISSION NOTE (FOOTER BOX) */}
            <div className="mt-14 sm:mt-20 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-cyan-500 to-indigo-500 rounded-2xl blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
              
              <div className="relative p-6 sm:p-7 bg-gradient-to-r from-blue-950 via-ec-navy to-blue-950 border-2 border-amber-400/80 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.7)] backdrop-blur-md flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
                
                {/* SVG Sparkle / Quest Icon */}
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/60 flex items-center justify-center shrink-0 text-amber-300">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                  </svg>
                </div>

                <div>
                  <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-1">
                    QUEST OBJECTIVE NOTE
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-100 font-medium italic leading-relaxed">
                    Fokuslah pada proses, karena di EC selalu ada ruang untuk belajar dan berkembang. Saat kemampuan bertemu kesempatan, di situlah peluang untuk melangkah lebih jauh terbuka.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}