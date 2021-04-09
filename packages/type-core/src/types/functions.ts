/* Functions */
export type NullaryFn<T = void> = () => T;
export type UnaryFn<T = void, U = void> = (arg: T) => U;
export type BinaryFn<T extends [any, any], U = void> = (...args: T) => U;
export type MultiaryFn<T extends any[], U = void> = (...args: T) => U;
export type VariadicFn<T = any> = (...args: any[]) => T;
