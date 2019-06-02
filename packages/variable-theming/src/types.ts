export interface IOfType<T> {
  [key: string]: T;
}

export type TItems = IOfType<IOfType<string | undefined>>;

export interface IOutput {
  css: string;
  styles: IOfType<string>;
}

export interface ISetupOutput extends IOutput {
  setup: {
    css: string;
    styles: IOfType<IOfType<string>>;
  };
}

export interface ITypography {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  fontStyle?: string;
}

export interface IPalette {
  main?: string;
  light?: string;
  dark?: string;
  contrast?: string;
}

export interface ITheme {
  typography?: ITypography[] | { [key: number]: Partial<ITypography> };
  palette?: IPalette[] | { [key: number]: IPalette };
  group?: IOfType<IOfType<string>>;
}
