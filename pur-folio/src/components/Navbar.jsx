import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX } from 'react-icons/fi';

import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efek Deteksi Scroll untuk Animasi Ketinggian Navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // INTEGRASI BARU: Mendengarkan sinyal transisi bahasa global
  useEffect(() => {
    const handleLanguageTransition = () => {
      // Ketika ada pemicu ganti bahasa, otomatis tutup panel mobile secara halus
      setIsOpen(false);
    };

    window.addEventListener('lng-start-transition', handleLanguageTransition);
    return () => window.removeEventListener('lng-start-transition', handleLanguageTransition);
  }, []);

  const navItems = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <>
      <style>{`
        .nav-link-techy {
          position: relative;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #94a3b8;
          transition: color 0.3s ease;
          padding: 4px 0;
        }
        .nav-link-techy::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0%;
          height: 1.5px;
          background: linear-gradient(90deg, #39FF5A, #20C997);
          transition: width 0.3s ease;
          box-shadow: 0 0 6px #39FF5A88;
        }
        .nav-link-techy:hover {
          color: #39FF5A;
        }
        .nav-link-techy:hover::after {
          width: 100%;
        }

        .logo-techy {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #39FF5A, #20C997);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 8px #39FF5A66);
          transition: filter 0.3s ease;
        }
        .logo-techy:hover {
          filter: drop-shadow(0 0 14px #39FF5Aaa);
        }

        /* Hamburger Button Techy */
        .hamburger-btn {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #39FF5A44;
          border-radius: 8px;
          background: transparent;
          color: #39FF5A;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .hamburger-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #39FF5A;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 7px;
        }
        .hamburger-btn:hover::before {
          opacity: 0.08;
        }
        .hamburger-btn:hover {
          border-color: #39FF5Aaa;
          box-shadow: 0 0 12px #39FF5A44, inset 0 0 12px #39FF5A11;
        }

        /* Close Button */
        .close-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #39FF5A55;
          border-radius: 8px;
          background: transparent;
          color: #39FF5A;
          transition: all 0.3s ease;
        }
        .close-btn:hover {
          background: #39FF5A18;
          border-color: #39FF5A;
          box-shadow: 0 0 10px #39FF5A44;
        }

        /* Mobile Nav Link */
        .mobile-nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #94a3b8;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid transparent;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .mobile-nav-link::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #39FF5A;
          box-shadow: 0 0 6px #39FF5A;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .mobile-nav-link:hover {
          color: #39FF5A;
          border-color: #39FF5A33;
          background: #39FF5A08;
          box-shadow: 0 0 12px #39FF5A18;
          padding-left: 20px;
        }
        .mobile-nav-link:hover::before {
          box-shadow: 0 0 10px #39FF5A, 0 0 20px #39FF5A66;
          transform: scale(1.5);
        }

        /* Panel */
        .mobile-panel {
          background: #0a0f1a;
          border-left: 1px solid #39FF5A22;
        }

        .panel-header {
          border-bottom: 1px solid #39FF5A18;
        }

        .panel-footer {
          border-top: 1px solid #39FF5A18;
        }

        /* Scan line decoration */
        .scan-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #39FF5A, #20C997, transparent);
          opacity: 0.6;
        }
      `}</style>

      <nav
        style={{
          background: scrolled ? '#060b14' : '#080d18',
          borderBottom: '1px solid #39FF5A22',
          boxShadow: scrolled ? '0 4px 24px #39FF5A11' : 'none',
          transition: 'all 0.4s ease',
        }}
        className="sticky top-0 z-50 w-full"
      >
        {/* Scan line top */}
        <div className="scan-line" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <a href="#" className="logo-techy">
              &lt;PORTFOLIO /&gt;
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-8">
                {navItems.map((item, index) => (
                  <a key={index} href={item.href} className="nav-link-techy">
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Divider + Toggles */}
              <div
                className="flex items-center gap-4 pl-6"
                style={{ borderLeft: '1px solid #39FF5A22' }}
              >
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile: Toggles + Hamburger */}
            <div className="flex md:hidden items-center gap-3">
              <LanguageToggle />
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(true)}
                className="hamburger-btn"
                aria-label="Buka Menu"
              >
                <FiMenu size={20} />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ===== MOBILE PANEL ===== */}

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          zIndex: 40,
          transition: 'opacity 0.4s ease',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* Panel Slide-In */}
      <div
        className="mobile-panel"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '72vw',
          maxWidth: '320px',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Scan line panel */}
        <div className="scan-line" />

        {/* Header */}
        <div
          className="panel-header flex items-center justify-between px-6 py-5"
        >
          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#39FF5A',
              textShadow: '0 0 8px #39FF5A88',
            }}
          >
            // NAVIGATION
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="close-btn"
            aria-label="Tutup Menu"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col gap-2 px-4 pt-6 flex-1">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="mobile-nav-link"
              style={{
                transitionDelay: isOpen ? `${index * 70 + 100}ms` : '0ms',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                transition: `opacity 0.35s ease, transform 0.35s ease, color 0.3s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease`,
              }}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          className="panel-footer px-6 py-4 text-center"
          style={{ fontSize: '0.6rem', color: '#39FF5A66', letterSpacing: '0.1em' }}
        >
          &copy; {new Date().getFullYear()} &nbsp;|&nbsp; Andrian M. Dzikwan
        </div>
      </div>
    </>
  );
};

export default Navbar;