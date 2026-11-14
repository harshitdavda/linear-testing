import type { CurrencyCode } from "../../generated/currencies";
import type {
  Promotion,
  PromotionLine,
  PromotionResult,
} from "../promotions/types";
import type { Region } from "../regions/types";
import type { ShippingMethod } from "../shipping/rates";

export type CheckoutLine = PromotionLine & { weightGrams: number };

export type CheckoutInput = {
  regionCode: string;
  lines: CheckoutLine[];
  shippingMethod: ShippingMethod;
  promotions: Promotion[];
  now: Date;
};

export type CheckoutSession = {
  id: string;
  region: Region;
  input: CheckoutInput;
};

export type TotalsLine = {
  sku: string;
  quantity: number;
  amountCents: number;
  discountCents: number;
  taxCents: number;
  grossCents: number;
};

export type CheckoutTotals = {
  currency: CurrencyCode;
  lines: TotalsLine[];
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  appliedPromotions: PromotionResult[];
};
