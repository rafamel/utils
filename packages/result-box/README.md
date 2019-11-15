# result-box

[![Version](https://img.shields.io/npm/v/result-box.svg)](https://www.npmjs.com/package/result-box)
[![Build Status](https://img.shields.io/travis/rafamel/utils/master.svg)](https://travis-ci.org/rafamel/utils)
[![Coverage](https://img.shields.io/coveralls/rafamel/utils/master.svg)](https://coveralls.io/github/rafamel/utils)
[![Dependencies](https://img.shields.io/david/rafamel/utils.svg?path=packages%2Fresult-box)](https://david-dm.org/rafamel/utils.svg?path=packages%2Fresult-box)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/result-box.svg)](https://snyk.io/test/npm/result-box)
[![License](https://img.shields.io/github/license/rafamel/utils.svg)](https://github.com/rafamel/utils/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/result-box.svg)](https://www.npmjs.com/package/result-box)

> Because throw/catch is not always best.

## Install

[`npm install result-box`](https://www.npmjs.com/package/result-box)

## Usage

### Static methods

#### `Result.pass(value?: any)`

Creates a successful `Result` with `value`.

```javascript
import { Result } from 'result-box';

const result = Result.pass('foo');
```

#### `Result.fail(error?: Error | string)`

Creates a unsuccessful `Result` with `error`.

```javascript
import { Result } from 'result-box';

const result = Result.fail(Error('Foo'));
```

#### `Result.create(fn: () => Promise<any> | any): Promise<Result> | Result`

Creates a `Result` from a function.

```javascript
import { Result } from 'result-box';

// successful.value will be 'foo'
const successful = Result.create(() => 'foo');

// promise will resolve in a Result with an Error.
const promise = Result.create(() => Promise.reject(Error('Foo')));
```

#### `Result.consume(result: Promise<Result> | Result): Promise<any> | any`

Returns the `Result` `value` if it is successful; throws with its `error` otherwise.

```javascript
import { Result } from 'result-box';

// value will be 'foo'
const value = Result.consume(Result.pass('foo'));

// promise will reject with the Result error.
const promise = Result.consume(
  Promise.resolve(Result.fail('Foo'))
);
```

#### `Result.combine(...results: Result[]): Result`

Creates a `Result` that will be:

- unsuccessful if any of the results is unsuccessful, with the first `error` encountered.
- successful if all of the results are successful, with `value` of an *array* of the results values.

```javascript
import { Result } from 'result-box';

// successful.value will be ['foo', 'bar', 'baz']
const successful = Result.combine(
  Result.pass('foo'),
  Result.pass('bar'),
  Result.pass('baz')
);

// unsuccessful.error will be an Error with message 'Foo'.
const unsuccessful = Result.combine(
  Result.pass('foo'),
  Result.fail(Error('Foo')),
  Result.pass('bar'),
  Result.fail(Error('Bar'))
);
```

### Instance getters

#### `result.success`

*Boolean,* whether a `Result` was successful.

```javascript
import { Result } from 'result-box';

Result.pass('foo').success; // true
Result.fail(Error('Foo')).success; // false
```

#### `result.value`

Retrieves the value of a successful `Result`. It will **throw** if the result was unsuccessful.

```javascript
import { Result } from 'result-box';

Result.pass('foo').value; // 'foo'
```

#### `result.error`

Retrieves the error of an unsuccessful `Result`. It will **throw** if the result was successful.

```javascript
import { Result } from 'result-box';

Result.fail(Error('Foo')).error; // Error('Foo')
```
