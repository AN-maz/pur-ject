import { useTranslation } from 'react-i18next';
import { useFadeIn } from '../hooks/useFadeIn';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const animationClass = useFadeIn(0);

  // Komponen Tunggal Ring Meteor SVG yang di-render di dalam Bidang 3D
  const MeteorRing = ({ animClass, id }) => (
    <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id={`meteorGlow-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-software-bright)" stopOpacity="1" />
          <stop offset="50%" stopColor="var(--color-software-tosca)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--color-software-teal)" stopOpacity="0" />
        </linearGradient>

        <filter id={`neonGlow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Track Samar Lintasan */}
      <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(32, 201, 151, 0.18)" strokeWidth="2" />

      {/* Meteor Bergerak */}
      <circle
        cx="200"
        cy="200"
        r="160"
        fill="none"
        stroke={`url(#meteorGlow-${id})`}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="180 820"
        className={animClass}
        filter={`url(#neonGlow-${id})`}
      />
    </svg>
  );

  return (
    <section className={`relative min-h-[75vh] md:min-h-[80vh] flex flex-col justify-end items-center overflow-hidden pt-12 md:pt-16 pb-0 ${animationClass}`}>

      {/* WRAPPER UTAMA */}
      <div className="relative w-full max-w-5xl flex flex-col justify-end items-center flex-grow">

        {/* SAPAAN ATAS */}
        <span className="text-5xl font-medium italic font-serif tracking-wide text-slate-500 dark:text-slate-400 normal-case mb-3 md:mb-5 transform -rotate-3 select-none">
          {currentLang === 'id' ? 'Hallo, saya' : "Hi, i'm"}
        </span>

        {/* LAPISAN 1: TEKS BELAKANG */}
        <div className="absolute inset-x-0 bottom-0 transform -translate-y-14 sm:-translate-y-10 md:translate-y-0 flex flex-col items-center justify-center text-center select-none pointer-events-none z-10 font-black tracking-tighter uppercase leading-[0.80]">
          <h1 className="text-[14vw] sm:text-[11vw] md:text-[9rem] lg:text-[10.5rem] text-slate-900/10 dark:text-white/10 tracking-tighter">
            Andrian
          </h1>
          <h1 className="text-[14vw] sm:text-[11vw] md:text-[9rem] lg:text-[10.5rem] text-slate-900/15 dark:text-white/15 tracking-tight my-1 md:my-2">
            Maulana
          </h1>
          <h1 className="text-[14vw] sm:text-[11vw] md:text-[9rem] lg:text-[10.5rem] invisible tracking-tighter">
            Dzikwan
          </h1>
        </div>

        {/* CONTAINER UTAMA DENGAN RUANG PERSPEKTIF 3D */}
        <div className="relative z-20 w-full max-w-[310px] sm:max-w-md md:max-w-[460px] flex items-end justify-center overflow-visible [perspective:1000px] [transform-style:preserve-3d]">
          
          {/* FOTO PROFIL (Berada persis di sumbu Z = 0) */}
          <img
            src="/profile.png"
            alt="Andrian Maulana Dzikwan"
            className="w-full h-auto object-contain max-h-[60vh] md:max-h-[66vh] select-none transform translate-y-1 [mask-image:linear-gradient(to_top,transparent_2%,black_25%)] [-webkit-mask-image:linear-gradient(to_top,transparent_2%,black_25%)] drop-shadow-[0_15px_25px_rgba(0,0,0,0.2)] [transform:translateZ(0px)]"
            loading="eager"
          />

          {/* LINTASAN 1: Horizontal (0 Deg) - Dimiringkan secara 3D */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] md:w-[620px] md:h-[620px] pointer-events-none [transform-style:preserve-3d] [transform:rotateZ(0deg)_rotateX(72deg)]">
            <MeteorRing animClass="animate-meteor-1" id="m1" />
          </div>

          {/* LINTASAN 2: Miring Kanan (60 Deg) - Dimiringkan secara 3D */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] md:w-[620px] md:h-[620px] pointer-events-none [transform-style:preserve-3d] [transform:rotateZ(60deg)_rotateX(72deg)]">
            <MeteorRing animClass="animate-meteor-2" id="m2" />
          </div>

          {/* LINTASAN 3: Miring Kiri (120 Deg) - Dimiringkan secara 3D */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] md:w-[620px] md:h-[620px] pointer-events-none [transform-style:preserve-3d] [transform:rotateZ(120deg)_rotateX(72deg)]">
            <MeteorRing animClass="animate-meteor-3" id="m3" />
          </div>

        </div>

        {/* LAPISAN 3: TEKS DEPAN (DZIKWAN) */}
        <div className="absolute inset-x-0 bottom-0 transform -translate-y-14 sm:-translate-y-10 md:translate-y-0 flex flex-col items-center justify-center text-center select-none pointer-events-none z-30 font-black tracking-tighter uppercase leading-[0.80]">
          <span className="text-base sm:text-lg md:text-2xl font-medium italic font-serif tracking-wide normal-case mb-3 md:mb-5 transform -rotate-3 invisible">
            {currentLang === 'id' ? 'Hallo, saya' : "Hi, i'm"}
          </span>
          <h1 className="text-[14vw] sm:text-[11vw] md:text-[9rem] lg:text-[10.5rem] invisible tracking-tighter">
            Andrian
          </h1>
          <h1 className="text-[14vw] sm:text-[11vw] md:text-[9rem] lg:text-[10.5rem] invisible tracking-tight my-1 md:my-2">
            Maulana
          </h1>
          <h1 className="text-[14vw] sm:text-[11vw] md:text-[9rem] lg:text-[10.5rem] text-slate-950 dark:text-white tracking-tighter drop-shadow-md">
            Dzikwan
          </h1>
        </div>

      </div>
    </section>
  );
};

export default Hero;