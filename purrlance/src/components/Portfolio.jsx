import { useScrollAnimation } from '../hooks/useScrollAnimation';

const portfolios = [
  {
    emoji: '☕',
    title: 'Kedai Kopi "Nusantara Brew"',
    tag: '☕ Kuliner · Katalog Menu',
    desc: 'Website menu digital untuk kedai kopi lokal, dengan galeri foto produk dan integrasi pemesanan via WhatsApp.',
    gradient: 'linear-gradient(135deg, #E6F7F4 0%, #d1fae5 50%, #fef3c7 100%)',
  },
  {
    emoji: '👗',
    title: 'Toko Baju "Loka Wastra"',
    tag: '👗 Fashion Lokal · Katalog Produk',
    desc: 'Toko online sederhana untuk brand fashion lokal, dilengkapi filter kategori dan tombol pesan langsung.',
    gradient: 'linear-gradient(135deg, #fce7f3 0%, #E6F7F4 50%, #ede9fe 100%)',
  },
  {
    emoji: '🍽️',
    title: 'Warung Makan "Dapur Bu Sari"',
    tag: '🍽️ Kuliner · Daftar Menu',
    desc: 'Pengganti menu cetak berbasis digital, cocok untuk warung makan yang ingin tampil lebih profesional.',
    gradient: 'linear-gradient(135deg, #fef3c7 0%, #d1fae5 50%, #E6F7F4 100%)',
  },
];

export default function Portfolio() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="portfolio section-padding" id="portofolio" ref={ref}>
      <div className="container">
        <div className="section-label">Portofolio</div>
        <h2 className="section-title">
          Begini Hasilnya Jika UMKM-mu Punya Website
        </h2>
        <p className="section-subtitle" style={{ marginBottom: '0' }}>
          Berikut adalah prototipe desain yang kami buat sebagai gambaran nyata.
          Desain final untuk bisnis kamu akan disesuaikan penuh dengan merek dan
          kebutuhanmu.
        </p>

        <div className="portfolio-grid">
          {portfolios.map((item, i) => (
            <div
              key={i}
              className={`portfolio-card fade-up stagger-${i + 1} ${isVisible ? 'visible' : ''}`}
            >
              <div
                className="portfolio-card-image"
                style={{ background: item.gradient }}
              >
                <span className="portfolio-card-image-placeholder">
                  {item.emoji}
                </span>
              </div>
              <div className="portfolio-card-body">
                <span className="portfolio-card-tag">{item.tag}</span>
                <h3 className="portfolio-card-title">{item.title}</h3>
                <p className="portfolio-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
