import {
  recreate,
  lift,
  exec,
  catches,
  series,
  context,
  create,
  copy
} from 'kpo';

import riseup from './riseup.config.mjs';

export default recreate({ announce: true }, () => {
  const tasks = {
    run: riseup.tasks.run,
    execute: riseup.tasks.execute,
    build: series(
      exec('lerna', ['link']),
      context({ args: ['build'] }, riseup.tasks.run)
    ),
    lint: riseup.tasks.lintmd,
    coverage: riseup.tasks.coverage,
    commit: riseup.tasks.commit,
    release: context({ args: ['--no-verify'] }, riseup.tasks.release),
    distribute: riseup.tasks.distribute,
    validate: series(
      exec('lerna', ['link']),
      context({ args: ['validate'] }, riseup.tasks.run),
      create(() => tasks.version)
    ),
    /* Hooks */
    postinstall: series(
      exec('lerna', ['bootstrap', '--ci']),
      create(() => tasks.build)
    ),
    preversion: copy('./assets/index.html', './docs/index.html', {
      single: true,
      exists: 'overwrite'
    }),
    version: series(
      create(() => tasks.lint),
      create(() => tasks.coverage),
      lift({ purge: true, mode: 'audit' }, () => tasks),
      catches({ level: 'silent' }, exec('npm', ['outdated']))
    )
  };
  return tasks;
});
