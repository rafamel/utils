/* eslint-disable @typescript-eslint/explicit-function-return-type */
import basex, { BaseConverter } from 'base-x';
import unidecode from 'unidecode';

import encode from './encode';
import decode from './decode';
import escape from './escape';
import { Options } from './types';
import { ALPHABET, SEPARATOR } from './constants';

export default function aslug(options?: Partial<Options>) {
  return implementation(options, { basex, encode, decode });
}

export function implementation(
  options: Partial<Options> = {},
  deps: {
    basex: (alphabet: string) => BaseConverter;
    encode: (str: string, base: BaseConverter, options: Options) => string;
    decode: (str: string, base: BaseConverter, options: Options) => string;
  }
) {
  const opts = Object.assign(
    { alphabet: ALPHABET, separator: SEPARATOR },
    options
  );

  /* Safety checks */
  if (options.alphabet) {
    opts.alphabet = options.alphabet
      .split('')
      .filter((x, i, arr) => arr.indexOf(x) === i)
      .join('');
    if (options.alphabet.length >= 255) {
      // Max. allowed by base-x
      opts.alphabet = options.alphabet.slice(0, 254);
    }
  }
  if (options.separator !== undefined && options.separator.length !== 1) {
    throw new Error(`separator must be a single character`);
  }

  /* Additional defaults */
  if (!opts.target) {
    opts.target = new RegExp(`[^${escape(opts.alphabet)}]`);
  }
  opts.map = options.map
    ? (char: string) => {
        const map = (options as Options).map;
        const str = map(char);
        return str.search((opts as Options).target) === -1 ? str : '';
      }
    : (char: string) => {
        const str = unidecode(char).replace(/[ ,.:;_]/, '-');
        return str.search((opts as Options).target) === -1 ? str : '';
      };

  /* Additional safety checks */
  if (
    (options.separator || options.target) &&
    opts.separator.search(opts.target)
  ) {
    throw new Error(`Separator must match target`);
  }

  const base = deps.basex(opts.alphabet);
  return {
    encode: (str: string) => deps.encode(str, base, opts as Options),
    decode: (str: string) => deps.decode(str, base, opts as Options)
  };
}
