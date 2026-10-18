import { downloadFile } from '@/lib/download';

/**
 * Hands a file built on the device to the person: on the web the browser saves it to their downloads.
 * The native version (share-file.native.ts) opens the share sheet instead. Nothing is uploaded.
 */
export async function shareFile(name: string, content: string, type: string, _dialogTitle?: string) {
  return downloadFile(name, content, type);
}
