/**
 * Things and people someone loves, and how many more times they likely get to enjoy them.
 * Ported from loveCount() in prototype/index.html.
 */
import { YEAR_MS, WEEKS_PER_YEAR, ageAt, estimate, survival, type ModelInput } from '@/lib/model';

export type Per = 'week' | 'month' | 'year';

export type Love = {
  id: string;
  kind: 'person' | 'activity';
  name: string;
  /** How many times per `per`. */
  count: number;
  per: Per;
  /** Activities: stop counting at this age of yours (e.g. "play soccer until 65"). */
  until?: number;
  /** People: their age when added; it advances from `addedAt`. */
  theirAge?: number;
  addedAt: number;
};

export const PER_YEAR: Record<Per, number> = { week: WEEKS_PER_YEAR, month: 12, year: 1 };
export const PER_LABEL: Record<Per, string> = { week: 'a week', month: 'a month', year: 'a year' };

export const PERSON_SUGGESTIONS: Omit<Love, 'id' | 'addedAt'>[] = [
  { kind: 'person', name: 'Mom', count: 4, per: 'year', theirAge: 62 },
  { kind: 'person', name: 'Dad', count: 4, per: 'year', theirAge: 64 },
  { kind: 'person', name: 'My best friend', count: 2, per: 'month' },
  { kind: 'person', name: 'My grandmother', count: 2, per: 'year', theirAge: 85 },
];

export const ACTIVITY_SUGGESTIONS: Omit<Love, 'id' | 'addedAt'>[] = [
  { kind: 'activity', name: 'Play soccer', count: 2, per: 'week', until: 65 },
  { kind: 'activity', name: 'Go to the movies', count: 2, per: 'month' },
  { kind: 'activity', name: 'Read a book', count: 1, per: 'month' },
  { kind: 'activity', name: 'Travel somewhere new', count: 1, per: 'year' },
  { kind: 'activity', name: 'Cook for friends', count: 2, per: 'month' },
];

/**
 * Years left to share = from now until the earliest of: your median age, your "until" age,
 * and (for a person) their own median age, averaged over sexes since we don't ask theirs.
 */
export function loveCount(love: Love, me: ModelInput, now = Date.now()) {
  const age = ageAt(me.dob, now);
  let end = estimate(me, now).med;
  if (love.until) end = Math.min(end, love.until);
  let years = end - age;

  if (love.kind === 'person' && love.theirAge != null) {
    const theirs = love.theirAge + (now - love.addedAt) / YEAR_MS;
    const theirMedian = (survival('m', theirs, 1).med + survival('f', theirs, 1).med) / 2;
    years = Math.min(years, theirMedian - theirs);
  }

  years = Math.max(0, years);
  return { times: years * love.count * PER_YEAR[love.per], years };
}

/** "4 a year, over the years you both likely have" */
export function loveCountReason(love: Love) {
  const pace = `${love.count} ${PER_LABEL[love.per]}`;
  if (love.kind === 'person' && love.theirAge != null) return `${pace}, over the years you both likely have`;
  if (love.until) return `${pace}, until you're ${love.until}`;
  return `${pace}, for the rest of your life`;
}

export const weeksFromYears = (years: number) => years * WEEKS_PER_YEAR;
