# Wisdom from people who lived before us

Memento Mori opens every day with words from someone who already lived a whole life: a quote, a short
story or a practice, a question to sit with and, often, one small thing to do today. This is the design
of that library: what an entry is, where the words come from, how the app chooses one, and how it could
grow later without an account or a server knowing anything about the person.

Code: entries in [`src/lib/wisdom-data.ts`](../src/lib/wisdom-data.ts), selection in
[`src/lib/wisdom.ts`](../src/lib/wisdom.ts), shown by [`TodaysWords`](../src/components/wisdom-card.tsx) in
the opening sequence and on Today. October 2026 starter set: **114 entries**, every one checked against
its source.

**Languages.** English and Spanish have the library (`LIBRARY` in `src/lib/wisdom.ts`; Spanish entries
in [`src/lib/wisdom-es.ts`](../src/lib/wisdom-es.ts), §5). The other nine languages keep showing the short
quote and question lists in their catalogs (`daily.quotes`, `daily.questions` in `src/i18n/strings/`)
until their entries are translated. The card's own labels ("A story", "You could", "Retold from …",
"Our translation, from … English") are in every catalog, under `wisdom`.

---

## 1. What an entry is

| Field | What it holds |
| --- | --- |
| `id` | Stable forever (`meditations-4-17`, `letters-63-8`). Used for "already seen" on the device and as the row key if we ever sync. |
| `type` | `quote`, `story` (a short scene retold) or `practice` (something to try: Seneca's evening review, Marcus's list of debts). |
| `text` | Quote: **exactly** as the translation has it. Story: our own words, at most ~75 words. |
| `modern` | Optional, quotes only. The same sentence with "thou/thee/hast" brought up to date ("Do not act as if you were going to live ten thousand years"). Shown in the app; never changes the meaning. |
| `author` | Key into `AUTHORS`: name, dates, and one line on who they were. |
| `work`, `locus` | The work and the exact place: book.section (Meditations IV.17), letter.section (Letters 63.8), chapter (Tao Te Ching 64), chapter:verse (Ecclesiastes 3:1–2), book and part (Consolation II, prose 4). |
| `source` | Key into `SOURCES`: the translation, translator, year and a link to the full text online. |
| `licence` | `public-domain` (the text quotes a public-domain translation) or `own-words` (we retold it). |
| `themes` | Any of `mortality`, `time`, `love`, `gratitude`, `presence`, `adversity`, `habits`. |
| `values` | Which of the person's values (`src/lib/values.ts`: family, partner, friends, health, craft, learning, creating, faith, nature, adventure, service, peace) it speaks to. |
| `question` | A question to sit with today. `{day}` becomes the weekday. |
| `action` | One small thing to do today, written to finish the sentence "You could …". `{person}` becomes someone they love. **Required whenever `themes` includes `mortality`.** |

Why these rules:
- **Every death reminder comes with something doable.** Mortality reminders help when paired with a clear
  action and can backfire without one ([nudges.md §1g](nudges.md)). `check:wisdom` fails if a
  `mortality` entry has no `action`.
- **"Could", not "should"** ([nudges.md §1i](nudges.md)). Actions are offered, never assigned; the check
  rejects "should" and "must".
- **Short.** Each entry fits one phone screen in the opening sequence (60 words for quotes, 75 for stories).

## 2. Where the words come from

Only translations that are in the public domain, quoted exactly; or our own retelling of a passage, with
the passage cited. No modern copyrighted translations (Hays, Hard, Campbell, Costa and the like), even
for one line.

| Author | Work | Translation | Full text |
| --- | --- | --- | --- |
| Marcus Aurelius | Meditations | George Long, 1862 | [Gutenberg 15877](https://www.gutenberg.org/ebooks/15877) |
| Seneca | Moral Letters to Lucilius | Richard Mott Gummere, 1917–1925 (Loeb; published before 1929) | [Wikisource](https://en.wikisource.org/wiki/Moral_letters_to_Lucilius) |
| Seneca | On the Shortness of Life, On Anger | Aubrey Stewart, 1889 | [Gutenberg 64576](https://www.gutenberg.org/ebooks/64576) |
| Epictetus | Discourses | George Long, 1877 | [Wikisource](https://en.wikisource.org/wiki/The_Discourses_of_Epictetus;_with_the_Encheiridion_and_Fragments) |
| Epictetus | Enchiridion | George Long, 1877 | [Gutenberg 10661](https://www.gutenberg.org/ebooks/10661) |
| Musonius Rufus | as quoted in Epictetus' Discourses | George Long, 1877 | as above |
| Ecclesiastes, Psalms | Hebrew Bible | King James Version, 1611 | [Gutenberg 10](https://www.gutenberg.org/ebooks/10) |
| The Buddha | Dhammapada | F. Max Müller, 1881 | [Gutenberg 2017](https://www.gutenberg.org/ebooks/2017) |
| Laozi | Tao Te Ching | James Legge, 1891 | [Gutenberg 216](https://www.gutenberg.org/ebooks/216) |
| Zhuangzi | Zhuangzi | Herbert A. Giles, 1889 | [Gutenberg 59709](https://www.gutenberg.org/ebooks/59709) |
| Montaigne | Essays | Charles Cotton, ed. W. C. Hazlitt, 1877 | [Gutenberg 3600](https://www.gutenberg.org/ebooks/3600) |
| Boethius | The Consolation of Philosophy | H. R. James, 1897 | [Gutenberg 14328](https://www.gutenberg.org/ebooks/14328) |
| Ecclesiastes, Psalms (Spanish) | Hebrew Bible | Reina-Valera, 1909 revision | [eBible.org spaRV1909](https://ebible.org/spaRV1909/) |

The citation under each entry in the app opens that full text (for Seneca's letters and Epictetus'
Discourses, the exact letter or chapter).

Notes on numbering and choices:
- **Citations follow the translation we quote.** Long's Enchiridion has 52 chapters; his 50 holds what
  some editions split into 50 and 51. Cotton's Montaigne numbers "That to study philosophy is to learn to
  die" I.19 (I.20 in modern French editions).
- **Musonius Rufus** has no public-domain English translation of his lectures (Cora Lutz's 1947
  translation may still be in copyright), so for now his entries are sayings Epictetus remembered, in
  Long's translation. Retold summaries of his lectures (on training, on old age, on women studying
  philosophy) could be added in our own words once checked against the Greek or Lutz.
- **What was left out.** Popular "Stoic quotes" online are often modern paraphrases or misattributed.
  Anything we couldn't find in a public-domain text was dropped. That includes three lines from the old
  hard-coded list in `daily.ts`: "It is not that we have a short time to live, but that we waste much of
  it" (modern translation wording; Stewart's 1889 version is used instead), "Let us prepare our minds as
  if we had come to the very end of life" (a paraphrase of Letters 101.7; the exact Gummere text is used
  instead), and "No man is free who is not master of himself" (cited only as "Fragments"; not found in
  Long). Also left for later: Kisa Gotami and the mustard seed (from the Dhammapada commentary, not in
  Müller's text) and Musonius's saying on toil and pleasure in Aulus Gellius (Rolfe's translation of
  that book may still be in copyright).
- **Gentleness over completeness.** A few famous lines read as cold to someone grieving (Epictetus on
  kissing your child and saying "tomorrow you may die", Enchiridion 11's "Is your child dead? It has
  been restored"). We left them out or kept only the gentler first sentence, and paired loss with
  remembering ("Let us see to it that the recollection of those whom we have lost becomes a pleasant
  memory", Letters 63.4).

## 3. How the app chooses today's entry

Everything happens on the device ([`pickWisdom`](../src/lib/wisdom.ts)); nothing about the person is sent
anywhere.

1. **No repeats for months.** The last ¾ of the library's size (85 entries at 114) can't come back.
   History is a list of ids in device preferences (`wisdomSeen`).
2. **Weighted, never exclusive.** Every entry starts at weight 1:
   - +1.5 for each of the person's values it matches (family, faith, health…);
   - +2 for `love` entries on days the count is about someone they love; +0.5 if they have added any loves;
   - fresh starts ([nudges.md §1d](nudges.md)): +2 for `gratitude`/`time` on their birthday, +1 for
     `habits` on Mondays and the 1st;
   - death reminders are spaced out: ×0.25 if yesterday's entry was also about mortality.
3. **Seeded by the date and the person**, so the pick is stable for the day. It is also remembered
   (`wisdomDay`, `wisdomId`) so the opening sequence and Today always agree and editing answers mid-day
   doesn't change it.
4. **Personal touches.** `{person}` in an action becomes the person today's count is about, or whoever is
   most due a hello (`whoToReachOut`), or "someone you love"; `{day}` becomes the weekday.

How it shows: the quote in italics (the `modern` text when present), or "A story"/"A practice" for the
others; the citation ("Marcus Aurelius · Meditations IV.17", or "Retold from …") with the translator and
year, linked to the full text; the question; and "You could …" with the action when there is one.

## 4. Verifying

```bash
npm run check:wisdom                                   # shape and tone rules (ids, themes, actions, length)
scripts/fetch-wisdom-sources.sh /tmp/wisdom-sources    # once: downloads the translations (~12 MB)
python scripts/verify-wisdom.py /tmp/wisdom-sources    # every quote word for word, every citation
```

`verify-wisdom.py` finds each quote in its source (ignoring case, punctuation and footnote marks; "…"
may skip text, in order), then recomputes the book/letter/section/chapter/verse from the markers in the
text and fails if it differs from `locus`. Retold entries are checked with an anchor phrase from their
passage (`ANCHORS` in the script). Entries in another language that quote that language's own
translation (`source` in `wisdom-<lang>.ts`) are checked the same way. October 2026: 114 English entries
and the 11 Spanish ones quoting the Reina-Valera, 0 problems.

`check:wisdom` also checks every language file: all 114 ids present, an action exactly where English has
one, the same `{person}`/`{day}` placeholders, questions that look like questions in that language
("¿…?"), actions starting lower case with no "should" words (Spanish: *debes*, *deberías*, *tienes que*,
*hay que*), and at most 1.3× the English word limits.

### Adding an entry
1. Find the passage in one of the sources above (or add a new public-domain source to `SOURCES`, the
   table here, and the two scripts).
2. Copy the text exactly; use "…" for cuts. Add `modern` only if the English is archaic.
3. Cite the exact place, pick themes and values, write a gentle question, and an action ("You could …")
   if it touches death or naturally invites one.
4. For a story or practice in your own words, add an anchor phrase to `ANCHORS`.
5. Run the three commands above.

## 5. Later: other languages, and updates without accounts

**Translating the library.** The originals are Greek, Latin, Hebrew, Pali, Classical Chinese and old
French, so the honest path per language is: use a public-domain translation in that language where one
exists (Reina-Valera 1909 for Ecclesiastes in Spanish, Luther 1912 in German, older French translations
of Marc Aurèle and Sénèque…), checked the same way as the English; otherwise translate the English entry
ourselves and say so. Questions and actions are ours and can be translated freely, keeping "could, not
should" ([nudges.md §1i](nudges.md)).

How it fits together:
- Each language is one file, `src/lib/wisdom-<lang>.ts`, holding a `WisdomLanguage`: author names, work
  names, locus words ("prose" → "prosa") and, for every id, a `WisdomText` (`text`, optional `modern`,
  optional `source`, `question`, `action`). Add it to `LANGUAGES` in `wisdom.ts`, to `check-wisdom.mts`
  (with that language's question and "should" rules) and to `LANGS` in `verify-wisdom.py`.
- With `source` (a public-domain translation in that language, added to `SOURCES` with its `lang`), the
  text is quoted exactly and cited as that translation. Without it, a quote becomes our translation:
  licence `own-words`, `translated: true`, shown as a quote with "Our translation, from George Long's
  English (1862)" linking to the English it comes from. Stories stay "Retold from …".
- Once a language has the library, delete its catalog's `daily.quotes` and `daily.questions` (they are
  optional in the `Strings` type). The old lists hold three lines flagged in §2 as unverified, so each
  language moved over drops them.

Status, October 2026:
- **Spanish (es-MX): done.** Ecclesiastes and Psalms quote the Reina-Valera 1909 (11 entries, verified;
  `modern` only updates spelling: "á" → "a", "Criador" → "Creador"). Everything else is our translation
  from the English. The Spanish public-domain versions we found can't be quoted exactly yet: Jacinto
  Díaz de Miranda's *Soliloquios* of Marcus Aurelius (1785, in *Obras de los moralistas griegos*, 1888)
  and Antonio Brum's *Enquiridión* are on Spanish Wikisource only as unproofread OCR, with their own
  numbering; Francisco Navarro y Calvo's *Epístolas morales* of Seneca (1884) is a scan; the Wikisource
  *Consolación* is a modern collaborative translation (CC BY-SA, not public domain). Proofreading the
  Navarro y Calvo letters would be the next step up.
- **Other nine languages: not started.** They show their catalog's fallback lists until then.

CLAUDE.md plans a Supabase `daily_content` table. The entry shape here is already that row:

- **Table** `daily_content`: the fields above, plus `status` (`draft` → `reviewed` → `published`),
  `updated_at`, and `retired` (to withdraw an entry without breaking anyone's history). `authors` and
  `sources` as their own small tables. Published rows readable by anyone (RLS `select` where
  `status = 'published'`); writes only by editors.
- **Sync**: on launch when online, at most once a week, the app asks for published rows changed since its
  last sync. Same request for everyone, no account, no identifiers, nothing about the person. Rows are
  merged into a local cache by `id`; the bundled set stays as the offline floor. Selection stays on device.
- **Review**: the weekly science job (CLAUDE.md) can draft entries too, but each one goes through the
  same checks (`verify-wisdom.py` against a public-domain text) and a human read before `published`.
- **Later ideas**: more traditions with public-domain translations (Thomas à Kempis, Kenkō, Rumi in
  Nicholson's translation, more Psalms); saving favourites on the device; sharing an entry as an image.
