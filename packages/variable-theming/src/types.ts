export interface IOfType<T> {
  [key: string]: T;
}

export type TItems = IOfType<IOfType<string | undefined>>;

export interface IOutput {
  css: string;
  styles: IOfType<string>;
  setup: {
    css: string;
    styles: IOfType<IOfType<string>>;
  };
}
