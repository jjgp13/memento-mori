import { router } from 'expo-router';
import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';

/**
 * A reading screen (How this works, Sources, the legal documents): an eyebrow and Done, then a
 * phone-width column. Reachable before onboarding too, so Done falls back to the start.
 */
export function DocScreen({ eyebrow, title, lede, children }: PropsWithChildren<{ eyebrow: string; title: string; lede?: string }>) {
  const theme = useTheme();
  const t = useT();
  const done = () => (router.canGoBack() ? router.back() : router.replace('/'));

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]}>
      <View style={styles.bar}>
        <ThemedText type="eyebrow">{eyebrow}</ThemedText>
        <Button title={t.common.done} variant="link" onPress={done} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.head}>
          <ThemedText type="subtitle" accessibilityRole="header">
            {title}
          </ThemedText>
          {lede ? <ThemedText type="small">{lede}</ThemedText> : null}
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

/** A titled block within a DocScreen. */
export function DocSection({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <View style={styles.section}>
      <ThemedText type="heading" accessibilityRole="header">
        {title.toUpperCase()}
      </ThemedText>
      {children}
    </View>
  );
}

/** A quiet bordered box, for notes that should stand apart (drafts, disclaimers). */
export function DocNote({ children }: PropsWithChildren) {
  const theme = useTheme();
  return <View style={[styles.note, { backgroundColor: theme.surface, borderColor: theme.line }]}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bar: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
    gap: 26,
  },
  head: {
    gap: 8,
  },
  section: {
    gap: 10,
  },
  note: {
    borderWidth: 1,
    borderRadius: Radius.card,
    padding: 14,
    gap: 8,
  },
});
