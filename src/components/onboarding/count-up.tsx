import { useEffect, useState } from 'react';
import { useReducedMotion } from 'react-native-reanimated';

import { ThemedText, type ThemedTextProps } from '@/components/themed-text';
import { fmt } from '@/lib/life-views';

/** A number that counts up from zero, easing out; shows the final value at once under Reduce Motion. */
export function CountUp({ to, duration = 1400, delay = 250, ...rest }: ThemedTextProps & { to: number; duration?: number; delay?: number }) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / duration);
      setValue(to * (1 - Math.pow(1 - k, 4)));
      if (k < 1) frame = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => (frame = requestAnimationFrame(tick)), delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [to, duration, delay, reduced]);

  return (
    <ThemedText accessibilityLabel={fmt(to)} {...rest}>
      {fmt(reduced ? to : value)}
    </ThemedText>
  );
}
