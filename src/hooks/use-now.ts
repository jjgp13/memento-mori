import { useEffect, useState } from 'react';

/** Current time in ms, refreshed on each interval boundary (e.g. every second or minute). */
export function useNow(intervalMs: number) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        setNow(Date.now());
        schedule();
      }, intervalMs - (Date.now() % intervalMs));
    };
    schedule();
    return () => clearTimeout(timer);
  }, [intervalMs]);

  return now;
}
