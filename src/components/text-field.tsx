import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { Fonts, Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function TextField({ style, ...rest }: TextInputProps) {
  const theme = useTheme();

  return (
    <TextInput
      placeholderTextColor={theme.muted}
      style={[
        styles.input,
        { color: theme.fg, backgroundColor: theme.surface, borderColor: theme.line },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: Fonts.body,
    fontSize: 17,
    borderWidth: 1,
    borderRadius: Radius.field,
    paddingHorizontal: 12,
    paddingVertical: 11,
    minHeight: 48,
  },
});
