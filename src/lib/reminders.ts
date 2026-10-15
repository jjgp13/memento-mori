/**
 * Weekly reminders, planned on the device (docs/nudges.md §2): one or two a week, each naming one person
 * or one small action, at the person's plan time or a chosen slot (default Sunday 12:30, the best
 * engagement moment in Bidargaddi 2018). Pure logic; scheduling lives in `notifications.native.ts`.
 */
import { fmt } from '@/lib/life-views';
import { lastContact, loveCount, loveCountLabel, type Love } from '@/lib/loves';
import type { Profile } from '@/lib/profile';

/** A weekly moment. `weekday` follows Date.getDay(): 0 is Sunday. */
export type Slot = { weekday: number; hour: number; minute: number };

export type ReminderPrefs = {
  /** Only true once they said yes and the OS allowed notifications. */
  on: boolean;
  perWeek: 1 | 2;
  /** Used in order when no person's plan fills the week. */
  slots: [Slot, Slot];
};

export const DEFAULT_REMINDERS: ReminderPrefs = {
  on: false,
  perWeek: 1,
  slots: [
    { weekday: 0, hour: 12, minute: 30 },
    { weekday: 3, hour: 18, minute: 30 },
  ],
};

export type Reminder = { at: Date; title: string; body: string; personId?: string };

/**
 * How far ahead to schedule. Re-planned every time the app opens, so the window rolls forward; if someone
 * stops opening the app, the reminders end quietly instead of nagging forever.
 */
export const WEEKS_AHEAD = 6;

export const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const pad = (n: number) => String(n).padStart(2, '0');
export const timeLabel = (s: Pick<Slot, 'hour' | 'minute'>) => `${s.hour}:${pad(s.minute)}`;
/** "Sundays 12:30" */
export const slotLabel = (s: Slot) => `${WEEKDAYS[s.weekday]}s ${timeLabel(s)}`;

/** The first time this slot comes round after `now`, then `weeks` weeks later. */
export function nextAt(slot: Slot, now: number, weeks = 0) {
  const d = new Date(now);
  d.setHours(slot.hour, slot.minute, 0, 0);
  d.setDate(d.getDate() + ((slot.weekday - d.getDay() + 7) % 7));
  if (d.getTime() <= now + 60_000) d.setDate(d.getDate() + 7);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

/** "Could", not "should" (§1i); the barrier-busting fact goes where the hesitation is (§1h). */
const PERSON_BODIES = [
  (n: string) => `People appreciate being reached out to more than we expect. A message to ${n} today?`,
  (n: string) => `A call takes a few minutes and could make ${n}'s day. Call or message from here.`,
  (n: string) => `Thinking of ${n}? This could be a good moment to say hello.`,
];

/** For people who haven't added anyone yet: one small, doable thing (§1g, §1j). */
const ACTIONS = [
  { title: 'A 10-minute walk after lunch?', body: 'Light walks after meals lower blood sugar, and the minutes add up over a life.' },
  { title: 'Who would you like to see more of?', body: 'Add someone who loves you, and we can count how many more visits you likely have.' },
  { title: 'One thing for this week', body: 'What is one thing you would be glad to have done by next Sunday?' },
];

function personReminder(love: Love, profile: Profile, at: Date, i: number): Reminder {
  const times = loveCount(love, profile, at.getTime()).times;
  return {
    at,
    title: `About ${fmt(times)} ${loveCountLabel(love)}`,
    body: PERSON_BODIES[i % PERSON_BODIES.length](love.name),
    personId: love.id,
  };
}

/**
 * The next few weeks of reminders. Each week: people with a plan first (taking turns if there are more
 * than `perWeek`), then the chosen slots, each naming whoever is longest since you last talked.
 */
export function planReminders(profile: Profile, prefs: ReminderPrefs, now = Date.now(), weeks = WEEKS_AHEAD): Reminder[] {
  const people = (profile.loves ?? []).filter((l) => l.kind === 'person');
  // Never talked first (oldest added), then longest since last contact, as in whoToReachOut().
  const queue = [...people].sort((a, b) => (lastContact(a) ?? a.addedAt - 1e13) - (lastContact(b) ?? b.addedAt - 1e13));
  const planned = people.filter((p) => p.plan);
  const out: Reminder[] = [];
  let turn = 0;

  for (let w = 0; w < weeks; w++) {
    const thisWeek: Love[] = [];
    for (let k = 0; k < Math.min(prefs.perWeek, planned.length); k++) {
      const p = planned[(w * prefs.perWeek + k) % planned.length];
      if (thisWeek.includes(p)) continue;
      thisWeek.push(p);
      out.push(personReminder(p, profile, nextAt(p.plan!, now, w), out.length));
    }

    for (const slot of prefs.slots.slice(0, prefs.perWeek - thisWeek.length)) {
      const at = nextAt(slot, now, w);
      const free = queue.filter((p) => !thisWeek.includes(p));
      if (free.length) {
        const p = free[turn++ % free.length];
        thisWeek.push(p);
        out.push(personReminder(p, profile, at, out.length));
      } else {
        out.push({ at, ...ACTIONS[out.length % ACTIONS.length] });
      }
    }
  }

  return out.sort((a, b) => a.at.getTime() - b.at.getTime());
}
