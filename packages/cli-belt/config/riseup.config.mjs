import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { resolve } from 'import-meta-resolve';

import project from './project.config.mjs';

export default Promise.resolve(import.meta.dirname)
  .then((dir) => path.join(dir, '../../../provision/'))
  .then((from) => import(resolve('@riseup/universal', pathToFileURL(from))))
  .then(({ Universal }) => {
    return new Universal({
      contents: {
        // Destination folder for assets and/or package.json
        destination: project.build.destination,
        // Clean destination folder before
        clean: true,
        // Path of assets to copy into destination folder
        assets: null,
        // Copy package.json and optionally override its properties
        package: false
      },
      tarball: {
        // Package tarball file name
        destination: null,
        // Subdirectory to tarball
        contents: null,
        // Enable monorepo dependencies inclusion in tarball
        monorepo: false
      },
      release: {
        // Push to remote
        push: false,
        // Require git working dir to be clean
        requireCleanWorkingDir: true,
        // Scripts to run before and after release
        scripts: { before: ['version'], after: [] }
      },
      distribute: {
        // Push to remote
        push: true,
        // Package registry
        registry: null,
        // Subdirectory to publish
        contents: null
      }
    });
  });
