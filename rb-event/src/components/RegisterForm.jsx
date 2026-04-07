import React from 'react';

export default function RegisterForm() {
  
  const handleRegisterClick = () => {
    // Nanti ganti string di bawah ini dengan link form pendaftaran yang sebenarnya
    const registrationLink = "https://bit.ly/RegistrasiEventRuangBelajar"; 

    window.open(registrationLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center py-20 px-4 bg-white">
      <div className="max-w-4xl w-full bg-green-50/30 p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-green-100 text-center relative overflow-hidden">
        
        {/* Elemen Dekorasi */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-100/50 rounded-full blur-2xl -z-10"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-green/10 rounded-full blur-2xl -z-10"></div>

        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md text-brand-green text-3xl mb-8">
          🚀
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
          Siap Bergabung dengan <br className="hidden md:block" />
          <span className="text-brand-green">Ekosistem Inovasi OXIGEN?</span>
        </h2>
        
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Jangan lewatkan kesempatan untuk *upgrade skill* kamu. Kuota terbatas! Klik tombol di bawah ini untuk mengisi formulir pendaftaran resmi.
        </p>

        <button 
          onClick={handleRegisterClick}
          className="bg-brand-green text-white font-bold text-lg px-10 py-5 rounded-full shadow-xl shadow-green-200/50 hover:bg-green-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mx-auto w-full md:w-auto"
        >
          <span>Menuju Halaman Pendaftaran</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        <p className="mt-6 text-sm text-gray-500">
          Ada kendala saat mendaftar? Hubungi <a href="#" className="text-brand-green hover:underline">Contact Person Panitia</a>.
        </p>
        
      </div>
    </section>
  );
}