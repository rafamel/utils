import { strict, partial, shallow, deep } from '~/strategies';

describe(`strict`, () => {
  test(`is true`, () => {
    const obj = {};
    const results = [
      strict(1, 1),
      strict('', ''),
      strict(null, null),
      strict(true, true),
      strict(obj, obj)
    ];
    results.map((result) => expect(result).toBe(true));
  });
  test(`is false`, () => {
    const results = [
      strict(1, 2),
      strict('', 'a'),
      strict(null, false),
      strict(true, false),
      strict({}, {})
    ];
    results.map((result) => expect(result).toBe(false));
  });
});

describe(`partial`, () => {
  test(`is true`, () => {
    const results = [
      partial(1, 1),
      partial('', ''),
      partial(null, null),
      partial(true, true),
      partial({}, {}),
      partial({ a: 1 }, { a: 1, b: 2, c: 3 })
    ];
    results.map((result) => expect(result).toBe(true));
  });
  test(`is false`, () => {
    const results = [
      partial(1, 2),
      partial('', 'a'),
      partial(null, false),
      partial(true, false),
      partial({}, []),
      partial([], []),
      partial({ a: {} }, { a: {} }),
      partial({ a: 1 }, { a: 2 }),
      partial({ a: 1 }, { b: 2, c: 3 })
    ];
    results.map((result) => expect(result).toBe(false));
  });
});

describe(`shallow`, () => {
  test(`is true`, () => {
    const results = [
      shallow(1, 1),
      shallow('', ''),
      shallow(null, null),
      shallow(true, true),
      shallow([], []),
      shallow([1, 2, 3], [1, 2, 3]),
      shallow({}, {}),
      shallow({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })
    ];
    results.map((result) => expect(result).toBe(true));
  });
  test(`is false`, () => {
    const results = [
      shallow(1, 2),
      shallow('', 'a'),
      shallow(null, false),
      shallow(true, false),
      shallow([1, 2, 3], [1, 2, 3, 4]),
      shallow({ a: 1 }, { a: 2 }),
      shallow({ a: 1 }, { b: 2, c: 3 }),
      shallow({ a: 1 }, { a: 1, b: 2, c: 3 })
    ];
    results.map((result) => expect(result).toBe(false));
  });
});

describe(`deep`, () => {
  test(`is true`, () => {
    const results = [
      deep(1, 1),
      deep('', ''),
      deep(null, null),
      deep(true, true),
      deep([], []),
      deep([1, 2, 3], [1, 2, 3]),
      deep({}, {}),
      deep({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 }),
      deep({ a: { a: 1 }, b: 2, c: 3 }, { a: { a: 1 }, b: 2, c: 3 })
    ];
    results.map((result) => expect(result).toBe(true));
  });
  test(`is false`, () => {
    const results = [
      deep(1, 2),
      deep('', 'a'),
      deep(null, false),
      deep(true, false),
      deep([1, 2, 3], [1, 2, 3, 4]),
      deep({ a: 1 }, { a: 2 }),
      deep({ a: 1 }, { b: 2, c: 3 }),
      deep({ a: 1 }, { a: 1, b: 2, c: 3 }),
      deep({ a: { a: 1 }, b: 2, c: 3 }, { a: { a: 2 }, b: 2, c: 3 })
    ];
    results.map((result) => expect(result).toBe(false));
  });
});
