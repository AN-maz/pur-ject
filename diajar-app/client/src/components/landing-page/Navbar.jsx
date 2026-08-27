import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 mt-4">
        {/* Tambahkan backdrop-blur-md dan background semi-transparan (bg-slate-900/50) */}
        <div className="rounded-2xl px-5 py-3 flex items-center justify-between text-white shadow-lg border border-white/10 bg-slate-900/50 backdrop-blur-md">
          
          {/* Logo & Branding */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <svg 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>
              </svg>
            </div>
            <div>
              <div className="font-extrabold leading-none">LMS Gamifikasi</div>
              <div className="text-white/50 text-[10px] mt-0.5">
                Belajar tidak ada kata terlambat
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
            <a href="#beranda" className="hover:text-white transition">Beranda</a>
            <a href="#kenapa" className="hover:text-white transition">Kenapa Kami</a>
            <a href="#fitur" className="hover:text-white transition">Fitur</a>
            <a href="#tim" className="hover:text-white transition">Team</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a href="#footer" className="hidden sm:inline text-white/80 hover:text-white text-sm font-medium transition">
              Kontak
            </a>
            <Link
              to="/auth"
              className="bg-primary hover:bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-lg shadow-primary/30"
            >
              Masuk
            </Link>
          </div>

        </div>
      </nav>
    </header>
  );
}