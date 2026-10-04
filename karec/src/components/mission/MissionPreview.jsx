import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import { missions } from '../../data/missions';

// PALET TEMA WARNA KHUSUS TIAP GAME / STAGE
const THEMES = [
  {
    // Theme 0: Emerald Cyberpunk
    bg: 'from-slate-950 via-emerald-950/80 to-slate-950',
    glow: 'bg-emerald-500/25',
    border: 'border-emerald-500/80',
    textAccent: 'text-emerald-400',
    badgeBg: 'bg-emerald-400 text-slate-950',
    chipBg: 'bg-emerald-950/90 border-emerald-400/50 text-emerald-300',
    shadow: 'shadow-[0_0_60px_rgba(16,185,129,0.25)]',
    topLine: 'from-emerald-500 via-teal-300 to-emerald-500',
    cardBg: 'from-emerald-950/50 via-slate-900/90 to-emerald-950/40',
  },
  {
    // Theme 1: Purple Arcane
    bg: 'from-slate-950 via-purple-950/80 to-slate-950',
    glow: 'bg-purple-500/25',
    border: 'border-purple-500/80',
    textAccent: 'text-purple-400',
    badgeBg: 'bg-purple-400 text-slate-950',
    chipBg: 'bg-purple-950/90 border-purple-400/50 text-purple-300',
    shadow: 'shadow-[0_0_60px_rgba(168,85,247,0.25)]',
    topLine: 'from-purple-500 via-pink-300 to-purple-500',
    cardBg: 'from-purple-950/50 via-slate-900/90 to-purple-950/40',
  },
  {
    // Theme 2: Amber Crimson
    bg: 'from-slate-950 via-amber-950/80 to-slate-950',
    glow: 'bg-amber-500/25',
    border: 'border-amber-500/80',
    textAccent: 'text-amber-400',
    badgeBg: 'bg-amber-400 text-slate-950',
    chipBg: 'bg-amber-950/90 border-amber-400/50 text-amber-300',
    shadow: 'shadow-[0_0_60px_rgba(245,158,11,0.25)]',
    topLine: 'from-amber-500 via-yellow-300 to-amber-500',
    cardBg: 'from-amber-950/50 via-slate-900/90 to-amber-950/40',
  },
  {
    // Theme 3: Neon Cyan
    bg: 'from-slate-950 via-cyan-950/80 to-slate-950',
    glow: 'bg-cyan-500/25',
    border: 'border-cyan-500/80',
    textAccent: 'text-cyan-400',
    badgeBg: 'bg-cyan-400 text-slate-950',
    chipBg: 'bg-cyan-950/90 border-cyan-400/50 text-cyan-300',
    shadow: 'shadow-[0_0_60px_rgba(6,182,212,0.25)]',
    topLine: 'from-cyan-500 via-sky-300 to-cyan-500',
    cardBg: 'from-cyan-950/50 via-slate-900/90 to-cyan-950/40',
  },
  {
    // Theme 4: Sunset Rose
    bg: 'from-slate-950 via-rose-950/80 to-slate-950',
    glow: 'bg-rose-500/25',
    border: 'border-rose-500/80',
    textAccent: 'text-rose-400',
    badgeBg: 'bg-rose-400 text-slate-950',
    chipBg: 'bg-rose-950/90 border-rose-400/50 text-rose-300',
    shadow: 'shadow-[0_0_60px_rgba(244,63,94,0.25)]',
    topLine: 'from-rose-500 via-orange-300 to-rose-500',
    cardBg: 'from-rose-950/50 via-slate-900/90 to-rose-950/40',
  },
];

export default function MissionPreview() {
  const revealRef = useReveal();
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalMissions = missions.length;
  const activeMission = missions[currentIndex];
  
  // Memilih tema berdasarkan index aktif (kembali memutar jika mission > jumlah tema)
  const activeTheme = THEMES[currentIndex % THEMES.length];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalMissions - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalMissions - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      id="missions" 
      className={`py-24 md:py-32 bg-gradient-to-b ${activeTheme.bg} relative overflow-hidden border-t-8 border-blue-900 transition-colors duration-700`}
    >
      
      {/* ANIMATION STYLES */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(15px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-stage-swap {
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* DYNAMIC AMBIENT GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ${activeTheme.glow} rounded-full blur-[160px] pointer-events-none transition-all duration-700`} />

      <Container>
        <div ref={revealRef} className="reveal-up relative z-10 flex flex-col items-center">
          
          {/* HEADER BADGE */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black px-6 py-2 rounded-t-xl border-b-4 border-amber-700 shadow-[0_4px_20px_rgba(245,158,11,0.25)] mb-6 uppercase tracking-widest text-xs">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
            GUILD ARENA SHOWCASE
          </div>

          <SectionTitle subtitle="Geser untuk memilih dan mempelajari detail tiap game mission">
            GAME ARENA & MISSIONS
          </SectionTitle>

          {/* ========================================================= */}
          {/* FULL SHOWCASE HERO CARD */}
          {/* ========================================================= */}
          <div className="w-full max-w-4xl mt-10 relative">
            
            {/* FLOATING SIDE NAVIGATION BUTTONS (DESKTOP & MOBILE) */}
            <button
              onClick={handlePrev}
              aria-label="Previous Game"
              className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-900/90 border-2 border-blue-700 text-white hover:border-amber-400 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-all duration-300 shadow-2xl active:scale-95 group"
            >
              <svg className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              aria-label="Next Game"
              className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-900/90 border-2 border-blue-700 text-white hover:border-amber-400 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-all duration-300 shadow-2xl active:scale-95 group"
            >
              <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* MAIN SHOWCASE DISPLAY */}
            <div 
              key={activeMission.id || currentIndex}
              className={`relative bg-gradient-to-b ${activeTheme.cardBg} border-2 ${activeTheme.border} rounded-3xl p-6 sm:p-10 backdrop-blur-xl ${activeTheme.shadow} transition-all duration-500 animate-stage-swap overflow-hidden`}
            >
              
              {/* TOP GLOWING ACCENT LINE */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${activeTheme.topLine}`} />

              {/* WATERMARK STAGE NUMBER */}
              <span className="absolute -bottom-6 -right-4 text-9xl sm:text-[12rem] font-black text-white/5 pointer-events-none select-none">
                0{currentIndex + 1}
              </span>

              {/* CARD TOP INFO BAR */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
                
                {/* STAGE COUNTER BADGE */}
                <div className="flex items-center gap-3">
                  <span className={`px-3.5 py-1 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider ${activeTheme.badgeBg} shadow-md`}>
                    STAGE 0{currentIndex + 1} / 0{totalMissions}
                  </span>
                  
                  <span className="text-xs font-bold text-blue-200/80 bg-blue-950/60 px-3 py-1 rounded-lg border border-blue-800/60">
                    QUEST ARENA
                  </span>
                </div>

                {/* DIFFICULTY LEVEL */}
                {activeMission.difficulty && (
                  <div className="flex items-center gap-2 bg-slate-950/80 border border-white/10 px-3.5 py-1.5 rounded-xl">
                    <span className="text-[11px] text-blue-300 font-bold uppercase tracking-wider">DIFFICULTY:</span>
                    <span className={`text-xs font-black uppercase ${activeTheme.textAccent}`}>
                      {activeMission.difficulty}
                    </span>
                  </div>
                )}
              </div>

              {/* CARD CONTENT BODY */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* LEFT CONTENT AREA */}
                <div className="md:col-span-8 space-y-4">
                  <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                    {activeMission.title}
                  </h3>

                  <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal bg-slate-950/40 p-4 sm:p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
                    {activeMission.description}
                  </p>

                  {/* FOCUS SKILLS */}
                  {activeMission.focus && activeMission.focus.length > 0 && (
                    <div className="pt-2">
                      <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block mb-2">
                        SKILL MASTERY:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeMission.focus.map((skill, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 text-xs font-bold rounded-xl border ${activeTheme.chipBg} backdrop-blur-md shadow-sm`}
                          >
                            #{skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT VISUAL GRAPHIC / BADGE */}
                <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-950/60 rounded-2xl border border-white/10 text-center relative group">
                  
                  {/* ICON REPRESENTATION */}
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 ${activeTheme.border} bg-slate-900/90 flex items-center justify-center mb-3 ${activeTheme.textAccent} shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-7.5-3.75L2 12l10 5 10-5-2.5-1.25L12 13.5zM2 17l10 5 10-5-2.5-1.25L12 18.5l-7.5-3.75L2 17z"/>
                    </svg>
                  </div>

                  <span className={`text-xs font-black uppercase tracking-wider ${activeTheme.textAccent}`}>
                    INTERACTIVE QUEST
                  </span>
                  <span className="text-[10px] text-blue-300/80 mt-1 font-medium">
                    Ready to challenge?
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* ========================================================= */}
          {/* BOTTOM STAGE SELECTOR (THUMBNAILS / INDICATORS) */}
          {/* ========================================================= */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {missions.map((m, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={m.id || idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-black tracking-wider transition-all border-b-4 ${
                    isActive
                      ? `${activeTheme.badgeBg} border-amber-700 shadow-lg translate-y-[-2px]`
                      : 'bg-blue-950/80 text-blue-300 border-blue-900 hover:text-white hover:bg-blue-900/60'
                  }`}
                >
                  STAGE 0{idx + 1}
                </button>
              );
            })}
          </div>

          {/* FOOTER NOTE */}
          <div className="mt-8 text-xs sm:text-sm text-blue-300/80 italic font-medium">
            Gunakan panah atau stage selector di atas untuk berpindah antar game arena.
          </div>

        </div>
      </Container>
    </section>
  );
}