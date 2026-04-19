import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWords } from '../../hooks/useWords';
import DoughnutChart from '../../components/dashboard/DoughnutChart';

export default function SessionSetup() {
  const [wordCount, setWordCount] = useState(20);
  const [mode, setMode] = useState('flashcard');
  const navigate = useNavigate();
  const { words } = useWords();

  const unmasteredCount = words.filter(w => w.status !== 'mastered').length;
  const adjustedWordCount = Math.min(wordCount, unmasteredCount);
  const estimatedMinutes = Math.ceil(adjustedWordCount * 0.6);

  const handleStart = () => {
    const params = new URLSearchParams({ count: adjustedWordCount });
    navigate(`/session/${mode}?${params.toString()}`);
  };

  const isQuiz = mode === 'quiz';

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="mb-12">
        <p className="text-secondary font-headline font-bold text-sm tracking-widest uppercase mb-2">Curriculum Setup</p>
        <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-primary-fixed leading-tight">Define Your Learning Flow</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Selection Cards */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Section 1: Methodology */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-[var(--font-family-headline)] font-bold text-sm">01</span>
              <h3 className="text-xl font-[var(--font-family-headline)] font-bold text-on-surface">Select Methodology</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Flashcard Option */}
              <div 
                onClick={() => setMode('flashcard')}
                className={`group relative rounded-2xl p-6 transition-all cursor-pointer hover:shadow-[0_20px_40px_rgba(0,20,82,0.06)] ${!isQuiz ? 'bg-surface-container-lowest ring-2 ring-primary' : 'bg-surface-container-lowest ring-1 ring-outline-variant/30'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${!isQuiz ? 'bg-primary-container/5 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined text-3xl" style={!isQuiz ? { fontVariationSettings: "'FILL' 1" } : {}}>auto_stories</span>
                  </div>
                  {!isQuiz && <span className="material-symbols-outlined text-secondary">check_circle</span>}
                </div>
                <h4 className="text-lg font-[var(--font-family-headline)] font-bold mb-2">Spaced Repetition</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">Optimize long-term retention using the Leitner system. Perfect for vocabulary and conceptual frameworks.</p>
              </div>

              {/* Quiz Option */}
              <div 
                onClick={() => setMode('quiz')}
                className={`group relative rounded-2xl p-6 transition-all cursor-pointer hover:shadow-[0_20px_40px_rgba(0,20,82,0.06)] ${isQuiz ? 'bg-surface-container-lowest ring-2 ring-primary' : 'bg-surface-container-lowest ring-1 ring-outline-variant/30'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${isQuiz ? 'bg-primary-container/5 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined text-3xl" style={isQuiz ? { fontVariationSettings: "'FILL' 1" } : {}}>psychology</span>
                  </div>
                  {isQuiz && <span className="material-symbols-outlined text-secondary">check_circle</span>}
                </div>
                <h4 className="text-lg font-[var(--font-family-headline)] font-bold mb-2">Active Recall</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">High-intensity testing phase that forces neural retrieval. Best for rapid exam preparation.</p>
              </div>

            </div>
          </section>

          {/* Section 2: Intensity */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-[var(--font-family-headline)] font-bold text-sm">02</span>
              <h3 className="text-xl font-[var(--font-family-headline)] font-bold text-on-surface">Learning Intensity</h3>
            </div>
            <div className="bg-surface-container-low p-8 rounded-2xl relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {[
                  { value: 10, label: 'LIGHT', id: 1 },
                  { value: 20, label: 'STANDARD', id: 2 },
                  { value: 30, label: 'IMMERSIVE', id: 3 },
                  { value: 50, label: 'MARATHON', id: 4 },
                ].map((opt) => {
                  const isSelected = wordCount === opt.value;
                  const isDisabled = opt.value > unmasteredCount;
                  
                  return (
                    <button 
                      key={opt.value}
                      onClick={() => !isDisabled && setWordCount(opt.value)}
                      disabled={isDisabled}
                      className={`flex flex-col items-center p-6 rounded-xl text-center group transition-all ${
                        isSelected 
                          ? 'bg-primary-container text-white shadow-xl shadow-primary-container/20' 
                          : isDisabled
                          ? 'bg-surface-container-high text-on-surface-variant opacity-50 cursor-not-allowed'
                          : 'bg-surface-container-lowest ring-1 ring-outline-variant/20 hover:ring-secondary/50'
                      }`}
                    >
                      <span className={`text-[10px] font-label font-bold mb-3 tracking-widest ${isSelected ? 'text-secondary-fixed-dim' : 'text-secondary'}`}>{opt.label}</span>
                      <span className={`text-3xl font-headline font-extrabold mb-1 ${isSelected ? '' : 'text-on-surface'}`}>{opt.value}</span>
                      <span className={`text-xs ${isSelected ? 'opacity-80' : 'text-on-surface-variant'}`}>Words</span>
                    </button>
                  );
                })}

              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            </div>
          </section>

          {/* Section 3: Focus Areas (Stitch exact layout with checkboxes) */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-[var(--font-family-headline)] font-bold text-sm">03</span>
              <h3 className="text-xl font-[var(--font-family-headline)] font-bold text-on-surface">Focus Modules</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center gap-3 ring-1 ring-outline-variant/20">
                <input readOnly checked className="w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary" type="checkbox" />
                <span className="text-sm font-medium">Core Vocabulary</span>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center gap-3 ring-1 ring-outline-variant/20">
                <input readOnly disabled className="w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary" type="checkbox" />
                <span className="text-sm font-medium opacity-50">Verbs Mastery</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Preview Panel */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-primary-container text-white rounded-2xl overflow-hidden shadow-2xl shadow-primary-container/30">
            <div className="p-8">
              <h3 className="text-2xl font-[var(--font-family-headline)] font-extrabold mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined">analytics</span>
                Session Preview
              </h3>

              <div className="space-y-8">
                {/* Metric 1 */}
                <div className="flex items-center justify-between group">
                  <div className="space-y-1">
                    <p className="text-xs font-[var(--font-family-label)] text-on-primary-container uppercase tracking-wider">Methodology</p>
                    <p className="font-[var(--font-family-headline)] font-bold text-lg">{isQuiz ? 'Active Recall' : 'Spaced Repetition'}</p>
                  </div>
                  <span className="material-symbols-outlined text-secondary">verified</span>
                </div>

                {/* Metric 2 */}
                <div className="flex items-center justify-between group">
                  <div className="space-y-1">
                    <p className="text-xs font-[var(--font-family-label)] text-on-primary-container uppercase tracking-wider">Duration</p>
                    <p className="font-[var(--font-family-headline)] font-bold text-lg">~{estimatedMinutes} Minutes</p>
                  </div>
                  <span className="material-symbols-outlined text-on-primary-container">schedule</span>
                </div>

                {/* Progress Doughnut Simulation */}
                <div className="py-6 flex flex-col items-center">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="transparent" />
                      <circle cx="80" cy="80" r="70" stroke="#bb001e" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset={440 - (440 * (adjustedWordCount / 50))} strokeLinecap="round" className="transition-all duration-1000" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-[var(--font-family-headline)] font-extrabold">{adjustedWordCount}</span>
                      <span className="text-[10px] font-[var(--font-family-label)] uppercase tracking-widest opacity-60 mt-1">Words</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <p className="text-xs font-[var(--font-family-label)] text-on-primary-container uppercase tracking-wider">Included Modules</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/5">Core Vocabulary</span>
                  </div>
                </div>

              </div>

              {/* CTA Button */}
              <button 
                onClick={handleStart}
                disabled={adjustedWordCount === 0}
                className={`w-full mt-12 py-4 rounded-full text-white font-[var(--font-family-headline)] font-extrabold text-sm tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-lg ${adjustedWordCount === 0 ? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed' : 'bg-gradient-to-r from-secondary to-[#e22431] shadow-secondary/20'}`}
              >
                Initialize Session
              </button>
            </div>
            
            {/* Footer Info */}
            <div className="bg-on-primary-fixed-variant px-8 py-4 flex items-center gap-2 text-xs opacity-70">
              <span className="material-symbols-outlined text-sm">info</span>
              {unmasteredCount === 0 ? 'No words left to master!' : `Estimating ${adjustedWordCount} concepts mastered today.`}
            </div>
          </div>
          
          {/* Secondary Action */}
          <div className="mt-6 flex justify-center">
            <button className="text-primary font-label font-bold text-sm flex items-center gap-2 hover:text-secondary transition-colors">
              <span className="material-symbols-outlined text-lg">save</span>
              Save as Routine Template
            </button>
          </div>
          
        </div>

      </div>
    </div>
  );
}
