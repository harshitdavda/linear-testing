// Generated file. Do not edit.
export const CURRENCIES = {
  USD: { symbol: "$", decimals: 2 },
  EUR: { symbol: "€", decimals: 2 },
  GBP: { symbol: "£", decimals: 2 },
  CAD: { symbol: "CA$", decimals: 2 },
  INR: { symbol: "₹", decimals: 2 },
  JPY: { symbol: "¥", decimals: 0 },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;
