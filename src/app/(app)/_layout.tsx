import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="account" options={{ presentation: 'modal' }} />
      <Stack.Screen name="details" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
