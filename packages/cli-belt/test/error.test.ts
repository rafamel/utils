/* eslint-disable no-console */
import error from '~/error';
import chalk from 'chalk';

chalk.level = 0;
console.error = jest.fn();
console.debug = jest.fn();
const logger = { error: jest.fn(), debug: jest.fn() } as any;
process.exit = jest.fn() as any;
const mocks: any = { console, logger, exit: process.exit };

test(`defaults`, () => {
  mocks.console.error.mockClear();
  mocks.console.debug.mockClear();
  mocks.exit.mockClear();

  expect(error(Error('Foo bar'))).toBeUndefined();
  expect(mocks.console.error).toHaveBeenCalledTimes(1);
  expect(mocks.console.error.mock.calls[0][0]).toMatchInlineSnapshot(
    `"Error: Foo bar"`
  );
  expect(mocks.console.debug).not.toHaveBeenCalled();
  expect(mocks.exit).not.toHaveBeenCalled();
});
test(`debug`, () => {
  mocks.console.error.mockClear();
  mocks.console.debug.mockClear();
  mocks.exit.mockClear();

  const err = Error('Foo bar');
  expect(error(err, { debug: true })).toBeUndefined();
  expect(mocks.console.error).toHaveBeenCalledTimes(1);
  expect(mocks.console.error.mock.calls[0][0]).toMatchInlineSnapshot(
    `"Error: Foo bar"`
  );
  expect(mocks.console.debug).toHaveBeenCalledTimes(1);
  expect(mocks.console.debug.mock.calls[0][0]).toBe(err);
  expect(mocks.exit).not.toHaveBeenCalled();
});
test(`logger`, () => {
  mocks.console.error.mockClear();
  mocks.console.debug.mockClear();
  mocks.logger.error.mockClear();
  mocks.logger.debug.mockClear();
  mocks.exit.mockClear();

  const err = Error('Foo bar');
  expect(error(err, { logger, debug: true })).toBeUndefined();
  expect(mocks.console.error).not.toHaveBeenCalled();
  expect(mocks.console.debug).not.toHaveBeenCalled();
  expect(mocks.logger.error).toHaveBeenCalledTimes(1);
  expect(mocks.logger.error.mock.calls[0][0]).toMatchInlineSnapshot(
    `"Error: Foo bar"`
  );
  expect(mocks.logger.debug).toHaveBeenCalledTimes(1);
  expect(mocks.logger.debug.mock.calls[0][0]).toBe(err);
  expect(mocks.exit).not.toHaveBeenCalled();
});
test(`exit`, () => {
  mocks.exit.mockClear();

  expect(error(Error('Foo bar'), { exit: 1 })).toBeUndefined();
  expect(mocks.exit).toHaveBeenCalledTimes(1);
  expect(mocks.exit).toHaveBeenCalledWith(1);
});
