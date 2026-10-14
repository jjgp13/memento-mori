import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Stand-in for a screen section that will be ported from prototype/index.html. */
export function Placeholder({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  const theme = useTheme();

  return (
    <View style={styles.wrap}>
      <ThemedText type="eyebrow">{eyebrow}</ThemedText>
      <ThemedText type="subtitle">{title}</ThemedText>
      <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
        <ThemedText type="small">{body}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
  },
  card: {
    marginTop: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: Radius.card,
    padding: 16,
  },
});
