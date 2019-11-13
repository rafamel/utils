export const symbol = Symbol('internal');

export interface ResultInternal<T> {
  value?: T;
  error?: Error;
  success: boolean;
}
