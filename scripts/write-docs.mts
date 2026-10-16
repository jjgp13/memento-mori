/**
 * Writes the Markdown copies of what the app shows from the same data, so they can't drift:
 *   docs/legal/{terms,privacy,health-data}.md  ← src/lib/legal.ts
 *   docs/sources.md                            ← src/lib/sources.ts
 * Run `npm run docs` after editing either file; `npm run docs -- --check` fails if a copy is out of date.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

import { DRAFT_NOTICE, LEGAL_DOCS, LEGAL_KEYS, LEGAL_VERSION, SUPPORT, DISCLAIMER } from '../src/lib/legal.ts';
import { QUOTE_SOURCES, STUDIES, reference, studiesByTopic } from '../src/lib/sources.ts';

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
index += `> **These are drafts and have not been reviewed by a lawyer.** They describe what the app does today (version ${LEGAL_VERSION}). The app shows the same text under You and on the welcome screen.\n\n`;
for (const key of LEGAL_KEYS) index += `- [${LEGAL_DOCS[key].title}](${key}.md): ${LEGAL_DOCS[key].summary}\n`;
index += `\n## Disclaimer shown in the app\n\n${DISCLAIMER.points.map((p) => `- ${p}`).join('\n')}\n\n`;
index += `## Support line\n\n${links(SUPPORT.text, 'legal')}\n`;
files['docs/legal/README.md'] = index;

let sources = header('src/lib/sources.ts');
sources += `# Sources\n\nEvery study and data set cited in the app (${Object.keys(STUDIES).length} in all). The app's Sources screen shows the same list; each in-app source link draws from it. See also the Sources sections of [science.md](science.md) and [nudges.md](nudges.md), which also list background reading not cited in the app.\n\n`;
for (const t of studiesByTopic()) {
  sources += `## ${t.title}\n\n_${t.blurb}_\n\n`;
  for (const s of t.studies) sources += `- ${reference(s)} — [link](${s.url})  \n  Used for: ${s.usedFor}\n`;
  sources += '\n';
}
sources += `## Quotes\n\n${QUOTE_SOURCES}\n`;
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
