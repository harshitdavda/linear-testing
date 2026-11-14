export type Shortage = { sku: string; requested: number; available: number };

export class InsufficientStockError extends Error {
  readonly shortages: readonly Shortage[];

  constructor(shortages: readonly Shortage[]) {
    super(`insufficient stock for ${shortages.map((s) => s.sku).join(", ")}`);
    this.name = "InsufficientStockError";
    this.shortages = shortages;
  }
}
