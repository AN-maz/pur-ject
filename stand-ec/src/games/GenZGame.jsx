import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { GENZ_DATA } from "../data/questions";
import { SoundEngine } from "../lib/sound";
import { shuffleArray, shuffleOptions } from "../utils/shuffleArray";

export default React.memo(function GenZGame({ onConfetti, onHome, onPhotobooth }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameState, setGameState] = useState("PLAYING");
  const [session, setSession] = useState(0);
  const mountedRef = useRef(true);

  // Urutan soal diacak tiap sesi main
  // session = pemicu acak ulang tiap sesi main
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const order = useMemo(() => shuffleArray(GENZ_DATA.map((_, i) => i)), [session]);
  const currentQ = useMemo(() => GENZ_DATA[order[currentIdx]], [order, currentIdx]);
  const { shuffledOptions, correctIdx } = useMemo(() => shuffleOptions(currentQ.options, currentQ.correct), [currentQ.options, currentQ.correct]);

  const handleAnswer = useCallback((optionIdx) => {
    if (optionIdx === correctIdx) { SoundEngine.correct(); setScore((p) => p + 150); setCorrectCount((p) => p + 1); }
    else SoundEngine.wrong();
    if (currentIdx + 1 < GENZ_DATA.length) setCurrentIdx((p) => p + 1);
    else { setGameState("END"); SoundEngine.fanfare(); onConfetti?.(); }
  }, [correctIdx, currentIdx, onConfetti]);

  const reset = useCallback(() => { setCurrentIdx(0); setScore(0); setCorrectCount(0); setGameState("PLAYING"); setSession((s) => s + 1); }, []);

  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; }; }, []);

  if (gameState === "END") {
    const auraPct = Math.min(99, Math.round((score / (GENZ_DATA.length * 150)) * 100));
    return (
      <div className="glass-card rounded-3xl p-6 text-center space-y-6 max-w-md mx-auto border-2 border-fuchsia-500/50">
        <div><span className="text-xs font-black bg-fuchsia-600 px-3 py-1 rounded-full uppercase tracking-widest text-white">Story Friendly Card</span><h2 className="text-2xl font-black text-white mt-3">💀 GEN Z ENGLISH SCORE</h2></div>
        <div className="bg-gradient-to-b from-fuchsia-950 to-purple-900/80 p-6 rounded-2xl border border-fuchsia-500/30 space-y-4">
          <div className="text-5xl font-black text-amber-300">Aura: {auraPct}% 🧠</div>
          <p className="text-sm font-extrabold text-fuchsia-200">{auraPct > 70 ? "Certified Gen Z English Speaker 💀" : "Boomer Energy Detected 👴"}</p>
          <div className="text-left text-xs space-y-2 border-t border-white/10 pt-3">
            <div className="flex justify-between"><span>Slang Knowledge:</span><span>⭐⭐⭐⭐⭐</span></div>
            <div className="flex justify-between"><span>Gen Z Vibe:</span><span>⭐⭐⭐⭐</span></div>
            <div className="flex justify-between font-bold text-amber-400"><span>Aura Level:</span><span>+{auraPct * 100} PTS</span></div>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          {onPhotobooth && <button onClick={() => onPhotobooth("GEN_Z", { score, correct: correctCount, total: GENZ_DATA.length, aura: auraPct })} className="flex-1 py-3 bg-ec-gold hover:bg-yellow-400 text-ec-navy font-bold rounded-xl transition btn-action">📸 Take Photo</button>}
          <button onClick={reset} className="flex-1 py-3 bg-fuchsia-600 font-bold rounded-xl btn-action">Retake Quiz 🔄</button>
          <button onClick={onHome} className="py-3 px-4 bg-white/10 font-bold rounded-xl">Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-md mx-auto w-full">
      <div className="text-center"><span className="text-xs font-black bg-fuchsia-600/30 text-fuchsia-300 border border-fuchsia-500/30 px-3 py-1 rounded-full">QUESTION {currentIdx + 1} OF {GENZ_DATA.length}</span></div>
      <div className="glass-card rounded-3xl p-5 sm:p-8 text-center space-y-6">
        <div><h2 className="text-xl sm:text-2xl font-black text-amber-300">&quot;{currentQ.phrase}&quot;</h2><p className="text-sm text-blue-200/80 mt-1">{currentQ.question}</p></div>
        <div className="grid grid-cols-1 gap-3">
          {shuffledOptions.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(i)} className="w-full min-h-[48px] py-3.5 px-4 bg-white/10 hover:bg-fuchsia-600 active:bg-fuchsia-600 text-left font-bold rounded-xl transition border border-white/10 flex items-center justify-between group btn-action">
              <span><strong className="text-fuchsia-400 group-hover:text-white mr-2">{String.fromCharCode(65 + i)}.</strong> {opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});
