const kpo = require('kpo');
const { scripts } = require('./project.config');

module.exports.scripts = {
  ...scripts,
  bootstrap: 'lerna bootstrap',
  link: 'lerna link',
  docs: [scripts.docs, kpo.copy('./assets/index.html', './docs/index.html')],

  /* Hooks */
  postinstall: 'kpo bootstrap'
};
