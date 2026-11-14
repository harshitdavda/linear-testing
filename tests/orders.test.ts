import { describe, expect, it } from "vitest";
import { addItem, type Cart, createCart } from "../src/cart";
import {
  availableStock,
  createInventory,
  InsufficientStockError,
  stockLevel,
} from "../src/inventory";
import {
  cancelOrder,
  computeTotals,
  InvalidTransitionError,
  markDelivered,
  markPaid,
  placedAt,
  placeOrder,
  refundOrder,
  shipOrder,
} from "../src/orders";

const T0 = new Date("2026-11-14T10:00:00.000Z");
const T1 = new Date("2026-11-14T11:00:00.000Z");
const T2 = new Date("2026-11-15T09:30:00.000Z");
const T3 = new Date("2026-11-17T16:45:00.000Z");

function sampleCart(): Cart {
  let cart = addItem(createCart(), {
    sku: "mug",
    priceCents: 1200,
    quantity: 2,
  });
  cart = addItem(cart, { sku: "tee", priceCents: 2500, quantity: 1 });
  return cart;
}

function place(discountCode?: string) {
  return placeOrder(createInventory({ mug: 10, tee: 3 }), {
    id: "ord-1",
    cart: sampleCart(),
    taxRate: 0.1,
    discountCode,
    at: T0,
  });
}

describe("computeTotals", () => {
  it("splits subtotal, discount, tax and total", () => {
    const lines = sampleCart().items;
    expect(computeTotals(lines, 0.1, "WELCOME10")).toEqual({
      subtotalCents: 4900,
      discountCents: 490,
      taxCents: 441,
      totalCents: 4851,
    });
  });

  it("has no discount without a code", () => {
    expect(computeTotals(sampleCart().items, 0).discountCents).toBe(0);
  });
});

describe("orders", () => {
  it("places a pending order and reserves its stock", () => {
    const { order, inventory } = place("WELCOME10");
    expect(order.status).toBe("pending");
    expect(order.currency).toBe("USD");
    expect(order.totals.totalCents).toBe(4851);
    expect(placedAt(order)).toBe(T0.toISOString());
    expect(stockLevel(inventory, "mug")).toEqual({ onHand: 10, reserved: 2 });
    expect(availableStock(inventory, "tee")).toBe(2);
  });

  it("rejects empty carts", () => {
    expect(() =>
      placeOrder(createInventory(), {
        id: "x",
        cart: createCart(),
        taxRate: 0,
        at: T0,
      }),
    ).toThrow("empty cart");
  });

  it("rejects orders that exceed stock without reserving anything", () => {
    const inventory = createInventory({ mug: 1, tee: 3 });
    expect(() =>
      placeOrder(inventory, {
        id: "x",
        cart: sampleCart(),
        taxRate: 0,
        at: T0,
      }),
    ).toThrow(InsufficientStockError);
    expect(availableStock(inventory, "tee")).toBe(3);
  });

  it("rejects unknown discount codes before reserving", () => {
    expect(() => place("BOGUS")).toThrow("unknown discount code");
  });

  it("does not share line objects with the cart", () => {
    const cart = sampleCart();
    const { order } = placeOrder(createInventory({ mug: 10, tee: 3 }), {
      id: "x",
      cart,
      taxRate: 0,
      at: T0,
    });
    expect(order.lines).toEqual(cart.items);
    expect(order.lines[0]).not.toBe(cart.items[0]);
  });

  it("walks the full lifecycle and records history", () => {
    const placed = place();
    const paid = markPaid(placed.order, T1);
    const shipped = shipOrder(paid, placed.inventory, T2);
    const delivered = markDelivered(shipped.order, T3);

    expect(delivered.status).toBe("delivered");
    expect(delivered.history.map((e) => e.status)).toEqual([
      "pending",
      "paid",
      "shipped",
      "delivered",
    ]);
    expect(stockLevel(shipped.inventory, "mug")).toEqual({
      onHand: 8,
      reserved: 0,
    });
    expect(paid.status).toBe("paid");
    expect(placed.order.status).toBe("pending");
  });

  it("returns stock when a pending order is cancelled", () => {
    const placed = place();
    const { order, inventory } = cancelOrder(
      placed.order,
      placed.inventory,
      T1,
    );
    expect(order.status).toBe("cancelled");
    expect(stockLevel(inventory, "tee")).toEqual({ onHand: 3, reserved: 0 });
  });

  it("cannot cancel a paid order", () => {
    const placed = place();
    const paid = markPaid(placed.order, T1);
    expect(() => cancelOrder(paid, placed.inventory, T2)).toThrow(
      InvalidTransitionError,
    );
  });

  it("releases stock when refunding before shipping", () => {
    const placed = place();
    const paid = markPaid(placed.order, T1);
    const { order, inventory } = refundOrder(paid, placed.inventory, T2);
    expect(order.status).toBe("refunded");
    expect(stockLevel(inventory, "mug")).toEqual({ onHand: 10, reserved: 0 });
  });

  it("leaves stock alone when refunding a delivered order", () => {
    const placed = place();
    const shipped = shipOrder(markPaid(placed.order, T1), placed.inventory, T2);
    const delivered = markDelivered(shipped.order, T3);
    const refunded = refundOrder(delivered, shipped.inventory, T3);
    expect(refunded.order.status).toBe("refunded");
    expect(refunded.inventory).toBe(shipped.inventory);
  });

  it("cannot ship an unpaid order", () => {
    const placed = place();
    expect(() => shipOrder(placed.order, placed.inventory, T1)).toThrow(
      InvalidTransitionError,
    );
  });
});
