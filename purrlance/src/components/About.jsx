import { useScrollAnimation } from '../hooks/useScrollAnimation';

const stats = [
  { value: '7 Hari', label: 'Rata-rata Selesai' },
  { value: '100%', label: 'Kepuasan Klien' },
  { value: '2x', label: 'Revisi Gratis' },
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="about section-padding" id="tentang" ref={ref}>
      <div className="container">
        <div className={`fade-up ${isVisible ? 'visible' : ''}`}>
          <div className="section-label">Tentang Kami</div>
          <h2 className="section-title">
            Kami Ada untuk Membuat UMKM Indonesia Go Digital
          </h2>
        </div>

        <div className={`about-text fade-up stagger-2 ${isVisible ? 'visible' : ''}`}>
          <p className="about-paragraph">
            WebKu Studio adalah tim developer muda yang percaya bahwa setiap
            UMKM berhak tampil profesional di dunia digital — bukan hanya
            korporasi besar. Kami fokus membangun website yang fungsional,
            estetik, dan benar-benar memberikan hasil nyata untuk bisnis kamu.
          </p>
          <p className="about-paragraph">
            Dengan pengalaman di bidang pengembangan web full-stack, kami tidak
            hanya membuat tampilan yang cantik — tapi memastikan website kamu
            benar-benar bekerja: cepat, mudah digunakan pelanggan, dan membawa
            pesanan masuk ke WhatsApp-mu.
          </p>
        </div>

        <div className={`about-stats fade-up stagger-3 ${isVisible ? 'visible' : ''}`}>
          {stats.map((stat, i) => (
            <div key={i} className="about-stat">
              <div className="about-stat-value">{stat.value}</div>
              <div className="about-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
