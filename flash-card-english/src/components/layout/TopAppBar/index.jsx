import { useLocation, useNavigate } from 'react-router-dom';
import { useStats } from '../../../hooks/useStats';

export default function TopAppBar({ title, showBack = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { stats } = useStats();

  // Determine dynamic title if not explicitly provided
  let pageTitle = title;
  if (!pageTitle) {
    if (location.pathname === '/') pageTitle = 'Academic Dashboard';
    else if (location.pathname.startsWith('/setup')) pageTitle = 'Session Configuration';
    else if (location.pathname.startsWith('/session/flashcard')) pageTitle = 'Flashcard Module';
    else if (location.pathname.startsWith('/session/quiz')) pageTitle = 'Quiz Module';
    else if (location.pathname.startsWith('/session/complete')) pageTitle = 'Session Summary';
    else pageTitle = 'The Atelier';
  }

  // Level logic (placeholder based on mastered words)
  const level = Math.max(1, Math.floor(stats.masteredWords / 50) + 1);

  return (
    <header className="h-16 flex items-center justify-between px-6 md:px-8 bg-surface-container-lowest sticky top-0 z-20 flex-shrink-0">
      {/* Mobile left side: Menu/Back */}
      <div className="flex md:hidden items-center gap-4">
        {showBack || location.pathname !== '/' ? (
          <button
            onClick={() => navigate(-1)}
            className="text-primary-container p-2 rounded-full hover:bg-surface-container-high/50"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        ) : (
          <span className="font-headline font-extrabold text-xl text-primary-container tracking-tight">
            The Atelier
          </span>
        )}
      </div>

      {/* Desktop left side: Title + Level badge */}
      <div className="hidden md:flex items-center gap-4">
        <h1 className="font-headline font-extrabold text-xl text-primary-container">
          {pageTitle}
        </h1>
        <span className="bg-surface-container-high px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant flex items-center gap-1">
          Lvl {level} <span className="hidden lg:inline">Scholastic</span>
        </span>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Desktop-only notifications */}
        <div className="hidden md:block relative group">
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary-container">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full"></span>
        </div>
        
        <div className="hidden md:block h-8 w-[1px] bg-outline-variant/30"></div>
        
        {/* Mobile-only avatar */}
        <div className="md:hidden w-8 h-8 flex items-center justify-center bg-surface-container-highest rounded-full text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px]">person</span>
        </div>

        {/* Global Streak indicator */}
        <div className="hidden md:flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          <span className="font-headline font-extrabold text-lg">{stats.streak} Day Streak</span>
        </div>
      </div>
    </header>
  );
}
