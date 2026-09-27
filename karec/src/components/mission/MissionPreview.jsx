import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import { missions } from '../../data/missions';

export default function MissionPreview() {
  const revealRef = useReveal();

  return (
    <section className="py-24 md:py-32 bg-ec-navy relative overflow-hidden border-t-8 border-blue-900">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-900 text-ec-gold font-black px-8 py-3 rounded-full border-4 border-ec-navy shadow-xl flex items-center gap-2 text-xl z-10">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm7 14l5-5-5-5-1.4 1.4 2.6 2.6H7v2h6.2l-2.6 2.6L12 17z"/></svg>
        QUEST BOARD
      </div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-20 w-96 h-96 bg-ec-red/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-ec-gold/20 rounded-full blur-3xl" />
      </div>

      <Container>
        <div ref={revealRef} className="reveal-up relative z-10">
          <SectionTitle subtitle="Setiap quest memiliki hadiah XP dan difficulty sendiri">
            Mission Preview
          </SectionTitle>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-ec-navy to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-ec-navy to-transparent z-10 pointer-events-none" />
            
            <div className="overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide">
              <div className="flex gap-6 min-w-max px-4">
                {missions.map((mission) => (
                  <div 
                    key={mission.id}
                    className="group relative w-80 flex-shrink-0 bg-ec-card rounded-3xl p-8 border-4 border-blue-800 shadow-[0_10px_0_rgba(0,13,54,1)] hover:border-ec-gold hover:-translate-y-3 transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ec-gold/10 to-transparent rounded-bl-full" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-ec-red/10 to-transparent rounded-tr-full" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-ec-gold to-ec-red opacity-40">
                          {String(mission.id).padStart(2, '0')}
                        </span>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ec-gold to-amber-600 border-4 border-amber-700 flex items-center justify-center text-ec-navy font-black shadow-lg">
                            {mission.id}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-blue-300 bg-blue-900/60 px-2 py-0.5 rounded-full border border-blue-700">
                            {mission.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-ec-gold transition-colors duration-300">
                        {mission.title}
                      </h3>
                      
                      <p className="text-blue-100 mb-6 leading-relaxed min-h-[4rem]">
                        {mission.description}
                      </p>
                      
                      <div className="mb-4 inline-block px-3 py-1.5 rounded-xl bg-ec-gold/10 border-2 border-ec-gold/40 text-ec-gold font-black text-sm">
                        Reward: {mission.reward}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {mission.focus.map((skill, idx) => (
                          <span key={idx} className="inline-block px-3 py-1 text-xs font-black text-ec-navy bg-blue-100 border-b-4 border-blue-300 rounded-lg">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-ec-gold/40 rounded-3xl transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-8 text-sm text-blue-300 font-bold flex items-center justify-center gap-2">
              <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
              Scroll untuk me-lihat semua quest
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}