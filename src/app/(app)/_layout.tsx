import { Stack } from 'expo-router';

import { useProfile } from '@/lib/profile';

export default function AppLayout() {
  const profile = useProfile();

  // No answers yet: everything but onboarding is out of reach, so the app lands there.
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!profile}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="account" options={{ presentation: 'modal' }} />
      </Stack.Protected>
      <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
    </Stack>
  );
}
