// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const FI: Country = {
  code: "FI",
  name: "Finland",
  callingCode: "358",
  currency: "EUR",
  postalCode: {
    pattern: /^\d{5}$/,
    example: "00100",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
