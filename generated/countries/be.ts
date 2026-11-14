// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const BE: Country = {
  code: "BE",
  name: "Belgium",
  callingCode: "32",
  currency: "EUR",
  postalCode: {
    pattern: /^\d{4}$/,
    example: "1000",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
