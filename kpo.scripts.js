const { scripts } = require('./project.config');

module.exports.scripts = {
  ...scripts,
  bootstrap: 'lerna bootstrap',
  link: 'lerna link',

  /* Hooks */
  postinstall: 'kpo bootstrap'
};
