/* Primitives */
export type ID = number | string;
export type NonDefined = undefined | void;
export type Nullable = undefined | null;
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

/* Utils */
export type Generalize<T> =
  | T
  | (T extends bigint ? bigint : never)
  | (T extends boolean ? boolean : never)
  | (T extends number ? number : never)
  | (T extends string ? string : never)
  | (T extends symbol ? symbol : never)
  | (T extends any[] ? any[] : never)
  | (T extends object ? object : never);

/* Serial */
export declare namespace Serial {
  export type Type = Primitive | Array | Object;
  export type Primitive = boolean | number | string | null | undefined;
  export interface Array extends Private.NativeArray<Type> {}
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

/* Helpers */
declare namespace Private {
  type NativeArray<T> = Array<T>;
}
