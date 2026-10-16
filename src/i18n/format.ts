import { currentLocale } from '@/i18n/locale';

/** Whole number in the current language's style: 1,234 · 1.234 · 1 234 · ১,২৩৪. */
export const fmt = (n: number) => Math.max(0, Math.round(n)).toLocaleString(currentLocale());

/** One decimal place in the current language's style: 1.9 · 1,9. */
export const dec1 = (n: number) =>
  n.toLocaleString(currentLocale(), { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Any number as-is (e.g. 4.5 hours, 10,000 steps) in the current language's style. */
export const num = (n: number) => n.toLocaleString(currentLocale(), { maximumFractionDigits: 2 });
