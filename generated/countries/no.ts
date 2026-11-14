// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const NO: Country = {
  code: "NO",
  name: "Norway",
  callingCode: "47",
  currency: "NOK",
  postalCode: {
    pattern: /^\d{4}$/,
    example: "0150",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
