import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem("lng") || "id";

const resources = {
  id: {
    translation: {
      nav: {
        about: "Tentang",
        projects: "Proyek",
        experience: "Pengalaman",
        contact: "Kontak",
      },
      projectStatus: {
        ongoing: "Sedang Berjalan",
        completed: "Selesai",
      },
      contactMe: "Hubungi Saya",
    },
  },
  en: {
    translation: {
      nav: {
        about: "About",
        projects: "Projects",
        experience: "Experience",
        contact: "Contact",
      },
      projectStatus: {
        ongoing: "In Progress",
        completed: "Completed",
      },
      contactMe: "Contact Me",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "id",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lng", lng);
});

export default i18n;
