import process from 'node:process';

import { ensure } from 'errorish';
import normalize, { type Package } from 'normalize-package-data';

export interface LoadPackageOptions {
  /**
   * Normalizes the `package.json` data. [See normalization details.](https://www.npmjs.com/package/normalize-package-data#what-normalization-currently-entails) Default: `true`.
   */
  normalize?: boolean;
  /**
   * Sets process.title to the package name -if available. Default: `false`.
   */
  title?: boolean;
}

export async function loadPackageImplementation(
  dir: string,
  options: LoadPackageOptions | undefined,
  deps: {
    findUp: (
      file: string,
      options: { cwd: string; type: 'file' }
    ) => Promise<string | null | undefined>;
    readJSON: (file: string) => Promise<any>;
  }
): Promise<Package> {
  const opts = Object.assign({ normalize: true, title: false }, options);

  const path = await deps.findUp('package.json', { cwd: dir, type: 'file' });
  if (!path) throw new Error(`package couldn't be found`);

  const pkg = await deps
    .readJSON(path)
    .catch((err) => Promise.reject(ensure(err)));

  if (opts.normalize) normalize(pkg);

  if (opts.title && pkg.name && pkg.name.length) process.title = pkg.name;

  return pkg;
}
