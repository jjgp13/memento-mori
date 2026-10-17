"""
Checks every wisdom entry against the public-domain texts it cites (docs/wisdom.md, "Verifying").

  scripts/fetch-wisdom-sources.sh /tmp/wisdom-sources      # once
  python scripts/verify-wisdom.py /tmp/wisdom-sources

Quotes must appear word for word (case, punctuation and footnote marks ignored; "…" may skip text, in
order), and the cited book/letter/section/chapter/verse is recomputed from the markers in the source
and must match. Stories and practices in our own words are checked by an anchor phrase from the passage
they retell (ANCHORS below), at the cited place.

Other languages (src/lib/wisdom-<lang>.ts): every entry that quotes a public-domain translation in that
language (`source`) is checked the same way against it. Entries we translated ourselves have nothing to
check against, beyond the English.
"""
import html
import json
import os
import re
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# A phrase from the passage each retold entry is based on. Add one when you add a story.
ANCHORS = {
    'meditations-4-32': ['Consider, for example, the times of Vespasian'],
    'meditations-1-practice': ['From my mother, piety and beneficence'],
    'letters-12-story': ['these plane-trees are neglected', 'I am Felicio'],
    'discourses-1-1-agrippinus': ['let us go and take our exercise', 'Let us go to Aricia then'],
    'discourses-1-11': ['when my little daughter was sick', 'Ought then the mother also to have left her'],
    'musonius-discourses-1-9': ['Musonius Rufus, in order to try me'],
    'zhuangzi-2-butterfly': ['dreamt I was a butterfly'],
    'zhuangzi-18-bowl': ['beating time on a bowl', 'spring, summer, autumn, and winter'],
    'zhuangzi-3-cook': ["Prince Hui's cook was cutting up a bullock", 'I have had this chopper nineteen years'],
    'boethius-1-p1-story': ['a woman of a countenance exceeding venerable'],
}

ROMAN = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100}


def r2i(s):
    s = s.upper()
    return sum(-ROMAN[c] if i + 1 < len(s) and ROMAN[s[i + 1]] > ROMAN[c] else ROMAN[c] for i, c in enumerate(s))


def i2r(n):
    n, out = int(n), ''
    for v, s in [(100, 'C'), (90, 'XC'), (50, 'L'), (40, 'XL'), (10, 'X'), (9, 'IX'), (5, 'V'), (4, 'IV'), (1, 'I')]:
        while n >= v:
            out += s
            n -= v
    return out


def read(path):
    raw = open(path, 'rb').read()
    for enc in ('utf-8', 'cp1252'):
        try:
            return raw.decode(enc).replace('\r', '')
        except UnicodeDecodeError:
            pass
    return raw.decode('utf-8', 'replace')


def wikisource_text(path):
    """Rendered Wikisource HTML → text, keeping Gummere's section numbers as [§N]."""
    t = read(path)
    t = re.sub(r'<style.*?</style>', '', t, flags=re.S)
    t = re.sub(r'<sup id="[^"]*"><b id="[^"]*">(\d+)\.</b></sup>', r' [§\1] ', t)
    t = re.sub(r'<sup.*?</sup>', '', t, flags=re.S)
    t = re.sub(r'</p>', '\n\n', t)
    return html.unescape(re.sub(r'<[^>]+>', '', t)).replace('​', '')


def mark(kind, value):
    return f' zzmark{kind}{value}zz '


def clean(t):
    t = t.lower().replace('’', "'").replace('‘', "'")
    t = re.sub(r'\[[a-z]\]|\[greek:[^\]]*\]|\{\d+\}|\+', '', t)
    return t.replace("'", '')


# Words: ASCII for the English sources (accents there are only in names), any letter for other languages.
WORD = {'en': r'[a-z0-9]+', 'other': r'[^\W_]+'}


def words_with_state(text, word=WORD['en']):
    words, states, state = [], [], {}
    for tok in re.findall(r'zzmark[a-z]+[0-9x]*zz|' + word, clean(text)):
        m = re.fullmatch(r'zzmark([a-z]+)([0-9x]*)zz', tok)
        if not m:
            words.append(tok)
            states.append(state)
            continue
        state = dict(state)
        state[m.group(1)] = m.group(2)
        drop = {'b': ('s', 'p', 'g'), 'p': ('g',), 'g': ('p',)}.get(m.group(1), ())
        for k in drop:
            state.pop(k, None)
    return words, states


class Sources:
    def __init__(self, folder):
        self.dir = folder
        self.cache = {}

    def lines(self, name):
        L = read(os.path.join(self.dir, name)).split('\n')
        end = next((i for i, l in enumerate(L) if l.startswith('*** END OF')), len(L))
        return L[:end]

    @staticmethod
    def after(L, pred, nth=-1):
        hits = [i for i, l in enumerate(L) if pred(l.strip())]
        return hits[nth]

    def scan(self, L, rules, start=0, stop=None):
        """rules: [(regex, kind, convert, keep_line)] applied to each line from `start`."""
        out = []
        for i in range(start, len(L)):
            line = L[i]
            if stop and i > start + 5 and stop(line):
                break
            keep = True
            for rx, kind, conv, keep_line in rules:
                m = re.match(rx, line)
                if m:
                    out.append(mark(kind, conv(m.group(1))))
                    keep = keep_line
                    break
            if keep:
                out.append(line)
        return '\n'.join(out)

    def meditations(self):
        L = self.lines('pg15877.txt')
        start = [i for i, l in enumerate(L) if l.strip() == 'THE THOUGHTS'][1]
        return self.scan(L, [(r'^([IVX]+)\.\s*$', 'b', r2i, False), (r'^(\d+)\.\s', 's', str, True)], start)

    def encheiridion(self):
        L = self.lines('pg10661.txt')
        start = self.after(L, lambda l: l == 'THE ENCHEIRIDION, OR MANUAL.')
        return self.scan(L, [(r'^([IVXL]+)\.\s*$', 'c', r2i, False)], start)

    def stewart(self, work):
        L = self.lines('pg64576.txt')
        if work == 'On the Shortness of Life':
            start = self.after(L, lambda l: l == 'OF THE SHORTNESS OF LIFE.')
            return self.scan(L, [(r'^([IVXL]+)\. ', 'c', r2i, True)], start, lambda l: re.match(r'^[A-Z][A-Z ,]+\.$', l))
        starts = [i for i, l in enumerate(L) if l.strip() == 'OF ANGER.']
        out = []
        for book, s in enumerate(starts, 1):
            stop = (lambda l: re.match(r'^[A-Z][A-Z ,]+\.$', l)) if book == len(starts) else (lambda l: l.strip() == 'OF ANGER.')
            out.append(mark('b', book) + self.scan(L, [(r'^([IVXL]+)\. ', 's', r2i, True)], s + 1, stop))
        return '\n'.join(out)

    def kjv(self, book):
        L = self.lines('pg10.txt')
        head = {'Ecclesiastes': 'Ecclesiastes', 'Psalms': 'The Book of Psalms'}[book]
        start = [i for i, l in enumerate(L) if l.strip() == head][1]
        return re.sub(r'(\d+):(\d+)', lambda m: mark('v', f'{m.group(1)}x{m.group(2)}'), '\n'.join(L[start:start + 30000]))

    def dhammapada(self):
        L = self.lines('pg2017.txt')
        start = self.after(L, lambda l: l.startswith('Chapter I. The Twin-Verses'))
        return self.scan(L, [(r'^(\d+)(?:, \d+)*\. ', 'v', str, True)], start)

    def tao(self):
        L = self.lines('pg216.txt')
        start = self.after(L, lambda l: l.startswith('Ch. 1. 1.'), 0)
        out, ch, para = [], 0, 0
        for line in L[start:]:
            m = re.match(r'^(?:Ch\. )?(\d+)\.(?: (\d+)\.)?', line)
            if m:
                n = int(m.group(1))
                if m.group(2) and n == ch + 1:
                    ch, para = n, int(m.group(2))
                    out.append(mark('c', ch))
                elif n == para + 1:
                    para = n
                elif n == ch + 1:
                    ch, para = n, 0
                    out.append(mark('c', ch))
            out.append(line)
        return '\n'.join(out)

    def giles(self):
        L = self.lines('pg59709.txt')
        start = self.after(L, lambda l: l == 'CHAPTER I.', 0)
        return self.scan(L, [(r'^CHAPTER ([IVXL]+)\.$', 'c', r2i, True)], start)

    def reina_valera(self, book):
        code = {'Ecclesiastes': 'ECC', 'Psalms': 'PSA'}[book]
        out = []
        for line in read(os.path.join(self.dir, 'rv1909', 'spaRV1909_vpl.txt')).split('\n'):
            m = re.match(r'^(\w+) (\d+):(\d+) (.*)$', line)
            if m and m.group(1) == code:
                out.append(mark('v', f'{m.group(2)}x{m.group(3)}') + m.group(4))
        return '\n'.join(out)

    def montaigne(self):
        L = self.lines('pg3600.txt')
        start = self.after(L, lambda l: l == 'BOOK THE FIRST', 0)
        books = {'FIRST': 1, 'SECOND': 2, 'THIRD': 3}
        return self.scan(L, [(r'^BOOK THE (FIRST|SECOND|THIRD)$', 'b', lambda x: books[x], False),
                             (r'^CHAPTER ([IVXL]+)', 's', r2i, True)], start)

    def boethius(self):
        L = self.lines('pg14328.txt')
        start = self.after(L, lambda l: l == 'BOOK I.')
        return self.scan(L, [(r'^BOOK ([IVX]+)\.$', 'b', r2i, False), (r'^SONG ([IVX]+)\.$', 'g', r2i, False),
                             (r'^([IVX]+)\.$', 'p', r2i, False)], start)

    def get(self, e):
        s, work, locus = e['source'], e['work'], e['locus']
        if s == 'gummere-letters':
            key = ('letter', int(locus.split('.')[0]))
            make = lambda: re.sub(r'\[§(\d+)\]', lambda m: mark('s', m.group(1)),
                                  wikisource_text(os.path.join(self.dir, 'letters', f'{key[1]}.html')))
        elif s == 'long-discourses':
            b, c = locus.split('.')
            key = ('discourse', r2i(b), int(c))
            make = lambda: wikisource_text(os.path.join(self.dir, 'discourses', f'{key[1]}.{key[2]}.html'))
        elif s == 'stewart-dialogues':
            key = (s, work)
            make = lambda: self.stewart(work)
        elif s == 'kjv':
            key = (s, work)
            make = lambda: self.kjv(work)
        elif s == 'reina-valera-1909':
            key = (s, work)
            make = lambda: self.reina_valera(work)
        else:
            key = (s,)
            make = {'long-meditations': self.meditations, 'long-encheiridion': self.encheiridion,
                    'muller-dhammapada': self.dhammapada, 'legge-tao': self.tao, 'giles-zhuangzi': self.giles,
                    'cotton-montaigne': self.montaigne, 'james-boethius': self.boethius}[s]
        if key not in self.cache:
            self.cache[key] = words_with_state(make(), WORD['other' if s in NOT_ENGLISH else 'en'])
        return self.cache[key]


def locus_at(e, st):
    s = e['source']
    if s == 'long-meditations':
        return f"{i2r(st.get('b', 0))}.{st.get('s', '1')}"
    if s == 'gummere-letters':
        return f"{e['locus'].split('.')[0]}.{st.get('s', '1')}"
    if s == 'stewart-dialogues':
        return f"{i2r(st.get('b', 0))}.{st.get('s')}" if e['work'] == 'On Anger' else str(st.get('c'))
    if s == 'long-encheiridion':
        return str(st.get('c'))
    if s == 'long-discourses':
        return e['locus']  # one file per chapter
    if s in ('kjv', 'reina-valera-1909'):
        return st.get('v', '?').replace('x', ':')
    if s == 'muller-dhammapada':
        return st.get('v', '?')
    if s == 'legge-tao':
        return st.get('c', '?')
    if s == 'giles-zhuangzi':
        return f"ch. {st.get('c')}"
    if s == 'cotton-montaigne':
        return f"{i2r(st.get('b', 0))}.{st.get('s')}"
    if s == 'james-boethius':
        b = i2r(st.get('b', 0))
        return f"{b}, prose {st['p']}" if 'p' in st else f"{b}, song {st.get('g')}"
    raise ValueError(s)


def num(x):
    return int(re.sub(r'\D', '', x) or 0)


def locus_ok(e, first, last):
    loc = e['locus']
    if '–' not in loc:
        return first == loc and (last == loc or e['licence'] == 'own-words')
    a, b = loc.split('–')
    if e['licence'] == 'own-words':  # "I.1–17", "12.1–3": anchors anywhere in that span
        return first.rsplit('.', 1)[0] == a.rsplit('.', 1)[0] and num(a.rsplit('.', 1)[-1]) <= num(first.rsplit('.', 1)[-1]) <= num(b)
    if first != a:
        return False
    sep = ':' if e['source'] in ('kjv', 'reina-valera-1909') else '.'
    return last.rsplit(sep, 1)[0] == a.rsplit(sep, 1)[0] and num(a.rsplit(sep, 1)[1]) <= num(last.rsplit(sep, 1)[1]) <= num(b)


def find(words, seg, start):
    n = len(seg)
    for i in range(start, len(words) - n + 1):
        if words[i] == seg[0] and words[i:i + n] == seg:
            return i
    return -1


# Languages with their own wisdom file, and the sources that aren't in English.
LANGS = {'es': ('wisdom-es.ts', 'ES')}
NOT_ENGLISH = {'reina-valera-1909'}


def load(file, name):
    js = f"import('./src/lib/{file}').then(m => process.stdout.write(JSON.stringify(m.{name})))"
    out = subprocess.run(['node', '-e', js], cwd=ROOT, capture_output=True, check=True).stdout
    return json.loads(out.decode('utf-8'))


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    entries = load('wisdom-data.ts', 'WISDOM')
    # The same entry in another language, where it quotes that language's own public-domain translation.
    for lang, (file, name) in LANGS.items():
        tr = load(file, name)['entries']
        entries += [{**e, 'id': f"{lang}/{e['id']}", 'text': tr[e['id']]['text'], 'source': tr[e['id']]['source']}
                    for e in list(entries) if '/' not in e['id'] and tr.get(e['id'], {}).get('source')]
    src = Sources(sys.argv[1])
    bad = 0
    for e in entries:
        words, states = src.get(e)
        phrases = e['text'].split('…') if e['licence'] == 'public-domain' else ANCHORS.get(e['id'], [])
        word = WORD['other' if e['source'] in NOT_ENGLISH else 'en']
        segs = [s for s in (re.findall(word, clean(p)) for p in phrases) if s]
        if not segs:
            print(f'{e["id"]}: retold entry needs an anchor phrase in ANCHORS')
            bad += 1
            continue
        pos, first, last = 0, None, None
        for seg in segs:
            i = find(words, seg, pos)
            if i < 0:
                k = len(seg)
                while k > 3 and find(words, seg[:k], pos) < 0:
                    k -= 1
                print(f'{e["id"]}: not in source after {k} of {len(seg)} words, near "{" ".join(seg[max(0, k - 2):k + 6])}"')
                bad += 1
                break
            first = i if first is None else first
            last, pos = i + len(seg) - 1, i + len(seg)
        else:
            a, b = locus_at(e, states[first]), locus_at(e, states[last])
            if not locus_ok(e, a, b):
                print(f'{e["id"]}: cited {e["locus"]}, found at {a}' + (f' to {b}' if b != a else ''))
                bad += 1
    print(f'{len(entries)} entries checked, {bad} problems')
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
