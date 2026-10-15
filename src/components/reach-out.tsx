import { useState } from 'react';
import { Linking, Share, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { SourceLink } from '@/components/source-link';
import { dayOfYear } from '@/lib/daily';
import { REACHING_OUT } from '@/lib/evidence';
import { useT } from '@/i18n';
import { lastContact, sinceLabel, withContact, type Love } from '@/lib/loves';

/** Opens their messages app with a gentle opener; without a number, the share sheet picks the app. */
async function message(love: Love, text: string) {
  // `?&body=` is understood by both iOS and Android messaging.
  const sms = `sms:${love.phone ?? ''}?&body=${encodeURIComponent(text)}`;
  if (love.phone) return Linking.openURL(sms);
  try {
    await Share.share({ message: text });
  } catch {
    await Linking.openURL(sms);
  }
}

/**
 * Message, call, and "we talked" for one person. Logging contact keeps "last time" honest and lets the
 * app suggest who to reach out to next.
 */
export function ReachOut({ love, onChange }: { love: Love; onChange: (next: Love) => void }) {
  const t = useT();
  const [logged, setLogged] = useState(false);
  const last = lastContact(love);
  const opener = t.reach.openers[dayOfYear() % t.reach.openers.length];

  return (
    <View style={styles.wrap}>
      <ThemedText type="small">
        {last ? t.reach.lastTime(sinceLabel(last, t)) : t.reach.hint}
      </ThemedText>
      <ThemedText type="small">{t.reach.claim}</ThemedText>
      <SourceLink source={REACHING_OUT.source} />
      <View style={styles.row}>
        <Button title={t.reach.message} variant="ghost" onPress={() => message(love, opener)} style={styles.flex} />
        {love.phone ? (
          <Button title={t.reach.call} variant="ghost" onPress={() => Linking.openURL(`tel:${love.phone}`)} style={styles.flex} />
        ) : null}
        <Button
          title={logged ? t.reach.logged : t.reach.weTalked}
          variant="ghost"
          disabled={logged}
          accessibilityLabel={t.reach.logA11y(love.name)}
          onPress={() => {
            onChange(withContact(love));
            setLogged(true);
          }}
          style={styles.flex}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  // Sized by label so "We talked" stays on one line at phone width.
  flex: {
    flexGrow: 1,
    paddingHorizontal: 12,
  },
});
