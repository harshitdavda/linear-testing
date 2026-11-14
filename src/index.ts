import { type Cart, subtotal } from "./cart";
import { addTax, applyDiscount } from "./pricing";

export * from "./cart";
export * from "./export";
export * from "./format";
export * from "./inventory";
export * from "./orders";
export * from "./pricing";
export * from "./receipts";

export function checkoutTotal(
  cart: Cart,
  taxRate: number,
  code?: string,
): number {
  return addTax(applyDiscount(subtotal(cart), code), taxRate);
}
