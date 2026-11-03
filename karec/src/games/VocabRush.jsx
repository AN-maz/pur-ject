import { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import SoundEngine from './sound';
import { VOCAB_DATA } from './data';
import { GameCountdown, ResultActions } from './GameUI';
import { shuffleArray, shuffleOptions } from './utils';
import { GIcon } from './icons';

function getRank(sc) {
  if (sc < 400) return { title: 'Beginner', icon: 'flame', color: 'text-blue-300' };
  if (sc < 800) return { title: 'Learner', icon: 'clock', color: 'text-blue-400' };
  if (sc < 1300) return { title: 'Explorer', icon: 'magnifier', color: 'text-emerald-400' };
  if (sc < 1800) return { title: 'Fluent', icon: 'bolt', color: 'text-ec-gold' };
  if (sc < 2500) return { title: 'Vocab Master', icon: 'trophy', color: 'text-amber-400' };
  return { title: 'English God', icon: 'crown', color: 'text-yellow-300 animate-pulse' };
}

export default function VocabRushGame({ onHome, onGames }) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState('COUNTDOWN');
  const [feedback, setFeedback] = useState(null);
  const [session, setSession] = useState(0);
  const timerRef = useRef(null);
  const mountedRef = useRef(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const order = useMemo(() => shuffleArray(VOCAB_DATA.map((_, i) => i)), [session]);
  const question = useMemo(() => {
    const q = VOCAB_DATA[order[currentIndex % order.length]];
    const s = shuffleOptions(q.options, q.correct);
    return { currentQ: q, shuffledOptions: s.shuffledOptions, correctIdx: s.correctIdx };
  }, [currentIndex, order]);

  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'PLAYING' || timeLeft !== 0) return;
    const t = setTimeout(() => {
      setGameState('END');
      SoundEngine.fanfare();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }, 80);
    return () => clearTimeout(t);
  }, [gameState, timeLeft]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleAnswer = (optionIdx) => {
    if (!mountedRef.current) return;
    if (optionIdx === question.correctIdx) {
      SoundEngine.correct();
      const ns = streak + 1;
      setStreak(ns);
      if (ns > bestStreak) setBestStreak(ns);
      setScore((prev) => prev + 100 + ns * 10);
      setCorrectCount((prev) => prev + 1);
      setFeedback('CORRECT');
    } else {
      SoundEngine.wrong();
      setStreak(0);
      setTimeLeft((prev) => Math.max(0, prev - 2));
      setWrongCount((prev) => prev + 1);
      setFeedback('WRONG');
    }

    setTimeout(() => {
      if (mountedRef.current) setFeedback(null);
    }, 200);
    setTimeout(() => {
      if (mountedRef.current) setCurrentIndex((p) => p + 1);
    }, 200);
  };

  const reset = () => {
    setGameState('COUNTDOWN');
    setTimeLeft(30);
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setWrongCount(0);
    setCurrentIndex(0);
    setFeedback(null);
    setSession((s) => s + 1);
  };

  const rank = getRank(score);

  if (gameState === 'COUNTDOWN') {
    return <GameCountdown onComplete={() => setGameState('PLAYING')} />;
  }

  if (gameState === 'END') {
    return (
      <div className="glass-card rounded-3xl p-6 md:p-8 text-center space-y-6 max-w-md mx-auto animate-fade-in border-2 border-amber-400/40">
        <div>
          <div className="text-5xl text-amber-400 mx-auto">
            <GIcon name={rank.icon} className="w-14 h-14" />
          </div>
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-amber-400 mt-2">Result Screen</h2>
          <h1 className={`text-3xl font-black ${rank.color}`}>{rank.title}</h1>
          <p className="text-xs text-blue-200/80 italic mt-1">"Your English is cooking"</p>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-3">
          <div className="text-4xl font-black text-amber-300">{score.toLocaleString()} PTS</div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs border-t border-white/10 pt-3">
            <div>
              <div className="text-emerald-400 font-bold text-lg">{correctCount}</div>
              <div className="text-white/60">Correct</div>
            </div>
            <div>
              <div className="text-ec-red font-bold text-lg">{wrongCount}</div>
              <div className="text-white/60">Wrong</div>
            </div>
            <div>
              <div className="text-amber-400 font-bold text-lg">{bestStreak}</div>
              <div className="text-white/60">Best Streak</div>
            </div>
          </div>
        </div>

        <ResultActions onRetry={reset} onGames={onGames} onHome={onHome} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-md mx-auto w-full">
      <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-2xl">
        <div className="text-center">
          <div className="text-xs text-blue-200/60 font-semibold">TIME</div>
          <div className={`text-2xl font-black ${timeLeft <= 5 ? 'text-ec-red animate-ping' : 'text-amber-400'}`}>
            {timeLeft}s
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-blue-200/60 font-semibold">SCORE</div>
          <div className="text-2xl font-black text-white">{score}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-blue-200/60 font-semibold">STREAK</div>
          <div className="text-2xl font-black text-amber-400 flex items-center justify-center gap-1">
            <GIcon name="flame" className="w-5 h-5" />
            {streak}
          </div>
        </div>
      </div>

      <div className={`glass-card rounded-3xl p-5 sm:p-8 text-center space-y-6 relative overflow-hidden transition ${feedback === 'WRONG' ? 'animate-shake border-ec-red' : ''}`}>
        {feedback === 'CORRECT' && (
          <div className="absolute top-2 right-4 text-emerald-400 font-bold text-xs animate-bounce">+100</div>
        )}
        {feedback === 'WRONG' && (
          <div className="absolute top-2 right-4 text-ec-red font-bold text-xs">-2s</div>
        )}

        <div>
          <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Select Synonym / Meaning</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-ec-gold tracking-wider mt-1">{question.currentQ.word}</h2>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {question.shuffledOptions.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="w-full min-h-[48px] py-3.5 px-4 bg-white/10 hover:bg-amber-400 active:bg-amber-400 hover:text-ec-navy active:text-ec-navy text-left font-bold rounded-xl transition-all border border-white/10 flex items-center justify-between group btn-action"
            >
              <span>
                <strong className="text-amber-400 group-hover:text-ec-navy mr-2">{String.fromCharCode(65 + i)}.</strong> {opt}
              </span>
              <GIcon name="forward" className="w-4 h-4 opacity-0 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}