import { normalizeWhitespace } from "./text";

/** Step 2 */

/**
 * Validates the date, checks if it is not set in the future.
 * @param value - the date value passed in.
 * @param today - the day it is today.
 * @returns
 */
export function validateIncidentDate(value: string, today: string) {
  const isEmpty = !value;
  const isFuture = value > today;
  const hasError = isEmpty || isFuture;
  const message = isEmpty
    ? "Vul een datum in."
    : isFuture
      ? "Datum mag niet in de toekomst liggen."
      : "";
  return { isEmpty, isFuture, hasError, message };
}

/** Step 3 */

/**
 * Normalized IBAN for storage. Uppercase + no spaces.
 * @param raw - the raw IBAN.
 * @returns
 */
export function normalizeIban(raw: string) {
  return raw.replace(/\s+/g, "").toUpperCase();
}

/**
 * For display. Format the iban in a presentable format:
 * uppercase, spacebar every 4 chars. Does not change logic.
 * @param raw - the raw pre transformed string.
 * @returns
 */
export function formatIbanDisplay(raw: string) {
  const compact = normalizeIban(raw);
  return compact.replace(/(.{4})/g, "$1 ").trim();
}

/**
 * For validation. Check if IBAN is: NL + 2 digits + 4 letters
 * + 10 digits.
 * @param raw
 * @returns
 */
export function isValidDutchIban(raw: string) {
  const compact = normalizeIban(raw);
  return /^NL\d{2}[A-Z]{4}\d{10}$/.test(compact);
}

/** Step 4 */

/**
 * Validates the description.
 * Calculates the normalised length, checks if it is too short/long, show message depending.
 * @param raw - the raw description.
 * @param min - the minimum characters of description.
 * @param max - the max amount of characters of description.
 * @returns
 */
export function validateDescription(raw: string, min = 20, max = 500) {
  const normalized = normalizeWhitespace(raw);
  const normalizedLength = normalized.length;
  const tooShort = normalizedLength < min;
  const tooLong = normalizedLength > max;
  const hasError = tooShort || tooLong;
  const message = tooShort
    ? `Schrijf alstublieft iets meer (minimaal ${min} tekens).`
    : tooLong
      ? `Je omschrijving is te lang (maximaal ${max} tekens).`
      : "";
  return { normalized, normalizedLength, tooShort, tooLong, hasError, message };
}
