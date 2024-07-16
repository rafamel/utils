import { expect, test } from 'vitest';

import { splitBy } from '../src/split-by';

test(`succeeds`, () => {
  const arr = ['foo', 'bar', 'baz', '--', 'foobar', 'foobaz', 'barbaz'];
  expect(splitBy(arr)).toEqual([
    ['foo', 'bar', 'baz'],
    ['foobar', 'foobaz', 'barbaz']
  ]);
});
test(`different separator`, () => {
  const arr = ['foo', 'bar', 'baz', 'else', 'foobar', 'foobaz', 'barbaz'];
  expect(splitBy(arr, 'else')).toEqual([
    ['foo', 'bar', 'baz'],
    ['foobar', 'foobaz', 'barbaz']
  ]);
});
test(`no separator`, () => {
  const arr = ['foo', 'bar', 'baz', 'foobar', 'foobaz', 'barbaz'];
  expect(splitBy(arr)).toEqual([
    ['foo', 'bar', 'baz', 'foobar', 'foobaz', 'barbaz'],
    []
  ]);
});
test(`first is separator`, () => {
  const arr = ['--', 'foobar', 'foobaz', 'barbaz'];
  expect(splitBy(arr)).toEqual([[], ['foobar', 'foobaz', 'barbaz']]);
});
test(`last is separator`, () => {
  const arr = ['foo', 'bar', 'baz', '--'];
  expect(splitBy(arr)).toEqual([['foo', 'bar', 'baz'], []]);
});
test(`several separators`, () => {
  const arr = ['foo', 'bar', 'baz', '--', 'foobar', '--', 'foobaz', 'barbaz'];
  expect(splitBy(arr)).toEqual([
    ['foo', 'bar', 'baz'],
    ['foobar', '--', 'foobaz', 'barbaz']
  ]);
});
