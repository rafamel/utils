export interface Options {
  /**
   * Alphabet of characters to use to encode the payload. Default: `'123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-'`
   */
  alphabet: string;
  /**
   * String that separates the processed original string from the payload. It **must** match `target`. Default: `'~'`
   */
  separator: string;
  /**
   * Optional regular expression for the characters to replace. Defaults to matching all characters not in `alphabet`.
   */
  target: RegExp;
  /**
   * Maps the replaced characters with any string not matching `target` -otherwise an empty string. Defaults to replacing characters for their *ASCII* equivalent.
   */
  map: (char: string) => string;
}
