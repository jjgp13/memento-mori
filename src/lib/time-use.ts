/**
 * Where the hours go: turning daily phone time into time-left terms, and into something they love.
 * See docs/science.md §4.
 */
import { fmt } from '@/lib/life-views';
import { loveCount, type Love } from '@/lib/loves';
import { ageAt, estimate, type ModelInput } from '@/lib/model';

/** Waking hours in a day, used for "share of your waking life". */
export const WAKING_HOURS = 16;
/** The swap we suggest: half an hour a day back from the phone. */
export const SWAP_HOURS = 0.5;

export function yearsLeft(me: ModelInput, now = Date.now()) {
  return Math.max(0, estimate(me, now).med - ageAt(me.dob, now));
}

/** Total years of what's likely left that this many hours a day adds up to. */
export const yearsOfHours = (hoursPerDay: number, years: number) => (hoursPerDay * years) / 24;

/** "a quarter", "a third"… of waking hours, in words people feel. */
export function shareOfWaking(hoursPerDay: number) {
  const f = hoursPerDay / WAKING_HOURS;
  if (f >= 0.45) return 'about half';
  if (f >= 0.3) return 'about a third';
  if (f >= 0.2) return 'about a quarter';
  if (f >= 0.12) return 'about a seventh';
  return `${Math.round(f * 100)}%`;
}

/**
 * What half an hour a day back from the phone could become, using something they love:
 * a daily walk with their dog, or two-hour dinners with the people they love.
 */
export function swapSuggestion(me: ModelInput, loves: Love[], now = Date.now()) {
  const dog = loves.find((l) => l.kind === 'pet' && l.species === 'dog');
  if (dog) {
    const years = loveCount({ ...dog, count: 1, per: 'day' }, me, now).years;
    return `a daily walk with ${dog.name}: about ${fmt(years * 365.2425)} more walks`;
  }
  const hoursPerYear = SWAP_HOURS * 365.2425;
  const person = loves.find((l) => l.kind === 'person');
  const who = person ? `with ${person.name} or friends` : 'with friends and family';
  return `about ${fmt(hoursPerYear / 2)} two-hour dinners a year ${who}`;
}
