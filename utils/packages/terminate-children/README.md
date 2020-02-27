# terminate-children

[![Version](https://img.shields.io/npm/v/terminate-children.svg)](https://www.npmjs.com/package/terminate-children)
[![Build Status](https://img.shields.io/travis/rafamel/utils/master.svg)](https://travis-ci.org/rafamel/utils)
[![Coverage](https://img.shields.io/coveralls/rafamel/utils/master.svg)](https://coveralls.io/github/rafamel/utils)
[![Dependencies](https://img.shields.io/david/rafamel/utils.svg?path=packages%2Fterminate-children)](https://david-dm.org/rafamel/utils.svg?path=packages%2Fterminate-children)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/terminate-children.svg)](https://snyk.io/test/npm/terminate-children)
[![License](https://img.shields.io/github/license/rafamel/utils.svg)](https://github.com/rafamel/utils/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/terminate-children.svg)](https://www.npmjs.com/package/terminate-children)

> Terminate all children for a process.

## Install

[`npm install terminate-children`](https://www.npmjs.com/package/terminate-children)

## Usage

### `terminate(pid: number, options?: object): Promise<number[]>`

Takes in the `pid` of the parent process to terminate children processes for, and returns a promise resolving in an array with the *pid*s of the children processes still alive.

By default, unless an `options.timeout` is passed, the returned promise won't resolve until all children processes have been successfully terminated, hence it will resolve with an empty array.

* `pid`: **Required,** *number,* the *pid* of the parent process.
* `options`: **Optional,** *object,* with optional keys:
  * `signal`: *string,* signal to send to children. Default: `SIGTERM`.
  * `interval`: *number,* interval in *ms* at which to check whether children processes are still alive for the returned promise. Default: `25`.
  * `timeout`: *number | null,* timeout in *ms* for the returned promise. If `null`, the returned promise won't resolve until all processes have been terminated; if `0`, it will resolve with the processes `pid`s still alive immediately after the `signal` has been sent; otherwise, it will resolve with the processes still alive at `timeout`, if they haven't been all terminated before it is reached. Default: `null`.
  * `filter`: *Function,* filter function for children to send signals to, with signature `(pid: number) => boolean`.

```javascript
import terminate from 'terminate-children';

console.log('Sending SIGTERM to children processes');
terminate(process.pid, { timeout: 5000 }).then(arr => {
  // Return if all children processes have terminated
  if (!arr.length) return;

  // Otherwise, we'll send a SIGKILL, as we've already waited for 5 seconds
  console.log('Sending SIGKILL to children processes');
  return terminate(process.pid, { signal: 'SIGKILL' })
});
```
