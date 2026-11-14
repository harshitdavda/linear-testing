import { type Cart, subtotal } from "./cart";
import { type GiftCard, redeemGiftCard } from "./gift-cards";
import { addTax, applyDiscount } from "./pricing";

export * from "./cart";
export * from "./format";
export * from "./gift-cards";
export * from "./pricing";

export function checkoutTotal(
  cart: Cart,
  taxRate: number,
  code?: string,
): number {
  return addTax(applyDiscount(subtotal(cart), code), taxRate);
}

export type CheckoutResult = {
  totalCents: number;
  giftCardCents: number;
  dueCents: number;
  giftCard?: GiftCard;
};

export function checkout(
  cart: Cart,
  taxRate: number,
  options: { code?: string; giftCard?: GiftCard } = {},
): CheckoutResult {
  const totalCents = checkoutTotal(cart, taxRate, options.code);
  if (!options.giftCard) {
    return { totalCents, giftCardCents: 0, dueCents: totalCents };
  }
  const redemption = redeemGiftCard(options.giftCard, totalCents);
  return {
    totalCents,
    giftCardCents: redemption.appliedCents,
    dueCents: redemption.remainingDueCents,
    giftCard: redemption.card,
  };
}
