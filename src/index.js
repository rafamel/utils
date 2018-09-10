module.exports = function aslug(
  str,
  {
    target = /[^a-zA-Z0-9]/,
    separation = '_',
    trim = false,
    replace = (char) => char.charCodeAt()
  } = {}
) {
  const joinStr = trim ? separation : '';
  const getCharStr = trim
    ? (char) => replace(char)
    : (char) => separation + replace(char) + separation;

  function runSlug(arr, last) {
    if (!last) return arr.join(joinStr);

    const index = last.search(target);
    if (index === -1) return arr.concat(last).join(joinStr);

    const a = last.slice(0, index);
    const b = last.slice(index, index + 1);
    const c = last.slice(index + 1);

    if (a) arr.push(a);
    arr.push(getCharStr(b));
    return runSlug(arr, c);
  }

  return runSlug([], str);
};
