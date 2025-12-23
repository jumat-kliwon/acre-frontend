export function formatCurrency(value: number, locale: string = "id-ID"): string {
  if (isNaN(value)) return "0";

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export const toTitleCase = (str: string) => {
  return str
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};