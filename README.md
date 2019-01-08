# aslug

[![Version](https://img.shields.io/npm/v/aslug.svg)](https://www.npmjs.com/package/aslug)
[![Build Status](https://travis-ci.org/rafamel/aslug.svg)](https://travis-ci.org/rafamel/aslug)
[![Coverage](https://img.shields.io/coveralls/rafamel/aslug.svg)](https://coveralls.io/github/rafamel/aslug)
[![Dependencies](https://david-dm.org/rafamel/aslug/status.svg)](https://david-dm.org/rafamel/aslug)
[![Vulnerabilities](https://snyk.io/test/npm/aslug/badge.svg)](https://snyk.io/test/npm/aslug)
[![Issues](https://img.shields.io/github/issues/rafamel/aslug.svg)](https://github.com/rafamel/aslug/issues)
[![License](https://img.shields.io/github/license/rafamel/aslug.svg)](https://github.com/rafamel/aslug/blob/master/LICENSE)

<!-- markdownlint-disable MD036 -->
**Aslug:** Slug a string while preserving its uniqueness. By default, it substitutes each forbidden character for its code, surrounded by a separator. The clearest use case is for ids that must be made safe, while assuring they won't conflict with other valid ids.
<!-- markdownlint-enable MD036 -->

## Install

[`npm install aslug`](https://www.npmjs.com/package/aslug)

## Usage

```javascript
import aslug from 'aslug';

aslug('my|bad|string'); // my_124_bad_124_string
```

### `aslug(str, opts): string`

* **str** *(string):* The string to *aslug*
* **opts** *(object, optional):* Options object, with optional properties:
  * **target** *(regex):* Regex for the characters to replace.
    * Default: `/[^a-zA-Z0-9]/`
  * **separation** *(string):* String that separates the characters to replace. To make then unique, it should be a character that is not allowed by the *target* regex.
    * Default: `'_'`
  * **trim** *(boolean):* Whether to trim separation characters when at the end or beginning of the string in the case the first or last characters are not allowed. If you wish for each string to be unique, this should be `false`.
    * Default: `false`
  * **replace** *(function):* A function to replace the *target* characters. By default, they're replaced by their code.
    * Default: `(char) => String(char.charCodeAt(0))`
  