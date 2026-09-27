import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';

export default function WhyThisEvent() {
  const revealRef = useReveal();

  const pillar1 = {
    icon: '🤝',
    title: 'Meet',
    description: 'Bertemu orang baru dan memperluas koneksi',
    step: '01',
  };

  const pillar2 = {
    icon: '🔗',
    title: 'Connect',
    description: 'Mengenal keluarga besar English Club',
    step: '02',
  };

  const pillar3 = {
    icon: '📚',
    title: 'Learn',
    description: 'Mencoba pengalaman baru yang berharga',
    step: '03',
  };

  const pillar4 = {
    icon: '🌱',
    title: 'Grow',
    description: 'Memulai perjalanan perkembangan diri',
    step: '04',
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-ec-navy via-ec-blue to-ec-navy relative overflow-hidden border-t-4 border-blue-800/50">
      {/* Background Retro Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
      
      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/15 via-blue-500/20 to-purple-600/15 rounded-full blur-[130px] pointer-events-none" />

      <Container>
        <div ref={revealRef} className="reveal-up relative z-10">
          
          {/* Header & Title */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-blue-900/60 border border-blue-600/50 text-amber-300 text-xs sm:text-sm font-extrabold tracking-wide uppercase backdrop-blur-md">
              <span>🎯</span> QUEST PURPOSE
            </div>
            
            <SectionTitle subtitle="Kenapa kamu harus main di event ini">
              Why This Quest Exists
            </SectionTitle>

            <p className="text-sm sm:text-base md:text-lg text-blue-100/90 font-medium leading-relaxed mt-4">
              Semester break bukan hanya waktu untuk beristirahat. Ini adalah kesempatan emas untuk mengenal orang baru, menemukan lingkungan baru, dan mencoba pengalaman berharga bersama!
            </p>
          </div>

          {/* Grid Surround Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
            
            {/* --- PILLAR 01 & 02 (Kiri di Desktop / Atas di Mobile) --- */}
            <div className="order-1 lg:col-span-4 flex flex-col gap-4 sm:gap-5">
              {/* Card 01 */}
              <div className="group relative bg-gradient-to-br from-ec-card/90 via-blue-950/80 to-ec-card/90 border border-blue-700/40 hover:border-amber-400/70 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(245,158,11,0.15)] hover:-translate-y-1 backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-900/60 border border-blue-500/40 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
                    {pillar1.icon}
                  </div>
                  <span className="text-[11px] font-black text-amber-400/80 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                    Pillar {pillar1.step}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors mb-1.5">
                  {pillar1.title}
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/80 font-medium leading-relaxed">
                  {pillar1.description}
                </p>
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card 02 */}
              <div className="group relative bg-gradient-to-br from-ec-card/90 via-blue-950/80 to-ec-card/90 border border-blue-700/40 hover:border-amber-400/70 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(245,158,11,0.15)] hover:-translate-y-1 backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-900/60 border border-blue-500/40 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
                    {pillar2.icon}
                  </div>
                  <span className="text-[11px] font-black text-amber-400/80 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                    Pillar {pillar2.step}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors mb-1.5">
                  {pillar2.title}
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/80 font-medium leading-relaxed">
                  {pillar2.description}
                </p>
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* --- KARAKTER UTAMA (Tengah di Desktop & Mobile Sandwich Centerpiece) --- */}
            <div className="order-2 md:col-span-2 lg:col-span-4 relative flex flex-col items-center justify-center py-4 my-2 lg:my-0 min-h-[300px] sm:min-h-[380px]">
              
              {/* Ring Orbit Design khusus Mobile/Desktop */}
              <div className="absolute w-52 h-52 sm:w-72 sm:h-72 border border-blue-500/20 rounded-full animate-spin-slow pointer-events-none" />
              <div className="absolute w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-tr from-amber-500/20 via-blue-500/20 to-purple-600/15 rounded-full blur-2xl pointer-events-none animate-pulse-subtle" />

              {/* Pedestal Shadow di Bawah Kaki Karakter */}
              <div className="absolute bottom-6 w-44 sm:w-60 h-7 bg-blue-950/90 rounded-[100%] blur-md border-t-2 border-amber-400/30 pointer-events-none" />

              {/* Character Image Natural */}
              <div className="relative z-10 animate-float my-auto">
                <img
                  src="/cewe.png"
                  alt="Quest Explorer Character"
                  className="w-48 sm:w-60 md:w-[290px] h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Compact Badge di Bawah Kaki Karakter */}
              <div className="relative z-20 -mt-4 bg-blue-950/90 border border-amber-500/70 text-white px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-2">
                <span className="text-xs">🏆</span>
                <span className="text-[11px] font-black text-amber-300 uppercase tracking-wider">4 Quest Pillars</span>
              </div>

            </div>

            {/* --- PILLAR 03 & 04 (Kanan di Desktop / Bawah di Mobile) --- */}
            <div className="order-3 lg:col-span-4 flex flex-col gap-4 sm:gap-5">
              {/* Card 03 */}
              <div className="group relative bg-gradient-to-br from-ec-card/90 via-blue-950/80 to-ec-card/90 border border-blue-700/40 hover:border-amber-400/70 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(245,158,11,0.15)] hover:-translate-y-1 backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-900/60 border border-blue-500/40 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
                    {pillar3.icon}
                  </div>
                  <span className="text-[11px] font-black text-amber-400/80 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                    Pillar {pillar3.step}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors mb-1.5">
                  {pillar3.title}
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/80 font-medium leading-relaxed">
                  {pillar3.description}
                </p>
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card 04 */}
              <div className="group relative bg-gradient-to-br from-ec-card/90 via-blue-950/80 to-ec-card/90 border border-blue-700/40 hover:border-amber-400/70 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(245,158,11,0.15)] hover:-translate-y-1 backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-900/60 border border-blue-500/40 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
                    {pillar4.icon}
                  </div>
                  <span className="text-[11px] font-black text-amber-400/80 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                    Pillar {pillar4.step}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors mb-1.5">
                  {pillar4.title}
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/80 font-medium leading-relaxed">
                  {pillar4.description}
                </p>
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}