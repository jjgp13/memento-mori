import { Linking, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useT } from '@/i18n';
import { evidenceFor } from '@/lib/evidence';

/**
 * "Source: Holt-Lunstad et al. 2015 ↗" under any claim. `of` is a habit, lever or evidence key
 * (see evidenceFor), or pass `source` directly. Renders nothing if there's no source on file, so claims
 * never link to the wrong paper.
 */
export function SourceLink({
  of,
  source,
  prefix,
}: {
  of?: string;
  /** A source not in the ranked list (e.g. a behavior finding). */
  source?: { label: string; url: string };
  prefix?: string;
}) {
  const t = useT();
  const label = prefix ?? t.common.source;
  const found = source ?? (of ? evidenceFor(of)?.source : undefined);
  if (!found) return null;

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={t.common.sourceA11y(label, found.label)}
      onPress={() => Linking.openURL(found.url)}
      hitSlop={6}>
      <ThemedText type="small" themeColor="accent" style={styles.link}>
        {label}: {found.label} ↗
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    fontSize: 12.5,
    textDecorationLine: 'underline',
  },
});
