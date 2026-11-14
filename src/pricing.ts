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

const HALF_TOLERANCE = 1e-9;

export function roundHalfEven(value: number): number {
  const floor = Math.floor(value);
  const fraction = value - floor;
  if (Math.abs(fraction - 0.5) > HALF_TOLERANCE) return Math.round(value);
  return floor % 2 === 0 ? floor : floor + 1;
}

export function addTax(cents: number, rate: number): number {
  if (rate < 0) throw new Error("tax rate cannot be negative");
  return cents + roundHalfEven(cents * rate);
}
