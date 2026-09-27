import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';

export default function MemoryCapsule() {
  const revealRef = useReveal();

  return (
    <section className="py-24 md:py-36 bg-gradient-to-b from-ec-navy via-blue-950 to-ec-navy border-t-8 border-blue-900/80 relative overflow-hidden">
      
      {/* Background Grid Pattern & Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      <Container>
        <div ref={revealRef} className="reveal-up relative z-10 max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            
            {/* Retro Skewed Badge */}
            <div className="inline-flex items-center gap-2 -skew-x-12 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-ec-navy px-5 py-2 mb-5 shadow-[5px_5px_0px_rgba(15,23,42,0.9)] border-2 border-yellow-200 rounded-md backdrop-blur-md transition-transform hover:scale-105">
              <svg className="w-4 h-4 skew-x-12 text-ec-navy fill-current" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span className="skew-x-12 text-xs sm:text-sm font-black tracking-widest uppercase">
                TIME CAPSULE PROJECT
              </span>
            </div>

            <SectionTitle subtitle="Menjadi bagian emosional dan penuh makna dari perjalanan organisasi">
              Memory Capsule
            </SectionTitle>
          </div>

          {/* Main Interactive Visual Card */}
          <div className="relative group bg-gradient-to-br from-ec-card/95 via-blue-950/90 to-ec-navy/95 border-2 border-blue-600/50 hover:border-amber-400/80 rounded-3xl p-6 sm:p-10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-500 overflow-hidden">
            
            {/* Decorative Cyber Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400 rounded-tl-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400 rounded-tr-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400 rounded-bl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400 rounded-br-3xl pointer-events-none" />

            <div className="grid md:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Visual Capsule Emblem & Wax Seal */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
                  
                  {/* Outer Glowing & Spinning Rings */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-cyan-500/20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-2 border-2 border-dashed border-amber-400/40 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-6 border border-cyan-400/30 rounded-full" />

                  {/* Center Sealed Envelope Emblem */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 border-2 border-amber-200 shadow-[0_10px_25px_rgba(245,158,11,0.5)] flex items-center justify-center transform rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300">
                    
                    {/* Envelope Icon */}
                    <svg className="w-14 h-14 text-ec-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>

                    {/* Wax Seal Effect */}
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-tr from-red-700 via-red-500 to-rose-400 border-2 border-red-200 shadow-md flex items-center justify-center text-white font-black text-[9px] tracking-tighter uppercase">
                      SEALED
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/80 border border-cyan-400/40 text-cyan-300 text-[11px] font-extrabold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  CLASSIFIED MEMORY
                </div>
              </div>

              {/* Right Column: Narrative Content & Stepper */}
              <div className="md:col-span-7 text-center md:text-left space-y-5">
                
                <div>
                  <div className="inline-block text-[10px] sm:text-xs font-black uppercase text-amber-300 tracking-widest bg-amber-400/10 border border-amber-400/40 px-3 py-1 rounded-md mb-2">
                    SPECIAL EXECUTIVE MISSION
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-amber-300 transition-colors">
                    A Letter To Your Future Self
                  </h3>
                </div>

                {/* Step Breakdown Cards */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3 bg-blue-900/40 border border-blue-700/40 p-3.5 rounded-xl">
                    <span className="w-6 h-6 rounded-lg bg-amber-400 text-ec-navy font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      01
                    </span>
                    <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
                      Setiap peserta akan menulis surat harapan, mimpi, dan pesan khusus untuk dirinya sendiri.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 bg-blue-900/40 border border-blue-700/40 p-3.5 rounded-xl">
                    <span className="w-6 h-6 rounded-lg bg-cyan-400 text-ec-navy font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      02
                    </span>
                    <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
                      Surat akan disegel dan dikembalikan secara emosional pada akhir masa kepengurusan.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Highlight Box (Holographic Quote Container) */}
            <div className="mt-8 pt-6 border-t border-blue-800/80 relative">
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-950 via-ec-navy to-blue-950 border-2 border-amber-400/70 shadow-[0_8px_20px_rgba(0,0,0,0.5)] text-center relative overflow-hidden">
                
                {/* Glowing side lines */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 to-yellow-300" />
                <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 to-yellow-300" />

                <p className="text-base sm:text-xl font-black text-amber-300 tracking-wide mb-1">
                  "A small letter today."
                </p>
                <p className="text-xs sm:text-base font-bold text-blue-100/90 tracking-wide">
                  A timeless memory from your journey tomorrow.
                </p>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}