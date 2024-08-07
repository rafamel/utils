import type { FalseLike, ID, Multiary, NullLike, Primitive } from './types';
import type { Intersection } from './utils';

export class TypeGuard {
  public static isID(item: any): item is ID {
    return TypeGuard.isString(item) || TypeGuard.isNumber(item);
  }
  public static isNullLike(item: any): item is NullLike {
    return TypeGuard.isUndefined(item) || TypeGuard.isNull(item);
  }
  public static isFalseLike(item: any): item is FalseLike {
    return !item;
  }
  public static isPrimitive(item: any): item is Primitive {
    return !TypeGuard.isObject(item) && !TypeGuard.isFunction(item);
  }
  public static isNull(item: any): item is null {
    return item === null;
  }
  public static isUndefined(item: any): item is undefined {
    return item === undefined;
  }
  public static isBoolean(item: any): item is boolean {
    return typeof item === 'boolean';
  }
  public static isString(item: any): item is string {
    return typeof item === 'string';
  }
  public static isNumber(item: any): item is number {
    return typeof item === 'number';
  }
  public static isBigInt(item: any): item is bigint {
    return typeof item === 'bigint';
  }
  public static isSymbol(item: any): item is symbol {
    return typeof item === 'symbol';
  }
  public static isFunction(item: any): item is Multiary {
    return typeof item === 'function';
  }
  public static isObject(item: any): item is any {
    return typeof item === 'object' && !TypeGuard.isNull(item);
  }
  public static isRecord(item: any): item is Record<any, unknown> {
    return TypeGuard.isObject(item) && !TypeGuard.isArray(item);
  }
  public static isArray(item: any): item is unknown[] {
    return Array.isArray(item);
  }
  public static isPromiseLike(item: any): item is PromiseLike<unknown> {
    return TypeGuard.isObject(item) && TypeGuard.isFunction(item.then);
  }
  public static isPromise(item: any): item is Promise<unknown> {
    return (
      TypeGuard.isObject(item) &&
      TypeGuard.isFunction(item.then) &&
      TypeGuard.isFunction(item.catch) &&
      TypeGuard.isFunction(item.finally)
    );
  }
  public static isIterable(item: any): item is Iterable<unknown> {
    return (
      !TypeGuard.isNullLike(item) && TypeGuard.isFunction(item[Symbol.iterator])
    );
  }
  public static isAsyncIterable(item: any): item is AsyncIterable<unknown> {
    return (
      !TypeGuard.isNullLike(item) &&
      TypeGuard.isFunction(item[Symbol.asyncIterator])
    );
  }
  public static isIterator(
    item: any
  ): item is
    | Iterator<unknown, unknown, unknown>
    | AsyncIterator<unknown, unknown, unknown> {
    return TypeGuard.isObject(item) && TypeGuard.isFunction(item.next);
  }
  public static isEventEmitterLike(
    item: any
  ): item is Intersection<
    Partial<NodeJS.EventEmitter>,
    Pick<NodeJS.EventEmitter, 'addListener' | 'removeListener'>
  > {
    return (
      TypeGuard.isObject(item) &&
      TypeGuard.isFunction(item.addListener) &&
      TypeGuard.isFunction(item.removeListener)
    );
  }
  public static isEventEmitter(item: any): item is NodeJS.EventEmitter {
    return (
      TypeGuard.isEventEmitterLike(item) &&
      TypeGuard.isFunction(item.on) &&
      TypeGuard.isFunction(item.once) &&
      TypeGuard.isFunction(item.off) &&
      TypeGuard.isFunction(item.removeAllListeners) &&
      TypeGuard.isFunction(item.setMaxListeners) &&
      TypeGuard.isFunction(item.getMaxListeners) &&
      TypeGuard.isFunction(item.listeners) &&
      TypeGuard.isFunction(item.rawListeners) &&
      TypeGuard.isFunction(item.emit) &&
      TypeGuard.isFunction(item.listenerCount) &&
      TypeGuard.isFunction(item.prependListener) &&
      TypeGuard.isFunction(item.prependOnceListener) &&
      TypeGuard.isFunction(item.eventNames)
    );
  }
  public static isEventTarget(item: any): item is EventTarget {
    return (
      TypeGuard.isObject(item) &&
      TypeGuard.isFunction(item.addEventListener) &&
      TypeGuard.isFunction(item.removeEventListener) &&
      TypeGuard.isFunction(item.dispatchEvent)
    );
  }
}
