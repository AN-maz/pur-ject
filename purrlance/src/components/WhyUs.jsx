import { useScrollAnimation } from '../hooks/useScrollAnimation';

const values = [
  {
    icon: '💰',
    title: 'Nol Potongan Komisi',
    desc: 'Pesanan masuk langsung ke WhatsApp-mu. Tidak ada marketplace yang ambil jatah. Setiap rupiah dari pelanggan, utuh untuk kamu.',
  },
  {
    icon: '⚡',
    title: 'Ringan & Cepat Dibuka',
    desc: 'Website dibuat dengan teknologi modern — sangat ringan saat dibuka dari HP pelanggan, bahkan dengan koneksi seadanya. Pelanggan tidak kabur karena loading lama.',
  },
  {
    icon: '🛠️',
    title: 'Serahkan Semua ke Kami',
    desc: 'Tidak perlu ngerti IT. Kami urus dari desain, pembuatan, sampai website kamu live dan siap dipakai. Kamu cukup terima orderan.',
  },
];

export default function WhyUs() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="whyus section-padding" id="layanan" ref={ref}>
      <div className="container">
        <div className="section-label">Mengapa Pilih Kami?</div>
        <h2 className="section-title">
          Jualan Lebih Mudah, Keuntungan Utuh di Tangan Kamu
        </h2>

        <div className="whyus-grid">
          {values.map((item, i) => (
            <div
              key={i}
              className={`whyus-card fade-up stagger-${i + 1} ${isVisible ? 'visible' : ''}`}
            >
              <div className="whyus-card-icon">{item.icon}</div>
              <h3 className="whyus-card-title">{item.title}</h3>
              <p className="whyus-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
