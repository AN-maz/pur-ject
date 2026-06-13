import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiBriefcase, FiCalendar, FiAward } from 'react-icons/fi';
import portfolioData from '../data/portfolioData.json';

const Experience = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // State untuk mengontrol tab yang aktif ('organization' atau 'committee')
  const [activeTab, setActiveTab] = useState('organization');
  
  const { experiences } = portfolioData;
  const currentData = experiences[activeTab];

  return (
    <section id="experience" className="border-t pt-16 dark:border-slate-800">
      {/* Header Sektor */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            {t('nav.experience')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            {currentLang === 'id' 
              ? 'Rekam jejak kontribusi saya di lingkungan kampus dan komunitas.' 
              : 'My track record of contributions within the campus environment and community.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-center">
          <button
            onClick={() => setActiveTab('organization')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'organization'
                ? 'bg-white text-blue-600 shadow dark:bg-slate-700 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FiBriefcase size={16} />
            {currentLang === 'id' ? 'Organisasi' : 'Organizations'}
          </button>
          <button
            onClick={() => setActiveTab('committee')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'committee'
                ? 'bg-white text-blue-600 shadow dark:bg-slate-700 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FiAward size={16} />
            {currentLang === 'id' ? 'Kepanitiaan' : 'Committees'}
          </button>
        </div>
      </div>

      {/* LINI MASA VERTIKAL (TIMELINE STRUCTURE) */}
      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-6 space-y-10 pb-4">
        {currentData.map((exp) => (
          <div key={exp.id} className="relative pl-8 group">
            
            {/* Titik / Node Lini Masa */}
            <div className="absolute -left-[11px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-blue-600 dark:bg-slate-950 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-600 group-hover:bg-white" />
            </div>

            {/* Kotak Konten Pengalaman */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl group-hover:shadow-lg dark:group-hover:border-slate-700 transition-all duration-300">
              
              {/* Header: Jabatan & Waktu */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {currentLang === 'id' ? exp.role : exp.roleEn}
                  </h3>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {exp.company}
                  </span>
                </div>
                
                {/* Badge Waktu */}
                <div className="flex items-center gap-1.5 self-start md:self-center text-xs font-medium px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg">
                  <FiCalendar size={12} />
                  {exp.period}
                </div>
              </div>

              {/* Deskripsi Tugas / Dampak */}
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {currentLang === 'id' ? exp.descId : exp.descEn}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;