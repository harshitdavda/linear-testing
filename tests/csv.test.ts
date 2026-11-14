import { describe, expect, it } from "vitest";
import { addItem, createCart } from "../src/cart";
import {
  escapeCsvField,
  orderLinesToCsv,
  ordersToCsv,
  toCsv,
} from "../src/export";
import { createInventory } from "../src/inventory";
import { placeOrder } from "../src/orders";

describe("escapeCsvField", () => {
  it("leaves plain values alone", () => {
    expect(escapeCsvField("mug")).toBe("mug");
    expect(escapeCsvField(42)).toBe("42");
    expect(escapeCsvField(undefined)).toBe("");
  });

  it("quotes commas, quotes, newlines and edge whitespace", () => {
    expect(escapeCsvField("a,b")).toBe('"a,b"');
    expect(escapeCsvField('say "hi"')).toBe('"say ""hi"""');
    expect(escapeCsvField("line\nbreak")).toBe('"line\nbreak"');
    expect(escapeCsvField(" padded")).toBe('" padded"');
  });
});

describe("toCsv", () => {
  it("writes a header and CRLF-terminated rows", () => {
    const csv = toCsv(
      [
        { n: "a,1", v: 1 },
        { n: "b", v: 2 },
      ],
      [
        { header: "name", value: (r) => r.n },
        { header: "value", value: (r) => r.v },
      ],
    );
    expect(csv).toBe('name,value\r\n"a,1",1\r\nb,2\r\n');
  });

  it("writes only the header for no rows", () => {
    expect(toCsv([], [{ header: "x", value: () => 1 }])).toBe("x\r\n");
  });
});

describe("order exports", () => {
  const AT = new Date("2026-11-14T10:00:00.000Z");
  let cart = addItem(createCart(), {
    sku: "mug",
    priceCents: 1200,
    quantity: 2,
  });
  cart = addItem(cart, { sku: "tee", priceCents: 2500, quantity: 1 });
  const placed = placeOrder(createInventory({ mug: 5, tee: 5 }), {
    id: "ord-1",
    cart,
    taxRate: 0.1,
    discountCode: "HALFOFF",
    at: AT,
  });
  const second = placeOrder(placed.inventory, {
    id: "ord-2",
    cart: addItem(createCart(), { sku: "tee", priceCents: 2500, quantity: 1 }),
    taxRate: 0,
    at: AT,
  });

  it("exports one row per order", () => {
    expect(ordersToCsv([placed.order, second.order]).split("\r\n")).toEqual([
      "order_id,status,placed_at,currency,discount_code,item_count,subtotal_cents,discount_cents,tax_cents,total_cents",
      "ord-1,pending,2026-11-14T10:00:00.000Z,USD,HALFOFF,3,4900,2450,245,2695",
      "ord-2,pending,2026-11-14T10:00:00.000Z,USD,,1,2500,0,0,2500",
      "",
    ]);
  });

  it("exports one row per order line", () => {
    expect(orderLinesToCsv([placed.order, second.order]).split("\r\n")).toEqual(
      [
        "order_id,sku,quantity,unit_price_cents,line_total_cents",
        "ord-1,mug,2,1200,2400",
        "ord-1,tee,1,2500,2500",
        "ord-2,tee,1,2500,2500",
        "",
      ],
    );
  });
});
