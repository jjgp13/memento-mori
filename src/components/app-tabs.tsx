import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { useTheme } from '@/hooks/use-theme';

export default function AppTabs() {
  const theme = useTheme();

  return (
    <NativeTabs
      backgroundColor={theme.bg}
      tintColor={theme.accent}
      indicatorColor={theme.accentSoft}
      labelStyle={{ selected: { color: theme.fg } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Life</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="circle.grid.3x3" md="grid_view" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="habits">
        <NativeTabs.Trigger.Label>Habits</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="slider.horizontal.3" md="tune" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="loves">
        <NativeTabs.Trigger.Label>Loves</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'heart', selected: 'heart.fill' }} md="favorite" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="today">
        <NativeTabs.Trigger.Label>Today</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="hourglass" md="hourglass_empty" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
