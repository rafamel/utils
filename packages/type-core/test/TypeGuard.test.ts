import assert from 'node:assert';

import { test } from 'vitest';

import { TypeGuard } from '../src/TypeGuard';

const noop = (): void => undefined;

test(`isID`, () => {
  assert(TypeGuard.isID(0));
  assert(TypeGuard.isID(''));
  assert(!TypeGuard.isID(undefined));
  assert(!TypeGuard.isID(null));
  assert(!TypeGuard.isID(0n));
  assert(!TypeGuard.isID(false));
  assert(!TypeGuard.isID({}));
  assert(!TypeGuard.isID([]));
  assert(!TypeGuard.isID({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isID(Symbol('')));
  assert(!TypeGuard.isID(() => undefined));
});
test(`isNullLike`, () => {
  assert(TypeGuard.isNullLike(null));
  assert(TypeGuard.isNullLike(undefined));
  assert(!TypeGuard.isNullLike(0));
  assert(!TypeGuard.isNullLike(0n));
  assert(!TypeGuard.isNullLike(false));
  assert(!TypeGuard.isNullLike(''));
  assert(!TypeGuard.isNullLike({}));
  assert(!TypeGuard.isNullLike([]));
  assert(!TypeGuard.isNullLike({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isNullLike(Symbol('')));
  assert(!TypeGuard.isNullLike(() => undefined));
});
test(`isFalseLike`, () => {
  assert(TypeGuard.isFalseLike(null));
  assert(TypeGuard.isFalseLike(undefined));
  assert(TypeGuard.isFalseLike(0));
  assert(TypeGuard.isFalseLike(0n));
  assert(TypeGuard.isFalseLike(false));
  assert(TypeGuard.isFalseLike(''));
  assert(!TypeGuard.isFalseLike(1));
  assert(!TypeGuard.isFalseLike(1n));
  assert(!TypeGuard.isFalseLike(true));
  assert(!TypeGuard.isFalseLike(' '));
  assert(!TypeGuard.isFalseLike({}));
  assert(!TypeGuard.isFalseLike([]));
  assert(!TypeGuard.isFalseLike({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isFalseLike(Symbol('')));
  assert(!TypeGuard.isFalseLike(() => undefined));
});
test(`isPrimitive`, () => {
  assert(TypeGuard.isPrimitive(undefined));
  assert(TypeGuard.isPrimitive(null));
  assert(TypeGuard.isPrimitive(0));
  assert(TypeGuard.isPrimitive(0n));
  assert(TypeGuard.isPrimitive(false));
  assert(TypeGuard.isPrimitive(''));
  assert(TypeGuard.isPrimitive(Symbol('')));
  assert(!TypeGuard.isPrimitive({}));
  assert(!TypeGuard.isPrimitive([]));
  assert(!TypeGuard.isPrimitive({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isSymbol(() => undefined));
});
test(`isUndefined`, () => {
  assert(TypeGuard.isUndefined(undefined));
  assert(!TypeGuard.isUndefined(null));
  assert(!TypeGuard.isUndefined(0));
  assert(!TypeGuard.isUndefined(0n));
  assert(!TypeGuard.isUndefined(false));
  assert(!TypeGuard.isUndefined(''));
  assert(!TypeGuard.isUndefined({}));
  assert(!TypeGuard.isUndefined([]));
  assert(!TypeGuard.isUndefined({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isUndefined(Symbol('')));
  assert(!TypeGuard.isUndefined(() => undefined));
});
test(`isNull`, () => {
  assert(TypeGuard.isNull(null));
  assert(!TypeGuard.isNull(undefined));
  assert(!TypeGuard.isNull(0));
  assert(!TypeGuard.isNull(0n));
  assert(!TypeGuard.isNull(false));
  assert(!TypeGuard.isNull(''));
  assert(!TypeGuard.isNull({}));
  assert(!TypeGuard.isNull([]));
  assert(!TypeGuard.isNull({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isNull(Symbol('')));
  assert(!TypeGuard.isNull(() => undefined));
});
test(`isBoolean`, () => {
  assert(TypeGuard.isBoolean(true));
  assert(TypeGuard.isBoolean(false));
  assert(!TypeGuard.isBoolean(undefined));
  assert(!TypeGuard.isBoolean(null));
  assert(!TypeGuard.isBoolean(1));
  assert(!TypeGuard.isBoolean(1n));
  assert(!TypeGuard.isBoolean('foo'));
  assert(!TypeGuard.isBoolean({}));
  assert(!TypeGuard.isBoolean([]));
  assert(!TypeGuard.isBoolean({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isBoolean(Symbol('')));
  assert(!TypeGuard.isBoolean(() => undefined));
});
test(`isString`, () => {
  assert(TypeGuard.isString(''));
  assert(!TypeGuard.isString(undefined));
  assert(!TypeGuard.isString(null));
  assert(!TypeGuard.isString(1));
  assert(!TypeGuard.isString(1n));
  assert(!TypeGuard.isString(true));
  assert(!TypeGuard.isString({}));
  assert(!TypeGuard.isString([]));
  assert(!TypeGuard.isString({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isString(Symbol('')));
  assert(!TypeGuard.isString(() => undefined));
});
test(`isNumber`, () => {
  assert(TypeGuard.isNumber(0));
  assert(!TypeGuard.isNumber(undefined));
  assert(!TypeGuard.isNumber(null));
  assert(!TypeGuard.isNumber(1n));
  assert(!TypeGuard.isNumber(true));
  assert(!TypeGuard.isNumber('foo'));
  assert(!TypeGuard.isNumber({}));
  assert(!TypeGuard.isNumber([]));
  assert(!TypeGuard.isNumber({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isNumber(Symbol('')));
  assert(!TypeGuard.isNumber(() => undefined));
});
test(`isBigInt`, () => {
  assert(TypeGuard.isBigInt(0n));
  assert(!TypeGuard.isBigInt(undefined));
  assert(!TypeGuard.isBigInt(null));
  assert(!TypeGuard.isBigInt(1));
  assert(!TypeGuard.isBigInt(true));
  assert(!TypeGuard.isBigInt('foo'));
  assert(!TypeGuard.isBigInt({}));
  assert(!TypeGuard.isBigInt([]));
  assert(!TypeGuard.isBigInt({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isBigInt(Symbol('')));
  assert(!TypeGuard.isBigInt(() => undefined));
});
test(`isSymbol`, () => {
  assert(TypeGuard.isSymbol(Symbol('')));
  assert(!TypeGuard.isSymbol(undefined));
  assert(!TypeGuard.isSymbol(null));
  assert(!TypeGuard.isSymbol(1));
  assert(!TypeGuard.isSymbol(1n));
  assert(!TypeGuard.isSymbol(true));
  assert(!TypeGuard.isSymbol('foo'));
  assert(!TypeGuard.isSymbol({}));
  assert(!TypeGuard.isSymbol([]));
  assert(!TypeGuard.isSymbol({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isSymbol(() => undefined));
});
test(`isFunction`, () => {
  assert(TypeGuard.isFunction(() => undefined));
  assert(!TypeGuard.isFunction(undefined));
  assert(!TypeGuard.isFunction(null));
  assert(!TypeGuard.isFunction(1));
  assert(!TypeGuard.isFunction(1n));
  assert(!TypeGuard.isFunction(true));
  assert(!TypeGuard.isFunction('foo'));
  assert(!TypeGuard.isFunction({}));
  assert(!TypeGuard.isFunction([]));
  assert(!TypeGuard.isFunction({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isFunction(Symbol('')));
});
test(`isObject`, () => {
  assert(TypeGuard.isObject({}));
  assert(TypeGuard.isObject([]));
  assert(TypeGuard.isObject({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isObject(undefined));
  assert(!TypeGuard.isObject(null));
  assert(!TypeGuard.isObject(1));
  assert(!TypeGuard.isObject(1n));
  assert(!TypeGuard.isObject(true));
  assert(!TypeGuard.isObject('foo'));
  assert(!TypeGuard.isObject(Symbol('')));
  assert(!TypeGuard.isObject(() => undefined));
});
test(`isRecord`, () => {
  assert(TypeGuard.isRecord({}));
  assert(TypeGuard.isRecord({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isRecord(undefined));
  assert(!TypeGuard.isRecord(null));
  assert(!TypeGuard.isRecord(1));
  assert(!TypeGuard.isRecord(1n));
  assert(!TypeGuard.isRecord(true));
  assert(!TypeGuard.isRecord('foo'));
  assert(!TypeGuard.isRecord([]));
  assert(!TypeGuard.isRecord(Symbol('')));
  assert(!TypeGuard.isRecord(() => undefined));
});
test(`isArray`, () => {
  assert(TypeGuard.isArray([]));
  assert(!TypeGuard.isArray(undefined));
  assert(!TypeGuard.isArray(null));
  assert(!TypeGuard.isArray(1));
  assert(!TypeGuard.isArray(1n));
  assert(!TypeGuard.isArray(true));
  assert(!TypeGuard.isArray('foo'));
  assert(!TypeGuard.isArray({}));
  assert(!TypeGuard.isArray({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isArray(Symbol('')));
  assert(!TypeGuard.isArray(() => undefined));
});
test(`isPromise`, () => {
  assert(TypeGuard.isPromise(Promise.resolve()));
  assert(!TypeGuard.isPromise({ then: () => undefined }));
  assert(!TypeGuard.isPromise(undefined));
  assert(!TypeGuard.isPromise(null));
  assert(!TypeGuard.isPromise(1));
  assert(!TypeGuard.isPromise(1n));
  assert(!TypeGuard.isPromise(true));
  assert(!TypeGuard.isPromise('foo'));
  assert(!TypeGuard.isPromise({}));
  assert(!TypeGuard.isPromise([]));
  assert(!TypeGuard.isPromise({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isPromise(Symbol('')));
  assert(!TypeGuard.isPromise(() => undefined));
});
test(`isPromiseLike`, () => {
  assert(TypeGuard.isPromiseLike(Promise.resolve()));
  assert(TypeGuard.isPromiseLike({ then: () => undefined }));
  assert(!TypeGuard.isPromiseLike(undefined));
  assert(!TypeGuard.isPromiseLike(null));
  assert(!TypeGuard.isPromiseLike(1));
  assert(!TypeGuard.isPromiseLike(1n));
  assert(!TypeGuard.isPromiseLike(true));
  assert(!TypeGuard.isPromiseLike('foo'));
  assert(!TypeGuard.isPromiseLike({}));
  assert(!TypeGuard.isPromiseLike([]));
  assert(!TypeGuard.isPromiseLike({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isPromiseLike(Symbol('')));
  assert(!TypeGuard.isPromiseLike(() => undefined));
});
test(`isIterable`, () => {
  assert(TypeGuard.isIterable(''));
  assert(TypeGuard.isIterable([]));
  assert(TypeGuard.isIterable({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isIterable({ [Symbol.asyncIterator]: noop }));
  assert(!TypeGuard.isIterable({ next: noop }));
  assert(!TypeGuard.isIterable(undefined));
  assert(!TypeGuard.isIterable(null));
  assert(!TypeGuard.isIterable(1));
  assert(!TypeGuard.isIterable(1n));
  assert(!TypeGuard.isIterable(true));
  assert(!TypeGuard.isIterable({}));
  assert(!TypeGuard.isIterable(Symbol('')));
  assert(!TypeGuard.isIterable(() => undefined));
});
test(`isAsyncIterable`, () => {
  assert(TypeGuard.isAsyncIterable({ [Symbol.asyncIterator]: noop }));
  assert(!TypeGuard.isAsyncIterable(undefined));
  assert(!TypeGuard.isAsyncIterable(null));
  assert(!TypeGuard.isAsyncIterable(0));
  assert(!TypeGuard.isAsyncIterable(0n));
  assert(!TypeGuard.isAsyncIterable(false));
  assert(!TypeGuard.isAsyncIterable(''));
  assert(!TypeGuard.isAsyncIterable({}));
  assert(!TypeGuard.isAsyncIterable([]));
  assert(!TypeGuard.isAsyncIterable({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isAsyncIterable(Symbol('')));
  assert(!TypeGuard.isAsyncIterable(() => undefined));
});
test(`isIterator`, () => {
  assert(TypeGuard.isIterator({ next: noop }));
  assert(!TypeGuard.isIterator(undefined));
  assert(!TypeGuard.isIterator(null));
  assert(!TypeGuard.isIterator(1));
  assert(!TypeGuard.isIterator(1n));
  assert(!TypeGuard.isIterator(true));
  assert(!TypeGuard.isIterator('foo'));
  assert(!TypeGuard.isIterator({}));
  assert(!TypeGuard.isIterator([]));
  assert(!TypeGuard.isIterator({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isIterator(Symbol('')));
  assert(!TypeGuard.isIterator(() => undefined));
});
test(`isEventEmitterLike`, () => {
  assert(
    TypeGuard.isEventEmitterLike({
      addListener: noop,
      removeListener: noop,
      on: noop,
      once: noop,
      off: noop,
      removeAllListeners: noop,
      setMaxListeners: noop,
      getMaxListeners: noop,
      listeners: noop,
      rawListeners: noop,
      emit: noop,
      listenerCount: noop,
      prependListener: noop,
      prependOnceListener: noop,
      eventNames: noop
    })
  );
  assert(
    TypeGuard.isEventEmitterLike({
      addListener: noop,
      removeListener: noop
    })
  );
  assert(
    !TypeGuard.isEventEmitterLike({
      addEventListener: noop,
      removeEventListener: noop,
      dispatchEvent: noop
    })
  );
  assert(!TypeGuard.isEventEmitterLike(undefined));
  assert(!TypeGuard.isEventEmitterLike(null));
  assert(!TypeGuard.isEventEmitterLike(1));
  assert(!TypeGuard.isEventEmitterLike(1n));
  assert(!TypeGuard.isEventEmitterLike(true));
  assert(!TypeGuard.isEventEmitterLike('foo'));
  assert(!TypeGuard.isEventEmitterLike({}));
  assert(!TypeGuard.isEventEmitterLike([]));
  assert(!TypeGuard.isEventEmitterLike({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isEventEmitterLike(Symbol('')));
  assert(!TypeGuard.isEventEmitterLike(() => undefined));
});
test(`isEventEmitter`, () => {
  assert(
    TypeGuard.isEventEmitter({
      addListener: noop,
      removeListener: noop,
      on: noop,
      once: noop,
      off: noop,
      removeAllListeners: noop,
      setMaxListeners: noop,
      getMaxListeners: noop,
      listeners: noop,
      rawListeners: noop,
      emit: noop,
      listenerCount: noop,
      prependListener: noop,
      prependOnceListener: noop,
      eventNames: noop
    })
  );
  assert(
    !TypeGuard.isEventEmitter({
      addListener: noop,
      removeListener: noop
    })
  );
  assert(
    !TypeGuard.isEventEmitterLike({
      addEventListener: noop,
      removeEventListener: noop,
      dispatchEvent: noop
    })
  );
  assert(!TypeGuard.isEventEmitter(undefined));
  assert(!TypeGuard.isEventEmitter(null));
  assert(!TypeGuard.isEventEmitter(1));
  assert(!TypeGuard.isEventEmitter(1n));
  assert(!TypeGuard.isEventEmitter(true));
  assert(!TypeGuard.isEventEmitter('foo'));
  assert(!TypeGuard.isEventEmitter({}));
  assert(!TypeGuard.isEventEmitter([]));
  assert(!TypeGuard.isEventEmitter({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isEventEmitter(Symbol('')));
  assert(!TypeGuard.isEventEmitter(() => undefined));
});
test(`isEventTarget`, () => {
  assert(
    TypeGuard.isEventTarget({
      addEventListener: noop,
      removeEventListener: noop,
      dispatchEvent: noop
    })
  );
  assert(
    !TypeGuard.isEventTarget({
      addEventListener: noop,
      removeEventListener: noop
    })
  );
  assert(
    !TypeGuard.isEventTarget({
      addListener: noop,
      removeListener: noop,
      on: noop,
      once: noop,
      off: noop,
      removeAllListeners: noop,
      setMaxListeners: noop,
      getMaxListeners: noop,
      listeners: noop,
      rawListeners: noop,
      emit: noop,
      listenerCount: noop,
      prependListener: noop,
      prependOnceListener: noop,
      eventNames: noop
    })
  );
  assert(
    !TypeGuard.isEventTarget({
      addListener: noop,
      removeListener: noop
    })
  );
  assert(!TypeGuard.isEventTarget(undefined));
  assert(!TypeGuard.isEventTarget(null));
  assert(!TypeGuard.isEventTarget(1));
  assert(!TypeGuard.isEventTarget(1n));
  assert(!TypeGuard.isEventTarget(true));
  assert(!TypeGuard.isEventTarget('foo'));
  assert(!TypeGuard.isEventTarget({}));
  assert(!TypeGuard.isEventTarget([]));
  assert(!TypeGuard.isEventTarget({ [Symbol.iterator]: noop }));
  assert(!TypeGuard.isEventTarget(Symbol('')));
  assert(!TypeGuard.isEventTarget(() => undefined));
});
