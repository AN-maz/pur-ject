import { useTranslation } from 'react-i18next';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import portfolioData from '../data/portfolioData.json';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const { profile } = portfolioData;

  // Mendapatkan tahun saat ini secara dinamis
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Sisi Kiri: Nama & Status Ketersediaan */}
          <div className="text-center md:text-left space-y-1">
            <p className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">
              {profile.name}
            </p>
            <p className="text-xs flex items-center justify-center md:justify-start gap-1.5 text-slate-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {currentLang === 'id' 
                ? 'Tersedia untuk proyek & magang' 
                : 'Available for projects & internships'}
            </p>
          </div>

          {/* Sisi Tengah: Hak Cipta */}
          <div className="text-xs text-slate-400 dark:text-slate-500 text-center order-3 md:order-2">
            <p className="flex items-center justify-center gap-1">
              &copy; {currentYear} All rights reserved. Made with 
              <FiHeart size={10} className="fill-rose-500 text-rose-500 animate-pulse" /> 
              using React & Tailwind
            </p>
          </div>

          {/* Sisi Kanan: Tautan Ikon Sosmed */}
          <div className="flex items-center gap-4 order-2 md:order-3 text-slate-500 dark:text-slate-400">
            <a 
              href="https://github.com/username" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
              aria-label="GitHub"
            >
              <FiGithub size={18} />
            </a>
            <a 
              href="https://linkedin.com/in/username" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={18} />
            </a>
            <a 
              href="mailto:emailkamu@gmail.com" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
              aria-label="Email"
            >
              <FiMail size={18} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;