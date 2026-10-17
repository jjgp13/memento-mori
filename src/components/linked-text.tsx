import { router, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { Linking, StyleSheet, View, type StyleProp, type TextStyle } from 'react-native';

import { ThemedText, type ThemedTextProps } from '@/components/themed-text';

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Opens a screen in the app ("/sources") or a website. */
export function openHref(href: string) {
  if (href.startsWith('/')) router.push(href as Href);
  else Linking.openURL(href);
}

/**
 * A paragraph whose [label](href) runs are links: to a screen in the app when href starts with "/",
 * otherwise to a website. The text format of src/lib/legal.ts.
 */
export function LinkedText({ text, style, ...rest }: { text: string; style?: StyleProp<TextStyle> } & ThemedTextProps) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const [whole, label, href] = m;
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <ThemedText
        key={m.index}
        type={rest.type}
        accessibilityRole="link"
        themeColor="accent"
        onPress={() => openHref(href)}
        style={[style, styles.link]}>
        {label}
      </ThemedText>,
    );
    last = m.index + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return (
    <ThemedText style={style} {...rest}>
      {parts}
    </ThemedText>
  );
}

/** Paragraphs in the legal.ts format: "- " lines become bullets. */
export function Paragraphs({ body, type = 'small' }: { body: string[]; type?: ThemedTextProps['type'] }) {
  return (
    <View style={styles.paragraphs}>
      {body.map((p, i) =>
        p.startsWith('- ') ? (
          <View key={i} style={styles.bullet}>
            <ThemedText type={type} themeColor="muted" aria-hidden>
              •
            </ThemedText>
            <LinkedText type={type} themeColor="fg" text={p.slice(2)} style={styles.flex} />
          </View>
        ) : (
          <LinkedText key={i} type={type} themeColor="fg" text={p} />
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
  },
  paragraphs: {
    gap: 10,
  },
  bullet: {
    flexDirection: 'row',
    gap: 8,
    paddingLeft: 4,
  },
  flex: {
    flex: 1,
  },
});
