import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

import { supabase } from '@/lib/supabase';

export type OAuthProvider = 'apple' | 'google';

/**
 * Where Supabase sends people back after OAuth or a magic link. Each value must be in
 * Supabase → Authentication → URL Configuration → Redirect URLs:
 *   web: http://localhost:8081/**, https://jjgp13.github.io/memento-mori/**
 *   Expo Go: exp://**   dev/production builds: mementomori://**
 */
function redirectUrl() {
  if (Platform.OS === 'web') {
    // Linking.createURL drops the GitHub Pages base path (app.json experiments.baseUrl).
    return `${window.location.origin}${process.env.EXPO_BASE_URL ?? ''}/`;
  }
  return Linking.createURL('/');
}

/** Finishes a PKCE sign-in from a redirect URL carrying ?code=…; returns false if there was none. */
export async function createSessionFromUrl(url: string) {
  const { queryParams } = Linking.parse(url);
  if (queryParams?.error_description) {
    throw new Error(String(queryParams.error_description));
  }
  const code = queryParams?.code;
  if (typeof code !== 'string') return false;

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) throw error;
  return true;
}

/**
 * Browser-based OAuth: works on web, in Expo Go, and in builds.
 * TODO: switch iOS to native Sign in with Apple (expo-apple-authentication + signInWithIdToken)
 * before App Store review.
 */
export async function signInWithProvider(provider: OAuthProvider) {
  if (Platform.OS === 'web') {
    // Full-page redirect; supabase-js picks up the ?code= on return (detectSessionInUrl).
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: redirectUrl() },
    });
    if (error) throw error;
    return;
  }

  const redirectTo = redirectUrl();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo, skipBrowserRedirect: true },
  });
  if (error) throw error;

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (result.type === 'success') {
    await createSessionFromUrl(result.url);
  }
}

/**
 * Emails a 6-digit code (and a magic link, if the email template includes one).
 * The Supabase "Magic Link" email template must include {{ .Token }} for the code to appear.
 */
export async function sendEmailCode(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectUrl() },
  });
  if (error) throw error;
}

export async function verifyEmailCode(email: string, token: string) {
  const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
