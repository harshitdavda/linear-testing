import type { CurrencyCode } from "../../generated/currencies";
import { type Cart, subtotal } from "../cart";
import {
  commitStock,
  type Inventory,
  releaseStock,
  reserveStock,
} from "../inventory";
import { addTax, applyDiscount } from "../pricing";
import { assertTransition } from "./state-machine";
import type { Order, OrderLine, OrderStatus, OrderTotals } from "./types";

export type PlaceOrderInput = {
  id: string;
  cart: Cart;
  taxRate: number;
  discountCode?: string;
  currency?: CurrencyCode;
  at: Date;
};

export type OrderResult = { order: Order; inventory: Inventory };

export function computeTotals(
  lines: readonly OrderLine[],
  taxRate: number,
  discountCode?: string,
): OrderTotals {
  const subtotalCents = subtotal({ items: [...lines] });
  const discounted = applyDiscount(subtotalCents, discountCode);
  const totalCents = addTax(discounted, taxRate);
  return {
    subtotalCents,
    discountCents: subtotalCents - discounted,
    taxCents: totalCents - discounted,
    totalCents,
  };
}

export function placeOrder(
  inventory: Inventory,
  input: PlaceOrderInput,
): OrderResult {
  if (input.cart.items.length === 0) {
    throw new Error("cannot place an order for an empty cart");
  }
  const lines = input.cart.items.map((item) => ({ ...item }));
  const totals = computeTotals(lines, input.taxRate, input.discountCode);
  const order: Order = {
    id: input.id,
    status: "pending",
    currency: input.currency ?? "USD",
    lines,
    discountCode: input.discountCode,
    taxRate: input.taxRate,
    totals,
    history: [{ status: "pending", at: input.at.toISOString() }],
  };
  return { order, inventory: reserveStock(inventory, lines) };
}

function moveTo(order: Order, status: OrderStatus, at: Date): Order {
  assertTransition(order.status, status);
  return {
    ...order,
    status,
    history: [...order.history, { status, at: at.toISOString() }],
  };
}

export function markPaid(order: Order, at: Date): Order {
  return moveTo(order, "paid", at);
}

export function shipOrder(
  order: Order,
  inventory: Inventory,
  at: Date,
): OrderResult {
  const shipped = moveTo(order, "shipped", at);
  return { order: shipped, inventory: commitStock(inventory, order.lines) };
}

export function markDelivered(order: Order, at: Date): Order {
  return moveTo(order, "delivered", at);
}

export function cancelOrder(
  order: Order,
  inventory: Inventory,
  at: Date,
): OrderResult {
  const cancelled = moveTo(order, "cancelled", at);
  return { order: cancelled, inventory: releaseStock(inventory, order.lines) };
}

export function refundOrder(
  order: Order,
  inventory: Inventory,
  at: Date,
): OrderResult {
  const refunded = moveTo(order, "refunded", at);
  const stillReserved = order.status === "paid";
  return {
    order: refunded,
    inventory: stillReserved ? releaseStock(inventory, order.lines) : inventory,
  };
}

export function placedAt(order: Order): string {
  return order.history[0].at;
}
