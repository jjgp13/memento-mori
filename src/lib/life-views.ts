/**
 * What the Life screen's circle grid shows at each zoom level. Ported from draw() in
 * prototype/index.html; rendering lives in components/life-grid.tsx.
 */
import { dec1, fmt } from '@/i18n/format';
import type { Rich } from '@/i18n/rich';
import type { Strings } from '@/i18n/strings/en';
import { DAY_MS, WEEK_MS, WEEKS_PER_YEAR, ageAt, birthTime, type Healthspan, type Survival } from '@/lib/model';

export type Zoom = 'life' | 'weeks' | 'year' | 'today';
export const ZOOMS: Zoom[] = ['life', 'weeks', 'year', 'today'];

/**
 * lived · now (fills like a pie) · likely ahead (before the median) · reach (extra time a habit change
 * would likely add) · maybe (median to 75th pct) · none (gap). sleep and phone are the share of the
 * likely-ahead time those hours add up to, drawn together at its end.
 */
export type CellState = 'lived' | 'now' | 'likely' | 'sleep' | 'phone' | 'reach' | 'maybe' | 'none';

/** What to draw on top of the plain calendar. */
export type Layers = {
  /** Years each change being tried would add, drawn one after another just past the median. */
  gains?: number[];
  /** Share of each day asleep (0–1). */
  sleep?: number;
  /** Share of each day on the phone (0–1). */
  phone?: number;
  /** Ages good health likely lasts to (with any changes being tried): a band that fades from q25 to q75. */
  health?: Pick<Healthspan, 'q25' | 'med' | 'q75'>;
};

/** How likely the time at `age` is lived in good health, as a soft band: 1 before q25, fading to 0 at q75. */
function healthLevel(health: Layers['health']) {
  if (!health) return undefined;
  const { q25, q75 } = health;
  return (age: number) => (age < q25 ? 1 : age >= q75 ? 0 : (q75 - age) / Math.max(1e-6, q75 - q25));
}

/** "About 28 of them are likely in good health…" Doubles as the band's text alternative. */
function healthCaption(t: Strings, age: number, unit: 'years' | 'weeks', perYear: number, health: Layers['health']): Rich {
  if (!health) return [];
  const left = (to: number) => fmt(Math.max(0, to - age) * perYear);
  return t.life.caption.health(unit, left(health.med), left(health.q25), left(health.q75));
}

/** Likely-ahead cells [from, to): the first part stays free, then phone time, then sleep, added up. */
function splitAhead(from: number, to: number, { sleep = 0, phone = 0 }: Layers) {
  const n = Math.max(0, to - from);
  const freeEnd = from + Math.round(n * (1 - sleep - phone));
  const phoneEnd = freeEnd + Math.round(n * phone);
  return (i: number): CellState => (i < freeEnd ? 'likely' : i < phoneEnd ? 'phone' : 'sleep');
}

/** "Added up, about 15 of those years are sleep and 7 on your phone." Sleep is time well spent, never "lost". */
function layersCaption(t: Strings, left: number, unit: 'years' | 'weeks', { sleep = 0, phone = 0 }: Layers): Rich {
  if (!sleep && !phone) return [];
  const free = left * (1 - sleep - phone);
  return t.life.caption.layers(unit, fmt(left * sleep), phone ? fmt(left * phone) : null, fmt(free));
}

export type { Rich } from '@/i18n/rich';
export { fmt } from '@/i18n/format';

export type GridView = {
  cols: number;
  count: number;
  /** Width reserved on the left for row labels. */
  labelW: number;
  /** How far through the current unit we are, 0–1. */
  frac: number;
  /** "Hide numbers": the current unit still fills like a pie, without its percentage. */
  noPct?: boolean;
  /** Too many cells for outlines and dashes to read: draw likely weeks as dots, "maybe" ones as hollow rings. */
  dense?: boolean;
  state: (i: number) => CellState;
  /** For a 'reach' cell: which of `Layers.gains` it belongs to. */
  reachOf?: (i: number) => number;
  /** For a 'likely' cell: how likely it's lived in good health, 0–1 (the healthy band). */
  health?: (i: number) => number;
  label?: (i: number) => string;
  rowLabel?: (row: number) => string;
  caption: Rich;
};

const pct = (f: number) => `${Math.floor(f * 100)}%`;

/** Which change a point `x` years past the median belongs to, for changes drawn end to end. */
function segmentOf(gains: number[]) {
  return (x: number) => {
    let end = 0;
    for (let k = 0; k < gains.length; k++) {
      end += gains[k];
      if (x < end) return k;
    }
    return Math.max(0, gains.length - 1);
  };
}

/** How much of a likely life is ahead, in words for "Hide numbers": by the share of the median already lived. */
export function aheadLevel(age: number, est: Survival): keyof Strings['gentle']['ahead'] {
  if (age >= est.med) return 'gift';
  const lived = age / est.med;
  return lived < 0.5 ? 'most' : lived < 0.75 ? 'plenty' : 'some';
}

/** How far through a year or a day, in words. */
const phase = (f: number) => (f < 0.4 ? 'early' : f < 0.8 ? 'middle' : 'late');

function yearFraction(now: number) {
  const Y = new Date(now).getFullYear();
  const start = new Date(Y, 0, 1).getTime();
  return (now - start) / (new Date(Y + 1, 0, 1).getTime() - start);
}

/**
 * `hide` ("Hide numbers") keeps every circle and drops the age, week and hour labels; the caption, which is
 * also the grid's accessibility label, becomes words.
 */
export function lifeView(zoom: Zoom, dob: string, est: Survival, now: number, t: Strings, layers: Layers = {}, hide = false): GridView {
  const view = gridView(zoom, dob, est, now, t, layers);
  if (!hide) return view;
  const g = t.gentle.caption;
  const words =
    zoom === 'life' || zoom === 'weeks'
      ? g[zoom] +
        t.gentle.ahead[aheadLevel(ageAt(dob, now), est)] +
        (layers.health ? g.health : '') +
        (layers.sleep || layers.phone ? g.layers(!!layers.phone) : '')
      : zoom === 'year'
        ? g.year[phase(yearFraction(now))]
        : g.today[phase(new Date(now).getHours() / 24)];
  // Month initials stay; ages, week numbers and hours go.
  const rowLabel = zoom === 'year' ? view.rowLabel : undefined;
  return { ...view, labelW: rowLabel ? view.labelW : 0, noPct: true, label: undefined, rowLabel, caption: [{ text: words }] };
}

function gridView(zoom: Zoom, dob: string, est: Survival, now: number, t: Strings, layers: Layers): GridView {
  const cap = t.life.caption;
  const age = ageAt(dob, now);
  const gains = layers.gains ?? [];
  const gain = gains.reduce((sum, g) => sum + g, 0);
  const segment = segmentOf(gains);
  const level = healthLevel(layers.health);

  if (zoom === 'life') {
    const a = Math.floor(age);
    const frac = age - a;
    const ahead = splitAhead(a + 1, Math.ceil(est.med), layers);
    return {
      cols: 10,
      count: Math.ceil(Math.max(est.q75, est.med + gain)) + 1,
      labelW: 26,
      frac,
      state: (i) =>
        i < a ? 'lived' : i === a ? 'now' : i < est.med ? ahead(i) : i < est.med + gain ? 'reach' : i < est.q75 ? 'maybe' : 'none',
      reachOf: (i) => segment(i - est.med),
      health: level && ((i) => level(i + 0.5)),
      label: (i) => (i % 5 === 0 ? String(i) : ''),
      rowLabel: (row) => String(row * 10),
      caption: [
        ...cap.life(a + 1, pct(frac), fmt(est.med - age)),
        ...healthCaption(t, age, 'years', 1, layers.health),
        ...layersCaption(t, est.med - age, 'years', layers),
      ],
    };
  }

  if (zoom === 'weeks') {
    const weeksLived = (now - birthTime(dob)) / WEEK_MS;
    const w = Math.floor(weeksLived);
    const med = est.med * WEEKS_PER_YEAR;
    const reach = (est.med + gain) * WEEKS_PER_YEAR;
    const ahead = splitAhead(w + 1, Math.ceil(med), layers);
    return {
      cols: 52,
      dense: true,
      count: Math.ceil(Math.max(est.q75, est.med + gain) * WEEKS_PER_YEAR),
      labelW: 22,
      frac: weeksLived - w,
      state: (i) => (i < w ? 'lived' : i === w ? 'now' : i < med ? ahead(i) : i < reach ? 'reach' : 'maybe'),
      reachOf: (i) => segment((i - med) / WEEKS_PER_YEAR),
      health: level && ((i) => level((i + 0.5) / WEEKS_PER_YEAR)),
      rowLabel: (row) => (row % 10 === 0 ? String(row) : ''),
      caption: [
        ...cap.weeks(fmt(w + 1), pct(weeksLived - w), fmt(med - weeksLived)),
        ...healthCaption(t, age, 'weeks', WEEKS_PER_YEAR, layers.health),
        ...layersCaption(t, med - weeksLived, 'weeks', layers),
      ],
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
