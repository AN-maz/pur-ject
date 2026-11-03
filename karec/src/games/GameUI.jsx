import { useEffect, useState } from 'react';
import { GIcon } from './icons';

export function GameCountdown({ onComplete }) {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((current) => {
        if (current <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center text-center animate-fade-in">
      <p className="text-sm font-black uppercase tracking-[0.35em] text-blue-200/70">Get Ready</p>
      <div className="mt-4 text-8xl font-black text-ec-gold animate-pulse">{count}</div>
      <p className="mt-3 text-sm font-bold text-white/70">Quest starts in...</p>
    </div>
  );
}

export function ResultActions({ onRetry, retryLabel = 'Play Again', onGames, onHome, homeLabel = 'Enter The Banquet' }) {
  return (
    <div className="flex flex-col gap-3 items-stretch w-full">
      {onHome && (
        <button
          onClick={onHome}
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-ec-gold text-ec-navy font-black text-sm rounded-2xl border-b-[5px] border-amber-600 transition-all hover:bg-amber-400 active:border-b-0 active:translate-y-[5px] btn-action shadow-lg shadow-black/30"
        >
          <GIcon name="rocket" className="w-4 h-4" />
          {homeLabel}
        </button>
      )}
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-3 bg-ec-red text-white font-black text-sm rounded-2xl border-b-[5px] border-ec-iron transition-all active:border-b-0 active:translate-y-[5px] btn-action"
        >
          <GIcon name="bolt" className="w-4 h-4" />
          {retryLabel}
        </button>
        <button
          onClick={onGames}
          className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl transition btn-action"
        >
          <GIcon name="puzzle" className="w-4 h-4" />
          All Quests
        </button>
      </div>
    </div>
  );
}