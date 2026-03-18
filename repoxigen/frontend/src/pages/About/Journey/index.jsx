import React from 'react';

const Journey = () => {
  return (
    <section className="relative py-24 bg-oxigen-dark overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-oxigen-light/5 skew-x-12 transform origin-top-right"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-1 bg-white/10 rounded-full border border-white/20 backdrop-blur-md">
              <span className="text-software-bright text-xs font-bold uppercase tracking-widest">Since 20xx</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              From Zero to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-oxigen-light to-hardware-cyan">
                Infinite Possibilities
              </span>
            </h2>
            
            <div className="space-y-4 text-gray-300 leading-relaxed text-justify">
              <p>
                Berawal dari sekumpulan mahasiswa yang memiliki keresahan yang sama akan kurangnya wadah kolaborasi teknologi, 
                UKM OXIGEN lahir sebagai jawaban. Kami bukan sekadar organisasi, melainkan laboratorium hidup.
              </p>
              <p>
                Perjalanan kami diwarnai dengan baris kode yang error, solder yang panas, dan deadline game jam yang mencekam. 
                Namun, itulah yang membentuk DNA kami hari ini: Tangguh, Inovatif, dan Solid.
              </p>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative group">
            {/* Frame Decoration */}
            <div className="absolute -inset-2 bg-gradient-to-r from-software-bright to-game-purple rounded-2xl opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
            
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="/gallery/poto3.JPG" 
                alt="Foto Bersama Anggota OXIGEN" 
                className="w-full h-full object-cover transform transition duration-700 group-hover:scale-105"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-oxigen-dark/80 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-bold text-lg">The First Gen</p>
                <p className="text-gray-300 text-sm">Bandung, 20xx</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Journey;