import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import { testimonials } from '../../data/stories';

export default function CommunityStories() {
  const revealRef = useReveal();

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-ec-navy via-ec-blue to-ec-navy border-t-8 border-blue-900">
      <Container>
        <div ref={revealRef} className="reveal-up">
          <SectionTitle>Community Stories</SectionTitle>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-ec-card rounded-[20px] p-8 border-4 border-blue-800 border-l-ec-gold shadow-[0_10px_0_rgba(0,13,54,1)] hover:border-l-ec-gold hover:border-amber-400 hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-lg text-blue-100 italic mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="text-sm text-blue-300 font-bold">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
