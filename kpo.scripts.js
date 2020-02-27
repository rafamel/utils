const kpo = require('kpo');
const { scripts } = require('./project.config');

module.exports.scripts = {
  ...scripts,
  bootstrap: 'lerna bootstrap',
  link: 'lerna link',

  /* Hooks */
  postinstall: 'kpo bootstrap',
  preversion: [
    scripts.preversion,
    kpo.copy('./assets/index.html', './docs/index.html')
  ]
};
