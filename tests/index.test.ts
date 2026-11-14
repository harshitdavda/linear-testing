import { describe, expect, it } from "vitest";
import * as api from "../src";

describe("public api", () => {
  it("exposes the order lifecycle from the package root", () => {
    for (const name of [
      "createInventory",
      "placeOrder",
      "shipOrder",
      "buildReceipt",
      "renderReceipt",
      "ordersToCsv",
      "checkoutTotal",
    ]) {
      expect(api).toHaveProperty(name);
    }
  });

  it("runs an order end to end through the root exports", () => {
    const at = new Date("2026-11-14T10:00:00.000Z");
    const cart = api.addItem(api.createCart(), {
      sku: "mug",
      priceCents: 1000,
      quantity: 1,
    });
    const placed = api.placeOrder(api.createInventory({ mug: 1 }), {
      id: "ord-1",
      cart,
      taxRate: 0.1,
      at,
    });
    expect(placed.order.totals.totalCents).toBe(api.checkoutTotal(cart, 0.1));
    const shipped = api.shipOrder(
      api.markPaid(placed.order, at),
      placed.inventory,
      at,
    );
    expect(api.availableStock(shipped.inventory, "mug")).toBe(0);
    expect(api.renderReceipt(api.buildReceipt(shipped.order))).toContain(
      "Total                     $11.00",
    );
  });
});
