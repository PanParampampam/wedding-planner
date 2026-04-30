export const formatMoney = (value: number | null, currencyCode?: string): string => {
  if (value === null) return "-";
  return new Intl.NumberFormat("de-DE", {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    style: currencyCode ? "currency" : "decimal",
    currency: currencyCode,
  }).format(value);
};
