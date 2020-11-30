/* Basic Types */
export type NonDefined = undefined | void;
export type Empty = NonDefined | null;
export type FalseLike = Empty | false | '' | 0 | 0n;
export type Primitive =
  | bigint
  | boolean
  | number
  | string
  | symbol
  | null
  | undefined;

/* Records */
export type Members<T = any> = Record<any, T>;
export type Replace<T extends Members, U> = {
  [P in keyof T]: U;
};
export type Optional<T extends Members, K extends keyof T> = Intersection<
  Omit<T, K>,
  { [P in K]?: T[P] }
>;

/* Functions */
export type NullaryFn<T = void> = () => T;
export type UnaryFn<T = void, U = void> = (arg: T) => U;
export type BinaryFn<T extends [any, any], U = void> = (...args: T) => U;
export type MultiaryFn<T extends any[], U = void> = (...args: T) => U;
export type VariadicFn<T = any> = (...args: any[]) => T;

/* Promises */
export type MaybePromise<T> = Union<Promise<T>, T>;
export type MaybePromiseLike<T> = Union<PromiseLike<T>, T>;

/* Utils */
export type Union<A, B, C = B, D = B, E = B> = A | B | C | D | E;
export type Intersection<A, B, C = B, D = B, E = B> = A & B & C & D & E;
