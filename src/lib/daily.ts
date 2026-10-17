/**
 * What the app shows on each open: one "count" (an impact card) and the day's quote and question.
 * Ported from impactPool() and QUOTES/QUESTIONS in prototype/index.html. In English the quote and
 * question come from the verified wisdom library (src/lib/wisdom.ts, docs/wisdom.md) in every language
 * that has it; the others use the short lists in their catalogs (src/i18n, under `daily`) until then.
 */
import type { Strings } from '@/i18n/strings/en';
import { bestLever } from '@/lib/habit-impact';
import { loveCount, loveCountLabel, PER_YEAR, type Love } from '@/lib/loves';
import { DAY_MS, WEEKS_PER_YEAR, ageAt, estimate } from '@/lib/model';
import type { Profile } from '@/lib/profile';

export function dayOfYear(now = Date.now()) {
  const d = new Date(now);
  return Math.floor((now - new Date(d.getFullYear(), 0, 0).getTime()) / DAY_MS);
}

/** The catalog's fallback quote, or null in a language that has the wisdom library instead. */
export function todaysQuote(t: Strings, now = Date.now()) {
  const quotes = t.daily.quotes;
  if (!quotes?.length) return null;
  const [text, source] = quotes[dayOfYear(now) % quotes.length];
  return { text, source };
}

export function todaysQuestion(t: Strings, now = Date.now()) {
  const questions = t.daily.questions;
  if (!questions?.length) return null;
  const weekday = t.date.weekdays[new Date(now).getDay()];
  return questions[dayOfYear(now) % questions.length].replace('{day}', weekday);
}

export type Impact = {
  n: number;
  what: string;
  sub: string;
  /** How many of these per year of life, to turn "years gained" into "more of these". */
  rate?: number;
  /** Bounded by something other than your own lifespan, so extra years of yours don't add more. */
  capped?: boolean;
  /** A grateful look back rather than a count ahead. */
  back?: boolean;
  /** The person, pet or activity this count is about, so the next step can be about them too. */
  love?: Love;
};

/** Today's count. The people, pets and things they love come up most often; general counts fill in. */
export function todaysImpact(p: Profile, t: Strings, now = Date.now()): Impact {
  const d = t.daily;
  const est = estimate(p, now);
  const age = ageAt(p.dob, now);
  const left = Math.max(0, est.med - age);

  const loves: Impact[] = (p.loves ?? []).map((l) => ({
    n: loveCount(l, p, now).times,
    what: loveCountLabel(l, t),
    sub: d.loveSub(t.loves.pace(l.count, l.per)),
    rate: l.count * PER_YEAR[l.per],
    capped: !!l.until || l.kind !== 'activity',
    love: l,
  }));
  const general: Impact[] = [
    { n: left * WEEKS_PER_YEAR, ...d.weekends, rate: WEEKS_PER_YEAR },
    { n: left, ...d.summers, rate: 1 },
    { n: left * 12.37, ...d.moons, rate: 12.37 },
    { n: age * WEEKS_PER_YEAR, ...d.lived, back: true },
  ];

  const pool = loves.length ? [...loves, ...loves, ...general] : general;
  return pool[dayOfYear(now) % pool.length];
}

/** "Exercising 3+ times a week could add about 1.9 years. That's about 99 more weekends." */
export function impactAgency(p: Profile, impact: Impact, now = Date.now()) {
  if (impact.back || impact.capped || !impact.rate) return null;
  const lever = bestLever(p, now);
  if (!lever) return null;
  return { key: lever.key, years: lever.years, more: lever.years * impact.rate };
}
