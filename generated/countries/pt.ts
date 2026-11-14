// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const PT: Country = {
  code: "PT",
  name: "Portugal",
  callingCode: "351",
  currency: "EUR",
  postalCode: {
    pattern: /^\d{4}-\d{3}$/,
    example: "1100-148",
    required: true,
    canonical: { fromEnd: 3, separator: "-" },
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
