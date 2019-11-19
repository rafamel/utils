import { hasKey, hasOwnKey } from '~/index';
import { BasicKind } from '~/definitions';

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
  function: () => {}
};
const inherited = Object.create(source, {});

describe(`hasKey`, () => {
  describe(`without kind`, () => {
    test(`false for primitives`, () => {
      for (const k of ['foo', ['foo']]) {
        expect(hasKey(undefined, k)).toBe(false);
        expect(hasKey(null, k)).toBe(false);
        expect(hasKey(false, k)).toBe(false);
        expect(hasKey('', k)).toBe(false);
        expect(hasKey('foo', k)).toBe(false);
        expect(hasKey(0, k)).toBe(false);
        expect(hasKey(10, k)).toBe(false);
      }
    });
    test(`false for non existing properties`, () => {
      expect(hasKey(source, 'foo')).toBe(false);
      expect(hasKey(inherited, 'foo')).toBe(false);
    });
    test(`succeeds for existing defined properties`, () => {
      expect(hasKey(source, 'undefined')).toBe(false);
      expect(hasKey(inherited, 'undefined')).toBe(false);
      for (const key of defined) {
        expect(hasKey(source, key)).toBe(true);
        expect(hasKey(inherited, key)).toBe(true);
      }
    });
    test(`true for multiple properties`, () => {
      expect(hasKey(source, defined)).toBe(true);
      expect(hasKey(inherited, defined)).toBe(true);
    });
    test(`false for multiple properties`, () => {
      expect(hasKey(source, [...defined, 'foo'])).toBe(false);
      expect(hasKey(inherited, [...defined, 'foo'])).toBe(false);
      expect(hasKey(source, [...defined, 'undefined'])).toBe(false);
      expect(hasKey(inherited, [...defined, 'undefined'])).toBe(false);
    });
  });
  describe(`with kind`, () => {
    test(`false for primitives`, () => {
      for (const k of ['foo', ['foo']]) {
        expect(hasKey(undefined, k, 'null')).toBe(false);
        expect(hasKey(null, k, 'null')).toBe(false);
        expect(hasKey(false, k, 'boolean')).toBe(false);
        expect(hasKey('', k, 'string')).toBe(false);
        expect(hasKey('foo', k, 'string')).toBe(false);
        expect(hasKey(0, k, 'number')).toBe(false);
        expect(hasKey(10, k, 'number')).toBe(false);
      }
    });
    test(`false for non existing properties`, () => {
      for (const kind of defined) {
        expect(hasKey(source, 'foo', kind)).toBe(false);
        expect(hasKey(inherited, 'foo', kind)).toBe(false);
      }
    });
    test(`succeeds for existing defined properties`, () => {
      for (const key of defined) {
        expect(hasKey(source, 'undefined', key)).toBe(false);
        expect(hasKey(inherited, 'undefined', key)).toBe(false);
        expect(hasKey(source, key, key)).toBe(true);
        expect(hasKey(inherited, key, key)).toBe(true);
        for (const kind of defined) {
          if (key === kind) continue;
          expect(hasKey(source, key, kind)).toBe(false);
          expect(hasKey(inherited, key, kind)).toBe(false);
        }
      }
    });
    test(`true for multiple properties`, () => {
      for (const key of defined) {
        const a = { foo: source[key], bar: source[key] };
        const b = Object.create(a, {});
        expect(hasKey(a, ['foo', 'bar'], key)).toBe(true);
        expect(hasKey(b, ['foo', 'bar'], key)).toBe(true);
      }
    });
    test(`false for multiple properties`, () => {
      for (const key of defined) {
        expect(hasKey(source, defined, key)).toBe(false);
        expect(hasKey(inherited, defined, key)).toBe(false);
      }
    });
  });
});

describe(`hasOwnKey`, () => {
  describe(`without kind`, () => {
    test(`false for primitives`, () => {
      for (const k of ['foo', ['foo']]) {
        expect(hasOwnKey(undefined, k)).toBe(false);
        expect(hasOwnKey(null, k)).toBe(false);
        expect(hasOwnKey(false, k)).toBe(false);
        expect(hasOwnKey('', k)).toBe(false);
        expect(hasOwnKey('foo', k)).toBe(false);
        expect(hasOwnKey(0, k)).toBe(false);
        expect(hasOwnKey(10, k)).toBe(false);
      }
    });
    test(`false for non existing properties`, () => {
      expect(hasOwnKey(source, 'foo')).toBe(false);
      expect(hasOwnKey(inherited, 'foo')).toBe(false);
    });
    test(`succeeds for existing defined properties`, () => {
      expect(hasOwnKey(source, 'undefined')).toBe(false);
      expect(hasOwnKey(inherited, 'undefined')).toBe(false);
      for (const key of defined) {
        expect(hasOwnKey(source, key)).toBe(true);
        expect(hasOwnKey(inherited, key)).toBe(false);
      }
    });
    test(`true for multiple properties`, () => {
      expect(hasOwnKey(source, defined)).toBe(true);
      expect(hasOwnKey(inherited, defined)).toBe(false);
    });
    test(`false for multiple properties`, () => {
      expect(hasOwnKey(source, [...defined, 'foo'])).toBe(false);
      expect(hasOwnKey(inherited, [...defined, 'foo'])).toBe(false);
      expect(hasOwnKey(source, [...defined, 'undefined'])).toBe(false);
      expect(hasOwnKey(inherited, [...defined, 'undefined'])).toBe(false);
    });
  });
  describe(`with kind`, () => {
    test(`false for primitives`, () => {
      for (const k of ['foo', ['foo']]) {
        expect(hasOwnKey(undefined, k, 'null')).toBe(false);
        expect(hasOwnKey(null, k, 'null')).toBe(false);
        expect(hasOwnKey(false, k, 'boolean')).toBe(false);
        expect(hasOwnKey('', k, 'string')).toBe(false);
        expect(hasOwnKey('foo', k, 'string')).toBe(false);
        expect(hasOwnKey(0, k, 'number')).toBe(false);
        expect(hasOwnKey(10, k, 'number')).toBe(false);
      }
    });
    test(`false for non existing properties`, () => {
      for (const kind of defined) {
        expect(hasOwnKey(source, 'foo', kind)).toBe(false);
        expect(hasOwnKey(inherited, 'foo', kind)).toBe(false);
      }
    });
    test(`succeeds for existing defined properties`, () => {
      for (const key of defined) {
        expect(hasOwnKey(source, 'undefined', key)).toBe(false);
        expect(hasOwnKey(inherited, 'undefined', key)).toBe(false);
        expect(hasOwnKey(source, key, key)).toBe(true);
        expect(hasOwnKey(inherited, key, key)).toBe(false);
        for (const kind of defined) {
          if (key === kind) continue;
          expect(hasOwnKey(source, key, kind)).toBe(false);
          expect(hasOwnKey(inherited, key, kind)).toBe(false);
        }
      }
    });
    test(`true for multiple properties`, () => {
      for (const key of defined) {
        const a = { foo: source[key], bar: source[key] };
        const b = Object.create(a, {});
        expect(hasOwnKey(a, ['foo', 'bar'], key)).toBe(true);
        expect(hasOwnKey(b, ['foo', 'bar'], key)).toBe(false);
      }
    });
    test(`false for multiple properties`, () => {
      for (const key of defined) {
        expect(hasOwnKey(source, defined, key)).toBe(false);
        expect(hasOwnKey(inherited, defined, key)).toBe(false);
      }
    });
  });
});
