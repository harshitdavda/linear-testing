import type { CheckoutTotals } from "../checkout/types";
import type { Region } from "../regions/types";

export type Invoice = {
  number: string;
  issuedAt: Date;
  region: Region;
  sessionId: string;
  totals: CheckoutTotals;
};
