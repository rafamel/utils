import { Dictionary } from './structural';
import { VariadicFn } from './functions';

/* Any */
export type Union<A, B, C = B, D = B, E = B> = A | B | C | D | E;
export type Intersection<A, B, C = B, D = B, E = B> = A & B & C & D & E;

/* Extract */
export type KeyOf<T extends ReadonlyArray<any> | ArrayLike<any> | Dictionary> =
  T extends ReadonlyArray<any>
    ? number
    : T extends ArrayLike<any>
    ? number
    : T extends object
    ? keyof T
    : never;

export type ValueOf<
  T extends ReadonlyArray<any> | ArrayLike<any> | Dictionary
> = T extends ReadonlyArray<any>
  ? T[number]
  : T extends ArrayLike<any>
  ? T[number]
  : T extends object
  ? T[keyof T]
  : never;

/* Map */
export type Index<T> = { [K in keyof T]: T[K] };
export type Replace<T extends Dictionary, U> = {
  [P in keyof T]: U;
};
export type Optional<T extends Dictionary, K extends keyof T> = Intersection<
  Omit<T, K>,
  { [P in K]?: T[P] }
>;

export declare namespace Deep {
  export type Required<T> = T extends VariadicFn
    ? T
    : T extends Array<infer U>
    ? Private.DeepRequiredArray<U>
    : T extends object
    ? Private.DeepRequiredObject<T>
    : T;

  export type Partial<T> = T extends VariadicFn
    ? T
    : T extends Array<infer U>
    ? Private.DeepPartialArray<U>
    : T extends object
    ? Private.DeepPartialObject<T>
    : T | undefined;
}

/* Helpers */
declare namespace Private {
  type DeepRequiredObject<T> = {
    [P in keyof T]-?: Deep.Required<Exclude<T[P], undefined>>;
  };
  interface DeepRequiredArray<T>
    extends Array<Deep.Required<Exclude<T, undefined>>> {}
  export type DeepPartialObject<T> = { [P in keyof T]?: Deep.Partial<T[P]> };
  export interface DeepPartialArray<T> extends Array<Deep.Partial<T>> {}
}
