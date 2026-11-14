import { bulkDiscountCents } from "./bulk";
import { type Cart, subtotal } from "./cart";
import { addTax, applyDiscount } from "./pricing";

export * from "./bulk";
export * from "./cart";
export * from "./format";
export * from "./pricing";

export function checkoutTotal(
  cart: Cart,
  taxRate: number,
  code?: string,
): number {
  const afterBulk = subtotal(cart) - bulkDiscountCents(cart);
  return addTax(applyDiscount(afterBulk, code), taxRate);
}
