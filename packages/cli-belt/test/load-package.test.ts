import { jest, describe, test, expect } from '@jest/globals';

import {
  loadPackageImplementation,
  LoadPackageOptions
} from '../src/load-package/load-package';

function create(findUpMock?: any, readMock?: any): Record<string, any> {
  const res = { findUp: {}, readJSON: { name: 'Foo' } };
  const findUp: any = findUpMock || jest.fn(async () => res.findUp);
  const readJSON: any = readMock || jest.fn(async () => res.readJSON);

  return {
    res,
    findUp,
    readJSON,
    loadPackage(dir: string, options?: LoadPackageOptions) {
      return loadPackageImplementation(dir, options || {}, {
        findUp,
        readJSON
      });
    }
  };
}

describe(`reads package`, () => {
  test(`calls up w/ dir`, async () => {
    const { loadPackage, findUp } = create();
    await loadPackage('foo/bar');
    expect(findUp).toHaveBeenCalledTimes(1);
    expect(findUp).toHaveBeenCalledWith('package.json', {
      cwd: 'foo/bar',
      type: 'file'
    });
  });
  test(`fails if package is not found`, async () => {
    const { loadPackage } = create(async () => null);

    await expect(
      loadPackage('foo/bar')
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"package couldn't be found"`);
  });
  test(`calls readJSON w/ path`, async () => {
    const { loadPackage, readJSON, res } = create();
    await loadPackage('foo/bar');

    expect(readJSON).toHaveBeenCalledTimes(1);
    expect(readJSON.mock.calls[0][0]).toBe(res.findUp);
  });
  test(`fails on package read error`, async () => {
    const { loadPackage } = create(null, () => {
      return Promise.reject(new Error('foo'));
    });

    await expect(loadPackage('foo/bar')).rejects.toThrowError();
  });
});
describe(`normalize`, () => {
  test(`is active by default`, async () => {
    const { loadPackage } = create();
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
    const { loadPackage } = create();
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
    const { loadPackage, res } = create();
    await expect(loadPackage('foo/bar', { normalize: false })).resolves.toBe(
      res.readJSON
    );
  });
});
describe(`process.title`, () => {
  test(`is not set by default`, async () => {
    const { loadPackage } = create();
    await loadPackage('foo/bar');
    expect(process.title).not.toBe('Foo');
  });
  test(`title = false`, async () => {
    const { loadPackage } = create();
    await loadPackage('foo/bar');
    expect(process.title).not.toBe('Foo');
  });
  test(`title = false & !pkg.name`, async () => {
    const { loadPackage } = create(null, async () => ({}));
    await loadPackage('foo/bar', { title: true });
    expect(process.title).not.toBe('Foo');
  });
  test(`title = true`, async () => {
    const { loadPackage } = create();
    await loadPackage('foo/bar', { title: true });
    expect(process.title).toBe('Foo');
  });
});
