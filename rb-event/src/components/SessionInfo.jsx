import React from 'react';

export default function SessionInfo() {
  return (
    <section className="py-24 px-5 bg-white relative">
      <div className="max-w-6xl mx-auto w-full">
        
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block py-1 px-4 rounded-full bg-green-50 text-brand-green font-semibold text-sm mb-4 border border-green-200 shadow-sm">
            Materi Pembahasan
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            Apa yang Akan <span className="text-brand-green">Kamu Pelajari?</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg px-2">
            Pemaparan teori yang komprehensif dilanjutkan dengan praktek langsung membangun aplikasi impianmu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
          
          {/* Card Talkshow */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-200 hover:shadow-xl hover:border-brand-green/50 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-50 to-transparent rounded-bl-full -z-10"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                🎙️
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-800">Sesi Talkshow</h3>
                <p className="text-brand-green font-semibold text-sm">Durasi: 1 Jam</p>
              </div>
            </div>

            <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
              Diskusi interaktif membongkar realita industri Tech saat ini. Kita akan bahas bagaimana AI merubah cara kerja developer dan kenapa kamu harus mulai beradaptasi.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-brand-green text-lg shrink-0">✓</span>
                <p className="text-sm md:text-base text-gray-700 font-medium">Pergeseran Paradigma: Dari "Ngetik Kode" ke "Ngetik Prompt".</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-green text-lg shrink-0">✓</span>
                <p className="text-sm md:text-base text-gray-700 font-medium">Vibe Coding 101: Apa itu dan kenapa industri melirik skill ini?</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-green text-lg shrink-0">✓</span>
                <p className="text-sm md:text-base text-gray-700 font-medium">Human in the Loop: Mengapa programmer manusia tetap tak tergantikan.</p>
              </li>
            </ul>
          </div>

          {/* Card Workshop */}
          <div className="bg-gray-900 rounded-[2rem] p-8 md:p-10 shadow-lg border border-gray-800 hover:shadow-2xl hover:shadow-green-900/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-900/30 to-transparent rounded-bl-full -z-10"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                💻
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white">Sesi Workshop</h3>
                <p className="text-green-400 font-semibold text-sm">Durasi: 3 Jam (Hands-on)</p>
              </div>
            </div>

            <p className="text-gray-400 mb-6 text-sm md:text-base leading-relaxed">
              Buka laptopmu! Kita akan praktek langsung membuat aplikasi web dari nol hanya dengan bermodalkan prompt bahasa natural menggunakan AI Code Assistant.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-lg shrink-0">⚡</span>
                <p className="text-sm md:text-base text-gray-300 font-medium">Pengenalan vibecoding.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-lg shrink-0">⚡</span>
                <p className="text-sm md:text-base text-gray-300 font-medium">cara planning.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-lg shrink-0">⚡</span>
                <p className="text-sm md:text-base text-gray-300 font-medium">building project.</p>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}