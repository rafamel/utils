const { series, remove, kpo, ensure, silent } = require('kpo');

const vars = {
  validate: process.env.VALIDATE,
  semantic: !!process.env.SEMANTIC,
  release: !!process.env.RELEASE,
  commitizen: !!process.env.COMMITIZEN
};

module.exports.scripts = {
  bootstrap: 'lerna bootstrap',
  link: 'lerna link',
  build: kpo`:stream build`,
  commit: series.env('git-cz', { COMMITIZEN: '#' }),
  semantic: series.env(
    'lerna version --no-push --no-commit-hooks --conventional-commits',
    { SEMANTIC: '#' }
  ),
  release: [
    series.env('lerna publish --contents pkg from-package', { RELEASE: '#' }),
    ['git push', 'git push --tags']
  ],
  validate: [
    vars.validate ? `kpo -d ${vars.validate} validate` : 'kpo :stream validate',
    ensure`coverage`,
    'lcov-result-merger ./packages/**/*/coverage/lcov.info coverage/lcov.info',
    kpo`:raise --dry --fail`,
    silent`npm outdated`
  ],
  docs: 'kpo :stream docs',
  update: ['npm update', 'npm outdated'],
  outdated: 'npm outdated',
  clean: {
    default: kpo`clean.top clean.modules`,
    top: remove([`./pkg`, `./docs`, `./coverage`, `CHANGELOG.md`], {
      confirm: true
    }),
    modules: remove('./node_modules', { confirm: true })
  },
  /* Hooks */
  postinstall: kpo`bootstrap`,
  $precommit: [
    !vars.commitizen && Error(`Commit by running 'kpo commit'`),
    kpo`validate`
  ],
  prepublishOnly: !vars.release && Error(`Run 'kpo release'`),
  preversion: !vars.semantic && Error(`Run 'kpo semantic'`),
  version: 'git add .'
};
