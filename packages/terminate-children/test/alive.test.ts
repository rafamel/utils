import alive from '~/alive';

const mocks: { [key: string]: jest.Mock } = {
  kill: process.kill = jest.fn()
};

beforeEach(() => Object.values(mocks).forEach((mock) => mock.mockClear()));

test(`returns empty array if process.kill fails for all`, () => {
  mocks.kill.mockImplementation(() => {
    throw Error();
  });

  expect(alive([10, 20, 30])).toEqual([]);
  expect(mocks.kill).toHaveBeenCalledTimes(3);
  expect(mocks.kill).toHaveBeenCalledWith(10, 0);
  expect(mocks.kill).toHaveBeenCalledWith(20, 0);
  expect(mocks.kill).toHaveBeenCalledWith(30, 0);
});
test(`returns filled array if process.kill succeeds for all`, () => {
  mocks.kill.mockImplementation(() => true);

  expect(alive([10, 20, 30])).toEqual([10, 20, 30]);
  expect(mocks.kill).toHaveBeenCalledTimes(3);
  expect(mocks.kill).toHaveBeenCalledWith(10, 0);
  expect(mocks.kill).toHaveBeenCalledWith(20, 0);
  expect(mocks.kill).toHaveBeenCalledWith(30, 0);
});
test(`returns only those for which process.kill suceeds`, () => {
  mocks.kill.mockImplementationOnce(() => {
    throw Error();
  });

  expect(alive([10, 20, 30])).toEqual([20, 30]);
  expect(mocks.kill).toHaveBeenCalledTimes(3);
  expect(mocks.kill).toHaveBeenCalledWith(10, 0);
  expect(mocks.kill).toHaveBeenCalledWith(20, 0);
  expect(mocks.kill).toHaveBeenCalledWith(30, 0);
});
