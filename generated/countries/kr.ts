// Generated file. Do not edit.
import type { Country } from "../../src/countries/types";

export const KR: Country = {
  code: "KR",
  name: "South Korea",
  callingCode: "82",
  currency: "KRW",
  postalCode: {
    pattern: /^\d{5}$/,
    example: "03187",
    required: true,
  },
  subdivision: null,
  localityLines: [
    "{city} {postalCode}",
  ],
};
