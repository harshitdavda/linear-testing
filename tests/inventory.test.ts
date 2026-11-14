import { describe, expect, it } from "vitest";
import {
  availableStock,
  commitStock,
  createInventory,
  InsufficientStockError,
  releaseStock,
  reserveStock,
  restock,
  stockLevel,
} from "../src/inventory";

describe("inventory", () => {
  it("starts from initial stock and treats unknown skus as empty", () => {
    const inventory = createInventory({ a: 5 });
    expect(availableStock(inventory, "a")).toBe(5);
    expect(availableStock(inventory, "missing")).toBe(0);
  });

  it("rejects invalid initial or restock quantities", () => {
    expect(() => createInventory({ a: -1 })).toThrow();
    expect(() => createInventory({ a: 1.5 })).toThrow();
    expect(() => restock(createInventory(), "a", 0)).toThrow();
  });

  it("restocks without mutating the original", () => {
    const before = createInventory({ a: 2 });
    const after = restock(before, "a", 3);
    expect(availableStock(before, "a")).toBe(2);
    expect(availableStock(after, "a")).toBe(5);
  });

  it("reserves stock and lowers what is available", () => {
    const inventory = reserveStock(createInventory({ a: 5, b: 2 }), [
      { sku: "a", quantity: 3 },
      { sku: "b", quantity: 2 },
    ]);
    expect(stockLevel(inventory, "a")).toEqual({ onHand: 5, reserved: 3 });
    expect(availableStock(inventory, "a")).toBe(2);
    expect(availableStock(inventory, "b")).toBe(0);
  });

  it("sums repeated skus before checking stock", () => {
    const inventory = createInventory({ a: 3 });
    expect(() =>
      reserveStock(inventory, [
        { sku: "a", quantity: 2 },
        { sku: "a", quantity: 2 },
      ]),
    ).toThrow(InsufficientStockError);
  });

  it("reserves all lines or none and reports every shortage", () => {
    const inventory = createInventory({ a: 5, b: 1 });
    try {
      reserveStock(inventory, [
        { sku: "a", quantity: 2 },
        { sku: "b", quantity: 3 },
        { sku: "c", quantity: 1 },
      ]);
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(InsufficientStockError);
      expect((error as InsufficientStockError).shortages).toEqual([
        { sku: "b", requested: 3, available: 1 },
        { sku: "c", requested: 1, available: 0 },
      ]);
    }
    expect(availableStock(inventory, "a")).toBe(5);
  });

  it("releases reserved stock", () => {
    const reserved = reserveStock(createInventory({ a: 4 }), [
      { sku: "a", quantity: 3 },
    ]);
    const released = releaseStock(reserved, [{ sku: "a", quantity: 3 }]);
    expect(stockLevel(released, "a")).toEqual({ onHand: 4, reserved: 0 });
  });

  it("refuses to release more than is reserved", () => {
    const reserved = reserveStock(createInventory({ a: 4 }), [
      { sku: "a", quantity: 1 },
    ]);
    expect(() => releaseStock(reserved, [{ sku: "a", quantity: 2 }])).toThrow();
  });

  it("commits reserved stock out of the warehouse", () => {
    const reserved = reserveStock(createInventory({ a: 4 }), [
      { sku: "a", quantity: 3 },
    ]);
    const committed = commitStock(reserved, [{ sku: "a", quantity: 3 }]);
    expect(stockLevel(committed, "a")).toEqual({ onHand: 1, reserved: 0 });
    expect(() => commitStock(committed, [{ sku: "a", quantity: 1 }])).toThrow();
  });
});
