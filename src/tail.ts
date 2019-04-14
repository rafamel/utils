/**
 * Normalizes suffixed spaces. Given an `arr` array of strings and a number of `spaces`, returns a function that, for a given string, will return that string with the spaces needed to match the number of spaces for the longest string in the array, as a suffix.
 */
export default function tail(
  arr: string[],
  spaces: number = 8
): (str: string) => string {
  const longest = arr.sort((a, b) => b.length - a.length)[0];
  return function being(str: string): string {
    return (
      str +
      ' '.repeat(
        Math.max(1, (longest ? longest.length - str.length : 0) + spaces)
      )
    );
  };
}
