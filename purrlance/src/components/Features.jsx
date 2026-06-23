import { useScrollAnimation } from '../hooks/useScrollAnimation';

const features = [
  {
    icon: '🛍️',
    title: 'Katalog Produk Interaktif',
    desc: 'Tampilkan produk atau menu dengan foto, harga, dan deskripsi yang menarik. Pelanggan bisa browse seperti belanja online sungguhan — tapi ini milikmu sendiri, bukan milik marketplace.',
  },
  {
    icon: '💬',
    title: 'Pesan via WhatsApp Otomatis',
    desc: 'Setiap item dilengkapi tombol "Pesan Sekarang". Ringkasan pesanan pelanggan akan otomatis terformat rapi dan langsung dikirim ke nomor WhatsApp bisnismu. Tidak ada orderan yang terlewat.',
  },
  {
    icon: '🎨',
    title: 'Desain Sesuai Brand-mu',
    desc: 'Bukan template kaku yang sama untuk semua. Kami sesuaikan warna, font, dan tampilan website dengan karakter dan identitas merek UMKM-mu agar pelanggan langsung mengenalinya.',
  },
  {
    icon: '🔍',
    title: 'Siap Tampil di Google',
    desc: 'Website-mu dioptimasi agar bisa ditemukan di Google. Ketika orang mencari "[nama produkmu] di [kotamu]", peluang untuk muncul jauh lebih besar.',
  },
];

export default function Features() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding" id="fitur" ref={ref}>
      <div className="container">
        <div className="section-label">Yang Kamu Dapatkan</div>
        <h2 className="section-title">
          Satu Website, Semua yang UMKM-mu Butuhkan
        </h2>

        <div className="features-list">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`feature-item fade-up stagger-${i + 1} ${isVisible ? 'visible' : ''}`}
            >
              <div className="feature-icon-wrap">
                <span className="icon-pulse">{feature.icon}</span>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
