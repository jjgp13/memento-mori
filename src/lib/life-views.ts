/**
 * What the Life screen's circle grid shows at each zoom level. Ported from draw() in
 * prototype/index.html; rendering lives in components/life-grid.tsx.
 */
import { DAY_MS, WEEK_MS, WEEKS_PER_YEAR, ageAt, birthTime, type Survival } from '@/lib/model';

export type Zoom = 'life' | 'weeks' | 'year' | 'today';
export const ZOOMS: { key: Zoom; label: string }[] = [
  { key: 'life', label: 'Life' },
  { key: 'weeks', label: 'Weeks' },
  { key: 'year', label: 'Year' },
  { key: 'today', label: 'Today' },
];

/**
 * lived · now (fills like a pie) · likely ahead (before the median) · reach (extra time one habit change
 * would likely add) · maybe (median to 75th pct) · none (gap)
 */
export type CellState = 'lived' | 'now' | 'likely' | 'reach' | 'maybe' | 'none';

/** Plain text with **bold** runs, so captions can be both styled and read aloud. */
export type Rich = { text: string; strong?: boolean }[];

export type GridView = {
  cols: number;
  count: number;
  /** Width reserved on the left for row labels. */
  labelW: number;
  /** How far through the current unit we are, 0–1. */
  frac: number;
  state: (i: number) => CellState;
  label?: (i: number) => string;
  rowLabel?: (row: number) => string;
  caption: Rich;
};

export const fmt = (n: number) => Math.max(0, Math.round(n)).toLocaleString('en-US');
const pct = (f: number) => `${Math.floor(f * 100)}%`;
const b = (text: string) => ({ text, strong: true });
const t = (text: string) => ({ text });

/** `gain`: years the best habit change would add, drawn just past the median as "within reach". */
export function lifeView(zoom: Zoom, dob: string, est: Survival, now: number, gain = 0): GridView {
  const age = ageAt(dob, now);

  if (zoom === 'life') {
    const a = Math.floor(age);
    const frac = age - a;
    return {
      cols: 10,
      count: Math.ceil(Math.max(est.q75, est.med + gain)) + 1,
      labelW: 26,
      frac,
      state: (i) =>
        i < a ? 'lived' : i === a ? 'now' : i < est.med ? 'likely' : i < est.med + gain ? 'reach' : i < est.q75 ? 'maybe' : 'none',
      label: (i) => (i % 5 === 0 ? String(i) : ''),
      rowLabel: (row) => String(row * 10),
      caption: [t(`Your year ${a + 1} is `), b(pct(frac)), t(' gone. About '), b(fmt(est.med - age)), t(' more birthdays are likely.')],
    };
  }

  if (zoom === 'weeks') {
    const weeksLived = (now - birthTime(dob)) / WEEK_MS;
    const w = Math.floor(weeksLived);
    const med = est.med * WEEKS_PER_YEAR;
    const reach = (est.med + gain) * WEEKS_PER_YEAR;
    return {
      cols: 52,
      count: Math.ceil(Math.max(est.q75, est.med + gain) * WEEKS_PER_YEAR),
      labelW: 22,
      frac: weeksLived - w,
      state: (i) => (i < w ? 'lived' : i === w ? 'now' : i < med ? 'likely' : i < reach ? 'reach' : 'maybe'),
      rowLabel: (row) => (row % 10 === 0 ? String(row) : ''),
      caption: [t(`Week ${fmt(w + 1)} of your life is `), b(pct(weeksLived - w)), t(' gone. About '), b(fmt(med - weeksLived)), t(' weeks likely remain.')],
    };
  }

  if (zoom === 'year') {
    // 12 rows of 31; days that don't exist in a month are left blank.
    const d = new Date(now);
    const Y = d.getFullYear();
    const start = new Date(Y, 0, 1).getTime();
    const end = new Date(Y + 1, 0, 1).getTime();
    const today = Math.floor((now - start) / DAY_MS);
    const frac = (now - new Date(Y, d.getMonth(), d.getDate()).getTime()) / DAY_MS;
    const dayOfYear = (i: number) => {
      const month = Math.floor(i / 31);
      const day = (i % 31) + 1;
      if (day > new Date(Y, month + 1, 0).getDate()) return -1;
      return Math.round((new Date(Y, month, day).getTime() - start) / DAY_MS);
    };
    return {
      cols: 31,
      count: 12 * 31,
      labelW: 16,
      frac,
      state: (i) => {
        const k = dayOfYear(i);
        return k < 0 ? 'none' : k < today ? 'lived' : k === today ? 'now' : 'likely';
      },
      rowLabel: (row) => 'JFMAMJJASOND'[row],
      caption: [t(`${Y} is `), b(pct((now - start) / (end - start))), t(' gone. Today is '), b(pct(frac)), t(' gone. '), b(fmt((end - now) / DAY_MS)), t(' days left this year.')],
    };
  }

  const d = new Date(now);
  const h = d.getHours();
  const frac = (d.getMinutes() * 60 + d.getSeconds()) / 3600;
  return {
    cols: 6,
    count: 24,
    labelW: 0,
    frac,
    state: (i) => (i < h ? 'lived' : i === h ? 'now' : 'likely'),
    label: (i) => `${i % 12 || 12}${i < 12 ? 'a' : 'p'}`,
    caption: [t('This hour is '), b(pct(frac)), t(' gone. Today has about '), b(Math.max(0, 23 - h - frac).toFixed(1)), t(' hours left. Spend them on purpose.')],
  };
}

export const richText = (r: Rich) => r.map((s) => s.text).join('');
