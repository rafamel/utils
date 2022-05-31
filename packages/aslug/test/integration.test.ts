import { test, expect } from '@jest/globals';

import aslug from '../src/aslug';

const { encode, decode } = aslug();

test(`wo/ special chars`, () => {
  const plain = 'foo-bar-baz';
  const encoded = 'foo-bar-baz';

  expect(encode(plain)).toBe(encoded);
  expect(decode(encoded)).toBe(plain);
});

test(`w/ special chars`, () => {
  const plain = 'foó bar-baz+$á.d,f;gs:a\'d" níño';
  const encoded =
    'foo-bar-baza-d-f-gs-ad-nino~qbc9Mzu8fMVsrMAcm7Zb1zcBrGkttLhd1fL6vBlALk97FI4Y7hH8eJ4Wa74vmZUtc3wlmnXrKIY39zoAN4FEYYmL9r';

  expect(encode(plain)).toBe(encoded);
  expect(decode(encoded)).toBe(plain);
});

test(`starts/ends in special chars`, () => {
  const plain = '~foó pπ[ §';
  const encoded = 'foo-pp-SS~RL-Njqw9esh-zzooMjNYSoUWMWqsRHxq9cAgz-4';

  expect(encode(plain)).toBe(encoded);
  expect(decode(encoded)).toBe(plain);
});
