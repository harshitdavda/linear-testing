// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const ID: Country = {
  code: "ID",
  name: "Indonesia",
  callingCode: "62",
  currency: "IDR",
  postalCode: {
    pattern: /^\d{5}$/,
    example: "10110",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{city} {postalCode}",
  ],
};
