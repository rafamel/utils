import { expect, test, vi } from 'vitest';

import { filterAlive as _filterAlive } from '../src/filter-alive';

const mocks = { killProcess: vi.fn() };

function filterAlive(pids: number[]): number[] {
  return _filterAlive(pids, {
    killProcess: mocks.killProcess
  });
}

test(`returns empty array if process.kill fails for all`, () => {
  mocks.killProcess.mockImplementation(() => {
    throw new Error('foo');
  });

  expect(filterAlive([10, 20, 30])).toEqual([]);
  expect(mocks.killProcess).toHaveBeenCalledTimes(3);
  expect(mocks.killProcess).toHaveBeenCalledWith(10, 0);
  expect(mocks.killProcess).toHaveBeenCalledWith(20, 0);
  expect(mocks.killProcess).toHaveBeenCalledWith(30, 0);
});
test(`returns filled array if process.kill succeeds for all`, () => {
  mocks.killProcess.mockImplementation(() => true);

  expect(filterAlive([10, 20, 30])).toEqual([10, 20, 30]);
  expect(mocks.killProcess).toHaveBeenCalledTimes(3);
  expect(mocks.killProcess).toHaveBeenCalledWith(10, 0);
  expect(mocks.killProcess).toHaveBeenCalledWith(20, 0);
  expect(mocks.killProcess).toHaveBeenCalledWith(30, 0);
});
test(`returns only those for which process.kill suceeds`, () => {
  mocks.killProcess.mockImplementationOnce(() => {
    throw new Error('foo');
  });

  expect(filterAlive([10, 20, 30])).toEqual([20, 30]);
  expect(mocks.killProcess).toHaveBeenCalledTimes(3);
  expect(mocks.killProcess).toHaveBeenCalledWith(10, 0);
  expect(mocks.killProcess).toHaveBeenCalledWith(20, 0);
  expect(mocks.killProcess).toHaveBeenCalledWith(30, 0);
});
