const DISCOUNTS: Record<string, number> = {
  WELCOME10: 0.1,
  HALFOFF: 0.5,
};

export function applyDiscount(subtotalCents: number, code?: string): number {
  if (!code) return subtotalCents;
  const rate = DISCOUNTS[code.toUpperCase()];
  if (rate === undefined) throw new Error(`unknown discount code: ${code}`);
  return Math.round(subtotalCents * (1 - rate));
}
