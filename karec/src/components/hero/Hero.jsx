import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';

export default function Hero() {
  const revealRef = useReveal();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-28 pb-16 relative overflow-hidden bg-gradient-to-b from-ec-navy via-ec-blue to-ec-navy">
      {/* Background Retro Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      
      {/* Animated Floating Gaming Elements */}
      <div className="absolute top-24 right-12 text-5xl md:text-6xl opacity-30 animate-bounce pointer-events-none select-none" style={{ animationDelay: '100ms' }}>⭐️</div>
      <div className="absolute bottom-28 left-10 text-5xl md:text-6xl opacity-30 animate-bounce pointer-events-none select-none" style={{ animationDelay: '300ms' }}>🚀</div>
      <div className="absolute top-1/3 left-12 text-3xl md:text-4xl opacity-25 animate-bounce pointer-events-none select-none" style={{ animationDelay: '500ms' }}>🎮</div>
      <div className="absolute bottom-20 right-16 text-4xl md:text-5xl opacity-25 animate-bounce pointer-events-none select-none" style={{ animationDelay: '200ms' }}>🏆</div>

      {/* Glow Aura di Latar Belakang */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-amber-500/20 via-blue-500/30 to-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <div ref={revealRef} className="reveal-up flex flex-col items-center justify-center text-center relative z-10 max-w-5xl mx-auto">
          
          {/* 1. Header Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-ec-gold text-ec-navy text-xs sm:text-sm font-black tracking-wider uppercase border-b-4 border-amber-600 shadow-lg -rotate-2 hover:rotate-0 transition-transform">
              <span>★</span> NEW SEASON: 2026
            </div>
            <div className="inline-flex items-center gap-2 bg-blue-900/60 px-4 py-1.5 rounded-2xl border border-blue-700/60 backdrop-blur-md text-amber-300 font-extrabold text-xs sm:text-sm">
              <span>🎮</span> Level Up Your English Skills
            </div>
          </div>

          {/* 2. Hero Centerpiece (Typography Backdrop + Centered Character) */}
          <div className="relative w-full flex items-center justify-center my-2 sm:my-4 py-2 min-h-[340px] sm:min-h-[440px]">
            
            {/* Mega Text Backdrop (Di Belakang Karakter) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 opacity-20 sm:opacity-25 leading-none">
              <span className="text-6xl sm:text-8xl md:text-9xl font-black tracking-wider text-white uppercase">
                BANQUET
              </span>
              <span className="text-5xl sm:text-7xl md:text-8xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-ec-gold to-yellow-500 uppercase mt-[-10px] sm:mt-[-15px]">
                HORIZON
              </span>
            </div>

            {/* Pedestal Shadow di Bawah Kaki Karakter */}
            <div className="absolute bottom-1 w-52 sm:w-72 h-8 bg-blue-950/80 rounded-[100%] blur-md border-t-2 border-amber-400/40 pointer-events-none" />

            {/* Karakter Cewe di Tengah */}
            <div className="relative z-10 animate-float flex justify-center items-center">
              
              {/* Speech Bubble (Ditarik ke Atas Tangan Kanan Karakter) */}
              <div className="absolute -top-10 sm:-top-12 right-2 sm:right-6 z-20 bg-ec-card/95 border-2 border-ec-gold text-white px-4 py-2 rounded-2xl shadow-xl backdrop-blur-md animate-bounce whitespace-nowrap" style={{ animationDuration: '3s' }}>
                <p className="text-xs sm:text-sm font-black text-amber-300 flex items-center gap-1.5">
                  <span>Panggilan Untuk Rookie EC!</span> 👋
                </p>
                <div className="absolute -bottom-2 left-6 w-3 h-3 bg-ec-card border-r-2 border-b-2 border-ec-gold rotate-45" />
              </div>

              {/* Character Image */}
              <img 
                src="/cewe.png" 
                alt="English Club Character" 
                className="w-56 sm:w-72 md:w-[330px] h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform duration-300"
              />

              {/* Floating Badges (Posisi Digeser Lebih Keluar Ke Samping) */}
              <div className="hidden sm:flex absolute top-1/2 -left-12 md:-left-24 lg:-left-28 -translate-y-1/2 z-20 bg-blue-950/90 border border-blue-500/80 text-white px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md items-center gap-2.5 animate-pulse-subtle -rotate-6">
                <span className="text-xl">🗺️</span>
                <div className="text-left">
                  <span className="block text-xs font-black text-white">5 Active Quests</span>
                  <span className="block text-[10px] text-blue-300 font-semibold">Ready to play</span>
                </div>
              </div>

              <div className="hidden sm:flex absolute top-1/2 -right-12 md:-right-24 lg:-right-28 -translate-y-1/2 z-20 bg-blue-950/90 border border-amber-500/80 text-white px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md items-center gap-2.5 rotate-6">
                <span className="text-xl">⭐️</span>
                <div className="text-left">
                  <span className="block text-xs font-black text-amber-300">Status Keanggotaan</span>
                  <span className="block text-[10px] text-amber-200/80 font-semibold">Calon Anggota Aktif</span>
                </div>
              </div>

            </div>
          </div>

          <div className="relative z-10 max-w-2xl mt-4 sm:mt-6">
            {/* MAIN TITLE */}
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-3 tracking-tight drop-shadow-xl">
              BANQUET UNDER <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-ec-gold to-yellow-500">HORIZON 2026</span>
            </h1>
            
            {/* MAIN DESCRIPTION */}
            <p className="text-sm sm:text-base md:text-lg text-blue-100/90 mb-6 font-medium leading-relaxed max-w-xl mx-auto">
              Satu hari, banyak cerita, dan sebuah perjalanan baru. Kenali English Club, temukan teman baru, dan tumbuh bersama dalam pengalaman yang seru dan bermakna!
            </p>

            {/* REFINED TAGLINE (GOLD QUOTE WITH DIVIDER LINES) */}
            <div className="mb-8 flex items-center justify-center gap-3 max-w-lg mx-auto">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-400/50" />
              <p className="text-xs sm:text-sm font-semibold italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-ec-gold to-yellow-500 drop-shadow-sm px-2 text-center">
                "Let’s echo and proclaim, to new journey and endless learning."
              </p>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-400/50" />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#register"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-ec-red text-white font-black text-lg rounded-2xl border-b-[6px] border-ec-iron transition-all transform hover:bg-[#eb2334] active:border-b-0 active:translate-y-[6px] shadow-lg shadow-ec-red/30 group"
              >
                <span>Start The Quest</span>
                {/* Replacement SVG Rocket (No Emoji) */}
                <svg className="w-5 h-5 fill-current text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24">
                  <path d="M13.13 2.21c1.88.38 3.5 1.4 4.67 2.89L21.4 1.5c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-3.6 3.6c1.49 1.17 2.51 2.79 2.89 4.67.14.7-.29 1.38-.98 1.52-.1.02-.21.03-.31.03-.59 0-1.12-.38-1.28-.97-.31-1.52-1.13-2.84-2.35-3.8-1.22-.96-2.73-1.44-4.28-1.37-.7.03-1.29-.51-1.32-1.21-.03-.7.51-1.29 1.21-1.32zM2.81 12.36c.14-.7.82-1.13 1.52-.98 1.52.31 2.84 1.13 3.8 2.35.96 1.22 1.44 2.73 1.37 4.28-.03.7-.62 1.23-1.32 1.21-.7-.03-1.23-.62-1.21-1.32.06-.96-.28-1.9-.88-2.66-.6-.76-1.43-1.27-2.38-1.47-.7-.14-1.13-.82-.98-1.52zM12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm-8.5 7.5l2 2-2 3.5 3.5-2 2 2L3 23l2.5-7.5z"/>
                </svg>
              </a>

              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-ec-card/80 text-white font-bold text-base rounded-2xl border-2 border-blue-700 hover:bg-blue-800/80 hover:border-blue-500 transition-all backdrop-blur-md"
              >
                Learn More
              </a>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}