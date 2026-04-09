import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventDetail from './components/EventDetail';
import AboutEvent from './components/AboutEvent';
import Rundown from './components/Rundown';
import FAQ from './components/FAQ';
import SessionInfo from './components/SessionInfo';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  // Memantau posisi scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="font-sans text-gray-800 relative">


      <Navbar />
      <main>
        <div id="beranda">
          <Hero />
        </div>
        <div id="latar-belakang">
          <AboutEvent />
        </div>
        <div id="materi">
          <SessionInfo />
        </div>
        <div id="pemateri">
          <EventDetail />
        </div>
        <div id="rundown">
          <Rundown />
        </div>
        <div id="faq">
          <FAQ />
        </div>
      </main>


      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-brand-green text-white shadow-lg hover:bg-green-700 hover:-translate-y-1 transition-all duration-300 z-50 flex items-center justify-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        aria-label="Kembali ke atas"
      >

        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

    </div>
  );
}

export default App;