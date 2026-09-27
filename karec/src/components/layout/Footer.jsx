import Container from '../common/Container';
import navLogo from '../../assets/nav-logo.png';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-ec-navy via-blue-950 to-slate-950 text-white pt-16 pb-8 border-t-8 border-blue-900/80 relative overflow-hidden">
      
      {/* Background Ambient Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <Container>
        <div className="relative z-10 grid md:grid-cols-12 gap-10 lg:gap-12 mb-12">
          
          {/* BRANDING COLUMN */}
          <div className="md:col-span-5 space-y-4">
            {/* Tactile 3D Frame Logo */}
           <div className="inline-block -skew-x-12 p-2 rounded-2xl bg-gradient-to-b from-amber-400 via-amber-600 to-amber-800 border-2 border-amber-300 border-b-[5px] border-b-amber-950 shadow-[0_8px_20px_rgba(0,0,0,0.6)]">
            <div className="px-3 py-1.5 rounded-xl flex items-center justify-center skew-x-12">
              <img src={navLogo} alt="English Club UTB" className="h-9 w-auto object-contain" />
            </div>
          </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
                Banquet Under Horizon <span className="text-amber-400">2026</span>
              </h3>
              <p className="text-sm sm:text-base text-cyan-300 font-bold mt-1">
                Cultivating Unity Under The Open Sky
              </p>
            </div>

            <p className="text-xs sm:text-sm text-blue-200/80 font-medium max-w-sm leading-relaxed">
              Selesaikan misi, kumpulkan XP, taklukkan grammar! Bergabunglah dalam petualangan seru bersama English Club UTB.
            </p>
          </div>

          {/* FAST TRAVEL LINKS */}
          <div className="md:col-span-3 space-y-4">
            <div className="inline-block border-b-4 border-amber-400 pb-1">
              <h3 className="text-lg font-black uppercase tracking-wider text-amber-300">
                Fast Travel
              </h3>
            </div>

            <ul className="space-y-3">
              <li>
                <a 
                  href="#about" 
                  className="group inline-flex items-center gap-2.5 text-sm font-bold text-blue-200 hover:text-amber-300 transition-colors"
                >
                  <span className="p-1.5 rounded-lg bg-blue-900/80 border border-blue-700/60 text-amber-400 group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/>
                    </svg>
                  </span>
                  <span>More Than Learning</span>
                </a>
              </li>

              <li>
                <a 
                  href="#event" 
                  className="group inline-flex items-center gap-2.5 text-sm font-bold text-blue-200 hover:text-amber-300 transition-colors"
                >
                  <span className="p-1.5 rounded-lg bg-blue-900/80 border border-blue-700/60 text-cyan-400 group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
                    </svg>
                  </span>
                  <span>Quest Board</span>
                </a>
              </li>

              <li>
                <a 
                  href="#faq" 
                  className="group inline-flex items-center gap-2.5 text-sm font-bold text-blue-200 hover:text-amber-300 transition-colors"
                >
                  <span className="p-1.5 rounded-lg bg-blue-900/80 border border-blue-700/60 text-emerald-400 group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z"/>
                    </svg>
                  </span>
                  <span>Guild Support</span>
                </a>
              </li>
            </ul>
          </div>

          {/* GUILD CONTACT */}
          <div className="md:col-span-4 space-y-4">
            <div className="inline-block border-b-4 border-amber-400 pb-1">
              <h3 className="text-lg font-black uppercase tracking-wider text-amber-300">
                Guild Contact
              </h3>
            </div>

            <ul className="space-y-3.5 text-sm font-medium text-blue-200">
              <li className="flex items-start gap-3">
                <span className="p-1.5 rounded-lg bg-blue-900/80 border border-blue-700/60 text-red-400 shrink-0 mt-0.5">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </span>
                <span className="font-bold">Universitas Teknologi Bandung</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="p-1.5 rounded-lg bg-blue-900/80 border border-blue-700/60 text-cyan-400 shrink-0">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </span>
                <span className="font-bold">englishclub@utb.ac.id</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="p-1.5 rounded-lg bg-blue-900/80 border border-blue-700/60 text-amber-400 shrink-0">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                  </svg>
                </span>
                <span className="font-bold">14 July 2026</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & BACK TO TOP BUTTON */}
        <div className="border-t-2 border-blue-900/80 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm font-bold text-blue-300 relative z-10">
          <p className="tracking-wide">
            MISSION LOG © 2026 ENGLISH CLUB UTB
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-900 via-ec-navy to-blue-900 hover:from-amber-500 hover:to-amber-400 text-amber-300 hover:text-ec-navy font-black border-2 border-blue-600/80 hover:border-yellow-200 border-b-[4px] border-b-blue-950 hover:border-b-amber-700 shadow-md transition-all duration-200 active:translate-y-1 active:border-b-0 uppercase tracking-wider group"
          >
            <span>BACK TO TOP</span>
            <svg className="w-4 h-4 fill-current group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
          </button>
        </div>
      </Container>
    </footer>
  );
}