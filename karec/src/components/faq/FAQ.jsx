import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import { faqs } from '../../data/faq';

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b-2 border-blue-800 last:border-0">
      <button
        onClick={onToggle}
        className="w-full text-left py-6 flex items-start justify-between gap-4 text-white hover:text-ec-gold transition-colors"
      >
        <span className="font-bold text-lg pr-4">{faq.question}</span>
        <span className={`text-2xl flex-shrink-0 text-ec-gold transition-transform ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {isOpen && (
        <div className="pb-6 text-blue-100 leading-relaxed">
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
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-900 text-ec-gold font-black px-8 py-3 rounded-full border-4 border-ec-navy shadow-xl flex items-center gap-2 text-xl z-10">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm1 4v2h2V7H6zm0 4v2h3v-2H6zm0 4v2h5v-2H6zm6-8h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6v-2z"/></svg>
        HELP DESK
      </div>
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-700/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-ec-gold/10 rounded-full blur-3xl" />
      </div>
      <Container>
        <div ref={revealRef} className="reveal-up relative z-10">
          <SectionTitle subtitle="Pertanyaan yang sering ditanyakan">
            FAQ
          </SectionTitle>

          <div className="max-w-3xl mx-auto bg-ec-card rounded-[28px] p-8 md:p-12 border-4 border-blue-800 shadow-[0_14px_0_rgba(0,13,54,1)]">
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
      </Container>
    </section>
  );
}
