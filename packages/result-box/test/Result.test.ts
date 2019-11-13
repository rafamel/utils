import { Result } from '~/Result';

describe(`Result.pass`, () => {
  test(`creates Result`, () => {
    expect(() => Result.pass('foo')).not.toThrow();
  });
  test(`is successful`, () => {
    const result = Result.pass('foo');
    expect(result.success).toBe(true);
  });
  test(`gets value`, () => {
    const result = Result.pass('foo');
    expect(() => result.value).not.toThrow();
    expect(result.value).toBe('foo');
  });
  test(`fails on error`, () => {
    const result = Result.pass('foo');
    expect(() => result.error).toThrowErrorMatchingInlineSnapshot(
      `"Can't get error of a successful result"`
    );
  });
});

describe(`Result.fail`, () => {
  test(`creates Result`, () => {
    expect(() => Result.fail(Error(`Foo`))).not.toThrow();
  });
  test(`is unsuccessful`, () => {
    const result = Result.fail(Error(`Foo`));
    expect(result.success).toBe(false);
  });
  test(`fails on value`, () => {
    const result = Result.fail(Error(`Foo`));
    expect(() => result.value).toThrowErrorMatchingInlineSnapshot(
      `"Can't get value of an unsuccessful result"`
    );
  });
  test(`gets error`, () => {
    const error = Error(`Foo`);
    const result = Result.fail(error);
    expect(() => result.error).not.toThrow();
    expect(result.error).toBe(error);
  });
});

describe(`Result.combine`, () => {
  test(`returns first w/ error`, () => {
    const error = Error('Foo');
    const result = Result.combine(
      Result.pass('foo'),
      Result.pass('bar'),
      Result.fail(error),
      Result.pass('baz'),
      Result.fail(Error('Bar'))
    );

    expect(result.success).toBe(false);
    expect(() => result.value).toThrow();
    expect(() => result.error).not.toThrow();
    expect(result.error).toBe(error);
  });
  test(`returns array of results`, () => {
    const result = Result.combine(
      Result.pass('foo'),
      Result.pass('bar'),
      Result.pass(10),
      Result.pass('baz')
    );

    expect(result.success).toBe(true);
    expect(() => result.value).not.toThrow();
    expect(() => result.error).toThrow();
    expect(result.value).toEqual(['foo', 'bar', 10, 'baz']);
  });
});
