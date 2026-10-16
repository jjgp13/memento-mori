/**
 * Design tokens carried over from prototype/index.html: stone and bronze, like an inscription.
 */

export const Colors = {
  light: {
    bg: '#ECEEEA',
    surface: '#F7F8F5',
    fg: '#1E2421',
    muted: '#5F6862',
    line: '#CDD2CC',
    accent: '#8C6230',
    accentSoft: '#E8DCCB',
    lived: '#3B443F',
    remain: '#A9B2AB',
    maybe: '#D3D9D2',
    danger: '#9A3B2E',
    /** Calendar layers: time likely spent asleep, and on the phone. */
    sleep: '#AFBBC8',
    // Magenta, like a screen's glow: apart from every "what if" color, since they show together.
    screen: '#C2407F',
    /** "What if" changes, each drawn on the calendar in its own color. */
    leverMove: '#4F8A57',
    leverPeople: '#B8613F',
    leverWeight: '#2F7F8F',
    leverSleep: '#5F5FA8',
    leverSmoke: '#A37A1C',
    leverDrink: '#7E8A2A',
    leverStrength: '#8A5A9E',
    /** Weeks and years likely lived in good health: a soft green band over the calendar. */
    healthy: '#6E9C6A',
  },
  dark: {
    bg: '#131715',
    surface: '#1B201D',
    fg: '#E4E7E2',
    muted: '#9AA39D',
    line: '#2D3430',
    accent: '#C9965A',
    accentSoft: '#3A3024',
    lived: '#C8CFC9',
    remain: '#56605A',
    maybe: '#2F3632',
    danger: '#D98A7E',
    sleep: '#3A4A5A',
    screen: '#E0559F',
    leverMove: '#7FBF86',
    leverPeople: '#E08A68',
    leverWeight: '#6CB8C8',
    leverSleep: '#9D9DE0',
    leverSmoke: '#D9B04E',
    leverDrink: '#B8C46A',
    leverStrength: '#C79BDB',
    healthy: '#5E8F5B',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light;

/** Font family names as registered with useFonts in the root layout. */
export const Fonts = {
  display: 'Cinzel_600SemiBold',
  displayMedium: 'Cinzel_500Medium',
  body: 'SourceSerif4_400Regular',
  bodyItalic: 'SourceSerif4_400Regular_Italic',
  bodyBold: 'SourceSerif4_600SemiBold',
  mono: 'IBMPlexMono_400Regular',
  monoMedium: 'IBMPlexMono_500Medium',
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  field: 8,
  card: 14,
  pill: 99,
} as const;

/** The prototype is a single phone-width column. */
export const MaxContentWidth = 520;
