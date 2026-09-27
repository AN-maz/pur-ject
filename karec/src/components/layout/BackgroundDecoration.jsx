export default function BackgroundDecoration() {
  return (
    <>
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-ec-red/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
      </div>

      <div className="fixed inset-0 -z-40 pointer-events-none opacity-[0.015]">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </>
  );
}