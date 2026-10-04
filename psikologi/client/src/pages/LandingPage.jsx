import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Brain, ShieldCheck, Activity, ArrowRight } from 'lucide-react';

const ParticleBackground = lazy(() => import('../components/ParticleBackground'));

const features = [
  {
    icon: Brain,
    title: 'Instrumen Standar',
    desc: 'Menggunakan metode dan kuesioner teruji untuk evaluasi psikologi klinis maupun tipe kepribadian.',
  },
  {
    icon: ShieldCheck,
    title: 'Privasi Terjaga',
    desc: 'Proses kalkulasi dilakukan langsung di browser Anda tanpa menyimpan data sensitif ke server pihak ketiga.',
  },
  {
    icon: Activity,
    title: 'Hasil Instant',
    desc: 'Dapatkan skor awal dan ringkasan interpretasi hasil segera setelah Anda menyelesaikan tes.',
  },
];

export default function LandingPage() {
  return (
    <div className="space-y-14 sm:space-y-20 py-6 sm:py-10">
      {/* Hero */}
      <section className="relative -mx-4 sm:-mx-6 -mt-6 py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
        {/* Latar partikel + gradien */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-light/70 via-transparent to-transparent" />
          <Suspense fallback={null}>
            <ParticleBackground />
          </Suspense>
        </div>

        <div className="relative space-y-5 sm:space-y-6 max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-card border border-line text-primary shadow-sm animate-fade-up">
            Platform Skrining Psikologi Mandiri
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-main tracking-tight leading-tight animate-fade-up">
            Pahami Diri dan Kesehatan Mental Anda Secara Ilmiah
          </h1>
          <p className="text-base sm:text-lg text-muted animate-fade-up" style={{ animationDelay: '100ms' }}>
            Akses instrumen psikometri populer seperti PHQ-9, MBTI, BDI, DISC, dan Enneagram secara cepat, privat, dan mudah digunakan.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              Mulai Tes Sekarang <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="p-5 sm:p-6 bg-card rounded-2xl border border-line shadow-sm space-y-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/60 animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="p-3 w-fit rounded-lg bg-primary-light text-primary">
              <f.icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-main">{f.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}