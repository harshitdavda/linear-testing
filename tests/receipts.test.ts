import { describe, expect, it } from "vitest";
import { addItem, createCart } from "../src/cart";
import { createInventory } from "../src/inventory";
import { markPaid, placeOrder } from "../src/orders";
import { buildReceipt, renderReceipt } from "../src/receipts";

const AT = new Date("2026-11-14T10:00:00.000Z");

function order(discountCode?: string, currency?: "USD" | "GBP" | "JPY") {
  let cart = addItem(createCart(), {
    sku: "mug",
    priceCents: 1200,
    quantity: 2,
  });
  cart = addItem(cart, { sku: "tee", priceCents: 2500, quantity: 1 });
  return placeOrder(createInventory({ mug: 5, tee: 5 }), {
    id: "ord-7",
    cart,
    taxRate: 0.1,
    discountCode,
    currency,
    at: AT,
  }).order;
}

describe("buildReceipt", () => {
  it("formats every amount in the order currency", () => {
    const receipt = buildReceipt(order("WELCOME10", "GBP"));
    expect(receipt).toEqual({
      orderId: "ord-7",
      status: "pending",
      placedAt: "2026-11-14T10:00:00.000Z",
      currency: "GBP",
      lines: [
        { sku: "mug", quantity: 2, unitPrice: "£12.00", lineTotal: "£24.00" },
        { sku: "tee", quantity: 1, unitPrice: "£25.00", lineTotal: "£25.00" },
      ],
      subtotal: "£49.00",
      discount: "-£4.90",
      tax: "£4.41",
      total: "£48.51",
    });
  });

  it("omits the discount when none applies", () => {
    expect(buildReceipt(order()).discount).toBeUndefined();
  });

  it("reflects the current order status", () => {
    expect(buildReceipt(markPaid(order(), AT)).status).toBe("paid");
  });
});

describe("renderReceipt", () => {
  it("renders a fixed-width text receipt", () => {
    expect(renderReceipt(buildReceipt(order("WELCOME10")))).toBe(
      [
        "Receipt ord-7",
        "Placed 2026-11-14T10:00:00.000Z",
        "Status pending",
        "--------------------------------",
        "2 x mug                   $24.00",
        "1 x tee                   $25.00",
        "--------------------------------",
        "Subtotal                  $49.00",
        "Discount                  -$4.90",
        "Tax                        $4.41",
        "Total                     $48.51",
        "",
      ].join("\n"),
    );
  });

  it("skips the discount row and keeps a gap for long labels", () => {
    const receipt = buildReceipt(order());
    receipt.lines[0].sku = "a-very-long-sku-name-that-overflows";
    const text = renderReceipt(receipt);
    expect(text).not.toContain("Discount");
    expect(text).toContain("2 x a-very-long-sku-name-that-overflows $24.00");
  });
});
