import { navigate } from '../routing';
import { GAME_META } from '../games/meta';
import { GIcon } from '../games/icons';
import SoundEngine from '../games/sound';
import navLogo from '../assets/nav-logo.png';

const FLOATERS = [
  { icon: 'bolt', top: '12%', left: '8%', size: 'w-10 h-10', opacity: 'opacity-25', delay: '0ms' },
  { icon: 'puzzle', top: '22%', right: '10%', size: 'w-9 h-9', opacity: 'opacity-20', delay: '300ms' },
  { icon: 'sparkle', top: '70%', left: '12%', size: 'w-8 h-8', opacity: 'opacity-25', delay: '600ms' },
  { icon: 'magnifier', top: '80%', right: '14%', size: 'w-9 h-9', opacity: 'opacity-20', delay: '150ms' },
  { icon: 'bomb', top: '48%', left: '4%', size: 'w-8 h-8', opacity: 'opacity-15', delay: '450ms' },
  { icon: 'rocket', top: '60%', right: '4%', size: 'w-9 h-9', opacity: 'opacity-20', delay: '200ms' },
  { icon: 'trophy', top: '32%', left: '18%', size: 'w-8 h-8', opacity: 'opacity-15', delay: '500ms' },
  { icon: 'crown', top: '52%', right: '20%', size: 'w-8 h-8', opacity: 'opacity-20', delay: '700ms' },
];

export default function SplashScreen() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-ec-navy via-ec-blue to-ec-navy px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      {FLOATERS.map((f) => (
        <div
          key={f.icon}
          className={`absolute ${f.size} ${f.opacity} text-ec-gold animate-float pointer-events-none select-none`}
          style={{ top: f.top, left: f.left, right: f.right, animationDelay: f.delay }}
        >
          <GIcon name={f.icon} className="w-full h-full" />
        </div>
      ))}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-amber-500/20 via-blue-500/30 to-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto animate-fade-in">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-ec-card px-4 py-2 rounded-2xl -rotate-3 border-2 border-ec-gold border-b-4 border-b-amber-500 shadow-lg transition-all hover:rotate-0 hover:scale-105">
            <img src={navLogo} alt="English Club UTB" className="h-10 w-auto object-contain" />
          </div>

          <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-ec-gold text-ec-navy text-xs font-black tracking-wider uppercase border-b-4 border-amber-600 shadow-lg -rotate-2">
            <GIcon name="sparkle" className="w-4 h-4" />
            NEW SEASON: 2026
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white mt-5 tracking-tight drop-shadow-xl">
            BANQUET UNDER <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-ec-gold to-yellow-500">HORIZON 2026</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-blue-100/90 max-w-xl mx-auto font-medium leading-relaxed">
            Satu hari, banyak cerita, dan sebuah perjalanan baru. Kenali English Club, temukan teman baru, dan tumbuh bersama!
          </p>

          <p className="mt-6 text-ec-gold font-black uppercase tracking-[0.3em] text-xs sm:text-sm text-center">
            Choose Your Quest To Begin
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GAME_META.map((g, idx) => (
            <button
              key={g.id}
              onClick={() => {
                SoundEngine.tick();
                navigate('play', g.id);
              }}
              style={{ animationDelay: `${idx * 80}ms` }}
              className="group relative overflow-hidden rounded-2xl glass-card p-5 cursor-pointer hover:border-ec-gold/80 transition-all transform hover:-translate-y-1 hover:shadow-2xl text-left border-l-4 border-ec-gold/40 animate-fade-in"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-white/10 text-white/90">
                  {g.tag}
                </span>
                <div className={`w-10 h-10 rounded-xl ${g.accent} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition`}>
                  <GIcon name={g.icon} className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-1 text-white group-hover:text-amber-300 transition">{g.title}</h3>
              <p className="text-xs text-blue-200/70 line-clamp-2">{g.desc}</p>

              <div className="mt-3 flex items-center text-xs font-bold text-ec-gold group-hover:translate-x-1 transition">
                PLAY NOW
                <GIcon name="forward" className="w-4 h-4 ml-2" />
              </div>
            </button>
          ))}

          <button
            onClick={() => navigate('home')}
            style={{ animationDelay: `${GAME_META.length * 80}ms` }}
            className="rounded-2xl border-2 border-dashed border-blue-700/70 hover:border-ec-gold/70 hover:bg-white/5 transition-all text-left p-5 flex flex-col justify-between animate-fade-in"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-white/10 text-white/90">Skip</span>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-200 shadow-lg group-hover:scale-110 transition">
                <GIcon name="rocket" className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition mb-1">Enter The Banquet Directly</h3>
            <p className="text-xs text-blue-200/70">Skip quests dan langsung buka landing page.</p>
            <div className="mt-3 flex items-center text-xs font-bold text-blue-300 group-hover:text-ec-gold group-hover:translate-x-1 transition">
              GO TO SITE
              <GIcon name="forward" className="w-4 h-4 ml-2" />
            </div>
          </button>
        </div>

        <p className="mt-8 text-center text-[11px] text-blue-300/60">
          Kumpulkan skor, kejar streak, dan buktikan kemampuan Bahasa Inggris kamu!
        </p>
      </div>
    </section>
  );
}