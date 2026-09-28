import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import { timeline } from '../../data/timeline';

export default function JourneyMap() {
  const revealRef = useReveal();

  return (
    <section className="py-20 md:py-36 bg-gradient-to-b from-ec-navy via-ec-blue to-ec-navy border-t-8 border-blue-900/60 relative overflow-hidden">
      {/* Background Grid Pattern & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 sm:w-96 sm:h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 sm:w-96 sm:h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <div ref={revealRef} className="reveal-up relative z-10">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-24">
            
            {/* BADGE RETRO MIRING (SKEWED CARD) */}
            <div className="inline-flex items-center -skew-x-12 bg-gradient-to-r from-blue-900/90 via-ec-navy to-blue-900/90 border-2 border-amber-400/80 px-4 py-1.5 mb-5 shadow-[4px_4px_0px_rgba(245,158,11,0.5)] rounded-md backdrop-blur-md transition-transform hover:scale-105">
              <div className="flex items-center gap-2 skew-x-12 text-amber-300 text-xs sm:text-sm font-black tracking-widest uppercase">
                <span>🗺️</span> QUEST ROADMAP
              </div>
            </div>

            <SectionTitle subtitle="">
              Your Journey Awaits
            </SectionTitle>

            <p className="text-xs sm:text-base md:text-lg text-blue-100/90 font-medium leading-relaxed mt-3">
              Ikuti alur perjalanan dari gerbang awal hingga garis akhir. Pokoknya seru banget deh, setiap poin memiliki arti dan memori meskipun hidup berat sebagai WNI
            </p>
          </div>

          {/* Timeline Winding Road Container */}
          <div className="relative max-w-5xl mx-auto px-2 sm:px-4">
            
            {/* START BADGE */}
            <div className="flex justify-center mb-10 md:mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs sm:text-sm px-5 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] border-2 border-emerald-300 animate-pulse z-20">
                <span>🚀</span> START YOUR QUEST
              </div>
            </div>

            {/* ROADMAP ITEMS (ZIG ZAG DESKTOP & MOBILE) */}
            <div className="relative space-y-12 sm:space-y-16 md:space-y-24">
              {timeline.map((item, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={item.id || index}
                    className="relative flex flex-col md:flex-row items-center group"
                  >
                    
                    {/* SVG WINDING ROAD CONNECTORS (DESKTOP) */}
                    {index < timeline.length - 1 && (
                      <div className="hidden md:block absolute left-0 right-0 top-1/2 h-[calc(100%+4rem)] pointer-events-none z-0">
                        <svg
                          className="w-full h-full overflow-visible"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <path
                            d={isEven ? "M 50,0 C 90,30 90,70 50,100" : "M 50,0 C 10,30 10,70 50,100"}
                            fill="none"
                            stroke="#1e3a8a"
                            strokeWidth="22"
                            vectorEffect="non-scaling-stroke"
                            strokeLinecap="round"
                            className="opacity-70"
                          />
                          <path
                            d={isEven ? "M 50,0 C 90,30 90,70 50,100" : "M 50,0 C 10,30 10,70 50,100"}
                            fill="none"
                            stroke="#0f172a"
                            strokeWidth="14"
                            vectorEffect="non-scaling-stroke"
                            strokeLinecap="round"
                          />
                          <path
                            d={isEven ? "M 50,0 C 90,30 90,70 50,100" : "M 50,0 C 10,30 10,70 50,100"}
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="3"
                            strokeDasharray="6 6"
                            vectorEffect="non-scaling-stroke"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    )}

                    {/* SVG WINDING ROAD CONNECTORS (MOBILE ZIG ZAG ROAD) */}
                    {index < timeline.length - 1 && (
                      <div className="md:hidden absolute left-0 right-0 top-10 h-[calc(100%+2.5rem)] pointer-events-none z-0">
                        <svg
                          className="w-full h-full overflow-visible"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <path
                            d={isEven ? "M 25,0 C 85,35 85,65 75,100" : "M 75,0 C 15,35 15,65 25,100"}
                            fill="none"
                            stroke="#1e3a8a"
                            strokeWidth="14"
                            vectorEffect="non-scaling-stroke"
                            strokeLinecap="round"
                            className="opacity-60"
                          />
                          <path
                            d={isEven ? "M 25,0 C 85,35 85,65 75,100" : "M 75,0 C 15,35 15,65 25,100"}
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="3"
                            strokeDasharray="4 4"
                            vectorEffect="non-scaling-stroke"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    )}

                    {/* DESKTOP CARD CONTENT & MOBILE LAYOUT */}
                    <div
                      className={`w-full md:w-1/2 ${
                        isEven
                          ? 'md:pr-14 md:text-right'
                          : 'md:order-3 md:pl-14 md:text-left'
                      } z-10 pt-14 md:pt-0`}
                    >
                      {/* CARD CONTAINER WITH 3D SHADOW & GLOW */}
                      <div
                        className={`bg-gradient-to-br from-ec-card/95 via-blue-950/90 to-ec-card/95 border-2 border-blue-700/50 hover:border-amber-400/80 rounded-2xl p-5 sm:p-6 shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_30px_rgba(245,158,11,0.25)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-md relative ${
                          isEven ? 'ml-auto' : 'mr-auto'
                        }`}
                      >
                        {/* Time Badge */}
                        <div
                          className={`flex items-center gap-2 mb-2.5 ${
                            isEven ? 'md:justify-end' : 'justify-start'
                          }`}
                        >
                          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-ec-navy bg-amber-400 border border-amber-300 px-2.5 py-0.5 rounded-lg shadow-sm">
                            <span>⏰</span> {item.time}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white group-hover:text-amber-300 transition-colors mb-1.5">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-blue-100/80 font-medium leading-relaxed">
                          {item.description}
                        </p>

                        {/* Card Pointer Arrow (Desktop) */}
                        <div
                          className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-ec-card border-t-2 border-r-2 border-blue-700/50 rotate-45 ${
                            isEven
                              ? '-right-2.5 border-l-0 border-b-0'
                              : '-left-2.5 border-r-0 border-t-0 border-b-2 border-l-2'
                          }`}
                        />
                      </div>
                    </div>

                    {/* CENTER / ZIG ZAG CHECKPOINT MAP PIN */}
                    <div
                      className={`absolute top-0 ${
                        isEven ? 'left-6 md:left-1/2' : 'right-6 md:left-1/2'
                      } md:-translate-x-1/2 z-20 md:order-2 flex flex-col items-center`}
                    >
                      <div className="relative group/pin cursor-pointer">
                        {/* Glow Behind Pin */}
                        <div className="absolute inset-0 bg-amber-400/40 rounded-full blur-md group-hover/pin:scale-150 transition-transform duration-300" />

                        {/* 3D Diamond / Rotated Square Map Pin */}
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 border-4 border-amber-200 shadow-[0_6px_18px_rgba(245,158,11,0.5)] flex items-center justify-center transform rotate-45 group-hover/pin:rotate-0 group-hover/pin:scale-110 transition-all duration-300">
                          <span className="transform -rotate-45 group-hover/pin:rotate-0 text-ec-navy font-black text-base sm:text-xl transition-transform duration-300">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Pin Shadow */}
                        <div className="w-6 sm:w-8 h-2 bg-blue-950/80 rounded-full blur-xs mx-auto mt-1" />
                      </div>
                    </div>

                    {/* DESKTOP SPACER */}
                    <div
                      className={`hidden md:block w-1/2 ${
                        isEven ? 'order-3' : 'order-1'
                      }`}
                    />

                  </div>
                );
              })}
            </div>

            {/* FINISH BADGE */}
            <div className="flex justify-center mt-16 sm:mt-20 md:mt-28">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-ec-navy font-black text-xs sm:text-sm px-6 py-2.5 sm:px-7 sm:py-3 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.5)] border-2 border-yellow-200 hover:scale-105 transition-transform duration-300 z-20">
                <span>🏆</span> QUEST COMPLETED & CELEBRATION!
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}