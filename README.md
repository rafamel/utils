# aslug

<!-- markdownlint-disable MD036 -->
**A lossless *slug* that preserves uniqueness.**
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
  * **separation** *(string):* String that separates the characters to replace. To make them unique, it should be a character that is not allowed by the *target* regex.
    * Default: `'_'`
  * **trim** *(boolean):* Whether to trim separation characters when at the end or beginning of the string in the case the first or last characters are not allowed. If you wish for each string to be unique, this should be `false`.
    * Default: `false`
  * **replace** *(function):* A function to replace the *target* characters. By default, they're replaced by their code.
    * Default: `(char) => String(char.charCodeAt(0))`
  