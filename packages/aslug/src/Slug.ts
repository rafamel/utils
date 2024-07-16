import unidecode from 'unidecode';

import { Encoder } from './Encoder';
import { decode } from './helpers/decode';
import { encode } from './helpers/encode';
import { escapeStr } from './helpers/escape-str';

export declare namespace Slug {
  interface Options {
    /**
     * String that separates the processed original string from the payload.
     * It **must not** be in `alphabet`. Default: `'.'`
     */
    separator: string;
    /**
     * Maps the replaced characters with a string
     * within `alphabet` -otherwise an empty string.
     * Defaults to replacing characters for
     * ASCII equivalent, if in `alphabet`.
     */
    map: (char: string) => string;
  }
}

export class Slug implements Encoder.Type {
  #encoder: Encoder.Type;
  #target: RegExp;
  #options: Readonly<Slug.Options>;
  public constructor(
    alphabet?: Encoder.Type | string | null,
    options?: Partial<Slug.Options>
  ) {
    // Assign target and encoder
    this.#encoder =
      alphabet && typeof alphabet === 'object'
        ? alphabet
        : new Encoder(alphabet);
    this.#target = new RegExp(`[^${escapeStr(this.#encoder.alphabet)}]`);

    // Option values
    const separator =
      typeof options?.separator === 'string' ? options.separator : '.';
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

    // Assign options
    this.#options = Object.freeze({
      separator,
      map: (char: string): string => {
        const str = map(char);
        return this.#target.test(str) ? '' : str;
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
    return encode(str, this.#encoder, this.#target, this.options);
  }
  public decode(str: string): string {
    return decode(str, this.#encoder, this.options);
  }
}
