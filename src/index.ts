/**
 * @module Aslug
 */

export interface IOpts {
  target?: RegExp;
  separation?: string;
  trim?: boolean;
  replace?: (char: string) => string;
}

export default function aslug(
  str: string,
  {
    target = /[^a-zA-Z0-9]/,
    separation = '_',
    trim = false,
    replace = (char) => String(char.charCodeAt(0))
  }: IOpts = {}
): string {
  const joinStr = trim ? separation : '';
  const getCharStr = trim
    ? (char: string) => replace(char)
    : (char: string) => separation + replace(char) + separation;

  function runSlug(arr: string[], last: string): string {
    if (!last) return arr.join(joinStr);

    const index = last.search(target);
    if (index === -1) return arr.concat(last).join(joinStr);

    const a = last.slice(0, index);
    const b = last.slice(index, index + 1);
    const c = last.slice(index + 1);

    if (a) arr.push(a);
    arr.push(getCharStr(b));
    return runSlug(arr, c);
  }

  return runSlug([], str);
}
