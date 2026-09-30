import getReadingTime from "reading-time";

/** e.g. "4 min read", computed from a post's raw Markdown body at build time. */
export function minutesRead(markdown: string): string {
  return getReadingTime(markdown).text;
}
