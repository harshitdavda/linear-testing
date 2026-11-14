// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const JP: Country = {
  code: "JP",
  name: "Japan",
  callingCode: "81",
  currency: "JPY",
  postalCode: {
    pattern: /^\d{3}-\d{4}$/,
    example: "100-0001",
    required: true,
    canonical: { fromEnd: 4, separator: "-" },
  },
  subdivision: { label: "Prefecture", required: true },
  localityLines: [
    "{postalCode}",
    "{subdivision} {city}",
  ],
};
