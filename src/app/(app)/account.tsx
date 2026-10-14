import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { SIGN_IN_METHODS, linkGoogle, signOut } from '@/lib/auth';
import { useAuth } from '@/providers/auth-provider';

export default function AccountScreen() {
  const theme = useTheme();
  const { session } = useAuth();
  const [busy, setBusy] = useState<'link' | 'signout' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const user = session?.user;
  const provider = user?.app_metadata.provider;

  async function run(kind: 'link' | 'signout', action: () => Promise<void>) {
    setBusy(kind);
    setError(null);
    try {
      // After sign-out the root guard swaps to sign-in; after linking, the session refreshes.
      await action();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Try again.');
    } finally {
      setBusy(null);
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
            {user.is_anonymous ? (
              <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
                <ThemedText type="heading">GUEST</ThemedText>
                <ThemedText type="small">
                  This guest account lives in this browser. Signing out or clearing site data ends it for good.
                  {SIGN_IN_METHODS.google ? ' Link Google to keep it and use it on other devices.' : ''}
                </ThemedText>
              </View>
            ) : (
              <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.line }]}>
                <ThemedText type="heading">SIGNED IN AS</ThemedText>
                <ThemedText>{user.email ?? 'Unknown'}</ThemedText>
                {provider ? <ThemedText type="small">via {provider}</ThemedText> : null}
              </View>
            )}

            {user.is_anonymous && SIGN_IN_METHODS.google ? (
              <Button
                title="Link Google"
                loading={busy === 'link'}
                disabled={busy !== null && busy !== 'link'}
                onPress={() => run('link', linkGoogle)}
              />
            ) : null}
            <Button
              title={user.is_anonymous ? 'Leave guest account' : 'Sign out'}
              variant="ghost"
              loading={busy === 'signout'}
              disabled={busy !== null && busy !== 'signout'}
              onPress={() => run('signout', signOut)}
            />
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

        <Button title="Edit your details" variant="ghost" onPress={() => router.push({ pathname: '/onboarding', params: { edit: '1' } })} />

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
