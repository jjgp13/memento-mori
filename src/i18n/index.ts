import { bn } from '@/i18n/strings/bn';
import { de } from '@/i18n/strings/de';
import { en, type Strings } from '@/i18n/strings/en';
import { es } from '@/i18n/strings/es';
import { fr } from '@/i18n/strings/fr';
import { hi } from '@/i18n/strings/hi';
import { id } from '@/i18n/strings/id';
import { ja } from '@/i18n/strings/ja';
import { pt } from '@/i18n/strings/pt';
import { ru } from '@/i18n/strings/ru';
import { zh } from '@/i18n/strings/zh';
import { currentLang, deviceLang, type Lang } from '@/i18n/locale';
import { setPref, usePrefs } from '@/lib/prefs';

export { LANGUAGES, type Lang } from '@/i18n/locale';
export type { Strings } from '@/i18n/strings/en';

/**
 * Every language's text. Each catalog is typed as `Strings` (the English one's shape), so a missing or
 * misnamed string fails the typecheck. Pass the result of useT() into lib helpers that build sentences:
 * React Compiler then knows to rebuild them when the language changes.
 */
const CATALOGS: Record<Lang, Strings> = { en, zh, hi, es, fr, bn, pt, ru, id, de, ja };

/** The language in use; re-renders when it changes. */
export function useLang(): Lang {
  const { language } = usePrefs();
  return language ?? deviceLang();
}

/** The current language's strings; re-renders when the language changes. */
export function useT(): Strings {
  return CATALOGS[useLang()];
}

/** Outside React (e.g. setting the page's lang attribute). */
export const strings = () => CATALOGS[currentLang()];

/** Picks a language for this device; `null` goes back to following the device's language. */
export function setLanguage(lang: Lang | null) {
  setPref('language', lang);
}
