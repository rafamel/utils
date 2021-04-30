/* Constructor */
export interface Constructor<T = any> {
  new (...args: any[]): T;
  prototype: T;
}

/* Records */
export type Dictionary<T = any> = Record<any, T>;

/* Promises */
export type MaybePromise<T> = Promise<T> | T;
export type MaybePromiseLike<T> = PromiseLike<T> | T;
