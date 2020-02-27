import { IOfType } from './types';

export interface ISafePairsOpts {
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
export default function safePairs(
  a: IOfType<any>,
  b: IOfType<any>,
  options: ISafePairsOpts = {}
): boolean {
  const aKeys = Object.keys(a);
  for (let key of aKeys) {
    if (!b.hasOwnProperty(key)) {
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
