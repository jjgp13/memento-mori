import { Cinzel_500Medium, Cinzel_600SemiBold } from '@expo-google-fonts/cinzel';
import { IBMPlexMono_400Regular, IBMPlexMono_500Medium } from '@expo-google-fonts/ibm-plex-mono';
import {
  SourceSerif4_400Regular,
  SourceSerif4_400Regular_Italic,
  SourceSerif4_600SemiBold,
} from '@expo-google-fonts/source-serif-4';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLang } from '@/i18n';
import { AuthProvider } from '@/providers/auth-provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Cinzel_500Medium,
    Cinzel_600SemiBold,
    SourceSerif4_400Regular,
    SourceSerif4_400Regular_Italic,
    SourceSerif4_600SemiBold,
    IBMPlexMono_400Regular,
    IBMPlexMono_500Medium,
  });

  return (
    <AuthProvider>
      <RootNavigator ready={fontsLoaded || !!fontError} />
    </AuthProvider>
  );
}

function RootNavigator({ ready }: { ready: boolean }) {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[scheme];
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const theme = {
    ...base,
    colors: { ...base.colors, background: colors.bg, card: colors.bg, text: colors.fg, primary: colors.accent, border: colors.line },
  };

  // Local-first: the whole app works without an account, and nothing waits on the network.
  // Sign-in is only offered where it unlocks something (backup and sync, sharing), from the You screen.
  const done = ready;
  useEffect(() => {
    if (done) SplashScreen.hideAsync();
  }, [done]);

  // Screen readers and browser translation read the page's language from <html lang>.
  const lang = useLang();
  useEffect(() => {
    if (Platform.OS === 'web') document.documentElement.lang = lang;
  }, [lang]);

  if (!done) return null;

  return (
    <ThemeProvider value={theme}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(app)" />
        <Stack.Screen name="sign-in" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
