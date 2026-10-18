import { Linking, Pressable, StyleSheet } from 'react-native';

import { DocScreen, DocSection } from '@/components/doc-screen';
import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useLang, useT } from '@/i18n';
import { fmt } from '@/i18n/format';
import { STUDIES, authorsLine, reference, studiesByTopic } from '@/lib/sources';
import { LIBRARY, librarySources } from '@/lib/wisdom';

/**
 * Every study and data set cited anywhere in the app, generated from the catalog in src/lib/sources.ts
 * that every in-app source link draws from.
 */
export default function SourcesScreen() {
  const theme = useTheme();
  const src = useT().sources;
  // Languages with the wisdom library list the translations it quotes; the others keep their catalog's note.
  const library = LIBRARY[useLang()];

  return (
    <DocScreen eyebrow={src.eyebrow} title={src.title} lede={src.lede(fmt(Object.keys(STUDIES).length))}>
      {studiesByTopic().map((topic) => (
        <DocSection key={topic.key} title={src.topics[topic.key].title}>
          <ThemedText type="small">{src.topics[topic.key].blurb}</ThemedText>
          {topic.studies.map((s) => (
            <Pressable
              key={s.id}
              accessibilityRole="link"
              accessibilityLabel={`${reference(s)} ${src.opens}`}
              onPress={() => Linking.openURL(s.url)}
              style={({ pressed }) => [styles.item, { borderTopColor: theme.line }, pressed && styles.pressed]}>
              <ThemedText type="small" themeColor="fg">
                {authorsLine(s)} <ThemedText type="small" themeColor="fg" style={styles.title}>{s.title}.</ThemedText>{' '}
                {s.journal}, {s.year}
                {s.details ? `; ${s.details}` : ''}.
              </ThemedText>
              <ThemedText type="small">{src.usedFor(src.uses[s.id])}</ThemedText>
              <ThemedText type="small" themeColor="accent" style={styles.link} numberOfLines={1}>
                {s.url.replace(/^https?:\/\//, '')} ↗
              </ThemedText>
            </Pressable>
          ))}
        </DocSection>
      ))}

      <DocSection title={src.quotesHeading}>
        <ThemedText type="small" themeColor="fg">
          {library ? src.wisdomIntro : src.quotes}
        </ThemedText>
        {library
          ? librarySources(library).map((s) => (
              <Pressable
                key={s.key}
                accessibilityRole="link"
                accessibilityLabel={`${s.translator}, ${s.title}, ${s.year}. ${src.opens}`}
                onPress={() => Linking.openURL(s.url)}
                style={({ pressed }) => [styles.item, { borderTopColor: theme.line }, pressed && styles.pressed]}>
                <ThemedText type="small" themeColor="fg">
                  {s.translator}. <ThemedText type="small" themeColor="fg" style={styles.title}>{s.title}</ThemedText>, {s.year}.
                </ThemedText>
                <ThemedText type="small" themeColor="accent" style={styles.link} numberOfLines={1}>
                  {s.url.replace(/^https?:\/\//, '')} ↗
                </ThemedText>
              </Pressable>
            ))
          : null}
      </DocSection>

      <ThemedText type="small">{src.footnote}</ThemedText>
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
