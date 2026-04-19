import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSession } from '../../hooks/useSession';
import { generateDistractors } from '../../utils/smartDistractors';
import DoughnutChart from '../../components/dashboard/DoughnutChart';

export default function QuizMode() {
  const [searchParams] = useSearchParams();
  const wordCount = parseInt(searchParams.get('count')) || 20;
  const navigate = useNavigate();

  const {
    currentWord,
    queueLength,
    totalWords,
    completedCount,
    markCorrect,
    markIncorrect,
    isSessionComplete,
    isLoading,
    sessionStats,
  } = useSession({ wordCount, mode: 'quiz' });

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsedSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentWord) {
      generateDistractors(currentWord).then(setOptions);
      setSelectedOption(null);
      setShowResult(false);
    }
  }, [currentWord]);

  useEffect(() => {
    if (isSessionComplete) {
      navigate('/session/complete', { state: sessionStats });
    }
  }, [isSessionComplete, navigate, sessionStats]);

  const handleConfirm = useCallback(async () => {
    if (selectedOption === null) return;

    setShowResult(true);
    const isCorrect = options[selectedOption]?.isCorrect;

    setTimeout(async () => {
      if (isCorrect) {
        setStreakCount(s => s + 1);
        await markCorrect();
      } else {
        setStreakCount(0);
        markIncorrect();
      }
    }, 1200);
  }, [selectedOption, options, markCorrect, markIncorrect]);

  const handleSkip = () => {
    markIncorrect();
    setStreakCount(0);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-on-primary-container/30 animate-pulse">quiz</span>
          <p className="mt-4 text-on-surface-variant font-[var(--font-family-headline)] font-bold">
            Generating quiz...
          </p>
        </div>
      </div>
    );
  }

  if (!currentWord) return null;

  const optionLabels = ['A', 'B', 'C', 'D'];
  const progressPercent = ((completedCount) / totalWords) * 100;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 min-h-[calc(100vh-180px)] gap-8">
      
      {/* Left Sidebar: Session Stats (Desktop) */}
      <aside className="hidden md:flex md:col-span-3 flex-col gap-6 sticky top-24 self-start">
        {/* Progress Card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col items-center justify-center gap-4 shadow-[0_20px_40px_rgba(0,20,82,0.04)]">
          <div className="relative w-32 h-32 flex flex-col items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r="56" stroke="var(--color-surface-container-high)" strokeWidth="8" fill="transparent" />
              <circle cx="64" cy="64" r="56" stroke="#001452" strokeWidth="8" fill="transparent" strokeDasharray="352" strokeDashoffset={352 - (352 * (progressPercent || 0) / 100)} strokeLinecap="round" className="transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-2">
              <span className="text-3xl font-extrabold font-headline leading-none">{Math.round(progressPercent || 0)}%</span>
              <span className="text-[10px] font-bold text-outline uppercase tracking-widest mt-1">Goal</span>
            </div>
          </div>
          <div className="w-full text-center mt-2">
            <h3 className="font-headline font-bold text-lg text-primary-container">Academic Pulse</h3>
            <p className="text-xs text-on-surface-variant font-medium mt-1">{completedCount} of {totalWords} words tested</p>
          </div>
        </div>

        {/* Session Stats */}
        <div className="bg-surface-container-low rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-secondary-fixed p-2 rounded-lg text-secondary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              </div>
              <div>
                <p className="text-xs font-bold text-outline uppercase tracking-wider">Current Streak</p>
                <p className="text-xl font-extrabold font-headline text-primary-container">{streakCount} Correct</p>
              </div>
            </div>
          </div>
          <div className="h-px bg-outline-variant opacity-15"></div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant">Time Elapsed</span>
              <span className="font-mono font-semibold text-primary-container">{formatTime(elapsedSeconds)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface-variant">Queue Left</span>
              <span className="font-mono font-semibold text-primary-container">{queueLength}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Quiz Interface */}
      <section className="col-span-1 md:col-span-9 flex flex-col items-center justify-center relative w-full pt-8 md:pt-0">
        
        {/* Mobile-only Progress HUD */}
        <div className="md:hidden absolute top-0 left-0 w-full flex items-center justify-between px-2 mb-8">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-secondary"></span>
            <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">Quiz Active</span>
          </div>
          <span className="text-xs font-bold font-mono text-primary-container">{completedCount}/{totalWords}</span>
        </div>

        {/* Main Question Card */}
        <div className="w-full max-w-3xl flex flex-col gap-8 md:gap-12 items-center">
          
          {/* Target Word Display */}
          <div className="text-center w-full bg-surface-container-lowest rounded-[2rem] p-8 ambient-shadow border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
            <span className="inline-block px-3 py-1 bg-surface-container-low text-primary-container font-label text-[10px] font-bold uppercase tracking-wider rounded-full mb-4">
              Translate to Indonesian
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold font-headline tracking-tighter text-primary-container mb-4">
              {currentWord.word}
            </h1>
            <div className="flex items-center justify-center gap-2 text-on-primary-container">
              <span className="material-symbols-outlined text-xl">volume_up</span>
              <span className="font-label text-sm font-bold tracking-widest">{currentWord.type}</span>
            </div>
          </div>

          {/* Answer Options (Bento Style Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = opt.isCorrect;

              let btnClass = "bg-surface-container-lowest hover:bg-primary-container hover:text-white transition-all duration-300 p-6 md:p-8 rounded-2xl text-left border border-outline-variant/5 shadow-[0_10px_20px_rgba(0,20,82,0.02)]";
              let badgeClass = "bg-surface-container-low text-primary-container group-hover:bg-white/20 group-hover:text-white";

              if (showResult) {
                if (isCorrectAnswer) {
                  btnClass = "bg-[#e6f4ea] border-2 border-green-500 text-green-900 shadow-md transform scale-[1.02] z-10 p-6 md:p-8 rounded-2xl text-left";
                  badgeClass = "bg-green-600 text-white";
                } else if (isSelected && !isCorrectAnswer) {
                  btnClass = "bg-[#fce8e6] border-2 border-secondary text-secondary p-6 md:p-8 rounded-2xl text-left opacity-80";
                  badgeClass = "bg-secondary text-white";
                } else {
                  btnClass = "bg-surface-container-lowest opacity-40 p-6 md:p-8 rounded-2xl text-left";
                }
              } else if (isSelected) {
                btnClass = "bg-primary-container text-white p-6 md:p-8 rounded-2xl text-left shadow-lg scale-[1.02]";
                badgeClass = "bg-white/20 text-white";
              }

              return (
                <button 
                  key={idx}
                  onClick={() => !showResult && setSelectedOption(idx)}
                  disabled={showResult}
                  className={`group relative ${btnClass}`}
                >
                  <div className={`absolute top-4 left-4 w-6 h-6 rounded flex items-center justify-center transition-colors ${badgeClass}`}>
                    <span className="text-[10px] font-bold">{optionLabels[idx]}</span>
                  </div>
                  <p className="font-[var(--font-family-body)] text-base md:text-lg font-medium leading-relaxed mt-4">
                    {opt.meaning}
                  </p>
                  
                  {showResult && isCorrectAnswer && (
                    <span className="absolute top-4 right-4 material-symbols-outlined text-green-600 bg-white rounded-full">check_circle</span>
                  )}
                  {showResult && isSelected && !isCorrectAnswer && (
                    <span className="absolute top-4 right-4 material-symbols-outlined text-white bg-secondary rounded-full">close</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full pt-4">
            <button 
              onClick={handleSkip}
              disabled={showResult}
              className="w-full md:flex-1 bg-surface-container-low text-on-surface-variant font-[var(--font-family-headline)] font-bold py-4 px-6 rounded-full hover:bg-surface-container-high transition-colors tracking-widest text-sm disabled:opacity-30 disabled:cursor-not-allowed"
            >
              SKIP THIS WORD
            </button>
            <button 
              onClick={handleConfirm}
              disabled={selectedOption === null || showResult}
              className={`w-full md:flex-[2] btn-gradient text-white font-[var(--font-family-headline)] font-bold py-4 rounded-full transition-opacity shadow-lg tracking-widest text-sm flex items-center justify-center gap-2 ${selectedOption === null || showResult ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-90'}`}
            >
              {showResult ? 'Processing...' : 'CONFIRM SELECTION'}
              {!showResult && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
            </button>
          </div>
          
        </div>
      </section>
    </div>
  );
}
