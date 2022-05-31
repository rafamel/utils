import { describe, test, expect } from '@jest/globals';

import { safePairs } from '../src/safe-pairs';

const a = { foo: 'foo', bar: 'bar', baz: 'baz' };
const b = { foo: 'baz', bar: 'bar', baz: 'foo', foobar: 'foobaz' };
const c = { foo: 'baz', bar: 'bar', foobar: 'foobaz' };

describe(`defaults`, () => {
  describe(`!fail`, () => {
    test(`true`, () => {
      expect(safePairs(a, b)).toBe(true);
      expect(safePairs(a, b, {})).toBe(true);
    });
    test(`false`, () => {
      expect(safePairs(a, c)).toBe(false);
      expect(safePairs(a, c, {})).toBe(false);
    });
  });
  describe(`fail`, () => {
    test(`succeeds`, () => {
      expect(safePairs(a, b, { fail: true })).toBe(true);
    });
    test(`fails`, () => {
      expect(() => safePairs(a, c, { fail: true })).toThrowError();
    });
  });
});
describe(`bidirectional`, () => {
  describe(`!fail`, () => {
    test(`true`, () => {
      expect(
        safePairs({ ...a, foobar: 'foobar' }, b, { bidirectional: true })
      ).toBe(true);
    });
    test(`false`, () => {
      expect(safePairs(a, b, { bidirectional: true })).toBe(false);
    });
  });
  describe(`fail`, () => {
    test(`succeeds`, () => {
      expect(
        safePairs({ ...a, foobar: 'foobar' }, b, {
          fail: true,
          bidirectional: true
        })
      ).toBe(true);
    });
    test(`fails`, () => {
      expect(() =>
        safePairs(a, b, { fail: true, bidirectional: true })
      ).toThrowError();
    });
  });
});
