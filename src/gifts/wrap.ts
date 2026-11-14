export type WrapStyle = "paper" | "box";

export const WRAP_PRICES: Record<WrapStyle, number> = { paper: 299, box: 599 };

export type WrappableItem = { sku: string; quantity: number; isFood: boolean };

export type WrapRequest = { sku: string; style: WrapStyle; quantity: number };

export type WrapLine = WrapRequest & { cents: number };

export function validateWrapRequests(
  items: readonly WrappableItem[],
  requests: readonly WrapRequest[],
): string[] {
  const errors: string[] = [];
  const bySku = new Map(items.map((item) => [item.sku, item]));
  const wrappedPerSku = new Map<string, number>();
  for (const request of requests) {
    const item = bySku.get(request.sku);
    if (!item) {
      errors.push(`${request.sku}: not in the cart`);
      continue;
    }
    if (item.isFood) errors.push(`${request.sku}: food can't be gift-wrapped`);
    if (!Number.isInteger(request.quantity) || request.quantity < 1) {
      errors.push(`${request.sku}: quantity must be a positive whole number`);
      continue;
    }
    wrappedPerSku.set(
      request.sku,
      (wrappedPerSku.get(request.sku) ?? 0) + request.quantity,
    );
  }
  for (const [sku, wrapped] of wrappedPerSku) {
    const inCart = bySku.get(sku)?.quantity ?? 0;
    if (wrapped > inCart) {
      errors.push(`${sku}: wrapping ${wrapped} but only ${inCart} in the cart`);
    }
  }
  return errors;
}

export function wrapLines(
  items: readonly WrappableItem[],
  requests: readonly WrapRequest[],
): WrapLine[] {
  const errors = validateWrapRequests(items, requests);
  if (errors.length > 0) throw new Error(errors.join("; "));
  return requests.map((request) => ({
    ...request,
    cents: WRAP_PRICES[request.style] * request.quantity,
  }));
}

export function wrapTotal(lines: readonly WrapLine[]): number {
  return lines.reduce((total, line) => total + line.cents, 0);
}
