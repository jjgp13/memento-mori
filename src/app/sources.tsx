import { Linking, Pressable, StyleSheet } from 'react-native';

import { DocScreen, DocSection } from '@/components/doc-screen';
import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { QUOTE_SOURCES, STUDIES, authorsLine, reference, studiesByTopic } from '@/lib/sources';

/**
 * Every study and data set cited anywhere in the app, generated from the catalog in src/lib/sources.ts
 * that every in-app source link draws from.
 */
export default function SourcesScreen() {
  const theme = useTheme();
  const count = Object.keys(STUDIES).length;

  return (
    <DocScreen
      eyebrow="Sources"
      title="The research behind the app"
      lede={`All ${count} studies and data sets the app cites, grouped by what they are used for. Tap one to open it.`}>
      {studiesByTopic().map((t) => (
        <DocSection key={t.key} title={t.title}>
          <ThemedText type="small">{t.blurb}</ThemedText>
          {t.studies.map((s) => (
            <Pressable
              key={s.id}
              accessibilityRole="link"
              accessibilityLabel={`${reference(s)} Opens in browser.`}
              onPress={() => Linking.openURL(s.url)}
              style={({ pressed }) => [styles.item, { borderTopColor: theme.line }, pressed && styles.pressed]}>
              <ThemedText type="small" themeColor="fg">
                {authorsLine(s)} <ThemedText type="small" themeColor="fg" style={styles.title}>{s.title}.</ThemedText>{' '}
                {s.journal}, {s.year}
                {s.details ? `; ${s.details}` : ''}.
              </ThemedText>
              <ThemedText type="small">Used for: {s.usedFor}</ThemedText>
              <ThemedText type="small" themeColor="accent" style={styles.link} numberOfLines={1}>
                {s.url.replace(/^https?:\/\//, '')} ↗
              </ThemedText>
            </Pressable>
          ))}
        </DocSection>
      ))}

      <DocSection title="Quotes">
        <ThemedText type="small" themeColor="fg">
          {QUOTE_SOURCES}
        </ThemedText>
      </DocSection>

      <ThemedText type="small">
        Some links go to a summary or press release when the full paper is behind a paywall. Associations from
        population studies are not proof of cause, and nothing here is medical advice.
      </ThemedText>
    </DocScreen>
  );
}

const styles = StyleSheet.create({
  item: {
    borderTopWidth: 1,
    paddingTop: 10,
    gap: 3,
  },
  pressed: {
    opacity: 0.6,
  },
  title: {
    fontFamily: Fonts.bodyItalic,
  },
  link: {
    fontSize: 12.5,
    textDecorationLine: 'underline',
  },
});
