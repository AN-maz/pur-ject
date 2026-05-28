import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useProgressStore from '../store/useProgressStore';

const SilabusPage = () => {
  const [silabus, setSilabus] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const completedModules = useProgressStore((state) => state.completedModules);

  const location = useLocation();

  useEffect(() => {
    fetch('/silabus.json')
      .then((res) => res.json())
      .then((data) => setSilabus(data))
      .catch((err) => console.error("Gagal memuat silabus:", err));
  }, []);

  useEffect(() => {
  
    if (silabus.length > 0 && location.state && location.state.lastModuleId) {
      const moduleIndex = silabus.findIndex(m => m.id === location.state.lastModuleId);

      if (moduleIndex !== -1) {
        const targetPage = Math.floor(moduleIndex / itemsPerPage) + 1;
        setCurrentPage(targetPage);
      }
    }
  }, [silabus, location.state]); //

  const totalPages = Math.ceil(silabus.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = silabus.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8 text-white font-sans flex flex-col">
      <div className="max-w-3xl mx-auto w-full flex-grow">

        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white font-bold mb-8 transition-colors text-sm">
          ← Kembali ke Beranda
        </Link>

        <h1 className="text-4xl font-black mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-software-bright)] to-[var(--color-software-teal)]">
          Peta Perjalanan Belajar
        </h1>
        <p className="text-center mb-12 text-gray-400">
          Pilih dan pelajari materi sesuai dengan kebutuhan eksplorasimu!
        </p>

        <div className="space-y-6 min-h-[400px]">
          {currentItems.map((materi) => {
            const isCompleted = completedModules.includes(materi.id);

            return (
              <div
                key={materi.id}
                className="p-6 rounded-xl border border-gray-800 bg-[#121212] hover:border-[var(--color-software-tosca)] transition-all duration-300 shadow-lg group transform md:hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[var(--color-software-bright)] transition-colors">
                      {materi.title}
                    </h2>

                    {isCompleted && (
                      <span className="inline-block mt-3 px-3 py-1 bg-[#1a2b4c] text-[var(--color-software-tosca)] text-xs rounded border border-[var(--color-software-teal)] font-bold tracking-wider uppercase">
                        ✓ Telah Diselesaikan
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/materi/${materi.id}`}
                    className={`px-8 py-3 font-bold rounded-lg transition-colors w-full sm:w-auto text-center flex-shrink-0 ${isCompleted
                        ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                        : 'bg-[var(--color-software-tosca)] text-black hover:bg-[var(--color-software-bright)] shadow-[0_0_15px_rgba(32,201,151,0.2)]'
                      }`}
                  >
                    {isCompleted ? 'Baca Ulang' : 'Mulai Belajar'}
                  </Link>

                </div>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">

            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-2.5 bg-[#121212] text-white rounded-lg font-bold border border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 w-full sm:w-auto transition-colors"
            >
              ← Sebelumnya
            </button>

            <div className="flex items-center gap-2">
              {/* Indikator angka halaman */}
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`w-10 h-10 rounded-lg font-bold transition-colors ${currentPage === i + 1
                      ? 'bg-[var(--color-software-tosca)] text-black'
                      : 'bg-[#121212] text-gray-400 border border-gray-700 hover:bg-gray-800 hover:text-white'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-6 py-2.5 bg-[#121212] text-white rounded-lg font-bold border border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 w-full sm:w-auto transition-colors"
            >
              Selanjutnya →
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default SilabusPage;