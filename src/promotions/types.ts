import type { TaxCategory } from "../regions/types";

export type PromotionLine = {
  sku: string;
  category: TaxCategory;
  unitCents: number;
  quantity: number;
};

type PromotionBase = {
  id: string;
  stackable: boolean;
  priority: number;
  startsAt?: string;
  endsAt?: string;
  minSubtotalCents?: number;
};

export type Promotion = PromotionBase &
  (
    | { kind: "percent-off"; percent: number; skus?: readonly string[] }
    | { kind: "amount-off"; amountCents: number }
    | { kind: "buy-x-get-y"; sku: string; buy: number; get: number }
    | { kind: "free-shipping" }
  );

export type PromotionResult = {
  promotionId: string;
  discountCents: number;
  freeShipping: boolean;
};
