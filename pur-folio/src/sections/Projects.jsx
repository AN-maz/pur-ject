import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiFolder, FiGithub, FiX, FiChevronLeft, FiChevronRight, FiMousePointer } from 'react-icons/fi';
import portfolioData from '../data/portfolioData.json';

const Projects = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // States
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman aktif

  const { projects } = portfolioData;
  const itemsPerPage = 4; // Batasan display 4 data per halaman

  // 1. Filter project berdasarkan status
  const filteredProjects = projects.filter((project) => {
    if (filterStatus === 'all') return true;
    return project.status === filterStatus;
  });

  // 2. Logika Hitung Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  // Reset ke halaman 1 setiap kali filter kategori diubah
  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  // Fungsi Slider Gambar di dalam Modal
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1));
  };

  return (
    <section id="projects" className="border-t pt-16 dark:border-slate-800">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t('nav.projects')}</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            {currentLang === 'id' ? 'Beberapa aplikasi yang telah dan sedang saya kembangkan.' : 'Some applications I have developed and am currently working on.'}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-center">
          {['all', 'completed', 'ongoing'].map((status) => (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
              className={`px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-all capitalize ${filterStatus === status
                ? 'bg-white text-blue-600 shadow dark:bg-slate-700 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
            >
              {status === 'all' ? (currentLang === 'id' ? 'Semua' : 'All') : t(`projectStatus.${status}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => { setSelectedProject(project); setCurrentImgIndex(0); }}
            className="group relative flex flex-col justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-xl dark:hover:border-blue-500/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
                  <FiFolder size={22} />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${project.status === 'completed' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                  }`}>
                  {t(`projectStatus.${project.status}`)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {project.description[currentLang]}
              </p>
            </div>

            {/* Footer Card (Tech Stack & UX Hint) */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Indikator permanen yang ramah mobile & desktop */}
              <span className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-lg group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-slate-900 transition-all duration-300">
                <FiMousePointer size={12} className="animate-pulse" />
                {currentLang === 'id' ? 'Lihat Detail' : 'View Details'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* TAMPILAN NOMOR PAGINATION (Hanya muncul jika halaman > 1) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl border dark:border-slate-800 bg-white dark:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <FiChevronLeft size={18} />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 font-medium text-sm rounded-xl transition-all ${currentPage === index + 1
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'bg-white dark:bg-slate-900 border dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl border dark:border-slate-800 bg-white dark:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      )}

      {/* MODAL DETAIL POPUP */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border dark:border-slate-800 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Header Modal */}
            <div className="flex justify-between items-center p-5 border-b dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedProject.title}</h3>
              <button onClick={() => setSelectedProject(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400">
                <FiX size={20} />
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Slider Image */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="relative aspect-video w-full rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img src={selectedProject.images[currentImgIndex]} alt={`Screenshot ${currentImgIndex + 1}`} className="w-full h-full object-cover select-none" />
                  {selectedProject.images.length > 1 && (
                    <>
                      <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"><FiChevronLeft size={20} /></button>
                      <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"><FiChevronRight size={20} /></button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {selectedProject.images.map((_, idx) => (
                          <div key={idx} className={`h-2 w-2 rounded-full transition-all ${currentImgIndex === idx ? 'bg-white w-4' : 'bg-white/50'}`} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Description</h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">{selectedProject.description[currentLang]}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech, idx) => (
                    <span key={idx} className="text-xs font-semibold px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-5 border-t dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3">
              {selectedProject.github && (
                <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity">
                  <FiGithub size={16} /> GitHub Repository
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;