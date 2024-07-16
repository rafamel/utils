import { describe, expect, test } from 'vitest';

import { deep, merge, shallow } from '../src';

describe(`shallow`, () => {
  test(`returns shallow merge`, () => {
    expect(shallow(1, 2)).toBe(2);
    expect(shallow({ a: 1 }, 2)).toBe(2);
    expect(shallow(1, { b: 1 })).toEqual({ b: 1 });
    expect(shallow({ a: 1 }, { b: 1 })).toEqual({ a: 1, b: 1 });
    expect(shallow([1, 2], [3, 4])).toEqual([3, 4]);
    expect(shallow({ a: 1 }, [3, 4])).toEqual([3, 4]);
    expect(shallow([1, 2], { b: 1 })).toEqual({ b: 1 });
    expect(shallow({ a: { b: 3 }, c: 1 }, { a: { d: 3 }, d: 4 })).toEqual({
      a: { d: 3 },
      c: 1,
      d: 4
    });
  });
  test(`doesn't fail on null`, () => {
    expect(shallow(null, { a: 1 })).not.toBe({ a: 1 });
    expect(shallow({ a: 1 }, null)).toEqual(null);
  });
  test(`undefined keys are treated as non existent`, () => {
    expect(shallow({ a: 1 }, { a: undefined })).toEqual({ a: 1 });
    expect(shallow({ a: 1 }, { a: null })).toEqual({ a: null });
  });
  test(`doesn't assign to defaults`, () => {
    const defaults = { a: 1 };
    expect(shallow(defaults, {})).not.toBe(defaults);
    expect(shallow(defaults, {})).toEqual({ a: 1 });
  });
  test(`inner mutation doesn't affect defaults`, () => {
    const defaults = { a: { b: 2, c: [{}, {}] }, b: 2 };
    const obj = shallow(defaults, {}) as any;
    obj.b = 1;
    expect(defaults.a).not.toBe(1);
    obj.a.c[0].a = 1;
    expect(Object.keys(defaults.a.c[0]).length).toBe(0);
    obj.a.c.push({});
    expect(defaults.a.c.length).toBe(2);
    obj.a.b = 5;
    expect(defaults.a.b).toBe(2);
  });
});

describe(`merge`, () => {
  test(`returns deep merge wo/ arrays`, () => {
    expect(merge(1, 2)).toBe(2);
    expect(merge({ a: 1 }, 2)).toBe(2);
    expect(merge(1, { b: 1 })).toEqual({ b: 1 });
    expect(merge({ a: 1 }, { b: 1 })).toEqual({ a: 1, b: 1 });
    expect(merge([1, 2], [3, 4])).toEqual([3, 4]);
    expect(merge({ a: 1 }, [3, 4])).toEqual([3, 4]);
    expect(merge([1, 2], { b: 1 })).toEqual({ b: 1 });
    expect(merge({ a: { b: 3 }, c: 1 }, { a: { d: 3 }, d: 4 })).toEqual({
      a: { b: 3, d: 3 },
      c: 1,
      d: 4
    });
    expect(
      merge(
        { a: { b: [1, 2], c: 3 }, d: [1, 2, 3] },
        { a: { b: 3, c: [3, 4] }, d: [4, 5, 6] }
      )
    ).toEqual({
      a: { b: 3, c: [3, 4] },
      d: [4, 5, 6]
    });
  });
  test(`undefined keys are treated as non existent`, () => {
    expect(
      merge({ a: 1, b: { c: 2 } }, { a: undefined, b: { c: undefined } })
    ).toEqual({ a: 1, b: { c: 2 } });
    expect(merge({ a: 1, b: { c: 2 } }, { a: null, b: { c: null } })).toEqual({
      a: null,
      b: { c: null }
    });
  });
  test(`doesn't assign to defaults`, () => {
    const defaults = { a: 1 };
    expect(merge(defaults, {})).not.toBe(defaults);
    expect(merge(defaults, {})).toEqual({ a: 1 });
  });
  test(`inner mutation doesn't affect defaults`, () => {
    const defaults = { a: { b: 2, c: [{}, {}] }, b: 2 };
    const obj = merge(defaults, {}) as any;
    obj.b = 1;
    expect(defaults.a).not.toBe(1);
    obj.a.c[0].a = 1;
    expect(Object.keys(defaults.a.c[0]).length).toBe(0);
    obj.a.c.push({});
    expect(defaults.a.c.length).toBe(2);
    obj.a.b = 5;
    expect(defaults.a.b).toBe(2);
  });
});

describe(`deep`, () => {
  test(`returns deep merge w/ arrays`, () => {
    expect(deep(1, 2)).toBe(2);
    expect(deep({ a: 1 }, 2)).toBe(2);
    expect(deep(1, { b: 1 })).toEqual({ b: 1 });
    expect(deep({ a: 1 }, { b: 1 })).toEqual({ a: 1, b: 1 });
    expect(deep([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
    expect(deep({ a: 1 }, [3, 4])).toEqual([3, 4]);
    expect(deep([1, 2], { b: 1 })).toEqual({ b: 1 });
    expect(deep({ a: { b: 3 }, c: 1 }, { a: { d: 3 }, d: 4 })).toEqual({
      a: { b: 3, d: 3 },
      c: 1,
      d: 4
    });
    expect(
      deep(
        { a: { b: [1, 2], c: 3 }, d: [1, 2, 3] },
        { a: { b: 3, c: [3, 4] }, d: [4, 5, 6] }
      )
    ).toEqual({
      a: { b: 3, c: [3, 4] },
      d: [1, 2, 3, 4, 5, 6]
    });
  });
  test(`undefined keys are treated as non existent`, () => {
    expect(
      deep({ a: 1, b: { c: 2 } }, { a: undefined, b: { c: undefined } })
    ).toEqual({ a: 1, b: { c: 2 } });
    expect(deep({ a: 1, b: { c: 2 } }, { a: null, b: { c: null } })).toEqual({
      a: null,
      b: { c: null }
    });
  });
  test(`doesn't assign to defaults`, () => {
    const defaults = { a: 1 };
    expect(deep(defaults, {})).not.toBe(defaults);
    expect(deep(defaults, {})).toEqual({ a: 1 });
  });
  test(`inner mutation doesn't affect defaults (1)`, () => {
    const defaults = { a: { b: 2 } };
    const obj = deep(defaults, {}) as any;
    obj.a.b = 5;
    expect(defaults.a.b).toBe(2);
  });
  test(`inner mutation doesn't affect defaults (2)`, () => {
    const defaults = { a: { b: [{}, {}], c: [{}, {}] }, b: 2 };
    const obj = deep(defaults, { a: { b: [3, 4] } }) as any;
    obj.b = 1;
    obj.a.b[0].foo = 1;
    expect(Object.keys(defaults.a.b[0]).length).toBe(0);
    obj.a.b.push(7);
    expect(defaults.a.b.length).toBe(2);
    obj.a.b = [{}];
    expect(defaults.a.b.length).toBe(2);
    obj.a.c[0].foo = 1;
    expect(Object.keys(defaults.a.c[0]).length).toBe(0);
    obj.a.c.push(7);
    expect(defaults.a.c.length).toBe(2);
    obj.a.c = [{}];
    expect(defaults.a.c.length).toBe(2);
  });
});
