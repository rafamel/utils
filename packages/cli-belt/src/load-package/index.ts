import fs from 'node:fs';

import { findUp } from 'find-up';
import type { Package } from 'normalize-package-data';

import {
  type LoadPackageOptions,
  loadPackageImplementation
} from './load-package';

/**
 * It will find and return the contents of the first `package.json` found, recursing up, starting on `dir`. It can optionally normalize the data and set the `process.title` to the package name.
 */
async function loadPackage(
  dir: string,
  options?: LoadPackageOptions
): Promise<Package> {
  return loadPackageImplementation(dir, options, {
    findUp,
    readJSON: (file: string) => {
      return fs.promises
        .readFile(file)
        .then((content) => JSON.parse(String(content)));
    }
  });
}

export type { LoadPackageOptions };
export { loadPackage };
