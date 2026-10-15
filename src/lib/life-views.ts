/**
 * What the Life screen's circle grid shows at each zoom level. Ported from draw() in
 * prototype/index.html; rendering lives in components/life-grid.tsx.
 */
import { dec1, fmt } from '@/i18n/format';
import type { Rich } from '@/i18n/rich';
import type { Strings } from '@/i18n/strings/en';
import { DAY_MS, WEEK_MS, WEEKS_PER_YEAR, ageAt, birthTime, type Survival } from '@/lib/model';

export type Zoom = 'life' | 'weeks' | 'year' | 'today';
export const ZOOMS: Zoom[] = ['life', 'weeks', 'year', 'today'];

/**
 * lived · now (fills like a pie) · likely ahead (before the median) · reach (extra time one habit change
 * would likely add) · maybe (median to 75th pct) · none (gap)
 */
export type CellState = 'lived' | 'now' | 'likely' | 'reach' | 'maybe' | 'none';

export type { Rich } from '@/i18n/rich';
export { fmt } from '@/i18n/format';

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

const pct = (f: number) => `${Math.floor(f * 100)}%`;

/** `gain`: years the best habit change would add, drawn just past the median as "within reach". */
export function lifeView(zoom: Zoom, dob: string, est: Survival, now: number, t: Strings, gain = 0): GridView {
  const cap = t.life.caption;
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
      caption: cap.life(a + 1, pct(frac), fmt(est.med - age)),
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
      caption: cap.weeks(fmt(w + 1), pct(weeksLived - w), fmt(med - weeksLived)),
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
      rowLabel: (row) => t.date.monthInitials[row],
      caption: cap.year(Y, pct((now - start) / (end - start)), pct(frac), fmt((end - now) / DAY_MS)),
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
    label: t.date.hour,
    caption: cap.today(pct(frac), dec1(Math.max(0, 23 - h - frac))),
  };
}

export { richText } from '@/i18n/rich';
