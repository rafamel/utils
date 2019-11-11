# merge-strategies

[![Version](https://img.shields.io/npm/v/merge-strategies.svg)](https://www.npmjs.com/package/merge-strategies)
[![Build Status](https://img.shields.io/travis/rafamel/utils/master.svg)](https://travis-ci.org/rafamel/utils)
[![Coverage](https://img.shields.io/coveralls/rafamel/utils/master.svg)](https://coveralls.io/github/rafamel/utils)
[![Dependencies](https://img.shields.io/david/rafamel/utils.svg?path=packages%2Fmerge-strategies)](https://david-dm.org/rafamel/utils.svg?path=packages%2Fmerge-strategies)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/merge-strategies.svg)](https://snyk.io/test/npm/merge-strategies)
[![License](https://img.shields.io/github/license/rafamel/utils.svg)](https://github.com/rafamel/utils/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/merge-strategies.svg)](https://www.npmjs.com/package/merge-strategies)

> Object merging made simple.

## Install

[`npm install merge-strategies`](https://www.npmjs.com/package/merge-strategies)

## Usage

All functions return a new object -they are not mutated-, and take in objects of any type. If they receive scalars instead of `Array`s or `object`s, `value` will be returned.

### shallow(defaults, value)

If both `defaults` and `value` are objects, they will be shallow merged.

```javascript
import { shallow } from 'merge-strategies';

// Returns: { foo: [3, 4], bar: { foo: 'foo' } }
shallow(
  { foo: [1, 2], bar: { baz: 'baz' },
  { foo: [3, 4], bar: { foo: 'foo' },
);
```

### merge(defaults, value)

If both `defaults` and `value` are objects, they will be deep merged.

```javascript
import { merge } from 'merge-strategies';

// Returns: { foo: [3, 4], bar: { baz: 'baz', foo: 'foo' } }
merge(
  { foo: [1, 2], bar: { baz: 'baz' },
  { foo: [3, 4], bar: { foo: 'foo' },
);
```

### deep(defaults, value)

If both the `defaults` and `value` are objects, they will be deep merged. Arrays will be concatenated.

```javascript
import { deep } from 'merge-strategies';

// Returns: { foo: [1, 2, 3, 4], bar: { baz: 'baz', foo: 'foo' } }
deep(
  { foo: [1, 2], bar: { baz: 'baz' },
  { foo: [3, 4], bar: { foo: 'foo' },
);
```
