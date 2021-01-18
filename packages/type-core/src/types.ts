/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/ban-types */

/* Basic Types */
export type ID = number | string;
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

/* Serial */
type NativeArray<T> = Array<T>;
export declare namespace Serial {
  export type Type = Primitive | Array | Object;
  export type Primitive = boolean | number | string | null | undefined;
  // eslint-disable-next-line
  export interface Array extends NativeArray<Type> {}
  export interface Object {
    [key: string]: Type;
  }
  export type Generalize<T extends Type> =
    | T
    | (T extends boolean ? boolean : never)
    | (T extends number ? number : never)
    | (T extends string ? string : never)
    | (T extends Type[] ? Array : never)
    | (T extends object ? Object : never);
}

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

/* Constructor */
export interface Constructor<T = any> {
  new (...args: any[]): T;
  prototype: T;
}

/* Promises */
export type MaybePromise<T> = Union<Promise<T>, T>;
export type MaybePromiseLike<T> = Union<PromiseLike<T>, T>;

/* Utils */
export type Union<A, B, C = B, D = B, E = B> = A | B | C | D | E;

export type Intersection<A, B, C = B, D = B, E = B> = A & B & C & D & E;

export type KeyOf<
  T extends ReadonlyArray<any> | ArrayLike<any> | Members
> = T extends ReadonlyArray<any>
  ? number
  : T extends ArrayLike<any>
  ? number
  : T extends object
  ? keyof T
  : never;

export type ValueOf<
  T extends ReadonlyArray<any> | ArrayLike<any> | Members
> = T extends ReadonlyArray<any>
  ? T[number]
  : T extends ArrayLike<any>
  ? T[number]
  : T extends object
  ? T[keyof T]
  : never;

export type Generalize<T> =
  | T
  | (T extends bigint ? bigint : never)
  | (T extends boolean ? boolean : never)
  | (T extends number ? number : never)
  | (T extends string ? string : never)
  | (T extends symbol ? symbol : never)
  | (T extends any[] ? any[] : never)
  | (T extends object ? object : never);
