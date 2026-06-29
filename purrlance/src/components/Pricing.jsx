import { useScrollAnimation } from '../hooks/useScrollAnimation';

const starterFeatures = [
  "Landing Page",
  "Maks. 20 produk",
  "WhatsApp Order",
  "Domain .web.id (1 thn)",
  "Mobile Responsive",
  "Revisi minor 7 hari",
  "Garansi bug 30 hari",
];

const growthFeatures = [
  "Website Multi Page",
  "Maks. 60 produk",
  "Search Produk",
  "Domain .com (1 thn)",
  "Google Maps + SEO Dasar",
  "Revisi minor 14 hari",
  "Garansi bug 30 hari",
];

export default function Pricing() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding" id="harga" ref={ref}>
      <div className="container">
        <div className="section-label">Harga Transparan</div>
        <h2 className="section-title">
          Investasi Sekali, Manfaat Jangka Panjang
        </h2>
        <p className="section-subtitle">
          Tidak ada biaya tersembunyi. Tidak ada kontrak panjang. Semua sudah
          jelas dari awal.
        </p>

        <div className="pricing-grid" style={{ marginTop: '2.5rem' }}>
          {/* Starter — Popular */}
          <div
            className={`pricing-card popular fade-up stagger-1 ${isVisible ? 'visible' : ''}`}
          >
            <div className="pricing-badge">⭐ Paling Banyak Dipilih</div>
            <h3 className="pricing-name">Starter</h3>
            <div className="pricing-price">
              Rp 499.000<span>/ sekali bayar</span>
            </div>
            <div className="pricing-features">
              {starterFeatures.map((f, i) => (
                <div key={i} className="pricing-feature">
                  <span className="pricing-feature-check">✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/628xxxxxxxxxx?text=Halo%20WebKu%2C%20saya%20tertarik%20paket%20Starter!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              id="pricing-cta-starter"
            >
              Pilih Paket Starter
            </a>
          </div>

          {/* Growth */}
          <div
            className={`pricing-card fade-up stagger-2 ${isVisible ? 'visible' : ''}`}
          >
            <h3 className="pricing-name">Growth</h3>
            <div className="pricing-price">
              Rp 899.000 <span>/ sekali bayar</span>
            </div>
            <div className="pricing-features">
              {growthFeatures.map((f, i) => (
                <div key={i} className="pricing-feature">
                  <span className="pricing-feature-check">✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/628xxxxxxxxxx?text=Halo%20WebKu%2C%20saya%20tertarik%20paket%20Growth!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              id="pricing-cta-growth"
            >
              Pilih Paket Growth
            </a>
          </div>
        </div>

        {/* Note */}
        <div className={`pricing-note fade-up ${isVisible ? 'visible' : ''}`}>
          ⚠️ Biaya perpanjangan hosting & domain mulai Rp 300.000–600.000 per
          tahun untuk tahun berikutnya, tergantung paket domain yang dipilih.
          Kami akan ingatkan kamu sebelum jatuh tempo.
        </div>
      </div>
    </section>
  );
}
