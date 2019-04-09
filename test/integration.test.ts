import aslug from '~/aslug';

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
    'foo-bar-baza-d-f-gs-ad-nino~4cKNEusoXtkFP37Lku7lUDVAuV4EgN2mF3k6mN8fD6yo1vPG4LGdU5T2c34SGXXlgfHr1fYAvA8iFQ7Hp1GdWyYoCJT';

  expect(encode(plain)).toBe(encoded);
  expect(decode(encoded)).toBe(plain);
});

test(`starts/ends in special chars`, () => {
  const plain = '~foó pπ[ §';
  const encoded = 'foo-pp-SS~ouDkIVjro-bT6rRlu7PRsouyN8HaYaSl9zrpaVW';

  expect(encode(plain)).toBe(encoded);
  expect(decode(encoded)).toBe(plain);
});
