# aslug

[![Version](https://img.shields.io/npm/v/aslug.svg)](https://www.npmjs.com/package/aslug)
[![Types](https://img.shields.io/npm/types/aslug.svg)](https://www.npmjs.com/package/aslug)
[![License](https://img.shields.io/github/license/rafamel/aslug.svg)](https://github.com/rafamel/aslug/blob/master/LICENSE)

> A lossless slug that preserves uniqueness.

## Install

[`npm install aslug`](https://www.npmjs.com/package/aslug)

## Features

An example use case for `aslug` would be a set of *ids* that have to be made safe for some character set, while maintaining readability and ensuring they won't conflict with other valid *ids.* Hence, `aslug`:

* Produces a **readable, lossless, encoding.**
* Includes a decoder to **recover the original string.**
* Allows the character set to be modified via options.

## Usage

### `new Slug(alphabet?: string | null, options?: Slug.Options)`

* [`Slug` documentation](https://rafamel.github.io/utils/aslug/classes/Slug-1.html)

The `Slug` class optionally takes an `alphabet` *string* and an `options` *object*.

* `alphabet` defaults to: `'0123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-'`
* `options` fields include:
  * A `separator` to be used between the readable string and the payload. Defaults to `'.'`.
  * A `map` function to determine the strategy to use when replacing characters with a string within `alphabet` -otherwise an empty string. It can be used to remove diacritics, leave empty, or any other alternative. Defaults to replacing characters for their *ASCII* equivalent, if in `alphabet`.

### Simple example

```javascript
import { Slug } from 'aslug';

const slug = new Slug();

slug.encode('string w/ special chars'); // string-w-special-chars.EjhdB6y8T2PsDU0e6zUv
slug.decode('string-w-special-chars.EjhdB6y8T2PsDU0e6zUv'); // string w/ special chars
```
