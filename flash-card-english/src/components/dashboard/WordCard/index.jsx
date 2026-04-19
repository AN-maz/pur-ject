export default function WordCard({ word }) {
  const isMastered = word.status === 'mastered';

  return (
    <div
      className={`bg-surface-container-lowest p-6 rounded-xl border-l-4 ${
        isMastered ? 'border-on-primary-container' : 'border-secondary'
      }`}
      style={{ boxShadow: '0 2px 8px rgba(0, 20, 82, 0.04)' }}
    >
      <h3 className="font-[var(--font-family-headline)] font-bold text-lg text-primary-container mb-1">
        {word.word}
      </h3>
      <p className="text-on-surface-variant text-sm font-[var(--font-family-body)] italic mb-3">
        {word.type?.toLowerCase()}. {word.meaning}
      </p>
      <div className="flex justify-between items-center">
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
            isMastered
              ? 'text-on-primary-container bg-surface-container'
              : 'text-secondary bg-error-container'
          }`}
        >
          {isMastered ? 'Mastered' : 'Learning'}
        </span>
        <span
          className={`material-symbols-outlined text-base ${
            isMastered ? 'text-on-primary-container' : 'text-outline-variant'
          }`}
          style={isMastered ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          {isMastered ? 'check_circle' : 'history'}
        </span>
      </div>
    </div>
  );
}
