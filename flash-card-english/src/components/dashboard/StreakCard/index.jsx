export default function StreakCard({ streak = 0 }) {
  return (
    <div className="bg-primary-container rounded-xl p-6 text-white flex items-center justify-between overflow-hidden relative">
      <div className="relative z-10">
        <p className="font-[var(--font-family-label)] text-[10px] uppercase tracking-widest text-on-primary-container font-bold mb-1">
          Current Streak
        </p>
        <p className="font-[var(--font-family-headline)] font-extrabold text-4xl leading-none">
          {streak} Day{streak !== 1 ? 's' : ''}
        </p>
      </div>
      <span
        className="material-symbols-outlined text-6xl text-on-primary-container opacity-40 filled"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        local_fire_department
      </span>
    </div>
  );
}
