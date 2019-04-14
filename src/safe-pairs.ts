import { IOfType } from './types';

/**
 * Ensures all properties of `a` exist in `b` -and optionally, also vice versa. Returns `true` if they do.
 *
 * `options`:
 *  - `fail`: if `true`, it will throw on fail.
 *  - `bidirectional`: if `true`, it will also check all properties of `b` exist in `a`.
 */
export default function safePairs(
  a: IOfType<any>,
  b: IOfType<any>,
  options: { fail?: boolean; bidirectional?: boolean } = {}
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
