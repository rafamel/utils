import chalk from 'chalk';
import { IOfType } from './types';

export type TLogger = IOfType<any> & {
  error: (message: any) => void;
  debug: (message: any) => void;
};

/**
 * Formats and logs an error message.
 *
 * `options`:
 *  - `exit`: if passed, it will exit the process with that code.
 *  - `logger`: if passed, it will use that instead of console.error
 *  - `debug`: if true, it will also log the error itself after its message -if logger is passed, it will use logger.debug instead of console.debug
 */
export default function error(
  err: Error,
  options: { exit?: 0 | 1 | 2; logger?: TLogger; debug?: boolean } = {}
): void {
  const logger = options.logger || console;
  logger.error(chalk.bold.red('Error: ') + chalk.bold(err.message));
  if (options.debug) logger.debug(err);
  if (options.exit !== undefined) process.exit(options.exit);
}
