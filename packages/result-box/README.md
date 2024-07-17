# result-box

[![Version](https://img.shields.io/npm/v/result-box.svg)](https://www.npmjs.com/package/result-box)
[![Types](https://img.shields.io/npm/types/result-box.svg)](https://www.npmjs.com/package/result-box)
[![License](https://img.shields.io/github/license/rafamel/utils.svg)](https://github.com/rafamel/utils/blob/master/LICENSE)

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

* [`Result.Box`:](https://rafamel.github.io/utils/result-box/types/Result.Box.html) a successful or failed *result*.
* [`Result.Break`:](https://rafamel.github.io/utils/result-box/types/Result.Break.html) a successful *result*, a failed *result*, or `null`.
* [`Result.Success`:](https://rafamel.github.io/utils/result-box/types/Result.Success.html) a successful *result*.
* [`Result.Failure`:](https://rafamel.github.io/utils/result-box/types/Result.Failure.html) a failed *result*.

```typescript
import { Result } from 'result-box';

const success: Result.Success<string> = {
  success: true,
  data: 'foo'
};

const failure: Result.Failure<Error> = {
  success: false,
  data: new Error('foo')
};

const successBox: Result.Box<string, Error> = success;
const failureBox: Result.Box<string, Error> = failure;

const successBreak: Result.Break<string, Error> = success;
const failureBreak: Result.Break<string, Error> = failure;
const nullBreak: Result.Break<string, Error> = null;
```

### `Create`

Creation utility functions:

* [`Create.success`:](https://rafamel.github.io/utils/result-box/classes/Create-1.html#success) creates a successful *result*.
* [`Create.failure`:](https://rafamel.github.io/utils/result-box/classes/Create-1.html#failure) creates a failed *result*.
* [`Create.execute`:](https://rafamel.github.io/utils/result-box/classes/Create-1.html#execute) creates a *result* from a function.
* [`Create.promise`:](https://rafamel.github.io/utils/result-box/classes/Create-1.html#promise) returns a *Promise* of a *result* from an input *Promise*.
* [`Create.observable`:](https://rafamel.github.io/utils/result-box/classes/classes/Create-1.html#observable) returns an *Observable* of *result* from an input *Observable*.
* [`Create.combine`:](https://rafamel.github.io/utils/result-box/classes/classes/Create-1.html#combine) combines a record or array of *result*.

```typescript
import { Create } from 'result-box';

// Returns: `{ success: true, data: { foo: 'bar' } }`
const success = Create.success({ foo: 'bar' });

// Returns: `{ success: false, data: { reason: Error, code: 500 } }`
const failure = Create.failure({ reason: new Error('...'), code: 500 });

// Returns: `{ success: true, data: { foo: 'bar' } }`
const executeSuccess = Create.execute(() => ({ foo: 'bar' }));

// Returns: `{ success: false, data: Error }`
const executeFailure = Create.execute(() => { throw new Error('...'); });
```

### `Operate`

All operations return a unary function taking a *result* as an argument. You can straightforwardly pipe them with a pipe function such as the ones provided by the [`pipettes`](https://www.npmjs.com/package/pipettes) package.

* [`Operate.fallback`:](https://rafamel.github.io/utils/result-box/classes/Operate-1.html#fallback) creates a successful *result* when null.
* [`Operate.transform`:](https://rafamel.github.io/utils/result-box/classes/Operate-1.html#transform) transforms a *result* into its `data`.
* [`Operate.map`:](https://rafamel.github.io/utils/result-box/classes/Operate-1.html#map) maps a *result* `data`.
* [`Operate.flip`:](https://rafamel.github.io/utils/result-box/classes/Operate-1.html#flip) optionally converts a successful *result* into a failed result and vice-versa.
* [`Operate.tap`:](https://rafamel.github.io/utils/result-box/classes/Operate-1.html#tap) allows for the execution of side effects.

```typescript
import { Operate, Result } from 'result-box';
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

* [`Consume.result`:](https://rafamel.github.io/utils/result-box/classes/Consume-1.html#result) consumes a *result*.
* [`Consume.promise`:](https://rafamel.github.io/utils/result-box/classes/Consume-1.html#promise) consumes a *Promise* of a *result*.
* [`Consume.observable`:](https://rafamel.github.io/utils/result-box/classes/Consume-1.html#observable) consumes an *Observable* of *result*.

```typescript
import { Consume, Create } from 'result-box';
import { into } from 'pipettes';

// Returns: `'foo'`
const data = Consume.result(Create.success('foo'));

// Throws error
into(Create.failure('bar'), Consume.result);
```
