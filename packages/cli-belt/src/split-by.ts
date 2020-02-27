/**
 * Splits `argv` into two arrays by the first `separator` found. If it's not found, the second array returned will be empty.
 */
export function splitBy(
  argv: string[],
  separator: string = '--'
): [string[], string[]] {
  const separation = argv.indexOf(separator);
  return separation === -1
    ? [argv, []]
    : [argv.slice(0, separation), argv.slice(separation + 1)];
}
