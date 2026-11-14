export function shouldRetry(status: number): boolean {
  return status === 408 || status === 429 || (status >= 500 && status <= 599);
}

export function backoffDelays(
  maxAttempts: number,
  baseMs: number,
  capMs: number,
): number[] {
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1) {
    throw new Error("maxAttempts must be at least 1");
  }
  return Array.from({ length: maxAttempts - 1 }, (_, attempt) =>
    Math.min(capMs, baseMs * 2 ** attempt),
  );
}
