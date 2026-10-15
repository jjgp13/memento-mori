import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

/** A small speaker button for the ticking sound. */
export function SoundToggle({ on, onChange, label = 'Ticking sound' }: { on: boolean; onChange: (on: boolean) => void; label?: string }) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      aria-checked={on}
      onPress={() => onChange(!on)}
      hitSlop={8}
      style={[styles.btn, { borderColor: on ? theme.accent : theme.line, backgroundColor: theme.surface }]}>
      <SymbolView
        name={
          on
            ? { ios: 'speaker.wave.2', android: 'volume_up', web: 'volume_up' }
            : { ios: 'speaker.slash', android: 'volume_off', web: 'volume_off' }
        }
        size={16}
        tintColor={on ? theme.accent : theme.muted}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
