/* eslint-disable no-console */
import log from '~/log';

console.log = jest.fn();
process.exit = jest.fn() as any;
const mocks: any = { log: console.log, exit: process.exit };

test(`no exit`, () => {
  mocks.log.mockClear();

  expect(log('foo bar baz')).toBeUndefined();
  expect(mocks.log).toHaveBeenCalledTimes(1);
  expect(mocks.log).toHaveBeenCalledWith('foo bar baz');
});
test(`exit`, () => {
  mocks.log.mockClear();
  mocks.exit.mockClear();

  expect(log('foo bar baz', { exit: 1 })).toBeUndefined();
  expect(mocks.log).toHaveBeenCalledTimes(1);
  expect(mocks.log).toHaveBeenCalledWith('foo bar baz');
  expect(mocks.exit).toHaveBeenCalledTimes(1);
  expect(mocks.exit).toHaveBeenCalledWith(1);
});
