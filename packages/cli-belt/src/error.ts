import process from 'node:process';

import chalk from 'chalk';

export interface Logger extends Record<string, any> {
  error: (message: any) => void;
  debug: (message: any) => void;
}

export interface ErrorOptions {
  exit?: 0 | 1 | 2;
  logger?: Logger;
  debug?: boolean;
}

/**
 * Formats and prints an error message.
 *
 * `options`:
 *  - `exit`: if passed, it will exit the process with that code.
 *  - `logger`: if passed, it will use that instead of console.error
 *  - `debug`: if true, it will also log the error itself after its message -if logger is passed, it will use logger.debug instead of console.debug
 */
export function error(err: Error, options?: ErrorOptions): void {
  const logger = (options && options.logger) || console;
  logger.error(chalk.bold.red('Error: ') + chalk.bold(err.message));
  if (options && options.debug) logger.debug(err);
  if (options && options.exit !== undefined) process.exit(options.exit);
}
