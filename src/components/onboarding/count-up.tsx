import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'react-native-reanimated';

import { ThemedText, type ThemedTextProps } from '@/components/themed-text';
import { fmt } from '@/lib/life-views';

/**
 * A number that counts from `from` (zero by default) to `to`, easing out; shows the final value at once under
 * Reduce Motion. `to` may keep changing (e.g. seconds alive): the count chases the latest value, then follows it live.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1400,
  delay = 250,
  ...rest
}: ThemedTextProps & { to: number; from?: number; duration?: number; delay?: number }) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : from);
  const target = useRef(to);
  const done = useRef(reduced);

  useEffect(() => {
    target.current = to;
    if (done.current) setValue(to);
  }, [to]);

  useEffect(() => {
    if (done.current) return;
    let frame = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / duration);
      setValue(from + (target.current - from) * (1 - Math.pow(1 - k, 4)));
      if (k < 1) frame = requestAnimationFrame(tick);
      else done.current = true;
    };
    const timer = setTimeout(() => (frame = requestAnimationFrame(tick)), delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [duration, delay, from]);

  return (
    <ThemedText accessibilityLabel={fmt(to)} {...rest}>
      {fmt(value)}
    </ThemedText>
  );
}
