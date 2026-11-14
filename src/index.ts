import { type Cart, subtotal } from "./cart";
import { applyDiscount, applyTax } from "./money";

export * from "./cart";
export * from "./money";

export function checkoutTotal(
  cart: Cart,
  taxRate: number,
  code?: string,
): number {
  return applyTax(applyDiscount(subtotal(cart), code), taxRate);
}
