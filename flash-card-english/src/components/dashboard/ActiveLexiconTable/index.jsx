import React from 'react';

export default function ActiveLexiconTable({ words }) {
  if (!words || words.length === 0) return null;

  return (
    <div className="hidden md:flex bg-surface-container-lowest rounded-[2rem] shadow-sm overflow-hidden flex-col">
      <div className="px-8 py-6 flex justify-between items-center border-b border-outline-variant/10">
        <h3 className="font-headline font-bold text-xl text-primary-container">Active Lexicon</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-xs focus:ring-1 focus:ring-primary-container w-64" placeholder="Filter vocabulary..." type="text"/>
          </div>
          <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant">tune</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="px-8 py-4 font-[var(--font-family-label)] font-bold text-[10px] uppercase tracking-widest text-on-surface-variant">Term</th>
              <th className="px-8 py-4 font-[var(--font-family-label)] font-bold text-[10px] uppercase tracking-widest text-on-surface-variant">Classification</th>
              <th className="px-8 py-4 font-[var(--font-family-label)] font-bold text-[10px] uppercase tracking-widest text-on-surface-variant">Definition</th>
              <th className="px-8 py-4 font-[var(--font-family-label)] font-bold text-[10px] uppercase tracking-widest text-on-surface-variant">Retention</th>
              <th className="px-8 py-4 font-[var(--font-family-label)] font-bold text-[10px] uppercase tracking-widest text-on-surface-variant">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {words.map((word) => {
              const retention = word.mastered ? 100 : Math.floor(Math.random() * 80) + 10; // Placeholder retention logic
              return (
                <tr key={word.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-8 py-5">
                    <span className="font-headline font-bold text-primary-container text-lg capitalize">{word.term}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-2.5 py-1 bg-surface-container-high rounded text-[10px] font-bold text-on-surface-variant uppercase">{word.type || 'term'}</span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm text-on-surface max-w-xs truncate">{word.definition}</p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div className={`h-full ${word.mastered ? 'bg-on-primary-container' : 'bg-secondary'}`} style={{ width: `${retention}%` }}></div>
                      </div>
                      <span className={`text-[10px] font-bold ${word.mastered ? 'text-on-surface-variant' : 'text-secondary'}`}>{retention}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <button className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary-container">more_vert</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-8 py-4 bg-surface-container-low/30 flex justify-between items-center text-xs font-bold text-on-surface-variant uppercase tracking-widest">
        <span>Showing {words.length} entries</span>
        <div className="flex gap-4">
          <button className="hover:text-primary-container disabled:opacity-30" disabled>Previous</button>
          <button className="hover:text-primary-container">Next</button>
        </div>
      </div>
    </div>
  );
}
