import unidecode from 'unidecode';
import basex from 'base-x';
import escape from './escape';
import encode from './encode';
import decode from './decode';
import { Options } from './types';
import { ALPHABET, SEPARATOR } from './constants';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function aslug(options: Partial<Options> = {}) {
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
    throw Error(`separator must be a single character`);
  }

  /* Additional defaults */
  if (!opts.target) {
    opts.target = new RegExp(`[^${escape(opts.alphabet)}]`);
  }
  opts.map = options.map
    ? (char: string) => {
        const str = (options as Options).map(char);
        return str.search((opts as Options).target) === -1 ? str : '';
      }
    : (char: string) => {
        const str = unidecode(char).replace(/[ _.,;:]/, '-');
        return str.search((opts as Options).target) === -1 ? str : '';
      };

  /* Additional safety checks */
  if (
    (options.separator || options.target) &&
    opts.separator.search(opts.target)
  ) {
    throw Error(`Separator must match target`);
  }

  const base = basex(opts.alphabet);
  return {
    encode: (str: string) => encode(str, base, opts as Options),
    decode: (str: string) => decode(str, base, opts as Options)
  };
}
