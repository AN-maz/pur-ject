import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'id' ? 'en' : 'id';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 text-sm font-semibold rounded-md bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200 transition-colors"
    >
      {i18n.language === 'id' ? 'EN' : 'ID'}
    </button>
  );
};

export default LanguageToggle;