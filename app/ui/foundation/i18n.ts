import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation from '../locales/en/resource.json';

const resources = { en: { translation } };

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
