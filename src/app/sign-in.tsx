import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { Fonts, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import {
  SIGN_IN_METHODS,
  sendEmailCode,
  signInAsGuest,
  signInWithProvider,
  verifyEmailCode,
  type OAuthProvider,
} from '@/lib/auth';

type Busy = OAuthProvider | 'guest' | 'send' | 'verify' | null;

export default function SignInScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSentTo, setCodeSentTo] = useState<string | null>(null);
  const [busy, setBusy] = useState<Busy>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(kind: Exclude<Busy, null>, action: () => Promise<void>) {
    setBusy(kind);
    setError(null);
    try {
      await action();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Try again.');
    } finally {
      setBusy(null);
    }
  }

  const trimmedEmail = email.trim();
  const validEmail = /^\S+@\S+\.\S+$/.test(trimmedEmail);
  const sendCode = () =>
    run('send', async () => {
      await sendEmailCode(trimmedEmail);
      setCodeSentTo(trimmedEmail);
    });

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]}>
      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.intro}>
            <ThemedText type="eyebrow">Remember you will die</ThemedText>
            <ThemedText type="title">Memento Mori</ThemedText>
            <ThemedText style={styles.lede}>
              The Stoics kept death in mind so they would not waste their days. Sign in to keep your count, your loves
              and your reflections safe across devices.
            </ThemedText>
          </View>

          <View style={styles.group}>
            {SIGN_IN_METHODS.apple ? (
              <Button
                title="Continue with Apple"
                loading={busy === 'apple'}
                disabled={busy !== null && busy !== 'apple'}
                onPress={() => run('apple', () => signInWithProvider('apple'))}
              />
            ) : null}
            {SIGN_IN_METHODS.google ? (
              <Button
                title="Continue with Google"
                loading={busy === 'google'}
                disabled={busy !== null && busy !== 'google'}
                onPress={() => run('google', () => signInWithProvider('google'))}
              />
            ) : null}
            {SIGN_IN_METHODS.guest ? (
              <>
                <Button
                  title="Try without an account"
                  variant="ghost"
                  loading={busy === 'guest'}
                  disabled={busy !== null && busy !== 'guest'}
                  onPress={() => run('guest', signInAsGuest)}
                />
                <ThemedText type="small" style={styles.note}>
                  A guest account lives in this browser{SIGN_IN_METHODS.google ? '. Link Google later to keep it.' : ' until you clear its data.'}
                </ThemedText>
              </>
            ) : null}
          </View>

          {SIGN_IN_METHODS.email ? (
            <>
              <View style={styles.or}>
                <View style={[styles.rule, { backgroundColor: theme.line }]} />
                <ThemedText type="eyebrow" themeColor="muted">
                  or
                </ThemedText>
                <View style={[styles.rule, { backgroundColor: theme.line }]} />
              </View>

              {codeSentTo === null ? (
                <View style={styles.group}>
                  <TextField
                    accessibilityLabel="Email"
                    placeholder="you@example.com"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoComplete="email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    returnKeyType="send"
                    onSubmitEditing={() => validEmail && sendCode()}
                  />
                  <Button
                    title="Email me a code"
                    variant="ghost"
                    loading={busy === 'send'}
                    disabled={!validEmail || (busy !== null && busy !== 'send')}
                    onPress={sendCode}
                  />
                </View>
              ) : (
                <View style={styles.group}>
                  <ThemedText type="small">
                    We sent a 6-digit code to{' '}
                    <ThemedText type="small" themeColor="fg">
                      {codeSentTo}
                    </ThemedText>
                    . Enter it below, or tap the link in the email on this device.
                  </ThemedText>
                  <TextField
                    accessibilityLabel="Sign-in code"
                    placeholder="123456"
                    value={code}
                    onChangeText={(t) => setCode(t.replace(/\D/g, '').slice(0, 6))}
                    keyboardType="number-pad"
                    autoComplete="one-time-code"
                    textContentType="oneTimeCode"
                    style={styles.code}
                    autoFocus
                  />
                  <Button
                    title="Sign in"
                    loading={busy === 'verify'}
                    disabled={code.length !== 6 || (busy !== null && busy !== 'verify')}
                    onPress={() => run('verify', () => verifyEmailCode(codeSentTo, code))}
                  />
                  <Button
                    title="Use a different email"
                    variant="link"
                    onPress={() => {
                      setCodeSentTo(null);
                      setCode('');
                      setError(null);
                    }}
                  />
                </View>
              )}
            </>
          ) : null}

          {error ? (
            <ThemedText type="small" themeColor="danger" accessibilityLiveRegion="polite">
              {error}
            </ThemedText>
          ) : null}

          <ThemedText type="small" style={styles.foot}>
            Estimates are based on population data and are not medical advice.
          </ThemedText>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.five,
    gap: 20,
  },
  intro: {
    gap: 14,
    marginBottom: 8,
  },
  lede: {
    fontSize: 18,
    lineHeight: 27,
  },
  notice: {
    borderWidth: 1,
    borderRadius: Radius.card,
    padding: 14,
    gap: 6,
  },
  group: {
    gap: 10,
  },
  or: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rule: {
    flex: 1,
    height: 1,
  },
  code: {
    fontFamily: Fonts.mono,
    fontSize: 22,
    letterSpacing: 6,
    textAlign: 'center',
  },
  foot: {
    marginTop: 8,
  },
  note: {
    textAlign: 'center',
  },
});
