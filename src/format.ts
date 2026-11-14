import { CURRENCIES, type CurrencyCode } from "../generated/currencies";

export function formatMoney(
  cents: number,
  currency: CurrencyCode = "USD",
): string {
  const { symbol, decimals } = CURRENCIES[currency];
  const amount = decimals === 0 ? Math.round(cents / 100) : cents / 100;
  return `${symbol}${amount.toFixed(decimals)}`;
}
