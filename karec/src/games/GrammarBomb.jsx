import { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import SoundEngine from './sound';
import { GRAMMAR_DATA } from './data';
import { GameCountdown, ResultActions } from './GameUI';
import { shuffleArray, shuffleOptions } from './utils';
import { GIcon } from './icons';

export default function GrammarBombGame({ onHome, onGames }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(8);
  const [gameState, setGameState] = useState('COUNTDOWN');
  const [session, setSession] = useState(0);
  const timerRef = useRef(null);
  const mountedRef = useRef(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const order = useMemo(() => shuffleArray(GRAMMAR_DATA.map((_, i) => i)), [session]);
  const currentQ = useMemo(() => GRAMMAR_DATA[order[currentIdx]], [order, currentIdx]);
  const question = useMemo(
    () => shuffleOptions(currentQ.options, currentQ.correct),
    [currentQ.options, currentQ.correct]
  );

  const explodeBomb = () => {
    SoundEngine.explode();
    setGameState('EXPLODED');
  };

  const handleAnswer = (idx) => {
    if (idx === question.correctIdx) {
      SoundEngine.correct();
      setScore((prev) => prev + 100);
      if (currentIdx + 1 < GRAMMAR_DATA.length) {
        setCurrentIdx((prev) => prev + 1);
        setTimeLeft(Math.max(3, 8 - currentIdx * 1));
      } else {
        setGameState('DEFUSED');
        SoundEngine.fanfare();
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      explodeBomb();
    }
  };

  const timeRef = useRef(timeLeft);
  useEffect(() => {
    timeRef.current = timeLeft;
  });
  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    timerRef.current = setInterval(() => {
      if (timeRef.current > 1) SoundEngine.bombTick();
      setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIdx, gameState]);

  useEffect(() => {
    if (gameState !== 'PLAYING' || timeLeft !== 0) return;
    const t = setTimeout(() => explodeBomb(), 80);
    return () => clearTimeout(t);
  }, [gameState, timeLeft, currentIdx]);

  const reset = () => {
    setCurrentIdx(0);
    setScore(0);
    setGameState('COUNTDOWN');
    setTimeLeft(8);
    setSession((s) => s + 1);
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (gameState === 'COUNTDOWN') {
    return <GameCountdown onComplete={() => setGameState('PLAYING')} />;
  }

  if (gameState === 'EXPLODED') {
    return (
      <div className="glass-card rounded-3xl p-8 text-center space-y-6 max-w-md mx-auto border-2 border-ec-red animate-shake">
        <div className="text-6xl text-ec-red mx-auto">
          <GIcon name="bomb" className="w-16 h-16" />
        </div>
        <h2 className="text-3xl font-black text-ec-red">BOMB EXPLODED!</h2>
        <p className="text-sm text-blue-200/80">Oops! Grammar kamu belum tepat untuk menjinakkan bom.</p>
        <div className="text-3xl font-black text-ec-gold">{score} PTS</div>
        <ResultActions onRetry={reset} retryLabel="Try Again" onGames={onGames} onHome={onHome} />
      </div>
    );
  }

  if (gameState === 'DEFUSED') {
    return (
      <div className="glass-card rounded-3xl p-8 text-center space-y-6 max-w-md mx-auto border-2 border-emerald-400">
        <div className="text-6xl text-emerald-400 mx-auto">
          <GIcon name="sparkle" className="w-16 h-16" />
        </div>
        <h2 className="text-3xl font-black text-emerald-400">ALL BOMBS DEFUSED!</h2>
        <div className="text-4xl font-black text-ec-gold">{score} PTS</div>
        <ResultActions onRetry={reset} onGames={onGames} onHome={onHome} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-md mx-auto w-full">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-ec-red/30 border border-ec-red/50 rounded-full text-red-400 font-black text-sm animate-pulse">
          <GIcon name="bomb" className="w-4 h-4" />
          DEFUSE THE BOMB IN {timeLeft}s
        </div>
      </div>

      <div className="glass-card rounded-3xl p-5 sm:p-8 text-center space-y-6 border-2 border-ec-red/40">
        <h3 className="text-base sm:text-lg font-bold text-white">Choose the correct sentence!</h3>

        <div className="space-y-3">
          {question.shuffledOptions.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="w-full min-h-[52px] py-4 px-4 sm:px-5 bg-white/10 hover:bg-ec-red active:bg-ec-red active:scale-[0.98] text-left font-bold text-sm sm:text-base rounded-2xl transition border border-white/20 flex items-center justify-between group btn-action"
            >
              <span>{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}