import { getLocales } from 'expo-localization';

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

const INDEX = COUNTRY_TABLES.map((c) => ({ c, names: [fold(c.name), ...(ALIASES[c.code] ?? [])] }));

/** Countries matching what someone typed: names that start with it first, then names containing it. */
export function searchCountries(query: string, limit = 8): CountryTable[] {
  const q = fold(query);
  if (!q) return [];
  const starts: CountryTable[] = [];
  const contains: CountryTable[] = [];
  for (const { c, names } of INDEX) {
    if (c.code.toLowerCase() === q || names.some((n) => n.startsWith(q) || n.includes(` ${q}`))) starts.push(c);
    else if (names.some((n) => n.includes(q))) contains.push(c);
  }
  return [...starts, ...contains].slice(0, limit);
}

export function countryName(code: string | undefined) {
  return countryTable(code)?.name;
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
