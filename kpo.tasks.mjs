import defaults from './riseup.config.mjs';

export default Promise.resolve(defaults)
  .then(({ tasks }) => tasks)
  .then(({ commit, coverage, distribute }) => {
    return ({ catches, copy, create, exec, lift, recreate, series }) => {
      const tasks = {
        build: exec('npm', ['run', 'build', '-ws']),
        commit,
        coverage,
        release: exec('lerna', [
          ...['version', '--no-push', '--conventional-commits'],
          ...['--concurrency', '1']
        ]),
        distribute,
        validate: series(
          create(() => tasks['validate:root']),
          exec('npm', ['run', 'validate', '-ws'])
        ),
        'validate:root': series(
          create(() => tasks.coverage),
          lift(
            {
              purge: { keep: ['postinstall'] },
              mode: 'audit',
              bin: './provision/node_modules/.bin/kpo'
            },
            () => tasks
          ),
          catches({ level: 'silent' }, exec('npm', ['audit']))
        ),
        /* Hooks */
        preversion: copy('./assets/index.html', './docs/index.html', {
          single: true,
          exists: 'overwrite'
        }),
        version: series(
          create(() => tasks['validate:root']),
          exec('npm', ['run', 'version', '-ws'])
        )
      };
      return recreate({ announce: true }, tasks);
    };
  });
