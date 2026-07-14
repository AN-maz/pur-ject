export default function Toefl() {
  const GFORM_URL = "https://bit.ly/TOEFLPREP2025";

  const sponsorsAndPartners = [
    { id: 1, name: "Sponsor software", logo: "/medpart/sotfware.png" },
    { id: 2, name: "Sponsor B", logo: "/images/sponsor2.png" },
    { id: 3, name: "Sponsor C", logo: "/images/sponsor3.png" },
    { id: 4, name: "Media Partner 1", logo: "/medpart/oxigen.png" },
    { id: 5, name: "Media Partner 2", logo: "/images/media2.png" },
    { id: 6, name: "Media Partner 3", logo: "/images/media3.png" },
  ];

  return (
    <div className="font-sans bg-gray-50 text-gray-900 scroll-smooth">
      <style>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slider {
          animation: slide 20s linear infinite;
        }
        .animate-slider:hover {
          animation-play-state: paused;
        }
      `}</style>

      <nav className="fixed w-full z-50 bg-white border-b-4 border-ec-blue px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/images/nav-logo_p.png" alt="EC Logo" className="h-10" />
          <span className="font-bold text-ec-blue text-xl tracking-tight hidden md:block">
            English Club UTB
          </span>
        </div>
        <div className="hidden md:flex gap-8 font-semibold text-ec-blue">
          <a href="#about" className="hover:text-ec-red transition-colors">About</a>
          <a href="#speaker" className="hover:text-ec-red transition-colors">Speaker</a>
          <a href="#benefits" className="hover:text-ec-red transition-colors">Benefits</a>
          <a href="#pricing" className="hover:text-ec-red transition-colors">Pricing</a>
        </div>
        <a
          href="#register"
          className="bg-ec-red text-white px-6 py-2 font-bold border-2 border-ec-blue shadow-[4px_4px_0px_0px_rgba(0,20,82,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,20,82,1)] transition-all"
        >
          Daftar Sekarang
        </a>
      </nav>

      <section className="pt-32 pb-20 px-6 bg-ec-blue relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-10 left-10 w-32 h-32 bg-ec-red rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-white opacity-10 rotate-12"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block bg-yellow-400 text-ec-blue font-extrabold px-4 py-1 mb-6 border-2 border-ec-blue shadow-[4px_4px_0px_0px_rgba(0,20,82,1)] rotate-[-2deg]">
            WORKSHOP
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 uppercase tracking-tight leading-tight">
            English Club TOEFL Fest: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
              Let's Crack It Together
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Learn How to Achieve Your Best TOEFL Score: A Crash Course for Ambitious Learners.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 border border-white/20 text-white font-medium">
              📅 Selasa, 5 Agustus 2025
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 border border-white/20 text-white font-medium">
              ⏰ 09.00 WIB - Selesai
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#register" className="bg-ec-red text-white text-lg px-8 py-4 font-bold border-2 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all">
              Daftar Sekarang
            </a>
            <a href="#about" className="bg-white text-ec-blue text-lg px-8 py-4 font-bold border-2 border-ec-blue shadow-[6px_6px_0px_0px_rgba(0,20,82,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,20,82,1)] transition-all">
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-white relative">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-ec-blue mb-6">Mengapa Harus Ikut?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Kemampuan berbahasa Inggris menjadi kualifikasi penting di dunia akademik dan profesional. 
            Sering kesulitan mencapai skor TOEFL 500? Workshop ini adalah solusi untuk menguasai strategi efektif.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {["Reading", "Listening", "Structure", "Writing"].map((skill, index) => (
              <div key={index} className="bg-gray-50 border-2 border-ec-blue p-6 shadow-[6px_6px_0px_0px_rgba(0,20,82,1)] hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-ec-red text-white font-bold text-xl flex items-center justify-center rounded-full mb-4 border-2 border-ec-blue">
                  {index + 1}
                </div>
                <h3 className="font-bold text-xl text-ec-blue mb-2">{skill}</h3>
                <p className="text-gray-600 text-sm">Tingkatkan pemahaman dan strategi menjawab soal secara efektif.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="speaker" className="py-20 px-6 bg-gray-100 border-y-4 border-ec-blue">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
          
          {/* FOTO: Diubah dari w-full menjadi w-2/3 dengan max-width agar tidak kebesaran di Mobile */}
          <div className="w-2/3 sm:w-1/2 md:w-1/3 max-w-xs md:max-w-none relative">
            <div className="absolute inset-0 bg-ec-red -rotate-6 border-2 border-ec-blue"></div>
            <div className="relative bg-white border-2 border-ec-blue p-4 shadow-[8px_8px_0px_0px_rgba(0,20,82,1)]">
              <img src="/images/speaker.png" alt="Miraswadina Dyah" className="w-full h-auto object-cover transition-all duration-500" />
            </div>
          </div>
          
          {/* TEKS: Ditambahkan pengaturan agar rata tengah (center) di mobile dan kembali ke kiri (start) di desktop */}
          <div className="w-full md:w-2/3 flex flex-col items-center md:items-start">
            <div className="inline-block bg-yellow-400 text-ec-blue font-bold px-3 py-1 mb-4 border-2 border-ec-blue">
              SPEAKER
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-ec-blue mb-2">
              Miraswadina Dyah Amoendria, S.T.
            </h2>
            <p className="text-xl font-semibold text-ec-red mb-6">Senior Teacher in PT.PETAL</p>
            <ul className="space-y-4 text-gray-700 font-medium text-left">
              <li className="flex items-start gap-3">
                <span className="text-ec-red text-xl">▹</span>
                <span>Alumni Teknik Industri Institut Teknologi Bandung (ITB) 2005.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ec-red text-xl">▹</span>
                <span>Berpengalaman mengajar lebih dari 10 tahun (ILP, EEP, BLCI).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ec-red text-xl">▹</span>
                <span>Meraih skor Prediksi TOEFL ITP 629 (2025).</span>
              </li>
            </ul>
          </div>
          
        </div>
        </section>

      <section id="benefits" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-ec-blue mb-6">Detail Lokasi</h2>
            <div className="border-4 border-ec-blue shadow-[8px_8px_0px_0px_rgba(0,20,82,1)] p-2 mb-6">
                <div className="w-full h-64 bg-gray-200 relative overflow-hidden">
                <iframe
                    src="https://maps.google.com/maps?q=Universitas+Teknologi+Bandung&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi UTB"
                    className="absolute inset-0"
                ></iframe>
                </div>
            </div>
            <p className="font-bold text-lg text-ec-blue">📍 Lantai 4 Gedung A, Universitas Teknologi Bandung</p>
            <p className="text-gray-600">Juga tersedia opsi Online via Zoom Meeting.</p>
          </div>
          
          <div>
            <h2 className="text-3xl font-extrabold text-ec-blue mb-6">Benefits</h2>
            <div className="grid grid-cols-2 gap-4">
              {["Modul Eksklusif", "Snack & Drink", "E-Certificate", "Poin SKKM"].map((benefit, idx) => (
                <div key={idx} className="bg-white border-2 border-ec-blue p-4 flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,20,82,1)]">
                  <div className="w-8 h-8 bg-ec-red rounded-sm flex items-center justify-center text-white font-bold">✓</div>
                  <span className="font-bold text-ec-blue">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6 bg-ec-blue text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-12">Pilih Tiketmu</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white text-ec-blue border-4 border-white p-8 relative hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(216,27,43,1)]">
              <h3 className="text-2xl font-bold mb-2">ONLINE</h3>
              <p className="text-5xl font-extrabold text-ec-red mb-6">10K</p>
              <ul className="text-left space-y-3 font-semibold mb-8">
                <li>✔️ Akses Zoom Meeting</li>
                <li>✔️ Modul Digital</li>
                <li>✔️ E-Certificate</li>
                <li>✔️ Free 1 SKKM</li>
              </ul>
            </div>

            <div className="bg-white text-ec-blue border-4 border-ec-red p-8 relative hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-ec-red text-white font-bold px-4 py-1 border-2 border-ec-blue">
                REKOMENDASI
              </div>
              <h3 className="text-2xl font-bold mb-2">OFFLINE</h3>
              <p className="text-5xl font-extrabold text-ec-red mb-6">15K</p>
              <ul className="text-left space-y-3 font-semibold mb-8">
                <li>✔️ Kursi di Lantai 4 Gedung A</li>
                <li>✔️ Modul Cetak & Digital</li>
                <li>✔️ Snack & Minuman</li>
                <li>✔️ E-Certificate</li>
                <li>✔️ Free 2 SKKM</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

     <section className="py-16 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-extrabold text-ec-blue">Didukung Oleh</h2>
          <p className="text-gray-500 mt-2">Sponsor & Media Partner Resmi Kami</p>
        </div>
        
        <div className="max-w-6xl mx-auto border-4 border-ec-blue bg-gray-50 py-6 shadow-[8px_8px_0px_0px_rgba(0,20,82,1)] overflow-hidden flex relative">

          <div className="flex animate-slider w-[max-content]">
            {[...sponsorsAndPartners, ...sponsorsAndPartners].map((partner, index) => (
              <div 
                key={index} 
                className="mx-8 w-32 h-16 flex items-center justify-center  hover:grayscale-0 transition-all duration-300 flex-shrink-0 cursor-pointer"
                title={partner.name}
              >
                {/* Kotak abu-abu dihapus, diganti dengan tag img */}
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-full max-w-full object-contain" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="register" className="py-20 px-6 bg-white relative">
        <div className="max-w-4xl mx-auto border-4 border-ec-blue bg-yellow-300 p-8 md:p-16 text-center shadow-[12px_12px_0px_0px_rgba(0,20,82,1)]">
          <h2 className="text-4xl md:text-5xl font-extrabold text-ec-blue uppercase mb-4">
            Siap Mencapai Target TOEFL Kamu?
          </h2>
          <p className="text-lg md:text-xl text-ec-blue/80 font-medium mb-10 max-w-2xl mx-auto">
            Jangan sampai kehabisan kuota! Segera amankan kursimu sekarang juga dan bersiap untuk meningkatkan skor TOEFL-mu.
          </p>
          
          <a
            href={GFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-ec-red text-white text-xl md:text-2xl px-10 py-5 font-extrabold border-4 border-ec-blue shadow-[8px_8px_0px_0px_rgba(0,20,82,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,20,82,1)] transition-all uppercase tracking-wide"
          >
            Isi Form Pendaftaran 🚀
          </a>
        </div>
      </section>
    </div>
  );
}