import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ScreenLink, SupportLine } from '@/components/disclaimer';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { signOut } from '@/lib/auth';
import { clearPrefs } from '@/lib/prefs';
import { clearProfile } from '@/lib/profile';
import { useAuth } from '@/providers/auth-provider';

/**
 * "You": the person's answers and data. The app is local-first, so there is no account to manage
 * unless they signed in earlier (guest sessions from the first test round).
 */
export default function YouScreen() {
  const theme = useTheme();
  const { session } = useAuth();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteEverything() {
    setError(null);
    try {
      if (session) await signOut();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not sign out.');
      return;
    }
    // With no answers left, the app guard sends them back to onboarding.
    clearPrefs();
    clearProfile();
  }

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.head}>
          <ThemedText type="eyebrow">You</ThemedText>
          <Button title="Done" variant="link" onPress={() => router.back()} />
        </View>

        <Button
          title="Edit your answers"
          variant="ghost"
          onPress={() => router.push({ pathname: '/onboarding', params: { edit: '1' } })}
        />

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <ThemedText type="heading">YOUR DATA</ThemedText>
          <ThemedText type="small" themeColor="fg">
            Everything you enter stays on this device. There is no account, no ads and no tracking. Your estimate is
            worked out right here, on your phone or in your browser.
          </ThemedText>
          {session ? (
            <ThemedText type="small">
              You also have a {session.user.is_anonymous ? 'guest account' : 'signed-in account'} from an earlier test.
              It holds nothing but an empty profile; deleting below signs it out.
            </ThemedText>
          ) : null}
        </View>

        {confirming ? (
          <View style={styles.confirm}>
            <ThemedText type="small" themeColor="fg">
              This erases your answers, the people and things you love, your settings and everything else on this device. It
              can&apos;t be undone.
            </ThemedText>
            <Button title="Yes, delete everything" onPress={deleteEverything} style={{ backgroundColor: theme.danger }} />
            <Button title="Keep my data" variant="link" onPress={() => setConfirming(false)} />
          </View>
        ) : (
          <Button title="Delete everything on this device" variant="ghost" onPress={() => setConfirming(true)} />
        )}
        {error ? (
          <ThemedText type="small" themeColor="danger" accessibilityLiveRegion="polite">
            {error}
          </ThemedText>
        ) : null}

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <ThemedText type="heading">HOW IT WORKS</ThemedText>
          <ThemedText type="small" themeColor="fg">
            Estimates come from population studies and UN life tables. They show direction and rough size, not a
            prediction, and are not medical advice.
          </ThemedText>
          <View style={styles.links}>
            <ScreenLink href="/how-it-works" title="How this works" />
            <ScreenLink href="/sources" title="Sources" />
          </View>
        </View>

        <View style={styles.links}>
          <ScreenLink href="/legal/terms" title="Terms of Use" />
          <ScreenLink href="/legal/privacy" title="Privacy Policy" />
          <ScreenLink href="/legal/health-data" title="Consumer Health Data Privacy Policy" />
        </View>

        <SupportLine />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    padding: Spacing.three,
    gap: 18,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    borderWidth: 1,
    borderRadius: Radius.card,
    padding: 16,
    gap: 8,
  },
  confirm: {
    gap: 10,
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 16,
    rowGap: 4,
  },
});
