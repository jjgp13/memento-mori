/**
 * Things and people someone loves, and how many more times they likely get to enjoy them.
 * Ported from loveCount() in prototype/index.html.
 */
import type { Strings } from '@/i18n/strings/en';
import { YEAR_MS, WEEKS_PER_YEAR, ageAt, estimate, survival, type ModelInput } from '@/lib/model';
import type { Plan } from '@/lib/plans';

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
  /** People: optional, for the Call and Message buttons. Stays on the device. */
  phone?: string;
  /** People: when they last talked or met, logged with "We talked" (most recent first, capped). */
  contacts?: number[];
  /** People: when they mean to reach out ("Sundays after lunch, I will call Mom"). */
  plan?: Plan;
  addedAt: number;
};

export const PER_YEAR: Record<Per, number> = { day: 365.2425, week: WEEKS_PER_YEAR, month: 12, year: 1 };

/**
 * Typical lifespans (median age at death) from UK primary-care records: dogs about 12.5 years
 * (O'Neill et al. 2013, 2024), cats about 14 (O'Neill et al. 2015). Rough by design; breed and size matter.
 */
export const PET_LIFESPAN: Record<Species, number> = { dog: 12.5, cat: 14 };
/** An older pet still likely has some time; never count below half a year. */
const MIN_PET_YEARS = 0.5;

type Suggestion = Omit<Love, 'id' | 'addedAt'>;

/** Starting points for "who loves you", named in the current language. */
export function personSuggestions(t: Strings): Suggestion[] {
  const n = t.loves.suggestPeople;
  return [
    { kind: 'person', name: n.mom, count: 4, per: 'year', theirAge: 62 },
    { kind: 'person', name: n.dad, count: 4, per: 'year', theirAge: 64 },
    { kind: 'person', name: n.friend, count: 2, per: 'month' },
    { kind: 'person', name: n.grandma, count: 2, per: 'year', theirAge: 85 },
    { kind: 'pet', name: n.dog, species: 'dog', count: 1, per: 'day', theirAge: 4 },
    { kind: 'pet', name: n.cat, species: 'cat', count: 1, per: 'day', theirAge: 6 },
  ];
}

/** Starting points for "what you love doing". */
export function activitySuggestions(t: Strings): Suggestion[] {
  const n = t.loves.suggestActivities;
  return [
    { kind: 'activity', name: n.soccer, count: 2, per: 'week', until: 65 },
    { kind: 'activity', name: n.movies, count: 2, per: 'month' },
    { kind: 'activity', name: n.read, count: 1, per: 'month' },
    { kind: 'activity', name: n.travel, count: 1, per: 'year' },
    { kind: 'activity', name: n.cook, count: 2, per: 'month' },
  ];
}

/**
 * Years left to share = from now until the earliest of: your median age, your "until" age,
 * a person's own median age (averaged over sexes, since we don't ask theirs; assumed to live where you do), or a pet's typical lifespan.
 */
export function loveCount(love: Love, me: ModelInput, now = Date.now()) {
  const age = ageAt(me.dob, now);
  let end = estimate(me, now).med;
  if (love.until) end = Math.min(end, love.until);
  let years = end - age;

  if (love.kind === 'person' && love.theirAge != null) {
    const theirs = love.theirAge + (now - love.addedAt) / YEAR_MS;
    const theirMedian = (survival('m', theirs, 1, me.country).med + survival('f', theirs, 1, me.country).med) / 2;
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
export function loveCountReason(love: Love, t: Strings) {
  const pace = t.loves.pace(love.count, love.per);
  if ((love.kind === 'person' && love.theirAge != null) || love.kind === 'pet') return t.loves.reasonBoth(pace);
  if (love.until) return t.loves.reasonUntil(pace, love.until);
  return t.loves.reasonLife(pace);
}

export const weeksFromYears = (years: number) => years * WEEKS_PER_YEAR;

/** What one count means: a visit with a person, a day with a pet you live with, or a time doing something. */
export function loveUnit(love: Love): 'visits' | 'days' | 'times' {
  if (love.kind === 'person') return 'visits';
  if (love.kind === 'pet' && love.per === 'day' && love.count === 1) return 'days';
  return 'times';
}

/** "more visits with Mom" · "more days with Max" · "more times: play soccer" */
export function loveCountLabel(love: Love, t: Strings) {
  if (love.kind === 'activity') return t.loves.moreTimes(love.name);
  return t.loves.moreWith(loveUnit(love), love.name);
}

/** Most contact moments kept per person; enough for "last time" and a monthly tally. */
const MAX_CONTACTS = 60;

/** Logs "we talked / we met" now. */
export function withContact(love: Love, at = Date.now()): Love {
  return { ...love, contacts: [at, ...(love.contacts ?? [])].slice(0, MAX_CONTACTS) };
}

export const lastContact = (love: Love) => love.contacts?.[0] ?? null;

/** "today", "yesterday", "12 days ago", "3 months ago" */
export function sinceLabel(at: number, t: Strings, now = Date.now()) {
  const days = Math.floor((now - at) / 864e5);
  if (days <= 0) return t.loves.since.today;
  if (days === 1) return t.loves.since.yesterday;
  if (days < 60) return t.loves.since.days(days);
  return t.loves.since.months(Math.round(days / 30.4));
}

/**
 * The person most worth reaching out to: never logged first (oldest added), then the longest since
 * last contact. Pets and activities aren't people you message.
 */
export function whoToReachOut(loves: Love[]): Love | null {
  const people = loves.filter((l) => l.kind === 'person');
  if (!people.length) return null;
  return [...people].sort((a, b) => (lastContact(a) ?? a.addedAt - 1e13) - (lastContact(b) ?? b.addedAt - 1e13))[0];
}
