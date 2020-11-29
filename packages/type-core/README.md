# type-core

[![Version](https://img.shields.io/npm/v/type-core.svg)](https://www.npmjs.com/package/type-core)
[![Build Status](https://img.shields.io/travis/rafamel/utils/master.svg)](https://travis-ci.org/rafamel/utils)
[![Coverage](https://img.shields.io/coveralls/rafamel/utils/master.svg)](https://coveralls.io/github/rafamel/utils)
[![Dependencies](https://img.shields.io/david/rafamel/utils.svg?path=packages%2Ftype-core)](https://david-dm.org/rafamel/utils.svg?path=packages%2Ftype-core)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/type-core.svg)](https://snyk.io/test/npm/type-core)
[![License](https://img.shields.io/github/license/rafamel/utils.svg)](https://github.com/rafamel/utils/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/type-core.svg)](https://www.npmjs.com/package/type-core)

> A types utility belt for TypeScript.

## Install

[`npm install type-core`](https://www.npmjs.com/package/type-core)

## Types

[See source.](https://github.com/rafamel/utils/blob/master/packages/type-core/src/types.ts#L1)

* Primitives
  * `NonDefined`
  * `Empty`
  * `FalseLike`
  * `Primitive`
* Records
  * `Members`
  * `Replace`
* Functions
  * `NullaryFn`
  * `UnaryFn`
  * `BinaryFn`
  * `MultiaryFn`
  * `VariadicFn`
* Utils
  * `Union`
  * `Intersection`

## Utilities

### TypeGuard

[See source.](https://github.com/rafamel/utils/blob/master/packages/type-core/src/TypeGuard.ts#L1)

An exported object with methods:

* `isUndefined(item: any): item is undefined`
* `isNull(item: any): item is null`
* `isEmpty(item: any): item is Empty`: includes *null* and *undefined.*
* `isFalseLike(item: any): item is FalseLike`: item is *falsy*.
* `isBoolean(item: any): item is boolean`
* `isString(item: any): item is string`
* `isNumber(item: any): item is number`
* `isBigInt(item: any): item is bigint`
* `isSymbol(item: any): item is symbol`
* `isPrimitive(item: any): item is Primitive`: includes *bigint, boolean, number, string, symbol, null,* and *undefined.*
* `isFunction(item: any): item is VariadicFn`
* `isObject(item: any): item is any`: excludes *null*, includes array.
* `isObjectLike(item: any): item is any`: excludes *null*, includes array and function.
* `isRecord(item: any): item is Members<unknown>`: excludes *null*, array, and function.
* `isRecordLike(item: any): item is Members<unknown>`, excludes `null` and array, includes function.
* `isArray(item: any): item is unknown[]`
* `isPromise(item: any): item is Promise<unknown>`: item is a *Promise*.
* `isPromiseLike(item: any):  item is PromiseLike<unknown>`: item is a *thenable*.
* `isIterable(item: any): item is Iterable<unknown>`
* `isIterator(item: any): item is Iterator<unknown, unknown, unknown>`
* `isEventEmitterLike(item: any): item is Partial<NodeJS.EventEmitter>`
* `isEventEmitter(item: any): item is NodeJS.EventEmitter`
* `isEventTarget(item: any): item is EventTarget`
