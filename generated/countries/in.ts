// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const IN: Country = {
  code: "IN",
  name: "India",
  callingCode: "91",
  currency: "INR",
  postalCode: {
    pattern: /^[1-9]\d{5}$/,
    example: "110001",
    required: true,
  },
  subdivision: { label: "State", required: true },
  localityLines: [
    "{city} {postalCode}",
    "{subdivision}",
  ],
};
