/**
 * What the app shows on each open: one "count" (an impact card) and the day's quote and question.
 * Bundled with the app, so it works offline and needs no account; the phrases library can move to a
 * database later. Ported from impactPool() and QUOTES/QUESTIONS in prototype/index.html.
 */
import { bestLever } from '@/lib/habit-impact';
import { loveCount, loveCountLabel, PER_LABEL, PER_YEAR } from '@/lib/loves';
import { DAY_MS, WEEKS_PER_YEAR, ageAt, estimate } from '@/lib/model';
import type { Profile } from '@/lib/profile';

/** Public-domain Stoic sources (Long 1862, Gummere 1917–25, Higginson 1865 translations; some lightly adapted). */
export const QUOTES: [text: string, source: string][] = [
  ['Do not act as if you had ten thousand years to live. While you live, while it is in your power, be good.', 'Marcus Aurelius · Meditations IV.17'],
  ['While we are postponing, life speeds by.', 'Seneca · Letters 1'],
  ['Think of yourself as dead. You have lived your life. Now take what is left and live it properly.', 'Marcus Aurelius · Meditations VII.56'],
  ['Let us prepare our minds as if we had come to the very end of life. Let us postpone nothing.', 'Seneca · Letters 101'],
  ['It is not that we have a short time to live, but that we waste much of it.', 'Seneca · On the Shortness of Life'],
  ['Let death be daily before your eyes, and you will never have an abject thought.', 'Epictetus · Enchiridion 21'],
  ['Every man lives only this present moment. All the rest is either past or uncertain.', 'Marcus Aurelius · Meditations III.10'],
  ['Begin at once to live, and count each separate day as a separate life.', 'Seneca · Letters 101'],
  ['You could leave life right now. Let that decide what you do and say and think.', 'Marcus Aurelius · Meditations II.11'],
  ['No man is free who is not master of himself.', 'Epictetus · Fragments'],
];

export const QUESTIONS = [
  'What would make today worth it?',
  'Who deserves your full attention today?',
  'What are you postponing that you would regret never doing?',
  'What is in your control today, and what is not?',
  'If this were your last ordinary {day}, what would you keep the same?',
  'What would you do today if you were not afraid?',
  'What can you let go of today?',
  'What do you want to be remembered for, and did today move you toward it?',
];

export function dayOfYear(now = Date.now()) {
  const d = new Date(now);
  return Math.floor((now - new Date(d.getFullYear(), 0, 0).getTime()) / DAY_MS);
}

export function todaysQuote(now = Date.now()) {
  const [text, source] = QUOTES[dayOfYear(now) % QUOTES.length];
  return { text, source };
}

export function todaysQuestion(now = Date.now()) {
  const weekday = new Date(now).toLocaleDateString('en-US', { weekday: 'long' });
  return QUESTIONS[dayOfYear(now) % QUESTIONS.length].replace('{day}', weekday);
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
  return { label: lever.label, years: lever.years, more: lever.years * impact.rate };
}
