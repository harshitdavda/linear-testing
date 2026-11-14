// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const IL: Country = {
  code: "IL",
  name: "Israel",
  callingCode: "972",
  currency: "ILS",
  postalCode: {
    pattern: /^\d{7}$/,
    example: "9614303",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{city} {postalCode}",
  ],
};
