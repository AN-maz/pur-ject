import React from 'react';

export default function AboutEvent() {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center py-20 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        <div className="relative">
          <div className="absolute -inset-4 bg-green-50 rounded-3xl transform rotate-3 -z-10 border border-green-100"></div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Mengapa Era AI Ini Penting?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-brand-green text-xl">🤖</span>
                <p className="text-gray-600 text-sm md:text-base">AI mengubah cara kerja developer, dari *hard-coding* manual beralih ke kolaborasi cerdas bersama AI.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-green text-xl">💡</span>
                <p className="text-gray-600 text-sm md:text-base">Kebutuhan industri saat ini tidak hanya mencari *coder*, tapi *problem solver* yang bisa memanfaatkan AI (*Vibe Coding*).</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-green text-xl">🚀</span>
                <p className="text-gray-600 text-sm md:text-base">Membangun aplikasi modern kini jauh lebih cepat berkat bantuan *tools* generatif.</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Kolom Kanan: Teks Penjelasan */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
            Menghadapi Era <span className="text-brand-green">Vibe Coding</span>
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
            <p>
              Dunia *software development* sedang mengalami pergeseran masif. Menulis ratusan baris kode secara manual perlahan mulai digantikan oleh *Vibe Coding*—kemampuan untuk mendikte dan mengarahkan AI menggunakan bahasa natural untuk membangun aplikasi utuh.
            </p>
            <p>
              Melalui <strong>sesi Talkshow</strong>, kita akan berdiskusi langsung dengan praktisi industri tentang *mindset* dan *skill* apa saja yang benar-benar dicari oleh perusahaan di era gempuran AI ini.
            </p>
            <p>
              Selanjutnya, pada <strong>sesi Workshop</strong>, kita akan langsung praktek. Kamu akan dipandu membuat sebuah *project coding* dari nol dengan memanfaatkan *tools* AI masa kini, merasakan langsung serunya alur kerja *Vibe Coding*.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}