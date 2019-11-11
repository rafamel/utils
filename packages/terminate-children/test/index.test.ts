import terminate from '~/index';
import tree from 'ps-tree';
import alive from '~/alive';
import { wait } from 'promist';

jest.mock('ps-tree');
jest.mock('~/alive');
const mocks: { [key: string]: jest.Mock } = {
  alive,
  tree,
  kill: process.kill = jest.fn()
} as any;
mocks.tree.mockImplementation((_, cb) =>
  cb(null, [10, 20, 30].map((n) => ({ PID: n })))
);
mocks.alive.mockImplementation(() => []);
beforeEach(() => Object.values(mocks).forEach((mock) => mock.mockClear()));

test(`succeeds for base case`, async () => {
  await expect(terminate(100)).resolves.toEqual([]);
  expect(mocks.tree).toHaveBeenCalledTimes(1);
  expect(mocks.tree.mock.calls[0][0]).toBe(100);
  expect(mocks.kill).toHaveBeenCalledTimes(3);
  expect(mocks.kill).toHaveBeenCalledWith(10, 'SIGTERM');
  expect(mocks.kill).toHaveBeenCalledWith(20, 'SIGTERM');
  expect(mocks.kill).toHaveBeenCalledWith(30, 'SIGTERM');
  expect(mocks.alive).toHaveBeenCalledWith([10, 20, 30]);
});
test(`fails on tree error`, async () => {
  mocks.tree.mockImplementationOnce((_, cb) => cb(Error()));
  await expect(terminate(100)).rejects.toThrowError();
});
test(`doesn't fail if signal kill fails`, async () => {
  mocks.kill.mockImplementationOnce(() => {
    throw Error();
  });
  await expect(terminate(100)).resolves.toEqual([]);

  mocks.kill.mockReset();
});
test(`options.signal`, async () => {
  await expect(terminate(100, { signal: 'SIGKILL' })).resolves.toEqual([]);
  expect(mocks.kill).toHaveBeenCalledTimes(3);
  expect(mocks.kill).toHaveBeenCalledWith(10, 'SIGKILL');
  expect(mocks.kill).toHaveBeenCalledWith(20, 'SIGKILL');
  expect(mocks.kill).toHaveBeenCalledWith(30, 'SIGKILL');
  expect(mocks.alive).toHaveBeenCalledWith([10, 20, 30]);
});
test(`options.filter`, async () => {
  await expect(terminate(100, { filter: (n) => n !== 20 })).resolves.toEqual(
    []
  );
  expect(mocks.kill).toHaveBeenCalledTimes(2);
  expect(mocks.kill).toHaveBeenCalledWith(10, 'SIGTERM');
  expect(mocks.kill).toHaveBeenCalledWith(30, 'SIGTERM');
  expect(mocks.alive).toHaveBeenCalledWith([10, 30]);
});
test(`options.interval`, async () => {
  // with default interval
  mocks.alive.mockImplementation(() => [10]);
  const p1 = terminate(100);
  await wait(300);
  mocks.alive.mockImplementationOnce(() => []);
  await expect(p1).resolves.toEqual([]);
  expect(mocks.alive.mock.calls.length).toBeGreaterThanOrEqual(5);

  // with custom interval
  mocks.alive.mockClear();
  const start = Date.now();
  const p2 = terminate(100, { interval: 500 });
  await wait(750);
  mocks.alive.mockImplementation(() => []);

  await expect(p2).resolves.toEqual([]);
  expect(Date.now() - start).toBeLessThan(1500);
  expect(mocks.alive).toHaveBeenCalledTimes(3);
});
test(`options.timeout = 0`, async () => {
  mocks.alive.mockImplementationOnce(() => [10]);
  await expect(terminate(100, { timeout: 0 })).resolves.toEqual([10]);
  expect(mocks.alive).toHaveBeenCalledTimes(1);
});
test(`options.timeout > 0`, async () => {
  mocks.alive.mockImplementation(() => [10]);
  const start1 = Date.now();
  const p1 = terminate(100, { timeout: 500 });
  await expect(p1).resolves.toEqual([10]);
  expect(Date.now() - start1).toBeGreaterThanOrEqual(500);
  expect(mocks.alive.mock.calls.length).toBeGreaterThanOrEqual(15);

  mocks.alive.mockClear();
  const start2 = Date.now();
  const p2 = terminate(100, { timeout: 500 });
  await wait(250);
  mocks.alive.mockImplementation(() => []);
  await expect(p2).resolves.toEqual([]);
  expect(Date.now() - start2).toBeLessThan(500);
  expect(mocks.alive.mock.calls.length).toBeLessThan(15);
});
