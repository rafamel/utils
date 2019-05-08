// prettier-ignore
const { series, parallel, ensure, line, json, log, confirm, rm, remove, copy, kpo, silent } = require('kpo');
const path = require('path');
const { merge } = require('slimconf');
const project = require('./project.config');

// prettier-ignore
verify('nodeOnly', 'typescript', 'ext.js', 'ext.ts', 'paths.docs', 'release.build', 'release.docs');
const vars = {
  node: !!project.nodeOnly,
  prompt: !project.monorepo && !!process.env.COMMIT && !process.env.COMMITIZEN,
  version: !!process.env.REPO_VERSION,
  ext: extensions(),
  dotExt: '.' + extensions().replace(/,/g, ',.')
};

const guardian = project.monorepo && Error(`Task should be run monorepo-wide`);
module.exports.scripts = {
  start: kpo`watch`,
  build: {
    default: kpo`validate build.force`,
    force: series.env('kpo build.pack build.types', { NODE_ENV: 'production' }),
    $pack: [ensure`./pkg`, 'pack build', copy(['.npmignore'], './pkg')].concat(
      vars.node && [
        line`babel src --out-dir ./pkg/dist-node
          --extensions ${vars.dotExt} --source-maps inline`,
        json('./pkg/package.json', (pkg) => {
          if (pkg.main || pkg.module || pkg.esnext) throw Error(`!node pack`);
          return merge(pkg, { main: 'dist-node/index.js' });
        })
      ]
    ),
    $types: project.typescript && [
      `ttsc --project ttsconfig.json --outDir ./pkg/dist-types/`,
      json('./pkg/package.json', (pkg) => {
        return merge(pkg, { types: 'dist-types/index.d.ts' });
      }),
      log`Declaration files built`
    ]
  },
  publish: [
    series('npm publish', { cwd: './pkg' }),
    !project.monorepo && ['git push', 'git push --tags']
  ],
  watch: {
    default: line`onchange ./src/**/*.{${vars.ext}}
      --initial --kill -- kpo watch.task`,
    $task: [
      log`\x1Bc⚡`,
      parallel(['kpo build.pack build.types', 'kpo lint'], {
        names: ['build', 'eslint'],
        colors: ['blue', 'yellow']
      })
    ]
  },
  fix: {
    default: kpo`fix.format fix.scripts`,
    format: `prettier --write ./**/*.{${vars.ext},json,scss}`,
    scripts: kpo`:raise --confirm --fail`
  },
  types: project.typescript && 'tsc --noEmit --emitDeclarationOnly false',
  lint: {
    default: `eslint ./src ./test --ext ${vars.dotExt}`,
    md: line`markdownlint README.md
      --config ${path.join(__dirname, 'markdown.json')}`,
    scripts: kpo`:raise --dry --fail`
  },
  test: {
    default: kpo`lint types test.force`,
    force: series.env('jest', { NODE_ENV: 'test' }),
    watch: {
      default: line`onchange ./{src,test}/**/*.{${vars.ext}}
        --initial --kill -- kpo test.watch.task`,
      $task: [log`\x1Bc⚡`, kpo`test`]
    }
  },
  validate: [
    vars.prompt &&
      confirm(`Commits should be done via 'kpo commit'. Continue?`, {
        timeout: 5000,
        no: Error()
      }),
    kpo`test lint.md lint.scripts`,
    silent`npm outdated`
  ],
  docs: project.typescript && [
    rm`${project.paths.docs}`,
    `typedoc ./src --out "${project.paths.docs}"`
  ],
  changelog:
    guardian || 'conventional-changelog -p angular -i CHANGELOG.md -s -r 0',
  update: ['npm update', 'npm outdated'],
  clean: {
    default: kpo`clean.top clean.modules`,
    top: remove(
      [`./pkg`, `${project.paths.docs}`, `./coverage`, `CHANGELOG.md`],
      { confirm: true }
    ),
    modules: remove('./node_modules', { confirm: true })
  },
  commit: project.monorepo
    ? series.env('kpo @root commit --', { REPO_VALIDATE: project.paths.root })
    : series.env('git-cz', { COMMITIZEN: '#' }),
  /* Hooks */
  $precommit: series.env('kpo validate', { COMMIT: '#' }),
  prepublishOnly: Error(`Publish should be done via 'kpo publish'`),
  preversion: (!vars.version && guardian) || [
    log`Recommended version bump is:`,
    'conventional-recommended-bump --preset angular --verbose',
    confirm({ no: Error() })
  ],
  version: [
    !vars.version && kpo`preversion`,
    !project.monorepo && kpo`changelog`,
    project.release.docs && kpo`docs`,
    project.release.build && kpo`build`,
    'git add .'
  ]
};

function verify(...arr) {
  arr.forEach((key) => project.get(key));
}

function extensions() {
  return (project.typescript ? project.ext.ts.split(',') : [])
    .concat(project.ext.js)
    .filter(Boolean)
    .join(',');
}
