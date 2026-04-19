export default function DoughnutChart({ percentage = 0, mastered = 0, learning = 0 }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const masteredOffset = circumference - (circumference * percentage) / 100;

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50" cy="50" r={radius}
          fill="transparent"
          stroke="var(--color-surface-container-high)"
          strokeWidth="14"
        />
        {/* Mastered arc */}
        <circle
          cx="50" cy="50" r={radius}
          fill="transparent"
          stroke="var(--color-on-primary-container)"
          strokeWidth="14"
          strokeDasharray={circumference}
          strokeDashoffset={masteredOffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        {/* Learning arc (remaining) */}
        {percentage < 100 && (
          <circle
            cx="50" cy="50" r={radius}
            fill="transparent"
            stroke="var(--color-secondary)"
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * (100 - percentage)) / 100}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              transform: `rotate(${(percentage / 100) * 360}deg)`,
              transformOrigin: '50% 50%',
            }}
          />
        )}
      </svg>

      {/* Center text */}
      <div className="absolute flex flex-col items-center">
        <span className="font-[var(--font-family-headline)] font-extrabold text-5xl text-primary-container">
          {percentage}%
        </span>
        <span className="font-[var(--font-family-label)] text-xs uppercase tracking-widest text-on-surface-variant font-bold">
          Overall Mastery
        </span>
      </div>
    </div>
  );
}
