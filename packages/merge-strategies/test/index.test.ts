import { shallow, merge, deep } from '~/index';

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
  test(`doesn't assign to defaults`, () => {
    const defaults = { a: 1 };
    expect(shallow(defaults, {})).not.toBe(defaults);
    expect(shallow(defaults, {})).toEqual({ a: 1 });
  });
  test(`inner mutation doesn't affect defaults`, () => {
    const defaults = { a: { b: 2 } };
    const obj = shallow(defaults, {}) as any;
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
  test(`doesn't assign to defaults`, () => {
    const defaults = { a: 1 };
    expect(merge(defaults, {})).not.toBe(defaults);
    expect(merge(defaults, {})).toEqual({ a: 1 });
  });
  test(`inner mutation doesn't affect defaults`, () => {
    const defaults = { a: { b: 2 } };
    const obj = merge(defaults, {}) as any;
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
  test(`doesn't assign to defaults`, () => {
    const defaults = { a: 1 };
    expect(deep(defaults, {})).not.toBe(defaults);
    expect(deep(defaults, {})).toEqual({ a: 1 });
  });
  test(`inner mutation doesn't affect defaults`, () => {
    const defaults = { a: { b: 2 } };
    const obj = deep(defaults, {}) as any;
    obj.a.b = 5;
    expect(defaults.a.b).toBe(2);
  });
  test(`inner array mutation doesn't affect defaults`, () => {
    const defaults = { a: { b: [1, 2] } };
    const obj = deep(defaults, { a: { b: [3, 4] } }) as any;
    expect(defaults.a.b).toEqual([1, 2]);
    obj.a.b = [5, 6];
    expect(defaults.a.b).toEqual([1, 2]);
  });
});
