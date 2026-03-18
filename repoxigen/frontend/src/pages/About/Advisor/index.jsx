import React from 'react';
import { Quote } from 'lucide-react';

const Advisor = () => {
  return (
    <section className="relative py-20 bg-slate-50 overflow-hidden">
      
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#001A57 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-10">
          
          {/* Image Section (PNG Transparent diharapkan) */}
          <div className="relative shrink-0 w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-gradient-to-tr from-oxigen-light to-software-tosca rounded-full blur-3xl opacity-20"></div>
            <img 
              src="/pembina.png" 
              alt="Pembina UKM Oxigen" 
              className="relative z-10 w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 text-center md:text-left">
            <Quote size={48} className="text-oxigen-light/20 mx-auto md:mx-0 mb-4" />
            
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Bapak Muhammad Ikhwan Fathulloh, M.Kom.
            </h3>
            
            {/* Jabatan / Title */}
            <div className="flex flex-col md:flex-row gap-2 md:items-center justify-center md:justify-start mb-6">
              <span className="px-3 py-1 bg-oxigen-dark text-white text-xs font-bold uppercase rounded-md">
                Pembina OXIGEN UTB
              </span>
              <span className="hidden md:block text-gray-400">•</span>
              <span className="text-oxigen-light font-semibold text-sm">
                Direktur Pusdatin UTB | Dosen
              </span>
            </div>

            <blockquote className="text-gray-600 text-lg italic leading-relaxed mb-6">
              "Mahasiswa tidak hanya dituntut pintar secara akademik, tetapi juga harus adaptif terhadap teknologi. 
              OXIGEN adalah tempat terbaik untuk mengubah teori menjadi karya nyata yang berdampak bagi masyarakat."
            </blockquote>

            {/* Signature / Decoration */}
            <div className="h-1 w-20 bg-gradient-to-r from-oxigen-light to-transparent mx-auto md:mx-0 rounded-full"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Advisor;