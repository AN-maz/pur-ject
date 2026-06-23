export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Background elements */}
      <div className="hero-bg">
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
      </div>

      <div className="container hero-inner">
        {/* Left — Content */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            ✦ Solusi Digital untuk UMKM Indonesia
          </div>

          <h1 className="hero-headline">
            Penjualanmu Bisa Lebih Ramai,{' '}
            <span className="hero-headline-accent">
              Tanpa Ribet Kelola Orderan
            </span>
          </h1>

          <p className="hero-subheadline">
            Kami buatkan website katalog produk yang profesional, cepat, dan
            pesanan pelanggan langsung masuk ke WhatsApp-mu — tanpa potongan
            komisi, tanpa pusing teknis.
          </p>

          <div className="hero-buttons">
            <a
              href="https://wa.me/628xxxxxxxxxx"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              id="hero-cta-primary"
            >
              🚀 Konsultasi Gratis
            </a>
            <a href="#portofolio" className="btn-secondary" id="hero-cta-secondary">
              Lihat Contoh Web →
            </a>
          </div>
        </div>

        {/* Right — Visual / Mockup */}
        <div className="hero-visual">
          <div className="hero-mockup">
            <div className="hero-mockup-placeholder">
              <div className="hero-mockup-placeholder-icon">📱</div>
              <div className="hero-mockup-placeholder-text">
                Katalog UMKM
              </div>
              <div style={{
                width: '80%',
                height: '8px',
                background: 'var(--color-primary-light)',
                borderRadius: '4px',
              }}></div>
              <div style={{
                width: '60%',
                height: '8px',
                background: 'var(--color-border)',
                borderRadius: '4px',
              }}></div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                width: '85%',
                marginTop: '0.5rem'
              }}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} style={{
                    height: '60px',
                    background: 'var(--color-primary-light)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                  }}>
                    {['☕', '🍔', '👗', '🎂'][i - 1]}
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'var(--color-primary)',
                color: '#fff',
                borderRadius: '8px',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
              }}>
                Pesan via WA
              </div>
            </div>
          </div>

          {/* Floating Badges */}
          <div className="hero-badge hero-badge-1 badge-float-1">
            ⚡ Selesai dalam 7 Hari
          </div>
          <div className="hero-badge hero-badge-2 badge-float-2">
            ✅ Tanpa Potongan Komisi
          </div>
          <div className="hero-badge hero-badge-3 badge-float-3">
            📱 Pesanan Langsung ke WA
          </div>
        </div>
      </div>
    </section>
  );
}
