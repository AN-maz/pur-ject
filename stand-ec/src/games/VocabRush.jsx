import React, { useEffect, useCallback, useMemo, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { VOCAB_DATA, getVocabRank } from "../data/questions";
import { SoundEngine } from "../lib/sound";
import { shuffleArray, shuffleOptions } from "../utils/shuffleArray";

export default React.memo(function VocabRush({ onConfetti, onHome, onPhotobooth }) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState("PLAYING");
  const [feedback, setFeedback] = useState(null);
  const [session, setSession] = useState(0);
  const timerRef = useRef(null);
  const mountedRef = useRef(true);

  // Urutan soal diacak tiap sesi main
  // session = pemicu acak ulang tiap sesi main
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const order = useMemo(() => shuffleArray(VOCAB_DATA.map((_, i) => i)), [session]);

  const { currentQ, shuffledOptions, correctIdx } = useMemo(() => {
    const q = VOCAB_DATA[order[currentIndex % order.length]];
    const s = shuffleOptions(q.options, q.correct);
    return { currentQ: q, shuffledOptions: s.shuffledOptions, correctIdx: s.correctIdx };
  }, [currentIndex, order]);

  const reset = useCallback(() => {
    setGameState("PLAYING"); setTimeLeft(30); setScore(0); setStreak(0);
    setCorrectCount(0); setWrongCount(0); setCurrentIndex(0); setFeedback(null);
    setSession((s) => s + 1);
  }, []);

  const handleAnswer = useCallback((optionIdx) => {
    if (!mountedRef.current) return;
    if (optionIdx === correctIdx) {
      SoundEngine.correct();
      const ns = streak + 1;
      setStreak(ns);
      if (ns > bestStreak) setBestStreak(ns);
      setScore((p) => p + 100 + ns * 10);
      setCorrectCount((p) => p + 1);
      setFeedback("CORRECT");
    } else {
      SoundEngine.wrong();
      setStreak(0);
      setTimeLeft((p) => Math.max(0, p - 2));
      setWrongCount((p) => p + 1);
      setFeedback("WRONG");
    }
    setTimeout(() => { if (mountedRef.current) setFeedback(null); }, 200);
    setTimeout(() => { if (mountedRef.current) setCurrentIndex((p) => p + 1); }, 200);
  }, [correctIdx, streak, bestStreak]);

  // Ticker MURNI — tanpa side effect di dalam updater (updater boleh dipanggil >1x oleh React)
  useEffect(() => {
    if (gameState !== "PLAYING") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  // Waktu habis dieksekusi TEPAT SEKALI (cleanup membatalkan jadwal basi)
  useEffect(() => {
    if (gameState !== "PLAYING" || timeLeft !== 0) return;
    const t = setTimeout(() => { setGameState("END"); SoundEngine.fanfare(); onConfetti?.(); }, 80);
    return () => clearTimeout(t);
  }, [gameState, timeLeft, onConfetti]);

  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  const rank = getVocabRank(score);

  if (gameState === "END") {
    return (
      <div className="glass-card rounded-3xl p-6 md:p-8 text-center space-y-6 max-w-md mx-auto animate-fade-in border-2 border-amber-400/40">
        <div><span className="text-4xl">{rank.icon}</span><h2 className="text-xs uppercase font-extrabold tracking-widest text-amber-400 mt-2">Result Screen</h2><h1 className={`text-3xl font-black ${rank.color}`}>{rank.title}</h1><p className="text-xs text-blue-200/80 italic mt-1">&quot;Your English is cooking 🔥&quot;</p></div>
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-3">
          <div className="text-4xl font-black text-amber-300">{score.toLocaleString()} PTS</div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs border-t border-white/10 pt-3">
            <div><div className="text-emerald-400 font-bold text-lg">{correctCount}</div><div className="text-white/60">Correct</div></div>
            <div><div className="text-ec-red font-bold text-lg">{wrongCount}</div><div className="text-white/60">Wrong</div></div>
            <div><div className="text-amber-400 font-bold text-lg">🔥 {bestStreak}</div><div className="text-white/60">Best Streak</div></div>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          {onPhotobooth && <button onClick={() => onPhotobooth("VOCAB_RUSH", { score, correct: correctCount, wrong: wrongCount, best: bestStreak })} className="flex-1 py-3 bg-ec-gold hover:bg-yellow-400 text-ec-navy font-bold rounded-xl transition btn-action">📸 Take Photo</button>}
          <button onClick={reset} className="flex-1 py-3 bg-ec-red hover:bg-red-700 font-bold rounded-xl transition btn-action">Play Again 🔄</button>
          <button onClick={onHome} className="py-3 px-4 bg-white/10 hover:bg-white/20 font-bold rounded-xl transition">Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-md mx-auto w-full">
      <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-2xl">
        <div className="text-center"><div className="text-xs text-blue-200/60 font-semibold">TIME</div><div className={`text-2xl font-black ${timeLeft <= 5 ? "text-ec-red animate-ping" : "text-amber-400"}`}>{timeLeft}s</div></div>
        <div className="text-center"><div className="text-xs text-blue-200/60 font-semibold">SCORE</div><div className="text-2xl font-black text-white">{score}</div></div>
        <div className="text-center"><div className="text-xs text-blue-200/60 font-semibold">STREAK</div><div className="text-2xl font-black text-amber-400 flex items-center justify-center gap-1">🔥 {streak}</div></div>
      </div>
      <div className={`glass-card rounded-3xl p-5 sm:p-8 text-center space-y-6 relative overflow-hidden transition ${feedback === "WRONG" ? "animate-shake border-ec-red" : ""}`}>
        {feedback === "CORRECT" && <div className="absolute top-2 right-4 text-emerald-400 font-bold text-xs animate-bounce">+100 🔥</div>}
        {feedback === "WRONG" && <div className="absolute top-2 right-4 text-ec-red font-bold text-xs">-2s 💀</div>}
        <div><span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Select Synonym / Meaning</span><h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-300 tracking-wider mt-1">{currentQ.word}</h2></div>
        <div className="grid grid-cols-1 gap-3">
          {shuffledOptions.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(i)} className="w-full min-h-[48px] py-3.5 px-4 bg-white/10 hover:bg-amber-400 active:bg-amber-400 hover:text-ec-navy active:text-ec-navy text-left font-bold rounded-xl transition-all border border-white/10 flex items-center justify-between group btn-action">
              <span><strong className="text-amber-400 group-hover:text-ec-navy mr-2">{String.fromCharCode(65 + i)}.</strong> {opt}</span>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});
