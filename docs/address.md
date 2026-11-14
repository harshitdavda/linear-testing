# Addresses

Address rules for each country live in `generated/countries` (see the [country list](countries.md)). Do not edit those files by hand.

## Postal codes

`normalizePostalCode(country, value)` cleans up what shoppers type:

- Uppercases and collapses spaces: `ec1a   1bb` → `EC1A 1BB`.
- Adds the separator the country expects when it is missing: `1012js` → `1012 JS`, `1000001` → `100-0001`.
- Leaves already-valid codes alone, so a US ZIP stays `94103` and a ZIP+4 becomes `94103-1234`.
- Returns the cleaned value unchanged when it can't be made valid, so validation can show the error.

## Validation

`validateAddress(address)` returns a list of `{ field, message }` errors:

- Name, street and city are always required.
- State, province or prefecture is required in countries that need it (US, Canada, Mexico, Brazil, Argentina, Italy, India, China, Japan, Malaysia, Australia, UAE).
- Postal codes are checked against the country's pattern. They are optional in Ireland and Nigeria, and not used in Hong Kong or the UAE.
- An unknown country returns only that error.

## Formatting

`formatAddress(address, fromCountry?)` lays the address out the way that country's post expects, for example postal code before the city in most of Europe, and city, state and ZIP on one line in the US. The country name is added in capitals on the last line unless `fromCountry` is the same country. Empty parts and the commas or dashes around them are dropped.
