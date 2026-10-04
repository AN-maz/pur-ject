import { Link } from 'react-router-dom';
import { Brain, ShieldCheck, Activity, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-theme-light text-theme-primary">
          Platform Skrining Psikologi Mandiri
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-theme-main tracking-tight leading-tight">
          Pahami Diri dan Kesehatan Mental Anda Secara Ilmiah
        </h1>
        <p className="text-lg text-theme-muted">
          Akses instrumen psikometri populer seperti PHQ-9, MBTI, BDI, DISC, dan Enneagram secara cepat, privat, dan mudah digunakan.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 bg-theme-primary bg-theme-primary-hover text-white font-semibold rounded-xl shadow-lg transition-all"
          >
            Mulai Tes Sekarang <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-2xl border border-theme shadow-sm space-y-3">
          <div className="p-3 w-fit rounded-lg bg-theme-light text-theme-primary">
            <Brain size={24} />
          </div>
          <h3 className="text-lg font-bold text-theme-main">Instrumen Standar</h3>
          <p className="text-sm text-theme-muted">
            Menggunakan metode dan kuesioner teruji untuk evaluasi psikologi klinis maupun tipe kepribadian.
          </p>
        </div>

        <div className="p-6 bg-card rounded-2xl border border-theme shadow-sm space-y-3">
          <div className="p-3 w-fit rounded-lg bg-theme-light text-theme-primary">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-lg font-bold text-theme-main">Privasi Terjaga</h3>
          <p className="text-sm text-theme-muted">
            Proses kalkulasi dilakukan langsung di browser Anda tanpa menyimpan data sensitif ke server pihak ketiga.
          </p>
        </div>

        <div className="p-6 bg-card rounded-2xl border border-theme shadow-sm space-y-3">
          <div className="p-3 w-fit rounded-lg bg-theme-light text-theme-primary">
            <Activity size={24} />
          </div>
          <h3 className="text-lg font-bold text-theme-main">Hasil Instant</h3>
          <p className="text-sm text-theme-muted">
            Dapatkan skor awal dan ringkasan interpretasi hasil segera setelah Anda menyelesaikan tes.
          </p>
        </div>
      </section>
    </div>
  );
}