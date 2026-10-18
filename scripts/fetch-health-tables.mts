/**
 * Fits the healthy-years curve to WHO's healthy life expectancy and writes src/lib/health-tables.ts.
 *
 *   npm run fit:health            # downloads once into .cache/gho (~35 MB of JSON), then fits
 *
 * Source: WHO Global Health Observatory (GHO) OData API, https://ghoapi.azureedge.net/api/ :
 *   WHOSIS_000002 healthy life expectancy (HALE) at birth, WHOSIS_000007 HALE at 60,
 *   WHOSIS_000001 life expectancy at birth, WHOSIS_000015 life expectancy at 60; by sex, latest year.
 * Licence: CC BY 4.0 (WHO datasets, unless marked otherwise; https://data.who.int). ISO 3166 codes come from the UN
 * Data Portal locations list, so WHO's alpha-3 codes line up with the UN life tables' alpha-2 ones.
 *
 * WHO and the UN estimate mortality separately, so we keep WHO's healthy *share* of the years ahead
 * (HALE ÷ life expectancy, from birth and from 60) and fit poorHealth(x), a logistic in age, so the model's
 * share under each country's UN mortality (src/lib/country-tables.ts) matches both. Countries and areas the
 * WHO doesn't cover get the curve fitted to WHO's global shares under their own mortality. Rerun after
 * refitting the country tables.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

import { COUNTRY_TABLES } from '../src/lib/country-tables.ts';
import { US_APPROX, baseHazard, healthspanWith, poorHealth, type CountryParams, type HealthParams, type Sex } from '../src/lib/model.ts';

const API = 'https://ghoapi.azureedge.net/api/';
const LOCATIONS = 'https://population.un.org/dataportalapi/api/v1/locations?pageSize=500&format=json';
const INDICATORS = { hale0: 'WHOSIS_000002', hale60: 'WHOSIS_000007', le0: 'WHOSIS_000001', le60: 'WHOSIS_000015' } as const;
type Measure = keyof typeof INDICATORS;
const SEX_DIM: Record<Sex, string> = { m: 'SEX_MLE', f: 'SEX_FMLE' };
const CACHE = new URL('../.cache/gho/', import.meta.url);
const OUT = new URL('../src/lib/health-tables.ts', import.meta.url);

type GhoRow = { SpatialDimType: string; SpatialDim: string; Dim1: string; TimeDim: number; NumericValue: number | null };

async function cached<T>(name: string, url: string): Promise<T> {
  mkdirSync(CACHE, { recursive: true });
  const file = new URL(name, CACHE);
  if (!existsSync(file)) {
    console.log(`Downloading ${url}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
    writeFileSync(file, await res.text());
  }
  return JSON.parse(readFileSync(file, 'utf8')) as T;
}

const rows = Object.fromEntries(
  await Promise.all(
    Object.entries(INDICATORS).map(async ([k, code]) => [k, (await cached<{ value: GhoRow[] }>(`${code}.json`, API + code)).value] as const),
  ),
) as Record<Measure, GhoRow[]>;
const iso2Of = new Map(
  (await cached<{ data: { iso3: string; iso2: string }[] }>('un-locations.json', LOCATIONS)).data
    .filter((l) => l.iso3 && l.iso2)
    .map((l) => [l.iso3, l.iso2]),
);

const YEAR = Math.max(...rows.hale0.filter((r) => r.SpatialDimType === 'COUNTRY').map((r) => r.TimeDim));

type Who = Record<Measure, number>;
/** WHO's four numbers by place ('GLOBAL' or an alpha-2 code) and sex, for YEAR. */
const who = new Map<string, Who>();
for (const [k, list] of Object.entries(rows) as [Measure, GhoRow[]][])
  for (const r of list) {
    if (r.TimeDim !== YEAR || r.NumericValue == null) continue;
    const sex = (Object.keys(SEX_DIM) as Sex[]).find((s) => SEX_DIM[s] === r.Dim1);
    const place = r.SpatialDimType === 'GLOBAL' ? 'GLOBAL' : r.SpatialDimType === 'COUNTRY' ? iso2Of.get(r.SpatialDim) : undefined;
    if (!sex || !place) continue;
    const key = `${place}:${sex}`;
    who.set(key, { ...(who.get(key) ?? ({} as Who)), [k]: r.NumericValue });
  }
const complete = (w: Who | undefined): w is Who => !!w && (Object.keys(INDICATORS) as Measure[]).every((k) => typeof w[k] === 'number');

/** Person-years in each month from `from`, stepped exactly like healthspanWith(), so fitting stays fast. */
function personYears(p: CountryParams, from: number) {
  const ages: number[] = [];
  const weights: number[] = [];
  let S = 1;
  for (let x = from; x < 121 && S > 1e-4; x += 1 / 12) {
    const s = Math.exp(-baseHazard(p, x) / 12);
    ages.push(x + 1 / 24);
    weights.push((S * (1 + s)) / 2 / 12);
    S *= s;
  }
  return { ages, weights, total: weights.reduce((t, w) => t + w, 0) };
}
type Weights = ReturnType<typeof personYears>;
const weightsCache = new WeakMap<CountryParams, Record<0 | 60, Weights>>();

/** The model's healthy share of the years ahead from `from`, with no habits. */
function share(p: CountryParams, hp: HealthParams, from: 0 | 60) {
  let w = weightsCache.get(p);
  if (!w) weightsCache.set(p, (w = { 0: personYears(p, 0), 60: personYears(p, 60) }));
  const { ages, weights, total } = w[from];
  let healthy = 0;
  for (let i = 0; i < ages.length; i++) healthy += weights[i] * (1 - poorHealth(hp, ages[i]));
  return healthy / total;
}

/** Cross-check against the model itself. */
function modelShare(p: CountryParams, hp: HealthParams, from: number) {
  const { life, health } = healthspanWith(p, hp, from, 1, 0);
  return (health.mean - from) / (life.mean - from);
}

function bisect(f: (x: number) => number, lo: number, hi: number, target: number) {
  // f increasing in x
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (f(mid) < target) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** al for the share at 60 (higher al = more poor health = lower share), then be for the share at birth. */
function fit(p: CountryParams, s0: number, s60: number): HealthParams {
  const alFor = (be: number) => bisect((al) => -share(p, { al, be }, 60), -10, 5, -s60);
  const be = bisect((be) => share(p, { al: alFor(be), be }, 0), 0, 0.25, s0);
  return { al: alFor(be), be };
}

const round = (v: number, d: number) => Number(v.toPrecision(d));
const shares = (w: Who) => ({ s0: w.hale0 / w.le0, s60: w.hale60 / w.le60 });

type Entry = HealthParams & { s0: number; s60: number; hale0?: number; hale60?: number };
const misfits: string[] = [];
let worst = 0;
function entry(p: CountryParams, w: Who, own: boolean): Entry {
  const { s0, s60 } = shares(w);
  const raw = fit(p, s0, s60);
  const hp = { al: round(raw.al, 5), be: round(raw.be, 5) };
  const err = Math.max(Math.abs(modelShare(p, hp, 0) - s0), Math.abs(modelShare(p, hp, 60) - s60));
  worst = Math.max(worst, err);
  if (err > 0.002) misfits.push(`${JSON.stringify(hp)} off by ${err.toFixed(4)}`);
  return { ...hp, s0: round(s0, 4), s60: round(s60, 4), ...(own ? { hale0: w.hale0, hale60: w.hale60 } : {}) };
}

const global = { m: who.get('GLOBAL:m'), f: who.get('GLOBAL:f') };
if (!complete(global.m) || !complete(global.f)) throw new Error('No global HALE rows');

let own = 0;
const tables = COUNTRY_TABLES.map((c) => {
  const w = { m: who.get(`${c.code}:m`), f: who.get(`${c.code}:f`) };
  const has = complete(w.m) && complete(w.f);
  if (has) own++;
  return {
    code: c.code,
    ...(has ? {} : { global: true }),
    m: entry(c.m, has ? w.m! : global.m!, has),
    f: entry(c.f, has ? w.f! : global.f!, has),
  };
});
// No country: the US approximation's mortality with the US's healthy shares.
const us = { m: who.get('US:m'), f: who.get('US:f') };
if (!complete(us.m) || !complete(us.f)) throw new Error('No US HALE rows');
const none = { m: entry(US_APPROX.m, us.m, false), f: entry(US_APPROX.f, us.f, false) };

console.log(`${YEAR}: ${own} of ${COUNTRY_TABLES.length} countries and areas have WHO HALE; the rest use the global shares.`);
console.log(`Healthy share fitted from birth and from 60 within ${worst.toFixed(4)} of WHO's.`);
for (const m of misfits.slice(0, 10)) console.log(`  misfit ${m}`);

const strip = (e: Entry) => ({ al: e.al, be: e.be, s0: e.s0, s60: e.s60, ...(e.hale0 != null ? { hale0: e.hale0, hale60: e.hale60 } : {}) });
const src = `/**
 * Generated by scripts/fetch-health-tables.mts. Do not edit by hand; rerun the script.
 *
 * Per country and sex, poorHealth(x) = 1 / (1 + e^−(al + be·(x − 60))) in src/lib/model.ts, fitted so the model's
 * healthy share of the years ahead, from birth (s0) and from 60 (s60), matches WHO's HALE ÷ life expectancy.
 * hale0 and hale60 are WHO's own healthy years; \`global: true\` marks places WHO doesn't cover, fitted to the
 * world's shares.
 */
import type { HealthParams } from './model.ts';

export const HEALTH_TABLES_SOURCE = {
  name: 'WHO Global Health Observatory',
  table: 'Healthy life expectancy (HALE) and life expectancy at birth and at 60, by sex, ${YEAR}',
  url: 'https://www.who.int/data/gho/data/themes/mortality-and-global-health-estimates/ghe-life-expectancy-and-healthy-life-expectancy',
  licence: 'CC BY 4.0',
  version: 'gho-hale-${YEAR}',
} as const;

type Fit = HealthParams & { s0: number; s60: number; hale0?: number; hale60?: number };
export type HealthTable = { code: string; global?: true; m: Fit; f: Fit };

/** Used without a country: US healthy shares on the US approximation's mortality. */
export const NO_COUNTRY_HEALTH: Record<'m' | 'f', Fit> = ${JSON.stringify({ m: strip(none.m), f: strip(none.f) }).replace(/"(\w+)":/g, '$1:')};

export const HEALTH_TABLES: readonly HealthTable[] = [
${tables.map((t) => `  ${JSON.stringify({ ...t, m: strip(t.m), f: strip(t.f) }).replace(/"(\w+)":/g, '$1:')},`).join('\n')}
];
`;
writeFileSync(OUT, src);
console.log(`Wrote ${OUT.pathname} (${(src.length / 1024).toFixed(1)} KB)`);
