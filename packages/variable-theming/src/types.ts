export interface IOfType<T> {
  [key: string]: T;
}

export type TValue = string | number | null | undefined | void;

export type TElements = IOfType<IOfType<TValue>>;

export interface ITheme {
  [key: string]: ITheme | TValue;
}

export interface IOutput {
  css: string;
  styles: IOfType<string>;
}

export interface ISetup {
  css: string;
  styles: IOfType<IOfType<string>>;
}

export interface ISetupOutput extends IOutput {
  setup: ISetup;
}
