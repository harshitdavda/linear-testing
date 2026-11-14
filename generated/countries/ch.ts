// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const CH: Country = {
  code: "CH",
  name: "Switzerland",
  callingCode: "41",
  currency: "CHF",
  postalCode: {
    pattern: /^\d{4}$/,
    example: "8001",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
