import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <section className="relative min-h-[75vh] md:min-h-[80vh] flex flex-col justify-end items-center overflow-hidden pt-12 md:pt-16 pb-0">

      {/* WRAPPER UTAMA */}
      <div className="relative w-full max-w-5xl flex flex-col justify-end items-center flex-grow">

        {/* ELEMENT CAHAYA TELAH DIHAPUS SESUAI PERMINTAAN */}

        <span className="text-5xl font-medium italic font-serif tracking-wide text-slate-500 dark:text-slate-400 normal-case mb-3 md:mb-5 transform -rotate-3">
          {currentLang === 'id' ? 'Hallo, saya' : "Hi, i'm"}
        </span>

        {/* LAPISAN 1 (z-10): TEKS BELAKANG (Sapaan, Andrian & Maulana) */}
        <div className="absolute inset-x-0 bottom-0 transform -translate-y-14 sm:-translate-y-10 md:translate-y-0 flex flex-col items-center justify-center text-center select-none pointer-events-none z-10 font-black tracking-tighter uppercase leading-[0.80]">

          {/* Teks Pengantar - Gaya miring/handwriting, font diperbesar agar jelas di mobile */}


          {/* Baris 1: ANDRIAN */}
          <h1 className="text-[14vw] sm:text-[11vw] md:text-[9rem] lg:text-[10.5rem] text-slate-900/10 dark:text-white/10 tracking-tighter">
            Andrian
          </h1>

          {/* Baris 2: MAULANA */}
          <h1 className="text-[14vw] sm:text-[11vw] md:text-[9rem] lg:text-[10.5rem] text-slate-900/15 dark:text-white/15 tracking-tight my-1 md:my-2">
            Maulana
          </h1>

          {/* Baris 3: DZIKWAN (Disembunyikan dengan invisible di layer ini sebagai penjaga jarak/layout) */}
          <h1 className="text-[14vw] sm:text-[11vw] md:text-[9rem] lg:text-[10.5rem] invisible tracking-tighter">
            Dzikwan
          </h1>
        </div>

        {/* LAPISAN 2 (z-20): FOTO PROFIL */}
        <div className="relative z-20 w-full max-w-[310px] sm:max-w-md md:max-w-[460px] flex items-end justify-center overflow-visible">
          <img
            src="/profile.png"
            alt="Andrian Maulana Dzikwan"
            className="w-full h-auto object-contain max-h-[60vh] md:max-h-[66vh] select-none transform translate-y-1 [mask-image:linear-gradient(to_top,transparent_2%,black_25%)] [-webkit-mask-image:linear-gradient(to_top,transparent_2%,black_25%)]"
            loading="eager"
          />
        </div>

        {/* LAPISAN 3 (z-30): TEKS DEPAN (Dzikwan menimpa foto) */}
        <div className="absolute inset-x-0 bottom-0 transform -translate-y-14 sm:-translate-y-10 md:translate-y-0 flex flex-col items-center justify-center text-center select-none pointer-events-none z-30 font-black tracking-tighter uppercase leading-[0.80]">

          {/* Semua teks di atas disembunyikan (invisible) sebagai struktur agar 'Dzikwan' sejajar sempurna dengan layer belakang */}
          <span className="text-base sm:text-lg md:text-2xl font-medium italic font-serif tracking-wide normal-case mb-3 md:mb-5 transform -rotate-3 invisible">
            {currentLang === 'id' ? 'Hallo, saya' : "Hi, i'm"}
          </span>

          <h1 className="text-[14vw] sm:text-[11vw] md:text-[9rem] lg:text-[10.5rem] invisible tracking-tighter">
            Andrian
          </h1>

          <h1 className="text-[14vw] sm:text-[11vw] md:text-[9rem] lg:text-[10.5rem] invisible tracking-tight my-1 md:my-2">
            Maulana
          </h1>

          {/* Baris 3: DZIKWAN (Hanya baris ini yang tampil utuh di depan foto profil) */}
          <h1 className="text-[14vw] sm:text-[11vw] md:text-[9rem] lg:text-[10.5rem] text-slate-950 dark:text-white tracking-tighter drop-shadow-md">
            Dzikwan
          </h1>
        </div>

      </div>
    </section>
  );
};

export default Hero;