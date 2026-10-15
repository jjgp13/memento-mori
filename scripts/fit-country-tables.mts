/**
 * Fits the life-expectancy model to each country's life table and writes src/lib/country-tables.ts.
 *
 *   npm run fit:countries            # downloads once into .cache/wpp2024 (~400 MB, streamed), then fits
 *
 * Source: UN World Population Prospects 2024, single-age abridged-free ("complete") life tables by sex,
 * estimates for 2023 (CC BY 3.0 IGO). https://population.un.org/wpp/
 *
 * For each country and sex we fit the same hazard as src/lib/model.ts, h(x) = A + B·e^(b·x), to the
 * table's central death rates m(x) at adult ages (least squares on log m, weighted by the table's
 * deaths so the ages where most people die count most). Childhood and youth mortality is not
 * Gompertz-shaped, so two constant extra hazards, `c` before CHILD_END and `y` until YOUTH_END, make
 * the model's survival to those ages match the table exactly. Then it reports how far the model's median and quartile ages at
 * death land from the table's, from birth and from ages 40 and 70.
 */
import { createReadStream, createWriteStream, existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';

import { CHILD_END, YOUTH_END, baseHazard, survivalWith, type CountryParams, type Sex } from '../src/lib/model.ts';

const YEAR = 2023;
const BASE = 'https://population.un.org/wpp/assets/Excel%20Files/1_Indicator%20(Standard)/CSV_FILES/';
const FILES: Record<Sex, string> = {
  m: 'WPP2024_Life_Table_Complete_Medium_Male_1950-2023.csv.gz',
  f: 'WPP2024_Life_Table_Complete_Medium_Female_1950-2023.csv.gz',
};
const CACHE = new URL('../.cache/wpp2024/', import.meta.url);
const OUT = new URL('../src/lib/country-tables.ts', import.meta.url);

/** Adult ages the Gompertz–Makeham curve is fitted to. */
const FIT_FROM = 30;
const FIT_TO = 100;

/** Shorter everyday names for the UN's formal ones. Search also matches the ISO codes. */
const NAMES: Record<string, string> = {
  BO: 'Bolivia',
  BQ: 'Bonaire, Sint Eustatius and Saba',
  CD: 'DR Congo',
  CG: 'Congo',
  CI: "Côte d'Ivoire",
  CZ: 'Czechia',
  FM: 'Micronesia',
  GB: 'United Kingdom',
  HK: 'Hong Kong',
  IR: 'Iran',
  KP: 'North Korea',
  KR: 'South Korea',
  LA: 'Laos',
  MD: 'Moldova',
  MO: 'Macao',
  PS: 'Palestine',
  RU: 'Russia',
  SY: 'Syria',
  TW: 'Taiwan',
  TZ: 'Tanzania',
  US: 'United States',
  VE: 'Venezuela',
  VN: 'Viet Nam',
  VI: 'US Virgin Islands',
  XK: 'Kosovo',
};

type Row = { iso2: string; name: string; sex: Sex; age: number; mx: number; lx: number };

/** Splits one CSV line, honouring double quotes ("China, Hong Kong SAR"). */
function splitCsv(line: string) {
  const out: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') (field += '"'), i++;
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') out.push(field), (field = '');
    else field += ch;
  }
  out.push(field);
  return out;
}

/** Streams the gzipped table and keeps only YEAR's rows for countries (not regions). */
async function extract(sex: Sex): Promise<Row[]> {
  mkdirSync(CACHE, { recursive: true });
  const cached = new URL(`${sex}-${YEAR}.json`, CACHE);
  if (existsSync(cached)) return JSON.parse(readFileSync(cached, 'utf8'));

  const url = BASE + FILES[sex];
  console.log(`Downloading ${url}`);
  const res = await fetch(url);
  if (!res.ok || !res.body) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  const gz = new URL(`${FILES[sex]}.part`, CACHE);
  await pipeline(Readable.fromWeb(res.body as never), createWriteStream(gz));
  const done = new URL(FILES[sex], CACHE);
  renameSync(gz, done);

  const rows: Row[] = [];
  let header: string[] | undefined;
  const lines = createInterface({ input: createReadStream(done).pipe(createGunzip()), crlfDelay: Infinity });
  for await (const line of lines) {
    const f = splitCsv(line.replace(/^﻿/, ''));
    if (!header) {
      header = f;
      continue;
    }
    const get = (k: string) => f[header!.indexOf(k)];
    if (get('Time') !== String(YEAR) || get('LocTypeName') !== 'Country/Area' || !get('ISO2_code')) continue;
    rows.push({
      iso2: get('ISO2_code'),
      name: get('Location'),
      sex,
      age: Number(get('AgeGrpStart')),
      mx: Number(get('mx')),
      lx: Number(get('lx')) / 100000,
    });
  }
  writeFileSync(cached, JSON.stringify(rows));
  return rows;
}

/** Nelder–Mead minimiser; plenty for three smooth parameters. */
function minimise(f: (p: number[]) => number, start: number[], step: number[], iterations = 4000) {
  const n = start.length;
  let simplex = [start, ...step.map((s, i) => start.map((v, j) => (i === j ? v + s : v)))].map((p) => ({ p, v: f(p) }));
  for (let it = 0; it < iterations; it++) {
    simplex.sort((a, b) => a.v - b.v);
    const centroid = Array.from({ length: n }, (_, j) => simplex.slice(0, n).reduce((s, q) => s + q.p[j], 0) / n);
    const worst = simplex[n];
    const at = (t: number) => centroid.map((c, j) => c + t * (worst.p[j] - c));
    const r = { p: at(-1), v: 0 };
    r.v = f(r.p);
    if (r.v < simplex[0].v) {
      const e = { p: at(-2), v: 0 };
      e.v = f(e.p);
      simplex[n] = e.v < r.v ? e : r;
    } else if (r.v < simplex[n - 1].v) simplex[n] = r;
    else {
      const c = { p: at(0.5), v: 0 };
      c.v = f(c.p);
      if (c.v < worst.v) simplex[n] = c;
      else simplex = simplex.map((q, i) => (i === 0 ? q : { p: q.p.map((v, j) => simplex[0].p[j] + 0.5 * (v - simplex[0].p[j])), v: 0 })).map((q, i) => (i === 0 ? q : { ...q, v: f(q.p) }));
    }
  }
  simplex.sort((a, b) => a.v - b.v);
  return simplex[0].p;
}

/** Same stepping as survival(): monthly, hazard read at the start of each month. */
function survivalTo(params: CountryParams, from: number, to: number) {
  let H = 0;
  for (let x = from; x < to - 1e-9; x += 1 / 12) H += baseHazard(params, x) / 12;
  return Math.exp(-H);
}

function fit(rows: Row[]): CountryParams {
  const adult = rows.filter((r) => r.age >= FIT_FROM && r.age <= FIT_TO && r.mx > 0);
  const deaths = adult.map((r, i) => r.lx - (adult[i + 1]?.lx ?? 0));
  const loss = ([lnA, lnB, b]: number[]) =>
    adult.reduce((s, r, i) => {
      const h = Math.exp(lnA) + Math.exp(lnB) * Math.exp(b * (r.age + 0.5));
      return s + deaths[i] * (Math.log(h) - Math.log(r.mx)) ** 2;
    }, 0);
  const [lnA, lnB, b] = minimise(loss, [Math.log(1e-3), Math.log(5e-5), 0.09], [1, 1, 0.01]);
  const gm = { A: Math.exp(lnA), B: Math.exp(lnB), b };
  const l = (age: number) => rows.find((r) => r.age === age)!.lx;
  // Extra hazard per year in each window so survival through it matches the table. It can be negative where
  // the adult curve, run backwards, has more young deaths than the table, but the total never drops below zero.
  const extra = (from: number, to: number) =>
    Math.max(
      -(gm.A + gm.B * Math.exp(gm.b * from)),
      (-Math.log(l(to) / l(from)) + Math.log(survivalTo(gm, from, to))) / (to - from),
    );
  return { ...gm, c: extra(0, CHILD_END), y: extra(CHILD_END, YOUTH_END) };
}

/** Table's age by which a share `p` of people alive at `from` have died (linear between ages). */
function tableQuantile(rows: Row[], from: number, p: number) {
  const l0 = rows.find((r) => r.age === from)!.lx;
  for (let i = 0; i < rows.length - 1; i++) {
    const a = rows[i].lx / l0;
    const b = rows[i + 1].lx / l0;
    if (rows[i].age >= from && a >= 1 - p && b < 1 - p) return rows[i].age + (a - (1 - p)) / (a - b);
  }
  return rows[rows.length - 1].age;
}

/** Ages the fit is checked from. */
const FROM = [0, 20, 40, 70];

const round = (v: number, d: number) => Number(v.toPrecision(d));

const all = [...(await extract('m')), ...(await extract('f'))];
const byCountry = new Map<string, { name: string; rows: Record<Sex, Row[]> }>();
for (const r of all) {
  const c = byCountry.get(r.iso2) ?? { name: NAMES[r.iso2] ?? r.name, rows: { m: [], f: [] } };
  c.rows[r.sex].push(r);
  byCountry.set(r.iso2, c);
}

type Err = { iso2: string; sex: Sex; from: number; q: 'q25' | 'med' | 'q75'; diff: number };
const errors: Err[] = [];
const countries = [...byCountry.entries()]
  .map(([iso2, { name, rows }]) => {
    const entry = { code: iso2, name } as {
      code: string;
      name: string;
      m: CountryParams & { med0: number };
      f: CountryParams & { med0: number };
    };
    for (const sex of ['m', 'f'] as const) {
      const r = rows[sex].sort((a, b) => a.age - b.age);
      const raw = fit(r);
      const p = { A: round(raw.A, 5), B: round(raw.B, 5), b: round(raw.b, 5), c: round(raw.c!, 3), y: round(raw.y!, 3) };
      for (const from of FROM) {
        const s = survivalWith(p, from, 1);
        errors.push(
          { iso2, sex, from, q: 'q25', diff: s.q25 - tableQuantile(r, from, 0.25) },
          { iso2, sex, from, q: 'med', diff: s.med - tableQuantile(r, from, 0.5) },
          { iso2, sex, from, q: 'q75', diff: s.q75 - tableQuantile(r, from, 0.75) },
        );
      }
      entry[sex] = { ...p, med0: round(tableQuantile(r, 0, 0.5), 4) };
    }
    return entry;
  })
  .sort((a, b) => a.name.localeCompare(b.name));

// Fit error report.
const quart = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const at = (p: number) => s[Math.round(p * (s.length - 1))];
  return `median ${at(0.5).toFixed(2)}, IQR ${at(0.25).toFixed(2)}–${at(0.75).toFixed(2)}, max ${s[s.length - 1].toFixed(2)}`;
};
console.log(`\n${countries.length} countries × 2 sexes. |model − table| in years:`);
for (const from of FROM)
  for (const q of ['q25', 'med', 'q75'] as const)
    console.log(`  from ${String(from).padStart(2)}  ${q.padEnd(4)} ${quart(errors.filter((e) => e.from === from && e.q === q).map((e) => Math.abs(e.diff)))}`);
const worst = new Map<string, number>();
for (const e of errors) {
  const k = `${byCountry.get(e.iso2)!.name} (${e.iso2}) ${e.sex}`;
  worst.set(k, Math.max(worst.get(k) ?? 0, Math.abs(e.diff)));
}
console.log('\nWorst (largest error across medians and quartiles from 0, 20, 40 and 70):');
for (const [k, v] of [...worst].sort((a, b) => b[1] - a[1]).slice(0, 12)) {
  const [iso2, sex] = [k.match(/\((\w+)\)/)![1], k.slice(-1) as Sex];
  const detail = errors.filter((e) => e.iso2 === iso2 && e.sex === sex).sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))[0];
  console.log(`  ${k.padEnd(40)} ${v.toFixed(2)} y  (${detail.q} from ${detail.from}: ${detail.diff > 0 ? '+' : ''}${detail.diff.toFixed(2)})`);
}

const src = `/**
 * Generated by scripts/fit-country-tables.mts. Do not edit by hand; rerun the script.
 *
 * Gompertz–Makeham fits h(x) = A + B·e^(b·x), plus c before age ${CHILD_END} and y until ${YOUTH_END}, to each
 * country's ${YEAR} life table by sex.
 * med0 is the table's own median age at death from birth, kept to check the fit.
 */
import type { CountryParams } from './model.ts';

export const COUNTRY_TABLES_SOURCE = {
  name: 'UN World Population Prospects 2024',
  table: 'Single-age life tables by sex, estimates for ${YEAR}',
  url: 'https://population.un.org/wpp/',
  licence: 'CC BY 3.0 IGO',
  version: 'wpp2024-${YEAR}',
} as const;

export type CountryTable = { code: string; name: string; m: CountryParams & { med0: number }; f: CountryParams & { med0: number } };

export const COUNTRY_TABLES: readonly CountryTable[] = [
${countries.map((c) => `  ${JSON.stringify(c).replace(/"(\w+)":/g, '$1:')},`).join('\n')}
];
`;
writeFileSync(OUT, src);
console.log(`\nWrote ${OUT.pathname} (${(src.length / 1024).toFixed(1)} KB)`);
