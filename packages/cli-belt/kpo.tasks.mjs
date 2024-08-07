import path from 'node:path';

import project from './config/project.config.mjs';
import defaults from './config/riseup.config.mjs';
import pkg from './package.json' with { type: 'json' };

export default Promise.resolve(defaults)
  .then(({ tasks }) => tasks)
  .then(({ commit, contents, distribute, release, tarball }) => {
    return ({ catches, create, exec, finalize, lift, recreate, series }) => {
      const tasks = {
        start: exec('node', [project.build.destination]),
        watch: exec('tsx', ['--watch', './src']),
        build: series(
          contents,
          exec('tsup', ['--config', './config/tsup.config.mts'])
        ),
        tarball,
        docs: exec('typedoc', [
          ...['--out', path.join('../../docs', pkg.name)],
          ...['--options', './config/typedoc.config.json']
        ]),
        lint: finalize(
          exec('eslint', ['.']),
          exec('tsc', ['--noEmit']),
          exec('prettier', ['.', '--log-level', 'warn', '--cache', '--check'])
        ),
        fix: series(
          exec('eslint', ['.', '--fix']),
          exec('prettier', ['.', '--log-level', 'warn', '--write'])
        ),
        test: exec('vitest', ['-c', './config/vitest.config.mts']),
        commit,
        release,
        distribute,
        validate: series(
          create(() => tasks.lint),
          create(() => tasks.test),
          lift(
            {
              purge: true,
              mode: 'audit',
              bin: '../../provision/node_modules/.bin/kpo'
            },
            () => tasks
          ),
          catches({ level: 'silent' }, exec('npm', ['audit']))
        ),
        /* Hooks */
        version: series(
          create(() => tasks.validate),
          create(() => tasks.build),
          create(() => tasks.docs)
        )
      };
      return recreate({ announce: true }, tasks);
    };
  });
