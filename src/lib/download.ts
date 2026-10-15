import { Platform } from 'react-native';

/**
 * Hands a file built on the device to the browser to save or open (a .ics opens the calendar's "add"
 * screen on phones). Web only for now; returns false elsewhere. Nothing is uploaded.
 */
export function downloadFile(name: string, content: string, type: string) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return false;
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Some browsers read the blob after click() returns.
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
  return true;
}
