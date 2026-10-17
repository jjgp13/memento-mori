/**
 * Writes the Markdown copies of what the app shows from the same data, so they can't drift:
 *   docs/legal/{terms,privacy,health-data}.md  ← src/lib/legal.ts
 *   docs/sources.md                            ← src/lib/sources.ts
 * Run `npm run docs` after editing either file; `npm run docs -- --check` fails if a copy is out of date.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

import { DRAFT_NOTICE, LEGAL_DOCS, LEGAL_KEYS, LEGAL_VERSION } from '../src/lib/legal.ts';
import { STUDIES, reference, studiesByTopic, type Topic } from '../src/lib/sources.ts';

/** Topic headings for the Markdown copy (the app's are in the language catalogs, under `sources.topics`). */
const TOPIC_TITLE: Record<Topic, string> = {
  model: 'How the estimate is built',
  habits: 'Habits in the estimate',
  direction: 'Shown for direction, not in the estimate',
  behavior: 'Plans, prompts and reaching out',
  time: 'Where the hours go',
  loves: 'Loves: "N more times"',
};

const root = new URL('../', import.meta.url);
const check = process.argv.includes('--check');
const header = (from: string) => `<!-- Generated from ${from} by scripts/write-docs.mts. Edit that file, then run \`npm run docs\`. -->\n\n`;

/** In-app links ("/legal/privacy", "/sources") become links between the Markdown files. */
function links(text: string, from: 'legal' | 'root') {
  return text.replace(/\]\((\/[^)]*)\)/g, (_, href: string) => {
    const target = href.startsWith('/legal/')
      ? `${href.slice('/legal/'.length)}.md`
      : href === '/sources'
        ? 'sources.md'
        : href === '/how-it-works'
          ? 'science.md'
          : href;
    const inLegal = href.startsWith('/legal/');
    const path = from === 'legal' ? (inLegal ? target : `../${target}`) : inLegal ? `legal/${target}` : target;
    return `](${path})`;
  });
}

function body(paragraphs: string[], from: 'legal' | 'root') {
  return paragraphs.map((p) => links(p, from)).join('\n\n').replace(/\n\n- /g, '\n- ');
}

const files: Record<string, string> = {};

for (const key of LEGAL_KEYS) {
  const doc = LEGAL_DOCS[key];
  let md = header('src/lib/legal.ts');
  md += `# ${doc.title}\n\n> **${DRAFT_NOTICE}** Fill in every [BRACKETED] placeholder before launch.\n\n`;
  md += `_${doc.summary}_ Version ${LEGAL_VERSION}.\n\n`;
  for (const s of doc.sections) md += `## ${s.heading}\n\n${body(s.body, 'legal')}\n\n`;
  md += `---\n\n## Notes for the reviewing lawyer (not shown in the app)\n\n${doc.reviewNotes.map((n) => `- ${n}`).join('\n')}\n`;
  files[`docs/legal/${key}.md`] = md;
}

let index = header('src/lib/legal.ts');
index += '# Legal documents (drafts)\n\n';
index += `> **These are drafts and have not been reviewed by a lawyer.** They describe what the app does today (version ${LEGAL_VERSION}). The app shows the same text, linked from the welcome screen and the You screen. The documents stay English until reviewed; the disclaimer and support line around them are in every language catalog (\`src/i18n/strings\`, under \`disclaimer\`).\n\n`;
for (const key of LEGAL_KEYS) index += `- [${LEGAL_DOCS[key].title}](${key}.md): ${LEGAL_DOCS[key].summary}\n`;
files['docs/legal/README.md'] = index;

let sources = header('src/lib/sources.ts');
sources += `# Sources\n\nEvery study and data set cited in the app (${Object.keys(STUDIES).length} in all). The app's Sources screen shows the same list; each in-app source link draws from it. See also the Sources sections of [science.md](science.md) and [nudges.md](nudges.md), which also list background reading not cited in the app.\n\n`;
for (const t of studiesByTopic()) {
  sources += `## ${TOPIC_TITLE[t.key]}\n\n`;
  for (const s of t.studies) sources += `- ${reference(s)} — [link](${s.url})\n`;
  sources += '\n';
}
sources += `What each study is used for is on the app's Sources screen (\`sources.uses\` in the language catalogs).\n`;
files['docs/sources.md'] = sources;

let stale = 0;
for (const [path, content] of Object.entries(files)) {
  const url = new URL(path, root);
  let current = '';
  try {
    // Git may check files out with CRLF on Windows; compare content, not line endings.
    current = readFileSync(url, 'utf8').replace(/\r\n/g, '\n');
  } catch {
    // New file.
  }
  if (current === content) continue;
  if (check) {
    console.log(`OUT OF DATE: ${path}`);
    stale++;
  } else {
    mkdirSync(new URL('.', url), { recursive: true });
    writeFileSync(url, content);
    console.log(`wrote ${path}`);
  }
}
if (check) console.log(stale ? 'Run `npm run docs` to update.' : `OK: ${Object.keys(files).length} docs match the app`);
process.exit(stale ? 1 : 0);
