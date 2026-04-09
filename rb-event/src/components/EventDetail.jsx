import React from 'react';

export default function EventDetail() {
  // Data pemateri (kita pisahkan di array agar kodenya lebih rapi)
  // Untuk src, karena fotonya ada di folder public/pemateri/, panggil dengan awalan '/'
  const speakers = [
    {
      id: 1,
      name: "Nama Pembicara 1",
      role: "AI Engineer di Tech Company",
      session: "Talkshow",
      icon: "🎙️",
      image: "/pemateri.webp", // Ganti dengan nama file aslinya nanti
      bgColor: "bg-gradient-to-t from-green-100 to-white"
    },
    {
      id: 2,
      name: "Nama Pembicara 2",
      role: "Senior Software Developer",
      session: "Talkshow",
      icon: "🎙️",
      image: "/pemateri.webp", // Ganti dengan nama file aslinya nanti
      bgColor: "bg-gradient-to-t from-green-100 to-white"
    },
    {
      id: 3,
      name: "Nama Instruktur",
      role: "Fullstack Vibe Coder",
      session: "Workshop",
      icon: "💻",
      image: "/pemateri.webp", // Ganti dengan nama file aslinya nanti
      // Workshop diberi warna beda sedikit agar menonjol
      bgColor: "bg-gradient-to-t from-brand-green/20 to-white" 
    }
  ];

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center py-24 px-4 bg-white relative">
      <div className="max-w-6xl mx-auto w-full">
        
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 rounded-full bg-green-50 text-brand-green font-semibold text-sm mb-4 border border-green-200 shadow-sm">
            Expert Lineup
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Kenalan Sama <span className="text-brand-green">Pemateri Kita</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Dapatkan *insight* industri secara langsung dan *hands-on coding* bersama para praktisi yang sudah berpengalaman di bidangnya.
          </p>
        </div>

        {/* Layout Grid: 1 Kolom di HP, 3 Kolom di Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {speakers.map((speaker) => (
            <div 
              key={speaker.id} 
              className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col"
            >
              
              {/* Badge Sesi (Talkshow/Workshop) diletakkan melayang di atas */}
              <div className="absolute top-6 left-6 z-20">
                <span className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-white/90 backdrop-blur-sm text-gray-800 font-bold text-xs shadow-sm border border-gray-100">
                  <span>{speaker.icon}</span> {speaker.session}
                </span>
              </div>

              {/* Area Foto (Tinggi Fix, object-contain agar tidak terpotong) */}
              {/* Latar belakang diberi gradient agar fotonya kontras */}
              <div className={`relative h-72 w-full pt-12 px-6 ${speaker.bgColor} flex items-end justify-center overflow-hidden`}>
                
                {/* Efek Lingkaran Estetik di belakang foto */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/40 rounded-full blur-2xl z-0"></div>
                
                {/* Gambar Transparan:
                  - object-contain: Mencegah pemotongan gambar
                  - object-bottom: Memastikan kaki/bawah badan menempel di garis bawah
                  - drop-shadow-2xl: Memberi efek bayangan pada bentuk badan orangnya
                */}
                <img 
                  src={speaker.image} 
                  alt={speaker.name} 
                  className="relative z-10 w-full h-full object-contain object-bottom drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 origin-bottom"
                />
              </div>

              {/* Area Teks Info Pemateri */}
              <div className="p-8 text-center bg-white relative z-20 flex-grow flex flex-col justify-center">
                <h3 className="text-2xl font-extrabold text-gray-800 mb-1">
                  {speaker.name}
                </h3>
                <p className="text-brand-green font-semibold text-sm mb-4">
                  {speaker.role}
                </p>
                
                {/* Garis pemisah estetik */}
                <div className="w-12 h-1 bg-gray-100 rounded-full mx-auto group-hover:bg-brand-green transition-colors"></div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}