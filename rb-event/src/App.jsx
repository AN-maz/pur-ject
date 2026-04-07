import React, { useState } from 'react';
import logoImage from './assets/logo-ruang-belajar.png'; 
import Hero from './components/Hero';
import EventDetail from './components/EventDetail';
import AboutEvent from './components/AboutEvent';
import RegisterForm from './components/RegisterForm';

function App() {
  // State untuk mengontrol menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="font-sans text-gray-800">
      
      {/* NAVBAR - Fixed di atas dengan efek blur */}
      <nav className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 transition-all">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Logo Ruang Belajar" className="w-10 h-10 md:w-12 md:h-12" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-brand-green">Ruang Belajar</h1>
            </div>
          </div>

          {/* Menu Desktop */}
          <ul className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            <li className="hover:text-brand-green cursor-pointer transition">Beranda</li>
            <li className="hover:text-brand-green cursor-pointer transition">Detail Acara</li>
            <li className="hover:text-brand-green cursor-pointer transition">Pemateri</li>
            <li>
              <button className="bg-brand-green text-white px-5 py-2 rounded-full font-semibold hover:bg-green-700 transition shadow-md">
                Daftar Sekarang
              </button>
            </li>
          </ul>

          {/* Tombol Hamburger untuk Mobile */}
          <button 
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Dropdown Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 shadow-lg absolute w-full">
            <ul className="flex flex-col gap-4 font-medium text-gray-600 text-center">
              <li className="hover:text-brand-green cursor-pointer py-2">Beranda</li>
              <li className="hover:text-brand-green cursor-pointer py-2">Detail Acara</li>
              <li className="hover:text-brand-green cursor-pointer py-2">Pemateri</li>
              <li>
                <button className="bg-brand-green text-white w-full py-3 rounded-full font-semibold shadow-md">
                  Daftar Sekarang
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT AREA - Menyusun section ke bawah */}
      <main>
        <Hero />
        <AboutEvent />
        <EventDetail />
        <RegisterForm />
      </main>

    </div>
  );
}

export default App;