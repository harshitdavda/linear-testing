export type CsvValue = string | number | undefined;

export type CsvColumn<T> = { header: string; value: (row: T) => CsvValue };

const NEEDS_QUOTES = /[",\r\n]|^\s|\s$/;

export function escapeCsvField(value: CsvValue): string {
  if (value === undefined) return "";
  const text = String(value);
  return NEEDS_QUOTES.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function toCsv<T>(
  rows: readonly T[],
  columns: readonly CsvColumn<T>[],
): string {
  const lines = [columns.map((c) => escapeCsvField(c.header)).join(",")];
  for (const row of rows) {
    lines.push(columns.map((c) => escapeCsvField(c.value(row))).join(","));
  }
  return `${lines.join("\r\n")}\r\n`;
}
