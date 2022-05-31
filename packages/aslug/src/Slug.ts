import unidecode from 'unidecode';

import { Encoder } from './Encoder';
import { decode } from './helpers/decode';
import { encode } from './helpers/encode';
import { escapeStr } from './helpers/escape-str';

export declare namespace Slug {
  interface Options {
    /**
     * String that separates the processed original string from the payload.
     * It **must** match `target`. Default: `'~'`
     */
    separator: string;
    /**
     * Optional regular expression for the characters to replace.
     * Defaults to matching all characters not in `alphabet`.
     */
    target: RegExp;
    /**
     * Maps the replaced characters with any string
     * not matching `target` -otherwise an empty string.
     * Defaults to replacing characters for their *ASCII* equivalent.
     */
    map: (char: string) => string;
  }
}

export class Slug implements Encoder.Type {
  #encoder: Encoder.Type;
  #options: Readonly<Slug.Options>;
  public constructor(
    alphabet?: Encoder.Type | string | null,
    options?: Partial<Slug.Options>
  ) {
    // Assign encoder
    this.#encoder =
      alphabet && typeof alphabet === 'object'
        ? alphabet
        : new Encoder(alphabet);

    // Option values
    const separator =
      typeof options?.separator === 'string' ? options.separator : '~';
    const target =
      options?.target || new RegExp(`[^${escapeStr(this.#encoder.alphabet)}]`);
    const map =
      options?.map?.bind(options) ||
      ((char) => unidecode(char).replace(/[ ,.:;_]/, '-'));

    // Safety Checks
    if (separator.length !== 1) {
      throw new Error(`Separator must be a single character`);
    }
    if (this.#encoder.alphabet.includes(separator)) {
      throw new Error(`Separator must not be in alphabet`);
    }
    if (!target.test(separator)) {
      throw new Error(`Separator must match target`);
    }

    // Assign options
    this.#options = Object.freeze({
      separator,
      target,
      map(char: string): string {
        const str = map(char);
        return target.test(str) ? '' : str;
      }
    });
  }
  public get alphabet(): string {
    return this.#encoder.alphabet;
  }
  public get options(): Readonly<Slug.Options> {
    return this.#options;
  }
  public encode(str: string): string {
    return encode(str, this.#encoder, this.options);
  }
  public decode(str: string): string {
    return decode(str, this.#encoder, this.options);
  }
}
