/**
 * formatOdds — Pure function, no Angular dependencies.
 * Formats decimal odds for display in odds rows and match cards.
 */
export function formatOdds(
  value: number,
  format: 'decimal' | 'fractional' = 'decimal',
): string {
  if (value < 1.0) {
    throw new RangeError(`Odds value must be ≥ 1.0, received ${value}`);
  }

  if (format === 'decimal') {
    return value.toFixed(2);
  }

  // Fractional: convert decimal odds to fractional representation
  // e.g. 1.85 → "17/20", 4.00 → "3/1"
  const numerator = value - 1;
  const denominator = 1;
  const precision = 100;
  const n = Math.round(numerator * precision);
  const d = precision * denominator;
  const gcd = greatestCommonDivisor(n, d);
  return `${n / gcd}/${d / gcd}`;
}

function greatestCommonDivisor(a: number, b: number): number {
  return b === 0 ? a : greatestCommonDivisor(b, a % b);
}
