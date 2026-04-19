import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWords } from '../../hooks/useWords';
import { useStats } from '../../hooks/useStats';
import DoughnutChart from '../../components/dashboard/DoughnutChart';
import DailyProgressCard from '../../components/dashboard/DailyProgressCard';
import StreakCard from '../../components/dashboard/StreakCard';
import WordCard from '../../components/dashboard/WordCard';
import ImportModal from '../../components/shared/ImportModal';
import ActiveLexiconTable from '../../components/dashboard/ActiveLexiconTable';

export default function Dashboard() {
  const { words, loading, importWords } = useWords();
  const { stats, refresh: refreshStats } = useStats();
  const [showImport, setShowImport] = useState(false);

  // Auto-show import modal if no words
  useEffect(() => {
    if (!loading && words.length === 0) {
      setShowImport(true);
    }
  }, [loading, words.length]);

  const handleImport = async (data) => {
    await importWords(data);
    await refreshStats();
    setShowImport(false);
  };

  const recentWords = words.slice(-8).reverse();

  return (
    <div className="space-y-8 min-w-0">
      {/* Top Bento Grid Section - matching Stitch dashboard.html */}
      <div className="bento-grid min-w-0">
        {/* Mastery Chart Widget */}
        <div className="bento-col-8 bg-surface-container-lowest rounded-[2rem] p-8 shadow-sm flex flex-col gap-6 relative overflow-hidden min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-headline font-bold text-2xl text-primary-container mb-1">Vocabulary Mastery</h3>
              <p className="text-sm text-on-surface-variant max-w-xs">Performance trajectory across semantic domains for the current semester.</p>
            </div>
            <div className="flex gap-2">
              <span className="px-4 py-2 bg-surface-container-low rounded-full text-xs font-bold text-primary-container cursor-pointer hover:bg-surface-container-high transition-colors">Weekly</span>
              <span className="px-4 py-2 bg-primary-container text-white rounded-full text-xs font-bold cursor-pointer">Monthly</span>
            </div>
          </div>
          
          <div className="flex-1 flex items-end gap-3 h-48 mt-4">
            <div className="flex-1 bg-surface-container-high rounded-t-xl relative group transition-all duration-300 hover:bg-on-primary-container/20 h-[40%]"></div>
            <div className="flex-1 bg-surface-container-high rounded-t-xl relative group transition-all duration-300 hover:bg-on-primary-container/20 h-[65%]"></div>
            <div className="flex-1 bg-surface-container-high rounded-t-xl relative group transition-all duration-300 hover:bg-on-primary-container/20 h-[55%]"></div>
            <div className="flex-1 bg-surface-container-high rounded-t-xl relative group transition-all duration-300 hover:bg-on-primary-container/20 h-[85%]"></div>
            <div className="flex-1 bg-secondary rounded-t-xl relative group transition-all duration-300 hover:bg-secondary/80 h-[92%]">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary-container text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {stats.masteredWords} Words Mastered
              </div>
            </div>
            <div className="flex-1 bg-surface-container-high rounded-t-xl relative group transition-all duration-300 hover:bg-on-primary-container/20 h-[70%]"></div>
            <div className="flex-1 bg-surface-container-high rounded-t-xl relative group transition-all duration-300 hover:bg-on-primary-container/20 h-[60%]"></div>
          </div>
          
          <div className="flex justify-between border-t border-outline-variant/15 pt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Word Streaks / Pulse Widget */}
        <div className="bento-col-4 bg-primary-container rounded-[2rem] p-6 lg:p-8 text-white flex flex-col items-center justify-center text-center space-y-4 lg:space-y-6 relative group cursor-pointer overflow-hidden min-w-0">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:rotate-12 transition-transform duration-500">
            <span className="material-symbols-outlined text-9xl">auto_awesome</span>
          </div>
          <div className="relative w-32 h-32 lg:w-44 lg:h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 176 176">
              <circle className="text-white/10" cx="88" cy="88" fill="transparent" r="70" stroke="currentColor" strokeWidth="12"></circle>
              <circle 
                className="text-secondary transition-all duration-1000" 
                cx="88" cy="88" 
                fill="transparent" 
                r="70" 
                stroke="currentColor" 
                strokeDasharray="440" 
                strokeDashoffset={440 - (440 * Math.min(1, stats.todayLearned / 60))} 
                strokeLinecap="round" 
                strokeWidth="12"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-headline font-extrabold text-5xl">
                {Math.round(Math.min(1, stats.todayLearned / 60) * 100)}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Daily Goal %</span>
            </div>
          </div>
          <div>
            <h4 className="font-headline font-bold text-xl mb-1">Cognitive Momentum</h4>
            <p className="text-xs text-on-primary-container leading-relaxed">You are in the top 5% of active scholars today. Keep up the rhythm.</p>
          </div>
          <Link to="/setup" className="w-full py-4 bg-white text-primary-container font-bold rounded-full text-xs uppercase tracking-widest hover:bg-secondary hover:text-white transition-colors duration-300 block text-center relative z-10">
            Continue Session
          </Link>
        </div>
      </div>

      {/* Recent Words: Grid on mobile */}
      {recentWords.length > 0 && (
        <section className="md:hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline font-bold text-xl text-primary-container">
              Recent Vocabulary
            </h2>
            <button
              onClick={() => setShowImport(true)}
              className="text-secondary font-label text-sm font-bold flex items-center gap-1 hover:underline"
            >
              Import More
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentWords.map((word) => (
              <WordCard key={word.id} word={word} />
            ))}
          </div>
        </section>
      )}

      {/* Active Lexicon Table (Desktop Only) - matching Stitch table */}
      <ActiveLexiconTable words={recentWords} />

      {/* Footer Meta - matching Stitch */}
      <div className="hidden md:flex justify-between items-center opacity-30 px-4 pb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest">The Atelier Framework v4.2.0</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">Oxford Scholastic Association (EC)</span>
      </div>

      {/* Import Modal */}
      <ImportModal
        isOpen={showImport}
        onClose={() => setShowImport(false)}
        onImport={handleImport}
      />

      {/* Floating Action Button - matching Stitch */}
      {words.length > 0 && (
        <button 
          onClick={() => setShowImport(true)}
          className="fixed bottom-24 right-6 md:bottom-10 md:right-10 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary-container to-on-primary-fixed-variant text-white rounded-full shadow-2xl flex items-center justify-center group hover:scale-110 transition-transform active:scale-95 z-50">
          <span className="material-symbols-outlined text-2xl md:text-3xl group-hover:rotate-90 transition-transform duration-300">add</span>
          <span className="absolute right-16 md:right-20 bg-primary-container text-white px-4 py-2 rounded-xl text-[10px] md:text-xs font-bold whitespace-nowrap opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg uppercase tracking-widest hidden md:block">
            New Study Deck
          </span>
        </button>
      )}
    </div>
  );
}
