import React, { useState } from 'react';
import { Code, Cpu, Gamepad2, ArrowUpRight, Crosshair } from 'lucide-react';

const divisions = [
  {
    id: 'software',
    title: 'Software',
    role: 'The Architect',
    desc: 'Merancang kode, membangun sistem, dan menciptakan realitas digital.',
    projectUrl: 'https://oxi-camp.netlify.app/',
    icon: <Code size={32} className="md:w-10 md:h-10" />,
    color: 'var(--color-software-bright)',
    bgGradient: 'from-gray-900 to-[var(--color-software-teal)]',
  },
  {
    id: 'hardware',
    title: 'Hardware',
    role: 'The Engineer',
    desc: 'Merakit logika, menghidupkan mesin, dan menjembatani fisik dengan digital.',
    projectUrl: 'https://oxi-camp.netlify.app/',
    icon: <Cpu size={32} className="md:w-10 md:h-10" />,
    color: 'var(--color-hardware-cyan)',
    bgGradient: 'from-gray-900 to-[var(--color-hardware-royal)]',
  },
  {
    id: 'game',
    title: 'Game Dev',
    role: 'The Creator',
    desc: 'Menciptakan dunia, menyusun skenario, dan memberikan pengalaman imersif.',
    projectUrl: 'https://oxi-camp.netlify.app/',
    icon: <Gamepad2 size={32} className="md:w-10 md:h-10" />,
    color: 'var(--color-game-red)',
    bgGradient: 'from-gray-900 to-[var(--color-game-purple)]',
  }
];

const Divisions = () => {
  const [activeId, setActiveId] = useState('software');

  // --- LOGIC BARU: MENCEGAH BUG DI MOBILE ---
  const handleMouseEnter = (id) => {
    if (window.innerWidth >= 768) {
      setActiveId(id);
    }
  };

  return (
    <section id="division" className="relative py-20 bg-slate-50 overflow-hidden flex flex-col justify-center">
      
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-40" 
           style={{ backgroundImage: 'radial-gradient(#ccc 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-oxigen-dark uppercase tracking-tighter">
            Choose Your <span className="text-oxigen-light">Role</span>
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Tap kartu untuk melihat detail role
          </p>
        </div>

        {/* INTERACTIVE CARDS CONTAINER */}
        <div className="flex flex-col md:flex-row gap-4 h-[750px] md:h-[450px] w-full max-w-6xl mx-auto transition-all duration-500">
          
          {divisions.map((div) => {
            const isActive = activeId === div.id;

            return (
              <div
                key={div.id}
                onClick={() => setActiveId(div.id)}
                onMouseEnter={() => handleMouseEnter(div.id)}
                
                className={`
                  relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                  ${isActive 
                    ? 'flex-[5] shadow-2xl scale-100 ring-2 ring-offset-2 ring-transparent' 
                    : 'flex-[1] opacity-80 hover:opacity-100 grayscale hover:grayscale-0 scale-[0.98]'
                  }
                `}
                style={{
                   boxShadow: isActive ? `0 20px 50px -12px ${div.color}` : 'none',
                   '--tw-ring-color': isActive ? div.color : 'transparent'
                }}
              >
                {/* Background Image/Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${div.bgGradient} opacity-90`}></div>
                
                {/* Scanlines Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_4px,6px_100%] pointer-events-none"></div>

                {/* CONTENT WRAPPER */}
                <div className={`relative z-10 h-full flex flex-col p-6 md:p-8 ${isActive ? 'justify-between' : 'justify-center items-center md:items-start'}`}>
                  
                  {/* Top: Icon & Division Name */}
                  <div className="flex items-center gap-3 md:gap-4 transition-all duration-500">
                    <div 
                      className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white transition-colors duration-300"
                      style={{ color: isActive ? div.color : 'white' }}
                    >
                      {div.icon}
                    </div>
                    
                    <h3 className={`
                      font-bold text-white uppercase tracking-widest transition-all duration-300
                      ${isActive ? 'text-xl md:text-2xl opacity-100' : 'text-sm md:text-2xl opacity-100 md:opacity-0 md:hidden'}
                    `}>
                      {div.title}
                    </h3>
                  </div>

                  <div className={`
                    space-y-4 transition-all duration-500 transform w-full
                    ${isActive ? 'translate-y-0 opacity-100 delay-100' : 'translate-y-10 opacity-0 hidden'}
                  `}>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Crosshair size={14} className="text-white/50" />
                        <span className="text-[10px] md:text-xs font-mono text-white/70 uppercase">Class Type</span>
                      </div>
                      <h4 
                        className="text-2xl md:text-4xl font-black uppercase italic truncate"
                        style={{ color: div.color, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                      >
                        {div.role}
                      </h4>
                      <p className="text-gray-300 mt-2 text-xs md:text-base leading-relaxed max-w-md line-clamp-3 md:line-clamp-none">
                        {div.desc}
                      </p>
                    </div>

                    {/* BUTTON */}
                    <a 
                      href={div.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full md:w-auto gap-2 px-5 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors group text-sm md:text-base"
                      onClick={(e) => e.stopPropagation()} 
                    >
                      Lihat Hasil Project
                      <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>

                  </div>

                  {!isActive && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block whitespace-nowrap">
                       <span className="text-white/50 font-bold text-xl uppercase tracking-[0.2em] [writing-mode:vertical-rl] rotate-180">
                         {div.title}
                       </span>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Divisions;