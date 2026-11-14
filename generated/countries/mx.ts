// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const MX: Country = {
  code: "MX",
  name: "Mexico",
  callingCode: "52",
  currency: "MXN",
  postalCode: {
    pattern: /^\d{5}$/,
    example: "06600",
    required: true,
  },
  subdivision: { label: "State", required: true },
  localityLines: [
    "{postalCode} {city}, {subdivision}",
  ],
};
