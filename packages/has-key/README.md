# has-key

[![Version](https://img.shields.io/npm/v/has-key.svg)](https://www.npmjs.com/package/has-key)
[![Build Status](https://img.shields.io/travis/rafamel/utils/master.svg)](https://travis-ci.org/rafamel/utils)
[![Coverage](https://img.shields.io/coveralls/rafamel/utils/master.svg)](https://coveralls.io/github/rafamel/utils)
[![Dependencies](https://img.shields.io/david/rafamel/utils.svg?path=packages%2Fhas-key)](https://david-dm.org/rafamel/utils.svg?path=packages%2Fhas-key)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/has-key.svg)](https://snyk.io/test/npm/has-key)
[![License](https://img.shields.io/github/license/rafamel/utils.svg)](https://github.com/rafamel/utils/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/has-key.svg)](https://www.npmjs.com/package/has-key)

> Confirms objects have a key or a set of keys as direct or inherited properties.

## Install

[`npm install has-key`](https://www.npmjs.com/package/has-key)

## Usage

As a notable difference with `Object.hasOwnProperty`, `has-key` functions will return `false` if a property exists but its value is `undefined`. As another key difference, some `has-key`'s functions will also return `true` for inherited properties.

If a `kind` is passed, it must be any of the following: `'null'`, `'boolean'`, `'number'`, `'string'`, `'object'`, `'array'`, `'symbol'`, `'function'`.

### `hasKey(item: any, key: string | string[], kind?: string): boolean`

Returns `true` if `item` is an object where `key`'s values are **not `undefined`.**

If a `kind` is passed, it will only return `true` if the specified properties have values of that type.

### `hasOwnKey(item: any, key: string | string[], kind?: string): boolean`

Similar to `hasKey`, with the difference that it will only return `true` for direct properties of an object.

### `hasAnyKey(item: any, keys: string[], kind?: string): boolean`

Returns `true` if `item` is an object where any of the `keys`' values are **not `undefined`.**

If a `kind` is passed, it will return `true` if any of the `keys`' values are of that specific type.

### `hasAnyOwnKey(item: any, keys: string[], kind?: string): boolean`

Similar to `hasAnyKey`, with the difference that it will only return `true` for direct properties of an object.
