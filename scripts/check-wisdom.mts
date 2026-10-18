/**
 * Checks the shape and tone rules of the wisdom library (src/lib/wisdom-data.ts, docs/wisdom.md).
 * Run with `npm run check:wisdom`. That every quote matches its source word for word is checked by
 * scripts/verify-wisdom.py against the downloaded texts (see docs/wisdom.md, "Verifying").
 */
import * as W from '../src/lib/wisdom-data.ts';
import { ES } from '../src/lib/wisdom-es.ts';
import { VALUES } from '../src/lib/values.ts';

const problems: string[] = [];
const fail = (id: string, why: string) => problems.push(`${id}: ${why}`);
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
const valueKeys = new Set<string>(VALUES);
const ids = new Set<string>();

for (const w of W.WISDOM) {
  if (!/^[a-z0-9-]+$/.test(w.id)) fail(w.id, 'id must be lowercase-kebab');
  if (ids.has(w.id)) fail(w.id, 'duplicate id');
  ids.add(w.id);
  if (!W.AUTHORS[w.author]) fail(w.id, `unknown author ${w.author}`);
  if (!W.SOURCES[w.source]) fail(w.id, `unknown source ${w.source}`);
  if (!w.locus.trim()) fail(w.id, 'missing locus');
  if (!w.themes.length) fail(w.id, 'needs at least one theme');
  for (const t of w.themes) if (!W.THEMES.includes(t)) fail(w.id, `unknown theme ${t}`);
  for (const v of w.values ?? []) if (!valueKeys.has(v)) fail(w.id, `unknown value ${v}`);
  if (w.type === 'story' && w.licence !== 'own-words') fail(w.id, 'stories are retold in our own words');
  if (w.licence === 'own-words' && w.modern) fail(w.id, '`modern` is only for quotes');
  // Fits on one phone screen in the opening sequence.
  const limit = w.licence === 'own-words' ? 75 : 60;
  if (words(w.modern ?? w.text) > limit) fail(w.id, `longer than ${limit} words`);
  if (!w.question.trim().endsWith('?')) fail(w.id, 'question should end with "?"');
  // Death reminders always come with one doable thing (docs/nudges.md §1g).
  if (w.themes.includes('mortality') && !w.action) fail(w.id, 'mortality needs an action');
  // Actions finish "You could …": lower case, a full sentence, no "should".
  if (w.action) {
    if (!/^[a-z{]/.test(w.action)) fail(w.id, 'action starts lower case ("You could …")');
    if (!/[.!]$/.test(w.action)) fail(w.id, 'action ends with a full stop');
    if (/\bshould\b|\bmust\b/i.test(w.action)) fail(w.id, '"could", not "should"');
  }
  for (const s of [w.text, w.modern ?? '']) if (/[{}]/.test(s)) fail(w.id, 'placeholders belong in question/action only');
}

// ───────────── Other languages (docs/wisdom.md §5) ─────────────
/** Per language: how its questions look, and words that would turn "could" into "should". */
const RULES: Record<string, { question: RegExp; should: RegExp }> = {
  es: { question: /^(¿|.*, ¿).*\?$/s, should: /(?<!\p{L})(deb(e|es|er\p{L}*)|tienes que|tendrías que|hay que)(?!\p{L})/iu },
};
const placeholders = (s = '') => [...s.matchAll(/\{\w+\}/g)].map((m) => m[0]).sort().join(' ');
const wordsIn = (s: string) => s.split(/\s+/).filter((x) => /[\p{L}\p{N}]/u.test(x)).length;

for (const L of [ES]) {
  const rules = RULES[L.lang];
  const at = (id: string, why: string) => fail(`${L.lang}/${id}`, why);
  if (!rules) problems.push(`${L.lang}: add its rules to RULES`);
  for (const a of Object.keys(W.AUTHORS)) if (!L.authors[a as W.AuthorKey]?.trim()) at(a, 'author name missing');
  for (const w of new Set(W.WISDOM.map((x) => x.work))) if (!L.works[w]) at(w, 'work name missing');
  for (const id of Object.keys(L.entries)) if (!ids.has(id)) at(id, 'no such entry in English');
  let pd = 0;
  for (const w of W.WISDOM) {
    const e = L.entries[w.id];
    if (!e) {
      at(w.id, 'missing');
      continue;
    }
    if (e.source) {
      pd++;
      const s = W.SOURCES[e.source];
      if (!s) at(w.id, `unknown source ${e.source}`);
      else if (s.lang !== L.lang) at(w.id, `${e.source} is not a ${L.lang} translation`);
      if (w.licence !== 'public-domain') at(w.id, 'retold entries are ours; they have no source of their own');
    } else if (e.modern) at(w.id, '`modern` is only for quotes from a translation in this language');
    // A little more room than English: most languages run longer.
    const limit = Math.round((w.licence === 'own-words' ? 75 : 60) * 1.3);
    if (wordsIn(e.modern ?? e.text) > limit) at(w.id, `longer than ${limit} words`);
    for (const s of [e.text, e.modern ?? '']) if (/[{}]/.test(s)) at(w.id, 'placeholders belong in question/action only');
    if (rules && !rules.question.test(e.question.trim())) at(w.id, `question doesn't look like a ${L.lang} question`);
    if (placeholders(e.question) !== placeholders(w.question)) at(w.id, 'question placeholders differ from English');
    if (!!e.action !== !!w.action) at(w.id, w.action ? 'needs an action, like the English' : 'English has no action here');
    if (e.action) {
      if (placeholders(e.action) !== placeholders(w.action)) at(w.id, 'action placeholders differ from English');
      if (!/^[\p{Ll}{]/u.test(e.action)) at(w.id, 'action starts lower case (it finishes "You could …")');
      if (!/[.!]$/.test(e.action)) at(w.id, 'action ends with a full stop');
      if (rules?.should.test(e.action)) at(w.id, '"could", not "should"');
    }
  }
  console.log(`${L.lang}: ${Object.keys(L.entries).length} entries, ${pd} quoting its own public-domain translation`);
}

const byTheme = Object.fromEntries(W.THEMES.map((t) => [t, W.WISDOM.filter((w) => w.themes.includes(t)).length]));
const byAuthor = Object.fromEntries(
  Object.keys(W.AUTHORS).map((a) => [a, W.WISDOM.filter((w) => w.author === a).length]),
);
console.log(`${W.WISDOM.length} entries`);
console.log('by theme ', byTheme);
console.log('by author', byAuthor);
for (const t of W.THEMES) if (byTheme[t] < 5) problems.push(`theme ${t}: fewer than 5 entries`);

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('ok');
