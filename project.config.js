const path = require('path');
const { default: create } = require('@riseup/monorepo');

module.exports = create({
  // Paths used on build
  paths: {
    root: __dirname,
    docs: path.join(__dirname, 'docs')
  },
  packages: {
    content: 'pkg'
  }
});
