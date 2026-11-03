import { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import SoundEngine from './sound';
import { IMPOSTOR_DATA } from './data';
import { GameCountdown, ResultActions } from './GameUI';
import { shuffleArray, shuffleOptions } from './utils';
import { GIcon } from './icons';

export default function FindImpostorGame({ onHome, onGames }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [gameState, setGameState] = useState('COUNTDOWN');
  const [session, setSession] = useState(0);
  const timerRef = useRef(null);
  const mountedRef = useRef(true);
  const idxRef = useRef(0);
  const endedRef = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const order = useMemo(() => shuffleArray(IMPOSTOR_DATA.map((_, i) => i)), [session]);
  const currentQ = useMemo(
    () => IMPOSTOR_DATA[order[currentIdx]] || IMPOSTOR_DATA[order[0]],
    [order, currentIdx]
  );
  const question = useMemo(
    () => shuffleOptions(currentQ.options, currentQ.impostor),
    [currentQ.options, currentQ.impostor]
  );

  const advance = (wasCorrect) => {
    if (endedRef.current) return;
    const idx = idxRef.current;
    if (wasCorrect) {
      SoundEngine.correct();
      setScore((prev) => prev + 100);
      setCorrectCount((prev) => prev + 1);
    } else {
      SoundEngine.wrong();
    }
    if (idx + 1 < IMPOSTOR_DATA.length) {
      idxRef.current = idx + 1;
      setCurrentIdx(idx + 1);
      setTimeLeft(5);
    } else {
      endedRef.current = true;
      setGameState('END');
      SoundEngine.fanfare();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleAnswer = (idx) => advance(idx === question.correctIdx);

  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIdx, gameState]);

  useEffect(() => {
    if (gameState !== 'PLAYING' || timeLeft !== 0) return;
    const t = setTimeout(() => advance(false), 80);
    return () => clearTimeout(t);
  }, [gameState, timeLeft, currentIdx]);

  const reset = () => {
    idxRef.current = 0;
    endedRef.current = false;
    setCurrentIdx(0);
    setScore(0);
    setCorrectCount(0);
    setGameState('COUNTDOWN');
    setTimeLeft(5);
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

  if (gameState === 'END') {
    return (
      <div className="glass-card rounded-3xl p-6 sm:p-8 text-center space-y-6 max-w-md mx-auto border-2 border-emerald-400/50">
        <div className="text-5xl text-emerald-400 mx-auto">
          <GIcon name="magnifier" className="w-14 h-14" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-emerald-400">IMPOSTOR CAUGHT!</h2>
        <div className="text-5xl font-black text-white">{score} PTS</div>
        <p className="text-sm text-blue-200/80">Temukan impostor: {correctCount} of {IMPOSTOR_DATA.length}</p>
        <ResultActions onRetry={reset} onGames={onGames} onHome={onHome} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-md mx-auto w-full">
      <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-2xl">
        <span className="text-xs font-bold text-emerald-400 uppercase">Find The Impostor!</span>
        <div className={`text-xl font-black ${timeLeft <= 2 ? 'text-ec-red animate-ping' : 'text-ec-red animate-pulse'}`}>
          {timeLeft}s
          <GIcon name="clock" className="w-4 h-4 ml-1" />
        </div>
        <span className="text-xs font-bold text-white">Score: {score}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {question.shuffledOptions.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className="min-h-[7rem] sm:h-32 py-3 bg-white/10 hover:bg-emerald-500/80 active:bg-emerald-500/80 active:scale-95 hover:scale-105 border-2 border-white/20 hover:border-emerald-300 rounded-2xl flex items-center justify-center text-lg sm:text-xl font-black text-white transition-all btn-action p-2 text-center"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}