// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const VN: Country = {
  code: "VN",
  name: "Vietnam",
  callingCode: "84",
  currency: "VND",
  postalCode: {
    pattern: /^\d{6}$/,
    example: "100000",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{city} {postalCode}",
  ],
};
