// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const IE: Country = {
  code: "IE",
  name: "Ireland",
  callingCode: "353",
  currency: "EUR",
  postalCode: {
    pattern: /^([AC-FHKNPRTV-Y]\d{2}|D6W) [0-9AC-FHKNPRTV-Y]{4}$/,
    example: "D02 X285",
    required: false,
    canonical: { fromEnd: 4, separator: " " },
  },
  subdivision: { label: "County", required: false },
  localityLines: [
    "{city}",
    "{subdivision}",
    "{postalCode}",
  ],
};
