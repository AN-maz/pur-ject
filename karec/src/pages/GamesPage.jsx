import { useState } from 'react';
import { navigate } from '../routing';
import { GAME_META } from '../games/meta';
import { GIcon } from '../games/icons';
import SoundEngine from '../games/sound';
import navLogo from '../assets/nav-logo.png';

export default function GamesPage() {
  const [selectedGameId, setSelectedGameId] = useState(GAME_META[0]?.id || '');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique tags for filter tabs
  const allTags = ['ALL', ...Array.from(new Set(GAME_META.map((g) => g.tag))).filter(Boolean)];

  // Filter games based on tag & search input
  const filteredGames = GAME_META.filter((g) => {
    const matchesFilter = activeFilter === 'ALL' || g.tag === activeFilter;
    const matchesSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Get active selected game data
  const activeGame = GAME_META.find((g) => g.id === selectedGameId) || GAME_META[0];

  const handleGameHover = (id) => {
    if (selectedGameId !== id) {
      setSelectedGameId(id);
      SoundEngine.tick();
    }
  };

  const handlePlayGame = (gameId) => {
    SoundEngine.tick();
    navigate('play', gameId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-ec-navy to-slate-950 text-white relative overflow-x-hidden selection:bg-ec-gold selection:text-ec-navy">
      
      {/* AMBIENT BACKGROUND GLOW & GRID */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-25 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-ec-gold via-ec-red to-ec-gold z-50" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 lg:py-16 relative z-10">
        
        {/* ========================================== */}
        {/* GAMIFIED HEADER HUD                        */}
        {/* ========================================== */}
        <header className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-blue-900/60 mb-10 backdrop-blur-md bg-slate-950/40 p-4 sm:p-5 rounded-2xl border border-white/5">
          <button
            onClick={() => {
              SoundEngine.tick();
              navigate('home');
            }}
            className="cursor-pointer flex items-center gap-3.5 group text-left"
          >
            <div className="bg-ec-navy w-12 h-12 rounded-2xl border-2 border-ec-gold/80 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:scale-105 group-hover:border-ec-gold transition-all duration-300">
              <img src={navLogo} alt="English Club UTB" className="h-8 w-auto object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-wider text-white group-hover:text-amber-300 transition-colors">
                  QUEST DASHBOARD
                </h1>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>
              <p className="text-xs text-blue-200/70 font-medium">English Club Interactive Platform</p>
            </div>
          </button>

          {/* PLAYER STATUS / CONTROLS */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-950/80 border border-blue-800/60 text-xs font-bold text-blue-200">
              <span className="text-amber-400 font-black">QUESTS:</span>
              <span>{GAME_META.length} AVAILABLE</span>
            </div>

            <button
              onClick={() => {
                SoundEngine.tick();
                navigate('home');
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-900/80 to-slate-900 hover:from-blue-800 hover:to-slate-800 border border-blue-700/80 hover:border-amber-400/80 rounded-xl text-xs font-black inline-flex items-center gap-2 transition-all shadow-lg active:scale-95"
            >
              <GIcon name="back" className="w-3.5 h-3.5 text-amber-400" />
              <span>Back to Site</span>
            </button>
          </div>
        </header>

        <main className="space-y-10 sm:space-y-12 animate-fade-in">
          
          {/* ========================================== */}
          {/* PAGE TITLE & SEARCH / FILTER CONTROL BAR   */}
          {/* ========================================== */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-widest shadow-md mb-2">
                <GIcon name="sparkle" className="w-3.5 h-3.5 fill-current" />
                ARCADE ARENA ACTIVE
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                CHOOSE YOUR CHALLENGE
              </h2>
              <p className="text-sm sm:text-base text-blue-200/80 max-w-xl font-medium mt-2 leading-relaxed">
                Mainkan game favoritmu, kumpulkan skor, dan buktikan kemampuan Bahasa Inggris kamu! Klik atau hover card untuk melihat detail quest.
              </p>
            </div>

            {/* SEARCH & CATEGORY FILTER */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Box */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari game..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-48 bg-slate-900/90 border border-blue-800/80 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs text-white placeholder-blue-300/50 outline-none transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-blue-300 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Tag Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      SoundEngine.tick();
                      setActiveFilter(tag);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-black tracking-wider transition-all whitespace-nowrap ${
                      activeFilter === tag
                        ? 'bg-amber-400 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                        : 'bg-blue-950/60 text-blue-200/80 hover:bg-blue-900/80 border border-blue-800/50'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================== */}
          {/* SPOTLIGHT HERO ARENA (FEATURED GAME)       */}
          {/* ========================================== */}
          {activeGame && (
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border-2 border-amber-400/60 p-7 sm:p-10 lg:p-14 shadow-[0_0_40px_rgba(30,58,138,0.35)] transition-all duration-500">
              
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400" />
              
              {/* Background Glow */}
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                
                {/* Left Info Column */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg bg-amber-400 text-slate-950 shadow-sm">
                      FEATURED QUEST
                    </span>
                    <span className="text-xs font-bold text-blue-300 bg-blue-950/80 px-3 py-1 rounded-lg border border-blue-800">
                      CATEGORY: {activeGame.tag || 'ARCADE'}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-black text-white leading-snug">
                    {activeGame.title}
                  </h3>

                  <p className="text-sm sm:text-base text-blue-100/80 leading-relaxed max-w-2xl font-medium">
                    {activeGame.desc}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => handlePlayGame(activeGame.id)}
                      className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-sm rounded-xl border-b-4 border-amber-700 shadow-[0_6px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.5)] active:translate-y-0.5 active:border-b-2 transition-all flex items-center gap-2 group cursor-pointer"
                    >
                      <span>START QUEST NOW</span>
                      <GIcon name="forward" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <span className="text-xs text-blue-300/70 font-bold italic">
                      Klik atau pilih card di bawah untuk mengganti stage!
                    </span>
                  </div>
                </div>

                {/* Right Hero Icon Showcase */}
                <div className="lg:col-span-4 flex items-center justify-center">
                  <div className="relative group cursor-pointer" onClick={() => handlePlayGame(activeGame.id)}>
                    <div className="absolute inset-0 bg-amber-400/20 rounded-3xl blur-xl group-hover:bg-amber-400/40 transition-all duration-300" />
                    <div className={`w-28 h-28 sm:w-36 sm:h-36 rounded-3xl ${activeGame.accent || 'bg-amber-500'} border-4 border-amber-300/80 flex items-center justify-center text-white shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-300`}>
                      <GIcon name={activeGame.icon} className="w-14 h-14 sm:w-20 sm:h-20 drop-shadow-md" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* QUEST SELECTION DECK / GRID                */}
          {/* ========================================== */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black tracking-widest text-blue-300 uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                SELECTABLE QUEST DECK ({filteredGames.length})
              </h3>
            </div>

            {filteredGames.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-blue-900/50">
                <p className="text-sm text-blue-300">Tidak ada game yang sesuai dengan kriteria pencarian.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredGames.map((g) => {
                  const isSelected = g.id === selectedGameId;

                  return (
                    <div
                      key={g.id}
                      onMouseEnter={() => handleGameHover(g.id)}
                      onClick={() => handlePlayGame(g.id)}
                      className={`group relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-300 flex flex-col justify-between border-2 min-h-[230px] ${
                        isSelected
                          ? 'bg-gradient-to-b from-blue-900/90 to-slate-900 border-amber-400 shadow-[0_10px_25px_rgba(245,158,11,0.2)] -translate-y-1'
                          : 'bg-slate-900/70 hover:bg-slate-900/90 border-blue-800/60 hover:border-blue-500 hover:-translate-y-0.5'
                      }`}
                    >
                      {/* Active Indicator Pin */}
                      {isSelected && (
                        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                          <div className="bg-amber-400 text-slate-950 font-black text-[9px] text-center py-0.5 rotate-45 translate-x-3 translate-y-2 shadow-md">
                            ACTIVE
                          </div>
                        </div>
                      )}

                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span
                            className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${
                              isSelected
                                ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                                : 'bg-white/10 text-white/80 border-white/10'
                            }`}
                          >
                            {g.tag}
                          </span>

                          <div
                            className={`w-10 h-10 rounded-xl ${g.accent} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            <GIcon name={g.icon} className="w-5 h-5" />
                          </div>
                        </div>

                        <h4
                          className={`text-lg font-bold mb-1.5 transition-colors ${
                            isSelected ? 'text-amber-300' : 'text-white group-hover:text-blue-200'
                          }`}
                        >
                          {g.title}
                        </h4>

                        <p className="text-xs text-blue-200/70 line-clamp-2 leading-relaxed">
                          {g.desc}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold">
                        <span className={isSelected ? 'text-amber-400' : 'text-blue-300/70 group-hover:text-white'}>
                          {isSelected ? 'READY TO PLAY' : 'SELECT QUEST'}
                        </span>
                        <GIcon
                          name="forward"
                          className={`w-4 h-4 transition-transform ${
                            isSelected ? 'text-amber-400 translate-x-1' : 'text-blue-400 group-hover:translate-x-1'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </main>

        <footer className="mt-14 pt-8 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-300/50">
          <span className="font-bold tracking-wide">ENGLISH CLUB STAND CHALLENGE</span>
          <span className="font-medium">Kumpulkan skor, kejar streak, buktikan kemampuan Bahasa Inggris kamu!</span>
        </footer>
      </div>
    </div>
  );
}