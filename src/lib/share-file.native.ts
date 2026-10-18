import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

/**
 * Writes the file to the app's cache and opens the share sheet, where the person can save it to Files,
 * mail it to themselves, or send it anywhere else they choose. Nothing is uploaded by the app.
 */
export async function shareFile(name: string, content: string, type: string, dialogTitle?: string) {
  if (!(await Sharing.isAvailableAsync())) return false;
  const file = new File(Paths.cache, name);
  file.create({ overwrite: true });
  file.write(content);
  await Sharing.shareAsync(file.uri, {
    mimeType: type,
    UTI: type.startsWith('application/json') ? 'public.json' : undefined,
    dialogTitle,
  });
  return true;
}
