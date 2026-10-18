/**
 * Picks today's entry from the wisdom library, on the device: weighted toward the person's values and
 * the day's count, never the same entry again for a few months. Nothing about the person leaves the
 * phone. Rules and sources: docs/wisdom.md. The entries live in wisdom-data.ts.
 */
import { useEffect } from 'react';

import type { Lang, Strings } from '@/i18n';
import { whoToReachOut, type Love } from '@/lib/loves';
import { freshStart } from '@/lib/plans';
import { setPrefs, usePrefs } from '@/lib/prefs';
import type { Profile } from '@/lib/profile';
import { AUTHORS, SOURCES, WISDOM, type Theme, type Wisdom, type WisdomLanguage } from '@/lib/wisdom-data';
import { ES } from '@/lib/wisdom-es';

export { AUTHORS, SOURCES, WISDOM, type Wisdom };

const LANGUAGES: Partial<Record<Lang, WisdomLanguage>> = { es: ES };

/**
 * The same entries in another language: its own public-domain translation where it has one (quoted
 * and cited as such), otherwise our translation of the English, citing the translation it comes from.
 */
function localize(l: WisdomLanguage): Wisdom[] {
  return WISDOM.map((w) => {
    const e = l.entries[w.id];
    const own = !e.source && w.licence === 'public-domain';
    return {
      ...w,
      text: e.text,
      modern: e.modern,
      question: e.question,
      action: e.action,
      work: l.works[w.work] ?? w.work,
      locus: (l.locus ?? []).reduce((loc, [en, here]) => loc.replace(en, here), w.locus),
      source: e.source ?? w.source,
      licence: own ? 'own-words' : w.licence,
      translated: own || undefined,
    };
  });
}

/**
 * The library in each language that has it (docs/wisdom.md §5). The others show the short quote list in
 * their catalog until their entries are translated.
 */
export const LIBRARY: Partial<Record<Lang, Wisdom[]>> = {
  en: WISDOM,
  ...Object.fromEntries(Object.entries(LANGUAGES).map(([lang, l]) => [lang, localize(l)])),
};
const SEEN_MAX = 300;

/** Local calendar day, so the entry changes at the person's midnight, not UTC's. */
export function dayKey(now = Date.now()) {
  const d = new Date(now);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export type WisdomContext = {
  /** The entries to pick from (one language's library). Defaults to the English library. */
  library?: Wisdom[];
  profile: Profile;
  now: number;
  /** Ids already shown, most recent first. */
  seen: string[];
  /** Who or what today's count is about, if anyone: love-themed entries come up more that day. */
  love?: Love;
};

const has = (w: Wisdom, theme: Theme) => w.themes.includes(theme);

/** How likely an entry is today. Everything stays possible; matches just come up more often. */
export function wisdomWeight(w: Wisdom, { profile, now, seen, love }: WisdomContext) {
  let weight = 1;
  for (const v of profile.values ?? []) if (w.values?.includes(v)) weight += 1.5;
  if (has(w, 'love')) weight += love ? 2 : (profile.loves ?? []).length ? 0.5 : 0;
  const fresh = freshStart(profile.dob, now);
  if (fresh === 'birthday' && (has(w, 'gratitude') || has(w, 'time'))) weight += 2;
  if ((fresh === 'week' || fresh === 'month') && has(w, 'habits')) weight += 1;
  // A death reminder works best now and then, with something to do (docs/nudges.md §1b, §1g): not two days running.
  const yesterday = WISDOM.find((x) => x.id === seen[0]);
  if (has(w, 'mortality') && yesterday && has(yesterday, 'mortality')) weight *= 0.25;
  return weight;
}

/** Small seeded generator, so a given day and person always get the same pick. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export function pickWisdom(ctx: WisdomContext): Wisdom {
  const library = ctx.library ?? WISDOM;
  // Entries shown this recently can't come back: three-quarters of the library, so months.
  const recent = new Set(ctx.seen.slice(0, Math.floor(library.length * 0.75)));
  const fresh = library.filter((w) => !recent.has(w.id));
  const pool = fresh.length ? fresh : library.filter((w) => w.id !== ctx.seen[0]);
  const weights = pool.map((w) => wisdomWeight(w, ctx));
  let r = seeded(`${dayKey(ctx.now)}|${ctx.profile.dob}`)() * weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r < 0) return pool[i];
  }
  return pool[pool.length - 1];
}

/**
 * Today's entry, or null in a language without the library yet. Picked once a day and remembered, so
 * the opening sequence and the Today screen agree and it doesn't change if they edit their answers.
 */
export function useTodaysWisdom(profile: Profile, now: number, lang: Lang, love?: Love): Wisdom | null {
  const { wisdomDay, wisdomId, wisdomSeen } = usePrefs();
  const library = LIBRARY[lang];
  const day = dayKey(now);
  const stored = wisdomDay === day ? library?.find((w) => w.id === wisdomId) : undefined;
  const entry = library ? (stored ?? pickWisdom({ library, profile, now, seen: wisdomSeen, love })) : null;

  useEffect(() => {
    if (stored || !entry) return;
    setPrefs({
      wisdomDay: day,
      wisdomId: entry.id,
      wisdomSeen: [entry.id, ...wisdomSeen.filter((id) => id !== entry.id)].slice(0, SEEN_MAX),
    });
  }, [stored, day, entry, wisdomSeen]);

  return entry;
}

/** What to show: today's English when we have it, otherwise the translation as written. */
export const wisdomText = (w: Wisdom) => w.modern ?? w.text;

/** "Marcus Aurelius · Meditations IV.17", "Ecclesiastes 3:1–2", in the language of the entry. */
export function wisdomCite(w: Wisdom, lang: Lang) {
  const author = AUTHORS[w.author];
  const where = `${w.work} ${w.locus}`;
  return author.workOnly ? where : `${LANGUAGES[lang]?.authors[w.author] ?? author.name} · ${where}`;
}

/** Where to read it in full: the exact letter or chapter when the source is split that way. */
/** The translations a language's library quotes, in the order they first appear (for the Sources screen). */
export function librarySources(library: Wisdom[]) {
  const keys = [...new Set(library.map((w) => w.source))];
  return keys.map((key) => ({ key, ...SOURCES[key] }));
}

export function wisdomSource(w: Wisdom, t: Strings) {
  const s = SOURCES[w.source];
  let url = s.url;
  if (w.source === 'gummere-letters') url = `${s.url}/Letter_${parseInt(w.locus, 10)}`;
  if (w.source === 'long-discourses') {
    const [book, chapter] = w.locus.split('.');
    url = `${s.url}/Book_${['I', 'II', 'III', 'IV'].indexOf(book) + 1}/Chapter_${parseInt(chapter, 10)}`;
  }
  if (w.source === 'reina-valera-1909') {
    const chapter = parseInt(w.locus, 10);
    url = w.author === 'psalms' ? `${s.url}PSA${String(chapter).padStart(3, '0')}.htm` : `${s.url}ECC${String(chapter).padStart(2, '0')}.htm`;
  }
  const label = w.translated
    ? t.wisdom.ourTranslation(s.translator, s.year)
    : w.licence === 'own-words'
      ? t.wisdom.readIn(s.translator)
      : `${s.translator}, ${s.year}`;
  return { label, url };
}

/** Fills in `{day}` and `{person}`: today's person if the count is about one, else whoever is due a hello. */
export function personalize(text: string, profile: Profile, now: number, t: Strings, love?: Love) {
  const person = love?.kind === 'person' ? love : whoToReachOut(profile.loves ?? []);
  const weekday = t.date.weekdays[new Date(now).getDay()];
  return text.replace(/\{day\}/g, weekday).replace(/\{person\}/g, person?.name ?? t.wisdom.someoneYouLove);
}
