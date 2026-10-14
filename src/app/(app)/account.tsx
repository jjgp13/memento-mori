import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { signOut } from '@/lib/auth';
import { useAuth } from '@/providers/auth-provider';

export default function AccountScreen() {
  const theme = useTheme();
  const { session } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = session?.user;
  const provider = user?.app_metadata.provider;

  async function onSignOut() {
    setBusy(true);
    setError(null);
    try {
      await signOut();
      // The root guard swaps to sign-in once the session clears.
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not sign out.');
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.head}>
          <ThemedText type="eyebrow">Account</ThemedText>
          <Button title="Done" variant="link" onPress={() => router.back()} />
        </View>

        {user ? (
          <>
            <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
              <ThemedText type="heading">SIGNED IN AS</ThemedText>
              <ThemedText>{user.email ?? 'Unknown'}</ThemedText>
              {provider ? <ThemedText type="small">via {provider}</ThemedText> : null}
            </View>

            <Button title="Sign out" variant="ghost" loading={busy} onPress={onSignOut} />
            {error ? (
              <ThemedText type="small" themeColor="danger" accessibilityLiveRegion="polite">
                {error}
              </ThemedText>
            ) : null}
          </>
        ) : (
          <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
            <ThemedText type="heading">NOT SIGNED IN</ThemedText>
            <ThemedText type="small">
              Sign-in is off until Supabase is configured. Nothing you do here is saved to an account yet.
            </ThemedText>
          </View>
        )}

        <ThemedText type="small">
          Data export and account deletion will live here (GDPR / CCPA / Washington My Health My Data Act).
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
    gap: 6,
  },
});
