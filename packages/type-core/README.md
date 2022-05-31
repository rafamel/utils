# type-core

[![Version](https://img.shields.io/npm/v/type-core.svg)](https://www.npmjs.com/package/type-core)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/type-core.svg)](https://snyk.io/test/npm/type-core)
[![License](https://img.shields.io/github/license/rafamel/utils.svg)](https://github.com/rafamel/type-core/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/type-core.svg)](https://www.npmjs.com/package/type-core)

> Riseup library template.

## Install

[`npm install type-core`](https://www.npmjs.com/package/type-core)

## Types

* [Primitives](https://github.com/rafamel/utils/blob/master/packages/type-core/src/types/basic-types.ts#L1)
  * `ID`
  * `NonDefined`
  * `Nullish`
  * `Empty`
  * `FalseLike`
  * `Primitive`
* [Serial](https://github.com/rafamel/utils/blob/master/packages/type-core/src/types/basic-types.ts#L27)
  * `Serial.Type`
  * `Serial.Primitive`
  * `Serial.Array`
  * `Serial.Object`
* [Structural](https://github.com/rafamel/utils/blob/master/packages/type-core/src/types/structural.ts#L1)
  * `Dictionary`
  * `Constructor`
  * `MaybePromise`
  * `MaybePromiseLike`
* [Functions](https://github.com/rafamel/utils/blob/master/packages/type-core/src/types/functions.ts#L1)
  * `NullaryFn`
  * `UnaryFn`
  * `BinaryFn`
  * `MultiaryFn`
  * `VariadicFn`
* [Utils](https://github.com/rafamel/utils/blob/master/packages/type-core/src/types/utils.ts#L1)
  * `Union`
  * `Intersection`
  * `KeyOf`
  * `ValueOf`
  * `Index`
  * `Replace`
  * `Optional`
  * `Deep.Required`
  * `Deep.Partial`

## Utilities

### TypeGuard

[See source.](https://github.com/rafamel/utils/blob/master/packages/type-core/src/TypeGuard.ts#L1)

An exported object with methods:

* `isID(item: any): item is ID`
* `isNullish(item: any): item is Nullish`
* `isEmpty(item: any): item is Empty`
* `isFalseLike(item: any): item is FalseLike`
* `isPrimitive(item: any): item is Primitive`: includes *bigint, boolean, number, string, symbol, null,* and *undefined.*
* `isNull(item: any): item is null`
* `isUndefined(item: any): item is undefined`
* `isBoolean(item: any): item is boolean`
* `isString(item: any): item is string`
* `isNumber(item: any): item is number`
* `isBigInt(item: any): item is bigint`
* `isSymbol(item: any): item is symbol`
* `isFunction(item: any): item is VariadicFn`
* `isObjectLike(item: any): item is any`: excludes *null*, includes array and function.
* `isObject(item: any): item is any`: excludes *null*, includes array.
* `isRecordLike(item: any): item is Members<unknown>`, excludes `null` and array, includes function.
* `isRecord(item: any): item is Members<unknown>`: excludes *null*, array, and function.
* `isArray(item: any): item is unknown[]`
* `isPromiseLike(item: any):  item is PromiseLike<unknown>`: item is a *thenable*.
* `isPromise(item: any): item is Promise<unknown>`: item is a *Promise*.
* `isIterable(item: any): item is Iterable<unknown>`
* `isAsyncIterable(item: any): item is AsyncIterable<unknown>`
* `isIterator(item: any): item is Iterator<unknown, unknown, unknown>`
* `isEventEmitterLike(item: any): item is Partial<NodeJS.EventEmitter>`
* `isEventEmitter(item: any): item is NodeJS.EventEmitter`
* `isEventTarget(item: any): item is EventTarget`
