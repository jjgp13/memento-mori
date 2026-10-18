import { Linking, Pressable, StyleSheet, View, type StyleProp, type TextStyle } from 'react-native';

import { ThemedText, type ThemedTextProps } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { useLang, useT } from '@/i18n';
import { todaysQuestion, todaysQuote } from '@/lib/daily';
import type { Love } from '@/lib/loves';
import type { Profile } from '@/lib/profile';
import { personalize, useTodaysWisdom, wisdomCite, wisdomSource, wisdomText } from '@/lib/wisdom';

type Props = {
  profile: Profile;
  now: number;
  /** Today's count is about them; `{person}` in the action means them. */
  love?: Love;
  questionType?: ThemedTextProps['type'];
  questionStyle?: StyleProp<TextStyle>;
};

/**
 * Today's words from someone who lived before us: the quote (or a story retold), who said it and where,
 * a question to sit with and, when there is one, a small thing they could do. The citation opens the
 * full text, so every line can be checked. Languages without the library yet show their catalog's quote.
 */
export function TodaysWords({ profile, now, love, questionType = 'default', questionStyle }: Props) {
  const theme = useTheme();
  const t = useT();
  const lang = useLang();
  const entry = useTodaysWisdom(profile, now, lang, love);

  if (!entry) {
    const quote = todaysQuote(t, now);
    return (
      <View style={styles.root}>
        {quote ? (
          <View style={[styles.quote, { borderLeftColor: theme.accent }]}>
            <ThemedText type="quote">{quote.text}</ThemedText>
            <ThemedText type="eyebrow" themeColor="muted" style={styles.citeText}>
              {quote.source}
            </ThemedText>
          </View>
        ) : null}
        <ThemedText type={questionType} style={questionStyle}>
          {todaysQuestion(t, now)}
        </ThemedText>
      </View>
    );
  }

  const w = t.wisdom;
  // A quote we translated is still a quote; only stories and practices in our own words are retold.
  const retold = entry.licence === 'own-words' && !entry.translated;
  const source = wisdomSource(entry, t);
  const cite = retold ? w.retoldFrom(wisdomCite(entry, lang)) : wisdomCite(entry, lang);
  const fill = (text: string) => personalize(text, profile, now, t, love);

  return (
    <View style={styles.root}>
      <View style={[styles.quote, { borderLeftColor: theme.accent }]}>
        {entry.type !== 'quote' ? (
          <ThemedText type="eyebrow" themeColor="muted">
            {entry.type === 'story' ? w.story : w.practice}
          </ThemedText>
        ) : null}
        <ThemedText type={retold ? 'default' : 'quote'} style={retold ? styles.story : undefined}>
          {wisdomText(entry)}
        </ThemedText>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={t.common.sourceA11y(cite, source.label)}
          onPress={() => Linking.openURL(source.url)}
          hitSlop={6}
          style={styles.cite}>
          <ThemedText type="eyebrow" themeColor="muted" style={styles.citeText}>
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
          <ThemedText themeColor="accent">{w.youCould} </ThemedText>
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
