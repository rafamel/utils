import tail from '~/tail';

const arr = ['foo', 'bar', 'foobar', 'foobarbaz'];

test(`defaults`, () => {
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
test(`w/ empty arr`, () => {
  const being = tail([]);
  expect(arr.map(being)).toMatchInlineSnapshot(`
    Array [
      "foobarbaz        ",
      "foobar        ",
      "foo        ",
      "bar        ",
    ]
  `);
});
test(`w/ longer string than any in arr`, () => {
  const being = tail(arr);
  expect(arr.concat('this is a longer string').map(being))
    .toMatchInlineSnapshot(`
            Array [
              "foobarbaz        ",
              "foobar           ",
              "foo              ",
              "bar              ",
              "this is a longer string ",
            ]
      `);
});
test(`w/ negative spaces`, () => {
  const being = tail(arr, -10);
  expect(arr.map(being)).toMatchInlineSnapshot(`
        Array [
          "foobarbaz ",
          "foobar ",
          "foo ",
          "bar ",
        ]
    `);
});
