/**
 * formatPercentage — Pure function, no Angular dependencies.
 * Formats a 0–100 numeric value as a percentage string.
 */
export function formatPercentage(value: number, decimals = 1): string {
  const clamped = Math.min(100, Math.max(0, value));
  return `${clamped.toFixed(decimals)}%`;
}
