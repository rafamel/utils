export interface IOfType<T> {
  [key: string]: T;
}

export interface IFlag {
  alias?: string;
  argument?: string;
  description: string;
}
