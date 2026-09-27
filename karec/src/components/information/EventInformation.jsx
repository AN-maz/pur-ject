import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import { eventInfo } from '../../data/event';

export default function EventInformation() {
  const revealRef = useReveal();

  const details = [
    { 
      label: 'Event', 
      value: eventInfo.name,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    { 
      label: 'Theme', 
      value: eventInfo.theme,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    },
    { 
      label: 'Date', 
      value: eventInfo.date,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      label: 'Location', 
      value: eventInfo.location,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    { 
      label: 'Meeting Point', 
      value: eventInfo.meetingPoint,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    { 
      label: 'HTM', 
      value: eventInfo.price,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <section id="event" className="py-24 md:py-32 bg-gradient-to-br from-ec-blue via-blue-900 to-ec-navy border-t-8 border-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-ec-gold rounded-full blur-3xl" />
      </div>

      <Container>
        <div ref={revealRef} className="reveal-up relative z-10">
          <SectionTitle className="text-white">
            Event Information
          </SectionTitle>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-ec-card rounded-3xl p-8 md:p-12 border-4 border-blue-800 shadow-[0_14px_0_rgba(0,13,54,1)] overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-ec-gold/15 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-ec-red/15 to-transparent rounded-tr-full" />
              
              <div className="absolute top-1/2 -left-6 w-12 h-12 bg-gradient-to-br from-ec-gold to-amber-600 rounded-full" />
              <div className="absolute top-1/2 -right-6 w-12 h-12 bg-gradient-to-br from-ec-gold to-amber-600 rounded-full" />

              <div className="relative z-10 space-y-6">
                {details.map((detail, index) => (
                  <div 
                    key={index} 
                    className="group flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white/10"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-ec-gold to-amber-600 border-b-4 border-amber-700 flex items-center justify-center text-ec-navy shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {detail.icon}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="text-sm font-bold text-blue-300 uppercase tracking-wider mb-1">
                        {detail.label}
                      </div>
                      <div className="text-lg md:text-xl font-black text-white">
                        {detail.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative z-10 mt-10 pt-8 border-t-2 border-blue-800">
                <a 
                  href="#register"
                  className="relative block w-full py-4 text-center font-black text-white bg-ec-red rounded-2xl border-b-[8px] border-ec-iron transition-all duration-300 hover:bg-[#eb2334] active:border-b-0 active:translate-y-2"
                >
                  Claim Your Spot - Only {eventInfo.price} 🎮
                </a>
              </div>

              <div className="absolute top-8 right-8 text-white/10 font-black text-6xl md:text-8xl pointer-events-none">
                2026
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
