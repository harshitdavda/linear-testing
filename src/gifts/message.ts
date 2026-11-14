export const MAX_MESSAGE_LINES = 4;
export const MAX_LINE_LENGTH = 40;

export function giftMessageLines(raw: string): string[] {
  return raw
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function validateGiftMessage(raw: string): string[] {
  const lines = giftMessageLines(raw);
  const errors: string[] = [];
  if (lines.length > MAX_MESSAGE_LINES) {
    errors.push(`use at most ${MAX_MESSAGE_LINES} lines`);
  }
  lines.forEach((line, index) => {
    if (Array.from(line).length > MAX_LINE_LENGTH) {
      errors.push(
        `line ${index + 1} is longer than ${MAX_LINE_LENGTH} characters`,
      );
    }
  });
  return errors;
}

export function formatGiftCard(raw: string, from?: string): string {
  const errors = validateGiftMessage(raw);
  if (errors.length > 0) throw new Error(errors.join("; "));
  const signature = from?.trim() ? [`— ${from.trim()}`] : [];
  return [...giftMessageLines(raw), ...signature].join("\n");
}
