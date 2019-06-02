import decamelize from 'decamelize';
import { TItems, IOfType, ISetupOutput } from '~/types';

export default function trunk(items: TItems, setup: boolean): ISetupOutput {
  const entries = Object.entries(items);
  const styles: IOfType<string> = {};
  let css = ``;
  const setupStyles: IOfType<IOfType<string>> = {};
  let setupCss = ``;

  for (let [camelName, element] of entries) {
    const name = decamelize(camelName, '-');
    if (setup) {
      setupStyles[name] = {};
      setupCss += `\n${name} {`;
    }

    const entries = Object.entries(element);
    for (let [camelProperty, value] of entries) {
      if (value === undefined) continue;

      const property = decamelize(camelProperty, '-');
      const variable = `--${name}-${property}`;
      styles[variable] = value;
      css += `\n${variable}: ${value};`;

      if (setup) {
        const cssvar = `var(${variable});`;
        setupStyles[name][property] = cssvar;
        setupCss += `\n  ${property}: ${cssvar}`;
      }
    }

    if (setup) {
      setupCss += '\n}';
    }
  }

  return {
    css: css.trim(),
    styles,
    setup: setup
      ? { css: setupCss.trim(), styles: setupStyles }
      : { css: '', styles: {} }
  };
}
