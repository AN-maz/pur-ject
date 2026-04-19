import { useLocation, useNavigate } from 'react-router-dom';

export default function SessionComplete() {
  const location = useLocation();
  const navigate = useNavigate();
  const stats = location.state || {
    totalWords: 0,
    completedCount: 0,
    incorrectCount: 0,
    accuracy: 0,
    duration: 0,
    mode: 'flashcard',
  };

  const formatDuration = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}m ${sec}s`;
  };

  return (
    <div className="px-6 pt-12 max-w-lg mx-auto text-center">
      {/* Success Icon */}
      <div className="w-24 h-24 rounded-full bg-primary-container mx-auto flex items-center justify-center mb-8 ambient-shadow-strong">
        <span
          className="material-symbols-outlined text-5xl text-white"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          emoji_events
        </span>
      </div>

      <h1 className="font-[var(--font-family-headline)] font-extrabold text-4xl text-primary-container mb-3 tracking-tight">
        Session Complete!
      </h1>

      <p className="text-on-surface-variant font-[var(--font-family-body)] text-lg mb-10">
        Excellent work, Scholar. Here's your performance summary.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-surface-container-lowest rounded-xl p-6 ghost-border">
          <p className="font-[var(--font-family-label)] text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
            Words Mastered
          </p>
          <p className="font-[var(--font-family-headline)] font-extrabold text-3xl text-primary-container">
            {stats.completedCount}
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 ghost-border">
          <p className="font-[var(--font-family-label)] text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
            Accuracy
          </p>
          <p className="font-[var(--font-family-headline)] font-extrabold text-3xl text-on-primary-container">
            {stats.accuracy}%
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 ghost-border">
          <p className="font-[var(--font-family-label)] text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
            Time Spent
          </p>
          <p className="font-[var(--font-family-headline)] font-extrabold text-3xl text-primary-container">
            {formatDuration(stats.duration)}
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 ghost-border">
          <p className="font-[var(--font-family-label)] text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">
            Mode
          </p>
          <p className="font-[var(--font-family-headline)] font-extrabold text-xl text-primary-container capitalize">
            {stats.mode}
          </p>
        </div>
      </div>

      {/* Incorrect count info */}
      {stats.incorrectCount > 0 && (
        <div className="bg-secondary-fixed rounded-xl p-4 mb-8">
          <p className="text-on-secondary-fixed text-sm font-[var(--font-family-body)]">
            <span className="font-bold">{stats.incorrectCount} incorrect attempts</span> were made — those words were re-queued and you eventually mastered them all. 💪
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-4 pb-8">
        <button
          onClick={() => navigate('/setup')}
          className="btn-gradient font-[var(--font-family-label)] font-semibold text-sm tracking-widest uppercase py-4 px-10 rounded-full ambient-shadow-strong inline-flex items-center justify-center gap-3"
        >
          Start Another Session
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>

        <button
          onClick={() => navigate('/')}
          className="font-[var(--font-family-label)] font-bold text-sm text-on-surface-variant hover:text-primary-container transition-colors py-3 uppercase tracking-wider"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
