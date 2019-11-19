import { hasKey, hasOwnKey, hasAnyKey, hasAnyOwnKey } from '~/index';
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

describe(`hasAnyKey`, () => {
  describe(`without kind`, () => {
    test(`false for primitives`, () => {
      expect(hasAnyKey(undefined, ['foo'])).toBe(false);
      expect(hasAnyKey(null, ['foo'])).toBe(false);
      expect(hasAnyKey(false, ['foo'])).toBe(false);
      expect(hasAnyKey('', ['foo'])).toBe(false);
      expect(hasAnyKey('foo', ['foo'])).toBe(false);
      expect(hasAnyKey(0, ['foo'])).toBe(false);
      expect(hasAnyKey(10, ['foo'])).toBe(false);
    });
    test(`false for non existing properties`, () => {
      expect(hasAnyKey(source, ['foo'])).toBe(false);
      expect(hasAnyKey(inherited, ['foo'])).toBe(false);
    });
    test(`succeeds for existing defined properties`, () => {
      expect(hasAnyKey(source, ['undefined'])).toBe(false);
      expect(hasAnyKey(inherited, ['undefined'])).toBe(false);
      expect(hasAnyKey(source, defined)).toBe(true);
      expect(hasAnyKey(inherited, defined)).toBe(true);
    });
  });
  describe(`with kind`, () => {
    test(`false for primitives`, () => {
      expect(hasAnyKey(undefined, ['foo'])).toBe(false);
      expect(hasAnyKey(null, ['foo'])).toBe(false);
      expect(hasAnyKey(false, ['foo'])).toBe(false);
      expect(hasAnyKey('', ['foo'])).toBe(false);
      expect(hasAnyKey('foo', ['foo'])).toBe(false);
      expect(hasAnyKey(0, ['foo'])).toBe(false);
      expect(hasAnyKey(10, ['foo'])).toBe(false);
    });
    test(`false for non existing properties`, () => {
      for (const kind of defined) {
        expect(hasAnyKey(source, ['foo'], kind)).toBe(false);
        expect(hasAnyKey(inherited, ['foo'], kind)).toBe(false);
      }
    });
    test(`succeeds for existing defined properties`, () => {
      for (const key of defined) {
        expect(hasAnyKey(source, ['undefined'], key)).toBe(false);
        expect(hasAnyKey(inherited, ['undefined'], key)).toBe(false);
        expect(hasAnyKey(source, defined, key)).toBe(true);
        expect(hasAnyKey(inherited, defined, key)).toBe(true);
      }
    });
  });
});

describe(`hasAnyOwnKey`, () => {
  describe(`without kind`, () => {
    test(`false for primitives`, () => {
      expect(hasAnyOwnKey(undefined, ['foo'])).toBe(false);
      expect(hasAnyOwnKey(null, ['foo'])).toBe(false);
      expect(hasAnyOwnKey(false, ['foo'])).toBe(false);
      expect(hasAnyOwnKey('', ['foo'])).toBe(false);
      expect(hasAnyOwnKey('foo', ['foo'])).toBe(false);
      expect(hasAnyOwnKey(0, ['foo'])).toBe(false);
      expect(hasAnyOwnKey(10, ['foo'])).toBe(false);
    });
    test(`false for non existing properties`, () => {
      expect(hasAnyOwnKey(source, ['foo'])).toBe(false);
      expect(hasAnyOwnKey(inherited, ['foo'])).toBe(false);
    });
    test(`succeeds for existing defined properties`, () => {
      expect(hasAnyOwnKey(source, ['undefined'])).toBe(false);
      expect(hasAnyOwnKey(inherited, ['undefined'])).toBe(false);
      expect(hasAnyOwnKey(source, defined)).toBe(true);
      expect(hasAnyOwnKey(inherited, defined)).toBe(false);
    });
  });
  describe(`with kind`, () => {
    test(`false for primitives`, () => {
      expect(hasAnyOwnKey(undefined, ['foo'])).toBe(false);
      expect(hasAnyOwnKey(null, ['foo'])).toBe(false);
      expect(hasAnyOwnKey(false, ['foo'])).toBe(false);
      expect(hasAnyOwnKey('', ['foo'])).toBe(false);
      expect(hasAnyOwnKey('foo', ['foo'])).toBe(false);
      expect(hasAnyOwnKey(0, ['foo'])).toBe(false);
      expect(hasAnyOwnKey(10, ['foo'])).toBe(false);
    });
    test(`false for non existing properties`, () => {
      for (const kind of defined) {
        expect(hasAnyOwnKey(source, ['foo'], kind)).toBe(false);
        expect(hasAnyOwnKey(inherited, ['foo'], kind)).toBe(false);
      }
    });
    test(`succeeds for existing defined properties`, () => {
      for (const key of defined) {
        expect(hasAnyOwnKey(source, ['undefined'], key)).toBe(false);
        expect(hasAnyOwnKey(inherited, ['undefined'], key)).toBe(false);
        expect(hasAnyOwnKey(source, defined, key)).toBe(true);
        expect(hasAnyOwnKey(inherited, defined, key)).toBe(false);
      }
    });
  });
});
