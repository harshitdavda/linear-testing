// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const US: Country = {
  code: "US",
  name: "United States",
  callingCode: "1",
  currency: "USD",
  postalCode: {
    pattern: /^\d{5}(-\d{4})?$/,
    example: "94103",
    required: true,
    canonical: { fromEnd: 4, separator: "-" },
  },
  subdivision: { label: "State", required: true },
  localityLines: [
    "{city}, {subdivision} {postalCode}",
  ],
};
