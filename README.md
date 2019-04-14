# cli-belt

[![Version](https://img.shields.io/npm/v/cli-belt.svg)](https://www.npmjs.com/package/cli-belt)
[![Build Status](https://img.shields.io/travis/rafamel/cli-belt.svg)](https://travis-ci.org/rafamel/cli-belt)
[![Coverage](https://img.shields.io/coveralls/rafamel/cli-belt.svg)](https://coveralls.io/github/rafamel/cli-belt)
[![Dependencies](https://img.shields.io/david/rafamel/cli-belt.svg)](https://david-dm.org/rafamel/cli-belt)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/cli-belt.svg)](https://snyk.io/test/npm/cli-belt)
[![License](https://img.shields.io/github/license/rafamel/cli-belt.svg)](https://github.com/rafamel/cli-belt/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/cli-belt.svg)](https://www.npmjs.com/package/cli-belt)

<!-- markdownlint-disable MD036 -->
**An utility belt to complement your arguments parser of choice.**
<!-- markdownlint-enable MD036 -->

## Install

[`npm install cli-belt`](https://www.npmjs.com/package/cli-belt)

## Basics

Most solutions for creating command line interfaces have too high of a degree of magic going on that prevents proper control over how arguments are parsed, which arguments are parsed, and so on. On the other hand, using barebones argument parsers can require much boilerplate. `cli-belt` intends to complement the later, reducing the amount of boilerplate needed. I've found [`arg`](https://github.com/zeit/arg) to be a blissful middle ground for argument parsing, but which parser you use is entirely up to you.

These are all of `cli-belt`'s helper functions -[see docs:](https://rafamel.github.io/cli-belt/globals.html)

* [`flags`](https://rafamel.github.io/cli-belt/globals.html#flags) parses a `help` string and returns an object with options, aliases, arguments, and descriptions.
* [`safePairs`](https://rafamel.github.io/cli-belt/globals.html#safepairs) ensures all properties of an object exist in another.
* [`splitBy`](https://rafamel.github.io/cli-belt/globals.html#splitby) splits an arguments array into two arrays by the first `separator`.
* [`error`](https://rafamel.github.io/cli-belt/globals.html#error) formats and prints an error message, optionally exiting the process.
* [`log`](https://rafamel.github.io/cli-belt/globals.html#log) prints a message, optionally exiting the process.
* [`tail`](https://rafamel.github.io/cli-belt/globals.html#tail) can normalize suffixed spaces across strings of different length.

## Usage example

`example.js`:

```javascript
import up from 'read-pkg-up';
import arg from 'arg';
import { flags, safePairs, log, splitBy, error } from 'cli-belt';
import { stripIndent as indent } from 'common-tags';
import logger from 'loglevel';
import spawn from 'await-spawn';

main().catch((err) => error(err, { exit: 1, debug: true, logger }));

export default async function main() {
  // Get name and description from `package.json`
  const { pkg } = await up();
  if (pkg.name) process.title = pkg.name;

  const help = indent`
    ${pkg.description || ''}

    Usage: example [options] -- [echoArgs]

    Options:
      -e, --env <environment>    Node environment
      -h, --help                 Show help
      -v, --version              Show version number

    Examples:
      $ example -v
      $ example --help
      $ example -- "this will get printed because we're spawning echo"
  `;

  // Get flags and aliases from help
  const { options, aliases } = flags(help);

  // Define option types
  const types = {
    '--env': String,
    '--help': Boolean,
    '--version': Boolean
  };

  // Ensure all parsed flags have a defined type,
  // and that they have all been successfully parsed and exist on help
  safePairs(types, options, { fail: true, bidirectional: true });

  // Add aliases to the ones explicitly typed
  Object.assign(types, aliases);

  // Only pass to `arg` arguments before '--'
  // arguments after '--' will be passed to spawn
  const [argv, args] = splitBy(process.argv.slice(2), '--');
  const cmd = arg(types, {
    argv,
    permissive: false,
    stopAtPositional: true
  });

  // Handle options
  if (cmd._.length) throw Error(`Unknown command ${cmd._[0]}`);
  if (cmd['--help']) return log(help);
  if (cmd['--version']) return log(pkg.version);

  const env = cmd['--env'] ? { NODE_ENV: cmd['--env'] } : {};
  await spawn('echo', args, { env, stdio: 'inherit' });
}
```