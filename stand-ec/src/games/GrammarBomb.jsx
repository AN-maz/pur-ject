import React, { useEffect, useCallback, useMemo, useRef, useState } from "react";
import { GRAMMAR_DATA } from "../data/questions";
import { SoundEngine } from "../lib/sound";
import { shuffleArray, shuffleOptions } from "../utils/shuffleArray";

export default React.memo(function GrammarBomb({ onConfetti, onHome, onPhotobooth }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(8);
  const [gameState, setGameState] = useState("PLAYING");
  const [session, setSession] = useState(0);
  const timerRef = useRef(null);
  const mountedRef = useRef(true);

  // Urutan soal diacak tiap sesi main
  // session = pemicu acak ulang tiap sesi main
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const order = useMemo(() => shuffleArray(GRAMMAR_DATA.map((_, i) => i)), [session]);
  const currentQ = useMemo(() => GRAMMAR_DATA[order[currentIdx]], [order, currentIdx]);
  const { shuffledOptions, correctIdx } = useMemo(() => shuffleOptions(currentQ.options, currentQ.correct), [currentQ.options, currentQ.correct]);

  const explodeBomb = useCallback(() => { SoundEngine.explode(); setGameState("EXPLODED"); }, []);

  const handleAnswer = useCallback((idx) => {
    if (idx === correctIdx) {
      SoundEngine.correct();
      setScore((p) => p + 100);
      if (currentIdx + 1 < GRAMMAR_DATA.length) { setCurrentIdx((p) => p + 1); setTimeLeft(Math.max(3, 8 - currentIdx * 1)); }
      else { setGameState("DEFUSED"); SoundEngine.fanfare(); onConfetti?.(); }
    } else { explodeBomb(); }
  }, [correctIdx, currentIdx, explodeBomb, onConfetti]);

  // Ticker MURNI — tanpa side effect di dalam updater (updater boleh dipanggil >1x oleh React)
  const timeRef = useRef(timeLeft);
  useEffect(() => { timeRef.current = timeLeft; });
  useEffect(() => {
    if (gameState !== "PLAYING") return;
    timerRef.current = setInterval(() => {
      if (timeRef.current > 1) SoundEngine.bombTick();
      setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIdx, gameState]);

  // Waktu habis dieksekusi TEPAT SEKALI (cleanup membatalkan jadwal basi)
  useEffect(() => {
    if (gameState !== "PLAYING" || timeLeft !== 0) return;
    const t = setTimeout(() => explodeBomb(), 80);
    return () => clearTimeout(t);
  }, [gameState, timeLeft, currentIdx, explodeBomb]);

  const reset = useCallback(() => { setCurrentIdx(0); setScore(0); setGameState("PLAYING"); setTimeLeft(8); setSession((s) => s + 1); }, []);

  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  if (gameState === "EXPLODED") {
    return (
      <div className="glass-card rounded-3xl p-8 text-center space-y-6 max-w-md mx-auto border-2 border-ec-red animate-shake">
        <div className="text-6xl">💥</div>
        <h2 className="text-3xl font-black text-ec-red">BOMB EXPLODED!</h2>
        <p className="text-sm text-blue-200/80">Oops! Grammar kamu belum tepat untuk menjinakkan bom.</p>
        <div className="text-3xl font-black text-amber-300">{score} PTS</div>
        <div className="flex gap-3 flex-wrap justify-center">
          {onPhotobooth && <button onClick={() => onPhotobooth("GRAMMAR_BOMB", { score, correct: score / 100, total: GRAMMAR_DATA.length, failed: true })} className="flex-1 py-3 bg-ec-gold hover:bg-yellow-400 text-ec-navy font-bold rounded-xl transition btn-action">📸 Take Photo</button>}
          <button onClick={reset} className="flex-1 py-3 bg-ec-red font-bold rounded-xl btn-action">Try Again 💣</button>
          <button onClick={onHome} className="py-3 px-4 bg-white/10 font-bold rounded-xl">Menu</button>
        </div>
      </div>
    );
  }

  if (gameState === "DEFUSED") {
    return (
      <div className="glass-card rounded-3xl p-8 text-center space-y-6 max-w-md mx-auto border-2 border-emerald-400">
        <div className="text-6xl">💣✨</div>
        <h2 className="text-3xl font-black text-emerald-400">ALL BOMBS DEFUSED!</h2>
        <div className="text-4xl font-black text-amber-300">{score} PTS</div>
        <div className="flex gap-3 flex-wrap justify-center">
          {onPhotobooth && <button onClick={() => onPhotobooth("GRAMMAR_BOMB", { score, correct: score / 100, total: GRAMMAR_DATA.length, failed: false })} className="flex-1 py-3 bg-ec-gold hover:bg-yellow-400 text-ec-navy font-bold rounded-xl transition btn-action">📸 Take Photo</button>}
          <button onClick={reset} className="flex-1 py-3 bg-emerald-600 font-bold rounded-xl btn-action">Play Again 🔄</button>
          <button onClick={onHome} className="py-3 px-4 bg-white/10 font-bold rounded-xl">Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-md mx-auto w-full">
      <div className="text-center space-y-2">
        <div className="inline-block px-4 py-1 bg-ec-red/30 border border-ec-red/50 rounded-full text-red-400 font-black text-sm animate-pulse">💣 DEFUSE THE BOMB IN {timeLeft}s</div>
      </div>
      <div className="glass-card rounded-3xl p-5 sm:p-8 text-center space-y-6 border-2 border-ec-red/40">
        <h3 className="text-base sm:text-lg font-bold text-white">Choose the correct sentence!</h3>
        <div className="space-y-3">
          {shuffledOptions.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(i)} className="w-full min-h-[52px] py-4 px-4 sm:px-5 bg-white/10 hover:bg-ec-red active:bg-ec-red active:scale-[0.98] text-left font-bold text-sm sm:text-base rounded-2xl transition border border-white/20 flex items-center justify-between group btn-action">
              <span>{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});
