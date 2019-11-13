import { Response } from '~/Response';

describe(`Response.pass`, () => {
  test(`creates Response`, () => {
    expect(() => Response.pass('foo')).not.toThrow();
  });
  test(`is successful`, () => {
    const response = Response.pass('foo');
    expect(response.success).toBe(true);
  });
  test(`gets value`, () => {
    const response = Response.pass('foo');
    expect(() => response.value).not.toThrow();
    expect(response.value).toBe('foo');
  });
  test(`fails on error`, () => {
    const response = Response.pass('foo');
    expect(() => response.error).toThrowErrorMatchingInlineSnapshot(
      `"Can't get error of a successful response"`
    );
  });
});

describe(`Response.fail`, () => {
  test(`creates Response`, () => {
    expect(() => Response.fail(Error(`Foo`))).not.toThrow();
  });
  test(`is unsuccessful`, () => {
    const response = Response.fail(Error(`Foo`));
    expect(response.success).toBe(false);
  });
  test(`fails on value`, () => {
    const response = Response.fail(Error(`Foo`));
    expect(() => response.value).toThrowErrorMatchingInlineSnapshot(
      `"Can't get value of an unsuccessful response"`
    );
  });
  test(`gets error`, () => {
    const error = Error(`Foo`);
    const response = Response.fail(error);
    expect(() => response.error).not.toThrow();
    expect(response.error).toBe(error);
  });
});

describe(`Response.combine`, () => {
  test(`returns first w/ error`, () => {
    const error = Error('Foo');
    const response = Response.combine(
      Response.pass('foo'),
      Response.pass('bar'),
      Response.fail(error),
      Response.pass('baz'),
      Response.fail(Error('Bar'))
    );

    expect(response.success).toBe(false);
    expect(() => response.value).toThrow();
    expect(() => response.error).not.toThrow();
    expect(response.error).toBe(error);
  });
  test(`returns array of results`, () => {
    const response = Response.combine(
      Response.pass('foo'),
      Response.pass('bar'),
      Response.pass(10),
      Response.pass('baz')
    );

    expect(response.success).toBe(true);
    expect(() => response.value).not.toThrow();
    expect(() => response.error).toThrow();
    expect(response.value).toEqual(['foo', 'bar', 10, 'baz']);
  });
});
