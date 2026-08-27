import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="footer" className="bg-navy text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          
          {/* Brand & Tagline */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
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
              <div className="font-extrabold text-lg">LMS Gamifikasi</div>
            </div>
            <p className="mt-4 text-white/50 text-sm max-w-sm leading-relaxed">
              Berbagi dan mempelajari ilmu dengan semangat gamifikasi. Tidak ada kata terlambat untuk belajar.
            </p>
          </div>

          {/* Navigasi Links */}
          <div>
            <h4 className="font-bold text-sm text-white/60 uppercase tracking-wider">
              Navigasi
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li><a href="#beranda" className="hover:text-white transition">Beranda</a></li>
              <li><a href="#kenapa" className="hover:text-white transition">Kenapa Kami</a></li>
              <li><a href="#fitur" className="hover:text-white transition">Fitur</a></li>
              <li><a href="#tim" className="hover:text-white transition">Team</a></li>
            </ul>
          </div>

          {/* Mulai Links */}
          <div>
            <h4 className="font-bold text-sm text-white/60 uppercase tracking-wider">
              Mulai
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li><Link to="/auth" className="hover:text-white transition">Masuk ke Aplikasi</Link></li>
              <li><Link to="/auth" className="hover:text-white transition">Daftar Akun Baru</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <div>&copy; 2026 LMS Gamifikasi. Dibuat dengan semangat belajar.</div>
          <div>Prototype simulasi • docs/landing.html</div>
        </div>
      </div>
    </footer>
  );
}