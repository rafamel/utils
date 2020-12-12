import { Operate } from '../src/Operate';
import assert from 'assert';

test(`Operate.fallback`, () => {
  assert.deepStrictEqual(Operate.fallback('foo')(null), {
    success: true,
    data: 'foo'
  });
  assert.deepStrictEqual(
    Operate.fallback('foo')({ success: true, data: 'bar' }),
    { success: true, data: 'bar' }
  );
  assert.deepStrictEqual(
    Operate.fallback('foo')({ success: false, data: 'baz' }),
    { success: false, data: 'baz' }
  );
});
test(`Operate.transform: no args`, () => {
  assert.deepStrictEqual(Operate.transform()(null), null);
  assert.deepStrictEqual(
    Operate.transform()({ success: true, data: 'bar' }),
    'bar'
  );
  assert.deepStrictEqual(
    Operate.transform()({ success: false, data: 'baz' }),
    'baz'
  );
});
test(`Operate.transform: onSuccess`, () => {
  const values: any[] = [];
  const fn = (res: string) => (value: any): any => values.push(value) && res;

  assert.deepStrictEqual(Operate.transform(fn('foo'))(null), null);
  assert.deepStrictEqual(
    Operate.transform(fn('baz'))({ success: true, data: 'bar' }),
    'baz'
  );
  assert.deepStrictEqual(
    Operate.transform(fn('bar'))({ success: false, data: 'baz' }),
    'baz'
  );

  assert.deepStrictEqual(values, ['bar']);
});
test(`Operate.transform: onFailure`, () => {
  const values: any[] = [];
  const fn = (res: string) => (value: any): any => values.push(value) && res;

  assert.deepStrictEqual(Operate.transform(null, fn('foo'))(null), null);
  assert.deepStrictEqual(
    Operate.transform(null, fn('baz'))({ success: true, data: 'bar' }),
    'bar'
  );
  assert.deepStrictEqual(
    Operate.transform(null, fn('bar'))({ success: false, data: 'baz' }),
    'bar'
  );

  assert.deepStrictEqual(values, ['baz']);
});
test(`Operate.map: no args`, () => {
  assert.deepStrictEqual(Operate.map()(null), null);
  assert.deepStrictEqual(Operate.map()({ success: true, data: 'bar' }), {
    success: true,
    data: 'bar'
  });
  assert.deepStrictEqual(Operate.map()({ success: false, data: 'baz' }), {
    success: false,
    data: 'baz'
  });
});
test(`Operate.map: onSuccess`, () => {
  const values: any[] = [];
  const fn = (res: string) => (value: any): any => values.push(value) && res;

  assert.deepStrictEqual(Operate.map(fn('foo'))(null), null);
  assert.deepStrictEqual(
    Operate.map(fn('baz'))({ success: true, data: 'bar' }),
    { success: true, data: 'baz' }
  );
  assert.deepStrictEqual(
    Operate.map(fn('bar'))({ success: false, data: 'baz' }),
    { success: false, data: 'baz' }
  );

  assert.deepStrictEqual(values, ['bar']);
});
test(`Operate.map: onFailure`, () => {
  const values: any[] = [];
  const fn = (res: string) => (value: any): any => values.push(value) && res;

  assert.deepStrictEqual(Operate.map(null, fn('foo'))(null), null);
  assert.deepStrictEqual(
    Operate.map(null, fn('baz'))({ success: true, data: 'bar' }),
    { success: true, data: 'bar' }
  );
  assert.deepStrictEqual(
    Operate.map(null, fn('bar'))({ success: false, data: 'baz' }),
    { success: false, data: 'bar' }
  );

  assert.deepStrictEqual(values, ['baz']);
});
test(`Operate.flip: no args`, () => {
  assert.deepStrictEqual(Operate.flip()(null), null);
  assert.deepStrictEqual(Operate.flip()({ success: true, data: 'bar' }), {
    success: true,
    data: 'bar'
  });
  assert.deepStrictEqual(Operate.flip()({ success: false, data: 'baz' }), {
    success: false,
    data: 'baz'
  });
});
test(`Operate.flip: onSuccess`, () => {
  assert.deepStrictEqual(Operate.flip(true)(null), null);
  assert.deepStrictEqual(
    Operate.flip(true, false)({ success: true, data: 'bar' }),
    { success: false, data: 'bar' }
  );
  assert.deepStrictEqual(
    Operate.flip(true, false)({ success: false, data: 'baz' }),
    { success: false, data: 'baz' }
  );
});
test(`Operate.flip: onFailure`, () => {
  assert.deepStrictEqual(Operate.flip(false, true)(null), null);
  assert.deepStrictEqual(
    Operate.flip(false, true)({ success: true, data: 'bar' }),
    { success: true, data: 'bar' }
  );
  assert.deepStrictEqual(
    Operate.flip(false, true)({ success: false, data: 'baz' }),
    { success: true, data: 'baz' }
  );
});
test(`Operate.tap: no args`, () => {
  assert.deepStrictEqual(Operate.tap()(null), null);
  assert.deepStrictEqual(Operate.tap()({ success: true, data: 'bar' }), {
    success: true,
    data: 'bar'
  });
  assert.deepStrictEqual(Operate.tap()({ success: false, data: 'baz' }), {
    success: false,
    data: 'baz'
  });
});
test(`Operate.tap: onSuccess`, () => {
  const values: any[] = [];
  const fn = (value: any): any => values.push(value);

  assert.deepStrictEqual(Operate.tap(fn, null)(null), null);
  assert.deepStrictEqual(
    Operate.tap(fn, null)({ success: true, data: 'bar' }),
    { success: true, data: 'bar' }
  );
  assert.deepStrictEqual(
    Operate.tap(fn, null)({ success: false, data: 'baz' }),
    { success: false, data: 'baz' }
  );

  assert.deepStrictEqual(values, ['bar']);
});
test(`Operate.tap: onFailure`, () => {
  const values: any[] = [];
  const fn = (value: any): any => values.push(value);

  assert(Operate.tap(null, fn)(null) === null);
  assert.deepStrictEqual(
    Operate.tap(null, fn)({ success: true, data: 'bar' }),
    { success: true, data: 'bar' }
  );
  assert.deepStrictEqual(
    Operate.tap(null, fn)({ success: false, data: 'baz' }),
    { success: false, data: 'baz' }
  );

  assert.deepStrictEqual(values, ['baz']);
});
