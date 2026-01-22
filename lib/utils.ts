import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine and merge class name values into a single Tailwind-compatible class string.
 *
 * @param inputs - Class name values (strings, arrays, objects, etc.) to be combined
 * @returns The resulting class string with Tailwind class conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * Format a number as a localized currency string.
 *
 * @param value - The numeric amount to format.
 * @param currency - ISO 4217 currency code (e.g., "USD"); defaults to "usd".
 * @param locale - BCP 47 language tag for localization (e.g., "en-US"); defaults to "en-US".
 * @returns The formatted currency string according to the specified locale and currency.
 */
export function formatCurrency(
  value: number,
  currency: string = "usd",
  locale: string = "en-US"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}