import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

import { supabase } from '@/lib/supabase';

export type OAuthProvider = 'apple' | 'google';

/**
 * Sign-in methods shown on the sign-in screen. Turn one on only after it works in Supabase:
 *   google: Authentication → Providers → Google (OAuth client from Google Cloud Console)
 *   guest:  Authentication → Providers → Anonymous sign-ins (+ "Allow manual linking" for upgrades)
 *   email:  needs custom SMTP; Supabase's built-in mailer only sends to the project's own team
 *   apple:  needs a paid Apple Developer account
 */
export const SIGN_IN_METHODS = {
  google: false, // TODO: true once the Google provider is enabled in Supabase
  guest: true,
  email: false,
  apple: false,
} as const;

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

type OAuthStart = (options: {
  redirectTo: string;
  skipBrowserRedirect?: boolean;
}) => Promise<{ data: { url?: string | null }; error: Error | null }>;

/**
 * Browser-based OAuth for both sign-in and linking: works on web, in Expo Go, and in builds.
 * Web does a full-page redirect and supabase-js picks up the ?code= on return (detectSessionInUrl);
 * native opens an auth session and exchanges the code itself.
 */
async function runOAuth(start: OAuthStart) {
  const redirectTo = redirectUrl();
  if (Platform.OS === 'web') {
    const { error } = await start({ redirectTo });
    if (error) throw error;
    return;
  }

  const { data, error } = await start({ redirectTo, skipBrowserRedirect: true });
  if (error) throw error;
  if (!data.url) throw new Error('Sign-in could not start. Try again.');

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (result.type === 'success') {
    await createSessionFromUrl(result.url);
  }
}

/** TODO: switch iOS to native Sign in with Apple (expo-apple-authentication + signInWithIdToken) before App Store review. */
export function signInWithProvider(provider: OAuthProvider) {
  return runOAuth((options) => supabase.auth.signInWithOAuth({ provider, options }));
}

/** A real but anonymous account, kept in this browser or app install until linked or signed out. */
export async function signInAsGuest() {
  const { error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
}

/** Turns a guest into a permanent account by attaching Google; the user id (and their data) stays the same. */
export function linkGoogle() {
  return runOAuth((options) => supabase.auth.linkIdentity({ provider: 'google', options }));
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

/**
 * Erases the signed-in account on the server (Edge Function supabase/functions/delete-account: the auth
 * user and its profile row), then forgets the session on this device. Throws if the server could not be
 * reached or refused, so the caller can say so; nothing is signed out in that case.
 */
export async function deleteAccount() {
  const { error } = await supabase.functions.invoke('delete-account', { method: 'POST' });
  if (error) throw error;
  await signOutLocally();
}

/**
 * Forgets the session on this device. supabase-js removes the stored session even when the server call
 * fails (offline, or the user was just deleted), so the result is ignored.
 */
export async function signOutLocally() {
  await supabase.auth.signOut({ scope: 'local' });
}
