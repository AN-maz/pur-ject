import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import { faqs } from '../../data/faq';

// TODO: Sesuaikan path ini dengan lokasi gambar karakter 3D milikmu
import characterLeft from '/cewe.png'; 
import characterRight from '/cewe.png';

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div 
      className={`mb-3 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm ${
        isOpen 
          ? 'bg-blue-900/60 border-cyan-400/60 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
          : 'bg-blue-950/40 border-blue-800/50 hover:border-blue-500/80 hover:bg-blue-900/40'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-4 lg:p-5 flex items-center justify-between gap-4"
      >
        <span className={`font-bold text-sm lg:text-base transition-colors ${isOpen ? 'text-cyan-100' : 'text-white'}`}>
          {faq.question}
        </span>
        <span 
          className={`font-black text-xl flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-45 text-amber-400' : 'text-amber-400/80'
          }`}
        >
          +
        </span>
      </button>
      
      {/* Content Area dengan animasi sederhana via conditional rendering */}
      {isOpen && (
        <div className="px-4 pb-4 lg:px-5 lg:pb-5 text-blue-200 text-sm leading-relaxed border-t border-blue-800/40 pt-3">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const revealRef = useReveal();
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-ec-navy relative overflow-hidden border-t-8 border-blue-900">
      
      {/* BACKGROUND EFFECTS (Sci-Fi Grid & Map Glow) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px]" />
      </div>

      <Container>
        <div ref={revealRef} className="reveal-up relative z-10 flex flex-col items-center">
          
          {/* TOP BADGE (TIME CAPSULE SUPPORT) */}
          <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-ec-navy font-black px-6 py-2 rounded-t-xl rounded-b-sm border-b-4 border-amber-700 shadow-lg mb-8 uppercase tracking-widest text-xs md:text-sm">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
            </svg>
            TIME CAPSULE SUPPORT
          </div>

          <SectionTitle subtitle="Pertanyaan yang sering ditanyakan">
            FAQ
          </SectionTitle>

          {/* MAIN LAYOUT: CHARACTERS & FAQ LIST */}
          <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-8 mt-12 relative">
            
            {/* LEFT CHARACTER (Guide Accompanist) */}
            <div className="hidden lg:flex flex-col items-center w-64 relative z-10 shrink-0">
              {/* Speech Bubble */}
              <div className="bg-white rounded-[20px] p-4 mb-4 relative shadow-[0_8px_16px_rgba(0,0,0,0.4)] border-2 border-cyan-100 text-ec-navy text-sm font-bold text-center">
                Here are some common quest queries, buddy! Ready to guide you?
                {/* Bubble Tail */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-cyan-100 rotate-45"></div>
              </div>
              
              {/* 3D Avatar */}
              <img 
                src={characterLeft} 
                alt="Guide Accompanist" 
                className="w-48 h-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] z-10" 
              />
              
              {/* Name Tag */}
              <div className="mt-2 border border-cyan-400 bg-ec-navy/80 backdrop-blur-md px-5 py-1.5 rounded-full text-cyan-300 text-[10px] font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                GUIDE ACCOMPANIST
              </div>
            </div>

            {/* CENTER FAQ LIST */}
            <div className="w-full max-w-2xl relative z-20">
              <div className="bg-blue-950/50 backdrop-blur-md rounded-[24px] p-6 md:p-8 border-2 border-blue-800/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                
                {/* List Header */}
                <div className="text-center mb-6 pb-4 border-b border-blue-800/50">
                  <h4 className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
                    CRAFTING MEANINGFUL JOURNEYS
                  </h4>
                </div>

                {/* FAQ Items Loop */}
                <div className="space-y-1">
                  {faqs.map((faq, index) => (
                    <FAQItem
                      key={faq.id}
                      faq={faq}
                      isOpen={openIndex === index}
                      onToggle={() => handleToggle(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT CHARACTER (Explorer Buddy) */}
            <div className="hidden lg:flex flex-col items-center w-64 relative z-10 shrink-0">
              {/* Speech Bubble */}
              <div className="bg-white rounded-[20px] p-4 mb-4 relative shadow-[0_8px_16px_rgba(0,0,0,0.4)] border-2 border-amber-100 text-ec-navy text-sm font-bold text-center">
                Level Up Your Knowledge! Ask anything, I'm with you!
                {/* Bubble Tail */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-amber-100 rotate-45"></div>
              </div>
              
              {/* 3D Avatar */}
              <img 
                src={characterRight} 
                alt="Explorer Buddy" 
                className="w-48 h-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] z-10" 
              />
              
              {/* Name Tag */}
              <div className="mt-2 border border-amber-400 bg-ec-navy/80 backdrop-blur-md px-5 py-1.5 rounded-full text-amber-300 text-[10px] font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                EXPLORER BUDDY
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}