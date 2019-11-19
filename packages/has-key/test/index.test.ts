import { hasKey } from '~/index';
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
