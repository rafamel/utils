/* eslint-disable object-shorthand */
import { describe, expect, test } from 'vitest';

import type { BasicKind } from '../src/definitions';
import {
  containsAnyKey,
  containsAnyOwnKey,
  containsKey,
  containsOwnKey
} from '../src';

const defined: BasicKind[] = [
  'null',
  'boolean',
  'number',
  'string',
  'object',
  'array',
  'symbol',
  'function'
];
const source = {
  undefined: undefined,
  null: null,
  boolean: false,
  number: 0,
  string: 'str',
  object: {},
  array: [],
  symbol: Symbol('symbol'),
  function: () => undefined
};
const inherited = Object.create(source, {});

describe(`containsKey`, () => {
  describe(`without kind`, () => {
    test(`false for primitives`, () => {
      for (const k of ['foo', ['foo']]) {
        expect(containsKey(undefined, k)).toBe(false);
        expect(containsKey(null, k)).toBe(false);
        expect(containsKey(false, k)).toBe(false);
        expect(containsKey('', k)).toBe(false);
        expect(containsKey('foo', k)).toBe(false);
        expect(containsKey(0, k)).toBe(false);
        expect(containsKey(10, k)).toBe(false);
      }
    });
    test(`false for non existing properties`, () => {
      expect(containsKey(source, 'foo')).toBe(false);
      expect(containsKey(inherited, 'foo')).toBe(false);
    });
    test(`succeeds for existing defined properties`, () => {
      expect(containsKey(source, 'undefined')).toBe(false);
      expect(containsKey(inherited, 'undefined')).toBe(false);
      for (const key of defined) {
        expect(containsKey(source, key)).toBe(true);
        expect(containsKey(inherited, key)).toBe(true);
      }
    });
    test(`true for multiple properties`, () => {
      expect(containsKey(source, defined)).toBe(true);
      expect(containsKey(inherited, defined)).toBe(true);
    });
    test(`false for multiple properties`, () => {
      expect(containsKey(source, [...defined, 'foo'])).toBe(false);
      expect(containsKey(inherited, [...defined, 'foo'])).toBe(false);
      expect(containsKey(source, [...defined, 'undefined'])).toBe(false);
      expect(containsKey(inherited, [...defined, 'undefined'])).toBe(false);
    });
  });
  describe(`with kind`, () => {
    test(`false for primitives`, () => {
      for (const k of ['foo', ['foo']]) {
        expect(containsKey(undefined, k, 'null')).toBe(false);
        expect(containsKey(null, k, 'null')).toBe(false);
        expect(containsKey(false, k, 'boolean')).toBe(false);
        expect(containsKey('', k, 'string')).toBe(false);
        expect(containsKey('foo', k, 'string')).toBe(false);
        expect(containsKey(0, k, 'number')).toBe(false);
        expect(containsKey(10, k, 'number')).toBe(false);
      }
    });
    test(`false for non existing properties`, () => {
      for (const kind of defined) {
        expect(containsKey(source, 'foo', kind)).toBe(false);
        expect(containsKey(inherited, 'foo', kind)).toBe(false);
      }
    });
    test(`succeeds for existing defined properties`, () => {
      for (const key of defined) {
        expect(containsKey(source, 'undefined', key)).toBe(false);
        expect(containsKey(inherited, 'undefined', key)).toBe(false);
        expect(containsKey(source, key, key)).toBe(true);
        expect(containsKey(inherited, key, key)).toBe(true);
        for (const kind of defined) {
          if (key === kind) continue;
          expect(containsKey(source, key, kind)).toBe(false);
          expect(containsKey(inherited, key, kind)).toBe(false);
        }
      }
    });
    test(`true for multiple properties`, () => {
      for (const key of defined) {
        const a = { foo: source[key], bar: source[key] };
        const b = Object.create(a, {});
        expect(containsKey(a, ['foo', 'bar'], key)).toBe(true);
        expect(containsKey(b, ['foo', 'bar'], key)).toBe(true);
      }
    });
    test(`false for multiple properties`, () => {
      for (const key of defined) {
        expect(containsKey(source, defined, key)).toBe(false);
        expect(containsKey(inherited, defined, key)).toBe(false);
      }
    });
  });
});

describe(`containsOwnKey`, () => {
  describe(`without kind`, () => {
    test(`false for primitives`, () => {
      for (const k of ['foo', ['foo']]) {
        expect(containsOwnKey(undefined, k)).toBe(false);
        expect(containsOwnKey(null, k)).toBe(false);
        expect(containsOwnKey(false, k)).toBe(false);
        expect(containsOwnKey('', k)).toBe(false);
        expect(containsOwnKey('foo', k)).toBe(false);
        expect(containsOwnKey(0, k)).toBe(false);
        expect(containsOwnKey(10, k)).toBe(false);
      }
    });
    test(`false for non existing properties`, () => {
      expect(containsOwnKey(source, 'foo')).toBe(false);
      expect(containsOwnKey(inherited, 'foo')).toBe(false);
    });
    test(`succeeds for existing defined properties`, () => {
      expect(containsOwnKey(source, 'undefined')).toBe(false);
      expect(containsOwnKey(inherited, 'undefined')).toBe(false);
      for (const key of defined) {
        expect(containsOwnKey(source, key)).toBe(true);
        expect(containsOwnKey(inherited, key)).toBe(false);
      }
    });
    test(`true for multiple properties`, () => {
      expect(containsOwnKey(source, defined)).toBe(true);
      expect(containsOwnKey(inherited, defined)).toBe(false);
    });
    test(`false for multiple properties`, () => {
      expect(containsOwnKey(source, [...defined, 'foo'])).toBe(false);
      expect(containsOwnKey(inherited, [...defined, 'foo'])).toBe(false);
      expect(containsOwnKey(source, [...defined, 'undefined'])).toBe(false);
      expect(containsOwnKey(inherited, [...defined, 'undefined'])).toBe(false);
    });
  });
  describe(`with kind`, () => {
    test(`false for primitives`, () => {
      for (const k of ['foo', ['foo']]) {
        expect(containsOwnKey(undefined, k, 'null')).toBe(false);
        expect(containsOwnKey(null, k, 'null')).toBe(false);
        expect(containsOwnKey(false, k, 'boolean')).toBe(false);
        expect(containsOwnKey('', k, 'string')).toBe(false);
        expect(containsOwnKey('foo', k, 'string')).toBe(false);
        expect(containsOwnKey(0, k, 'number')).toBe(false);
        expect(containsOwnKey(10, k, 'number')).toBe(false);
      }
    });
    test(`false for non existing properties`, () => {
      for (const kind of defined) {
        expect(containsOwnKey(source, 'foo', kind)).toBe(false);
        expect(containsOwnKey(inherited, 'foo', kind)).toBe(false);
      }
    });
    test(`succeeds for existing defined properties`, () => {
      for (const key of defined) {
        expect(containsOwnKey(source, 'undefined', key)).toBe(false);
        expect(containsOwnKey(inherited, 'undefined', key)).toBe(false);
        expect(containsOwnKey(source, key, key)).toBe(true);
        expect(containsOwnKey(inherited, key, key)).toBe(false);
        for (const kind of defined) {
          if (key === kind) continue;
          expect(containsOwnKey(source, key, kind)).toBe(false);
          expect(containsOwnKey(inherited, key, kind)).toBe(false);
        }
      }
    });
    test(`true for multiple properties`, () => {
      for (const key of defined) {
        const a = { foo: source[key], bar: source[key] };
        const b = Object.create(a, {});
        expect(containsOwnKey(a, ['foo', 'bar'], key)).toBe(true);
        expect(containsOwnKey(b, ['foo', 'bar'], key)).toBe(false);
      }
    });
    test(`false for multiple properties`, () => {
      for (const key of defined) {
        expect(containsOwnKey(source, defined, key)).toBe(false);
        expect(containsOwnKey(inherited, defined, key)).toBe(false);
      }
    });
  });
});

describe(`containsAnyKey`, () => {
  describe(`without kind`, () => {
    test(`false for primitives`, () => {
      expect(containsAnyKey(undefined, ['foo'])).toBe(false);
      expect(containsAnyKey(null, ['foo'])).toBe(false);
      expect(containsAnyKey(false, ['foo'])).toBe(false);
      expect(containsAnyKey('', ['foo'])).toBe(false);
      expect(containsAnyKey('foo', ['foo'])).toBe(false);
      expect(containsAnyKey(0, ['foo'])).toBe(false);
      expect(containsAnyKey(10, ['foo'])).toBe(false);
    });
    test(`false for non existing properties`, () => {
      expect(containsAnyKey(source, ['foo'])).toBe(false);
      expect(containsAnyKey(inherited, ['foo'])).toBe(false);
    });
    test(`succeeds for existing defined properties`, () => {
      expect(containsAnyKey(source, ['undefined'])).toBe(false);
      expect(containsAnyKey(inherited, ['undefined'])).toBe(false);
      expect(containsAnyKey(source, defined)).toBe(true);
      expect(containsAnyKey(inherited, defined)).toBe(true);
    });
  });
  describe(`with kind`, () => {
    test(`false for primitives`, () => {
      expect(containsAnyKey(undefined, ['foo'])).toBe(false);
      expect(containsAnyKey(null, ['foo'])).toBe(false);
      expect(containsAnyKey(false, ['foo'])).toBe(false);
      expect(containsAnyKey('', ['foo'])).toBe(false);
      expect(containsAnyKey('foo', ['foo'])).toBe(false);
      expect(containsAnyKey(0, ['foo'])).toBe(false);
      expect(containsAnyKey(10, ['foo'])).toBe(false);
    });
    test(`false for non existing properties`, () => {
      for (const kind of defined) {
        expect(containsAnyKey(source, ['foo'], kind)).toBe(false);
        expect(containsAnyKey(inherited, ['foo'], kind)).toBe(false);
      }
    });
    test(`succeeds for existing defined properties`, () => {
      for (const key of defined) {
        expect(containsAnyKey(source, ['undefined'], key)).toBe(false);
        expect(containsAnyKey(inherited, ['undefined'], key)).toBe(false);
        expect(containsAnyKey(source, defined, key)).toBe(true);
        expect(containsAnyKey(inherited, defined, key)).toBe(true);
      }
    });
  });
});

describe(`containsAnyOwnKey`, () => {
  describe(`without kind`, () => {
    test(`false for primitives`, () => {
      expect(containsAnyOwnKey(undefined, ['foo'])).toBe(false);
      expect(containsAnyOwnKey(null, ['foo'])).toBe(false);
      expect(containsAnyOwnKey(false, ['foo'])).toBe(false);
      expect(containsAnyOwnKey('', ['foo'])).toBe(false);
      expect(containsAnyOwnKey('foo', ['foo'])).toBe(false);
      expect(containsAnyOwnKey(0, ['foo'])).toBe(false);
      expect(containsAnyOwnKey(10, ['foo'])).toBe(false);
    });
    test(`false for non existing properties`, () => {
      expect(containsAnyOwnKey(source, ['foo'])).toBe(false);
      expect(containsAnyOwnKey(inherited, ['foo'])).toBe(false);
    });
    test(`succeeds for existing defined properties`, () => {
      expect(containsAnyOwnKey(source, ['undefined'])).toBe(false);
      expect(containsAnyOwnKey(inherited, ['undefined'])).toBe(false);
      expect(containsAnyOwnKey(source, defined)).toBe(true);
      expect(containsAnyOwnKey(inherited, defined)).toBe(false);
    });
  });
  describe(`with kind`, () => {
    test(`false for primitives`, () => {
      expect(containsAnyOwnKey(undefined, ['foo'])).toBe(false);
      expect(containsAnyOwnKey(null, ['foo'])).toBe(false);
      expect(containsAnyOwnKey(false, ['foo'])).toBe(false);
      expect(containsAnyOwnKey('', ['foo'])).toBe(false);
      expect(containsAnyOwnKey('foo', ['foo'])).toBe(false);
      expect(containsAnyOwnKey(0, ['foo'])).toBe(false);
      expect(containsAnyOwnKey(10, ['foo'])).toBe(false);
    });
    test(`false for non existing properties`, () => {
      for (const kind of defined) {
        expect(containsAnyOwnKey(source, ['foo'], kind)).toBe(false);
        expect(containsAnyOwnKey(inherited, ['foo'], kind)).toBe(false);
      }
    });
    test(`succeeds for existing defined properties`, () => {
      for (const key of defined) {
        expect(containsAnyOwnKey(source, ['undefined'], key)).toBe(false);
        expect(containsAnyOwnKey(inherited, ['undefined'], key)).toBe(false);
        expect(containsAnyOwnKey(source, defined, key)).toBe(true);
        expect(containsAnyOwnKey(inherited, defined, key)).toBe(false);
      }
    });
  });
});
