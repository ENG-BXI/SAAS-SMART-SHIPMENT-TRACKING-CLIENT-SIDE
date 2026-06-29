import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ar', 'zh', 'hi', 'es', 'fr', 'bn', 'pt'],

  // Used when no locale matches
  defaultLocale: 'en'
});
// add a name language her by a native letter for each language
export const LocalsNames = {
  en: 'english',
  ar: 'العربية',
  zh: '简体中文',
  hi: 'हिन्दी',
  es: 'Español',
  fr: 'Français',
  bn: 'বাংলা',
  pt:""
};
