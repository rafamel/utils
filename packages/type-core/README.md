# type-core

[![Version](https://img.shields.io/npm/v/type-core.svg)](https://www.npmjs.com/package/type-core)
[![Types](https://img.shields.io/npm/types/type-core.svg)](https://www.npmjs.com/package/type-core)
[![License](https://img.shields.io/github/license/rafamel/type-core.svg)](https://github.com/rafamel/type-core/blob/master/LICENSE)

> A types utility belt.

## Install

[`npm install type-core`](https://www.npmjs.com/package/type-core)

## Types

* [`ID`](https://github.com/rafamel/utils/blob/master/packages/type-core/src/types.ts#L2)
* [`VoidLike`](https://github.com/rafamel/utils/blob/master/packages/type-core/src/types.ts#L3)
* [`NullLike`](https://github.com/rafamel/utils/blob/master/packages/type-core/src/types.ts#L4)
* [`FalseLike`](https://github.com/rafamel/utils/blob/master/packages/type-core/src/types.ts#L5)
* [`Primitive`](https://github.com/rafamel/utils/blob/master/packages/type-core/src/types.ts#L6)
* [`Serial`](https://github.com/rafamel/utils/blob/master/packages/type-core/src/types.ts#L14)
* [`Dictionary`](https://github.com/rafamel/utils/blob/master/packages/type-core/src/types.ts#L23)
* [`Promisable`](https://github.com/rafamel/utils/blob/master/packages/type-core/src/types.ts#L24)
* [`Callable`](https://github.com/rafamel/utils/blob/master/packages/type-core/src/types.ts#L25)
* [`Multiary`](https://github.com/rafamel/utils/blob/master/packages/type-core/src/types.ts#L26)
* [Utils](https://github.com/rafamel/utils/blob/master/packages/type-core/src/utils.ts)
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

[See source.](https://github.com/rafamel/utils/blob/master/packages/type-core/src/TypeGuard.ts)

An exported object with methods:

* `isID(item: any): item is ID`: includes *string* and *number.*
* `isNullLike(item: any): item is NullLike`.
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
* `isObject(item: any): item is any`: excludes *null*, includes array.
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
