const { series, remove, confirm, kpo, ensure, log, silent } = require('kpo');
const chalk = require('chalk');

const vars = {
  commit: !!process.env.COMMIT,
  prompt: !!process.env.COMMIT && !process.env.COMMITIZEN,
  validate: process.env.REPO_VALIDATE,
  version: !!process.env.REPO_VERSION
};

module.exports.scripts = {
  bootstrap: 'lerna bootstrap',
  link: 'lerna link',
  build: kpo`:stream build`,
  publish: ['lerna publish --contents pkg from-package', 'git push --tags'],
  validate: [
    vars.prompt &&
      confirm(`Commits should be done via 'kpo commit'. Continue?`, {
        timeout: 5000,
        no: Error()
      }),
    vars.validate
      ? [
          log`${chalk.bold.yellow('\nWARN:')} Validating only ${vars.validate}`,
          kpo`-d ${vars.validate} validate`
        ]
      : kpo`:stream validate`,
    ensure`coverage`,
    'lcov-result-merger ./packages/**/*/coverage/lcov.info coverage/lcov.info',
    kpo`:raise --dry --fail`,
    silent`npm outdated`
  ],
  docs: 'kpo :stream docs',
  update: ['npm update', 'npm outdated'],
  clean: {
    default: kpo`clean.top clean.modules`,
    top: remove([`./pkg`, `./docs`, `./coverage`, `CHANGELOG.md`], {
      confirm: true
    }),
    modules: remove('./node_modules', { confirm: true })
  },
  commit: series.env('git-cz', { COMMITIZEN: '#' }),
  next: series.env(
    'lerna version --no-push --no-commit-hooks --conventional-commits',
    { REPO_VERSION: '#' }
  ),
  /* Hooks */
  postinstall: kpo`bootstrap`,
  $precommit: series.env('kpo validate', { COMMIT: '#' }),
  prepublishOnly: Error(`Publish should be done via 'kpo @root publish'`),
  preversion: !vars.version && Error(`Run 'kpo @root next' instead`),
  version: [!vars.version && kpo`preversion`, 'git add .']
};
