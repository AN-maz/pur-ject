import Container from '../common/Container';
import navLogo from '../../assets/nav-logo.png';

export default function Footer() {
  return (
    <footer className="bg-ec-navy text-white pt-20 pb-10 border-t-8 border-blue-800">
      <Container>
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="inline-block">
              <div className="bg-white p-2 rounded-2xl border-b-4 border-slate-300 mb-4 inline-block">
                <img src={navLogo} alt="English Club UTB" className="h-10 w-auto object-contain" />
              </div>
            </div>
            <h3 className="text-2xl font-black mb-2 drop-shadow-md">Banquet Under Horizon 2026</h3>
            <p className="text-blue-200 font-medium mb-2">
              Cultivating Unity Under The Open Sky
            </p>
            <p className="text-sm text-blue-300/70">
              Selesaikan misi, kumpulkan XP, taklukkan grammar!
            </p>
          </div>

          <div>
            <h3 className="text-xl font-black mb-5 text-white border-b-4 border-ec-gold pb-2 inline-block">Fast Travel</h3>
            <ul className="space-y-3 text-base font-bold text-blue-200">
              <li><a href="#about" className="hover:text-ec-gold transition-colors">✨ More Than Learning</a></li>
              <li><a href="#event" className="hover:text-ec-gold transition-colors">🗺️ Quest Board</a></li>
              <li><a href="#faq" className="hover:text-ec-gold transition-colors">❓ Guild Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-black mb-5 text-white border-b-4 border-ec-gold pb-2 inline-block">Guild Contact</h3>
            <ul className="space-y-3 text-base font-bold text-blue-200">
              <li>📍 Universitas Teknologi Bandung</li>
              <li>✉️ englishclub@utb.ac.id</li>
              <li>🗓️ 14 July 2026</li>
            </ul>
          </div>
        </div>

        <div className="border-t-4 border-blue-900 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-5 font-bold text-blue-400">
          <p>Mission Log © 2026 English Club UTB</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-3 rounded-2xl bg-blue-900 hover:bg-ec-gold hover:text-ec-navy border-b-4 border-blue-950 hover:border-amber-600 transition-all active:border-b-0 active:translate-y-1 text-white flex items-center gap-2"
          >
            ▲ Back to Top
          </button>
        </div>
      </Container>
    </footer>
  );
}