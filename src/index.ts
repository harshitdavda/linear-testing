import { type Cart, subtotal } from "./cart";
import { addTax, applyDiscount } from "./pricing";

export * from "./cart";
export * from "./format";
export * from "./pricing";

export function checkoutTotal(
  cart: Cart,
  taxRate: number,
  code?: string,
): number {
  return addTax(applyDiscount(subtotal(cart), code), taxRate);
}

export * from "./checkout";
export * from "./events";
export * from "./invoices";
export * from "./promotions";
export * from "./regions";
export * from "./shipping";
