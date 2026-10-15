import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ReminderSettings } from '@/components/reminder-settings';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { signOut } from '@/lib/auth';
import { cancelReminders, remindersSupported } from '@/lib/notifications';
import { setPref } from '@/lib/prefs';
import { clearProfile, useProfile } from '@/lib/profile';
import { DEFAULT_REMINDERS } from '@/lib/reminders';
import { useAuth } from '@/providers/auth-provider';

/**
 * "You": the person's answers and data. The app is local-first, so there is no account to manage
 * unless they signed in earlier (guest sessions from the first test round).
 */
export default function YouScreen() {
  const theme = useTheme();
  const { session } = useAuth();
  const profile = useProfile();
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
    // Reminders name the people they love, so they go too.
    setPref('reminders', DEFAULT_REMINDERS);
    await cancelReminders().catch(() => {});
    // With no answers left, the app guard sends them back to onboarding.
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

        {remindersSupported && profile ? <ReminderSettings profile={profile} /> : null}

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
              This erases your answers, the people and things you love, and everything else on this device. It
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

        <ThemedText type="small">
          Estimates come from population studies. They show direction and rough size, not a promise, and are not
          medical advice.
        </ThemedText>
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
});
