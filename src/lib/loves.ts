/**
 * Things and people someone loves, and how many more times they likely get to enjoy them.
 * Ported from loveCount() in prototype/index.html.
 */
import { YEAR_MS, WEEKS_PER_YEAR, ageAt, estimate, survival, type ModelInput } from '@/lib/model';

export type Per = 'day' | 'week' | 'month' | 'year';
export type Species = 'dog' | 'cat';

export type Love = {
  id: string;
  kind: 'person' | 'pet' | 'activity';
  name: string;
  /** How many times per `per`. */
  count: number;
  per: Per;
  /** Activities: stop counting at this age of yours (e.g. "play soccer until 65"). */
  until?: number;
  /** People and pets: their age when added; it advances from `addedAt`. */
  theirAge?: number;
  species?: Species;
  addedAt: number;
};

export const PER_YEAR: Record<Per, number> = { day: 365.2425, week: WEEKS_PER_YEAR, month: 12, year: 1 };
export const PER_LABEL: Record<Per, string> = { day: 'a day', week: 'a week', month: 'a month', year: 'a year' };

/**
 * Typical lifespans (median age at death) from UK primary-care records: dogs about 12.5 years
 * (O'Neill et al. 2013, 2024), cats about 14 (O'Neill et al. 2015). Rough by design; breed and size matter.
 */
export const PET_LIFESPAN: Record<Species, number> = { dog: 12.5, cat: 14 };
/** An older pet still likely has some time; never count below half a year. */
const MIN_PET_YEARS = 0.5;

export const PERSON_SUGGESTIONS: Omit<Love, 'id' | 'addedAt'>[] = [
  { kind: 'person', name: 'Mom', count: 4, per: 'year', theirAge: 62 },
  { kind: 'person', name: 'Dad', count: 4, per: 'year', theirAge: 64 },
  { kind: 'person', name: 'My best friend', count: 2, per: 'month' },
  { kind: 'person', name: 'My grandmother', count: 2, per: 'year', theirAge: 85 },
  { kind: 'pet', name: 'My dog', species: 'dog', count: 1, per: 'day', theirAge: 4 },
  { kind: 'pet', name: 'My cat', species: 'cat', count: 1, per: 'day', theirAge: 6 },
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
 * a person's own median age (averaged over sexes, since we don't ask theirs), or a pet's typical lifespan.
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

  if (love.kind === 'pet' && love.species) {
    const theirs = (love.theirAge ?? 0) + (now - love.addedAt) / YEAR_MS;
    years = Math.min(years, Math.max(MIN_PET_YEARS, PET_LIFESPAN[love.species] - theirs));
  }

  years = Math.max(0, years);
  return { times: years * love.count * PER_YEAR[love.per], years };
}

/** "4 a year, over the years you both likely have" */
export function loveCountReason(love: Love) {
  const pace = `${love.count} ${PER_LABEL[love.per]}`;
  if ((love.kind === 'person' && love.theirAge != null) || love.kind === 'pet') {
    return `${pace}, over the years you both likely have`;
  }
  if (love.until) return `${pace}, until you're ${love.until}`;
  return `${pace}, for the rest of your life`;
}

export const weeksFromYears = (years: number) => years * WEEKS_PER_YEAR;

/** What one count means: a visit with a person, a day with a pet you live with, or a time doing something. */
export function loveUnit(love: Love) {
  if (love.kind === 'person') return 'visits';
  if (love.kind === 'pet' && love.per === 'day' && love.count === 1) return 'days';
  return 'times';
}

/** "more visits with Mom" · "more days with Max" · "more times: play soccer" */
export function loveCountLabel(love: Love) {
  if (love.kind === 'activity') return `more times: ${love.name.toLowerCase()}`;
  return `more ${loveUnit(love)} with ${love.name}`;
}
