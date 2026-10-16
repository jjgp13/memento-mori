import { TabList, TabSlot, TabTrigger, Tabs, type TabTriggerSlotProps } from 'expo-router/ui';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Fonts, MaxContentWidth } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useT } from '@/i18n';

type Icon = SymbolViewProps['name'];

// A fixed bottom nav like the prototype's, since web has no system tab bar.
export default function AppTabs() {
  const theme = useTheme();
  const t = useT();

  return (
    <Tabs style={{ flex: 1 }}>
      <TabSlot style={{ flex: 1 }} />
      <TabList style={[styles.nav, { backgroundColor: theme.bg, borderTopColor: theme.line }]}>
        <TabTrigger name="index" href="/" asChild>
          <TabButton icon={{ web: 'grid_view' }}>{t.tabs.life}</TabButton>
        </TabTrigger>
        <TabTrigger name="habits" href="/habits" asChild>
          <TabButton icon={{ web: 'tune' }}>{t.tabs.habits}</TabButton>
        </TabTrigger>
        <TabTrigger name="loves" href="/loves" asChild>
          <TabButton icon={{ web: 'favorite' }}>{t.tabs.loves}</TabButton>
        </TabTrigger>
        <TabTrigger name="today" href="/today" asChild>
          <TabButton icon={{ web: 'hourglass_empty' }}>{t.tabs.today}</TabButton>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

function TabButton({ children, isFocused, icon, ...props }: TabTriggerSlotProps & { icon: Icon }) {
  const theme = useTheme();
  const color = isFocused ? theme.fg : theme.muted;

  return (
    <Pressable {...props} style={styles.button}>
      <View style={[styles.mark, { backgroundColor: isFocused ? theme.accent : 'transparent' }]} />
      <SymbolView name={icon} size={22} tintColor={color} />
      <Text style={[styles.label, { color }]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  nav: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    maxWidth: MaxContentWidth / 4,
    alignItems: 'center',
    gap: 3,
    paddingVertical: 6,
  },
  mark: {
    position: 'absolute',
    top: -9,
    left: 0,
    right: 0,
    height: 2,
  },
  label: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    letterSpacing: 0.7,
  },
});
