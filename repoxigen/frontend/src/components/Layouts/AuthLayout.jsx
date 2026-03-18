import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Cpu, Gamepad2 } from 'lucide-react';

const slides = [
  {
    id: 'oxigen',
    title: 'Welcome to OXIGEN',
    desc: 'Wadah kolaborasi teknologi mahasiswa.',
    bgClass: 'bg-oxigen-dark',
    accentClass: 'bg-oxigen-light',
    icon: <img src="/oxigen.png" alt="Oxigen Logo" className="w-24 h-24 md:w-32 md:h-32 brightness-0 invert" />, 
  },
  {
    id: 'software',
    title: 'Software Engineering',
    desc: 'Rancang kode masa depan. Web, Mobile, & AI.',
    bgClass: 'bg-gradient-to-br from-green-900 to-software-teal',
    accentClass: 'bg-software-bright',
    icon: <Code size={80} className="text-software-bright md:w-[120px] md:h-[120px]" />, 
  },
  {
    id: 'hardware',
    title: 'Hardware & IoT',
    desc: 'Jembatani dunia fisik dan digital.',
    bgClass: 'bg-gradient-to-br from-blue-900 to-hardware-royal',
    accentClass: 'bg-hardware-cyan',
    icon: <Cpu size={80} className="text-hardware-cyan md:w-[120px] md:h-[120px]" />,
  },
  {
    id: 'game',
    title: 'Game Development',
    desc: 'Ciptakan dunia imersif dan interaktif.',
    bgClass: 'bg-gradient-to-br from-purple-900 to-game-purple',
    accentClass: 'bg-game-red',
    icon: <Gamepad2 size={80} className="text-game-red md:w-[120px] md:h-[120px]" />,
  },
];

const AuthLayout = ({ children, title, subtitle }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000 );

    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 overflow-hidden">

      <div 
        className={`
          relative w-full md:w-1/2 lg:w-7/12 
          h-[35vh] md:h-auto min-h-[300px] md:min-h-screen 
          order-1 md:order-2 
          overflow-hidden transition-all duration-1000 ease-in-out 
          ${slide.bgClass} flex flex-col justify-center items-center text-center px-6
        `}
      >

        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <div className="relative z-10 flex flex-col justify-center items-center w-full">
          
  
          <div 
            key={slide.id} 
            className="mb-4 md:mb-8 p-4 md:p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl animate-[fadeInUp_0.8s_ease-out]"
          >
            {slide.icon}
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-white mb-2 md:mb-4 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            {slide.title}
          </h2>
          
          <p className="text-sm md:text-lg text-gray-200 max-w-lg leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.4s_both] hidden sm:block pb-4">
            {slide.desc}
          </p>

          {/* Indicator Dots */}
          <div className=" -bottom-10 md:bottom-12 flex gap-3">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                  currentSlide === idx 
                    ? `w-6 md:w-8 ${s.accentClass}` 
                    : 'w-1.5 md:w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

        </div>
      </div>


      <div 
        className={`
          w-full md:w-1/2 lg:w-5/12 
          flex flex-col md:justify-center 
          relative z-20 
          order-2 md:order-1
          -mt-8 md:mt-0 
        `}
      >
      
        <div className="bg-white rounded-t-[30px] md:rounded-none shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-none min-h-[65vh] md:min-h-screen p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          
          {/* Tombol Kembali */}
          <Link 
            to="/" 
            className="absolute top-6 right-6 md:top-8 md:left-8 flex items-center gap-2 text-gray-400 hover:text-oxigen-light transition-colors font-medium text-xs md:text-sm group"
          >
            <div className="p-2 rounded-full bg-gray-100 group-hover:bg-oxigen-light/10 transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="hidden md:inline">Kembali ke Home</span>
          </Link>

          <div className="max-w-md w-full mx-auto mt-4 md:mt-0">
            {/* Header Form */}
            <div className="mb-8 md:mb-10 text-center md:text-left">
      
              <img src="/oxigen.png" alt="Logo" className="h-8 w-auto mb-4 mx-auto md:mx-0 md:hidden" />
              
              <h1 className="text-2xl md:text-3xl font-black text-oxigen-dark mb-2 tracking-tight">{title}</h1>
              <p className="text-sm md:text-base text-gray-500">{subtitle}</p>
            </div>

            {children}
          </div>

          {/* Footer Kecil */}
          <div className="mt-12 text-center text-[10px] md:text-xs text-gray-400">
          </div>
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;