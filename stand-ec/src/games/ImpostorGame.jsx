import React, { useEffect, useCallback, useMemo, useRef, useState } from "react";
import { IMPOSTOR_DATA } from "../data/questions";
import { SoundEngine } from "../lib/sound";
import { shuffleArray, shuffleOptions } from "../utils/shuffleArray";

export default React.memo(function ImpostorGame({ onConfetti, onHome, onPhotobooth }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [gameState, setGameState] = useState("PLAYING");
  const [session, setSession] = useState(0);
  const timerRef = useRef(null);
  const mountedRef = useRef(true);
  // Cermin sinkron agar advance() idempoten & kebal closure basi / panggilan ganda
  const idxRef = useRef(0);
  const endedRef = useRef(false);

  // Urutan soal diacak tiap sesi main
  // session = pemicu acak ulang tiap sesi main
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const order = useMemo(() => shuffleArray(IMPOSTOR_DATA.map((_, i) => i)), [session]);
  // Fallback anti-blank: indeks tak valid tidak boleh meledakkan render (penting saat live stand)
  const currentQ = useMemo(() => IMPOSTOR_DATA[order[currentIdx]] ?? IMPOSTOR_DATA[order[0]], [order, currentIdx]);
  const { shuffledOptions, correctIdx } = useMemo(() => shuffleOptions(currentQ.options, currentQ.impostor), [currentQ.options, currentQ.impostor]);

  const advance = useCallback((wasCorrect) => {
    if (endedRef.current) return;
    const idx = idxRef.current;
    if (wasCorrect) { SoundEngine.correct(); setScore((p) => p + 100); setCorrectCount((p) => p + 1); } else SoundEngine.wrong();
    if (idx + 1 < IMPOSTOR_DATA.length) {
      idxRef.current = idx + 1;
      setCurrentIdx(idx + 1);
      setTimeLeft(5);
    } else {
      endedRef.current = true;
      setGameState("END");
      SoundEngine.fanfare();
      onConfetti?.();
    }
  }, [onConfetti]);

  const handleAnswer = useCallback((idx) => advance(idx === correctIdx), [advance, correctIdx]);

  // Ticker MURNI — tanpa side effect di dalam updater (updater boleh dipanggil >1x oleh React)
  useEffect(() => {
    if (gameState !== "PLAYING") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIdx, gameState]);

  // Waktu habis dieksekusi TEPAT SEKALI (cleanup membatalkan jadwal basi)
  useEffect(() => {
    if (gameState !== "PLAYING" || timeLeft !== 0) return;
    const t = setTimeout(() => advance(false), 80);
    return () => clearTimeout(t);
  }, [gameState, timeLeft, currentIdx, advance]);

  const reset = useCallback(() => { idxRef.current = 0; endedRef.current = false; setCurrentIdx(0); setScore(0); setCorrectCount(0); setGameState("PLAYING"); setTimeLeft(5); setSession((s) => s + 1); }, []);

  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  if (gameState === "END") {
    return (
      <div className="glass-card rounded-3xl p-6 sm:p-8 text-center space-y-6 max-w-md mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black text-emerald-400">IMPOSTOR CAUGHT! 🕵️</h2>
        <div className="text-5xl font-black text-white">{score} PTS</div>
        <div className="flex gap-3 flex-wrap justify-center">
          {onPhotobooth && <button onClick={() => onPhotobooth("IMPOSTOR", { score, correct: correctCount, total: IMPOSTOR_DATA.length })} className="flex-1 py-3 bg-ec-gold hover:bg-yellow-400 text-ec-navy font-bold rounded-xl transition btn-action">📸 Take Photo</button>}
          <button onClick={reset} className="flex-1 py-3 bg-emerald-600 font-bold rounded-xl btn-action">Play Again 🔄</button>
          <button onClick={onHome} className="py-3 px-4 bg-white/10 font-bold rounded-xl">Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-md mx-auto w-full">
      <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-2xl">
        <span className="text-xs font-bold text-emerald-400 uppercase">Find The Impostor!</span>
        <div className="text-xl font-black text-ec-red animate-pulse">{timeLeft}s ⏱️</div>
        <span className="text-xs font-bold text-white">Score: {score}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {shuffledOptions.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)} className="min-h-[7rem] sm:h-32 py-3 bg-white/10 hover:bg-emerald-500/80 active:bg-emerald-500/80 active:scale-95 hover:scale-105 border-2 border-white/20 hover:border-emerald-300 rounded-2xl flex items-center justify-center text-lg sm:text-xl font-black text-white transition-all btn-action p-2 text-center">
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
});
