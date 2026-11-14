// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const GB: Country = {
  code: "GB",
  name: "United Kingdom",
  callingCode: "44",
  currency: "GBP",
  postalCode: {
    pattern: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/,
    example: "SW1A 1AA",
    required: true,
    canonical: { fromEnd: 3, separator: " " },
  },
  subdivision: null,
  localityLines: [
    "{city}",
    "{postalCode}",
  ],
};
