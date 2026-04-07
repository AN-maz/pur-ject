import React from 'react';

export default function Rundown() {
  const schedules = [
    { 
      time: "09:00 - 09:15", 
      title: "Registrasi & Open Gate", 
      desc: "Peserta menempati kursi dan absensi kehadiran.",
      icon: "📝",
      type: "admin"
    },
    { 
      time: "09:15 - 09:25", 
      title: "Pembukaan Acara", 
      desc: "Sambutan dari ketua pelaksana dan pengenalan tata tertib acara.",
      icon: "🎤",
      type: "admin"
    },
    { 
      time: "09:25 - 10:05", 
      title: "Talkshow: Industri Tech di Era AI", 
      desc: "Sharing session tentang kesiapan karir, disrupsi AI, dan cara beradaptasi di dunia kerja.",
      icon: "💡",
      type: "main"
    },
    { 
      time: "10:05 - 10:15", 
      title: "Coffee Break / Persiapan", 
      desc: "Istirahat sejenak dan setup laptop untuk sesi praktek.",
      icon: "☕",
      type: "break"
    },
    { 
      time: "10:15 - 12:30", 
      title: "Workshop: Let's Do Vibe Coding!", 
      desc: "Hands-on project membuat aplikasi dengan bantuan AI.",
      icon: "💻",
      type: "main"
    },
    { 
      time: "12:30 - 13:00", 
      title: "Showcase & Penutupan", 
      desc: "Melihat hasil project, pembagian doorprize, dokumentasi, dan penutupan.",
      icon: "🏁",
      type: "admin"
    },
  ];

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center py-24 px-4 bg-gray-50/50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-100/50 rounded-full blur-3xl -z-10 opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl -z-10 opacity-70"></div>

      <div className="max-w-6xl w-full relative">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block py-1 px-4 rounded-full bg-green-100 text-brand-green font-semibold text-sm mb-4 border border-green-200 shadow-sm">
            Jadwal Kegiatan
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Rundown Seru <br className="hidden md:block"/>
            <span className="text-brand-green">Vibe Coding</span> Day
          </h2>
        </div>

        {/* Garis Tengah Timeline (Desktop Only) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-100 rounded-full hidden md:block"></div>

        <div className="relative space-y-12 md:space-y-0">
          {schedules.map((item, index) => {
            const isEven = index % 2 === 0;
            const isMainSession = item.type === "main";
            
            return (
              <div key={index} className={`relative flex items-center w-full ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                
                {/* Bulatan & Ikon Timeline */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-10">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 bg-white shadow-lg ${isMainSession ? 'border-brand-green' : 'border-green-100'}`}>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                </div>

                {/* Konten Kartu */}
                <div className={`w-full md:w-[calc(50%-40px)] ml-16 md:ml-0 group`}>
                  <div className={`bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 
                                  hover:shadow-2xl hover:shadow-green-100/50 hover:-translate-y-2 
                                  transition-all duration-300 ease-out relative overflow-hidden
                                  ${isMainSession ? 'border-l-4 border-l-brand-green' : ''}`}>
                    
                    {/* Aksen Background untuk sesi utama */}
                    {isMainSession && (
                      <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -z-10 opacity-60"></div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                      {/* Waktu dengan style yang lebih fun */}
                      <span className="inline-block py-1.5 px-4 rounded-full bg-green-50 text-brand-green font-bold text-sm tracking-tight border border-green-100 shadow-inner w-fit">
                        {item.time}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-extrabold text-gray-800 mb-2 leading-tight group-hover:text-brand-green transition">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Call to Action kecil di bawah rundown */}
        <div className="mt-16 text-center text-sm text-gray-500">
          *Jadwal dapat berubah sewaktu-waktu menyesuaikan kondisi di lapangan.
        </div>
      </div>
    </section>
  );
}