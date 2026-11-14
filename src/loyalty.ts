export type LoyaltyTier = "bronze" | "silver" | "gold";

export type LoyaltyAccount = { points: number; lifetimePoints: number };

const TIER_THRESHOLDS: readonly [LoyaltyTier, number][] = [
  ["gold", 5000],
  ["silver", 1000],
  ["bronze", 0],
];

const TIER_MULTIPLIER: Record<LoyaltyTier, number> = {
  bronze: 1,
  silver: 1.25,
  gold: 1.5,
};

export function createLoyaltyAccount(): LoyaltyAccount {
  return { points: 0, lifetimePoints: 0 };
}

export function tierFor(account: LoyaltyAccount): LoyaltyTier {
  const match = TIER_THRESHOLDS.find(
    ([, min]) => account.lifetimePoints >= min,
  );
  return match ? match[0] : "bronze";
}

export function pointsForPurchase(
  totalCents: number,
  tier: LoyaltyTier,
): number {
  if (totalCents <= 0) return 0;
  return Math.floor(Math.floor(totalCents / 100) * TIER_MULTIPLIER[tier]);
}

export function earnPoints(
  account: LoyaltyAccount,
  totalCents: number,
): LoyaltyAccount {
  const earned = pointsForPurchase(totalCents, tierFor(account));
  return {
    points: account.points + earned,
    lifetimePoints: account.lifetimePoints + earned,
  };
}
