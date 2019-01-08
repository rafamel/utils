const path = require('path');
const scripts = (x) => ({ scripts: x });
const exit0 = (x) => `${x} || shx echo `;
const series = (...x) => `(${x.join(') && (')})`;
const dir = (file) => path.join(CONFIG_DIR, file);
const ts = (cmd) => (TYPESCRIPT ? cmd : 'shx echo');
const dotted = (ext) => '.' + ext.replace(/,/g, ',.');
const {
  OUT_DIR,
  DOCS_DIR,
  CONFIG_DIR,
  EXTENSIONS,
  TYPESCRIPT
} = require('./project.config');

process.env.LOG_LEVEL = 'disable';
module.exports = scripts({
  build: series(
    'nps validate',
    exit0(`shx rm -r ${OUT_DIR}`),
    `shx mkdir ${OUT_DIR}`,
    `jake fixpackage["${OUT_DIR}"]`,
    'nps private.build docs'
  ),
  publish: `nps build && cd ${OUT_DIR} && npm publish`,
  watch: `onchange "./src/**/*.{${EXTENSIONS}}" --initial --kill -- nps private.watch`,
  fix: [
    'prettier',
    `--write "./**/*.{${EXTENSIONS},.json,.scss}"`,
    `--config "${dir('.prettierrc.js')}"`,
    `--ignore-path "${dir('.prettierignore')}"`
  ].join(' '),
  lint: {
    default: [
      'concurrently',
      `"eslint ./src --ext ${dotted(EXTENSIONS)} -c ${dir('.eslintrc.js')}"`,
      `"${ts(`tslint ./src/**/*.{ts,tsx} -c ${dir('tslint.json')}`)}"`,
      '-n eslint,tslint',
      '-c yellow,blue'
    ].join(' '),
    types: ts('tsc --noEmit'),
    test: `eslint ./test --ext ${dotted(EXTENSIONS)} -c ${dir('.eslintrc.js')}`,
    md: `markdownlint *.md --config ${dir('markdown.json')}`,
    scripts: 'jake lintscripts[' + __dirname + ']'
  },
  test: {
    default: series('nps lint.test', `cross-env NODE_ENV=test jest`),
    watch: `onchange "./{test,src}/**/*.{${EXTENSIONS}}" --initial --kill -- nps private.test_watch`
  },
  validate:
    'nps lint lint.types lint.md lint.scripts test private.validate_last',
  update: series('npm update --save/save-dev', 'npm outdated'),
  clean: series(
    exit0(`shx rm -r ${OUT_DIR} ${DOCS_DIR} coverage`),
    'shx rm -rf node_modules'
  ),
  docs: series(
    exit0(`shx rm -r ${DOCS_DIR}`),
    ts(`typedoc --out ${DOCS_DIR} ./src`)
  ),
  // Private
  private: {
    build: [
      'concurrently',
      `"babel src --out-dir ${OUT_DIR} --extensions "${dotted(
        EXTENSIONS
      )}" --source-maps inline"`,
      `"${ts(`tsc --emitDeclarationOnly --outDir ${OUT_DIR}`)}"`,
      '-n babel,tsc',
      '-c green,magenta'
    ].join(' '),
    watch: series(
      'jake clear',
      'shx echo "____________\n"',
      'concurrently "nps private.build" "nps lint"'
    ),
    test_watch: series('jake clear', 'nps test'),
    validate_last: `npm outdated || jake countdown`
  }
});
