import { getLocales } from 'expo-localization';

import { getPrefs } from '@/lib/prefs';

/**
 * Languages the app speaks, most spoken first (total speakers). Each `locale` sets number and date
 * formats; Spanish uses Mexico's, and Bengali uses Latin digits to match its catalog. Arabic and Urdu wait for right-to-left layout support.
 */
export const LANGUAGES = [
  { code: 'en', name: 'English', locale: 'en-US' },
  { code: 'zh', name: '中文', locale: 'zh-CN' },
  { code: 'hi', name: 'हिन्दी', locale: 'hi-IN' },
  { code: 'es', name: 'Español', locale: 'es-MX' },
  { code: 'fr', name: 'Français', locale: 'fr-FR' },
  { code: 'bn', name: 'বাংলা', locale: 'bn-BD-u-nu-latn' },
  { code: 'pt', name: 'Português', locale: 'pt-BR' },
  { code: 'ru', name: 'Русский', locale: 'ru-RU' },
  { code: 'id', name: 'Bahasa Indonesia', locale: 'id-ID' },
  { code: 'de', name: 'Deutsch', locale: 'de-DE' },
  { code: 'ja', name: '日本語', locale: 'ja-JP' },
] as const;

export type Lang = (typeof LANGUAGES)[number]['code'];

const isLang = (code: string | null | undefined): code is Lang => LANGUAGES.some((l) => l.code === code);

/** The first of the device's preferred languages that the app speaks, else English. */
function detect(): Lang {
  try {
    for (const l of getLocales()) {
      if (isLang(l.languageCode)) return l.languageCode;
    }
  } catch {
    // No locale info (e.g. a server render); fall through.
  }
  return 'en';
}

const device = detect();

/** The language picked on the You screen, or the device's. */
export const currentLang = (): Lang => {
  const picked = getPrefs().language;
  return isLang(picked) ? picked : device;
};

export const deviceLang = () => device;

export const localeOf = (lang: Lang) => LANGUAGES.find((l) => l.code === lang)!.locale;

export const currentLocale = () => localeOf(currentLang());
