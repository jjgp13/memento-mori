import { getLocales } from 'expo-localization';

import { currentLocale } from '@/i18n/locale';
import { COUNTRY_TABLES, type CountryTable } from '@/lib/country-tables';
import { countryTable } from '@/lib/model';

/** Other names people type. */
const ALIASES: Record<string, string[]> = {
  US: ['usa', 'america', 'united states of america'],
  GB: ['uk', 'britain', 'great britain', 'england', 'scotland', 'wales', 'northern ireland'],
  AE: ['uae', 'emirates'],
  NL: ['holland'],
  CZ: ['czech republic'],
  TR: ['turkey', 'turkiye'],
  CD: ['congo kinshasa', 'drc', 'democratic republic of the congo'],
  CG: ['congo brazzaville'],
  KR: ['korea'],
  CI: ['ivory coast'],
  MM: ['burma'],
  SZ: ['swaziland'],
  CV: ['cape verde'],
  MK: ['macedonia'],
  TL: ['east timor'],
};

const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Like fold, but keeps letters of every script, for names in the current language (中国, Россия). */
const foldAny = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

const INDEX = COUNTRY_TABLES.map((c) => ({ c, names: [fold(c.name), ...(ALIASES[c.code] ?? [])] }));

/** Region names in the given locale, from the platform (Intl.DisplayNames), when it has them. */
const displayNames = new Map<string, Intl.DisplayNames | null>();
function regionNames(locale: string) {
  if (!displayNames.has(locale)) {
    let names: Intl.DisplayNames | null = null;
    try {
      if (typeof Intl.DisplayNames === 'function') names = new Intl.DisplayNames([locale], { type: 'region' });
    } catch {
      // No region names here; English names from the UN tables stand in.
    }
    displayNames.set(locale, names);
  }
  return displayNames.get(locale) ?? null;
}

/** A country's name in the current language, else its English name from the UN tables. */
function localName(c: CountryTable) {
  try {
    const name = regionNames(currentLocale())?.of(c.code);
    return name && name !== c.code ? name : c.name;
  } catch {
    return c.name;
  }
}

/**
 * Countries matching what someone typed, in English or the current language: names that start with it
 * first, then names containing it.
 */
export function searchCountries(query: string, limit = 8): CountryTable[] {
  const q = fold(query);
  const qAny = foldAny(query);
  if (!qAny) return [];
  const starts: CountryTable[] = [];
  const contains: CountryTable[] = [];
  for (const { c, names } of INDEX) {
    // English names and aliases match the ASCII-folded query; the local name matches it as typed.
    const pairs: [string, string][] = [...(q ? names.map((n): [string, string] => [n, q]) : []), [foldAny(localName(c)), qAny]];
    if (c.code.toLowerCase() === qAny || pairs.some(([n, x]) => n.startsWith(x) || n.includes(` ${x}`))) starts.push(c);
    else if (pairs.some(([n, x]) => n.includes(x))) contains.push(c);
  }
  return [...starts, ...contains].slice(0, limit);
}

/** The country's name in the current language. */
export function countryName(code: string | undefined) {
  const c = countryTable(code);
  return c ? localName(c) : undefined;
}

/** The device's region (Language & Region on iOS, Region on Android, the browser locale on web), if we have its table. */
export function deviceCountry(): string | undefined {
  try {
    const region = getLocales()[0]?.regionCode;
    return countryTable(region ?? undefined)?.code;
  } catch {
    return undefined;
  }
}
