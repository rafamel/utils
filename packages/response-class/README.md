# response-class

[![Version](https://img.shields.io/npm/v/response-class.svg)](https://www.npmjs.com/package/response-class)
[![Build Status](https://img.shields.io/travis/rafamel/utils/master.svg)](https://travis-ci.org/rafamel/utils)
[![Coverage](https://img.shields.io/coveralls/rafamel/utils/master.svg)](https://coveralls.io/github/rafamel/utils)
[![Dependencies](https://img.shields.io/david/rafamel/utils.svg?path=packages%2Fresponse-class)](https://david-dm.org/rafamel/utils.svg?path=packages%2Fresponse-class)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/response-class.svg)](https://snyk.io/test/npm/response-class)
[![License](https://img.shields.io/github/license/rafamel/utils.svg)](https://github.com/rafamel/utils/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/response-class.svg)](https://www.npmjs.com/package/response-class)

> Because throw/catch is not always best.

## Install

[`npm install response-class`](https://www.npmjs.com/package/response-class)

## Usage

### Static methods

#### `Response.pass(value: any)`

Creates a successful `Response` with `value`.

```javascript
import { Response } from 'response-class';

const response = Response.pass('foo');
```

#### `Response.fail(error: Error)`

Creates a unsuccessful `Response` with `error`.

```javascript
import { Response } from 'response-class';

const response = Response.fail(Error('Foo'));
```

#### `Response.combine(...responses: Response[]): Response`

Creates a response that will be:

- unsuccessful if any of the responses is unsuccessful, with the first `error` encountered.
- successful if all of the responses are successful, with `value` of an *array* of the responses values.

```javascript
import { Response } from 'response-class';

// unsuccessful.error will be an Error with message 'Foo'.
const unsuccessful = Response.combine(
  Response.pass('foo'),
  Response.fail(Error('Foo')),
  Response.pass('bar'),
  Response.fail(Error('Bar'))
);

// successful.value will be ['foo', 'bar', 'baz']
const successful = Response.combine(
  Response.pass('foo'),
  Response.pass('bar'),
  Response.pass('baz')
);
```

### Instance getters

#### `response.success`

*Boolean,* whether a `Response` was successful.

```javascript
import { Response } from 'response-class';

Response.pass('foo').success; // true
Response.fail(Error('Foo')).success; // false
```

#### `response.value`

Retrieves the value of a successful `Response`. It will **throw** if the response was unsuccessful.

```javascript
import { Response } from 'response-class';

Response.pass('foo').value; // 'foo'
```

#### `response.error`

Retrieves the error of an unsuccessful `Response`. It will **throw** if the response was successful.

```javascript
import { Response } from 'response-class';

Response.fail(Error('Foo')).error; // Error('Foo')
```
