export const symbol = Symbol('internal');

export interface ResultInternal<T, S extends boolean = boolean> {
  value?: T;
  error?: Error;
  success: S;
}
