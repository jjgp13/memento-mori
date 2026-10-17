/**
 * If-then plans: "Sundays after lunch, I will call Mom." Implementation intentions are one of the most
 * robust findings in behavior change (docs/nudges.md §1a, §2). Each person can have one; habits get one
 * small plan at a time. Fresh starts (Mondays, the 1st, birthdays) offer "one thing" for the period (§1d).
 * Everything lives in the profile, on this device. Words come from the language catalogs (`t.plans`);
 * a plan keeps the words it was made with.
 */
import type { Strings } from '@/i18n/strings/en';
import type { Lever } from '@/lib/habit-impact';
import { lastContact, type Love } from '@/lib/loves';
import { DAY_MS, WEEK_MS } from '@/lib/model';

/** 0 = Sunday, as in Date.getDay(). */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Plan = {
  /** Which days the cue comes around. Never empty. */
  days: Weekday[];
  /** "HH:MM", 24-hour. With an anchor it's only "around then", for calendar reminders. */
  time: string;
  /** The cue in their words ("after lunch"); shown instead of the time. */
  anchor?: string;
  /** "call Mom", "go for a 10-minute walk" */
  action: string;
  createdAt: number;
  /** Habit plans: when they tapped Done, most recent first (capped). People log "We talked" instead. */
  done?: number[];
};

export type HabitPlan = Plan & { habit: Lever['key'] };

export type FreshStartKind = 'week' | 'month' | 'birthday';

/** "One thing" chosen at a fresh start; shown until the week, month or year it was for is over. */
export type Focus = { text: string; period: FreshStartKind; setAt: number; doneAt?: number };

/** Monday first, the way people plan a week. */
export const WEEK_ORDER: Weekday[] = [1, 2, 3, 4, 5, 6, 0];

/** Cues people already have every day; each comes with a usual time for calendar reminders. */
const ANCHOR_TIMES = { breakfast: '08:00', lunch: '13:00', work: '18:00', dinner: '19:30', morning: '09:00' } as const;

export function anchors(t: Strings): { anchor: string; time: string }[] {
  return (Object.keys(ANCHOR_TIMES) as (keyof typeof ANCHOR_TIMES)[]).map((k) => ({ anchor: t.plans.anchors[k], time: ANCHOR_TIMES[k] }));
}

/** Cues that follow a meal or the workday, which read well after an action ("walk after dinner"). */
export const isAfterAnchor = (t: Strings, anchor: string | undefined) =>
  !!anchor && [t.plans.anchors.breakfast, t.plans.anchors.lunch, t.plans.anchors.work, t.plans.anchors.dinner].includes(anchor);

const MAX_DONE = 60;

// ---------- Words ----------

/** "Every day", "Weekdays", "Weekends", "Sundays", "Mondays and Thursdays", "Mon, Wed and Fri" */
export function daysLabel(days: Weekday[], t: Strings) {
  const set = new Set(days);
  if (set.size === 7) return t.plans.everyDay;
  if (set.size === 5 && [1, 2, 3, 4, 5].every((d) => set.has(d as Weekday))) return t.plans.weekdays;
  if (set.size === 2 && set.has(0) && set.has(6)) return t.plans.weekends;
  return t.plans.days(WEEK_ORDER.filter((d) => set.has(d)));
}

/** "12:30 pm", "12:30" */
export function timeLabel(time: string, t: Strings) {
  const [h, m] = time.split(':').map(Number);
  return t.plans.time(h, m);
}

/** The "when": "Sundays after lunch", "Weekdays at 8:00 am". */
export function cueLabel(plan: Plan, t: Strings) {
  return t.plans.cue(daysLabel(plan.days, t), plan.anchor?.trim() || null, timeLabel(plan.time, t));
}

/** The whole if-then: "Sundays after lunch, I will call Mom." */
export function planSentence(plan: Plan, t: Strings) {
  return t.plans.sentence(cueLabel(plan, t), plan.action.trim().replace(/[.。।]$/, ''));
}

/** "call Mom" · "call my best friend" */
export function nameInSentence(name: string, t: Strings) {
  return t.plans.nameInSentence(name);
}

// ---------- Time ----------

export function timeToMinutes(time: string) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export const minutesToTime = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

function startOfDay(t: number) {
  const d = new Date(t);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

/** Monday 00:00 of this week, local time. */
export function weekStart(now = Date.now()) {
  const d = new Date(now);
  const back = (d.getDay() + 6) % 7;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - back).getTime();
}

/** The next time the cue comes around (today counts until its time has passed, or all day for a cue). */
export function nextOccurrence(plan: Plan, now = Date.now()) {
  const today = new Date(now);
  for (let i = 0; i < 8; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    if (!plan.days.includes(d.getDay() as Weekday)) continue;
    const at = d.getTime() + timeToMinutes(plan.time) * 60_000;
    // A cue like "after dinner" can come late, so it stays open all day; a set time gets an hour's grace.
    if ((i === 0 && plan.anchor) || at >= now - 60 * 60_000) return at;
  }
  return now;
}

export const isPlanDay = (plan: Plan, now = Date.now()) => plan.days.includes(new Date(now).getDay() as Weekday);

/** "today", "tomorrow", "Sunday" */
export function whenLabel(at: number, t: Strings, now = Date.now()) {
  const days = Math.round((startOfDay(at) - startOfDay(now)) / DAY_MS);
  if (days <= 0) return t.plans.today;
  if (days === 1) return t.plans.tomorrow;
  return t.date.weekdays[new Date(at).getDay()];
}

// ---------- Progress, without streaks ----------

/** When this plan was carried out: "We talked" for people, Done for habits. */
export const planMoments = (plan: Plan, love?: Love) => (love ? (love.contacts ?? []) : (plan.done ?? []));

export const doneSince = (moments: number[], since: number) => moments.filter((t) => t >= since).length;

export function withDone(plan: HabitPlan, at = Date.now()): HabitPlan {
  return { ...plan, done: [at, ...(plan.done ?? [])].slice(0, MAX_DONE) };
}

/**
 * The plan existed all of last week and nothing was logged for it. Only used to say "welcome back":
 * coming back after a miss is what counts (Milkman et al. 2021).
 */
export function missedLastWeek(plan: Plan, moments: number[], now = Date.now()) {
  const thisWeek = weekStart(now);
  const lastWeek = thisWeek - WEEK_MS;
  if (plan.createdAt >= lastWeek) return false;
  return !moments.some((t) => t >= lastWeek && t < thisWeek);
}

// ---------- Defaults ----------

/** Weekend around midday, when people respond best (docs/nudges.md §1b, §2). */
export function defaultPersonPlan(love: Love, t: Strings, now = Date.now()): Plan {
  const name = nameInSentence(love.name, t);
  return {
    days: [0],
    time: '13:00',
    anchor: t.plans.anchors.lunch,
    action: love.phone ? t.plans.call(name) : t.plans.messageOrCall(name),
    createdAt: now,
  };
}

type Anchor = keyof Strings['plans']['anchors'];
type Action = keyof Strings['plans']['actions'];

/** One small, specific step per change, anchored to something they already do. */
const HABIT_DEFAULTS: Record<Lever['key'], { days: Weekday[]; time: string; anchor?: Anchor; action: Action }> = {
  steps: { days: [0, 1, 2, 3, 4, 5, 6], time: '19:30', anchor: 'dinner', action: 'walk' },
  exercise: { days: [0, 1, 2, 3, 4, 5, 6], time: '19:30', anchor: 'dinner', action: 'walk' },
  connection: { days: [6], time: '11:00', anchor: 'morning', action: 'connect' },
  sleep: { days: [0, 1, 2, 3, 4, 5, 6], time: '22:30', action: 'bed' },
  smoke: { days: [0, 1, 2, 3, 4, 5, 6], time: '09:00', anchor: 'cigarette', action: 'smoke' },
  alcohol: { days: [5], time: '18:00', anchor: 'work', action: 'drink' },
  bmi: { days: [1, 2, 3, 4, 5], time: '12:30', anchor: 'atLunch', action: 'plate' },
  strength: { days: [1, 4], time: '07:30', anchor: 'coffee', action: 'strength' },
};

export function defaultHabitPlan(habit: Lever['key'], t: Strings, now = Date.now()): HabitPlan {
  const d = HABIT_DEFAULTS[habit];
  return {
    days: [...d.days],
    time: d.time,
    anchor: d.anchor ? t.plans.anchors[d.anchor] : undefined,
    action: t.plans.actions[d.action],
    habit,
    createdAt: now,
  };
}

// ---------- Pacing: never more than one new plan a week ----------

type WithPlans = { loves?: Love[]; habitPlan?: HabitPlan };

/** When the most recent plan was made, if any. */
export function lastPlanMade(p: WithPlans) {
  const times = [...(p.loves ?? []).flatMap((l) => (l.plan ? [l.plan.createdAt] : [])), ...(p.habitPlan ? [p.habitPlan.createdAt] : [])];
  return times.length ? Math.max(...times) : null;
}

/**
 * The app may suggest a new plan only if none was made, and no suggestion was waved off, in the last week.
 * People can always make plans themselves.
 */
export function maySuggestPlan(p: WithPlans, dismissedAt: number, now = Date.now()) {
  const last = Math.max(lastPlanMade(p) ?? 0, dismissedAt);
  return now - last >= WEEK_MS;
}

/** Whom to suggest a plan for: the person most worth reaching out to who has no plan yet. */
export function personToPlan(loves: Love[]) {
  const people = loves.filter((l) => l.kind === 'person' && !l.plan);
  return [...people].sort((a, b) => (lastContact(a) ?? a.addedAt - 1e13) - (lastContact(b) ?? b.addedAt - 1e13))[0] ?? null;
}

// ---------- Fresh starts ----------

/** Today's fresh start, if any: a birthday beats the 1st of the month, which beats a Monday. */
export function freshStart(dob: string, now = Date.now()): FreshStartKind | null {
  const d = new Date(now);
  const [, month, day] = dob.split('-').map(Number);
  if (d.getMonth() + 1 === month && d.getDate() === day) return 'birthday';
  if (d.getDate() === 1) return 'month';
  if (d.getDay() === 1) return 'week';
  return null;
}

/** When the period a fresh start opens began: this Monday, the 1st, or the latest birthday. */
function periodStart(kind: FreshStartKind, dob: string, now: number) {
  const d = new Date(now);
  if (kind === 'week') return weekStart(now);
  if (kind === 'month') return new Date(d.getFullYear(), d.getMonth(), 1).getTime();
  const [, month, day] = dob.split('-').map(Number);
  const thisYear = new Date(d.getFullYear(), month - 1, day).getTime();
  return thisYear <= now ? thisYear : new Date(d.getFullYear() - 1, month - 1, day).getTime();
}

/** The "one thing" still applies: set during the current week, month, or year since the birthday. */
export function focusIsCurrent(focus: Focus | undefined, dob: string, now = Date.now()): focus is Focus {
  return !!focus && focus.setAt >= periodStart(focus.period, dob, now);
}

/** "this week", "October", "your new year" */
export function freshStartLabel(kind: FreshStartKind, t: Strings, now = Date.now()) {
  if (kind === 'week') return t.plans.periodWeek;
  if (kind === 'month') return t.date.months[new Date(now).getMonth()];
  return t.plans.periodBirthday;
}

// ---------- Calendar (.ics) ----------

const ICS_DAYS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

const icsText = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** Lines longer than 75 octets must be folded (RFC 5545 §3.1), without splitting a character. */
function fold(line: string) {
  const parts: string[] = [];
  let part = '';
  let bytes = 0;
  for (const ch of line) {
    const size = new TextEncoder().encode(ch).length;
    if (bytes + size > 73) {
      parts.push(part);
      part = '';
      bytes = 0;
    }
    part += ch;
    bytes += size;
  }
  parts.push(part);
  return parts.join('\r\n ');
}

const pad = (n: number) => String(n).padStart(2, '0');
const localStamp = (t: number) => {
  const d = new Date(t);
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
};
const utcStamp = (t: number) => new Date(t).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/**
 * A repeating calendar event with a reminder at the plan's time. Floating local time (no time zone), so
 * "1:00 pm" stays 1:00 pm wherever they are. Built on the device; nothing is sent anywhere.
 */
export function planIcs(plan: Plan, title: string, t: Strings, now = Date.now()) {
  const start = nextOccurrence(plan, now);
  const days = WEEK_ORDER.filter((d) => plan.days.includes(d)).map((d) => ICS_DAYS[d]);
  const rule = days.length === 7 ? 'FREQ=DAILY' : `FREQ=WEEKLY;BYDAY=${days.join(',')}`;
  const description = `${planSentence(plan, t)} ${t.plans.calendarNote}`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Memento Mori//Plans//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:plan-${plan.createdAt}-${slug(title)}@memento-mori`,
    `DTSTAMP:${utcStamp(now)}`,
    `DTSTART:${localStamp(start)}`,
    'DURATION:PT15M',
    `RRULE:${rule}`,
    `SUMMARY:${icsText(title)}`,
    `DESCRIPTION:${icsText(description)}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'TRIGGER:PT0M',
    `DESCRIPTION:${icsText(title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(fold).join('\r\n') + '\r\n';
}

export function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'plan';
}

/** "Call Mom" from "call Mom": the event title. */
export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
