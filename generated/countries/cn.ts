// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const CN: Country = {
  code: "CN",
  name: "China",
  callingCode: "86",
  currency: "CNY",
  postalCode: {
    pattern: /^\d{6}$/,
    example: "100000",
    required: true,
  },
  subdivision: { label: "Province", required: true },
  localityLines: [
    "{postalCode}",
    "{subdivision} {city}",
  ],
};
