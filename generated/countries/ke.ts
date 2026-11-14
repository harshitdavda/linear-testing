// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const KE: Country = {
  code: "KE",
  name: "Kenya",
  callingCode: "254",
  currency: "KES",
  postalCode: {
    pattern: /^\d{5}$/,
    example: "00100",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{city}",
    "{postalCode}",
  ],
};
