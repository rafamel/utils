export const symbol = Symbol('internal');

export interface ResponseInternal<T> {
  value?: T;
  error?: Error;
  success: boolean;
}
