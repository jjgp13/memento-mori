import { Linking, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { evidenceFor } from '@/lib/evidence';

/**
 * "Source: Holt-Lunstad et al. 2015 ↗" under any claim. `of` is a habit, lever or evidence key
 * (see evidenceFor). Renders nothing if there's no source on file, so claims never link to the wrong paper.
 */
export function SourceLink({ of, prefix = 'Source' }: { of: string; prefix?: string }) {
  const evidence = evidenceFor(of);
  if (!evidence) return null;

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`${prefix}: ${evidence.source.label}, opens in browser`}
      onPress={() => Linking.openURL(evidence.source.url)}
      hitSlop={6}>
      <ThemedText type="small" themeColor="accent" style={styles.link}>
        {prefix}: {evidence.source.label} ↗
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
