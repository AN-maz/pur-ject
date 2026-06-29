import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="navbar-inner">
          <a href="#" className="navbar-logo">
            wep<span>ur</span>
          </a>

          <div className="navbar-links">
            <a href="#layanan">Layanan</a>
            <a href="#portofolio">Portofolio</a>
            <a href="#harga">Harga</a>
            <a href="#faq">FAQ</a>
          </div>

          <a
            href="https://wa.me/628xxxxxxxxxx"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary navbar-cta"
          >
            Konsultasi Gratis →
          </a>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <div className={`navbar-mobile-menu ${mobileOpen ? 'open' : ''}`} id="mobile-menu">
        <a href="#layanan" onClick={handleNavClick}>Layanan</a>
        <a href="#portofolio" onClick={handleNavClick}>Portofolio</a>
        <a href="#harga" onClick={handleNavClick}>Harga</a>
        <a href="#faq" onClick={handleNavClick}>FAQ</a>
        <a
          href="https://wa.me/628xxxxxxxxxx"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ textAlign: 'center', marginTop: '0.5rem' }}
          onClick={handleNavClick}
        >
          Konsultasi Gratis →
        </a>
      </div>
    </>
  );
}
