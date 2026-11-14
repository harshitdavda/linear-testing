export const MAX_NOTE_LENGTH = 280;

export type CleanNote = { note: string; truncated: boolean };

function isControl(char: string): boolean {
  const code = char.codePointAt(0) ?? 0;
  return (code < 0x20 && char !== "\n" && char !== "\t") || code === 0x7f;
}

export function cleanNote(raw: string): CleanNote {
  const chars = Array.from(raw.replace(/\r\n/g, "\n"))
    .filter((char) => !isControl(char))
    .join("")
    .trim();
  const codePoints = Array.from(chars);
  if (codePoints.length <= MAX_NOTE_LENGTH) {
    return { note: chars, truncated: false };
  }
  return {
    note: codePoints.slice(0, MAX_NOTE_LENGTH).join("").trimEnd(),
    truncated: true,
  };
}

export function isNoteEmpty(raw: string): boolean {
  return cleanNote(raw).note.length === 0;
}

export function notePreview(note: string, maxChars: number): string {
  if (!Number.isInteger(maxChars) || maxChars < 2) {
    throw new Error("maxChars must be at least 2");
  }
  const firstLine = note.split("\n")[0] ?? "";
  const chars = Array.from(firstLine);
  const hasMore = chars.length > maxChars || note.includes("\n");
  if (!hasMore) return firstLine;
  return `${chars
    .slice(0, maxChars - 1)
    .join("")
    .trimEnd()}…`;
}
