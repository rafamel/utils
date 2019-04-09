import aslug from '~/aslug';
import _basex from 'base-x';
import _encode from '~/encode';
import _decode from '~/decode';
import { IOptions } from '~/types';
import { ALPHABET } from '~/constants';

const basex: any = _basex;
const encode: any = _encode;
const decode: any = _decode;
jest.mock('base-x');
jest.mock('~/encode');
jest.mock('~/decode');
const bx = {};
basex.mockImplementation(() => bx);
encode.mockImplementation((str: string) => str + 'bar');
decode.mockImplementation((str: string) => str + 'baz');

describe(`options`, () => {
  function run(
    doAlphabet: boolean,
    doSeparator: boolean,
    doTarget: boolean,
    doMap: boolean,
    opts?: Partial<IOptions>
  ): void {
    basex.mockClear();
    encode.mockClear();
    decode.mockClear();

    const a = aslug(opts);
    expect(a).toHaveProperty('encode');
    expect(a).toHaveProperty('decode');
    expect(a.encode('foo')).toBe('foobar');
    expect(a.decode('foo')).toBe('foobaz');

    expect(basex).toHaveBeenCalledTimes(1);
    if (doAlphabet) expect(basex).toHaveBeenCalledWith(ALPHABET);
    [encode, decode].forEach((fn) => {
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn.mock.calls[0][0]).toBe('foo');
      expect(fn.mock.calls[0][1]).toBe(bx);

      const opts = fn.mock.calls[0][2];
      expect(typeof opts).toBe('object');
      if (doAlphabet) expect(opts.alphabet).toBe(ALPHABET);
      if (doSeparator) expect(opts.separator).toBe('~');
      if (doTarget) expect(opts.target.toString()).toBe(`/[^${ALPHABET}]/`);

      if (doMap) {
        const map = opts.map;
        expect(typeof map).toBe('function');
        [
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
        ].forEach((pair) => {
          expect(map(pair[0])).toBe(pair[1]);
        });
      }
    });
  }
  test(`w/ defaults`, () => {
    run(true, true, true, true);
    run(true, true, true, true, {});
  });
  test(`w/ alphabet`, () => {
    const alphabet = 'abcdefgh-';
    run(false, true, false, true, { alphabet });

    expect(basex).toHaveBeenCalledWith(alphabet);
    expect(encode.mock.calls[0][2].target.toString()).toBe(`/[^${alphabet}]/`);
    expect(encode.mock.calls[0][2].alphabet).toBe(alphabet);
    expect(encode.mock.calls[0][2].map('j')).toBe('');
  });
  test(`w/ separator`, () => {
    run(true, false, true, true, { separator: '+' });
    expect(encode.mock.calls[0][2].separator).toBe('+');
  });
  test(`w/ target`, () => {
    run(true, true, false, true, { target: /[^a-z-]/ });
    expect(encode.mock.calls[0][2].target.toString()).toBe('/[^a-z-]/');
    expect(encode.mock.calls[0][2].map('A')).toBe('');
  });
  test(`w/ map`, () => {
    run(true, true, true, false, { map: (char) => (char === '-' ? '1' : '_') });
    expect(encode.mock.calls[0][2].map('-')).toBe('1');
    expect(encode.mock.calls[0][2].map('x')).toBe('');
  });
});
describe(`safety checks`, () => {
  test(`alphabet has unique characters`, () => {
    basex.mockClear();
    encode.mockClear();

    const alphabet = 'abcdefgabcdefg';

    aslug({ alphabet }).encode('');

    expect(basex).toHaveBeenCalledTimes(1);
    expect(basex).toHaveBeenCalledWith('abcdefg');
    expect(encode).toHaveBeenCalledTimes(1);
    expect(encode.mock.calls[0][2].alphabet).toBe('abcdefg');
  });
  test(`alphabet is limited to 255 characters`, () => {
    basex.mockClear();
    encode.mockClear();

    const alphabet = Array(300)
      .fill(0)
      .map((_, i) => String.fromCharCode(i))
      .join('');

    aslug({ alphabet }).encode('');

    expect(basex).toHaveBeenCalledTimes(1);
    expect(basex).toHaveBeenCalledWith(alphabet.slice(0, 254));
    expect(encode).toHaveBeenCalledTimes(1);
    expect(encode.mock.calls[0][2].alphabet).toBe(alphabet.slice(0, 254));
  });
  test(`separator must be one character`, () => {
    expect(() => aslug({ separator: '' })).toThrowError();
    expect(() => aslug({ separator: '__' })).toThrowError();
    expect(() => aslug({ separator: '_' })).not.toThrowError();
  });
  test(`separator must much target`, () => {
    expect(() => aslug({ separator: '-' })).toThrowError();
    expect(() => aslug({ target: /[^~]/ })).toThrowError();
  });
});
