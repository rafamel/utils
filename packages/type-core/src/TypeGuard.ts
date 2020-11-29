import { Empty, FalseLike, VariadicFn, Members, Primitive } from './types';

export class TypeGuard {
  public static isUndefined(item: any): item is undefined {
    return item === undefined;
  }
  public static isNull(item: any): item is null {
    return item === null;
  }
  public static isEmpty(item: any): item is Empty {
    return TypeGuard.isUndefined(item) || TypeGuard.isNull(item);
  }
  public static isFalseLike(item: any): item is FalseLike {
    return !item;
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
  public static isPrimitive(item: any): item is Primitive {
    return !TypeGuard.isObjectLike(item);
  }
  public static isFunction(item: any): item is VariadicFn {
    return typeof item === 'function';
  }
  public static isObjectLike(item: any): item is any {
    return TypeGuard.isObject(item) || TypeGuard.isFunction(item);
  }
  public static isObject(item: any): item is any {
    return typeof item === 'object' && !TypeGuard.isNull(item);
  }
  public static isRecordLike(item: any): item is Members<unknown> {
    return TypeGuard.isRecord(item) || TypeGuard.isFunction(item);
  }
  public static isRecord(item: any): item is Members<unknown> {
    return TypeGuard.isObject(item) && !TypeGuard.isArray(item);
  }
  public static isArray(item: any): item is unknown[] {
    return Array.isArray(item);
  }
  public static isPromiseLike(item: any): item is PromiseLike<unknown> {
    return Boolean(item) && TypeGuard.isFunction(item.then);
  }
  public static isPromise(item: any): item is Promise<unknown> {
    return (
      Boolean(item) &&
      TypeGuard.isFunction(item.then) &&
      TypeGuard.isFunction(item.catch) &&
      TypeGuard.isFunction(item.finally)
    );
  }
  public static isIterable(item: any): item is Iterable<unknown> {
    return (
      !TypeGuard.isEmpty(item) && TypeGuard.isFunction(item[Symbol.iterator])
    );
  }
  public static isIterator(
    item: any
  ): item is Iterator<unknown, unknown, unknown> {
    return Boolean(item) && TypeGuard.isFunction(item.next);
  }
}
