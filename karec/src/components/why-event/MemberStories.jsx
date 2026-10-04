import { useReveal } from '../../hooks/useReveal';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';
import { memberStories } from '../../data/stories';

export default function MemberStories() {
  const revealRef = useReveal();

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-ec-navy via-ec-blue to-ec-navy border-t-8 border-blue-900">
      <Container>
        <div ref={revealRef} className="reveal-up">
          <SectionTitle subtitle="Fokus pada cerita individu">
            Our Members,<br/>Their Stories
          </SectionTitle>

          <div className="grid md:grid-cols-3 gap-8">
            {memberStories.map((story) => (
              <Card key={story.id} hover className="text-center">
                <div className="text-6xl mb-6">{story.image}</div>
                <h3 className="text-xl font-bold text-white mb-2">{story.name}</h3>
                <p className="text-sm text-ec-gold font-bold mb-4">{story.role}</p>
                <p className="text-blue-100 italic leading-relaxed">"{story.quote}"</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-blue-200 font-bold">
              Mungkin aku juga bisa berkembang seperti mereka.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
