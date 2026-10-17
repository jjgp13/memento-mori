/** Plain text with **bold** runs, so captions can be both styled and read aloud. */
export type Rich = { text: string; strong?: boolean }[];

/** A plain run. */
export const s = (text: string) => ({ text });
/** A strong run: set in bronze monospace by <RichText>. */
export const b = (text: string) => ({ text, strong: true });

export const richText = (r: Rich) => r.map((p) => p.text).join('');
