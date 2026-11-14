// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const LU: Country = {
  code: "LU",
  name: "Luxembourg",
  callingCode: "352",
  currency: "EUR",
  postalCode: {
    pattern: /^(L-)?\d{4}$/,
    example: "1009",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
