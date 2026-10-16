/**
 * Checks the shape and tone rules of the wisdom library (src/lib/wisdom-data.ts, docs/wisdom.md).
 * Run with `npm run check:wisdom`. That every quote matches its source word for word is checked by
 * scripts/verify-wisdom.py against the downloaded texts (see docs/wisdom.md, "Verifying").
 */
import * as W from '../src/lib/wisdom-data.ts';
import { VALUES } from '../src/lib/values.ts';

const problems: string[] = [];
const fail = (id: string, why: string) => problems.push(`${id}: ${why}`);
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
const valueKeys = new Set<string>(VALUES.map((v) => v.key));
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
