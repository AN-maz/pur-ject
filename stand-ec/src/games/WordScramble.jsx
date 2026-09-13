import React, { useEffect, useCallback, useMemo, useRef, useState } from "react";
import { SCRAMBLE_DATA } from "../data/questions";
import { SoundEngine } from "../lib/sound";
import { shuffleArray } from "../utils/shuffleArray";

function scrambleWord(w) {
  const arr = w.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  if (arr.join("") === w) return scrambleWord(w);
  return arr.join(" ");
}

export default React.memo(function WordScramble({ onConfetti, onHome, onPhotobooth }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(12);
  const [gameState, setGameState] = useState("PLAYING");
  const [shake, setShake] = useState(false);
  const [session, setSession] = useState(0);
  const timerRef = useRef(null);
  const mountedRef = useRef(true);
  const shakeTimeoutRef = useRef(null);

  // Urutan soal diacak tiap sesi main
  // session = pemicu acak ulang tiap sesi main
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const order = useMemo(() => shuffleArray(SCRAMBLE_DATA.map((_, i) => i)), [session]);
  // Fallback anti-blank: indeks tak valid tidak boleh meledakkan render (penting saat live stand)
  const currentQ = useMemo(() => SCRAMBLE_DATA[order[currentIdx]] ?? SCRAMBLE_DATA[order[0]], [order, currentIdx]);
  const scrambled = useMemo(() => scrambleWord(currentQ.word), [currentQ.word]);

  const goToQuestion = useCallback((idx) => { setCurrentIdx(idx); setInputVal(""); setTimeLeft(12); }, []);
  const finishGame = useCallback(() => { setGameState("END"); SoundEngine.fanfare(); onConfetti?.(); }, [onConfetti]);

  const handleCheck = useCallback((e) => {
    e.preventDefault();
    if (inputVal.trim().toUpperCase() === currentQ.word) {
      SoundEngine.correct();
      setScore((p) => p + 200);
      setStreak((p) => p + 1);
      if (currentIdx + 1 < SCRAMBLE_DATA.length) goToQuestion(currentIdx + 1);
      else finishGame();
    } else {
      SoundEngine.wrong();
      setStreak(0);
      // Efek getar tiap jawaban salah, input tetap bisa dihapus/diedit
      setShake(true);
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);
      shakeTimeoutRef.current = setTimeout(() => { if (mountedRef.current) setShake(false); }, 450);
    }
  }, [inputVal, currentQ.word, currentIdx, goToQuestion, finishGame]);

  const reset = useCallback(() => { setScore(0); setStreak(0); setShake(false); setGameState("PLAYING"); setSession((s) => s + 1); goToQuestion(0); }, [goToQuestion]);

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
    const t = setTimeout(() => {
      if (currentIdx + 1 < SCRAMBLE_DATA.length) goToQuestion(currentIdx + 1);
      else finishGame();
    }, 80);
    return () => clearTimeout(t);
  }, [gameState, timeLeft, currentIdx, goToQuestion, finishGame]);

  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; if (timerRef.current) clearInterval(timerRef.current); if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current); }; }, []);

  if (gameState === "END") {
    return (
      <div className="glass-card rounded-3xl p-6 sm:p-8 text-center space-y-6 max-w-md mx-auto animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-black text-amber-300">PUZZLE MASTER! 🧩</h2>
        <div className="text-5xl font-black text-white">{score} PTS</div>
        <p className="text-sm text-blue-200/80">Kamu berhasil menyelesaikan kuis unscramble! Streak: 🔥 {streak}</p>
        <div className="flex gap-3 flex-wrap justify-center">
          {onPhotobooth && <button onClick={() => onPhotobooth("WORD_SCRAMBLE", { score, correct: score / 200, total: SCRAMBLE_DATA.length })} className="flex-1 py-3 bg-ec-gold hover:bg-yellow-400 text-ec-navy font-bold rounded-xl transition btn-action">📸 Take Photo</button>}
          <button onClick={reset} className="flex-1 py-3 bg-ec-red font-bold rounded-xl btn-action">Try Again 🔄</button>
          <button onClick={onHome} className="py-3 px-4 bg-white/10 font-bold rounded-xl">Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-md mx-auto w-full">
      <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-2xl">
        <div><span className="text-xs text-blue-300 font-bold uppercase">Difficulty</span><div className="text-sm font-black text-amber-400">{currentQ.difficulty}</div></div>
        <div className="text-center"><span className="text-xs text-blue-300 font-bold uppercase">Timer</span><div className="text-2xl font-black text-ec-red">{timeLeft}s</div></div>
        <div className="text-right"><span className="text-xs text-blue-300 font-bold uppercase">Score</span><div className="text-xl font-black text-emerald-400">{score}</div></div>
      </div>
      <div className="glass-card rounded-3xl p-5 sm:p-8 text-center space-y-6">
        <div><span className="text-xs text-blue-300 uppercase font-bold tracking-widest">Unscramble this word!</span><div className="text-2xl sm:text-3xl md:text-4xl font-black tracking-widest text-amber-300 my-4 bg-black/30 py-3 rounded-xl border border-white/10 break-words px-2">{scrambled}</div><p className="text-xs text-blue-200/60 italic">💡 Hint: {currentQ.hint}</p></div>
        <form onSubmit={handleCheck} className="space-y-3">
          <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder="TYPE HERE..." className={`w-full text-center text-xl font-black tracking-wider py-3.5 bg-white/10 border-2 rounded-xl focus:outline-none text-white placeholder-white/30 uppercase transition ${shake ? "animate-shake border-ec-red" : "border-amber-400/50 focus:border-amber-400"}`} autoFocus autoCapitalize="characters" autoCorrect="off" />
          <button type="submit" className="w-full min-h-[52px] py-3.5 bg-amber-400 hover:bg-amber-300 active:bg-amber-300 active:scale-[0.98] text-ec-navy font-black rounded-xl transition btn-action">SUBMIT ANSWER 🚀</button>
        </form>
      </div>
    </div>
  );
});
