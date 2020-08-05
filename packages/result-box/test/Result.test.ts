import { Result } from '~/Result';

describe(`Result.pass`, () => {
  test(`creates Result`, () => {
    expect(() => Result.pass('foo')).not.toThrow();
  });
  test(`suceeds`, () => {
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
  test(`succeeds on empty argument`, () => {
    const result = Result.pass();
    expect(result.success).toBe(true);
    expect(result.value).toBe(undefined);
  });
});

describe(`Result.fail`, () => {
  test(`creates Result`, () => {
    expect(() => Result.fail(Error(`Foo`))).not.toThrow();
  });
  test(`fails`, () => {
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

describe(`Result.create`, () => {
  describe(`sync`, () => {
    test(`succeeds`, () => {
      const result = Result.create(() => 'foo');
      expect(result.success).toBe(true);
      expect(result.value).toBe('foo');
    });
    test(`fails`, () => {
      const error = Error(`foo`);
      const result = Result.create(() => {
        throw error;
      });
      expect(result.success).toBe(false);
      expect(result.error).toBe(error);
    });
    test(`maps error on failure`, () => {
      let error: Error | null = null;
      const err1 = Error(`foo`);
      const err2 = Error('bar');
      const result = Result.create(
        () => {
          throw err1;
        },
        (err) => {
          error = err;
          return err2;
        }
      );
      expect(result.success).toBe(false);
      expect(result.error).toBe(err2);
      expect(error).toBe(err1);
    });
  });
  describe(`async`, () => {
    test(`succeeds`, async () => {
      const result = await Result.create(async () => 'foo');
      expect(result.success).toBe(true);
      expect(result.value).toBe('foo');
    });
    test(`fails`, async () => {
      const error = Error(`foo`);
      const result = await Result.create(() => Promise.reject(error));
      expect(result.success).toBe(false);
      expect(result.error).toBe(error);
    });
    test(`maps error on failure`, async () => {
      let error: Error | null = null;
      const err1 = Error(`foo`);
      const err2 = Error('bar');
      const result = await Result.create(
        () => Promise.reject(err1),
        (err) => {
          error = err;
          return err2;
        }
      );
      expect(result.success).toBe(false);
      expect(result.error).toBe(err2);
      expect(error).toBe(err1);
    });
  });
});

describe(`Result.consume`, () => {
  describe(`sync`, () => {
    test(`succeeds`, () => {
      expect(Result.consume(Result.pass('foo'))).toBe('foo');
    });
    test(`fails`, () => {
      expect(() => Result.consume(Result.fail(Error('Foo')))).toThrowError(
        'Foo'
      );
    });
  });
  describe(`async`, () => {
    test(`succeeds`, async () => {
      const promise = Result.consume(Promise.resolve(Result.pass('foo')));
      await expect(promise).resolves.toBe('foo');
    });
    test(`fails`, async () => {
      const promise = Result.consume(
        Promise.resolve(Result.fail(Error('Foo')))
      );
      await expect(promise).rejects.toThrowError('Foo');
    });
  });
});

describe(`Result.combine`, () => {
  test(`returns first w/ error`, () => {
    const error = Error('Foo');
    const result = Result.combine(
      Result.pass('foo'),
      () => Result.pass('bar'),
      () => Result.fail(error),
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
      () => Result.pass('foo'),
      Result.pass('bar'),
      Result.pass(10),
      () => Result.pass('baz')
    );

    expect(result.success).toBe(true);
    expect(() => result.value).not.toThrow();
    expect(() => result.error).toThrow();
    expect(result.value).toEqual(['foo', 'bar', 10, 'baz']);
  });
});
