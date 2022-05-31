# merge-strategies

[![Version](https://img.shields.io/npm/v/merge-strategies.svg)](https://www.npmjs.com/package/merge-strategies)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/merge-strategies.svg)](https://snyk.io/test/npm/merge-strategies)
[![License](https://img.shields.io/github/license/rafamel/utils.svg)](https://github.com/rafamel/merge-strategies/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/merge-strategies.svg)](https://www.npmjs.com/package/merge-strategies)

> Object merging made simple.

## Install

[`npm install merge-strategies`](https://www.npmjs.com/package/merge-strategies)

## Usage

All functions return a new object -they are not mutated-, and take in objects of any type. If they receive scalars instead of `Array`s or `object`s, `data` will be returned.

### shallow(defaults, data)

* If both `defaults` and `data` are objects, they will be shallow merged.
* Keys with `undefined` values in a `data` object will acquire their value at `defaults`.
* Mutations to the returned object won't have an effect over `defaults`.
* Arrays won't be merged.

```javascript
import { shallow } from 'merge-strategies';

// Returns: { foo: [3, 4], bar: { foo: 'foo' } }
shallow(
  { foo: [1, 2], bar: { baz: 'baz' },
  { foo: [3, 4], bar: { foo: 'foo' },
);
```

### merge(defaults, data)

* If both `defaults` and `data` are objects, they will be deep merged.
* Keys with `undefined` values in a `data` object will acquire their value at `defaults`.
* Mutations to the returned object won't have an effect over `defaults`.
* Arrays won't be merged.

```javascript
import { merge } from 'merge-strategies';

// Returns: { foo: [3, 4], bar: { baz: 'baz', foo: 'foo' } }
merge(
  { foo: [1, 2], bar: { baz: 'baz' },
  { foo: [3, 4], bar: { foo: 'foo' },
);
```

### deep(defaults, data)

* If both `defaults` and `data` are objects, they will be deep merged.
* Keys with `undefined` values in a `data` object will acquire their value at `defaults`.
* Mutations to the returned object won't have an effect over `defaults`.
* Arrays will be concatenated.

```javascript
import { deep } from 'merge-strategies';

// Returns: { foo: [1, 2, 3, 4], bar: { baz: 'baz', foo: 'foo' } }
deep(
  { foo: [1, 2], bar: { baz: 'baz' },
  { foo: [3, 4], bar: { foo: 'foo' },
);
```
