import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { useEffect } from 'react';

const TICK = require('@/assets/sounds/tick.wav');
const TOCK = require('@/assets/sounds/tock.wav');

/**
 * Two tiny players shared app-wide and kept for the app's lifetime (created on first use), rather than
 * per component: they're 70 ms clips, and it avoids re-loading them on every screen.
 */
let players: { tick: AudioPlayer; tock: AudioPlayer } | null = null;
function clock() {
  if (!players) {
    setAudioModeAsync({ playsInSilentMode: false, interruptionMode: 'mixWithOthers' }).catch(() => {});
    players = { tick: createAudioPlayer(TICK), tock: createAudioPlayer(TOCK) };
    players.tick.volume = 0.55;
    players.tock.volume = 0.5;
  }
  return players;
}

/**
 * An old clock's tick-tock, on each second boundary (in step with useNow(1000) displays), while `active`.
 * Stops by itself after `maxTicks` so it never becomes background noise. Respects the phone's silent switch.
 */
export function useClockTick(active: boolean, maxTicks = Infinity) {
  useEffect(() => {
    if (!active) return;
    const { tick, tock } = clock();
    let count = 0;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        const player = count % 2 ? tock : tick;
        player.seekTo(0);
        player.play();
        count += 1;
        if (count < maxTicks) schedule();
      }, 1000 - (Date.now() % 1000));
    };
    schedule();
    return () => clearTimeout(timer);
  }, [active, maxTicks]);
}
