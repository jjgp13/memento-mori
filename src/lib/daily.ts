/**
 * What the app shows on each open: one "count" (an impact card). Ported from impactPool() in
 * prototype/index.html. The day's quote and question come from the wisdom library (src/lib/wisdom.ts).
 */
import { bestLever } from '@/lib/habit-impact';
import { loveCount, loveCountLabel, PER_LABEL, PER_YEAR, type Love } from '@/lib/loves';
import { DAY_MS, WEEKS_PER_YEAR, ageAt, estimate } from '@/lib/model';
import type { Profile } from '@/lib/profile';

export function dayOfYear(now = Date.now()) {
  const d = new Date(now);
  return Math.floor((now - new Date(d.getFullYear(), 0, 0).getTime()) / DAY_MS);
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
export function todaysImpact(p: Profile, now = Date.now()): Impact {
  const est = estimate(p, now);
  const age = ageAt(p.dob, now);
  const left = Math.max(0, est.med - age);

  const loves: Impact[] = (p.loves ?? []).map((l) => ({
    n: loveCount(l, p, now).times,
    what: loveCountLabel(l),
    sub: `At ${l.count} ${PER_LABEL[l.per]}, over the time you likely have.`,
    rate: l.count * PER_YEAR[l.per],
    capped: !!l.until || l.kind !== 'activity',
    love: l,
  }));
  const general: Impact[] = [
    { n: left * WEEKS_PER_YEAR, what: 'more weekends', sub: 'Each one is a Saturday and a Sunday you get to spend on purpose.', rate: WEEKS_PER_YEAR },
    { n: left, what: 'more summers', sub: 'Long evenings. Warm nights. Not unlimited.', rate: 1 },
    { n: left * 12.37, what: 'more full moons', sub: 'Step outside for the next one.', rate: 12.37 },
    { n: age * WEEKS_PER_YEAR, what: 'weekends already lived', sub: 'Some of them were wonderful. Be grateful for those, and make room for more.', back: true },
  ];

  const pool = loves.length ? [...loves, ...loves, ...general] : general;
  return pool[dayOfYear(now) % pool.length];
}

/** "Exercising 3+ times a week could add about 1.9 years. That's about 99 more weekends." */
export function impactAgency(p: Profile, impact: Impact, now = Date.now()) {
  if (impact.back || impact.capped || !impact.rate) return null;
  const lever = bestLever(p, now);
  if (!lever) return null;
  return { key: lever.key, label: lever.label, years: lever.years, more: lever.years * impact.rate };
}
