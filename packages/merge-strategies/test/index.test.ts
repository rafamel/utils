import main from '~/index';

describe(`- Main`, () => {
  test(`Doesn't throw`, () => {
    expect(() => {}).not.toThrow();
    expect(main()).toBeUndefined();
  });
});
