import { type Cart, subtotal } from "./cart";
import { addTax, applyDiscount, shippingFor } from "./pricing";

export * from "./cart";
export * from "./format";
export * from "./pricing";

export function checkoutTotal(
  cart: Cart,
  taxRate: number,
  code?: string,
): number {
  const items = subtotal(cart);
  return addTax(applyDiscount(items, code), taxRate) + shippingFor(items);
}
