export default function DailyProgressCard({ todayLearned = 0, dailyGoal = 60 }) {
  const progress = Math.min((todayLearned / dailyGoal) * 100, 100);

  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col justify-between h-full ghost-border">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-secondary-fixed flex items-center justify-center rounded-xl">
          <span className="material-symbols-outlined text-secondary">trending_up</span>
        </div>
        <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
          Today
        </span>
      </div>

      <div>
        <p className="font-[var(--font-family-headline)] font-extrabold text-4xl text-primary-container mb-1">
          {todayLearned}
        </p>
        <p className="font-[var(--font-family-body)] text-on-surface-variant font-medium text-sm">
          New words integrated into your long-term memory today.
        </p>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
          <div
            className="h-full bg-on-primary-fixed-variant rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-bold text-on-surface-variant">
          {todayLearned}/{dailyGoal}
        </span>
      </div>
    </div>
  );
}
