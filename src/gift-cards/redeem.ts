import type { GiftCard } from "./card";

export type Redemption = {
  card: GiftCard;
  appliedCents: number;
  remainingDueCents: number;
};

export function redeemGiftCard(
  card: GiftCard,
  amountDueCents: number,
): Redemption {
  if (!Number.isInteger(amountDueCents) || amountDueCents < 0) {
    throw new Error("amount due must be a non-negative number of cents");
  }
  const appliedCents = Math.min(card.balanceCents, amountDueCents);
  return {
    card: { ...card, balanceCents: card.balanceCents - appliedCents },
    appliedCents,
    remainingDueCents: amountDueCents - appliedCents,
  };
}
