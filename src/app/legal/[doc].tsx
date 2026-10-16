import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ScreenLink } from '@/components/disclaimer';
import { DocNote, DocScreen, DocSection } from '@/components/doc-screen';
import { Paragraphs } from '@/components/linked-text';
import { ThemedText } from '@/components/themed-text';
import { DRAFT_NOTICE, LEGAL_DOCS, LEGAL_KEYS, LEGAL_VERSION, type LegalKey } from '@/lib/legal';

/** Terms of Use, Privacy Policy and the Consumer Health Data Privacy Policy, from src/lib/legal.ts. */
export default function LegalScreen() {
  const { doc } = useLocalSearchParams<{ doc: string }>();
  const found = LEGAL_KEYS.includes(doc as LegalKey) ? LEGAL_DOCS[doc as LegalKey] : null;

  if (!found) {
    return (
      <DocScreen eyebrow="Legal" title="Not found">
        <ThemedText type="small">There is no document here.</ThemedText>
        <Others current={null} />
      </DocScreen>
    );
  }

  return (
    <DocScreen eyebrow="Legal" title={found.title} lede={found.summary}>
      <DocNote>
        <ThemedText type="eyebrow" themeColor="danger">
          Draft
        </ThemedText>
        <ThemedText type="small" themeColor="fg">
          {DRAFT_NOTICE}
        </ThemedText>
      </DocNote>
      {found.sections.map((s) => (
        <DocSection key={s.heading} title={s.heading}>
          <Paragraphs body={s.body} />
        </DocSection>
      ))}
      <ThemedText type="small">Version {LEGAL_VERSION}</ThemedText>
      <Others current={found.key} />
    </DocScreen>
  );
}

function Others({ current }: { current: LegalKey | null }) {
  return (
    <View style={styles.links}>
      {LEGAL_KEYS.filter((k) => k !== current).map((k) => (
        <ScreenLink key={k} href={`/legal/${k}`} title={LEGAL_DOCS[k].title} />
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
