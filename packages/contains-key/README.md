# contains-key

[![Version](https://img.shields.io/npm/v/contains-key.svg)](https://www.npmjs.com/package/contains-key)
[![Build Status](https://img.shields.io/travis/rafamel/utils/master.svg)](https://travis-ci.org/rafamel/utils)
[![Coverage](https://img.shields.io/coveralls/rafamel/utils/master.svg)](https://coveralls.io/github/rafamel/utils)
[![Dependencies](https://img.shields.io/david/rafamel/utils.svg?path=packages%2Fcontains-key)](https://david-dm.org/rafamel/utils.svg?path=packages%2Fcontains-key)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/contains-key.svg)](https://snyk.io/test/npm/contains-key)
[![License](https://img.shields.io/github/license/rafamel/utils.svg)](https://github.com/rafamel/utils/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/contains-key.svg)](https://www.npmjs.com/package/contains-key)

> Confirms objects have a key or a set of keys as direct or inherited properties.

## Install

[`npm install contains-key`](https://www.npmjs.com/package/contains-key)

## Usage

As a notable difference with `Object.hasOwnProperty`, `contains-key` functions will return `false` if a property exists but its value is `undefined`. As another key difference, some `contains-key`'s functions will also return `true` for inherited properties.

If a `kind` is passed, it must be any of the following: `'null'`, `'boolean'`, `'number'`, `'string'`, `'object'`, `'array'`, `'symbol'`, `'function'`.

### `containsKey(item: any, key: string | string[], kind?: string): boolean`

Returns `true` if `item` is an object where `key`'s values are **not `undefined`.**

If a `kind` is passed, it will only return `true` if the specified properties have values of that type.

```javascript
import { containsKey } from 'contains-key';

const source = { foo: 'foo', bar: undefined };
const inherited = Object.create(source, {});

containsKey(source, 'foo'); // true
containsKey(inherited, 'foo'); // true

containsKey(source, 'bar'); // false;
containsKey(inherited, 'bar'); // false

containsKey(source, 'baz'); // false
containsKey(inherited, 'baz'); // false

containsKey(source, ['foo', 'bar', 'baz']); // false
containsKey(inherited, ['foo', 'bar', 'baz']); // false

containsKey(source, 'foo', 'string'); // true
containsKey(inherited, 'foo', 'string'); // true

containsKey(source, 'foo', 'number'); // false
containsKey(inherited, 'foo', 'number'); // false
```

### `containsOwnKey(item: any, key: string | string[], kind?: string): boolean`

Similar to `containsKey`, with the difference that it will only return `true` for direct properties of an object.

```javascript
import { containsOwnKey } from 'contains-key';

const source = { foo: 'foo', bar: undefined };
const inherited = Object.create(source, {});

containsOwnKey(source, 'foo'); // true
containsOwnKey(inherited, 'foo'); // false

containsOwnKey(source, 'bar'); // false;
containsOwnKey(inherited, 'bar'); // false

containsOwnKey(source, 'baz'); // false;
containsOwnKey(inherited, 'baz'); // false;

containsOwnKey(source, ['foo', 'bar', 'baz']); // false
containsOwnKey(inherited, ['foo', 'bar', 'baz']); // false

containsOwnKey(source, 'foo', 'string'); // true
containsOwnKey(inherited, 'foo', 'string'); // false

containsOwnKey(source, 'foo', 'number'); // false
containsOwnKey(inherited, 'foo', 'number'); // false
```

### `containsAnyKey(item: any, keys: string[], kind?: string): boolean`

Returns `true` if `item` is an object where any of the `keys`' values are **not `undefined`.**

If a `kind` is passed, it will return `true` if any of the `keys`' values are of that specific type.

```javascript
import { containsAnyKey } from 'contains-key';

const source = { foo: 'foo', bar: undefined };
const inherited = Object.create(source, {});

containsAnyKey(source, ['foo', 'bar']); // true
containsAnyKey(inherited, ['foo', 'bar']); // true

containsAnyKey(source, ['bar', 'baz']); // false
containsAnyKey(inherited, ['bar', 'baz']); // false

containsAnyKey(source, ['foo', 'bar', 'baz'], 'string'); // true
containsAnyKey(inherited, ['foo', 'bar', 'baz'], 'string'); // true

containsAnyKey(source, ['foo', 'bar', 'baz'], 'number'); // false
containsAnyKey(inherited, ['foo', 'bar', 'baz'], 'string'); // false
```

### `containsAnyOwnKey(item: any, keys: string[], kind?: string): boolean`

Similar to `containsAnyKey`, with the difference that it will only return `true` for direct properties of an object.

```javascript
import { containsAnyOwnKey } from 'contains-key';

const source = { foo: 'foo', bar: undefined };
const inherited = Object.create(source, {});

containsAnyOwnKey(source, ['foo', 'bar']); // true
containsAnyOwnKey(inherited, ['foo', 'bar']); // false

containsAnyOwnKey(source, ['bar', 'baz']); // false
containsAnyOwnKey(inherited, ['bar', 'baz']); // false

containsAnyOwnKey(source, ['foo', 'bar', 'baz'], 'string'); // true
containsAnyOwnKey(inherited, ['foo', 'bar', 'baz'], 'string'); // false

containsAnyOwnKey(source, ['foo', 'bar', 'baz'], 'number'); // false
containsAnyOwnKey(inherited, ['foo', 'bar', 'baz'], 'string'); // false
```
