import { test, expect, jest, beforeEach } from '@jest/globals';

import {
  terminateChildrenImplementation,
  Options
} from '../src/terminate-children';

const mocks = {
  killProcess: jest.fn(),
  getChildrenPids: jest.fn(async () => [10, 20, 30]),
  filterAlivePids: jest.fn((): number[] => [])
};

beforeEach(() => {
  for (const mock of Object.values(mocks)) mock.mockClear();
});

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function terminateChildren(pid: number, options?: Options): Promise<number[]> {
  return terminateChildrenImplementation(pid, options || {}, {
    killProcess: mocks.killProcess,
    getChildrenPids: mocks.getChildrenPids,
    filterAlivePids: mocks.filterAlivePids
  });
}

test(`succeeds for base case`, async () => {
  await expect(terminateChildren(100)).resolves.toEqual([]);
  expect(mocks.getChildrenPids).toHaveBeenCalledTimes(1);
  expect((mocks.getChildrenPids.mock as any).calls[0][0]).toBe(100);
  expect(mocks.killProcess).toHaveBeenCalledTimes(3);
  expect(mocks.killProcess).toHaveBeenCalledWith(10, 'SIGTERM');
  expect(mocks.killProcess).toHaveBeenCalledWith(20, 'SIGTERM');
  expect(mocks.killProcess).toHaveBeenCalledWith(30, 'SIGTERM');
  expect(mocks.filterAlivePids).toHaveBeenCalledWith([10, 20, 30]);
});
test(`fails on tree error`, async () => {
  mocks.getChildrenPids.mockImplementationOnce(() =>
    Promise.reject(new Error('foo'))
  );
  await expect(terminateChildren(100)).rejects.toThrowError();
});
test(`doesn't fail if signal kill fails`, async () => {
  mocks.killProcess.mockImplementationOnce(() => {
    throw new Error('foo');
  });
  await expect(terminateChildren(100)).resolves.toEqual([]);

  mocks.killProcess.mockReset();
});
test(`options.signal`, async () => {
  await expect(terminateChildren(100, { signal: 'SIGKILL' })).resolves.toEqual(
    []
  );
  expect(mocks.killProcess).toHaveBeenCalledTimes(3);
  expect(mocks.killProcess).toHaveBeenCalledWith(10, 'SIGKILL');
  expect(mocks.killProcess).toHaveBeenCalledWith(20, 'SIGKILL');
  expect(mocks.killProcess).toHaveBeenCalledWith(30, 'SIGKILL');
  expect(mocks.filterAlivePids).toHaveBeenCalledWith([10, 20, 30]);
});
test(`options.filter`, async () => {
  await expect(
    terminateChildren(100, { filter: (n) => n !== 20 })
  ).resolves.toEqual([]);
  expect(mocks.killProcess).toHaveBeenCalledTimes(2);
  expect(mocks.killProcess).toHaveBeenCalledWith(10, 'SIGTERM');
  expect(mocks.killProcess).toHaveBeenCalledWith(30, 'SIGTERM');
  expect(mocks.filterAlivePids).toHaveBeenCalledWith([10, 30]);
});
test(`options.interval`, async () => {
  // with default interval
  mocks.filterAlivePids.mockImplementation(() => [10]);
  const p1 = terminateChildren(100);
  await wait(300);
  mocks.filterAlivePids.mockImplementationOnce(() => []);
  await expect(p1).resolves.toEqual([]);
  expect(mocks.filterAlivePids.mock.calls.length).toBeGreaterThanOrEqual(5);

  // with custom interval
  mocks.filterAlivePids.mockClear();
  const start = Date.now();
  const p2 = terminateChildren(100, { interval: 500 });
  await wait(750);
  mocks.filterAlivePids.mockImplementation(() => []);

  await expect(p2).resolves.toEqual([]);
  expect(Date.now() - start).toBeLessThan(1500);
  expect(mocks.filterAlivePids).toHaveBeenCalledTimes(3);
});
test(`options.timeout = 0`, async () => {
  mocks.filterAlivePids.mockImplementationOnce(() => [10]);
  await expect(terminateChildren(100, { timeout: 0 })).resolves.toEqual([10]);
  expect(mocks.filterAlivePids).toHaveBeenCalledTimes(1);
});
test(`options.timeout > 0`, async () => {
  mocks.filterAlivePids.mockImplementation(() => [10]);
  const start1 = Date.now();
  const p1 = terminateChildren(100, { timeout: 500 });
  await expect(p1).resolves.toEqual([10]);
  expect(Date.now() - start1).toBeGreaterThanOrEqual(500);
  expect(mocks.filterAlivePids.mock.calls.length).toBeGreaterThanOrEqual(15);

  mocks.filterAlivePids.mockClear();
  const start2 = Date.now();
  const p2 = terminateChildren(100, { timeout: 500 });
  await wait(250);
  mocks.filterAlivePids.mockImplementation(() => []);
  await expect(p2).resolves.toEqual([]);
  expect(Date.now() - start2).toBeLessThan(500);
  expect(mocks.filterAlivePids.mock.calls.length).toBeLessThan(15);
});
