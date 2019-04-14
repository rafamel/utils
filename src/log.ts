/**
 * Logs a `str` message and, if `options.exit` is passed, exit the process with that code
 */
export default function log(
  str: string,
  options: { exit?: 0 | 1 | 2 } = {}
): void {
  // eslint-disable-next-line no-console
  console.log(str);
  if (options.exit !== undefined) process.exit(options.exit);
}