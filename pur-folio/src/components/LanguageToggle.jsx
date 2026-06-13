import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const changeLanguageWithAnimation = (lng) => {
    // 1. Cari elemen wrapper utama root web kita, lalu paksa transparan
    const appContainer = document.getElementById('root-app-layout');
    if (appContainer) {
      appContainer.classList.remove('opacity-100');
      appContainer.classList.add('opacity-0');
    }

    // 2. Beri jeda 200ms (saat layar sudah transparan), baru ganti bahasa asli i18n
    setTimeout(() => {
      i18n.changeLanguage(lng);

      // 3. Setelah teks berubah di latar belakang, kembalikan cahayanya secara perlahan
      setTimeout(() => {
        if (appContainer) {
          appContainer.classList.remove('opacity-0');
          appContainer.classList.add('opacity-100');
        }
      }, 50); // Jeda mikro agar DOM i18n selesai merender kata baru
    }, 200); // Durasi tunggu transisi fade-out
  };

  return (
    // Contoh implementasi tombol (sesuaikan dengan desain komponen aslimu):
    <button 
      onClick={() => changeLanguageWithAnimation(i18n.language === 'id' ? 'en' : 'id')}
      className="px-3 py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 rounded-lg hover:scale-105 transition-transform"
    >
      {i18n.language === 'id' ? 'EN' : 'ID'}
    </button>
  );
};

export default LanguageToggle;