/* Basic Types */
export type ID = number | string;
export type VoidLike = void | null;
export type NullLike = undefined | null;
export type FalseLike = undefined | null | false | '' | 0 | 0n;
export type Primitive =
  | boolean
  | number
  | string
  | null
  | undefined
  | bigint
  | symbol;
export type Serial =
  | boolean
  | number
  | string
  | null
  | undefined
  | Array<Serial>
  | { [key: string]: Serial };

export type Dictionary<T = any> = Record<any, T>;
export type Promisable<T> = Promise<T> | T;
export type Callable<A = void, T = void> = (args: A) => T;
export type Multiary<T extends any[] = any[], U = void> = (...args: T) => U;
