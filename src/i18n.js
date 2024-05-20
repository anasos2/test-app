import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // Importation de LanguageDetector
import arTranslation from './locales/ar.json';
import frTranslation from './locales/fr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
     
      ar: { translation: arTranslation },
      fr: { translation: frTranslation }
    },
    fallbackLng: 'fr',
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: { escapeValue: false }
  });

export default i18n;
