const hook = require('../../setup/hook');

hook(require.resolve('./project.config'));
const typedoc = require('../../setup/typedoc');

module.exports = {
  ...typedoc,
  exclude: typedoc.exclude.concat([
    '**/src/constants.ts',
    '**/src/encode.ts',
    '**/src/decode.ts'
  ])
};
