export interface SafePairsOptions {
  /**
   * If `true`, `safePairs` will throw on fail. Default: `false`.
   */
  fail?: boolean;
  /**
   * If `true`, `safePairs` will also check all properties of `b` exist in `a`. Default: `false`.
   */
  bidirectional?: boolean;
}

/**
 * Ensures all properties of `a` exist in `b` -and optionally, also vice versa. Returns `true` if they do.
 */
export function safePairs(
  a: Record<string, any>,
  b: Record<string, any>,
  options: SafePairsOptions = {}
): boolean {
  const aKeys = Object.keys(a);
  for (const key of aKeys) {
    if (!Object.hasOwnProperty.call(b, key)) {
      if (options.fail) {
        throw Error(`Second pair element doesn't reproduce keys`);
      } else {
        return false;
      }
    }
  }

  if (options.bidirectional) {
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      if (options.fail) {
        throw Error(`Second pair element doesn't reproduce keys`);
      } else {
        return false;
      }
    }
  }

  return true;
}
