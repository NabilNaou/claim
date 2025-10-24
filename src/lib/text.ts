/**
 * Trim whitespaces.
 * @param value - the value to normalize.
 * @returns 
 */
export function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}
