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

A *result* is a plain *object* with fields `success` and `data`. Type definitions for different kinds of *result* are provided, as well as some creation, operation, and consumption conveniency functions:

* [`Result`:](#result) *result* type definitions.
* [`Create`:](#create) creation utility functions.
* [`Operate`:](#operate) operation utility functions.
* [`Consume`:](#consume) consumption utility functions.

### `Result`

Type definitions are provided for a successful *result*, a failed *result*, and a combination of them:

* [`Result.Box`:](https://rafamel.github.io/utils/result-box/result.html#box) a successful or failed *result*.
* [`Result.Break`:](https://rafamel.github.io/utils/result-box/result.html#break) a successful *result*, a failed *result*, or `null`.
* [`Result.Success`:](https://rafamel.github.io/utils/result-box/result.html#success) a successful *result*.
* [`Result.Failure`:](https://rafamel.github.io/utils/result-box/result.html#failure) a failed *result*.

```typescript
import { Result } from 'result-box';

const success: Result.Success<string> = {
  success: true,
  data: 'foo'
};

const failure: Result.Failure<Error> = {
  success: false,
  data: Error('foo')
};

const successBox: Result.Box<string, Error> = success;
const failureBox: Result.Box<string, Error> = failure;

const successBreak: Result.Break<string, Error> = success;
const failureBreak: Result.Break<string, Error> = failure;
const nullBreak: Result.Break<string, Error> = null;
```

### `Create`

Creation utility functions:

* [`Create.success`:](https://rafamel.github.io/utils/result-box/classes/create.html#success) creates a successful *result*.
* [`Create.failure`:](https://rafamel.github.io/utils/result-box/classes/create.html#failure) creates a failed *result*.
* [`Create.execute`:](https://rafamel.github.io/utils/result-box/classes/create.html#execute) creates a *result* from a function.
* [`Create.promise`:](https://rafamel.github.io/utils/result-box/classes/create.html#promise) returns a *Promise* of a *result* from an input *Promise*.
* [`Create.observable`:](https://rafamel.github.io/utils/result-box/classes/create.html#observable) returns an *Observable* of *result* from an input *Observable*.
* [`Create.combine`:](https://rafamel.github.io/utils/result-box/classes/create.html#observable) combines a record or array of *result*.

```typescript
import { Create } from 'result-box';

// Returns: `{ success: true, data: { foo: 'bar' } }`
const success = Create.success({ foo: 'bar' });

// Returns: `{ success: false, data: { reason: Error, code: 500 } }`
const failure = Create.failure({ reason: Error(), code: 500 });

// Returns: `{ success: true, data: { foo: 'bar' } }`
const executeSuccess = Create.execute(() => ({ foo: 'bar' }));

// Returns: `{ success: false, data: Error }`
const executeFailure = Create.execute(() => { throw Error(); });
```

### `Operate`

All operations return a unary function taking a *result* as an argument. You can straightforwardly pipe them with a pipe function such as the ones provided by the [`pipettes`](https://www.npmjs.com/package/pipettes) package.

* [`Operate.fallback`:](https://rafamel.github.io/utils/result-box/classes/operate.html#fallback) creates a successful *result* when null.
* [`Operate.transform`:](https://rafamel.github.io/utils/result-box/classes/operate.html#transform) transforms a *result* into its `data`.
* [`Operate.map`:](https://rafamel.github.io/utils/result-box/classes/operate.html#map) maps a *result* `data`.
* [`Operate.flip`:](https://rafamel.github.io/utils/result-box/classes/operate.html#flip) optionally converts a successful *result* into a failed result and vice-versa.
* [`Operate.tap`:](https://rafamel.github.io/utils/result-box/classes/operate.html#tap) allows for the execution of side effects.

```typescript
import { Result, Operate } from 'result-box';
import { into } from 'pipettes';

const none = null as Result.Break<number, string>;

// Return type: `Result.Box<number | boolean, string>`
const box = into(none, Operate.fallback(true));

// Return type: `number | boolean | string[]`
const transformed = into(
  box,
  Operate.transform(null, (data: string) => [data])
);

// Return type: `Result.Box<boolean, string>`
const mapped = into(
  box,
  Operate.map((data: number | boolean) => data === 5, null)
);

// Return type: `Result.Box<never, number | boolean | string>`
const flipped = into(box, Operate.flip(true, false));

// Return type: `Result.Box<number | boolean, string>`
const tapped = into(box, Operate.tap(null, console.log));
```

### `Consume`

Consumption utility functions:

* [`Consume.result`:](https://rafamel.github.io/utils/result-box/classes/consume.html#result) consumes a *result*.
* [`Consume.promise`:](https://rafamel.github.io/utils/result-box/classes/consume.html#promise) consumes a *Promise* of a *result*.
* [`Consume.observable`:](https://rafamel.github.io/utils/result-box/classes/consume.html#observable) consumes an *Observable* of *result*.

```typescript
import { Create, Consume } from 'result-box';
import { into } from 'pipettes';

// Returns: `'foo'`
const data = Consume.result(Create.success('foo'));

// Throws error
into(Create.failure('bar'), Consume.result);
```
