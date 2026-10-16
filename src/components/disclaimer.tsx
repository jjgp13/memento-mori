import { Link, type Href } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { LinkedText, Paragraphs } from '@/components/linked-text';
import { ThemedText } from '@/components/themed-text';
import { DISCLAIMER, SUPPORT } from '@/lib/legal';

/** A small underlined link to a screen in the app. */
export function ScreenLink({ href, title }: { href: Href; title: string }) {
  return (
    <Link href={href} accessibilityRole="link">
      <ThemedText type="small" themeColor="accent" style={styles.link}>
        {title}
      </ThemedText>
    </Link>
  );
}

/**
 * "Not medical advice / not a prediction / for reflection", with a way to see how the numbers are made
 * and a gentle support line. `full` lists each point (onboarding, How this works); otherwise one line.
 */
export function Disclaimer({ full, links = true }: { full?: boolean; links?: boolean }) {
  return (
    <View style={styles.root}>
      {full ? <Paragraphs body={DISCLAIMER.points.map((p) => `- ${p}`)} /> : <ThemedText type="small">{DISCLAIMER.short}</ThemedText>}
      {links ? (
        <View style={styles.links}>
          <ScreenLink href="/how-it-works" title="How this works" />
          <ScreenLink href="/sources" title="Sources" />
        </View>
      ) : null}
      <SupportLine />
    </View>
  );
}

/** 988 in the US, findahelpline.com elsewhere. */
export function SupportLine() {
  return <LinkedText type="small" text={SUPPORT.text} />;
}

const styles = StyleSheet.create({
  root: {
    gap: 8,
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 16,
  },
  link: {
    fontSize: 13.5,
    textDecorationLine: 'underline',
  },
});
