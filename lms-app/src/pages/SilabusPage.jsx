import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProgressStore from '../store/useProgressStore';

const SilabusPage = () => {
  const [silabus, setSilabus] = useState([]);
  
  const completedModules = useProgressStore((state) => state.completedModules);

  useEffect(() => {
    fetch('/silabus.json')
      .then((res) => res.json())
      .then((data) => setSilabus(data))
      .catch((err) => console.error("Gagal memuat silabus:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 text-white font-sans flex flex-col">
      <div className="max-w-3xl mx-auto w-full flex-grow">

        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white font-bold mb-8 transition-colors text-sm">
          ← Kembali ke Beranda
        </Link>
        
        {/* Header */}
        <h1 className="text-4xl font-black mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-software-bright)] to-[var(--color-software-teal)]">
          Peta Perjalanan Belajar
        </h1>
        <p className="text-center mb-12 text-gray-400">
          Pilih dan pelajari materi sesuai dengan kebutuhan eksplorasimu!
        </p>

        <div className="space-y-6">
          {silabus.map((materi) => {
            const isCompleted = completedModules.includes(materi.id);

            return (
              <div 
                key={materi.id}
                className="p-6 rounded-xl border border-gray-800 bg-[#121212] hover:border-[var(--color-software-tosca)] transition-all duration-300 shadow-lg group transform md:hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  
                  <div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-[var(--color-software-bright)] transition-colors">
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
                    className={`px-8 py-3 font-bold rounded-lg transition-colors w-full sm:w-auto text-center ${
                      isCompleted 
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
        
      </div>
    </div>
  );
};

export default SilabusPage;