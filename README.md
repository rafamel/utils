# aslug

[![Version](https://img.shields.io/npm/v/aslug.svg)](https://www.npmjs.com/package/aslug)
[![Build Status](https://img.shields.io/travis/rafamel/aslug.svg)](https://travis-ci.org/rafamel/aslug)
[![Coverage](https://img.shields.io/coveralls/rafamel/aslug.svg)](https://coveralls.io/github/rafamel/aslug)
[![Dependencies](https://img.shields.io/david/rafamel/aslug.svg)](https://david-dm.org/rafamel/aslug)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/aslug.svg)](https://snyk.io/test/npm/aslug)
[![License](https://img.shields.io/github/license/rafamel/aslug.svg)](https://github.com/rafamel/aslug/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/aslug.svg)](https://www.npmjs.com/package/aslug)

> A lossless *slug* that preserves uniqueness.

If you find it useful, consider [starring the project](https://github.com/rafamel/ts-project) 💪 and/or following [its author](https://github.com/rafamel) ❤️ -there's more on the way!

## Install

[`npm install aslug`](https://www.npmjs.com/package/aslug)

## Features

An example use case for `aslug` would be a set of *ids* that have to be made safe for some character set, while maintaining readability and ensuring they won't conflict with other valid *ids.* Hence, `aslug`:

* Produces a **readable, lossless, encoding.**
* Includes a decoder to **recover the original string.**
* Allows the character set to be modified via options.

## Usage

### `aslug(options?)`

`aslug` takes an `options` *object* and returns an *object* with methods `encode` and `decode` -both taking a *string*.

* [`aslug` documentation](https://rafamel.github.io/aslug/globals.html#aslug)
* [`options` documentation](https://rafamel.github.io/aslug/interfaces/ioptions.html)

Optional `options` fields include:

* An `alphabet` for the payload. Defaults to: `'123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-'`.
* A `separator` to be used between the readable string and the payload. Defaults to `'~'`.
* A `target` regular expression to identify the characters to replace. Defaults to matching all characters not in `alphabet`.
* A `map` function to determine the strategy to use when replacing characters: remove diacritics, leave empty, or any other alternative. Defaults to replacing characters for their *ASCII* equivalent.

```javascript
import aslug from 'aslug';

const { encode, decode } = aslug();

encode('string w/ special chars'); // string-w-special-chars~L42YrSYaHpHrCP63nHvD

decode('string-w-special-chars~L42YrSYaHpHrCP63nHvD'); // string w/ special chars
```
