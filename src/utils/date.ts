import { SITE } from "@/consts";

// Frontmatter dates parse as UTC midnight; format in UTC so they don't shift a day west of it.

/** e.g. "Jun 2026" */
export function monthYear(date: Date): string {
  return date.toLocaleDateString(SITE.locale, { month: "short", year: "numeric", timeZone: "UTC" });
}

/** e.g. "12 June 2026" */
export function longDate(date: Date): string {
  return date.toLocaleDateString(SITE.locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** ISO date for <time datetime> */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
