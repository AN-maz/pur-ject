import { Link, useLocation } from 'react-router-dom';

export default function DesktopSidebar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/setup') {
      return ['/setup', '/session/flashcard', '/session/quiz'].includes(location.pathname);
    }
    return location.pathname === path;
  };

  return (
    <aside className="hidden md:flex flex-col w-72 bg-primary-container text-on-primary shadow-xl z-30 flex-shrink-0">
      <div className="px-8 h-16 flex items-center mb-8 mt-4">
        <span className="font-headline font-extrabold text-2xl tracking-tight text-white">The Atelier</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        <Link 
          to="/"
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive('/') 
              ? 'bg-on-primary-fixed-variant text-white' 
              : 'text-on-primary-container hover:bg-white/10 group'
          }`}
        >
          <span className="material-symbols-outlined" style={isActive('/') ? {fontVariationSettings: "'FILL' 1"} : {}}>dashboard</span>
          <span className="font-label font-bold">Dashboard</span>
        </Link>
        
        <Link 
          to="/setup"
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive('/setup') 
              ? 'bg-on-primary-fixed-variant text-white' 
              : 'text-on-primary-container hover:bg-white/10 group'
          }`}
        >
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">auto_stories</span>
          <span className="font-label">Library</span>
        </Link>
        
        <button className="w-full flex items-center gap-4 px-4 py-3 text-on-primary-container hover:bg-white/10 rounded-xl transition-all duration-200 group">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">bar_chart</span>
          <span className="font-label">Analytics</span>
        </button>

        <div className="pt-8 pb-4 px-4">
          <span className="text-[10px] uppercase tracking-widest text-on-primary-container opacity-50 font-bold">Study Modules</span>
        </div>
        
        <button className="w-full flex items-center gap-4 px-4 py-3 text-on-primary-container hover:bg-white/10 rounded-xl transition-all duration-200 group">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">school</span>
          <span className="font-label">Exam Prep</span>
        </button>
        
        <button className="w-full flex items-center gap-4 px-4 py-3 text-on-primary-container hover:bg-white/10 rounded-xl transition-all duration-200 group">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">psychology</span>
          <span className="font-label">Cognitive Drills</span>
        </button>
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-on-primary-fixed-variant/40 rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden flex items-center justify-center text-white">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">Julian Voss</p>
              <p className="text-on-primary-container text-xs">Ph.D Candidate</p>
            </div>
          </div>
          <button className="w-full py-2 bg-secondary text-white text-xs font-bold rounded-full uppercase tracking-wider hover:opacity-90 transition-opacity">
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
  );
}
