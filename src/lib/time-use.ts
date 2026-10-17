/**
 * Where the hours go: turning daily phone time into time-left terms, and into something they love.
 * See docs/science.md §4.
 */
import { fmt } from '@/i18n/format';
import type { Strings } from '@/i18n/strings/en';
import { loveCount, type Love } from '@/lib/loves';
import { ageAt, estimate, type ModelInput } from '@/lib/model';

/** Waking hours in a day, used for "share of your waking life". */
export const WAKING_HOURS = 16;

/** Hours asleep a night, from their sleep answer: about 8 in the healthy range, about 5.5 if under 6. */
export const sleepHours = (me: Pick<ModelInput, 'sleep'>) => (me.sleep === 'short' ? 5.5 : 8);
/** The swap we suggest: half an hour a day back from the phone. */
export const SWAP_HOURS = 0.5;

export function yearsLeft(me: ModelInput, now = Date.now()) {
  return Math.max(0, estimate(me, now).med - ageAt(me.dob, now));
}

/** Total years of what's likely left that this many hours a day adds up to. */
export const yearsOfHours = (hoursPerDay: number, years: number) => (hoursPerDay * years) / 24;

/** "a quarter", "a third"… of waking hours, in words people feel. */
export function shareOfWaking(hoursPerDay: number, t: Strings) {
  const f = hoursPerDay / WAKING_HOURS;
  if (f >= 0.45) return t.share.half;
  if (f >= 0.3) return t.share.third;
  if (f >= 0.2) return t.share.quarter;
  if (f >= 0.12) return t.share.seventh;
  return t.share.pct(Math.round(f * 100));
}

/**
 * What half an hour a day back from the phone could become, using something they love:
 * a daily walk with their dog, or two-hour dinners with the people they love.
 */
export function swapSuggestion(me: ModelInput, loves: Love[], t: Strings, now = Date.now()) {
  const dog = loves.find((l) => l.kind === 'pet' && l.species === 'dog');
  if (dog) {
    const years = loveCount({ ...dog, count: 1, per: 'day' }, me, now).years;
    return t.swap.dog(dog.name, fmt(years * 365.2425));
  }
  const hoursPerYear = SWAP_HOURS * 365.2425;
  const person = loves.find((l) => l.kind === 'person');
  return t.swap.dinners(fmt(hoursPerYear / 2), person?.name ?? null);
}
