import tail from '~/tail';

test(`defaults`, () => {
  const arr = ['foo', 'bar', 'foobar', 'foobarbaz'];
  const being = tail(arr);
  expect(arr.map(being)).toMatchInlineSnapshot(`
    Array [
      "foobarbaz        ",
      "foobar           ",
      "foo              ",
      "bar              ",
    ]
  `);
});
test(`w/ spaces`, () => {
  const arr = ['foo', 'bar', 'foobar', 'foobarbaz'];
  const being = tail(arr, 12);
  expect(arr.map(being)).toMatchInlineSnapshot(`
    Array [
      "foobarbaz            ",
      "foobar               ",
      "foo                  ",
      "bar                  ",
    ]
  `);
});
