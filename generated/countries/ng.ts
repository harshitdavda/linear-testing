// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const NG: Country = {
  code: "NG",
  name: "Nigeria",
  callingCode: "234",
  currency: "NGN",
  postalCode: {
    pattern: /^\d{6}$/,
    example: "900001",
    required: false,
  },
  subdivision: null,
  localityLines: [
    "{city} {postalCode}",
  ],
};
