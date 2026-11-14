import { getCountry, isCountryCode } from "../countries/registry";
import { isValidPostalCode } from "./postal-code";
import type { Address, AddressError } from "./types";

const isBlank = (value: string | undefined) => !value || value.trim() === "";

export function validateAddress(address: Address): AddressError[] {
  if (!isCountryCode(address.country.trim().toUpperCase())) {
    return [{ field: "country", message: "unknown country" }];
  }
  const country = getCountry(address.country);
  const errors: AddressError[] = [];
  if (isBlank(address.name))
    errors.push({ field: "name", message: "name is required" });
  if (isBlank(address.line1)) {
    errors.push({ field: "line1", message: "street address is required" });
  }
  if (isBlank(address.city))
    errors.push({ field: "city", message: "city is required" });
  if (country.subdivision?.required && isBlank(address.subdivision)) {
    errors.push({
      field: "subdivision",
      message: `${country.subdivision.label.toLowerCase()} is required`,
    });
  }
  const rule = country.postalCode;
  if (rule) {
    if (isBlank(address.postalCode)) {
      if (rule.required) {
        errors.push({
          field: "postalCode",
          message: "postal code is required",
        });
      }
    } else if (!isValidPostalCode(country.code, address.postalCode ?? "")) {
      errors.push({
        field: "postalCode",
        message: `postal code should look like ${rule.example}`,
      });
    }
  }
  return errors;
}
