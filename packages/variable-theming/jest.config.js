const hook = require('../../setup/monorepo/hook');

hook(require.resolve('./project.config'));
const jest = require('../../setup/jest.config');

module.exports = {
  ...jest,
  modulePathIgnorePatterns: jest.modulePathIgnorePatterns.concat([])
};
