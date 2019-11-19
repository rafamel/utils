export type BasicKind =
  | 'null'
  | 'boolean'
  | 'number'
  | 'string'
  | 'object'
  | 'array'
  | 'symbol'
  | 'function';

export type KindType<T extends BasicKind> = T extends 'boolean'
  ? boolean
  : T extends 'number'
  ? number
  : T extends 'string'
  ? string
  : T extends 'null'
  ? null
  : T extends 'object'
  ? object
  : T extends 'array'
  ? any[]
  : T extends 'symbol'
  ? symbol
  : T extends 'function'
  ? (...args: any[]) => any
  : any;

export type AllResultType<
  T,
  N extends string | number | symbol,
  K extends BasicKind | null = null
> = K extends BasicKind
  ? T extends { [P in N]?: any }
    ? T & { [P in N]: Exclude<T[P], undefined | void> & KindType<K> }
    : T & { [P in N]: KindType<K> }
  : T extends { [P in N]?: any }
  ? T & { [P in N]: Exclude<T[P], undefined | void> }
  : T & { [P in N]: any };
