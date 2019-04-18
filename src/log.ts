export interface ILogOpts {
  /**
   * If passed, `log` will exit the process with that code.
   */
  exit?: 0 | 1 | 2;
}

/**
 * Prints a `str` message.
 */
export default function log(str: string, options: ILogOpts = {}): void {
  // eslint-disable-next-line no-console
  console.log(str);
  if (options.exit !== undefined) process.exit(options.exit);
}
