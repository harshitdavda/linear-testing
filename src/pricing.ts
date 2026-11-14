export type Coupon = { rate: number; expiresAt?: string };

const COUPONS: Record<string, Coupon> = {
  WELCOME10: { rate: 0.1 },
  HALFOFF: { rate: 0.5 },
  BLACKFRIDAY30: { rate: 0.3, expiresAt: "2026-11-30T23:59:59.999Z" },
};

export function isCouponExpired(coupon: Coupon, now: Date): boolean {
  return (
    coupon.expiresAt !== undefined &&
    now.getTime() > Date.parse(coupon.expiresAt)
  );
}

export function applyDiscount(
  subtotalCents: number,
  code?: string,
  now: Date = new Date(),
): number {
  if (!code) return subtotalCents;
  const coupon = COUPONS[code.toUpperCase()];
  if (coupon === undefined) throw new Error(`unknown discount code: ${code}`);
  if (isCouponExpired(coupon, now)) {
    throw new Error(`discount code expired: ${code}`);
  }
  return Math.round(subtotalCents * (1 - coupon.rate));
}

export function addTax(cents: number, rate: number): number {
  if (rate < 0) throw new Error("tax rate cannot be negative");
  return Math.round(cents * (1 + rate));
}
