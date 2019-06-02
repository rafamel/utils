# variable-theming

[![Version](https://img.shields.io/npm/v/variable-theming.svg)](https://www.npmjs.com/package/variable-theming)
[![Build Status](https://img.shields.io/travis/rafamel/utils/master.svg)](https://travis-ci.org/rafamel/utils)
[![Coverage](https://img.shields.io/coveralls/rafamel/utils/master.svg)](https://coveralls.io/github/rafamel/utils)
[![Dependencies](https://img.shields.io/david/rafamel/utils.svg?path=packages%2Fvariable-theming)](https://david-dm.org/rafamel/utils.svg?path=packages%2Fvariable-theming)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/variable-theming.svg)](https://snyk.io/test/npm/variable-theming)
[![License](https://img.shields.io/github/license/rafamel/utils.svg)](https://github.com/rafamel/utils/blob/master/LICENSE)
[![Types](https://img.shields.io/npm/types/variable-theming.svg)](https://www.npmjs.com/package/variable-theming)

> CSS theming based on custom properties

If you find it useful, consider [starring the project](https://github.com/rafamel/utils/tree/master/packages/variable-theming) 💪 and/or following [its author](https://github.com/rafamel) ❤️ -there's more on the way!

## Install

[`npm install variable-theming`](https://www.npmjs.com/package/variable-theming)

## Usage

**[Documentation](https://rafamel.github.io/utils/variable-theming/globals.html)**

```javascript
import inject from 'style-inject';
import generate from 'variable-theming';

const mainTheme = {
  custom: {
    primaryPalette: {
      main: 'red',
      dark: 'black',
      light: 'white',
      contrast: 'blue'
    }
  },
  elements: {
    h1: {
      fontSize: '2em',
      color: 'var(--primary-palette-main)',
      background: 'green'
    }
  }
}

const secondaryTheme = {
  custom: {
    primaryPalette: {
      main: 'green',
      dark: 'black',
      light: 'white',
      contrast: 'red'
    }
  },
  elements: {
    h1: {
      fontSize: '1em',
      color: 'var(--primary-palette-main)',
      background: 'yellow'
    }
  }
}

/*
  Element properties will be assigned to variables
  for the first object, but not for the second.
*/
const { setup, ...main } = generate(
  mainTheme.elements,
  mainTheme.custom
);

/*
  Add setup styles as globals:
    - use setup.css string to create a global <style> tag,
    - or the setup.styles if you're using css-in-js.
  Then, add variables for one theme for the :root scope.
*/
inject(setup.css);
inject(`:root { ${main.css} }`);

/*
  We don't need to assign element properties to variables
  anymore as they are already globally set, so we don't need
  to separate element styles and custom properties for setup.
*/
const secondary = generate({
  ...secondaryTheme.elements,
  ...secondaryTheme.custom
});
inject(`.someClassSecondaryWillApplyTo { ${secondary.css} }`);
```
