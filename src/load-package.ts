import up from 'find-up';
import fs from 'fs-extra';
import normalize, { Package } from 'normalize-package-data';
import { rejects } from 'errorish';

export interface ILoadPackageOpts {
  /**
   * Normalizes the `package.json` data. [See normalization details.](https://www.npmjs.com/package/normalize-package-data#what-normalization-currently-entails) Default: `true`.
   */
  normalize?: boolean;
  /**
   * Sets process.title to the package name -if available. Default: `false`.
   */
  title?: boolean;
}

/**
 * It will find and return the contents of the first `package.json` found, recursing up, starting on `dir`. It can optionally normalize the data and set the `process.title` to the package name.
 */
export default async function loadPackage(
  dir: string,
  options?: ILoadPackageOpts
): Promise<Package> {
  const opts = Object.assign({ normalize: true, title: false }, options);

  const path = await up('package.json', { cwd: dir, type: 'file' });
  if (!path) throw Error(`package couldn't be found`);

  const pkg = await fs.readJSON(path).catch(rejects);

  if (opts.normalize) normalize(pkg);

  if (opts.title && pkg.name && pkg.name.length) process.title = pkg.name;

  return pkg;
}
