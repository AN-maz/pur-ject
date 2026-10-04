import { useState, useEffect } from 'react';
import Container from '../common/Container';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import navLogo from '../../assets/nav-logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const progress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'event', 'faq'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#event', label: 'Quests' },
    { href: '#faq', label: 'FAQ' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 ${isScrolled ? 'bg-ec-navy/95 border-blue-800 shadow-lg shadow-black/30' : 'bg-ec-blue/90 border-blue-900 backdrop-blur-xl'}`}>
        <div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-ec-gold via-ec-red to-ec-gold transition-all duration-300 shadow-lg shadow-ec-blue/50" 
          style={{ width: `${progress}%` }} 
        />
        
        <Container>
          <div className="flex items-center justify-between h-20">
              <a href="#hero" className="flex items-center gap-3 group">
  <div className="bg-ec-card px-3.5 py-1.5 rounded-2xl -rotate-3 border-2 border-ec-gold border-b-4 border-b-amber-500 shadow-lg transition-all duration-300 group-hover:rotate-0 group-hover:scale-105 flex items-center justify-center">
    <img 
      src={navLogo} 
      alt="English Club UTB" 
      className="h-8 w-auto object-contain" 
    />
  </div>
</a>

            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2.5 rounded-full font-bold transition-all duration-300 hover:text-ec-gold ${
                    activeSection === link.href.slice(1) ? 'bg-blue-800/60 text-ec-gold border border-blue-700' : 'text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              
              <a
                href="#register"
                className="ml-3 px-6 py-2.5 font-black text-white bg-ec-red rounded-2xl border-b-[5px] border-ec-iron transition-all duration-300 hover:bg-[#eb2334] active:border-b-0 active:translate-y-[5px]"
              >
                Register Now
              </a>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden bg-blue-800 p-2 rounded-xl border-b-4 border-blue-950 text-white active:border-b-0 active:translate-y-1 transition-all"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current mt-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current mt-1.5 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </Container>
      </nav>

      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
        isMobileMenuOpen 
          ? 'opacity-100 pointer-events-auto' 
          : 'opacity-0 pointer-events-none'
      }`}>
        <div 
          className="absolute inset-0 bg-ec-navy/95 backdrop-blur-2xl"
          onClick={closeMobileMenu}
        />
        
        <div className={`relative h-full flex flex-col items-center justify-center gap-6 transition-all duration-500 delay-100 ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}>
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className={`text-3xl font-bold text-white hover:text-ec-gold transition-all duration-300 hover:scale-110 ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {link.label}
            </a>
          ))}
          
          <a
            href="#register"
            onClick={closeMobileMenu}
            className={`mt-8 px-10 py-4 text-xl font-black text-white bg-ec-red rounded-2xl border-b-[6px] border-ec-iron hover:bg-[#eb2334] transition-all duration-300 hover:scale-110 ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Register Now
          </a>
        </div>
      </div>
    </>
  );
}