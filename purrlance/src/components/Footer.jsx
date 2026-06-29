import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Footer() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <footer ref={ref}>
      {/* CTA Banner */}
      <div className="container section-padding" style={{ paddingBottom: 0 }}>
        <div className={`cta-banner fade-up ${isVisible ? 'visible' : ''}`}>
          <h2 className="cta-banner-title">
            Siap Bawa UMKM-mu ke Level Berikutnya?
          </h2>
          <p className="cta-banner-subtitle">
            Konsultasi pertama gratis. Tanpa basa-basi, langsung ke solusi.
          </p>
          <a
            href="https://wa.me/628xxxxxxxxxx"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            id="footer-cta-whatsapp"
          >
            💬 Chat WhatsApp Sekarang
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="container">
          <div className="footer-inner">
            {/* Brand */}
            <div>
              <div className="footer-brand-logo">
                Wep<span>ur</span>
              </div>
              <p className="footer-brand-tagline">
                Website profesional untuk UMKM Indonesia.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="footer-heading">Navigasi</h4>
              <div className="footer-links">
                <a href="#layanan">Layanan</a>
                <a href="#portofolio">Portofolio</a>
                <a href="#harga">Harga</a>
                <a href="#faq">FAQ</a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="footer-heading">Kontak</h4>
              <div className="footer-links">
                <a
                  href="https://wa.me/628xxxxxxxxxx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: +62 8xx-xxxx-xxxx
                </a>
                <a href="mailto:hello@wepur.id">Email: hello@webpur.id</a>
                <a
                  href="https://instagram.com/webkustudio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram: @wepurstudio
                </a>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>
          <p className="footer-copyright">
            © 2025 wepur Studio. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
