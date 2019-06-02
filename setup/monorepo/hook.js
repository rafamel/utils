const { addHook } = require('pirates');

let remove;
module.exports = function hook(path) {
  if (remove) remove();

  remove = addHook(
    (code, filename) => {
      return code.replace(
        /require\(['"]\.\/project\.config(\.[a-zA-Z])?['"]\)/,
        `require('${path}')`
      );
    },
    { exts: ['.js'], matcher: () => true }
  );
};
