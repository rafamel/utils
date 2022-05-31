import { jest, describe, test, expect } from '@jest/globals';
import { BaseConverter } from 'base-x';

import { implementation } from '../src/aslug';
import { Options } from '../src/types';
import { ALPHABET } from '../src/constants';

interface Mocking {
  basexResult: any;
  basex: any;
  encode: any;
  decode: any;
  aslug: any;
}

function create(): Mocking {
  const basexResult = {};
  const basex = jest.fn(() => basexResult as BaseConverter);
  const encode = jest.fn((str: string) => str + 'bar');
  const decode = jest.fn((str: string) => str + 'baz');
  return {
    basexResult,
    basex,
    encode,
    decode,
    aslug: (options?: Partial<Options>) => {
      return implementation(options, { basex, encode, decode });
    }
  };
}

function run(
  doAlphabet: boolean,
  doSeparator: boolean,
  doTarget: boolean,
  doMap: boolean,
  opts?: Partial<Options>
): Mocking {
  const { aslug, basex, encode, decode, basexResult } = create();
  const clone = { ...opts };
  const a = aslug(opts);
  expect(opts || {}).toEqual(clone);
  expect(a).toHaveProperty('encode');
  expect(a).toHaveProperty('decode');
  expect(a.encode('foo')).toBe('foobar');
  expect(a.decode('foo')).toBe('foobaz');

  expect(basex).toHaveBeenCalledTimes(1);
  if (doAlphabet) expect(basex).toHaveBeenCalledWith(ALPHABET);

  for (const fn of [encode, decode]) {
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn.mock.calls[0][0]).toBe('foo');
    expect((fn.mock.calls[0] as any)[1]).toBe(basexResult);

    const opts = (fn.mock.calls[0] as any)[2];
    expect(typeof opts).toBe('object');
    if (doAlphabet) expect(opts.alphabet).toBe(ALPHABET);
    if (doSeparator) expect(opts.separator).toBe('~');
    if (doTarget) {
      expect(opts.target.toString()).toBe(`/[^${ALPHABET.slice(0, -1)}\\-]/`);
    }

    if (doMap) {
      const map = opts.map;
      expect(typeof map).toBe('function');

      const pairs = [
        ['a', 'a'],
        ['á', 'a'],
        ['$', ''],
        ['-', '-'],
        [' ', '-'],
        ['_', '-'],
        ['.', '-'],
        [',', '-'],
        [';', '-'],
        [':', '-'],
        ['\n', '']
      ];

      for (const pair of pairs) {
        expect(map(pair[0])).toBe(pair[1]);
      }
    }
  }

  return { aslug, basex, encode, decode, basexResult };
}

describe(`options`, () => {
  test(`w/ defaults`, () => {
    run(true, true, true, true);
    run(true, true, true, true, {});
  });
  test(`w/ alphabet`, () => {
    const alphabet = 'abcdefgh-';
    const { basex, encode } = run(false, true, false, true, { alphabet });

    expect(basex).toHaveBeenCalledWith(alphabet);
    expect(encode.mock.calls[0][2].target.toString()).toBe(
      `/[^${alphabet.slice(0, -1)}\\-]/`
    );
    expect(encode.mock.calls[0][2].alphabet).toBe(alphabet);
    expect(encode.mock.calls[0][2].map('j')).toBe('');
  });
  test(`w/ separator`, () => {
    const { encode } = run(true, false, true, true, { separator: '+' });
    expect(encode.mock.calls[0][2].separator).toBe('+');
  });
  test(`w/ target`, () => {
    const { encode } = run(true, true, false, true, { target: /[^a-z-]/ });
    expect(encode.mock.calls[0][2].target.toString()).toBe('/[^a-z-]/');
    expect(encode.mock.calls[0][2].map('A')).toBe('');
  });
  test(`w/ map`, () => {
    const { encode } = run(true, true, true, false, {
      map: (char) => (char === '-' ? '1' : '_')
    });
    expect(encode.mock.calls[0][2].map('-')).toBe('1');
    expect(encode.mock.calls[0][2].map('x')).toBe('');
  });
});
describe(`safety checks`, () => {
  test(`alphabet has unique characters`, () => {
    const { aslug, basex, encode } = create();
    const alphabet = 'abcdefgabcdefg';

    aslug({ alphabet }).encode('');

    expect(basex).toHaveBeenCalledTimes(1);
    expect(basex).toHaveBeenCalledWith('abcdefg');
    expect(encode).toHaveBeenCalledTimes(1);
    expect(encode.mock.calls[0][2].alphabet).toBe('abcdefg');
  });
  test(`alphabet is limited to 255 characters`, () => {
    const { aslug, basex, encode } = create();

    const alphabet = Array.from({ length: 300 })
      .fill(0)
      .map((_, i) => String.fromCodePoint(i))
      .join('');

    aslug({ alphabet }).encode('');

    expect(basex).toHaveBeenCalledTimes(1);
    expect(basex).toHaveBeenCalledWith(alphabet.slice(0, 254));
    expect(encode).toHaveBeenCalledTimes(1);
    expect(encode.mock.calls[0][2].alphabet).toBe(alphabet.slice(0, 254));
  });
  test(`separator must be one character`, () => {
    const { aslug } = create();

    expect(() => aslug({ separator: '' })).toThrowError();
    expect(() => aslug({ separator: '__' })).toThrowError();
    expect(() => aslug({ separator: '_' })).not.toThrowError();
  });
  test(`separator must much target`, () => {
    const { aslug } = create();

    expect(() => aslug({ separator: '-' })).toThrowError();
    expect(() => aslug({ target: /[^~]/ })).toThrowError();
  });
});
