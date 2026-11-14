import { InsufficientStockError, type Shortage } from "./errors";

export type StockLevel = { onHand: number; reserved: number };

export type Inventory = { levels: ReadonlyMap<string, StockLevel> };

export type StockLine = { sku: string; quantity: number };

const EMPTY: StockLevel = { onHand: 0, reserved: 0 };

function assertQuantity(quantity: number, allowZero = false): void {
  const tooSmall = allowZero ? quantity < 0 : quantity <= 0;
  if (!Number.isInteger(quantity) || tooSmall) {
    throw new Error(`invalid stock quantity: ${quantity}`);
  }
}

function levelOf(inventory: Inventory, sku: string): StockLevel {
  return inventory.levels.get(sku) ?? EMPTY;
}

function totalsBySku(lines: readonly StockLine[]): Map<string, number> {
  const totals = new Map<string, number>();
  for (const line of lines) {
    assertQuantity(line.quantity);
    totals.set(line.sku, (totals.get(line.sku) ?? 0) + line.quantity);
  }
  return totals;
}

function updateLevels(
  inventory: Inventory,
  totals: Map<string, number>,
  update: (level: StockLevel, quantity: number, sku: string) => StockLevel,
): Inventory {
  const levels = new Map(inventory.levels);
  for (const [sku, quantity] of totals) {
    levels.set(sku, update(levelOf(inventory, sku), quantity, sku));
  }
  return { levels };
}

export function createInventory(
  initial: Record<string, number> = {},
): Inventory {
  const levels = new Map<string, StockLevel>();
  for (const [sku, onHand] of Object.entries(initial)) {
    assertQuantity(onHand, true);
    levels.set(sku, { onHand, reserved: 0 });
  }
  return { levels };
}

export function stockLevel(inventory: Inventory, sku: string): StockLevel {
  return { ...levelOf(inventory, sku) };
}

export function availableStock(inventory: Inventory, sku: string): number {
  const level = levelOf(inventory, sku);
  return level.onHand - level.reserved;
}

export function restock(
  inventory: Inventory,
  sku: string,
  quantity: number,
): Inventory {
  return updateLevels(
    inventory,
    totalsBySku([{ sku, quantity }]),
    (level, q) => ({ ...level, onHand: level.onHand + q }),
  );
}

export function reserveStock(
  inventory: Inventory,
  lines: readonly StockLine[],
): Inventory {
  const totals = totalsBySku(lines);
  const shortages: Shortage[] = [];
  for (const [sku, requested] of totals) {
    const available = availableStock(inventory, sku);
    if (requested > available) shortages.push({ sku, requested, available });
  }
  if (shortages.length > 0) throw new InsufficientStockError(shortages);
  return updateLevels(inventory, totals, (level, q) => ({
    ...level,
    reserved: level.reserved + q,
  }));
}

export function releaseStock(
  inventory: Inventory,
  lines: readonly StockLine[],
): Inventory {
  return updateLevels(inventory, totalsBySku(lines), (level, q, sku) => {
    if (q > level.reserved) {
      throw new Error(
        `cannot release ${q} of ${sku}: only ${level.reserved} reserved`,
      );
    }
    return { ...level, reserved: level.reserved - q };
  });
}

export function commitStock(
  inventory: Inventory,
  lines: readonly StockLine[],
): Inventory {
  return updateLevels(inventory, totalsBySku(lines), (level, q, sku) => {
    if (q > level.reserved) {
      throw new Error(
        `cannot commit ${q} of ${sku}: only ${level.reserved} reserved`,
      );
    }
    return { onHand: level.onHand - q, reserved: level.reserved - q };
  });
}
