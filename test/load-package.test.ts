import loadPackage from '~/load-package';
import up from 'find-up';
import fs from 'fs-extra';
import { IOfType } from '~/types';

jest.mock('find-up');
jest.mock('fs-extra');

const mocks: IOfType<jest.Mock<any, any>> = {
  up,
  read: fs.readJSON
} as any;

beforeEach(() => Object.values(mocks).forEach((mock) => mock.mockClear()));

const res = { up: {}, read: { name: 'Foo' } };
mocks.up.mockImplementation(async () => res.up);
mocks.read.mockImplementation(async () => res.read);

describe(`reads package`, () => {
  test(`calls up w/ dir`, async () => {
    await loadPackage('foo/bar');
    expect(mocks.up).toHaveBeenCalledTimes(1);
    expect(mocks.up).toHaveBeenCalledWith('package.json', { cwd: 'foo/bar' });
  });
  test(`fails if package is not found`, async () => {
    mocks.up.mockImplementationOnce(async () => null);

    await expect(
      loadPackage('foo/bar')
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"package couldn't be found"`);
  });
  test(`calls readJSON w/ path`, async () => {
    await loadPackage('foo/bar');

    expect(mocks.read).toHaveBeenCalledTimes(1);
    expect(mocks.read.mock.calls[0][0]).toBe(res.up);
  });
  test(`fails on package read error`, async () => {
    mocks.read.mockImplementationOnce(() => Promise.reject(Error()));

    await expect(loadPackage('foo/bar')).rejects.toThrowError();
  });
});
describe(`normalize`, () => {
  test(`is active by default`, async () => {
    await expect(loadPackage('foo/bar', { normalize: true })).resolves
      .toMatchInlineSnapshot(`
            Object {
              "_id": "Foo@",
              "name": "Foo",
              "readme": "ERROR: No README data found!",
              "version": "",
            }
          `);
  });
  test(`normalize = true`, async () => {
    await expect(loadPackage('foo/bar')).resolves.toMatchInlineSnapshot(`
            Object {
              "_id": "Foo@",
              "name": "Foo",
              "readme": "ERROR: No README data found!",
              "version": "",
            }
          `);
  });
  test(`normalize = false`, async () => {
    await expect(loadPackage('foo/bar', { normalize: false })).resolves.toBe(
      res.read
    );
  });
});
describe(`process.title`, () => {
  test(`is not set by default`, async () => {
    await loadPackage('foo/bar');
    expect(process.title).not.toBe('Foo');
  });
  test(`title = false`, async () => {
    await loadPackage('foo/bar');
    expect(process.title).not.toBe('Foo');
  });
  test(`title = false & !pkg.name`, async () => {
    mocks.read.mockImplementationOnce(async () => ({}));
    await loadPackage('foo/bar', { title: true });
    expect(process.title).not.toBe('Foo');
  });
  test(`title = true`, async () => {
    await loadPackage('foo/bar', { title: true });
    expect(process.title).toBe('Foo');
  });
});
