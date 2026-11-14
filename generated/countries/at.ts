// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const AT: Country = {
  code: "AT",
  name: "Austria",
  callingCode: "43",
  currency: "EUR",
  postalCode: {
    pattern: /^\d{4}$/,
    example: "1010",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
