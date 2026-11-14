// Generated file. Do not edit.
export const REGIONS = {
  US_CA: {
    country: "US",
    name: "California",
    currency: "USD",
    taxRate: 0.0725,
    taxInclusive: false,
  },
  US_NY: {
    country: "US",
    name: "New York",
    currency: "USD",
    taxRate: 0.04,
    taxInclusive: false,
  },
  US_OR: {
    country: "US",
    name: "Oregon",
    currency: "USD",
    taxRate: 0,
    taxInclusive: false,
  },
  DE: {
    country: "DE",
    name: "Germany",
    currency: "EUR",
    taxRate: 0.19,
    taxInclusive: true,
  },
  FR: {
    country: "FR",
    name: "France",
    currency: "EUR",
    taxRate: 0.2,
    taxInclusive: true,
  },
  IN_MH: {
    country: "IN",
    name: "Maharashtra",
    currency: "INR",
    taxRate: 0.18,
    taxInclusive: true,
  },
  JP: {
    country: "JP",
    name: "Japan",
    currency: "JPY",
    taxRate: 0.1,
    taxInclusive: true,
  },
} as const;

export type RegionCode = keyof typeof REGIONS;
