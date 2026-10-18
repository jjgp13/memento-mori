import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ScreenLink } from '@/components/disclaimer';
import { DocNote, DocScreen, DocSection } from '@/components/doc-screen';
import { Paragraphs } from '@/components/linked-text';
import { ThemedText } from '@/components/themed-text';
import { useT } from '@/i18n';
import { LEGAL_DOCS, LEGAL_KEYS, LEGAL_VERSION, type LegalKey } from '@/lib/legal';

/**
 * Terms of Use, Privacy Policy and the Consumer Health Data Privacy Policy, from src/lib/legal.ts. The
 * documents are English until a lawyer has reviewed them; everything around them follows the language.
 */
export default function LegalScreen() {
  const t = useT();
  const l = t.legal;
  const { doc } = useLocalSearchParams<{ doc: string }>();
  const found = LEGAL_KEYS.includes(doc as LegalKey) ? LEGAL_DOCS[doc as LegalKey] : null;

  if (!found) {
    return (
      <DocScreen eyebrow={l.eyebrow} title={l.notFound}>
        <ThemedText type="small">{l.notFoundBody}</ThemedText>
        <Others current={null} />
      </DocScreen>
    );
  }

  return (
    <DocScreen eyebrow={l.eyebrow} title={found.title} lede={found.summary}>
      <DocNote>
        <ThemedText type="eyebrow" themeColor="danger">
          {l.draft}
        </ThemedText>
        <ThemedText type="small" themeColor="fg">
          {l.draftNotice}
        </ThemedText>
        {l.englishOnly ? <ThemedText type="small">{l.englishOnly}</ThemedText> : null}
      </DocNote>
      {found.sections.map((s) => (
        <DocSection key={s.heading} title={s.heading}>
          <Paragraphs body={s.body} />
        </DocSection>
      ))}
      <ThemedText type="small">{l.version(LEGAL_VERSION)}</ThemedText>
      <Others current={found.key} />
    </DocScreen>
  );
}

/** Link titles in the reader's language. */
const TITLE: Record<LegalKey, 'terms' | 'privacy' | 'health'> = { terms: 'terms', privacy: 'privacy', 'health-data': 'health' };

function Others({ current }: { current: LegalKey | null }) {
  const l = useT().legal;
  return (
    <View style={styles.links}>
      {LEGAL_KEYS.filter((k) => k !== current).map((k) => (
        <ScreenLink key={k} href={`/legal/${k}`} title={l[TITLE[k]]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 16,
    rowGap: 4,
  },
});
