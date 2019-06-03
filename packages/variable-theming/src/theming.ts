import parseTheme from './parse/theme';
import { ITheme, ISetupOutput, IOutput, TElements, ISetup } from '~/types';

export default theming;

function theming(theme: ITheme | null, elements: TElements): ISetupOutput;
function theming(theme: ITheme | null, elements?: TElements): IOutput;
/**
 * Generates styles as an object -`styles`- and as a string -`css`- assigning css variables to their defined values. You can then inject these for usage in your css.
 *
 * If a second object is passed, it will also generate `setup` styles, assigning property values for all elements with names of `elements` keys to their respective variable.
 */
function theming(
  theme: ITheme | null,
  elements?: TElements
): IOutput | ISetupOutput {
  const base: IOutput = { css: '', styles: {} };
  const setup: ISetup = { css: '', styles: {} };

  if (theme) {
    parseTheme(theme, (variable, value) => {
      base.css += `\n${variable}: ${value};`;
      base.styles[variable] = value;
    });
  }

  if (elements) {
    parseTheme(elements, (variable, value) => {
      base.css += `\n${variable}: ${value};`;
      base.styles[variable] = value;

      const [name, ...arr] = variable.slice(2).split('-');
      const property = arr.join('-');

      if (!setup.styles[name]) setup.styles[name] = {};
      setup.styles[name][property] = `var(${variable});`;
      setup.css += `\n${name} { ${property}: var(${variable}); }`;
    });
  }

  base.css = base.css.trim();
  setup.css = setup.css.trim();

  return elements ? Object.assign(base, { setup }) : base;
}
