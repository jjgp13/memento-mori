import { Children, type ReactNode } from 'react';
import Animated, { Easing, FadeInDown, FadeInUp } from 'react-native-reanimated';

const ease = Easing.bezier(0.2, 0.7, 0.2, 1);

/**
 * Reveals children one after another, rising into place (or dropping in when going back), like the
 * prototype's onboarding. `delay` leaves time for the previous step to fade out.
 * Reanimated skips these for people who turn on Reduce Motion.
 */
export function Stagger({
  children,
  direction = 1,
  delay = 180,
  step = 80,
}: {
  children: ReactNode;
  direction?: 1 | -1;
  delay?: number;
  step?: number;
}) {
  const Enter = direction > 0 ? FadeInDown : FadeInUp;

  return Children.toArray(children)
    .filter(Boolean)
    .map((child, i) => (
      <Animated.View key={i} entering={Enter.delay(delay + i * step).duration(550).easing(ease)}>
        {child}
      </Animated.View>
    ));
}
