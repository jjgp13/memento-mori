import { Linking, Pressable, StyleSheet, View, type StyleProp, type TextStyle } from 'react-native';

import { ThemedText, type ThemedTextProps } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import type { Love } from '@/lib/loves';
import type { Profile } from '@/lib/profile';
import { personalize, wisdomCite, wisdomSource, wisdomText, type Wisdom } from '@/lib/wisdom';

/**
 * Today's words from someone who lived before us: the quote (or a story retold), who said it and where,
 * a question to sit with, and, when there is one, a small thing they could do. The citation opens the
 * full text, so every line can be checked.
 */
export function WisdomCard({
  entry,
  profile,
  now,
  love,
  questionType = 'default',
  questionStyle,
}: {
  entry: Wisdom;
  profile: Profile;
  now: number;
  /** Today's count is about them; `{person}` in the action means them. */
  love?: Love;
  questionType?: ThemedTextProps['type'];
  questionStyle?: StyleProp<TextStyle>;
}) {
  const theme = useTheme();
  const retold = entry.licence === 'own-words';
  const source = wisdomSource(entry);
  const cite = wisdomCite(entry);
  const fill = (text: string) => personalize(text, profile, now, love);

  return (
    <View style={styles.root}>
      <View style={[styles.quote, { borderLeftColor: theme.accent }]}>
        {entry.type !== 'quote' ? (
          <ThemedText type="eyebrow" themeColor="muted">
            {entry.type === 'story' ? 'A story' : 'A practice'}
          </ThemedText>
        ) : null}
        <ThemedText type={retold ? 'default' : 'quote'} style={retold ? styles.story : undefined}>
          {wisdomText(entry)}
        </ThemedText>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`${retold ? 'Retold from ' : ''}${cite}. ${source.label}, opens in browser`}
          onPress={() => Linking.openURL(source.url)}
          hitSlop={6}
          style={styles.cite}>
          <ThemedText type="eyebrow" themeColor="muted" style={styles.citeText}>
            {retold ? 'Retold from ' : ''}
            {cite}
          </ThemedText>
          <ThemedText type="small" themeColor="muted" style={styles.translation}>
            {source.label} ↗
          </ThemedText>
        </Pressable>
      </View>
      <ThemedText type={questionType} style={questionStyle}>
        {fill(entry.question)}
      </ThemedText>
      {entry.action ? (
        <ThemedText>
          <ThemedText themeColor="accent">You could </ThemedText>
          {fill(entry.action)}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 16,
  },
  quote: {
    borderLeftWidth: 2,
    paddingLeft: 18,
    gap: 12,
  },
  story: {
    fontSize: 18,
    lineHeight: 27,
  },
  cite: {
    gap: 2,
  },
  citeText: {
    letterSpacing: 0.8,
  },
  translation: {
    fontSize: 12.5,
  },
});
