// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const TH: Country = {
  code: "TH",
  name: "Thailand",
  callingCode: "66",
  currency: "THB",
  postalCode: {
    pattern: /^\d{5}$/,
    example: "10200",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{city} {postalCode}",
  ],
};
