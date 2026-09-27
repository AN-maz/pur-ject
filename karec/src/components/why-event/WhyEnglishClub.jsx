import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import { whyEnglishClub } from '../../data/event';

export default function WhyEnglishClub() {
  const revealRef = useReveal();

  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-to-b from-ec-navy via-ec-blue to-ec-navy relative overflow-hidden border-t-4 border-blue-800/50">
      {/* Background Retro Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
      
      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <Container>
        <div ref={revealRef} className="reveal-up relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-blue-900/60 border border-blue-600/50 text-amber-300 text-xs sm:text-sm font-extrabold tracking-wide uppercase backdrop-blur-md">
              <span>✨</span> GUILD ADVANTAGES
            </div>
            <SectionTitle subtitle="English Club bukan hanya tempat belajar grammar atau vocabulary">
              More Than Just<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-ec-gold to-yellow-500">
                Learning English
              </span>
            </SectionTitle>
          </div>

          {/* Main Layout Grid: Karakter Natural (Kiri) & Quest Cards (Kanan) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Sisi Kiri: Natural Floating Character (Tanpa Kotak/Card) */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px]">
              
              {/* Aura Glow di Latar Belakang Karakter */}
              <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-tr from-amber-500/20 via-blue-500/30 to-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />

              {/* Pedestal Shadow di Bawah Kaki Karakter */}
              <div className="absolute bottom-4 w-48 sm:w-64 h-8 bg-blue-950/90 rounded-[100%] blur-md border-t-2 border-amber-400/30 pointer-events-none" />

              {/* Speech Bubble (Balon Percakapan) */}
              <div className="absolute -top-4 sm:top-0 z-20 bg-ec-card/95 border-2 border-ec-gold text-white px-4 py-2 rounded-2xl shadow-xl backdrop-blur-md animate-bounce whitespace-nowrap" style={{ animationDuration: '3.2s' }}>
                <p className="text-xs sm:text-sm font-black text-amber-300 flex items-center gap-1.5">
                  <span>Why join our Guild?</span> 🎓
                </p>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-ec-card border-r-2 border-b-2 border-ec-gold rotate-45" />
              </div>

              {/* Character Image Melayang Natural */}
              <div className="relative z-10 animate-float my-auto">
                <img
                  src="/cewe.png"
                  alt="Guild Guide Character"
                  className="w-56 sm:w-72 md:w-[320px] h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Floating Badge di Samping Karakter */}
              <div className="absolute bottom-12 -left-2 sm:left-2 z-20 bg-blue-950/85 border border-amber-500/70 text-white px-3.5 py-2 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2 -rotate-3">
                <span className="text-base">💎</span>
                <div className="text-left">
                  <span className="block text-[11px] font-black text-amber-300 uppercase tracking-wider">Guild Guide</span>
                  <span className="block text-[10px] text-blue-200">Interactive Learning</span>
                </div>
              </div>

            </div>

            {/* Sisi Kanan: List Cards whyEnglishClub */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {whyEnglishClub.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative bg-gradient-to-r from-ec-card/90 via-blue-950/70 to-ec-card/90 border border-blue-700/40 hover:border-amber-400/70 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)] hover:-translate-y-1 backdrop-blur-md flex flex-col sm:flex-row items-start gap-5"
                >
                  {/* Icon Box */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-gradient-to-br from-blue-800 to-blue-950 border border-blue-500/40 flex items-center justify-center text-3xl sm:text-4xl shadow-inner group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
                    {item.icon}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-xs font-black text-blue-400/60 group-hover:text-amber-400/80 tracking-widest">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-blue-100/85 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  {/* Side Glow Line Accent */}
                  <div className="absolute left-0 bottom-0 top-0 w-1.5 bg-gradient-to-b from-amber-400 to-ec-gold rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}