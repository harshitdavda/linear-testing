// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const TW: Country = {
  code: "TW",
  name: "Taiwan",
  callingCode: "886",
  currency: "TWD",
  postalCode: {
    pattern: /^\d{3}(\d{2,3})?$/,
    example: "100",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{city} {postalCode}",
  ],
};
