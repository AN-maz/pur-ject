import { useTranslation } from 'react-i18next';

// SOLUSI JITU: Menggunakan Font Awesome untuk ikon Java demi kestabilan build Vite
import { FaJava } from 'react-icons/fa';

// Sisa ikon teknologi lainnya dari Simple Icons (Sudah divalidasi aman)
import { 
  SiJavascript, 
  SiKotlin, 
  SiReact, 
  SiTailwindcss, 
  SiExpress, 
  SiMongodb, 
  SiAstro, 
  SiMysql, 
  SiFirebase, 
  SiBootstrap 
} from 'react-icons/si';

import { FiUser, FiCode, FiAward } from 'react-icons/fi';

const About = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Data Tech Stack yang sudah disesuaikan secara presisi
  const techStacks = [
    { name: 'Java', icon: <FaJava className="text-[#007396]" /> },
    { name: 'JavaScript', icon: <SiJavascript className="text-[#F7DF1E] bg-black rounded-[4px]" /> },
    { name: 'Kotlin', icon: <SiKotlin className="text-[#7F52FF]" /> },
    { name: 'React', icon: <SiReact className="text-[#61DAFB]" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { name: 'Express', icon: <SiExpress className="text-slate-800 dark:text-white" /> },
    { name: 'MongoDB', icon: <SiMongodb className="text-[#47A248]" /> },
    { name: 'Astro', icon: <SiAstro className="text-[#FF5D01]" /> },
    { name: 'MySQL', icon: <SiMysql className="text-[#4479A1]" /> },
    { name: 'Firebase', icon: <SiFirebase className="text-[#FFCA28]" /> },
    { name: 'Bootstrap', icon: <SiBootstrap className="text-[#7952B3]" /> },
  ];

  return (
    <section id="about" className="border-t pt-20 dark:border-slate-800 mb-28">
      {/* Header Seksi */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <FiUser size={22} />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('nav.about')}
          </h2>
        </div>
        <div className="h-1 w-20 bg-blue-600 dark:bg-blue-400 rounded-full ml-16" />
      </div>

      {/* Grid Utama Layout Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* KOLOM KIRI: NARASI PROFESIONAL (7 Kolom) */}
        <div className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed text-justify px-2">
          {currentLang === 'id' ? (
            <>
              <p>
                Saya adalah mahasiswa **Teknik Informatika dari Universitas Teknologi Bandung**, saat ini berada di semester 4 dengan pondasi kuat dalam rekayasa perangkat lunak. Fokus eksplorasi dan pendalaman akademik saya kini berpusat pada ranah **Cybersecurity** sebagai ruang lingkup profesional baru yang menantang.
              </p>
              <p>
                Dalam pengembangan aplikasi, saya memiliki kapabilitas merancang sistem aplikasi web maupun desktop menggunakan **Java**. Guna memperluas portofolio solusi digital, saya juga aktif mendedikasikan ilmu yang saya miliki untuk mentransformasikan masalah nyata menjadi solusi produk digital melalui keterlibatan di organisasi kampus dan kepanitiaan.
              </p>
              <p>
                Saya percaya bahwa nilai tertinggi dari sebuah teknologi adalah ketika ia mampu memberikan dampak positif, kebermanfaatan nyata, dan solusi praktis bagi orang di sekitar. Melalui produk digital yang saya bangun, saya selalu berusaha untuk melihat hasil dari ilmu yang saya miliki dan memastikan ia bermanfaat untuk lingkungan sekitar.
              </p>
            </>
          ) : (
            <>
              <p>
                I am an **Informatics Engineering student from Universitas Teknologi Bandung**, currently in my 4th semester with a solid software engineering foundation. My academic focus and deep-dive exploration now center around **Cybersecurity** as a dynamic new professional domain.
              </p>
              <p>
                On the development side, I have the capability to design web and desktop application systems using **Java**. Driven by a passion to expand my digital solution portfolio, I am scaling my expertise into **Android** development, turning real structural problems into practical, inclusive solutions through my active role in campus organizations and committees.
              </p>
              <p>
                I firmly believe that the ultimate value of technology lies in its ability to generate meaningful impact, real benefit, and sustainable solutions for the community. Through the digital products I build, I always strive to see the results of my knowledge and ensure it benefits the environment around me.
              </p>
            </>
          )}
        </div>

        {/* KOLOM KANAN: TECH STACK VISUAL BADGES (5 Kolom) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card Tech Stack */}
          <div className="p-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl shadow-slate-100/40 dark:shadow-none hover:border-blue-500 transition-colors">
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2.5">
              <FiCode className="text-blue-500" />
              {currentLang === 'id' ? 'Keahlian Teknologi' : 'Technical Skills'}
            </h3>
            
            <div className="flex flex-wrap gap-2.5">
              {techStacks.map((tech, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-500 dark:hover:border-blue-400 hover:-translate-y-1 hover:shadow-md transition-all duration-200 select-none cursor-default group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {tech.icon}
                  </span>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fokus Tambahan Card */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl text-white shadow-lg shadow-blue-500/20">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest opacity-80 flex items-center gap-1.5 mb-1.5">
                  <FiAward /> Current Academic Focus Domain
                </h4>
                <p className="text-xl font-black tracking-tight leading-tight">
                  🔒 Cybersecurity & Android Dev
                </p>
              </div>
              <div className="p-2.5 bg-white/10 rounded-xl">
                <SiKotlin className="text-white text-lg" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;