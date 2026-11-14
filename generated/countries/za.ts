// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const ZA: Country = {
  code: "ZA",
  name: "South Africa",
  callingCode: "27",
  currency: "ZAR",
  postalCode: {
    pattern: /^\d{4}$/,
    example: "8001",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{city}",
    "{postalCode}",
  ],
};
