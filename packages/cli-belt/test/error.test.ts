/* eslint-disable no-console */
import { expect, test, vi } from 'vitest';
import chalk from 'chalk';

import { error } from '../src/error';

chalk.level = 0;
console.error = vi.fn();
console.debug = vi.fn();
const logger = { error: vi.fn(), debug: vi.fn() } as any;
process.exit = vi.fn() as any;
const mocks: any = { console, logger, exit: process.exit };

test(`defaults`, () => {
  expect(error(new Error('Foo bar'))).toBeUndefined();
  expect(mocks.console.error).toHaveBeenCalledTimes(1);
  expect(mocks.console.error.mock.calls[0][0]).toMatchInlineSnapshot(
    `"Error: Foo bar"`
  );
  expect(mocks.console.debug).not.toHaveBeenCalled();
  expect(mocks.exit).not.toHaveBeenCalled();
});
test(`debug`, () => {
  const err = new Error('Foo bar');
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
  const err = new Error('Foo bar');
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
  expect(error(new Error('Foo bar'), { exit: 1 })).toBeUndefined();
  expect(mocks.exit).toHaveBeenCalledTimes(1);
  expect(mocks.exit).toHaveBeenCalledWith(1);
});
