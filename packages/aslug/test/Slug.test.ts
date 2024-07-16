import { describe, expect, test } from 'vitest';

import { Slug } from '../src/Slug';

describe(`safety checks`, () => {
  test(`alphabet has unique characters`, () => {
    const alphabet = 'abcdefgabcdefg';
    const slug = new Slug(alphabet);

    expect(slug.alphabet).toBe('abcdefg');
  });
  test(`alphabet is limited to 255 characters`, () => {
    const separator = new Slug().options.separator;
    const alphabet = Array.from({ length: 300 })
      .fill(0)
      .map((_, i) => String.fromCodePoint(i))
      .join('')
      .replace(separator, '');
    const slug = new Slug(alphabet);

    expect(slug.alphabet).toBe(alphabet.slice(0, 254));
  });
  test(`separator must not be in alphabet`, () => {
    const separator = new Slug().options.separator;

    expect(
      () => new Slug(separator + '123')
    ).toThrowErrorMatchingInlineSnapshot(
      `[Error: Separator must not be in alphabet]`
    );
  });
  test(`separator must be one character`, () => {
    expect(
      () => new Slug(null, { separator: '' })
    ).toThrowErrorMatchingInlineSnapshot(
      `[Error: Separator must be a single character]`
    );
    expect(
      () => new Slug(null, { separator: '__' })
    ).toThrowErrorMatchingInlineSnapshot(
      `[Error: Separator must be a single character]`
    );
    expect(() => new Slug(null, { separator: '_' })).not.toThrow();
  });
});

describe(`encode/decode`, () => {
  test(`wo/ special chars`, () => {
    const slug = new Slug();
    const plain = 'foo-bar-baz';
    const encoded = 'foo-bar-baz';

    expect(slug.encode(plain)).toBe(encoded);
    expect(slug.decode(encoded)).toBe(plain);
  });
  test(`w/ special chars`, () => {
    const slug = new Slug();
    const plain = 'foó bar-baz+$á.d,f;gs:a\'d" níño';
    const encoded =
      'foo-bar-baza-d-f-gs-ad-nino.qbc9Mzu8fMVsrMAcm7Zb1zcBrGkttLhd1fL6vBlALk97FI4Y7hH8eJ4Wa74vmZUtc3wlmnXrKIY39zoAN4FEYYmL9r';

    expect(slug.encode(plain)).toBe(encoded);
    expect(slug.decode(encoded)).toBe(plain);
  });
  test(`starts/ends in special chars`, () => {
    const slug = new Slug();
    const plain = '~foó pπ[ §';
    const encoded = 'foo-pp-SS.RL-Njqw9esh-zzooMjNYSoUWMWqsRHxq9cAgz-4';

    expect(slug.encode(plain)).toBe(encoded);
    expect(slug.decode(encoded)).toBe(plain);
  });
});
