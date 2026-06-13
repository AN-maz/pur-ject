import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMail, FiLinkedin, FiAlertCircle, FiCheckCircle, FiSend } from 'react-icons/fi';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // States untuk Validasi Email
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  // Fungsi validasi email menggunakan Regex standar
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Jika input kosong
    if (!value) {
      setEmailError('');
      setIsEmailValid(false);
      return;
    }

    // Pola regex aturan email standar
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError(currentLang === 'id' ? 'Format email tidak valid' : 'Invalid email format');
      setIsEmailValid(false);
    } else {
      setEmailError('');
      setIsEmailValid(true);
    }
  };

  return (
    <section id="contact" className="border-t pt-20 dark:border-slate-800 mb-28">
      {/* Grid Layout Baru */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* KOLOM KIRI: INFO & CTA (4 Kolom) */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
              {currentLang === 'id' ? 'Hubungi Saya' : 'Get In Touch'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {currentLang === 'id' ? 'Mari Bekerja Sama!' : "Let's Connect!"}
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 max-w-md leading-relaxed mx-auto lg:mx-0">
              {currentLang === 'id' 
                ? 'Punya ide proyek, diskusi teknologi, atau tawaran kolaborasi? Silakan kirimkan pesan atau hubungi saluran langsung saya.' 
                : 'Have a project idea, tech discussion, or collaboration offers? Feel free to drop a message or reach out through my direct channels.'}
            </p>
          </div>

          {/* Saluran Langsung Bergaya Minimalis Card */}
          <div className="space-y-3 pt-4 max-w-md mx-auto lg:mx-0">
            <a
              href="mailto:emailkamu@gmail.com"
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-105 transition-transform">
                <FiMail size={18} />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:hover:text-blue-400 transition-colors">emailkamu@gmail.com</p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-105 transition-transform">
                <FiLinkedin size={18} />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">LinkedIn</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Andrian Maulana Dzikwan</p>
              </div>
            </a>
          </div>
        </div>

        {/* KOLOM KANAN: FORMULIR DESAIN BARU (7 Kolom) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none">
          <form action="" method="POST" className="space-y-5">
            
            {/* Input Nama */}
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                {currentLang === 'id' ? 'Nama Lengkap' : 'Full Name'}
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm font-medium"
                placeholder="Andrian Maulana"
              />
            </div>

            {/* Input Email + Real-time Validation Wrapper */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Email
                </label>
                {/* Status Validasi Indikator Teks */}
                {emailError && (
                  <span className="text-xs text-rose-500 flex items-center gap-1 font-medium animate-fade-in">
                    <FiAlertCircle size={12} /> {emailError}
                  </span>
                )}
                {isEmailValid && (
                  <span className="text-xs text-emerald-500 flex items-center gap-1 font-medium animate-fade-in">
                    <FiCheckCircle size={12} /> {currentLang === 'id' ? 'Email benar' : 'Valid email'}
                  </span>
                )}
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className={`w-full px-4 py-3.5 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-slate-900 transition-all text-sm font-medium ${
                    emailError 
                      ? 'border-rose-400 focus:border-rose-500' 
                      : isEmailValid 
                        ? 'border-emerald-400 focus:border-emerald-500' 
                        : 'border-slate-200 dark:border-slate-800 focus:border-blue-500'
                  }`}
                  placeholder="andrian@example.com"
                />
              </div>
            </div>

            {/* Input Pesan */}
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                {currentLang === 'id' ? 'Pesan Anda' : 'Your Message'}
              </label>
              <textarea
                name="message"
                rows="4"
                required
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm font-medium resize-none"
                placeholder={currentLang === 'id' ? 'Halo, tertarik untuk mendiskusikan proyek baru...' : 'Hi, interested in discussing a new project...'}
              ></textarea>
            </div>

            {/* Tombol Kirim Premium */}
            <button
              type="submit"
              disabled={emailError !== ''}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20 text-sm cursor-pointer"
            >
              <FiSend size={16} />
              {t('contactMe')}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;