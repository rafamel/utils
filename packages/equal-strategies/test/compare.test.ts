import { compare } from '~/compare';
import * as strategies from '~/strategies';

const mocks = {
  strict: jest
    .spyOn(strategies, 'strict')
    .mockImplementation(() => 'strict' as any),
  partial: jest
    .spyOn(strategies, 'partial')
    .mockImplementation(() => 'partial' as any),
  shallow: jest
    .spyOn(strategies, 'shallow')
    .mockImplementation(() => 'shallow' as any),
  deep: jest.spyOn(strategies, 'deep').mockImplementation(() => 'deep' as any)
};

test(`succeeds`, () => {
  expect(compare('strict', 'foo', 'bar')).toBe('strict');
  expect(mocks.strict).toHaveBeenLastCalledWith('foo', 'bar');

  expect(compare('partial', 'foo', 'bar')).toBe('partial');
  expect(mocks.partial).toHaveBeenLastCalledWith('foo', 'bar');

  expect(compare('shallow', 'foo', 'bar')).toBe('shallow');
  expect(mocks.shallow).toHaveBeenLastCalledWith('foo', 'bar');

  expect(compare('deep', 'foo', 'bar')).toBe('deep');
  expect(mocks.deep).toHaveBeenLastCalledWith('foo', 'bar');
});

test(`fails`, () => {
  expect(() =>
    compare('foo' as any, {}, {})
  ).toThrowErrorMatchingInlineSnapshot(`"Invalid equality kind: foo"`);
});
