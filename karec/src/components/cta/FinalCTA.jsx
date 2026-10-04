import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';

export default function FinalCTA() {
  const revealRef = useReveal();

  return (
    <section id="register" className="py-16 md:py-28 bg-gradient-to-b from-ec-navy via-blue-950 to-ec-navy border-t-8 border-blue-900/80 text-white relative overflow-hidden">
      
      {/* Ambient Glows & Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />

      <Container>
        <div ref={revealRef} className="reveal-up relative z-10 max-w-5xl mx-auto">
          
          {/* Header Skewed Badge */}
          <div className="text-center mb-6 md:mb-10">
            <div className="inline-flex items-center gap-2 -skew-x-12 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-ec-navy px-5 py-2 shadow-[5px_5px_0px_rgba(15,23,42,0.9)] border-2 border-yellow-200 rounded-md backdrop-blur-md transition-transform hover:scale-105">
              <svg className="w-4 h-4 skew-x-12 text-ec-navy fill-current" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/>
              </svg>
              <span className="skew-x-12 text-xs sm:text-sm font-black tracking-widest uppercase">
                FINAL QUEST • REGISTRATION
              </span>
            </div>
          </div>

          {/* Main Hero Wrapper */}
          <div className="relative flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
            
            {/* KARAKTER KIRI (cewe.png) */}
            {/* Mobile: Absolute di belakang teks | Desktop: Rapat di samping teks & Miring ke Kiri */}
            <div className="absolute -left-10 sm:-left-4 lg:relative lg:left-0 lg:z-10 top-1/2 -translate-y-1/2 lg:translate-y-0 opacity-30 sm:opacity-40 lg:opacity-100 pointer-events-none lg:pointer-events-auto transition-transform duration-300 -rotate-12 lg:-rotate-6 hover:-rotate-3 flex flex-col items-center shrink-0">
              
              {/* Dialogue Bubble (Desktop Only) */}
              <div className="hidden lg:flex mb-2 px-3 py-1 rounded-full bg-blue-900/90 border border-cyan-400/60 shadow-[0_4px_15px_rgba(56,189,248,0.3)] backdrop-blur-md items-center gap-2 animate-bounce" style={{ animationDuration: '3s' }}>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[11px] font-extrabold text-cyan-200 tracking-wide">
                  Ready for the quest?
                </span>
              </div>

              {/* Ukuran Karakter Diperbesar */}
              <div className="relative w-44 h-56 sm:w-56 sm:h-72 lg:w-64 lg:h-80 flex items-center justify-center">
                <img 
                  src="/cewe.png" 
                  alt="Character Guide" 
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Ground Shadow & Badge (Desktop Only) */}
              <div className="hidden lg:block w-36 h-4 bg-black/60 blur-md rounded-[100%] -mt-3" />
              <div className="hidden lg:block mt-3 px-3 py-1 rounded-xl bg-gradient-to-r from-blue-950/90 to-ec-navy/90 border border-blue-700/60 shadow-md text-center">
                <p className="text-[10px] font-black uppercase text-amber-400 tracking-wider">LEVEL 1 EXPLORER</p>
                <p className="text-[11px] font-bold text-blue-200">Guide Companion</p>
              </div>
            </div>

            {/* TEKS & CTA UTAMA (TENGAH - Layer Atas z-10) */}
            <div className="relative z-10 text-center max-w-lg mx-auto px-4">
              <h2 className="text-3xl sm:text-5xl lg:text-5xl font-black mb-4 leading-tight tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
                Ready To Start<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                  The Quest?
                </span>
              </h2>

              <p className="text-sm sm:text-lg mb-2 text-white font-bold drop-shadow-md">
                Every great journey begins with one small step.
              </p>
              
              <p className="text-xs sm:text-base mb-8 text-blue-200 font-medium leading-relaxed drop-shadow-sm max-w-md mx-auto">
                Kumpulkan XP, naikkan level, dan berkembang bersama komunitas English Club UTB.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
                <a
                  href="https://forms.gle/GJPgUPSe7MPTtPWL6"
                  target="_blank"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-red-600 via-ec-red to-red-600 text-white font-black text-sm sm:text-base rounded-2xl border-2 border-red-300 border-b-[5px] border-b-red-950 shadow-[0_8px_20px_rgba(239,68,68,0.4)] transition-all duration-200 hover:bg-red-500 hover:-translate-y-0.5 active:translate-y-1 active:border-b-0 uppercase tracking-wider group"
                >
                  <svg className="w-5 h-5 text-amber-300 fill-current" viewBox="0 0 24 24">
                    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H9v2H7v-2H5v-2h2V9h2v2h2v2zm4.5 1c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                  </svg>
                  <span>JOIN THE QUEST</span>
                </a>

                <a
                  href="#event"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-900 via-ec-navy to-blue-900 text-amber-300 font-black text-sm sm:text-base rounded-2xl border-2 border-blue-600/80 border-b-[5px] border-b-blue-950 shadow-md transition-all duration-200 hover:border-amber-400 hover:text-white hover:-translate-y-0.5 active:translate-y-1 active:border-b-0 uppercase tracking-wider"
                >
                  <span>QUEST BOARD</span>
                </a>
              </div>
            </div>

            {/* KARAKTER KANAN (cewe2.png) */}
            {/* Mobile: Absolute di belakang teks | Desktop: Rapat di samping teks & Miring ke Kanan */}
            <div className="absolute -right-10 sm:-right-4 lg:relative lg:right-0 lg:z-10 top-1/2 -translate-y-1/2 lg:translate-y-0 opacity-30 sm:opacity-40 lg:opacity-100 pointer-events-none lg:pointer-events-auto transition-transform duration-300 rotate-12 lg:rotate-6 hover:rotate-3 flex flex-col items-center shrink-0">
              
              {/* Dialogue Bubble (Desktop Only) */}
              <div className="hidden lg:flex mb-2 px-3 py-1 rounded-full bg-blue-900/90 border border-amber-400/60 shadow-[0_4px_15px_rgba(245,158,11,0.3)] backdrop-blur-md items-center gap-2 animate-bounce" style={{ animationDuration: '3.5s' }}>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-[11px] font-extrabold text-amber-200 tracking-wide">
                  Level Up Your Skills!
                </span>
              </div>

              {/* Ukuran Karakter Diperbesar */}
              <div className="relative w-44 h-56 sm:w-56 sm:h-72 lg:w-64 lg:h-80 flex items-center justify-center">
                <img 
                  src="/cewe2.png" 
                  alt="Character Buddy" 
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Ground Shadow & Badge (Desktop Only) */}
              <div className="hidden lg:block w-36 h-4 bg-black/60 blur-md rounded-[100%] -mt-3" />
              <div className="hidden lg:block mt-3 px-3 py-1 rounded-xl bg-gradient-to-r from-blue-950/90 to-ec-navy/90 border border-blue-700/60 shadow-md text-center">
                <p className="text-[10px] font-black uppercase text-cyan-400 tracking-wider">5 ACTIVE QUESTS</p>
                <p className="text-[11px] font-bold text-blue-200">Quest Companion</p>
              </div>
            </div>

          </div>

          {/* Bottom Server Bar */}
          <div className="mt-10 max-w-xl mx-auto p-3.5 bg-gradient-to-r from-blue-950 via-ec-navy to-blue-950 border-2 border-amber-400/60 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.6)] backdrop-blur-md flex items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <p className="text-xs sm:text-sm font-bold text-blue-100">
                Registration Open • <span className="text-amber-300 font-black">Join The Quest Today</span>
              </p>
            </div>
            
            <span className="text-[10px] sm:text-xs font-black uppercase text-amber-400 tracking-wider bg-blue-900 border border-amber-400/40 px-2.5 py-1 rounded-md">
              ONLINE
            </span>
          </div>

        </div>
      </Container>
    </section>
  );
}