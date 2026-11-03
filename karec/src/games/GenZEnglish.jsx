import { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import SoundEngine from './sound';
import { GENZ_DATA } from './data';
import { GameCountdown, ResultActions } from './GameUI';
import { shuffleArray, shuffleOptions } from './utils';
import { GIcon } from './icons';

export default function GenZEnglishGame({ onHome, onGames }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameState, setGameState] = useState('COUNTDOWN');
  const [session, setSession] = useState(0);
  const mountedRef = useRef(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const order = useMemo(() => shuffleArray(GENZ_DATA.map((_, i) => i)), [session]);
  const currentQ = useMemo(() => GENZ_DATA[order[currentIdx]], [order, currentIdx]);
  const question = useMemo(
    () => shuffleOptions(currentQ.options, currentQ.correct),
    [currentQ.options, currentQ.correct]
  );

  const handleAnswer = (optionIdx) => {
    if (optionIdx === question.correctIdx) {
      SoundEngine.correct();
      setScore((prev) => prev + 150);
      setCorrectCount((prev) => prev + 1);
    } else {
      SoundEngine.wrong();
    }

    if (currentIdx + 1 < GENZ_DATA.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setGameState('END');
      SoundEngine.fanfare();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const reset = () => {
    setCurrentIdx(0);
    setScore(0);
    setCorrectCount(0);
    setGameState('COUNTDOWN');
    setSession((s) => s + 1);
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  if (gameState === 'COUNTDOWN') {
    return <GameCountdown onComplete={() => setGameState('PLAYING')} />;
  }

  if (gameState === 'END') {
    const auraPct = Math.min(99, Math.round((score / (GENZ_DATA.length * 150)) * 100));
    return (
      <div className="glass-card rounded-3xl p-6 text-center space-y-6 max-w-md mx-auto border-2 border-ec-red/50">
        <div className="text-5xl text-ec-red mx-auto">
          <GIcon name="sparkle" className="w-14 h-14" />
        </div>
        <span className="text-xs font-black bg-ec-red px-3 py-1 rounded-full uppercase tracking-widest text-white">
          Slang Score Card
        </span>
        <h2 className="text-2xl font-black text-white mt-3">GEN Z ENGLISH SCORE</h2>

        <div className="bg-gradient-to-b from-ec-navy to-ec-blue p-6 rounded-2xl border border-ec-gold/30 space-y-4">
          <div className="text-5xl font-black text-ec-gold">
            Aura: {auraPct}%
          </div>

          <div className="h-2.5 rounded-full bg-ec-blue overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 via-ec-gold to-yellow-500 transition-all duration-1000" style={{ width: `${auraPct}%` }} />
          </div>

          <p className="text-sm font-extrabold text-amber-300">
            {auraPct > 70 ? 'Certified Gen Z English Speaker' : 'Boomer Energy Detected'}
          </p>

          <div className="text-left text-xs space-y-2 border-t border-white/10 pt-3">
            <div className="flex justify-between">
              <span>Slang Knowledge:</span>
              <span className="text-emerald-400 font-bold">{correctCount} / {GENZ_DATA.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Gen Z Vibe:</span>
              <span className="text-ec-gold font-bold">{auraPct}%</span>
            </div>
            <div className="flex justify-between font-bold text-amber-400">
              <span>Aura Level:</span>
              <span>+{auraPct * 100} PTS</span>
            </div>
          </div>
        </div>

        <ResultActions onRetry={reset} retryLabel="Retake Quiz" onGames={onGames} onHome={onHome} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-md mx-auto w-full">
      <div className="text-center">
        <span className="text-xs font-black bg-ec-red/30 text-ec-gold border border-ec-red/30 px-3 py-1 rounded-full">
          QUESTION {currentIdx + 1} OF {GENZ_DATA.length}
        </span>
      </div>

      <div className="glass-card rounded-3xl p-5 sm:p-8 text-center space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-ec-gold">"{currentQ.phrase}"</h2>
          <p className="text-sm text-blue-200/80 mt-1">{currentQ.question}</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {question.shuffledOptions.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="w-full min-h-[48px] py-3.5 px-4 bg-white/10 hover:bg-ec-red active:bg-ec-red text-left font-bold rounded-xl transition border border-white/10 flex items-center justify-between group btn-action"
            >
              <span>
                <strong className="text-ec-red group-hover:text-white mr-2">{String.fromCharCode(65 + i)}.</strong> {opt}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}