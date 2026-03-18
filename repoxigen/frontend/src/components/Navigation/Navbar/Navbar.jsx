import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ to, children }) => {
  const location = useLocation();

  const isActive = to === '/'
    ? location.pathname === '/' || location.pathname.startsWith('/home')
    : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={`relative px-1 py-2 text-sm font-medium transition-colors duration-300 group
        ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}
      `}
    >
      {children}
      <span className={`absolute left-0 bottom-0 h-0.5 bg-oxigen-light transition-all duration-300 ease-out
        ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
      `}></span>
    </Link>
  );
};

const MobileNavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = to === '/'
    ? location.pathname === '/' || location.pathname.startsWith('/home')
    : location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border-l-4
        ${isActive
          ? 'bg-white/10 border-oxigen-light text-white shadow-lg'
          : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5 hover:border-gray-500'
        }
      `}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out border-b border-transparent
        ${isScrolled
          ? 'bg-oxigen-dark/90 backdrop-blur-md shadow-lg py-3 border-white/10'
          : 'bg-transparent py-5'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">

          {/* LOGO SECTION */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <img
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105 brightness-0 invert"
              src="/oxigen.png"
              alt="Logo Oxigen"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/merchant">Merchant</NavLink>
            </div>
          </div>

          {/* LOGIN BUTTON (DESKTOP) */}
          <div className="hidden md:block">
            <Link
              to="/login"
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg
                ${location.pathname === '/login'
                  ? 'bg-white text-oxigen-dark border border-white'
                  : 'bg-oxigen-light text-white hover:bg-blue-600 shadow-oxigen-light/30'
                }
              `}
            >
              Login
            </Link>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-1'}`}></span>
                <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'translate-y-3'}`}></span>
                <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN (ANIMATED) */}
      <div
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-in-out origin-top
          ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 bg-oxigen-dark/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
          <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
          <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
          <MobileNavLink to="/merchant" onClick={() => setIsOpen(false)}>Merchant</MobileNavLink>

          <div className="pt-4 mt-4 border-t border-white/10">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-oxigen-light hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-bold shadow-lg shadow-oxigen-light/20 transition-all active:scale-95"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;