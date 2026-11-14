// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const SE: Country = {
  code: "SE",
  name: "Sweden",
  callingCode: "46",
  currency: "SEK",
  postalCode: {
    pattern: /^\d{3} \d{2}$/,
    example: "111 22",
    required: true,
    canonical: { fromEnd: 2, separator: " " },
  },
  subdivision: null,
  localityLines: [
    "{postalCode} {city}",
  ],
};
