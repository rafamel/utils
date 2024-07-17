import base from 'base-x';

export declare namespace Encoder {
  interface Type {
    readonly alphabet: string;
    encode: (str: string) => string;
    decode: (str: string) => string;
  }
}

const textencoder = new TextEncoder();
const textdecoder = new TextDecoder();

export class Encoder implements Encoder.Type {
  #alphabet: string;
  #converter: base.BaseConverter;
  /**
   * Alphabet of characters to use to encode the payload.
   * Default: `'123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-'`
   * @param alphabet
   */
  public constructor(alphabet?: string | null) {
    // Safety Checks
    if (typeof alphabet === 'string') {
      alphabet = alphabet
        .split('')
        .filter((x, i, arr) => arr.indexOf(x) === i)
        .join('');
      if (alphabet.length >= 255) {
        // Max. allowed by base-x
        alphabet = alphabet.slice(0, 254);
      }
    } else {
      alphabet =
        '0123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-';
    }

    // Assignments
    this.#alphabet = alphabet;
    this.#converter = base(this.#alphabet);
  }
  public get alphabet(): string {
    return this.#alphabet;
  }
  public encode(str: string): string {
    return this.#converter.encode(textencoder.encode(str));
  }
  public decode(str: string): string {
    return textdecoder.decode(this.#converter.decode(str));
  }
}
