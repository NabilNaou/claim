/**
 * Local ISO date.
 * @returns 
 */
export function getTodayIsoLocal(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}
