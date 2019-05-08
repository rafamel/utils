const hook = require('../../setup/hook');

hook(require.resolve('./project.config'));
module.exports = require('../../setup/.eslintrc');
