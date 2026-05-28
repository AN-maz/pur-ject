import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useProgressStore from '../store/useProgressStore';
import MarkdownViewer from '../components/MarkdownViewer';

const MateriPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [materiTitle, setMateriTitle] = useState("");
  const [sections, setSections] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [loading, setLoading] = useState(true);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const markAsCompleted = useProgressStore((state) => state.markAsCompleted);

  useEffect(() => {
    setLoading(true);
    fetch('/silabus.json')
      .then(res => res.json())
      .then(data => {
        const currentMateri = data.find(m => m.id === parseInt(id));
        if (currentMateri) {
          setMateriTitle(currentMateri.title);
          return fetch(currentMateri.file);
        } else {
          throw new Error("Materi tidak ditemukan");
        }
      })
      .then(res => {
        if (!res.ok) throw new Error("File markdown gagal dimuat");
        return res.text();
      })
      .then(text => {
        const rawSections = text.split(/(?=^#\s)/m).filter(s => s.trim() !== '');
        
        const parsedSections = rawSections.map((sec) => {
          const lines = sec.trim().split('\n');
          const titleLine = lines[0].replace(/^#+\s/, ''); 
          return { title: titleLine, content: sec };
        });

        setSections(parsedSections);
        setCurrentIndex(0); 
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setSections([{ title: "Error", content: "## ⚠️ Maaf, materi gagal dimuat." }]);
        setLoading(false);
      });
  }, [id]);

  const handleSelesai = () => {
    markAsCompleted(parseInt(id));
    navigate('/materi', {state: {lastModuleId:parseInt(id)}});
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0a]">
        <div className="animate-pulse text-2xl font-bold text-[var(--color-software-bright)]">Menyiapkan Ruang Belajar...</div>
      </div>
    );
  }

  const isLastPage = currentIndex === sections.length - 1;
  const progressPercentage = Math.round(((currentIndex + 1) / sections.length) * 100);

  return (
    <div className="h-screen w-full flex bg-[#0a0a0a] text-gray-200 overflow-hidden font-sans relative">
      
      <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar relative">
        
        {/* Header Mobile (Hanya muncul di HP) */}
        <div className="md:hidden sticky top-0 z-40 bg-[#121212] border-b border-gray-800 p-4 flex justify-between items-center shadow-md">
          <Link to="/materi" state={{ lastModuleId: parseInt(id) }} className="text-[var(--color-software-tosca)] font-bold text-sm">
            ← Kembali
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-white flex items-center gap-2 text-sm font-bold bg-gray-800 px-3 py-1.5 rounded-md"
          >
            Daftar Isi ☰
          </button>
        </div>

        <div className="max-w-4xl mx-auto w-full px-6 py-8 md:px-12 md:py-16 flex-grow flex flex-col">
          <div className="flex-grow">
            <div className="text-[var(--color-software-teal)] font-bold text-sm tracking-wider uppercase mb-2">
              {materiTitle}
            </div>
            
            <MarkdownViewer content={sections[currentIndex]?.content || ""} />
          </div>

          <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button 
              onClick={() => {
                setCurrentIndex(prev => Math.max(0, prev - 1));
                document.querySelector('.flex-1.overflow-y-auto').scrollTo({ top: 0, behavior: 'smooth' }); 
              }}
              disabled={currentIndex === 0}
              className="px-6 py-3 bg-[#1a1a1a] text-white rounded-lg font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 border border-gray-700 w-full sm:w-auto transition-colors"
            >
              ← Sebelumnya
            </button>

            {isLastPage ? (
              <button 
                onClick={handleSelesai}
                className="px-8 py-3 bg-[var(--color-software-bright)] text-black font-extrabold rounded-lg hover:bg-[#2de54c] shadow-[0_0_15px_rgba(57,255,90,0.3)] w-full sm:w-auto transition-all"
              >
                ✅ Selesai & Lanjut
              </button>
            ) : (
              <button 
                onClick={() => {
                  setCurrentIndex(prev => Math.min(sections.length - 1, prev + 1));
                  document.querySelector('.flex-1.overflow-y-auto').scrollTo({ top: 0, behavior: 'smooth' }); 
                }}
                className="px-8 py-3 bg-[var(--color-software-tosca)] text-black font-bold rounded-lg hover:bg-[#1db88a] shadow-[0_0_15px_rgba(32,201,151,0.2)] w-full sm:w-auto transition-colors"
              >
                Selanjutnya →
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={`
        fixed inset-y-0 right-0 z-50 w-80 bg-[#121212] border-l border-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} 
        md:relative md:translate-x-0 flex-shrink-0
      `}>
        
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#0a0a0a]">
          <Link to="/materi" state={{ lastModuleId: parseInt(id) }} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors">
            <span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs">←</span>
            Peta Belajar
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <div className="p-5 border-b border-gray-800">
          <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
            <span>PROGRES MATERI</span>
            <span className="text-[var(--color-software-tosca)]">{progressPercentage}% Selesai</span>
          </div>
          <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--color-software-tosca)] transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          <ul className="flex flex-col">
            {sections.map((sec, idx) => {
              const isActive = currentIndex === idx;
              const isPassed = idx < currentIndex;
              
              return (
                <li key={idx}>
                  <button
                    onClick={() => {
                      setCurrentIndex(idx);
                      if (window.innerWidth < 768) setIsSidebarOpen(false);
                      document.querySelector('.flex-1.overflow-y-auto').scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-5 py-4 text-sm transition-colors flex justify-between items-center ${
                      isActive 
                        ? 'bg-[#1a1a1a] border-l-4 border-[var(--color-software-bright)] text-white font-bold' 
                        : 'border-l-4 border-transparent text-gray-400 hover:bg-[#161616] hover:text-gray-200'
                    }`}
                  >
                    <span className="flex-grow pr-3 leading-snug">
                      {sec.title}
                    </span>
                    
                    {isPassed && (
                      <span className="text-[var(--color-software-teal)] font-bold">✓</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        
      </div>
      

      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity"
        ></div>
      )}

    </div>
  );
};

export default MateriPage;