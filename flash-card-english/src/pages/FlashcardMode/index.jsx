import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSession } from '../../hooks/useSession';

export default function FlashcardMode() {
  const [searchParams] = useSearchParams();
  const wordCount = parseInt(searchParams.get('count')) || 20;
  const navigate = useNavigate();

  const {
    currentWord,
    queueLength,
    totalWords,
    completedCount,
    markCorrect,
    markIncorrect,
    isSessionComplete,
    isLoading,
    sessionStats,
  } = useSession({ wordCount, mode: 'flashcard' });

  const [isFlipped, setIsFlipped] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcut
  const handleKeyDown = useCallback((e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      setIsFlipped(f => !f);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Navigate to complete page when session ends
  useEffect(() => {
    if (isSessionComplete) {
      navigate('/session/complete', {
        state: sessionStats
      });
    }
  }, [isSessionComplete, navigate, sessionStats]);

  const handleCorrect = async () => {
    setIsFlipped(false);
    await markCorrect();
  };

  const handleIncorrect = () => {
    setIsFlipped(false);
    markIncorrect();
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-on-primary-container/30 animate-pulse">auto_stories</span>
          <p className="mt-4 text-on-surface-variant font-[var(--font-family-headline)] font-bold">
            Preparing your session...
          </p>
        </div>
      </div>
    );
  }

  if (!currentWord) return null;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Progress Section */}
      <div className="w-full mb-12">
        <div className="flex justify-between items-end mb-3">
          <div className="flex flex-col">
            <span className="font-[var(--font-family-label)] text-xs font-medium text-on-surface-variant/70 uppercase tracking-widest">
              Current Session
            </span>
            <h2 className="font-[var(--font-family-headline)] text-3xl font-extrabold text-primary-container">
              {completedCount + 1}
              <span className="text-on-primary-container/40">/{totalWords}</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant font-medium text-sm">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              timer
            </span>
            <span>{formatTime(elapsedSeconds)}</span>
          </div>
        </div>
        <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary rounded-full transition-all duration-500"
            style={{ width: `${((completedCount) / totalWords) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="w-full max-w-4xl aspect-square md:aspect-[16/9] perspective-1000 cursor-pointer" onClick={() => setIsFlipped(f => !f)}>
        <div className={`relative w-full h-full preserve-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front of card */}
            <div className="absolute inset-0 w-full h-full bg-surface-container-lowest rounded-[2rem] shadow-[0_20px_40px_rgba(0,20,82,0.06)] p-8 md:p-12 flex flex-col items-center justify-center text-center backface-hidden ring-1 ring-outline-variant/5">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-9xl">auto_stories</span>
              </div>
              <span className="inline-block px-4 py-1.5 bg-secondary-fixed text-secondary font-label text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-6 relative z-10">
                {currentWord.type}
              </span>
              <h3 className="font-headline text-5xl md:text-7xl font-extrabold text-on-primary-fixed tracking-tight relative z-10">
                {currentWord.word}
              </h3>
              
              <div className="absolute bottom-8 flex items-center gap-2 text-outline-variant transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-sm">sync</span>
                <span className="text-xs font-label font-bold tracking-widest uppercase">Tap to flip card</span>
                <div className="ml-2 px-2 py-0.5 bg-surface-container border border-outline-variant/20 rounded text-[9px] font-bold hidden md:block">SPACE</div>
              </div>
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 w-full h-full bg-surface-container-lowest rounded-[2rem] shadow-[0_20px_40px_rgba(0,20,82,0.06)] p-8 md:p-12 flex flex-col backface-hidden rotate-y-180 overflow-hidden ring-1 ring-outline-variant/5">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-9xl">menu_book</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <span className="inline-block px-4 py-1.5 bg-secondary-fixed text-secondary font-label text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-6 relative z-10">
                  {currentWord.type}
                </span>
                <h3 className="font-headline text-4xl md:text-5xl font-extrabold text-on-primary-fixed mb-4 relative z-10">
                  {currentWord.word}
                </h3>
                <p className="font-body text-outline text-xl md:text-2xl italic relative z-10">
                  "{currentWord.meaning}"
                </p>

                {/* Verb Forms (conditional) */}
                {currentWord.type === 'Verb' && currentWord.forms && (
                  <div className="w-full mt-10 md:mt-12 px-2 md:px-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 relative z-10">
                    {[
                      { label: 'V1', value: currentWord.forms.v1 },
                      { label: 'V2', value: currentWord.forms.v2 },
                      { label: 'V3', value: currentWord.forms.v3 },
                      { label: 'V-ing', value: currentWord.forms.v_ing },
                    ].map((form) => (
                      <div key={form.label} className="bg-surface-container-low p-4 rounded-xl text-center">
                        <p className="text-[10px] font-label font-bold text-outline tracking-widest uppercase mb-1 md:mb-2">
                          {form.label}
                        </p>
                        <p className="font-headline font-bold text-base md:text-xl text-on-surface">
                          {form.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="absolute bottom-8 left-0 w-full flex justify-center items-center gap-2 text-outline-variant transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-sm">sync</span>
                <span className="text-xs font-label font-bold tracking-widest uppercase">Tap to flip card</span>
              </div>
            </div>
        </div>
      </div>

      {/* Evaluation Controls */}
      <div className="w-full max-w-2xl mt-12 flex flex-col items-center gap-6 pb-8">
        <div className="flex items-center gap-4 bg-surface-container-low p-3 rounded-full w-full justify-center">
          <button
            onClick={handleIncorrect}
            className="flex-1 py-5 px-8 rounded-full bg-surface-container-lowest text-error font-headline font-bold text-sm flex items-center justify-center gap-3 hover:bg-error-container transition-all"
          >
            <span className="material-symbols-outlined">close</span>
            INCORRECT / AGAIN
          </button>
          <button
            onClick={handleCorrect}
            className="flex-1 py-5 px-10 rounded-full bg-gradient-to-br from-primary-container to-on-primary-fixed-variant text-white font-headline font-bold text-sm flex items-center justify-center gap-3 shadow-lg shadow-primary-container/20 hover:scale-105 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            CORRECT / EASY
          </button>
        </div>
        <button className="flex items-center gap-2 text-on-surface-variant/60 font-label text-xs hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined text-sm">refresh</span>
          Tap spacebar to flip card
        </button>
      </div>
    </div>
  );
}
